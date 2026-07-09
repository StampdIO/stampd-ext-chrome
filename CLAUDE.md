# Claude Instructions — stampd-ext-chrome

> This file is generated from `lightstone-standards`. Edits here are local — for ecosystem-wide changes, update [lightstone-standards](https://github.com/LightstoneEnterprise/lightstone-standards).

## Project Overview

Stampd.io Chrome extension (Manifest V2) — hashes page content or a screenshot of the visible tab and stamps it on the blockchain (BTC/DASH) via the stampd.io API v2, using the user's own API key.

## Stack

- **Language/Runtime**: node-plain
- **Doppler project**: `stampd-ext-chrome`
- **Default branch**: `production`
- **Deploy target**: distributed client app (not server-deployed)

## Critical Rules (from lightstone-standards)

1. `production` is the primary branch — never commit directly.
2. Every change needs a GitHub issue. See [issue-driven-development](https://github.com/LightstoneEnterprise/lightstone-standards/blob/production/standards/issue-driven-development.md).
3. All secrets via Doppler. Never hardcode. See [secrets-doppler](https://github.com/LightstoneEnterprise/lightstone-standards/blob/production/standards/secrets-doppler.md).
4. Commit format: `<type>: <description> (#<issue>)`. No signatures.
5. Pre-commit hook must pass. Don't use `--no-verify`.
6. Address all Claude PR review feedback before merging. See [pr-review-loop](https://github.com/LightstoneEnterprise/lightstone-standards/blob/production/standards/pr-review-loop.md).

## Stack-specific guidance

## Node.js (plain) guidance

### Stack

- Node.js 24 LTS
- pnpm preferred (npm acceptable for legacy)
- ES modules (`"type": "module"` in package.json)

### Commands

```bash
pnpm install
pnpm start
pnpm dev
pnpm test
pnpm lint
pnpm prettier --check .
```

### PR review focus

The Claude reviewer flags:
1. Missing async/await error handling (unhandled rejections)
2. Hardcoded secrets or config (use Doppler — never inline)
3. Synchronous I/O in hot paths
4. Outdated dependencies with known CVEs
5. Missing tests for new endpoints/handlers

## Repo structure

<!-- App-specific layout — fill in after scaffold -->

## Commands

<!-- Stack-specific commands inserted by scaffold -->

## Reference

- Ecosystem standards: https://github.com/LightstoneEnterprise/lightstone-standards
- Per-language conventions: `~/.lightstone-standards/standards/languages/node-plain.md`
