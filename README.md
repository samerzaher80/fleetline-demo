# Fleetline — Agent Control Tower

A browser-only synthetic fleet for DOO's **Agent Control Tower** mission. Open `index.html` or GitHub Pages. Run `npm test` for the control-plane tests.

## Architecture

Three distinct role policies (dispatch, billing, support) generate timed events. The control plane enforces per-agent status and scope, tracks tokens and estimated cost, queues high-risk route changes, and records every decision in an append-only in-memory audit. The operator UI can pause, resume, approve, deny, kill, and replay the last five visible steps. Audit JSON can be exported. These are deterministic simulated agents, not external LLMs or live business workers.

## 90-second walkthrough

1. Watch all three agents emit live actions and usage. After five ticks, Dispatch queues a bulk route change. Approve or deny it.
2. Pause Billing and see only the other two roles advance. Resume Billing.
3. Inject a rogue Support request to transfer funds. The scope gate refuses it and pauses Support. Replay Support to see the reason. Kill it to deny any pending work.

## Failure test

Support tries `transfer-funds`, a capability absent from its scope. The control plane refuses the action, increments its blocked count, pauses the agent, and records a containment event. No transfer is possible in this demo.

## Two-year thesis

Agent operations will resemble site reliability engineering more than chatbot administration. Operators need a live event stream, scoped authority, intervention controls, and replayable reasons. Cost and token use belong beside safety state because resource drift is an operational signal. The control plane should sit between agents and tools, so a paused or killed agent cannot act through another UI path. In two years, the best agent platforms will make rollback, approval queues, fleet health, and audit export ordinary infrastructure. The hard part will be preserving enough reasoning context for oversight without exposing private data or creating false confidence from a polished dashboard.

Built with Codex assistance. All agent work, costs, and events are synthetic, local, and reset on reload. No external systems, real customers, payments, or production authority.
