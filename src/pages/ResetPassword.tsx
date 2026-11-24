import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AuthLayout from "@/components/AuthLayout";

const passwordSchema = z.object({
  password: z.string().min(8, "Use at least 8 characters.").max(72, "Password is too long."),
  confirmPassword: z.string(),
}).refine((values) => values.password === values.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

type RecoveryState = "checking" | "ready" | "invalid" | "unconfigured";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [recoveryState, setRecoveryState] = useState<RecoveryState>("checking");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setRecoveryState("unconfigured");
      return;
    }

    let active = true;
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const queryParams = new URLSearchParams(window.location.search);
    const isRecoveryLink = hashParams.get("type") === "recovery" || queryParams.get("type") === "recovery";

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (active && event === "PASSWORD_RECOVERY" && session) setRecoveryState("ready");
    });

    if (!isRecoveryLink) {
      setRecoveryState("invalid");
    } else {
      supabase.auth.getSession().then(({ data, error }) => {
        if (!active) return;
        if (error || !data.session) {
          setRecoveryState("invalid");
          return;
        }
        setRecoveryState("ready");
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      });
    }

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = passwordSchema.safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Check the password fields.");
      return;
    }

    setBusy(true);
    setFormError(null);
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    setBusy(false);
    if (error) {
      setFormError(error.message);
      return;
    }

    toast.success("Your password has been updated.");
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthLayout
      eyebrow="ACCOUNT RECOVERY"
      title="Set a new password"
      description="Choose a strong password to secure your account."
    >
      {recoveryState === "checking" ? (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-[#718074]">
          <Loader2 className="h-4 w-4 animate-spin" /> Checking your recovery link…
        </div>
      ) : recoveryState === "unconfigured" ? (
        <div className="space-y-4">
          <p className="text-sm leading-6 text-[#718074]">Password recovery is unavailable until Supabase is configured.</p>
          <Button asChild className="h-12 w-full rounded-xl bg-[#34714a] hover:bg-[#285c3b]"><Link to="/auth">Back to sign in</Link></Button>
        </div>
      ) : recoveryState === "invalid" ? (
        <div className="space-y-4">
          <p className="text-sm leading-6 text-[#718074]">This password reset link is invalid or expired. Request a new one to continue.</p>
          <Button asChild className="h-12 w-full rounded-xl bg-[#34714a] hover:bg-[#285c3b]"><Link to="/forgot-password">Request a new link</Link></Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm font-medium text-[#314437]">New password</Label>
            <div className="relative">
              <Input id="new-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} maxLength={72} className="h-12 rounded-xl border-[#dfe6dc] bg-white pr-12 text-black focus-visible:ring-[#5c8b62]" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#839184] hover:text-[#34714a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5c8b62]">
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium text-[#314437]">Confirm new password</Label>
            <Input id="confirm-password" name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} maxLength={72} className="h-12 rounded-xl border-[#dfe6dc] bg-white text-black focus-visible:ring-[#5c8b62]" />
          </div>
          {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
          <Button type="submit" disabled={busy} className="h-12 w-full rounded-xl bg-[#34714a] font-semibold hover:bg-[#285c3b]">
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Update password
          </Button>
          <Link to="/auth" className="flex items-center justify-center gap-2 py-1 text-sm font-medium text-[#647568] hover:text-[#34714a]">
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>
        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;