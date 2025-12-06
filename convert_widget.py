import os

with open("mcp/widget_source.html", "r") as f:
    raw = f.read()

escaped = raw.replace("`", "\\`").replace("${", "\\${ ")

ts_header = "// This file is auto-generated or manually embedded to avoid FS issues in Vercel.\n"
ts_content = f"export const WIDGET_TEMPLATE = `{escaped}`\n"

with open("src/lib/mcp-server/template.ts", "w") as f:
    f.write(ts_header + ts_content)