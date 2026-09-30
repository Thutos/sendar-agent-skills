# Sendar for AI agents

Portable skills and plugin manifests for integrating application email with Sendar.

## Install skills

```sh
npx skills add Thutos/sendar-agent-skills
```

Choose the agents and skills in the installer. Skills can write integration code without an account connection. Review files before installing third-party skills.

## Replit

Import `https://github.com/Thutos/sendar-agent-skills` through **+ → Use a skill → GitHub import**, preview and select the three skills. Or run in the project shell:

```sh
npx skills add Thutos/sendar-agent-skills --agent replit
```

Files live in `.agents/skills`. Keep `SENDAR_API_KEY` in Replit Secrets and server-side code. Installing skills is separate from connecting an account or authorizing a send. [Replit setup](https://sendar.app/ai/replit?utm_source=replit&utm_medium=skill&utm_campaign=agent-distribution).

## Windsurf / Devin Desktop

```sh
npx skills add Thutos/sendar-agent-skills --agent windsurf
```

The installer uses `.agents/skills` with links under `.windsurf/skills`. Current Devin Desktop also discovers `.agents/skills`; `.devin/skills` is its preferred manual-install location. In Cascade, invoke `@sendar-integrate`, `@sendar-delivery`, or `@sendar-migrate`. [Windsurf setup](https://sendar.app/ai/windsurf?utm_source=windsurf&utm_medium=skill&utm_campaign=agent-distribution).

Both CLI installation layouts were tested in an isolated project on 30 September 2026, including supporting reference files. These are installation checks, not claims of end-to-end execution in Replit/Cascade or partner-directory approval.

## Connect MCP

Remote endpoint: **https://sendar.app/api/mcp** (Streamable HTTP).

- Claude Code: `claude mcp add --transport http sendar https://sendar.app/api/mcp`, then connect from `/mcp`.
- Codex: `codex mcp add sendar --url https://sendar.app/api/mcp`, then `codex mcp login sendar`.
- Cursor: merge `configs/cursor.json` into your MCP configuration; use the connection/authentication control.
- VS Code/Copilot: merge `configs/vscode.json` into `.vscode/mcp.json`; start the server and follow authentication.
- ChatGPT and Claude web: add the endpoint as a custom connector where your account supports it. Curated marketplace listing is separate and may require review.

OAuth uses S256 PKCE and dynamic public-client registration. During consent, read-only is the default; sending is optional and restricted to a verified domain, a daily recipient allowance and an optional recipient list. Revoke from https://sendar.app/agent-connections. Client names in consent are self-declared, not platform identity verification.

Existing API keys also work as an Authorization Bearer header, with their existing permissions. Keep them in a private environment/secret store, not checked-in configuration. Clients without OAuth support can use this path if they support secret headers.

## Plugin packages

This repository contains Codex, Claude Code and Cursor manifests pointing to the same skills and MCP server. For Claude Code, add this repository as a plugin marketplace, then install `sendar@sendar`. Marketplace submissions are tracked separately; the existence of a manifest is not an endorsement or listing.

## Tools

`get_setup_status`, `preview_email`, `list_domains`, `list_templates`, `list_emails`, `get_email_status`, and (when permitted) `send_email`.

Live sending needs task authorisation, `confirmed: true`, and a stable `idempotency_key`. Preview does not send. Do not retry an uncertain outcome with a new key. “Sent” means provider acceptance, not inbox delivery.

## App builders

For Lovable, Replit, Bolt and v0, use https://sendar.app/ai and the server-side starters at https://github.com/Thutos/sendar-email-starters. Ask the builder to integrate the existing application event and store `SENDAR_API_KEY` in its private server environment. These recipes do not imply a native marketplace listing.

## Compatibility and support

See https://sendar.app/ai for instructions and releases. Protocol/authentication tests are automated against a disposable database. Individual client sign-in and curated marketplace approval must be verified separately. Report integration issues through GitHub Issues without credentials, private recipients or message bodies.

Privacy: https://sendar.app/privacy · Terms: https://sendar.app/terms
