# Backlog

Findings that are not committed work. An issue means someone is doing it; a line here means it is
known and waiting for a decision. Newest first.

## 2026-10-28 — from the standards onboarding (#24)

- **CI is a syntax check only.** The repo has no lint or test setup, so `pr-checks.yml` runs the same
  `node --check` as the pre-commit hook instead of the template's `pnpm lint` / `pnpm test`. A real
  toolchain belongs with the planned rebuild (Manifest V3, #26).
- **Node is build tooling here, not a runtime.** `.node-version` (24) pins the CI syntax check. The
  gulp toolchain (gulp-sass, browser-sync) predates Node 24 and may not install on it; no
  `engines.node` floor is declared for that reason.
