"use client";

import { useMemo, useState } from "react";
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

const THEMES = {
  cobalt: {
    name: "Cobalt",
    primary: "from-blue-900 via-blue-700 to-sky-500",
    accent: "bg-blue-100 text-blue-900",
    border: "border-blue-300",
    glow: "shadow-[0_10px_60px_-12px_rgba(37,99,235,0.45)]",
  },
  obsidian: {
    name: "Obsidian",
    primary: "from-slate-900 via-slate-800 to-purple-700",
    accent: "bg-slate-900 text-white",
    border: "border-slate-700",
    glow: "shadow-[0_10px_60px_-12px_rgba(76,29,149,0.45)]",
  },
  sunset: {
    name: "Sunset",
    primary: "from-orange-600 via-pink-500 to-rose-500",
    accent: "bg-orange-100 text-orange-950",
    border: "border-orange-300",
    glow: "shadow-[0_10px_60px_-12px_rgba(249,115,22,0.4)]",
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
        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white grid place-items-center">
          <Sparkles className="h-5 w-5" />
        </div>
      )}
      <div
        className={clsx(
          "max-w-[540px] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ring-1",
          isUser
            ? "bg-white text-slate-900 ring-slate-200"
            : `bg-white/70 text-slate-900 ring-slate-200 ${tone.glow}`
        )}
      >
        {message.badge && (
          <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-white">
            {message.badge}
          </span>
        )}
        <p className="whitespace-pre-wrap text-[15px] text-slate-900">
          {message.content}
        </p>
        {message.emphasis && (
          <p className="mt-2 rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-700">
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
            <h4 className="text-base font-semibold text-slate-900">{title}</h4>
          </div>
          <div className="mt-2 text-sm text-slate-700">{children}</div>
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
      "Welcome to the Split Payments onboarding studio. I use the OpenAI Apps SDK Kit + Chat Kit to capture your merchant profile and publish a ready-to-embed experience for ChatGPT or your site.",
  },
  {
    id: "how-it-works",
    role: "assistant",
    content:
      "Share your card volume, ownership, and processing history. I will hydrate widgets, generate funding-ready packets, and keep the conversation aligned with our compliance checklist.",
    emphasis: "Try the quick actions to push data into widgets or type your own update to see the orchestration in action.",
  },
];

export function OpenAIAppExperience() {
  const { data, updateData } = useOnboarding();
  const [theme, setTheme] = useState<keyof typeof THEMES>("cobalt");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [draft, setDraft] = useState("");

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

  const captureDocuments = () => {
    updateData({ merchantStatements: [] });
    pushMessage({
      role: "assistant",
      content:
        "Statement ingestion ready. Drag & drop PDFs or send a secure link; the OpenAI action will normalize daily batches and surface anomalies in the transcript.",
      emphasis: "Upload widgets stay in sync whether you run this inside ChatGPT or embedded on splitpayments.com/get-started.",
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

  const quickActions = [
    {
      label: "Hydrate business basics",
      icon: <Wand2 className="h-4 w-4" />,
      action: hydrateBusinessBasics,
    },
    {
      label: "Enable statement upload widget",
      icon: <Rocket className="h-4 w-4" />,
      action: captureDocuments,
    },
    {
      label: "Capture ownership + KYC",
      icon: <Shield className="h-4 w-4" />,
      action: ownershipFlow,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 px-6 py-5 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">OpenAI Apps SDK Kit</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-900">Chat-native onboarding for Split</h3>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Launch the same flow inside ChatGPT or as an embedded widget. Actions, forms, and uploads stay synchronized through the Chat Kit runtime.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {Object.entries(THEMES).map(([key, palette]) => (
            <button
              key={key}
              onClick={() => setTheme(key as keyof typeof THEMES)}
              className={clsx(
                "flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition",
                theme === key
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              )}
            >
              <span
                className={clsx(
                  "h-3 w-3 rounded-full bg-gradient-to-r",
                  (palette as { primary: string }).primary
                )}
              />
              {palette.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <MessageCircle className="h-4 w-4 text-slate-500" />
              Chat Kit thread
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <span className="rounded-full bg-slate-900 px-2 py-1 font-semibold uppercase tracking-[0.18em] text-white">Live</span>
              <span>Synced to App Kit widgets</span>
            </div>
          </div>

          <div className="grid gap-3">
            {messages.map(message => (
              <ChatBubble key={message.id} message={message} theme={theme} />
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">Quick actions</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {quickActions.map(action => (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    Action
                  </span>
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white grid place-items-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Branded prompt orchestration</p>
              <p className="text-slate-600">Theme controls match the ChatGPT container and your embedded site—no code changes needed.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              <Sparkles className="h-4 w-4" /> Compose a message
            </div>
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Ask Split Copilot to build an App Kit, request a funding estimate, or sync a new location..."
                className="min-h-[72px] flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner outline-none focus:border-slate-400"
              />
              <button
                onClick={handleSend}
                className="inline-flex h-[72px] items-center justify-center rounded-2xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <WidgetCard title="Funding-ready widgets" icon={Rocket} tone={theme}>
            <p className="text-slate-700">
              Chat Kit renders the same cards in ChatGPT and your site. Users can upload statements, accept the authorization terms, and trigger webhook actions without leaving the thread.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-700">
              <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 font-semibold text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Live uploads
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 font-semibold text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Consent capture
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 font-semibold text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Offer preview
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 font-semibold text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Action webhooks
              </span>
            </div>
          </WidgetCard>

          <WidgetCard title="Brand-safe theming" icon={Sparkles} tone={theme}>
            <p className="text-slate-700">
              Toggle presets or pass your own gradient tokens. The same palette is applied to the ChatGPT app, embedded iframe, and the hosted Split domain.
            </p>
            <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white/80 p-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 text-slate-900">
                <div className="h-2 w-10 rounded-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500" />
                <span className="font-semibold">{THEMES[theme].name} gradient</span>
              </div>
              <p className="mt-1">Mirrors the Chat Kit color system and supports dynamic light/dark in ChatGPT.</p>
            </div>
          </WidgetCard>

          <WidgetCard title="App Kit deployment" icon={MessageCircle} tone={theme}>
            <p className="text-slate-700">Two ready-to-ship surfaces:</p>
            <ul className="mt-2 space-y-1 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                <span>
                  <strong>ChatGPT App:</strong> publish the manifest with the onboarding actions, webhooks, and upload widgets.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                <span>
                  <strong>Embedded widget:</strong> drop the generated script into splitpayments.com or any partner portal—identity and consent stay linked to the thread.
                </span>
              </li>
            </ul>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
              <p className="font-semibold uppercase tracking-[0.18em] text-slate-900">Current snapshot</p>
              <p className="mt-1">{filledSummary}</p>
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
