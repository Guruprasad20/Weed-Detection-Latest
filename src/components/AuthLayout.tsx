import type { ReactNode } from "react";
import { Leaf, ShieldCheck, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import heroField from "@/assets/hero-field.jpg";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

const AuthLayout = ({ eyebrow, title, description, children }: AuthLayoutProps) => (
  <main className="min-h-screen bg-[#f7f9f4] lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
    <aside className="relative hidden min-h-screen overflow-hidden bg-[#163d2b] text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      <img src={heroField} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d3425]/90 via-[#17472e]/55 to-[#122c20]/85" />
      <Link to="/" className="relative z-10 inline-flex w-fit items-center gap-2.5 text-lg font-semibold tracking-tight">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
          <Leaf className="h-5 w-5" />
        </span>
        Weed Vision <span className="font-normal text-white/70">AI</span>
      </Link>

      <div className="relative z-10 max-w-xl py-12">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium tracking-wide text-white/90 backdrop-blur">
          <Sprout className="h-4 w-4 text-lime-200" />
          INTELLIGENCE FOR HEALTHIER FIELDS
        </p>
        <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
          A clearer view of every acre.
        </h2>
        <p className="mt-5 max-w-md text-base leading-7 text-white/75">
          Identify weeds with AI-powered insights and make more confident decisions for your farm.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-2 text-sm text-white/70">
        <ShieldCheck className="h-4 w-4 text-lime-200" />
        Your farm data stays yours.
      </div>
    </aside>

    <section className="flex min-h-screen flex-col px-5 py-7 sm:px-8 lg:justify-center lg:px-12 lg:py-12 xl:px-20">
      <Link to="/" className="mb-10 inline-flex items-center gap-2 text-base font-semibold tracking-tight text-[#183d2b] lg:hidden">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f0e5]">
          <Leaf className="h-5 w-5 text-[#34714a]" />
        </span>
        Weed Vision <span className="font-normal text-[#6d806f]">AI</span>
      </Link>
      <div className="mx-auto w-full max-w-[420px]">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#58805e]">{eyebrow}</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-[#1b3426] sm:text-[2rem]">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-[#718074]">{description}</p>
        </div>
        {children}
        <p className="mt-8 text-center text-xs text-[#8b978c]">
          © {new Date().getFullYear()} Weed Vision AI · Cultivating smarter decisions
        </p>
      </div>
    </section>
  </main>
);

export default AuthLayout;
