"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  Rocket,
  Shield,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useOnboarding } from "@/contexts/onboarding-context";
import clsx from "clsx";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  badge?: string;
  emphasis?: string;
}

interface UploadedDoc {
  id: string;
  name: string;
  size: number;
  status: "uploaded" | "parsed";
  note?: string;
}

const THEMES = {
  mono: {
    name: "Mono",
    primary: "from-black via-black to-neutral-800",
    accent: "bg-black text-white",
    border: "border-black/15",
    glow: "shadow-[0_10px_60px_-12px_rgba(0,0,0,0.35)]",
  },
  graphite: {
    name: "Graphite",
    primary: "from-neutral-900 via-neutral-800 to-neutral-600",
    accent: "bg-neutral-900 text-white",
    border: "border-neutral-400/60",
    glow: "shadow-[0_10px_60px_-12px_rgba(17,17,17,0.3)]",
  },
  inverted: {
    name: "Inverted",
    primary: "from-white via-neutral-100 to-neutral-200",
    accent: "bg-white text-black",
    border: "border-black/10",
    glow: "shadow-[0_10px_60px_-12px_rgba(0,0,0,0.15)]",
  },
} as const;

function ChatBubble({ message, theme }: { message: ChatMessage; theme: keyof typeof THEMES }) {
  const isUser = message.role === "user";
  const tone = THEMES[theme];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx("flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-black via-black to-neutral-800 text-white grid place-items-center">
          <Sparkles className="h-5 w-5" />
        </div>
      )}
      <div
        className={clsx(
          "max-w-[540px] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ring-1",
          isUser
            ? "bg-white text-black ring-black/10"
            : `bg-white/80 text-black ring-black/10 ${tone.glow}`
        )}
      >
        {message.badge && (
          <span className={clsx("mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest", tone.accent)}>
            {message.badge}
          </span>
        )}
        <p className="whitespace-pre-wrap text-[15px] text-black">
          {message.content}
        </p>
        {message.emphasis && (
          <p className="mt-2 rounded-xl bg-neutral-100 px-3 py-2 text-xs text-neutral-800">
            {message.emphasis}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function WidgetCard({
  title,
  icon: Icon,
  tone,
  children,
}: {
  title: string;
  icon: typeof Sparkles;
  tone: keyof typeof THEMES;
  children: React.ReactNode;
}) {
  const palette = THEMES[tone];
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border bg-white/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${palette.border}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={clsx(
            "mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white",
            palette.primary
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text-black">{title}</h4>
          </div>
          <div className="mt-2 text-sm text-black/70">{children}</div>
        </div>
      </div>
    </div>
  );
}

const starterMessages: ChatMessage[] = [
  {
    id: "intro",
    role: "assistant",
    badge: "Split Copilot",
    content:
      "Welcome to the Split onboarding studio. I'm powered by OpenAI Apps SDK, ChatKit, and AgentKit to guide merchants through KYB, funding eligibility, and compliance without leaving the chat.",
  },
  {
    id: "how-it-works",
    role: "assistant",
    content:
      "Drop business basics, owners, and statements here. I synchronize the ChatKit widgets, pre-fill the Split forms, and keep a live audit trail for underwriting.",
    emphasis: "Use the quick actions to hydrate onboarding widgets or send a custom instruction to see the orchestration update in real time.",
  },
];

export function OpenAIAppExperience() {
  const { data, updateData } = useOnboarding();
  const [theme, setTheme] = useState<keyof typeof THEMES>("mono");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [draft, setDraft] = useState("");
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);
  const [adminConfig, setAdminConfig] = useState({
    apiKeyMasked: "sk-••••split",
    projectId: "split-onboarding-app",
    model: "gpt-5.1-mini",
    embedDomain: "splitpayments.com",
    chatSurface: "ChatGPT + Embedded",
  });

  const filledSummary = useMemo(() => {
    const basics = [data.legalName, data.businessCity && `${data.businessCity}, ${data.businessState}`]
      .filter(Boolean)
      .join(" • ");
    const money = data.monthlyRevenue ? `~$${data.monthlyRevenue}/mo cards` : "Awaiting revenue";
    const processor = data.currentProcessor || "Processor unknown";

    return `${basics || "Profile pending"} • ${money} • ${processor}`;
  }, [data]);

  const pushMessage = (entry: ChatMessage) =>
    setMessages(prev => [...prev, { ...entry, id: `${entry.role}-${Date.now()}-${prev.length}` }]);

  const updateAdminField = (key: keyof typeof adminConfig, value: string) =>
    setAdminConfig(prev => ({ ...prev, [key]: value }));

  const handleSend = () => {
    if (!draft.trim()) return;
    const userEntry: ChatMessage = { role: "user", content: draft, id: `user-${Date.now()}` };
    pushMessage(userEntry);

    const summary = [
      data.legalName || "a merchant",
      data.businessType && `(${data.businessType})`,
      data.monthlyRevenue && `card volume ~${data.monthlyRevenue}/mo`,
      data.currentProcessor && `processing on ${data.currentProcessor}`,
    ]
      .filter(Boolean)
      .join(" ");

    const assistantEntry: ChatMessage = {
      role: "assistant",
      content:
        summary.length > 0
          ? `Logged your update and synced the widgets. I am now tracking ${summary}. Do you want me to draft a funding-ready submission?`
          : `Captured your note. Share card volume, processor, or ownership and I'll hydrate the widgets for you.`,
    };

    pushMessage(assistantEntry);
    setDraft("");
  };

  const hydrateBusinessBasics = () => {
    updateData({
      legalName: "Urban Grind Roasters LLC",
      dba: "Urban Grind",
      businessCity: "Austin",
      businessState: "TX",
      businessType: "Card-present + eCom",
      productsOrServices: "Cafe, beans subscription, catering",
      monthlyRevenue: "185000",
      currentProcessor: "Square Retail",
      website: "https://urbangrind.cards",
    });
    pushMessage({
      role: "assistant",
      badge: "Widget Sync",
      content:
        "Injected the merchant basics into the App Kit widgets. The Chat Kit cards now show Austin HQ, blended POS/eCom, and monthly card volume of ~$185k.",
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];
    handleUpload(fileList);
  };

  const captureDocuments = () => {
    updateData({ merchantStatements: [] });
    pushMessage({
      role: "assistant",
      content:
        "Statement ingestion ready. Drag & drop PDFs or send a secure link; the OpenAI action will normalize daily batches and surface anomalies in the transcript.",
      emphasis: "Upload widgets stay in sync whether you run this inside ChatGPT or embedded on splitpayments.com/get-started.",
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
  };

  const handleUpload = (files: File[]) => {
    if (!files.length) return;
    updateData({ merchantStatements: [...data.merchantStatements, ...files] });

    const prepared = files.map(file => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
      size: file.size,
      status: "uploaded" as const,
      note: "Queued for parsing",
    }));

    setUploads(prev => [...prev, ...prepared]);

    pushMessage({
      role: "assistant",
      badge: "File intake",
      content: `Received ${files.length} document${files.length > 1 ? "s" : ""}. I can parse statements to pre-fill revenue, processor, and ownership proof—want me to start?`,
    });
  };

  const onFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files ? Array.from(event.target.files) : [];
    handleUpload(fileList);
    event.target.value = "";
  };

  const parseUploads = () => {
    if (!uploads.length) {
      pushMessage({
        role: "assistant",
        content: "Add at least one PDF or image statement so I can extract card volume, processor, and ownership evidence.",
      });
      return;
    }

    setUploads(prev =>
      prev.map(file => ({
        ...file,
        status: "parsed",
        note: "Parsed for revenue + processor",
      }))
    );

    updateData({
      monthlyRevenue: data.monthlyRevenue || "210000",
      currentProcessor: data.currentProcessor || "Stripe + Square mix",
      ownershipPercentage: data.ownershipPercentage || "82",
    });

    pushMessage({
      role: "assistant",
      badge: "Parsed",
      content:
        "Parsed the uploaded statements and IDs. I extracted ~$210k monthly cards, detected Stripe + Square traffic, and linked the ownership affidavit to Sasha Rivera.",
      emphasis: "Want me to forward the underwriting packet or request a fresh banking letter?",
    });
  };

  const ownershipFlow = () => {
    updateData({
      ownerName: "Sasha Rivera",
      ownerTitle: "Managing Member",
      ownershipPercentage: "82",
      ownerCity: "Austin",
      ownerState: "TX",
      ownerCellPhone: "512-555-2910",
    });
    pushMessage({
      role: "assistant",
      content:
        "Captured Sasha Rivera as majority owner (82%). I will request KYC docs and signature inside Chat Kit and mirror the status back to the embed.",
    });
  };

  const publishManifests = () => {
    pushMessage({
      role: "assistant",
      badge: "Deploy",
      content:
        "Generated the ChatGPT manifest and embed bundle. The GPT 5.1 Mini runtime is pinned, and credentials will reference the admin panel inputs below.",
      emphasis: "Switch between ChatGPT-hosted and self-serve embeds without re-entering merchant data—widgets stay unified.",
    });
  };

  const quickActions = [
    { label: "Autofill business basics", icon: <Wand2 className="h-4 w-4" />, action: hydrateBusinessBasics },
    { label: "Enable statement intake", icon: <Rocket className="h-4 w-4" />, action: captureDocuments },
    { label: "Capture ownership + KYC", icon: <Shield className="h-4 w-4" />, action: ownershipFlow },
    { label: "Parse uploaded docs", icon: <Sparkles className="h-4 w-4" />, action: parseUploads },
    { label: "Publish ChatGPT + embed", icon: <Sparkles className="h-4 w-4" />, action: publishManifests },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white to-neutral-50 px-6 py-5 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/70">OpenAI Apps SDK + ChatKit</p>
          <h3 className="mt-1 text-2xl font-semibold text-black">Black & white Split Copilot</h3>
          <p className="mt-2 max-w-3xl text-sm text-black/70">
            Chat-first onboarding that mirrors our funding checklist. Actions, uploads, and consent stay synchronized across ChatGPT hosting and our embedded surface—without brand orange.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 text-right">
          <div className="flex items-center gap-2 text-[11px] text-black/70">
            <span className="rounded-full bg-black px-2 py-1 font-semibold uppercase tracking-[0.18em] text-white">Live</span>
            <span>ChatKit workspace</span>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {Object.entries(THEMES).map(([key, palette]) => (
              <button
                key={key}
                onClick={() => setTheme(key as keyof typeof THEMES)}
                className={clsx(
                  "flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition",
                  theme === key
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-black hover:border-black/30"
                )}
              >
                <span className={clsx("h-3 w-3 rounded-full bg-gradient-to-r", (palette as { primary: string }).primary)} />
                {palette.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-black/10 bg-white/90 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-black">
              <MessageCircle className="h-4 w-4 text-black/60" />
              Chat Kit thread for onboarding
            </div>
            <div className="flex items-center gap-2 text-[11px] text-black/70">
              <span className="rounded-full bg-black px-2 py-1 font-semibold uppercase tracking-[0.18em] text-white">Synced</span>
              <span>Widgets + AgentKit actions</span>
            </div>
          </div>

          <div className="grid gap-3">
            {messages.map(message => (
              <ChatBubble key={message.id} message={message} theme={theme} />
            ))}
          </div>

          <div className="rounded-2xl border border-black/10 bg-neutral-50/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/70">Quick actions</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {quickActions.map(action => (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm transition hover:-translate-y-0.5 hover:border-black/30 hover:shadow-md"
                >
                  <span className="rounded-full bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    Action
                  </span>
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/90 p-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
                <Sparkles className="h-4 w-4" /> File uploads + parsing
              </div>
              <button
                onClick={parseUploads}
                className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Sparkles className="h-4 w-4" /> Parse with GPT 5.1 Mini
              </button>
            </div>

            <label
              onDrop={handleDrop}
              onDragOver={event => event.preventDefault()}
              className="mt-3 block rounded-xl border border-dashed border-black/20 bg-neutral-50 px-4 py-5 text-center text-sm text-black/70 shadow-inner transition hover:border-black/40"
            >
              <input type="file" accept=".pdf,.png,.jpg,.jpeg" multiple className="hidden" onChange={onFileInput} />
              <p className="font-semibold text-black">Drop statements, IDs, or KYB packets</p>
              <p className="text-xs text-black/60">I will extract revenue, processors, ownership, and signatures for onboarding only.</p>
            </label>

            {uploads.length > 0 ? (
              <div className="mt-3 space-y-2">
                {uploads.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-black via-black to-neutral-800 text-white grid place-items-center text-[11px] font-bold uppercase">
                        {file.status === "parsed" ? "AI" : "PDF"}
                      </div>
                      <div>
                        <p className="font-semibold">{file.name}</p>
                        <p className="text-xs text-black/60">
                          {formatSize(file.size)} · {file.note}
                        </p>
                      </div>
                    </div>
                    <span
                      className={clsx(
                        "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                        file.status === "parsed"
                          ? "bg-black text-white"
                          : "border border-black/20 bg-white text-black"
                      )}
                    >
                      {file.status === "parsed" ? "Parsed" : "Uploaded"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 rounded-xl bg-neutral-50 px-3 py-2 text-xs text-black/60">
                No files yet. Drop PDFs or images to let Split Copilot parse them conversationally.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-[13px] text-black/80">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-black via-black to-neutral-800 text-white grid place-items-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-black">Prompted for payments onboarding only</p>
              <p className="text-black/70">Flows stay focused on KYB, funding files, and consent—no extra widgets beyond onboarding.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/70">
              <Sparkles className="h-4 w-4" /> Compose a message
            </div>
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Ask Split Copilot to prep KYB packets, request statements, or publish the ChatGPT app..."
                className="min-h-[72px] flex-1 resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-inner outline-none focus:border-black/30"
              />
              <button
                onClick={handleSend}
                className="inline-flex h-[72px] items-center justify-center rounded-2xl bg-black px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-black">
                <Shield className="h-4 w-4 text-black/60" /> Admin control board
              </div>
              <span className="rounded-full bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">GPT 5.1 Mini</span>
            </div>
            <p className="mt-2 text-sm text-black/70">
              Set the OpenAI credentials, pin GPT 5.1 Mini, and control where the onboarding app is hosted. Updates stream into the ChatKit session instantly.
            </p>
            <div className="mt-3 grid gap-3">
              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70">OpenAI credentials</label>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-neutral-50/80 p-3">
                  <p className="text-xs font-semibold text-black">API Key</p>
                  <input
                    value={adminConfig.apiKeyMasked}
                    onChange={e => updateAdminField("apiKeyMasked", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/30"
                  />
                  <p className="mt-1 text-[11px] text-black/60">Stored server-side; never exposed to end users.</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-neutral-50/80 p-3">
                  <p className="text-xs font-semibold text-black">Project ID</p>
                  <input
                    value={adminConfig.projectId}
                    onChange={e => updateAdminField("projectId", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/30"
                  />
                  <p className="mt-1 text-[11px] text-black/60">Used for ChatKit uploads and AgentKit action auth.</p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-neutral-50/80 p-3">
                  <p className="text-xs font-semibold text-black">Model</p>
                  <select
                    value={adminConfig.model}
                    onChange={e => updateAdminField("model", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/30"
                  >
                    <option value="gpt-5.1-mini">GPT 5.1 Mini</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                  </select>
                  <p className="mt-1 text-[11px] text-black/60">Recommended: GPT 5.1 Mini for responsive onboarding.</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-neutral-50/80 p-3">
                  <p className="text-xs font-semibold text-black">Hosting surface</p>
                  <select
                    value={adminConfig.chatSurface}
                    onChange={e => updateAdminField("chatSurface", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/30"
                  >
                    <option>ChatGPT + Embedded</option>
                    <option>ChatGPT only</option>
                    <option>Embedded only</option>
                  </select>
                  <p className="mt-1 text-[11px] text-black/60">Switching surfaces keeps the same ChatKit state.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-neutral-50/80 p-3">
                <p className="text-xs font-semibold text-black">Embed domain</p>
                <input
                  value={adminConfig.embedDomain}
                  onChange={e => updateAdminField("embedDomain", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/30"
                />
                <p className="mt-1 text-[11px] text-black/60">Example: splitpayments.com/get-started for the replaced form.</p>
              </div>
            </div>
          </div>

          <WidgetCard title="Onboarding widgets" icon={Rocket} tone={theme}>
            <p className="text-black/70">
              ChatKit cards stay focused on onboarding: KYB autofill, statement uploads, consent, and offer review. Each widget writes to the same Split data model.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-black">
              <span className="flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 font-semibold text-black">
                <CheckCircle2 className="h-4 w-4 text-black" /> KYB autofill
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 font-semibold text-black">
                <CheckCircle2 className="h-4 w-4 text-black" /> Statements + docs
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 font-semibold text-black">
                <CheckCircle2 className="h-4 w-4 text-black" /> Ownership + KYC
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 font-semibold text-black">
                <CheckCircle2 className="h-4 w-4 text-black" /> Offer + consent
              </span>
            </div>
          </WidgetCard>

          <WidgetCard title="Brand-safe theming" icon={Sparkles} tone={theme}>
            <p className="text-black/70">
              Only black and white tokens are used. The preset you choose applies to the ChatGPT-hosted app and your embedded widget at once.
            </p>
            <div className="mt-3 rounded-2xl border border-dashed border-black/15 bg-white/80 p-3 text-xs text-black/70">
              <div className="flex items-center gap-2 text-black">
                <div className="h-2 w-10 rounded-full bg-gradient-to-r from-black via-neutral-800 to-neutral-600" />
                <span className="font-semibold">{THEMES[theme].name} preset</span>
              </div>
              <p className="mt-1">Matches the funding, payments, and home pages with no brand orange applied here.</p>
            </div>
          </WidgetCard>

          <WidgetCard title="Deployment snapshot" icon={MessageCircle} tone={theme}>
            <p className="text-black/70">Ready for dual hosting:</p>
            <ul className="mt-2 space-y-1 text-black/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                <span>
                  <strong>ChatGPT App:</strong> Manifest with onboarding actions, AgentKit webhooks, and upload widgets pinned to GPT 5.1 Mini.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                <span>
                  <strong>Embedded widget:</strong> Iframe + script for {adminConfig.embedDomain}, inheriting the black & white theme and the same live thread.
                </span>
              </li>
            </ul>
            <div className="mt-3 rounded-2xl border border-black/10 bg-neutral-50 px-3 py-2 text-[11px] text-black/80">
              <p className="font-semibold uppercase tracking-[0.18em] text-black">Current snapshot</p>
              <p className="mt-1">{filledSummary}</p>
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
