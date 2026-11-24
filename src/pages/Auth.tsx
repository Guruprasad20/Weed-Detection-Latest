import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2, LockKeyhole, Mail, Sprout } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AuthLayout from "@/components/AuthLayout";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const signUpSchema = z.object({
  displayName: z.string().trim().min(2, "Name must be at least 2 characters.").max(60),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  password: z.string().min(8, "Use at least 8 characters.").max(72),
});
const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(255),
  password: z.string().min(1, "Enter your password.").max(72),
});
const emailSchema = z.string().trim().email("Enter a valid email address.").max(255);

type AuthMode = "signin" | "signup" | "forgot";

const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : null;

const googleAuthError = (message: string) => {
  const normalized = message.toLowerCase();
  if (normalized.includes("missing oauth secret") || normalized.includes("missing client secret")) {
    return "Google is enabled in Supabase, but its OAuth client secret is missing. Add the Google Web client ID and client secret under Supabase Authentication → Providers → Google.";
  }
  if (normalized.includes("missing oauth client id") || normalized.includes("missing client id")) {
    return "Google is enabled in Supabase, but its OAuth client ID is missing. Add the Google Web client ID under Supabase Authentication → Providers → Google.";
  }
  if (normalized.includes("provider is not enabled") || normalized.includes("unsupported provider")) {
    return "Google sign-in is not enabled yet. Configure Google under Supabase Authentication → Providers.";
  }
  if (normalized.includes("redirect") && (normalized.includes("allow") || normalized.includes("url"))) {
    return "This app URL is not allowed by Supabase. Add it under Authentication → URL Configuration.";
  }
  if (normalized.includes("network") || normalized.includes("fetch")) {
    return "Could not reach Supabase. Check your connection and Supabase project settings.";
  }
  return message;
};

const GoogleMark = () => (
  <svg aria-hidden="true" viewBox="0 0 48 48" className="h-[18px] w-[18px]">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.05 11.05 0 0 1-4.8 7.25l7.75 6C44.4 38.05 47 31.96 47 24.55Z" transform="translate(0 0)" />
    <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 4)" />
    <path fill="#34A853" d="M24 47c6.48 0 11.93-2.13 15.9-5.77l-7.75-6c-2.15 1.45-4.9 2.3-8.15 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 41.62 14.62 47 24 47Z" transform="translate(0 0)" />
  </svg>
);

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const mode: AuthMode = location.pathname === "/signup"
    ? "signup"
    : location.pathname === "/forgot-password"
      ? "forgot"
      : "signin";
  const next = safeNext(new URLSearchParams(location.search).get("next"));

  useEffect(() => {
    if (!loading && user && mode !== "forgot") {
      if (next) window.location.href = next;
      else navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate, next, mode]);

  const requireSupabase = () => {
    if (isSupabaseConfigured) return true;
    toast.error("Authentication is not configured. Add your Supabase settings to .env.");
    return false;
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requireSupabase()) return;
    const formData = new FormData(event.currentTarget);
    const parsed = signUpSchema.safeParse({
      displayName: formData.get("displayName"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}${next ?? "/dashboard"}`,
        data: { display_name: parsed.data.displayName },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message.includes("registered") ? "This email is already registered. Please sign in." : error.message);
      return;
    }
    toast.success("Account created. Check your email if confirmation is required.");
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requireSupabase()) return;
    const formData = new FormData(event.currentTarget);
    const parsed = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setBusy(false);
    if (error) toast.error(error.message.includes("Invalid") ? "Invalid email or password." : error.message);
  };

  const handleGoogleAuth = async () => {
    if (!requireSupabase()) return;
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) toast.error(googleAuthError(error.message));
    } catch (error) {
      toast.error(googleAuthError(error instanceof Error ? error.message : "Google sign-in could not be started."));
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requireSupabase()) return;
    const formData = new FormData(event.currentTarget);
    const parsed = emailSchema.safeParse(formData.get("email"));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEmailSent(true);
  };

  const titles = {
    signin: { eyebrow: "WELCOME BACK", title: "Sign in to your account", description: "Pick up where you left off in your field." },
    signup: { eyebrow: "GET STARTED", title: "Create your account", description: "Start making more informed decisions for your farm." },
    forgot: { eyebrow: "ACCOUNT RECOVERY", title: "Forgot your password?", description: "We’ll send a secure link to help you get back in." },
  }[mode];

  return (
    <AuthLayout {...titles}>
      {!isSupabaseConfigured && (
        <p role="status" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-900">
          Authentication is unavailable until Supabase is configured. Add your project URL and publishable key to <code>.env</code>.
        </p>
      )}

      {(mode === "signin" || mode === "signup") && (
        <div className="space-y-5">
          <Button type="button" variant="outline" disabled={busy} onClick={handleGoogleAuth} className="h-12 w-full gap-3 rounded-xl border-[#dfe6dc] bg-white font-medium text-[#2d3e31] shadow-none hover:bg-[#f8faf7]">
            {busy ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <GoogleMark />}
            {busy ? "Connecting to Google…" : mode === "signup" ? "Sign up with Google" : "Continue with Google"}
          </Button>
          <div className="flex items-center gap-4 text-xs text-[#9aa49a]">
            <span className="h-px flex-1 bg-[#e6ebe3]" />
            OR CONTINUE WITH EMAIL
            <span className="h-px flex-1 bg-[#e6ebe3]" />
          </div>
        </div>
      )}

      {mode === "forgot" ? (
        emailSent ? (
          <div role="status" className="rounded-2xl border border-[#dbe9d8] bg-[#f1f7ef] p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#42734b]">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-base font-semibold text-[#233b2a]">Check your inbox</h2>
            <p className="mt-1 text-sm leading-6 text-[#66786a]">If an account exists for that address, a password reset link is on its way.</p>
            <Link to="/auth" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#34714a] hover:text-[#225337]">
              <ArrowLeft className="h-4 w-4" /> Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="forgot-email" className="text-sm font-medium text-[#314437]">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#91a092]" />
                <Input id="forgot-email" name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" className="h-12 rounded-xl border-[#dfe6dc] bg-white pl-11 focus-visible:ring-[#5c8b62]" />
              </div>
            </div>
            <Button type="submit" disabled={busy} className="h-12 w-full rounded-xl bg-[#34714a] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(52,113,74,.65)] hover:bg-[#285c3b]">
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send reset link
            </Button>
            <Link to="/auth" className="flex items-center justify-center gap-2 py-1 text-sm font-medium text-[#647568] hover:text-[#34714a]">
              <ArrowLeft className="h-4 w-4" /> Back to sign in
            </Link>
          </form>
        )
      ) : (
        <form onSubmit={mode === "signup" ? handleSignUp : handleSignIn} className="mt-5 space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="auth-name" className="text-sm font-medium text-[#314437]">Your name</Label>
              <Input id="auth-name" name="displayName" autoComplete="name" required maxLength={60} placeholder="Name" className="h-12 rounded-xl border-[#dfe6dc] bg-white focus-visible:ring-[#5c8b62]" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="auth-email" className="text-sm font-medium text-[#314437]">Email address</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#91a092]" />
              <Input id="auth-email" name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" className="h-12 rounded-xl border-[#dfe6dc] bg-white pl-11 focus-visible:ring-[#5c8b62]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auth-password" className="text-sm font-medium text-[#314437]">Password</Label>
              {mode === "signin" && <Link to="/forgot-password" className="text-xs font-semibold text-[#34714a] hover:text-[#225337]">Forgot password?</Link>}
            </div>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#91a092]" />
              <Input id="auth-password" name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={mode === "signup" ? 8 : undefined} maxLength={72} placeholder={mode === "signup" ? "At least 8 characters" : "Enter your password"} className="h-12 rounded-xl border-[#dfe6dc] bg-white pl-11 pr-12 text-black focus-visible:ring-[#5c8b62]" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#839184] hover:text-[#34714a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5c8b62]">
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>

          {mode === "signin" && (
            <label className="flex w-fit cursor-pointer items-center gap-2.5 py-1 text-sm text-[#667568]">
              <input type="checkbox" name="remember" defaultChecked className="h-4 w-4 rounded border-[#cbd6c9] accent-[#34714a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5c8b62]" />
              Remember me
            </label>
          )}

          <Button type="submit" disabled={busy} className="h-12 w-full rounded-xl bg-[#34714a] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(52,113,74,.65)] hover:bg-[#285c3b]">
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "signup" ? "Create account" : "Sign in"}
          </Button>

          <p className="pt-2 text-center text-sm text-[#748176]">
            {mode === "signup" ? "Already have an account? " : "New to Weed Vision AI? "}
            <Link to={mode === "signup" ? "/auth" : "/signup"} className="font-semibold text-[#34714a] hover:text-[#225337]">
              {mode === "signup" ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </form>
      )}

      {mode === "forgot" && emailSent && (
        <p className="mt-5 text-center text-sm text-[#748176]">
          Didn’t get an email? Check your spam folder or <Link to="/forgot-password" onClick={() => setEmailSent(false)} className="font-semibold text-[#34714a]">try again</Link>.
        </p>
      )}

      {mode !== "forgot" && (
        <Link to="/" className="mt-7 flex items-center justify-center gap-2 text-xs font-medium text-[#8b978c] hover:text-[#34714a]">
          <Sprout className="h-4 w-4" /> Back to Weed Vision AI
        </Link>
      )}
    </AuthLayout>
  );
};

export default Auth;
