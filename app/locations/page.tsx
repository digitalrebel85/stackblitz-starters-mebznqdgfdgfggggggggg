import { Metadata } from "next";
import { Suspense } from "react";
import { CoffeeShopHeader } from "@/components/layout/header";
import { CoffeeShopFooter } from "@/components/layout/footer";
import { LocationCard } from "@/components/coffee-shop/location-card";
import { getLocations } from "@/lib/api";
import { constructMetadata } from "@/components/seo/meta-tags";
import { generateBreadcrumbSchema } from "@/components/seo/structured-data";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Enable ISR with a 24-hour revalidation period
export const revalidate = 86400;

export const metadata: Metadata = constructMetadata({
  title: "London Coffee Shop Locations - Find Cafes Near You",
  description: "Discover coffee shops in popular London areas including Shoreditch, Soho, Camden, and more. Find the perfect cafe in your neighborhood.",
  url: "https://coffeeshopsinlondon.com/locations",
  type: "website",
  publishedTime: new Date().toISOString(),
  modifiedTime: new Date().toISOString(),
  authors: ["London Coffee Guide"],
  keywords: [
    "london coffee locations",
    "coffee shops near me",
    "london cafe areas",
    "shoreditch coffee shops",
    "soho cafes"
  ]
});

async function LocationsList() {
  const locations = getLocations();

  const jsonLd = generateBreadcrumbSchema([
    { name: "Home", url: "https://coffeeshopsinlondon.com" },
    { name: "Locations", url: "https://coffeeshopsinlondon.com/locations" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <LocationCard key={location.slug} location={location} />
        ))}
      </div>
    </>
  );
}

export default function LocationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CoffeeShopHeader />
      <main className="flex-1">
        <section className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-700">
            London Coffee Shop Locations
          </h1>
          <Suspense fallback={<LoadingSpinner />}>
            <LocationsList />
          </Suspense>
        </section>
      </main>
      <CoffeeShopFooter />
    </div>
  );
}