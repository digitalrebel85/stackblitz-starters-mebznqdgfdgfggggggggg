import { Metadata } from "next";
import { Suspense } from "react";
import HomePage from "@/components/pages/home";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { constructMetadata } from "@/components/seo/meta-tags";
import { generateWebsiteSchema } from "@/components/seo/structured-data";

// Enable ISR with a 24-hour revalidation period
export const revalidate = 86400;

export const metadata: Metadata = constructMetadata({
  title: "Coffee Shops in London - Discover the Best Cafes",
  description: "Explore London's finest coffee shops, artisanal cafes, and specialty roasters. Find your perfect brew in the heart of the city.",
  url: "https://coffeeshopsinlondon.com",
  type: "website",
  publishedTime: new Date().toISOString(),
  modifiedTime: new Date().toISOString(),
  authors: ["London Coffee Guide"],
  keywords: [
    "london coffee shops",
    "best cafes london",
    "specialty coffee london",
    "coffee guide london",
    "artisan coffee shops"
  ]
});

export default function Page() {
  const jsonLd = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    </>
  );
}