import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getLocations, getCoffeeShopsByLocation } from "@/lib/api";
import { LocationPage } from "@/components/pages/location-page";
import { constructMetadata } from "@/components/seo/meta-tags";
import { generateLocationSchema } from "@/components/seo/structured-data";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Enable ISR with a 24-hour revalidation period
export const revalidate = 15638400;

// Generate static paths at build time
export async function generateStaticParams() {
  const locations = getLocations();
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const locations = getLocations();
  const location = locations.find((loc) => loc.slug === params.slug);
  
  if (!location) {
    return constructMetadata({
      title: "Location Not Found",
      description: "The requested location could not be found.",
      url: `https://coffeeshopsinlondon.com/locations/${params.slug}`,
      type: "website",
    });
  }

  return constructMetadata({
    title: `Best Coffee Shops in ${location.name}, London`,
    description: location.description,
    image: location.image,
    url: `https://coffeeshopsinlondon.com/locations/${location.slug}`,
    type: "website",
    publishedTime: new Date().toISOString(),
    modifiedTime: new Date().toISOString(),
    authors: ["London Coffee Guide"],
    keywords: [
      `${location.name.toLowerCase()} coffee shops`,
      `cafes in ${location.name.toLowerCase()}`,
      "london coffee"
    ]
  });
}

async function LocationContent({ slug }: { slug: string }) {
  const locations = getLocations();
  const location = locations.find((loc) => loc.slug === slug);
  
  if (!location) {
    notFound();
  }

  const coffeeShops = await getCoffeeShopsByLocation(slug);

  const jsonLd = generateLocationSchema({
    name: location.name,
    description: location.description,
    image: location.image,
    coffeeShopCount: location.coffeeShopCount
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPage location={location} coffeeShops={coffeeShops} />
    </>
  );
}

export default async function LocationRoute({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LocationContent slug={params.slug} />
    </Suspense>
  );
}