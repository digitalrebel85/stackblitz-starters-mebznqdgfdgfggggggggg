import { Metadata } from "next";
import { CoffeeShopHeader } from "@/components/layout/header";
import { CoffeeShopFooter } from "@/components/layout/footer";
import { constructMetadata } from "@/components/seo/meta-tags";
import { generateBreadcrumbSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = constructMetadata({
  title: "About Us - London Coffee Guide",
  description: "Learn about our mission to help you discover the best coffee shops in London. Your trusted guide to London's vibrant coffee scene.",
  url: "https://coffeeshopsinlondon.com/about",
  type: "website",
  publishedTime: new Date().toISOString(),
  modifiedTime: new Date().toISOString(),
  authors: ["London Coffee Guide"],
  keywords: [
    "about london coffee guide",
    "london coffee scene",
    "coffee culture london",
    "coffee community"
  ]
});

export default function AboutPage() {
  const jsonLd = generateBreadcrumbSchema([
    { name: "Home", url: "https://coffeeshopsinlondon.com" },
    { name: "About", url: "https://coffeeshopsinlondon.com/about" }
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoffeeShopHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          <div className="max-w-3xl mx-auto prose prose-amber lg:prose-lg">
            <p className="lead">
              Welcome to Coffee Shops in London, your ultimate guide to discovering
              the finest cafes and roasteries across the city.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              We&apos;re passionate about connecting coffee lovers with London&apos;s most
              exceptional cafes. Our curated selection showcases the city&apos;s diverse
              coffee culture, from historic establishments to cutting-edge
              roasteries.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li>Carefully curated coffee shop recommendations</li>
              <li>Detailed reviews and ratings</li>
              <li>Location-based search</li>
              <li>Up-to-date information about opening hours and facilities</li>
              <li>Insights into London&apos;s coffee culture</li>
            </ul>

            <h2>Our Values</h2>
            <p>
              We believe in supporting local businesses and promoting sustainable
              coffee practices. Our platform helps you discover establishments that
              share these values while serving exceptional coffee.
            </p>

            <h2>Join Our Community</h2>
            <p>
              Whether you&apos;re a coffee connoisseur or just beginning your coffee
              journey, we invite you to explore London&apos;s vibrant coffee scene with
              us. Share your experiences and connect with fellow coffee
              enthusiasts.
            </p>
          </div>
        </div>
      </main>
      <CoffeeShopFooter />
    </div>
  );
}