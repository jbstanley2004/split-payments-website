"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FileText, Loader2, MessageSquare, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";
import clsx from "clsx";

import { useOnboarding } from "@/contexts/onboarding-context";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  detail?: string;
}

interface UploadedDoc {
  id: string;
  name: string;
  size: number;
  status: "uploaded" | "parsing" | "parsed";
  extracted?: string;
}

export function OpenAIAppExperience() {
  const { data, updateData } = useOnboarding();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [adminConfig, setAdminConfig] = useState({
    apiKeyMasked: "sk-••••split",
    projectId: "split-onboarding-app",
    model: "gpt-5.1-mini",
    surface: "ChatGPT + Embed",
  });

  const serializeData = () => ({
    ...data,
    merchantStatements: data.merchantStatements.map(file => ({ name: file.name, size: file.size })),
  });

  const addMessage = (entry: Omit<ChatMessage, "id">) => {
    setMessages(prev => [...prev, { ...entry, id: `${entry.role}-${Date.now()}-${prev.length}` }]);
  };

  useEffect(() => {
    let cancelled = false;
    const hydrate = async () => {
      try {
        const res = await fetch("/api/onboarding/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: serializeData(), uploads, adminConfig }),
        });
        const json = await res.json();
        if (cancelled) return;
        setMessages([
          {
            id: "assistant-welcome",
            role: "assistant",
            content: json.reply,
            detail: json.detail,
          },
        ]);
      } catch (error) {
        if (cancelled) return;
        setMessages([
          {
            id: "assistant-error",
            role: "assistant",
            content: "I’m ready to guide your onboarding, but I couldn’t reach the assistant service. Please retry.",
          },
        ]);
      }
    };

    hydrate();
    return () => {
      cancelled = true;
    };
    // we only want to hydrate once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendToAssistant = async (text: string) => {
    setIsSending(true);
    try {
      const res = await fetch("/api/onboarding/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, data: serializeData(), uploads, adminConfig }),
      });
      const json = await res.json();
      if (json?.updates) {
        updateData({ ...json.updates });
      }
      addMessage({ role: "assistant", content: json.reply, detail: json.detail });
    } catch (error) {
      addMessage({
        role: "assistant",
        content: "I couldn’t reach the conversation service. Please resend that message.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = async () => {
    if (!draft.trim() || isSending) return;
    const text = draft.trim();
    addMessage({ role: "user", content: text });
    setDraft("");
    await sendToAssistant(text);
  };

  const onFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    void handleUpload(files);
    event.target.value = "";
  };

  const handleUpload = async (files: File[]) => {
    if (!files.length || isUploading) return;
    const placeholders: UploadedDoc[] = files.map(file => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
      size: file.size,
      status: "uploaded",
    }));
    setUploads(prev => [...prev, ...placeholders]);
    updateData({ merchantStatements: [...data.merchantStatements, ...files] });

    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append("files", file));

      const res = await fetch("/api/onboarding/upload", { method: "POST", body: formData });
      const json = await res.json();

      if (json?.uploads) {
        setUploads(prev => {
          const remaining = prev.filter(existing =>
            !placeholders.some(placeholder => placeholder.name === existing.name && placeholder.size === existing.size)
          );
          const parsed = (json.uploads as UploadedDoc[]).map(upload => ({ ...upload, status: "parsed" as const }));
          return [...remaining, ...parsed];
        });
      }

      if (json?.updates) {
        updateData({ ...json.updates });
      }

      addMessage({ role: "assistant", content: json.reply || "Files received and parsed for onboarding." });
      // Ask assistant to re-evaluate the state after parsing
      await sendToAssistant("Files uploaded and parsed");
    } catch (error) {
      addMessage({
        role: "assistant",
        content: "I couldn’t parse those files. Please try again or use a PDF or image statement.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const checklist = useMemo(() => {
    const hasBusiness = Boolean(data.legalName || data.businessCity || data.businessState);
    const hasOwner = Boolean(data.ownerName && data.ownershipPercentage);
    const hasDocs = uploads.some(file => file.status === "parsed");
    const hasConsent = Boolean(data.ownerSignature);
    const readyDeploy = hasBusiness && hasOwner && hasDocs;

    return [
      { label: "Business basics", complete: hasBusiness, hint: "Legal name, city/state" },
      { label: "Ownership & KYC", complete: hasOwner, hint: "Primary owner + %" },
      { label: "Statements & IDs", complete: hasDocs, hint: "Parsed revenue + processor" },
      { label: "Consent", complete: hasConsent, hint: "Owner sign-off" },
      { label: "Deploy ChatGPT + embed", complete: readyDeploy, hint: "Bundle ready" },
    ];
  }, [data, uploads]);

  const sessionSummary = useMemo(() => {
    const basics = [data.legalName, data.businessCity && `${data.businessCity}, ${data.businessState}`].filter(Boolean).join(" • ");
    const revenue = data.monthlyRevenue ? `$${Number(data.monthlyRevenue).toLocaleString()}/mo cards` : "Revenue pending";
    const processor = data.currentProcessor || "Processor pending";
    const owner = data.ownerName ? `${data.ownerName} (${data.ownershipPercentage || ""}% owner)` : "Owner pending";
    return `${basics || "Business profile pending"} • ${revenue} • ${processor} • ${owner}`;
  }, [data]);

  const updateAdminField = (key: keyof typeof adminConfig, value: string) => {
    setAdminConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white to-neutral-50 px-6 py-5 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/70">ChatKit + Apps SDK</p>
          <h3 className="mt-1 text-2xl font-semibold text-black">Conversational onboarding only</h3>
          <p className="mt-2 max-w-3xl text-sm text-black/70">
            Split Copilot guides every step in natural language. Upload documents, let GPT 5.1 Mini parse them, and keep everything in this thread—no leftover forms or prompt buttons.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
          <span className="rounded-full bg-black px-3 py-1 text-white">GPT 5.1 Mini</span>
          <span>ChatGPT hosted + embedded</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-black/10 bg-white/90 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
              <Sparkles className="h-4 w-4" /> Live onboarding chat
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/60">No prompt selection—just chat</div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-3 shadow-inner">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70 mb-2">
              <MessageSquare className="h-4 w-4" /> Thread
            </div>
            <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {messages.map(message => {
                  const isUser = message.role === "user";
                  return (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={clsx("flex gap-3", isUser ? "justify-end" : "justify-start")}
                    >
                      {!isUser && (
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-black text-white grid place-items-center">
                          <Sparkles className="h-5 w-5" />
                        </div>
                      )}
                      <div
                        className={clsx(
                          "max-w-[560px] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ring-1",
                          isUser ? "bg-white text-black ring-black/10" : "bg-white/95 text-black ring-black/10 shadow-[0_16px_60px_-20px_rgba(0,0,0,0.35)]"
                        )}
                      >
                        <p className="text-[15px] whitespace-pre-wrap">{message.content}</p>
                        {message.detail && (
                          <p className="mt-2 rounded-xl bg-neutral-100 px-3 py-2 text-xs text-neutral-800">{message.detail}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                {isSending && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-black text-white grid place-items-center">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                    <div className="max-w-[560px] rounded-2xl bg-white/95 px-4 py-3 text-sm leading-relaxed text-black shadow-[0_16px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
                      Typing…
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
                <UploadCloud className="h-4 w-4" /> File intake & parsing
              </div>
              {isUploading && (
                <span className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  <Loader2 className="h-3 w-3 animate-spin" /> Parsing
                </span>
              )}
            </div>

            <label
              onDrop={event => {
                event.preventDefault();
                const files = event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];
                void handleUpload(files);
              }}
              onDragOver={event => event.preventDefault()}
              className="mt-3 block rounded-xl border border-dashed border-black/25 bg-white/80 px-4 py-5 text-center text-sm text-black/80 shadow-inner transition hover:border-black/50"
            >
              <input type="file" accept=".pdf,.png,.jpg,.jpeg" multiple className="hidden" onChange={onFileInput} />
              <p className="font-semibold">Drop statements, IDs, or KYB packets</p>
              <p className="text-xs text-black/60">Copilot will parse revenue, processor, owners, and consent cues directly into the record.</p>
            </label>

            {uploads.length > 0 ? (
              <div className="mt-3 space-y-2">
                {uploads.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-black text-white grid place-items-center text-[11px] font-semibold uppercase">
                        {file.status === "parsed" ? "AI" : "PDF"}
                      </div>
                      <div>
                        <p className="font-semibold">{file.name}</p>
                        <p className="text-xs text-black/60">{(file.size / 1024).toFixed(1)} KB • {file.extracted || "Awaiting parse"}</p>
                      </div>
                    </div>
                    <span
                      className={clsx(
                        "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                        file.status === "parsed" ? "bg-black text-white" : "border border-black/20 bg-white text-black"
                      )}
                    >
                      {file.status === "parsed" ? "Parsed" : file.status === "parsing" ? "Parsing" : "Uploaded"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 rounded-xl bg-white px-3 py-2 text-xs text-black/60">No files yet. Drag a PDF or image to let Split Copilot extract onboarding data.</p>
            )}
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
                <ShieldCheck className="h-4 w-4" /> Compose a message
              </div>
            </div>

            <div className="mt-3 flex items-end gap-2">
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Describe your business, ownership, or ask the assistant to finalize consent—no prompts required."
                className="min-h-[84px] flex-1 resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-inner outline-none focus:border-black/30"
              />
              <button
                onClick={handleSend}
                disabled={isSending}
                className="inline-flex h-[84px] items-center justify-center rounded-2xl bg-black px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
              >
                {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-black">
              <CheckCircle2 className="h-4 w-4 text-black/70" /> Live checklist
            </div>
            <p className="mt-1 text-xs text-black/70">Only onboarding tasks are shown—everything else stays out of view.</p>
            <div className="mt-3 space-y-2">
              {checklist.map(item => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-black"
                >
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-xs text-black/60">{item.hint}</p>
                  </div>
                  {item.complete ? (
                    <span className="rounded-full bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Ready</span>
                  ) : (
                    <span className="rounded-full border border-black/30 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black">Pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-black">
                <ShieldCheck className="h-4 w-4 text-black/60" /> Admin controls
              </div>
              <span className="rounded-full bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Secured</span>
            </div>
            <p className="text-xs text-black/70">Manage credentials, model, and hosting without exposing keys to end users.</p>
            <div className="grid gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70">OpenAI API key</label>
              <input
                value={adminConfig.apiKeyMasked}
                onChange={e => updateAdminField("apiKeyMasked", e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-black outline-none focus:border-black/30"
              />
              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70">Project ID</label>
              <input
                value={adminConfig.projectId}
                onChange={e => updateAdminField("projectId", e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-black outline-none focus:border-black/30"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70">Model</label>
                  <select
                    value={adminConfig.model}
                    onChange={e => updateAdminField("model", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-black outline-none focus:border-black/30"
                  >
                    <option value="gpt-5.1-mini">GPT 5.1 Mini</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70">Hosting</label>
                  <select
                    value={adminConfig.surface}
                    onChange={e => updateAdminField("surface", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-black outline-none focus:border-black/30"
                  >
                    <option>ChatGPT + Embed</option>
                    <option>ChatGPT only</option>
                    <option>Embed only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-black">
              <FileText className="h-4 w-4 text-black/70" /> Session snapshot
            </div>
            <p className="mt-1 text-xs text-black/70">Live view of what the assistant has captured for underwriting.</p>
            <div className="mt-3 rounded-2xl border border-black/10 bg-neutral-50 px-3 py-2 text-sm text-black/80">
              {sessionSummary}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
