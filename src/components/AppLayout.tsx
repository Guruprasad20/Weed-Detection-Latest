import { Outlet, Link, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, Globe, LogOut } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useLanguage, type Language } from "@/hooks/useLanguage";
import { dashboardText } from "@/lib/dashboard-translations";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const langs: Array<{ code: Language; label: string }> = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
];

const AppLayout = () => {
  const { theme, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const langCode = language;
  const t = (text: string) => dashboardText(language, text);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-accent/20">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card/60 backdrop-blur-md px-3 sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <SidebarTrigger label={t("Toggle Sidebar")} />
              <span className="text-sm text-muted-foreground hidden sm:inline">{t("Smart Agriculture Platform")}</span>
            </div>
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" title={t("Language")}><Globe className="w-4 h-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {langs.map((l) => (
                    <DropdownMenuItem key={l.code} onClick={() => { setLanguage(l.code); toast.success(`${dashboardText(l.code, "Language")}: ${l.label}`); }}>{l.label}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" onClick={() => toast(t("3 new alerts: high-risk weed detected in Field B"))} title={t("Notifications")}>
                <span className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive" />
                </span>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggle} title={t("Theme")}>
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              {user ? (
                <Button variant="outline" size="sm" onClick={async () => { await signOut(); navigate("/"); }}>
                  <LogOut className="w-4 h-4 mr-2" /> {t("Sign out")}
                </Button>
              ) : (
                <Button asChild size="sm"><Link to="/auth">{t("Sign in")}</Link></Button>
              )}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
