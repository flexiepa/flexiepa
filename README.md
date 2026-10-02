# Flexiepa

Flexiepa is an ERP for running day-to-day business operations — inventory, sales, purchasing, and related back-office workflows — from a single app.

| | |
| --- | --- |
| Frontend | Solid · TanStack Start (SPA) · Vite · pnpm · oxlint / oxfmt |
| Backend | Axum · Cargo workspace |
| Tooling | [proto](https://moonrepo.dev/proto) + [moon](https://moonrepo.dev) · [lefthook](https://lefthook.dev) · [cocogitto](https://docs.cocogitto.io) |

Tool versions are pinned in `.prototools` (moon inherits them).

## Layout

```
backend/                 Cargo workspace
  bins/api/              Axum server
  crates/                Shared Rust crates
frontend/                pnpm workspace
  apps/erp/              ERP SPA
  packages/              Shared TypeScript packages
.moon/                   moon projects & tasks
lefthook.yml             Git hooks
cog.toml                 Conventional Commits / SemVer
```

## Setup

Install [proto](https://moonrepo.dev/docs/proto/install), then:

```bash
proto install
lefthook install
cd frontend && pnpm install
```

## Develop

```bash
moon run erp:dev
moon run api:dev    # GET / → Hello world
```

| Task | Command |
| --- | --- |
| Frontend lint / format | `moon run frontend:lint` · `moon run frontend:format` |
| ERP typecheck / build | `moon run erp:typecheck` · `moon run erp:build` |
| Backend check / lint / test | `moon run backend:check` · `moon run backend:lint` · `moon run backend:test` |
| Backend format | `moon run backend:format` |
| API build | `moon run api:build` |

## Commits

Lefthook runs on every commit:

1. **pre-commit** — format/lint staged frontend files; `cargo fmt` on staged Rust  
2. **commit-msg** — Conventional Commits (`cog verify`)

```bash
cog commit feat -s erp "add invoice list"
# or
git commit -m "feat(erp): add invoice list"
```

Scopes: `erp` · `frontend` · `api` · `backend` · `moon` · `deps` · `docs`  
Skip hooks: `LEFTHOOK=0 git commit …` · local overrides: `lefthook-local.yml`

## Versioning

[Cocogitto](https://docs.cocogitto.io) owns SemVer. Frontend and backend version independently (`frontend-vX.Y.Z`, `backend-vX.Y.Z`) plus a global `vX.Y.Z`. Bumps only on `main`, from a clean tree.

Package bump hooks sync manifests: pnpm workspace `package.json` versions under `frontend/`, and `backend/Cargo.toml` + `Cargo.lock`.

```bash
cog bump --dry-run --auto                    # preview
cog bump --auto                              # bump changed packages + global
cog bump --package=frontend --auto           # frontend only
cog bump --package=backend --auto            # backend only
cog bump --version 0.1.0 --include-packages  # set all to 0.1.0 (first release)
```

Auto bump from Conventional Commits: `fix:` → patch · `feat:` → minor · `BREAKING CHANGE` / `!` → major. Then push tags: `git push && git push --tags`.

## Notes

- Use **pnpm** only for the frontend (`frontend/.npmrc`).
- Keep secrets out of git (`.env*` ignored except `*.example`).

## License

Closed source. See [LICENSE](./LICENSE).
