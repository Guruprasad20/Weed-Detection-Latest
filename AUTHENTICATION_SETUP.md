# Authentication setup

The app uses Supabase Auth for email/password sign-in, email confirmation, password recovery, and Google OAuth. Google credentials must be configured in your own Google Cloud and Supabase projects; they must never be added to the frontend or committed to this repository.

## 1. Configure the Supabase app

1. In Supabase, open **Authentication → URL Configuration**.
2. Set **Site URL** to your deployed app origin.
3. Add the full app URLs as allowed redirect URLs. For local development, add:
   - `http://localhost:8080/**`
   - `http://127.0.0.1:8080/**`
4. For production, add your actual HTTPS app domain, for example `https://your-domain.example/**`.
5. In **Project Settings → API Keys**, copy the project URL and publishable key into `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. A legacy `anon` key is also supported. Never use a `service_role` or secret key in this browser app.

## 2. Enable Google sign-in

1. In Google Cloud Console, select or create a project and configure the OAuth consent screen. Set the app name and support email; while the app is in testing mode, add each tester as a test user. Publish/verify the consent screen as required before allowing general users.
2. Create an OAuth client ID with application type **Web application**.
3. Add the app origins to **Authorized JavaScript origins**:
   - `http://localhost:8080`
   - `http://127.0.0.1:8080`
   - Your deployed HTTPS origin
4. Add this URI to **Authorized redirect URIs** (the Supabase Auth callback, not the app URL):
   - `https://szloyoaepetwvwhndkwi.supabase.co/auth/v1/callback`
5. In Supabase, open **Authentication → Providers → Google**, enable Google, and enter the Google OAuth client ID and client secret. Save the provider settings. If Supabase returns `Unsupported provider: missing OAuth secret`, the secret is missing or was not saved.
6. Confirm the local and production app URLs from step 1 are present in Supabase's allowed redirect URLs.

The client secret belongs only in Supabase's provider settings. Do not put it in `.env`, a `VITE_` variable, source code, or a commit.

## 3. Verify the flow

1. Start the app with `npm run dev`.
2. Open `/auth` and choose **Continue with Google**, or open `/signup` and choose **Sign up with Google**.
3. Complete Google's consent flow. Supabase should return to the requested app URL and create/sign in the Supabase user.
4. Test email sign-up, email confirmation (if enabled in Supabase), forgot-password email, and `/reset-password` separately.

If Supabase reports that Google is disabled, verify **Authentication → Providers → Google**. If it reports a redirect URL error, add the exact app URL/origin to Supabase's URL Configuration. If Google reports `redirect_uri_mismatch`, check that the Google client's authorized redirect URI is exactly the Supabase callback URL above.
