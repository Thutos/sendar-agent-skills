# Sendar Replit experimental review packet

Prepared by Sendar. This branch adds the exact existing 0.1.7 packet under `replit/`; it does not change any released root plugin, skill or marketplace metadata. No Replit affiliation, audited partner approval or listing is claimed. The historical packet remains unchanged, including its preparation-time status notes; this document records the new review-branch distribution status.

## Community installation, not native listing

Replit documents external community skill installation through the skills CLI. In an isolated project on a machine you control, inspect this source then run:

```sh
npx skills@1.8.1 add https://github.com/Thutos/sendar-agent-skills/tree/replit-review-0.1.7/reviews/replit/.agents/skills/sendar-email-review --agent replit --skill sendar-email-review --copy --yes
node .agents/skills/sendar-email-review/scripts/verify.mjs
node .agents/skills/sendar-email-review/scripts/recipes.mjs welcome
```

This installs only the mock review skill. It does not connect Sendar, authorize a grant, send email, install a native connector or submit to the audited partner catalogue. On Replit itself, the existing owner-controlled access and no-additional-charge gates must be resolved BEFORE installation or execution. Local CLI installation is not Replit Agent loading or host acceptance.

## Full packet and acceptance

`replit/package.json` identifies version 0.1.7. The original archive SHA256 is `c36d26903e58d308209b57565edefd916f7dfdabd277288ea60a1e5d6aa31275`. All packet files are copied byte-for-byte from that existing candidate. Run `npm test` and `npm run test:preview` inside `replit/` for mocked recipe checks and loopback Preview tests. These require Node >=20 and send no real email. Inspect REVIEW.md for proposed actual-host cases and prerequisites; those are NOT completed attestations.

Existing partner application receipt remains unconfirmed. Do not duplicate the application. This review branch/PR is a Sendar-owned reviewable artifact, NOT a submission receipt from Replit. Official partner intake remains https://replit.com/partners; audited catalogue and external installation are separate routes.

Primary sources checked 2026-11-16:
- https://docs.replit.com/features/agent/skills-directory
- https://docs.replit.com/features/agent/skills
- https://github.com/vercel-labs/skills
- https://github.com/vercel-labs/skills/blob/main/docs/agents.md

No change to approved Claude 1.0.1 or other root packages. No purchases, new terms, grants, customer-data access, live sends or deployments.
