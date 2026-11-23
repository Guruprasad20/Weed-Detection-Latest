import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 font-heading text-2xl font-bold text-primary mb-8">
          <Leaf className="w-7 h-7" /> Weed Vision AI
        </Link>
        <section className="bg-card rounded-lg shadow-elevated-custom p-8 border">
          <h1 className="font-heading text-xl font-semibold text-center">Set a new password</h1>
          {recoveryState === "checking" ? (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-8">
              <Loader2 className="w-4 h-4 animate-spin" /> Checking your recovery link…
            </div>
          ) : recoveryState === "unconfigured" ? (
            <div className="text-center space-y-4 mt-5">
              <p className="text-sm text-muted-foreground">Password recovery is unavailable until Supabase is configured.</p>
              <Button asChild className="w-full"><Link to="/auth">Back to sign in</Link></Button>
            </div>
          ) : recoveryState === "invalid" ? (
            <div className="text-center space-y-4 mt-5">
              <p className="text-sm text-muted-foreground">This password reset link is invalid or expired. Request a new one to continue.</p>
              <Button asChild className="w-full"><Link to="/auth">Back to sign in</Link></Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={72} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm new password</Label>
                <Input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} maxLength={72} />
              </div>
              {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
              <Button type="submit" disabled={busy} className="w-full">
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}Update password
              </Button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default ResetPassword;