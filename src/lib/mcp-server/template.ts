// This file is auto-generated or manually embedded to avoid FS issues in Vercel.
export const WIDGET_TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      :root {
        color-scheme: light dark;
        --bg: #0f172a;
        --panel: #111827;
        --border: #1f2937;
        --muted: #9ca3af;
        --accent: #6ee7b7;
        --accent-strong: #34d399;
        --text: #e5e7eb;
      }

      body {
        margin: 0;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: var(--bg);
        color: var(--text);
      }

      .panel {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 16px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
      }

      h1 {
        font-size: 18px;
        margin: 0 0 8px;
      }

      .subtitle {
        color: var(--muted);
        font-size: 13px;
        margin-bottom: 16px;
      }

      .status-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        font-size: 13px;
      }

      .pill {
        padding: 4px 10px;
        background: rgba(110, 231, 183, 0.08);
        color: var(--accent);
        border-radius: 999px;
        border: 1px solid rgba(110, 231, 183, 0.35);
        font-weight: 600;
        font-size: 12px;
      }

      .sections {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 12px;
      }

      .section-card {
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 12px;
        background: #0b1223;
      }

      .section-card[data-active="true"] {
        border-color: var(--accent);
        box-shadow: 0 0 0 1px rgba(110, 231, 183, 0.4);
      }

      .section-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
      }

      .progress {
        height: 6px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 999px;
        overflow: hidden;
        margin: 8px 0;
      }

      .progress > span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, var(--accent), var(--accent-strong));
      }

      .fields {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
      }

      label {
        font-size: 13px;
        color: var(--text);
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      input {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.02);
        color: var(--text);
      }

      input:focus {
        outline: 2px solid var(--accent);
      }

      .helper {
        color: var(--muted);
        font-size: 12px;
      }

      .actions {
        margin-top: 16px;
        display: flex;
        gap: 8px;
      }

      button {
        background: var(--accent);
        color: #0b1223;
        border: none;
        border-radius: 10px;
        padding: 10px 14px;
        font-weight: 700;
        cursor: pointer;
      }

      button.secondary {
        background: transparent;
        color: var(--muted);
        border: 1px solid var(--border);
      }

      .empty {
        text-align: center;
        padding: 32px;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <div class="panel">
      <h1>Business onboarding</h1>
      <div class="subtitle">Drive the same flow the Portal uses to collect business profile details.</div>
      <div class="status-row" id="statusRow"></div>
      <div class="sections" id="sections"></div>
      <div class="actions">
        <button id="refresh">Reload profile</button>
        <button class="secondary" id="reset">Reset progress</button>
      </div>
      <div class="empty" id="emptyState" hidden>No sections are configured yet.</div>
    </div>
    <script type="module">
      const openai = window.openai;
      let state = { ...(openai.widgetState || {}) };

      function formatPercent(value) {
        return `${Math.min(100, Math.max(0, Math.round(value ?? 0)))}%`;
      }

      function renderStatus(data) {
        const container = document.getElementById("statusRow");
        const completion = formatPercent(data?.completionPercent);
        const required = formatPercent(data?.requiredCompletionPercent);
        const pill = document.createElement("span");
        pill.className = "pill";
        pill.textContent = data?.onboardingStatus === "complete" ? "Complete" : "In progress";
        const status = document.createElement("div");
        status.textContent = `Required fields: ${required}`;
        const next = document.createElement("div");
        next.textContent = data?.nextSection ? `Next: ${data.nextSection.title}` : "All sections reviewed.";
        container.replaceChildren(pill, status, next);
      }

      function resolveAccountId(metadata) {
        const candidate =
          state.accountId ||
          metadata?.accountId ||
          openai.toolResponseMetadata?.accountId ||
          openai.toolOutput?.accountId;

        return candidate && String(candidate).trim().length > 0 ? String(candidate) : null;
      }

      function resolveMetadata() {
        return (
          openai.toolResponseMetadata ||
          openai.toolOutput?.toolResponseMetadata ||
          openai.toolOutput?._meta ||
          state.metadata
        );
      }

      function saveWidgetState(partial) {
        const next = { ...state, ...partial };
        state = next;
        openai.setWidgetState(next);
      }

      function onInputChange(event) {
        const input = event.target;
        if (!input.dataset.section || !input.dataset.field) return;
        openai
          .callTool("update_business_profile_field", {
            accountId: resolveAccountId(resolveMetadata()),
            sectionKey: input.dataset.section,
            fieldKey: input.dataset.field,
            value: input.value,
          })
          .catch((error) => console.error("Failed to save field", error));
      }

      function renderSections(meta) {
        const container = document.getElementById("sections");
        const empty = document.getElementById("emptyState");
        if (!meta?.sections?.length) {
          container.innerHTML = "";
          empty.hidden = false;
          return;
        }

        empty.hidden = true;
        const activeSection = state.activeSection || meta.sections[0].key;
        const cards = meta.sections.map((section) => {
          const wrapper = document.createElement("div");
          wrapper.className = "section-card";
          wrapper.dataset.active = String(section.key === activeSection);
          wrapper.onclick = () => {
            saveWidgetState({ activeSection: section.key });
            renderSections(meta);
          };

          const header = document.createElement("div");
          header.className = "section-title";
          header.innerHTML = `<span>${section.title}</span><span class="pill">
            ${section.fields.filter((f) => f.value).length}/${section.fields.length}</span>`;

          const progress = document.createElement("div");
          progress.className = "progress";
          const percent = Math.round((section.fields.filter((f) => f.value).length / section.fields.length) * 100);
          progress.innerHTML = `<span style="width:${percent}%"></span>`;

          const fields = document.createElement("div");
          fields.className = "fields";
          if (section.key === activeSection) {
            section.fields.forEach((field) => {
              const label = document.createElement("label");
              label.innerHTML = `${field.label}${field.required ? " *" : ""}`;
              const input = document.createElement("input");
              input.dataset.section = section.key;
              input.dataset.field = field.key;
              input.value = field.value ?? "";
              input.placeholder = field.helper ?? "";
              input.addEventListener("change", onInputChange);
              label.appendChild(input);
              if (field.helper) {
                const helper = document.createElement("div");
                helper.className = "helper";
                helper.textContent = field.helper;
                label.appendChild(helper);
              }
              fields.appendChild(label);
            });
          } else {
            const hint = document.createElement("div");
            hint.className = "helper";
            hint.textContent = "Select to edit fields.";
            fields.appendChild(hint);
          }

          wrapper.appendChild(header);
          wrapper.appendChild(progress);
          wrapper.appendChild(fields);
          return wrapper;
        });

        container.replaceChildren(...cards);
        openai.notifyIntrinsicHeight?.();
      }

      function wireButtons() {
        const refresh = document.getElementById("refresh");
        refresh.onclick = () => {
          const accountId = resolveAccountId(resolveMetadata());
          const payload = { restart: false };
          if (accountId) payload.accountId = accountId;

          openai
            .callTool("load_business_profile", {
              ...payload,
            })
            .then((response) => {
              const metadata = response?.toolResponseMetadata || response?._meta || resolveMetadata();
              if (metadata?.sections?.length) {
                saveWidgetState({ metadata, accountId: resolveAccountId(metadata) });
                renderStatus(response?.structuredContent || openai.toolOutput);
                renderSections(metadata);
              }
            })
            .catch((error) => console.error("Failed to refresh profile", error));
        };

        const reset = document.getElementById("reset");
        reset.onclick = () => {
          const accountId = resolveAccountId(resolveMetadata());
          const resetPromise = accountId
            ? openai.callTool("reset_business_profile", { accountId })
            : openai.callTool("load_business_profile", { restart: true });

          resetPromise
            .then((response) => {
              const metadata = response?.toolResponseMetadata || response?._meta || resolveMetadata();
              if (metadata?.sections?.length) {
                saveWidgetState({ metadata, accountId: resolveAccountId(metadata) });
                renderStatus(response?.structuredContent || openai.toolOutput);
                renderSections(metadata);
              }
            })
            .catch((error) => console.error("Failed to reset profile", error));
        };
      }

      async function init() {
        renderStatus(openai.toolOutput);
        const metadata = resolveMetadata();
        const accountId = resolveAccountId(metadata);
        saveWidgetState({ accountId, metadata });
        if (metadata?.sections?.length) {
          renderSections(metadata);
        } else {
          try {
            const payload = {};
            if (accountId) payload.accountId = accountId;
            const response = await openai.callTool("load_business_profile", { ...payload, restart: false });
            const metaFromResponse = response?.toolResponseMetadata || response?._meta || metadata;
            if (metaFromResponse?.sections?.length) {
              saveWidgetState({ metadata: metaFromResponse, accountId: resolveAccountId(metaFromResponse) });
              renderStatus(response?.structuredContent || openai.toolOutput);
              renderSections(metaFromResponse);
            }
          } catch (error) {
            console.error("Failed to bootstrap onboarding", error);
          }
        }
        wireButtons();
      }

      init();
    </script>
  </body>
</html>`