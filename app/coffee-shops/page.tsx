import { Suspense } from "react";
import { Metadata } from "next";
import { CoffeeShopHeader } from "@/components/layout/header";
import { CoffeeShopFooter } from "@/components/layout/footer";
import { CoffeeShopCard } from "@/components/coffee-shop/coffee-shop-card";
import { getCoffeeShops } from "@/lib/api";
import { constructMetadata } from "@/components/seo/meta-tags";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Revalidate every 6 months (in seconds)
export const revalidate = 15552000;

export const metadata: Metadata = constructMetadata({
  title: "Best Coffee Shops in London - Complete Directory",
  description: "Discover London's finest coffee shops, from artisanal roasters to cozy cafes. Find detailed reviews, ratings, and directions to the best coffee spots in the city.",
  url: "https://coffeeshopsinlondon.com/coffee-shops",
  type: "website",
  publishedTime: new Date().toISOString(),
  modifiedTime: new Date().toISOString(),
  authors: ["London Coffee Guide"],
  keywords: ["london coffee shops", "best cafes london", "coffee directory london"]
});

async function CoffeeShopList() {
  const coffeeShops = await getCoffeeShops();
  
  if (coffeeShops.length === 0) {
    return (
      <p className="text-center text-gray-600">
        Loading coffee shops... Please check back shortly.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coffeeShops.map((shop) => (
        <CoffeeShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}

export default async function CoffeeShopsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CoffeeShopHeader />
      <main className="flex-1">
        <section className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-700">
            London Coffee Shops
          </h1>
          <Suspense fallback={<LoadingSpinner />}>
            <CoffeeShopList />
          </Suspense>
        </section>
      </main>
      <CoffeeShopFooter />
    </div>
  );
}