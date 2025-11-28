"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileDown, FileText, MessageSquare, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";
import { useOnboarding } from "@/contexts/onboarding-context";
import clsx from "clsx";

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

const starterMessages: ChatMessage[] = [
  {
    id: "assistant-hello",
    role: "assistant",
    content: "Welcome to Split Copilot. I’ll replace the old form and walk you through onboarding in one chat.",
    detail: "We’ll capture business basics, owners, statements, consent, and deployment without leaving this window.",
  },
  {
    id: "assistant-upload",
    role: "assistant",
    content: "You can drop PDFs or images here. I’ll parse revenue, processor, and ownership details automatically.",
  },
];

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
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
          isUser ? "bg-white text-black ring-black/10" : "bg-white/90 text-black ring-black/10 shadow-[0_16px_60px_-20px_rgba(0,0,0,0.35)]"
        )}
      >
        <p className="text-[15px] whitespace-pre-wrap">{message.content}</p>
        {message.detail && (
          <p className="mt-2 rounded-xl bg-neutral-100 px-3 py-2 text-xs text-neutral-800">{message.detail}</p>
        )}
      </div>
    </motion.div>
  );
}

function UploadRow({ file }: { file: UploadedDoc }) {
  const badge =
    file.status === "parsed"
      ? "Parsed"
      : file.status === "parsing"
      ? "Parsing"
      : "Uploaded";
  return (
    <div className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black">
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
        {badge}
      </span>
    </div>
  );
}

export function OpenAIAppExperience() {
  const { data, updateData } = useOnboarding();
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [draft, setDraft] = useState("");
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);
  const [adminConfig, setAdminConfig] = useState({
    apiKeyMasked: "sk-••••split",
    projectId: "split-onboarding-app",
    model: "gpt-5.1-mini",
    surface: "ChatGPT + Embed",
  });

  useEffect(() => {
    if (uploads.length === 0) return;
    const newest = uploads.find(file => file.status === "uploaded");
    if (!newest) return;

    setUploads(prev => prev.map(file => (file.id === newest.id ? { ...file, status: "parsing" } : file)));

    const parser = setTimeout(() => {
      setUploads(prev =>
        prev.map(file =>
          file.id === newest.id
            ? {
                ...file,
                status: "parsed",
                extracted: "Revenue + processor extracted",
              }
            : file
        )
      );

      updateData({
        monthlyRevenue: data.monthlyRevenue || "210000",
        currentProcessor: data.currentProcessor || "Stripe + Square mix",
        ownershipPercentage: data.ownershipPercentage || "82",
        merchantStatements: [...data.merchantStatements],
      });

      setMessages(prev => [
        ...prev,
        {
          id: `assistant-parsed-${Date.now()}`,
          role: "assistant",
          content: "I’ve parsed your documents and pulled revenue, processor, and ownership evidence into the onboarding record.",
          detail: "Want me to summarize underwriting flags or request missing signatures?",
        },
      ]);
    }, 900);

    return () => clearTimeout(parser);
  }, [uploads, data, updateData]);

  const checklist = useMemo(() => {
    const hasBusiness = Boolean(data.legalName || data.businessCity || data.businessState);
    const hasOwner = Boolean(data.ownerName && data.ownershipPercentage);
    const hasDocs = uploads.some(file => file.status === "parsed");
    const hasConsent = Boolean(data.ownerSignature);
    const readyDeploy = hasBusiness && hasOwner && hasDocs;

    return [
      { label: "Business basics", complete: hasBusiness, hint: "Legal name, city/state, card volume" },
      { label: "Ownership & KYC", complete: hasOwner, hint: "Primary owner + % ownership" },
      { label: "Statements & IDs", complete: hasDocs, hint: "Parsed revenue + processor" },
      { label: "Consent & signatures", complete: hasConsent, hint: "Owner sign-off" },
      { label: "Deploy to ChatGPT + embed", complete: readyDeploy, hint: "Manifest + embed bundle" },
    ];
  }, [data, uploads]);

  const sessionSummary = useMemo(() => {
    const basics = [data.legalName, data.businessCity && `${data.businessCity}, ${data.businessState}`].filter(Boolean).join(" • ");
    const revenue = data.monthlyRevenue ? `$${Number(data.monthlyRevenue).toLocaleString()}/mo cards` : "Revenue pending";
    const processor = data.currentProcessor || "Processor pending";
    const owner = data.ownerName ? `${data.ownerName} (${data.ownershipPercentage || ""}% owner)` : "Owner pending";
    return `${basics || "Business profile pending"} • ${revenue} • ${processor} • ${owner}`;
  }, [data]);

  const addMessage = (entry: Omit<ChatMessage, "id">) => {
    setMessages(prev => [...prev, { ...entry, id: `${entry.role}-${Date.now()}-${prev.length}` }]);
  };

  const handleSend = () => {
    if (!draft.trim()) return;
    const text = draft.trim();
    addMessage({ role: "user", content: text });

    const missing: string[] = [];
    if (!data.legalName) missing.push("legal business name");
    if (!data.ownerName) missing.push("owner + ownership %");
    if (!uploads.some(file => file.status === "parsed")) missing.push("a recent statement");

    const nextCue = missing.length
      ? `I still need ${missing.join(", ")}. Drop a document or share the details and I’ll fill the widgets.`
      : "All core fields are captured. I can prepare the consent packet or publish the ChatGPT + embed bundle next.";

    addMessage({
      role: "assistant",
      content: nextCue,
      detail: "Everything you share stays focused on onboarding—no extra prompts or widgets beyond KYB, files, and consent.",
    });

    setDraft("");
  };

  const onFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    handleUpload(files);
    event.target.value = "";
  };

  const handleUpload = (files: File[]) => {
    if (!files.length) return;
    const prepared = files.map(file => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
      size: file.size,
      status: "uploaded" as const,
    }));

    setUploads(prev => [...prev, ...prepared]);
    updateData({ merchantStatements: [...data.merchantStatements, ...files] });

    addMessage({
      role: "assistant",
      content: `Received ${files.length} file${files.length > 1 ? "s" : ""}. I’ll parse them for revenue, processor, and ownership proof now.`,
    });
  };

  const sampleFill = () => {
    updateData({
      legalName: data.legalName || "Urban Grind Roasters LLC",
      businessCity: data.businessCity || "Austin",
      businessState: data.businessState || "TX",
      businessType: data.businessType || "Card-present + eCom",
      ownerName: data.ownerName || "Sasha Rivera",
      ownershipPercentage: data.ownershipPercentage || "82",
      monthlyRevenue: data.monthlyRevenue || "210000",
      currentProcessor: data.currentProcessor || "Stripe + Square mix",
    });
    addMessage({
      role: "assistant",
      content: "Loaded a sample profile so you can see how Split Copilot fills the onboarding record without the legacy forms.",
      detail: "Swap these values at any time; every change is mirrored to the ChatGPT-hosted app and the embedded widget.",
    });
  };

  const updateAdminField = (key: keyof typeof adminConfig, value: string) => {
    setAdminConfig(prev => ({ ...prev, [key]: value }));
  };

  const promptChips = [
    "Share legal name",
    "Add owner & %",
    "Request consent packet",
  ];

  const onChipSelect = (chip: string) => {
    setDraft(chip);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white to-neutral-50 px-6 py-5 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/70">ChatKit + Apps SDK</p>
          <h3 className="mt-1 text-2xl font-semibold text-black">Split Copilot replaces the forms</h3>
          <p className="mt-2 max-w-3xl text-sm text-black/70">
            The chatbot drives every step—files, parsing, KYB, and consent—so users never touch the old stepper. Only onboarding-focused widgets remain visible.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
          <span className="rounded-full bg-black px-3 py-1 text-white">GPT 5.1 Mini</span>
          <span>ChatGPT hosted + embedded</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-black/10 bg-white/90 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
              <Sparkles className="h-4 w-4" /> Conversational onboarding
            </div>
            <button
              onClick={sampleFill}
              className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FileDown className="h-4 w-4" /> Load sample data
            </button>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-3 shadow-inner">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70 mb-2">
              <MessageSquare className="h-4 w-4" /> Live thread
            </div>
            <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {messages.map(message => (
                  <ChatBubble key={message.id} message={message} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
                <UploadCloud className="h-4 w-4" /> File intake & parsing
              </div>
            </div>

            <label
              onDrop={event => {
                event.preventDefault();
                const files = event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];
                handleUpload(files);
              }}
              onDragOver={event => event.preventDefault()}
              className="mt-3 block rounded-xl border border-dashed border-black/25 bg-white/80 px-4 py-5 text-center text-sm text-black/80 shadow-inner transition hover:border-black/50"
            >
              <input type="file" accept=".pdf,.png,.jpg,.jpeg" multiple className="hidden" onChange={onFileInput} />
              <p className="font-semibold">Drop statements, IDs, or KYB packets</p>
              <p className="text-xs text-black/60">I’ll parse them with GPT 5.1 Mini and feed onboarding—no extra prompts needed.</p>
            </label>

            {uploads.length > 0 ? (
              <div className="mt-3 space-y-2">
                {uploads.map(file => (
                  <UploadRow key={file.id} file={file} />
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
              <div className="flex flex-wrap gap-2">
                {promptChips.map(chip => (
                  <button
                    key={chip}
                    onClick={() => onChipSelect(chip)}
                    className="rounded-full border border-black/15 bg-white px-3 py-1 text-[12px] font-semibold text-black transition hover:border-black/40"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-end gap-2">
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Ask Split Copilot to collect owners, check missing items, or push to ChatGPT + embed..."
                className="min-h-[84px] flex-1 resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-inner outline-none focus:border-black/30"
              />
              <button
                onClick={handleSend}
                className="inline-flex h-[84px] items-center justify-center rounded-2xl bg-black px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-black">
              <CheckCircle2 className="h-4 w-4 text-black/70" /> Live checklist
            </div>
            <p className="mt-1 text-xs text-black/70">Only onboarding tasks are shown—no extra widgets.</p>
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
