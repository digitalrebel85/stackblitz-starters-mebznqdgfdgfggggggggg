import { Metadata } from "next";

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: "article" | "website";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}

export function constructMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: MetaTagsProps): Metadata {
  return {
    title,
    description,
    keywords,
    authors: authors?.map(author => ({ name: author })),
    openGraph: {
      title,
      description,
      url,
      siteName: "Coffee Shops in London",
      images: image ? [{ url: image }] : undefined,
      type,
      publishedTime,
      modifiedTime,
      authors,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
      creator: "@londoncoffee",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}