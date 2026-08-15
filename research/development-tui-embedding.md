---
issue: TBD
status: implemented
last_updated: "2026-08-15"
---

# Development TUI embedding

## Summary

Expose eve's existing development terminal UI as `eve/tui` so a product can
reuse the same durable session, event rendering, input, approval, and slash-command
behavior as `eve dev` while owning the development server and product CLI itself.
The embedding seam is deliberately one function and eve-owned input types; it is
not a second TUI runtime.

## Public seam

[`runDevelopmentTui`] accepts an explicit local or remote target, optional request
headers, presentation controls, an initial prompt draft, and an optional product
`modelCommand`. The embedding process owns server startup, reload, shutdown, and
workspace selection. The function owns the terminal session until the user exits.

The model override receives only the workspace, server URL, command argument, and
a select-only [`DevelopmentTuiPrompter`]. This lets a product present its own model
catalog without exposing eve's renderer, client, setup flows, or lifecycle types.
A seeded bare `/model` routes directly to that override; eve's fresh-project
Vercel/model/registry onboarding remains exclusive to the built-in command.

The public wrapper delegates to the same runner used by `eve dev`. There is no
parallel event protocol, transcript store, session owner, or approval implementation.

## Dependency boundary

Importing `eve/tui` from a published install must resolve using only eve's declared
runtime dependencies and vendored modules. The public path therefore uses narrow
client imports, eve's vendored color implementation, and configured MCP endpoints
reported by the running agent rather than the unpublished `@eve/catalog` package.
CLI-native prompting stays lazy; an embedded TUI supplies its own eve-owned
prompter and does not load `@clack/core`.

## Out of scope

- Starting or supervising a development server.
- A general renderer extension API or arbitrary custom slash commands.
- Exposing internal `Client`, `EveTUIRunner`, setup-flow, or terminal primitives.
- Changing the browser client API; web and terminal UIs remain adapters over the
  same agent/session protocol.

## Verification

- [`runner.test.ts`] verifies a seeded bare `/model` reaches the product callback
  without built-in onboarding.
- [`tui-packed-install-model.ts`] builds a tarball, installs it into an empty npm
  consumer, imports `eve/tui`, and drives the installed TUI through onboarding.
- The ordinary TUI unit and smoke suites continue to cover rendering, durable
  sessions, approvals, input requests, cancellation, and shutdown.

[`runDevelopmentTui`]: ../packages/eve/src/public/tui/index.ts
[`DevelopmentTuiPrompter`]: ../packages/eve/src/public/tui/types.ts
[`runner.test.ts`]: ../packages/eve/src/cli/dev/tui/runner.test.ts
[`tui-packed-install-model.ts`]: ../packages/eve/test/tui-client/tui-packed-install-model.ts
