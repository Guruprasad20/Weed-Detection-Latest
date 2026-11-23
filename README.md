# Weed Vision AI

## Run locally

1. Install Node.js 18 or newer.
2. Copy `.env.example` to `.env`.
3. In the Supabase dashboard for project `szloyoaepetwvwhndkwi`, open **Project Settings → API Keys** and copy the publishable key (or legacy `anon` key) into `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env`. The project URL is already filled in.
4. In Supabase **Authentication → URL Configuration**, add `http://localhost:8080/**` and `http://127.0.0.1:8080/**` to the allowed redirect URLs for local password recovery and sign-in.
5. Run `npm install --legacy-peer-deps`.
6. Run `npm run dev` and open the local address shown in the terminal.

Never put a Supabase `service_role` or secret key in this frontend project. The browser uses only the publishable/anon key; database access is restricted by row-level security policies.

The existing database schema is in `supabase/migrations`. To create/update the schema in Supabase, link the Supabase CLI to your project and run `supabase db push` from the project directory.

The ZIP includes the React/Vite application source, public assets, tests, and Lovable Cloud functions and migrations. It excludes installed dependencies, generated build output, Git metadata, and the original `.env` file.
