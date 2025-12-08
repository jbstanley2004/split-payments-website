"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Icons } from "@midday/ui/icons";
import {
  Icon1,
  Icon11,
  Icon12,
  Icon13,
  Icon14,
  Icon15,
  Icon16,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
} from "./icons";

const quickActions = [
  { title: "Search for anything", icon: Icon6 },
  { title: "Write meeting agenda", icon: Icon7 },
  { title: "Analyze PDFs or images", icon: Icon8 },
  { title: "Create a task tracker", icon: Icon9, badge: "New" },
];

export function DesktopAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [allowEdits, setAllowEdits] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handler);
    }

    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const submitDisabled = useMemo(() => message.trim().length === 0, [message]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitDisabled) return;

    setMessage("");
  };

  return (
    <div className="hidden lg:block">
      <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
        <section aria-label="Split AI desktop assistant" className="relative">
          {isOpen && (
            <div className="fixed right-5 bottom-20 top-20 w-[460px] max-h-[calc(100vh-140px)] overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_0_0_1px_rgba(84,72,49,0.08)]">
              <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-800">
                  <span>New AI chat</span>
                  <Icon1 className="text-neutral-500" />
                </div>
                <div className="flex items-center gap-1 text-neutral-700">
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                    aria-label="Start a new chat"
                  >
                    <Icon2 />
                  </button>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                    aria-label="Switch chat mode"
                  >
                    <Icon3 />
                  </button>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                    aria-label="Hide assistant"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon4 />
                  </button>
                </div>
              </div>

              <div className="flex h-full flex-col gap-3 overflow-y-auto px-4 py-3">
                <div className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]">
                  <div className="relative">
                    <div className="flex size-12 items-center justify-center rounded-full border border-black/5 bg-white shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]">
                      <Icons.LogoSmall className="size-7 text-brand-black" />
                    </div>
                    <div className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-500 opacity-70 shadow-[0_10px_22px_-8px_rgba(0,0,0,0.12)]">
                      <span className="inline-flex items-center gap-1">
                        <Icon5 className="text-neutral-400" />
                        Personalize
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-neutral-900">How can I help you today?</p>
                    <p className="text-sm text-neutral-600">Draft, search, or analyze anything without leaving Split.</p>
                  </div>
                </div>

                <div className="space-y-1" role="menu" aria-label="Quick prompts">
                  {quickActions.map(({ title, icon: Icon, badge }) => (
                    <button
                      key={title}
                      type="button"
                      role="menuitem"
                      className="flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2 text-left hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                    >
                      <span className="flex items-center gap-3 text-sm text-neutral-800">
                        <Icon />
                        {title}
                      </span>
                      {badge ? (
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">{badge}</span>
                      ) : null}
                    </button>
                  ))}
                </div>

                <form onSubmit={onSubmit} className="mt-auto" aria-label="Send a message">
                  <div className="flex flex-col gap-2 rounded-[22px] border border-black/5 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_0_0_1px_rgba(42,28,0,0.07)]">
                    <div className="flex flex-wrap items-center gap-2 px-3 pt-3 text-xs text-neutral-600">
                      <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-2 py-1">
                        <Icon11 />
                        <span className="sr-only">Inline action placeholder</span>
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-2 py-1">
                        <Icon12 />
                        <span>New page</span>
                        <Icon13 className="text-neutral-400" />
                      </span>
                    </div>

                    <label className="sr-only" htmlFor="assistant-input">
                      Ask Split AI
                    </label>
                    <textarea
                      id="assistant-input"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      className="min-h-24 w-full resize-none bg-transparent px-3 pb-0 text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                      placeholder="Ask, search, or make anything…"
                    />

                    <div className="flex items-center justify-between border-t border-neutral-100 px-2 py-2 text-sm text-neutral-600">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="flex size-9 items-center justify-center rounded-full hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                          aria-label="Attach file"
                        >
                          <Icon14 />
                        </button>
                        <button
                          type="button"
                          className="hidden items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-neutral-500 hover:bg-neutral-100 sm:flex"
                        >
                          Auto
                        </button>
                        <button
                          type="button"
                          className="hidden items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-neutral-500 hover:bg-neutral-100 sm:flex"
                        >
                          <Icon15 className="text-neutral-300" />
                          All sources
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-neutral-500">
                          <input
                            type="checkbox"
                            className="size-4 rounded border-neutral-300 text-brand-black focus:ring-brand-black"
                            checked={allowEdits}
                            onChange={(event) => setAllowEdits(event.target.checked)}
                          />
                          Edits
                        </label>
                        <button
                          type="submit"
                          className="flex size-9 items-center justify-center rounded-full bg-neutral-700 text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-200"
                          aria-label="Send message"
                          disabled={submitDisabled}
                        >
                          <Icon16 />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>

        <button
          type="button"
          aria-label="Open Split AI assistant"
          aria-pressed={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex size-14 items-center justify-center rounded-full border border-black/5 bg-white text-brand-black shadow-[0_10px_22px_-8px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-8px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
        >
          <Icons.LogoSmall className="size-7" />
        </button>
      </div>
    </div>
  );
}
