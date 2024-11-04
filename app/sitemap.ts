import { MetadataRoute } from 'next';
import { getLocations, getCoffeeShops } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://coffeeshopsinlondon.com';
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/coffee-shops`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Location pages
  const locations = getLocations();
  const locationUrls = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Coffee shop pages
  const coffeeShops = await getCoffeeShops();
  const coffeeShopUrls = coffeeShops.map((shop) => ({
    url: `${baseUrl}/coffee-shops/${shop.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...locationUrls, ...coffeeShopUrls];
}