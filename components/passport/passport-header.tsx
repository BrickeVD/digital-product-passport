"use client"

import { Button } from "@/components/ui/button"
import { Download, Share2, Printer } from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"
import { useState } from "react"

interface PassportHeaderProps {
  product: DemoProduct
}

const brandFallbackLogos: Record<string, string> = {
  "Schneider Electric": "/images/schneider-electric-logo-jpg.png",
  Miele: "https://www.miele.com/media/assets/no_index/press/logos/Miele_Wordmark_RGB_Red.svg",
  "Tony's Chocolonely": "https://tonyschocolonely.com/storage/configurations/tonyschocolonelycom.app/files/tc-logo.png",
  Siemens:
    "https://www.siemens.com/etc.clientlibs/siemens-sites/components/content/header/clientlibs/resources/logo.svg",
  "Philips Hue":
    "https://www.philips-hue.com/etc.clientlibs/signify-brand/philips-hue/hue-website/clientlibs/clientlib-main/resources/img/philips-hue-logo.svg",
}

export function PassportHeader({ product }: PassportHeaderProps) {
  const [logoError, setLogoError] = useState(false)

  const logoUrl = logoError
    ? brandFallbackLogos[product.brand.name] ||
      "/placeholder.svg?height=40&width=180&query=" + encodeURIComponent(product.brand.name + " logo")
    : product.brand.logo

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl || "/placeholder.svg"}
                alt={product.brand.name}
                className="h-10 w-auto max-w-[180px] object-contain"
                onError={() => setLogoError(true)}
              />
              {logoError && (
                <span className="text-lg font-bold" style={{ color: product.brand.color.primary }}>
                  {product.brand.name}
                </span>
              )}
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-sm font-medium text-foreground">Digital Product Passport</p>
              <p className="text-xs text-muted-foreground">EU Compliant</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Share2 className="w-4 h-4 mr-2" />
              Delen
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Exporteer PDF
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
