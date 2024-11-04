import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCoffeeShops, getCoffeeShopById } from "@/lib/api";
import { CoffeeShopDetails } from "@/components/coffee-shop/coffee-shop-details";
import { constructMetadata } from "@/components/seo/meta-tags";
import { generateCoffeeShopSchema } from "@/components/seo/structured-data";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CoffeeShopHeader } from "@/components/layout/header";
import { CoffeeShopFooter } from "@/components/layout/footer";

// Enable ISR with a 24-hour revalidation period
export const revalidate = 86400;

// Generate static paths at build time
export async function generateStaticParams() {
  const shops = await getCoffeeShops();
  return shops.map((shop) => ({
    id: shop.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const shop = await getCoffeeShopById(params.id);
  
  if (!shop) {
    return constructMetadata({
      title: "Coffee Shop Not Found",
      description: "The requested coffee shop could not be found.",
      url: `https://coffeeshopsinlondon.com/coffee-shops/${params.id}`,
      type: "website",
    });
  }

  return constructMetadata({
    title: `${shop.title} - Coffee Shop in ${shop.area}, London`,
    description: `Visit ${shop.title} in ${shop.area}, London. ${shop.description}`,
    image: shop.thumbnail,
    url: `https://coffeeshopsinlondon.com/coffee-shops/${shop.id}`,
    type: "article",
    publishedTime: new Date().toISOString(),
    modifiedTime: new Date().toISOString(),
    authors: ["London Coffee Guide"],
    keywords: [
      shop.title.toLowerCase(),
      `${shop.area.toLowerCase()} coffee`,
      "london coffee shops",
      "cafe reviews london",
    ],
  });
}

async function CoffeeShopContent({ id }: { id: string }) {
  const shop = await getCoffeeShopById(id);
  
  if (!shop) {
    notFound();
  }

  const jsonLd = generateCoffeeShopSchema({
    title: shop.title,
    description: shop.description,
    image: shop.thumbnail,
    address: shop.address,
    rating: shop.rating,
    reviews: shop.reviews,
    phone: shop.phone,
    website: shop.website,
    hours: shop.hours,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoffeeShopHeader />
      <main className="flex-1">
        <CoffeeShopDetails shop={shop} />
      </main>
      <CoffeeShopFooter />
    </div>
  );
}

export default async function CoffeeShopPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CoffeeShopContent id={params.id} />
    </Suspense>
  );
}