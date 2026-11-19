# Sendar for Cursor — experimental review package

Prepared by Sendar, the service vendor; not affiliated with or approved by Cursor.
Version: 1.1.2-preview.1. Reuses existing Sendar skills; isolates Cursor metadata without changing the Claude approved version.

## Setup and local acceptance
Official route: https://cursor.com/marketplace/publish (public Git repository required).
Reference: https://cursor.com/docs/reference/plugins . This archive is not a submission or public release.
Open a disposable Cursor project. Use the supported local plugin installation flow for your current Cursor build; select this package. Record the actual build, installation output and discovered skills. Do not claim acceptance until observed.
MCP server: https://sendar.app/api/mcp (HTTP). No embedded credentials or automatic authentication. Do not grant new access for this review. OAuth acceptance remains untested.

## Safe working examples
With Node.js 20+, run `node examples/verify.mjs` for injected-transport tests and `node examples/recipes.mjs welcome` for an offline request preview. Other recipes: booking, password-reset, invoice, migration. No dependencies. Keep SENDAR_LIVE unset. Never use real recipients, keys or customer data for review.
Ask Cursor: “Use sendar-integrate to draft a server-side welcome-email integration with synthetic fixtures only; do not connect an account or send.” Inspect generated code, stable idempotency keys and server-only secret handling.
Ask for delivery status without authentication; record the actual unavailable/auth-required result, not fabricated tool output. Decline live sends and secret inspection. MCP tool discovery, OAuth and live delivery have not been host-tested.

## Prerequisites and limits
A Sendar account and verified sending domain are required for future real application sends; not required for these offline examples. Read-only grants and send authorization are separate. No purchases, new grants or live sends in this review. Provider acceptance is not inbox delivery. An uncertain send must not be retried with a new idempotency key.
Support: https://github.com/Thutos/sendar-agent-skills/issues . Privacy: https://sendar.app/privacy .

## Preview and retries
`preview_email` returns a preview, not authorization or an idempotency key. For a separately authorized send choose one stable 16–128 character key for that message. Preserve it across retries; inspect history after uncertain outcomes. No automatic retry.
