import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Menu, X, Moon, Sun, LayoutDashboard, LogIn, Globe } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLanguage, type Language, translations } from "@/hooks/useLanguage";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const languageOptions: Array<{ code: Language; label: string }> = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();
  const text = translations[language];
  const navLinks = [
    { label: text.home, href: "/#home" },
    { label: text.how, href: "/#how-it-works" },
    { label: text.classification, href: "/#classification" },
    { label: text.upload, href: "/#upload" },
    { label: text.faq, href: "/#faq" },
    { label: text.contact, href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
          <Leaf className="w-6 h-6" />
          Weed Vision AI
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Change language" className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent">
                <Globe className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languageOptions.map((option) => (
                <DropdownMenuItem key={option.code} onClick={() => setLanguage(option.code)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild size="sm" variant="outline">
            <Link to="/app"><LayoutDashboard className="w-4 h-4 mr-2" /> {text.openPlatform}</Link>
          </Button>
          {user ? (
            <Button asChild size="sm"><Link to="/dashboard">My Account</Link></Button>
          ) : (
            <Button asChild size="sm"><Link to="/auth"><LogIn className="w-4 h-4 mr-2" /> {text.signIn}</Link></Button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggle} aria-label="Toggle theme" className="p-2 text-foreground">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Change language" className="p-2 text-foreground">
                <Globe className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languageOptions.map((option) => (
                <DropdownMenuItem key={option.code} onClick={() => setLanguage(option.code)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-card border-b animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                {l.label}
              </a>
            ))}
            <Link to={user ? "/dashboard" : "/auth"} onClick={() => setOpen(false)} className="text-sm font-semibold text-primary py-2">
              {user ? "Dashboard" : text.signIn}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
