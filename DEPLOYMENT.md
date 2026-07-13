# Cloudflare deployment

The deployable static directory is `outputs`. Cloudflare Pages Functions live in
`functions`, and the D1 schema is in `migrations/0001_init.sql`.

## 1. Create the Pages project

- Connect the private GitHub repository in **Workers & Pages → Create → Pages → Connect to Git**.
- Project name: `paradox-archive`
- Production branch: `main`
- Framework preset: `None`
- Build command: leave empty
- Build output directory: `outputs`
- Root directory: leave empty

## 2. Create and initialize D1

Create a D1 database named `paradox-archive-db`. Open its SQL console, paste the
contents of `migrations/0001_init.sql`, and execute it once.

In the Pages project, add a D1 binding:

- Binding name: `DB`
- Database: `paradox-archive-db`

## 3. Add encrypted secrets

In **Pages project → Settings → Variables and Secrets**, add both values as
encrypted secrets:

- `FINAL_ANSWER`: the final answer
- `SESSION_SIGNING_KEY`: at least 32 random characters

Never put either value in a repository file or a public environment variable.

## 4. Redeploy and test

Trigger a new deployment after adding the D1 binding and secrets. Test the final
answer, reload the final page, add one Hall of Fame entry, and verify in a second
browser that the entry is shared and the first session cannot submit twice.

The answer endpoint allows 12 attempts per ten-minute window for each hashed
visitor address. The Hall of Fame keeps the newest 50 entries server-side.

Production secrets configured.

