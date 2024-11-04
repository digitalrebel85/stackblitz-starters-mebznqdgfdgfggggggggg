import { Metadata } from "next";
import { CoffeeShopHeader } from "@/components/layout/header";
import { CoffeeShopFooter } from "@/components/layout/footer";
import { Mail, MapPin, Phone } from "lucide-react";
import { constructMetadata } from "@/components/seo/meta-tags";
import { generateBreadcrumbSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us - London Coffee Guide",
  description: "Get in touch with the London Coffee Guide team. Share your feedback, suggest a coffee shop, or ask us anything about London&apos;s coffee scene.",
  url: "https://coffeeshopsinlondon.com/contact",
  type: "website",
  publishedTime: new Date().toISOString(),
  modifiedTime: new Date().toISOString(),
  authors: ["London Coffee Guide"],
  keywords: [
    "contact london coffee guide",
    "coffee shop suggestions",
    "feedback",
    "london coffee community"
  ]
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@coffeeshopsinlondon.com",
    href: "mailto:hello@coffeeshopsinlondon.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 20 1234 5678",
    href: "tel:+442012345678"
  },
  {
    icon: MapPin,
    label: "Address",
    value: "London, United Kingdom",
    href: "https://maps.google.com/?q=London,UK"
  }
];

export default function ContactPage() {
  const jsonLd = generateBreadcrumbSchema([
    { name: "Home", url: "https://coffeeshopsinlondon.com" },
    { name: "Contact", url: "https://coffeeshopsinlondon.com/contact" }
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
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
            <p className="text-center text-gray-600 mb-12">
              Have questions or suggestions? We&apos;d love to hear from you. Get in touch with us using any of the methods below.
            </p>
            
            <div className="grid gap-8 md:grid-cols-3">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <info.icon className="w-8 h-8 text-amber-500 mb-4" />
                  <h2 className="text-lg font-semibold mb-2">{info.label}</h2>
                  <p className="text-gray-600 text-center">{info.value}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <CoffeeShopFooter />
    </div>
  );
}