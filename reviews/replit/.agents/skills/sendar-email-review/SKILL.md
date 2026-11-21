---
name: sendar-email-review
description: Preview and locally test Sendar transactional email recipes in Replit using mock transports; use for welcome, booking, reset, invoice or migration review, not live sending.
---

# Sendar email review

Prepared by Sendar. Experimental external project skill, not an audited Replit partner skill or native connector. No Replit affiliation claimed.

## Preview an example

Resolve `scripts/recipes.mjs` relative to this skill folder. Run `node <resolved-path>/recipes.mjs welcome` with a clean environment (no SENDAR_LIVE flag). Other recipes: `booking`, `password-reset`, `invoice`, `migration`. Defaults use reserved example domains and synthetic links. Explain that output is a proposed request, not a sent message or verified delivery.

Before running review scripts on Replit, confirm the owner has established a no-additional-charge execution path. Do not start Agent, deploy, buy credits or change billing to obtain test evidence.

## Verify behavior

Run `node <resolved-path>/verify.mjs` with a clean environment. It uses injected fake transports, rejects missing credentials, preserves event identifiers and tests ambiguous outcomes without retrying. No real email is sent. These scripts require Node >=20 and no dependencies.

For a source-hashed report from the complete review archive, run `npm run review` in its root. Retain the exact archive version, project URL, dated console capture and report. A locally generated report or skill-file preview is not proof of Replit Agent loading or host execution.

## Boundaries

This skill authorizes no live requests. Do not set SENDAR_LIVE, request keys in chat, connect OAuth, alter DNS, inspect customer data or send test mail. For an implementation beyond this mock review, consult current Sendar API documentation and obtain the separately required credentials, verified sender, authorized recipient and explicit send authorization. Do not infer production availability from these examples. Transport uncertainty requires inspection before any retry with the same event identifier; never promise exactly-once delivery.
