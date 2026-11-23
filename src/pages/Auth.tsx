import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const signUpSchema = z.object({
  displayName: z.string().trim().min(2, "Name must be at least 2 chars").max(60),
  email: z.string().trim().email().max(255),
  password: z.string().min(8, "Min 8 characters").max(72),
});
const signInSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(72),
});

/** Only allow same-origin relative paths as a post-login redirect. */
const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : null;

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const next = safeNext(new URLSearchParams(window.location.search).get("next"));

  useEffect(() => {
    if (!loading && user) {
      if (next) window.location.href = next;
      else navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate, next]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error("Authentication is not configured. Add your Supabase settings to .env.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const parsed = signUpSchema.safeParse({
      displayName: fd.get("displayName"),
      email: fd.get("email"),
      password: fd.get("password"),
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
    toast.success("Account created! Welcome to Weed Vision AI.");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error("Authentication is not configured. Add your Supabase settings to .env.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const parsed = signInSchema.safeParse({ email: fd.get("email"), password: fd.get("password") });
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
    if (error) {
      toast.error(error.message.includes("Invalid") ? "Invalid email or password" : error.message);
      return;
    }
    toast.success("Welcome back!");
  };

  const handleForgotPassword = async () => {
    if (!isSupabaseConfigured) {
      toast.error("Authentication is not configured. Add your Supabase settings to .env.");
      return;
    }
    const emailInput = document.querySelector<HTMLInputElement>("#si-email");
    const parsed = z.string().trim().email().safeParse(emailInput?.value);
    if (!parsed.success) {
      toast.error("Enter your email address first.");
      emailInput?.focus();
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
    toast.success("Password recovery email sent.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 font-heading text-2xl font-bold text-primary mb-8">
          <Leaf className="w-7 h-7" /> Weed Vision AI
        </Link>
        <div className="bg-card rounded-xl shadow-elevated-custom p-8 border">
          {!isSupabaseConfigured && (
            <p role="status" className="mb-5 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-muted-foreground">
              Sign-in is unavailable until Supabase is configured. Copy <code>.env.example</code> to <code>.env</code> and add your project credentials.
            </p>
          )}
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="si-email">Email</Label>
                  <Input id="si-email" name="email" type="email" required maxLength={255} />
                </div>
                <div>
                  <Label htmlFor="si-password">Password</Label>
                  <Input id="si-password" name="password" type="password" required maxLength={72} />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleForgotPassword} className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="su-name">Name</Label>
                  <Input id="su-name" name="displayName" required maxLength={60} />
                </div>
                <div>
                  <Label htmlFor="su-email">Email</Label>
                  <Input id="su-email" name="email" type="email" required maxLength={255} />
                </div>
                <div>
                  <Label htmlFor="su-password">Password (min 8)</Label>
                  <Input id="su-password" name="password" type="password" required minLength={8} maxLength={72} />
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <p className="text-center mt-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Back to home</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
