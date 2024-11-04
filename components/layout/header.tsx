"use client"

import Link from "next/link"
import { Coffee, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Coffee Shops", href: "/coffee-shops" },
  { name: "Locations", href: "/locations" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function CoffeeShopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link 
            className="flex items-center space-x-2" 
            href="/"
            aria-label="London Coffee Shops Home"
          >
            <Coffee className="h-6 w-6 text-amber-500" />
            <span className="hidden md:inline-block font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-700">
              London Coffee Shops
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-amber-500"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="ml-2"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-amber-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}