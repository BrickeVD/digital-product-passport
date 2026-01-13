"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Factory,
  UtensilsCrossed,
  Cog,
  Lightbulb,
  ChevronUp,
  ChevronDown,
  X,
  Presentation,
  WashingMachine,
  LayoutGrid,
} from "lucide-react"
import { demoProducts, sectors, type DemoProduct } from "@/lib/demo-products"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Factory,
  WashingMachine,
  UtensilsCrossed,
  Cog,
  Lightbulb,
  LayoutGrid,
}

interface DemoProductSelectorProps {
  currentProductId: string
  onProductChange: (product: DemoProduct) => void
}

function BrandLogo({ product, size = "sm" }: { product: DemoProduct; size?: "sm" | "md" }) {
  const [hasError, setHasError] = useState(false)
  const sizeClasses = size === "sm" ? "h-5 max-w-[80px]" : "h-8 max-w-[120px]"

  if (hasError) {
    return (
      <span
        className={`font-bold ${size === "sm" ? "text-xs" : "text-sm"} truncate`}
        style={{ color: product.brand.color.primary }}
      >
        {product.brand.name}
      </span>
    )
  }

  return (
    <img
      src={product.brand.logo || "/placeholder.svg"}
      alt={product.brand.name}
      className={`${sizeClasses} w-auto object-contain`}
      onError={() => setHasError(true)}
    />
  )
}

export function DemoProductSelector({ currentProductId, onProductChange }: DemoProductSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSector, setSelectedSector] = useState("all")

  const filteredProducts =
    selectedSector === "all" ? demoProducts : demoProducts.filter((p) => p.sector === selectedSector)

  const currentProduct = demoProducts.find((p) => p.id === currentProductId)

  const SectorIcon = currentProduct ? iconMap[currentProduct.sectorIcon] || Factory : Factory

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Demo Label */}
        <div className="flex items-center gap-2 bg-foreground text-background px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
          <Presentation className="w-4 h-4" />
          Demo Mode
        </div>

        {/* Main Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 px-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 gap-3"
          style={{
            backgroundColor: currentProduct?.brand.color.primary,
          }}
        >
          <SectorIcon className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">{currentProduct?.brand.name || "Selecteer product"}</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </Button>
      </div>

      {/* Product Selector Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <Card className="fixed bottom-24 right-6 w-[420px] max-h-[70vh] overflow-hidden z-50 shadow-2xl border-2">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Product Passport Demo</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Selecteer een product om het paspoort te bekijken</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              {/* Sector Filter */}
              <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
                {sectors.map((sector) => {
                  const Icon = iconMap[sector.icon] || LayoutGrid
                  return (
                    <Button
                      key={sector.id}
                      variant={selectedSector === sector.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSector(sector.id)}
                      className="gap-1.5"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {sector.label}
                    </Button>
                  )
                })}
              </div>

              {/* Product List */}
              <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2">
                {filteredProducts.map((product) => {
                  const isActive = product.id === currentProductId
                  const ProductSectorIcon = iconMap[product.sectorIcon] || Factory

                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        onProductChange(product)
                        setIsOpen(false)
                      }}
                      className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
                        isActive
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={product.product.image || "/placeholder.svg"}
                          alt={product.product.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                            e.currentTarget.nextElementSibling?.classList.remove("hidden")
                          }}
                        />
                        <ProductSectorIcon className="w-8 h-8 text-muted-foreground hidden" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="secondary"
                            className="text-xs"
                            style={{
                              backgroundColor: `${product.brand.color.primary}20`,
                              color: product.brand.color.primary,
                            }}
                          >
                            {product.sector}
                          </Badge>
                          {isActive && (
                            <Badge variant="default" className="text-xs">
                              Actief
                            </Badge>
                          )}
                        </div>
                        <p className="font-semibold text-sm truncate">{product.product.name}</p>
                        <div className="mt-1">
                          <BrandLogo product={product} size="sm" />
                        </div>
                      </div>

                      {/* Brand Color Indicator */}
                      <div
                        className="w-3 h-12 rounded-full flex-shrink-0"
                        style={{ backgroundColor: product.brand.color.primary }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Footer Info */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  {demoProducts.length} producten in {sectors.length - 1} sectoren beschikbaar
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}
