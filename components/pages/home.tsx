import { CoffeeShopHeader } from "@/components/layout/header";
import { CoffeeShopFooter } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Dynamically import sections that fetch data
import dynamic from "next/dynamic";

const FeaturedShops = dynamic(
  () => import("@/components/sections/featured-shops").then(mod => mod.FeaturedShops),
  {
    loading: () => <LoadingSpinner />,
    ssr: true
  }
);

const MissionSection = dynamic(
  () => import("@/components/sections/mission-section").then(mod => mod.MissionSection),
  {
    ssr: true
  }
);

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <CoffeeShopHeader />
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedShops />
        </Suspense>
        <MissionSection />
      </main>
      <CoffeeShopFooter />
    </div>
  );
}