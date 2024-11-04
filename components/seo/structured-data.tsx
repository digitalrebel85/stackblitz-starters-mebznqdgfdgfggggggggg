import { BreadcrumbItem } from "@/types/seo";

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Coffee Shops in London",
    "description": "Discover the best coffee shops in London",
    "url": "https://coffeeshopsinlondon.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://coffeeshopsinlondon.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateLocationSchema(location: {
  name: string;
  description: string;
  image: string;
  coffeeShopCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${location.name}, London`,
    "description": location.description,
    "image": location.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": "London",
      "addressCountry": "GB"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": location.coffeeShopCount.toString()
    }
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

interface CoffeeShopSchemaProps {
  title: string;
  description: string;
  image: string;
  address: string;
  rating?: number;
  reviews?: number;
  phone?: string;
  website?: string;
  hours?: string[];
}

export function generateCoffeeShopSchema({
  title,
  description,
  image,
  address,
  rating,
  reviews,
  phone,
  website,
  hours
}: CoffeeShopSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": title,
    "description": description,
    "image": image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    ...(rating && { 
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating,
        "reviewCount": reviews
      }
    }),
    ...(phone && { "telephone": phone }),
    ...(website && { "url": website }),
    ...(hours && { "openingHours": hours })
  };
}