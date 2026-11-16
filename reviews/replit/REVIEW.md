# Replit partner review packet — 0.1.7 (experimental, not submitted)

Publisher: Sendar, https://sendar.app. We are affiliated with Sendar; no Replit affiliation or approval is claimed.

## Requested review

Review Sendar for the audited partner-skills catalogue. Ask the integration team for native connector criteria separately. Public external skill installation and a user-created custom connector are not a partner listing. Existing partner application attempt: 13 October 2026, https://replit.com/partners; receipt unconfirmed. Check correspondence before a single substantive follow-up; do not file a duplicate application.

## Contents and working examples

Five dependency-free Node examples: welcome, booking, password reset, invoice, migration. `node .agents/skills/sendar-email-review/scripts/recipes.mjs welcome` previews a mock request only. `npm test` exercises all five and transport failures. `npm run review` writes a source-hashed `review-result.json`. These scripts require Node >=20 and no dependencies, API keys, account grants or live email.

In a disposable Replit Node project import this exact archive, inspect source, and run `npm run review` in Shell only after confirming no additional paid usage. Retain project URL, dated console output and generated JSON. A local report alone does not prove Replit execution. Do not deploy, start Agent, attach customer credentials or send real email. `.replit` Run starts the mock-only report Preview; it does not deploy.

## API provenance and limitations

Recipe request matches the local Sendar source: POST `/api/emails`, Bearer authentication, JSON message fields; `artifacts/api-server/src/routes/emails.ts` and `middlewares/agent-send.ts`. Stable 16–128-character event IDs are preserved as Idempotency-Key. Mock success is not live API acceptance or delivery. Transport uncertainty stops; no automatic retry; inspect message history before deciding what to do next. No exactly-once delivery guarantee is claimed.

Real use separately requires a functioning Sendar service, private server-side key, verified sender, authorized recipients, appropriate plan/quota, preview and exact send authorization. No real send is part of this review. Current production availability is not established by this packet.

## Distribution evidence

- https://docs.replit.com/features/agent/skills-directory distinguishes audited picker/partner skills from external community skills. Sendar absent from partner table at check on 20 October 2026.
- https://docs.replit.com/features/integrations/custom-connectors documents workspace-admin Pro/Enterprise custom API connectors, not a public listing route. No purchase or new security grant authorized.
- https://replit.com/partners is official intake; the public skills page does not establish a self-service audited-skill submission route.

Existing public skills: https://github.com/Thutos/sendar-agent-skills (recorded 1.0.1, commit 27d597148cb9cfb8bca4330100bac8b27f3bd978). This packet does not replace or publish that package. The 1.1.0 review copy is separate; do not conflate versions.

## Proposed follow-up (not sent)

Subject: Sendar partner-skills application — mock review packet and correct intake

Hello Replit partnerships team — I am with Sendar. We attempted the partner application on 13 October but do not yet have a confirmed receipt. Before duplicating it, could you confirm the correct route for an audited Sendar partner skill, and whether native connector review has separate requirements? We have a dependency-free Node review packet (0.1.7) covering five email patterns, stable event identifiers and ambiguous-response handling, with mocked transports and no real sends. Local checks pass; actual Replit-host execution is still unconfirmed and we do not claim approval or listing. We can supply the exact archive and source hashes for technical review. Thank you, Thuto / Sendar.

Do not send until mailbox duplicate check succeeds. Do not claim this archive is publicly hosted; it is local review material. Existing 0.1.1 import and 0.1.2 local archive are separately recorded.

## 0.1.7 project-skill candidate

Adds `.agents/skills/sendar-email-review/SKILL.md` with self-contained scripts. Root `verify.mjs` delegates to skill tests; root `recipes.mjs` is an import-compatible library shim (CLI previews now use the skill script). For CLI preview use `node .agents/skills/sendar-email-review/scripts/recipes.mjs welcome`. Existing 0.1.3 archive is preserved. This candidate is not uploaded, submitted, host-tested or approved.

Host acceptance: import into the existing disposable project only after receipt/duplicate check and no-charge confirmation. Verify project skill discovery and record a synthetic preview; do not authorize live-send tools. Negative cases: unrelated UI work must not require this skill; requests to send or connect credentials must not be treated as mock-review authorization. Record actual Agent behavior separately from `npm run review` output.

Primary structure source checked 2026-10-25: https://docs.replit.com/features/agent/skills — project `.agents/skills`, SKILL.md metadata, supporting files and lazy loading. Catalogue status source: https://docs.replit.com/features/agent/skills-directory. No directory approval claimed.

## 2 November preview isolation fix

CLI previews now always use synthetic defaults and mock transport, regardless of inherited SENDAR_LIVE, credentials, recipients or links. The exported deliver library retains its original behavior for injected transport tests; it is not a mock-only production adapter. Regression tests replace global fetch with a rejecting stub and poison all live-send environment fields for all five recipes. No actual network or host acceptance is claimed. Original 0.1.4 archive preserved.

## 4 November explicit opt-in fix

Library rejects non-boolean live flags before transport: the string "false" no longer enables live sending. Seven injected-transport regressions cover strings, numbers, null, objects and arrays; literal true and default false remain tested. CLI remains mock-only. Local experimental package, not Replit host acceptance. Historical 0.1.5 unchanged.

5 November Preview runner: `npm run preview` first runs the mock review in a clean child environment, then serves only the report page and downloadable JSON. No API keys, environment dump, file browser, send or rerun endpoint. `npm run test:preview` verifies real loopback HTTP responses locally. In Replit retain dated Preview capture, project URL and downloaded report separately; this page is NOT host attestation. Stop the process after review. Start only after the existing no-additional-charge gate is resolved. No deployment or new grant. Port configuration follows https://docs.replit.com/features/project-setup/ports (checked 2026-11-05). Historical archives unchanged.
