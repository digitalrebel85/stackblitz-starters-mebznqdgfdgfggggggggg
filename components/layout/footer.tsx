import Link from "next/link"
import { Coffee, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react"

const footerSections = {
  explore: [
    { name: "Coffee Shops", href: "/coffee-shops" },
    { name: "Locations", href: "/locations" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  locations: [
    { name: "Coffee Shops in Camden", href: "/locations/camden" },
    { name: "Coffee Shops in Shoreditch", href: "/locations/shoreditch" },
    { name: "Coffee Shops in Soho", href: "/locations/soho" },
    { name: "Coffee Shops in Covent Garden", href: "/locations/covent-garden" },
    { name: "Coffee Shops in Marylebone", href: "/locations/marylebone" },
    { name: "Coffee Shops in London Bridge", href: "/locations/london-bridge" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com/londoncoffeeguide", icon: Instagram },
    { name: "Facebook", href: "https://facebook.com/londoncoffeeguide", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/londoncoffee", icon: Twitter },
  ],
  contact: [
    { text: "hello@coffeeshopsinlondon.com", icon: Mail },
    { text: "London, United Kingdom", icon: MapPin },
    { text: "+44 20 1234 5678", icon: Phone },
  ],
}

export function CoffeeShopFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-amber-500" />
              <span className="font-bold text-xl">London Coffee Shops</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover the finest coffee shops and cafes across London. Your ultimate guide to the city&apos;s vibrant coffee scene.
            </p>
          </div>

          {/* Rest of the footer content remains unchanged */}
          {/* Explore Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerSections.explore.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Locations</h3>
            <ul className="space-y-2">
              {footerSections.locations.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {footerSections.contact.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {footerSections.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                    aria-label={`Follow us on ${item.name}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} London Coffee Shops. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-4 justify-center">
              {footerSections.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground text-center lg:text-right">
              Made with ☕️ in London
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}