# Vulnerable Node demo

A small product catalog API with deliberately vulnerable **lodash 4.17.20** and **minimist 1.2.5** dependencies. This is the target repository for the sibling **github-action-codex** vulnerability hub.

The app binds to localhost and is intended for dependency-remediation demonstrations. Keep the initial vulnerable dependency versions until you run the hub workflow.

## Run

Requires Node.js 22 or newer.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
npm start
```

On Windows PowerShell, use npm.cmd if npm.ps1 is blocked.

- http://127.0.0.1:3000/health
- http://127.0.0.1:3000/api/products
- http://127.0.0.1:3000/api/products?category=Office&sort=price

Use npm start -- --port=3001 to select a different port.

## How remediation works

The central hub reads the committed manifests and runs npm audit, registers findings in its own GitHub Issues, and runs Codex with its remediation skill when requested. Verified fixes arrive here as PRs.

Application CI tests behavior on pushes and PRs. Existing dependency findings deliberately do not fail the baseline application tests. The central remediation gate independently checks that the selected advisory is removed and no new advisory identities appear.

After a PR is merged to main, a separate notification job requests a hub scan. It uses HUB_REPOSITORY, NOTIFIER_APP_ID, and NOTIFIER_APP_PRIVATE_KEY as described in the hub's docs/setup.md. That job checks out no application code.

The register closes a finding only after a successful default-branch rescan confirms it is gone. The central hub owns the dashboard, register, scanning utilities, and skill; this repository owns the application and its tests.

To repeat the demo after fixing it, revert the dependency-remediation commit and rescan. The same central issue should reopen.
