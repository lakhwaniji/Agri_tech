import { Hero } from "@/components/Hero";
import { MissionSection } from "@/components/MissionSection";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { ModuleTabs } from "@/components/ModuleTabs";
import { FinalCta } from "@/components/FinalCta";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-6 py-3 shadow-sm sm:px-10">
        <Logo className="h-8 w-auto sm:h-9" />
        <LanguageToggle />
      </header>

      <main className="flex flex-1 flex-col">
        <Hero />
        <MissionSection />
        <FeatureShowcase />
        {/* <ModuleTabs /> */}
        <FinalCta />
      </main>
    </div>
  );
}
