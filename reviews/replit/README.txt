Sendar Replit review candidate 0.1.7 — experimental, not submitted

Prepared by Sendar; no Replit affiliation or audited partner approval claimed.
Import the complete archive into the existing disposable review project only
after owner confirms no additional charge. Node >=20, no dependencies.

npm test          # injected fake transports; no real email
npm run review    # source-hashed local report, not host attestation
node .agents/skills/sendar-email-review/scripts/recipes.mjs welcome

The project-local skill is .agents/skills/sendar-email-review/SKILL.md.
Its scripts are self-contained; inspect them before importing. Confirm actual
Agent discovery separately from test execution. REVIEW.md has acceptance cases.
Root recipes.mjs is an import-only compatibility shim; use the script above for
CLI previews. The Run button starts the mock-only report Preview on port 3000.

No credentials, DNS changes, OAuth, deployment, paid Agent run or real test send
are authorized. Actual host execution and submission remain unconfirmed.
Existing 0.1.3 archive and public 1.0.1 skill repository are unchanged.

0.1.7: CLI previews are unconditionally mock-only; inherited live flags and message fields are ignored. Library live transport remains separate and is tested only with injected fakes.

5 November Preview runner: `npm run preview` first runs the mock review in a clean child environment, then serves only the report page and downloadable JSON. No API keys, environment dump, file browser, send or rerun endpoint. `npm run test:preview` verifies real loopback HTTP responses locally. In Replit retain dated Preview capture, project URL and downloaded report separately; this page is NOT host attestation. Stop the process after review. Start only after the existing no-additional-charge gate is resolved. No deployment or new grant. Port configuration follows https://docs.replit.com/features/project-setup/ports (checked 2026-11-05). Historical archives unchanged.
