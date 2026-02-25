# Payload CMS — 1-Page Interview Cheat Sheet

**Use this for:** system design / solutioning whiteboards when the problem involves a headless CMS, content APIs, or admin + frontend architecture.

---

## What Payload Is

- **Headless CMS**: Content stored and managed via API; frontend consumes JSON. No built-in presentation layer.
- **TypeScript-first, self-hosted**: You own the code and data. Types generated from schema (`generate:types`).
- **Admin + REST API + Local API**: Admin UI for editors, REST for external clients, Local API (`getPayload()`) for server-side code (Next.js routes, Server Components, jobs).

---

## Architecture (Draw This)

```
payload.config.ts  →  collections[] + globals[] + db adapter + editor (e.g. Lexical)
        ↓
   Admin UI (React)  ←→  REST API  ←→  DB (Mongo/Postgres/SQLite)
        ↑                    ↑
   Local API (getPayload()) in your app (e.g. Next.js)
```

- **Collections** = content types (e.g. Pages, Posts, Users). Each has a slug, fields, access, hooks.
- **Globals** = singleton config (e.g. Site Settings, Header/Footer). One document per global.
- **Adapter** = database (MongoDB, PostgreSQL, SQLite). Payload is DB-agnostic.

---

## Content Model (Whiteboard Vocabulary)

| Concept | Meaning |
|--------|---------|
| **Collection** | A content type with its own list/create/edit in admin and its own API (`/api/pages`, etc.). |
| **Global** | Single document; no list view. Good for site-wide settings. |
| **Fields** | text, number, richText, relationship, upload, blocks, etc. |
| **Blocks** | Reusable layout chunks (e.g. Hero, RichText, CTA). Stored as array on a parent field. |
| **Relationship** | Points to another collection (e.g. `author` → users). Use `depth` when querying to control how much is populated. |

---

## Access Control (Critical for Design)

- **Collection-level**: `access: { read, create, update, delete }`. Each can return:
  - **Boolean** → allow/deny the whole operation.
  - **Query constraint** → row-level security (e.g. “only documents where `author` = current user”).
- **Field-level**: `access: { read, update }` on a field. **Only booleans** (no query constraints).
- **REST API**: Uses the same access rules; unauthenticated requests get “public” rules.
- **Local API**: By default **bypasses** access. To enforce permissions: pass `user` **and** `overrideAccess: false`.

```ts
// Enforce permissions in server code
await payload.find({ collection: 'posts', user: req.user, overrideAccess: false })
```

---

## Security Gotchas (Mention These)

1. **Local API + `user`**: If you pass `user` but don’t set `overrideAccess: false`, access control is still bypassed.
2. **Hooks**: Always pass `req` into any nested `payload.create/update/delete` in hooks so operations stay in the same transaction and respect context.
3. **Hook loops**: An `afterChange` that updates the same document can recurse; use `context.skipHooks` (and pass `context: { skipHooks: true }` in the nested call) to break the loop.

---

## Hooks (Lifecycle)

| Hook | When | Use for |
|------|------|--------|
| `beforeValidate` | Before validation | Format/normalize data (e.g. slug from title). |
| `beforeChange` | Before write | Business rules (e.g. set `publishedAt` when status → published). |
| `afterChange` | After write | Side effects (notifications, search index, audit log). Pass `req` to nested ops. |
| `afterRead` | After read | Computed/virtual data (e.g. view count). |
| `beforeDelete` | Before delete | Cascade deletes or checks. |

---

## API Surface (What You Expose)

- **REST**: `GET/POST /api/<collection>`, `GET/PATCH/DELETE /api/<collection>/:id`. Query params: `where`, `sort`, `limit`, `depth`, `page`.
- **Auth**: Collection with `auth: true` gets login/register endpoints. JWT in cookie or header. Put roles in JWT via `saveToJWT: true` for fast checks.
- **Local API**: `const payload = await getPayload({ config })` then `payload.find()`, `findByID()`, `create()`, `update()`, `delete()` with full query power (`where`, `depth`, etc.).

---

## System Design Talking Points

- **When to use Payload**: Content-heavy products, multi-role editors, need for strict access (row- and field-level), TypeScript and self-hosted requirement.
- **Scaling**: Stateless API; scale app servers. DB and upload storage (e.g. S3) scale independently. Use `depth` and `select` to limit payload size.
- **Multi-tenant**: Use query constraints in `access.read` (e.g. `tenantId: { equals: user.tenantId }`) so each tenant only sees their data.
- **Drafts/versions**: Enable `versions: { drafts: true }` on a collection; `_status: 'draft' | 'published'` and draft endpoints appear. Public read access often restricted to `_status: 'published'`.
- **Custom endpoints**: Add handlers in config for custom routes; use `req.payload` and `req.user`; enforce auth and access explicitly.
- **Frontend**: Fetch in Server Components or API routes with `getPayload()`; optionally use REST from a separate frontend. Generated types (`payload-types.ts`) keep frontend and CMS in sync.

---

## One-Line Summary

**Payload** = TypeScript headless CMS with a React admin, REST + Local API, declarative access (including row-level), and lifecycle hooks; always use `overrideAccess: false` when calling the Local API with a user to enforce permissions.
