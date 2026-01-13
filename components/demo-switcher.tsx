"use client"

import type React from "react"

import { useState } from "react"
import { useDemo } from "@/lib/demo-context"
import { sectors } from "@/lib/demo-products"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Layers,
  Factory,
  WashingMachine,
  UtensilsCrossed,
  Cog,
  Lightbulb,
  LayoutGrid,
  ChevronRight,
  Check,
  Presentation,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="h-4 w-4" />,
  Factory: <Factory className="h-4 w-4" />,
  WashingMachine: <WashingMachine className="h-4 w-4" />,
  UtensilsCrossed: <UtensilsCrossed className="h-4 w-4" />,
  Cog: <Cog className="h-4 w-4" />,
  Lightbulb: <Lightbulb className="h-4 w-4" />,
}

export function DemoSwitcher() {
  const { currentProduct, setCurrentProduct, products } = useDemo()
  const [open, setOpen] = useState(false)
  const [selectedSector, setSelectedSector] = useState("all")

  const filteredProducts = selectedSector === "all" ? products : products.filter((p) => p.sector === selectedSector)

  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setCurrentProduct(product)
      setOpen(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 gap-3 rounded-full px-6 shadow-2xl hover:scale-105 transition-transform bg-foreground text-background hover:bg-foreground/90"
        >
          <Presentation className="h-5 w-5" />
          <span className="font-semibold">Demo Mode</span>
          <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground">
            {products.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Layers className="h-5 w-5 text-primary" />
            Product Demo Selector
          </SheetTitle>
          <SheetDescription>
            Selecteer een product uit verschillende sectoren om het Digital Product Passport te demonstreren.
          </SheetDescription>
        </SheetHeader>

        {/* Sector Filter */}
        <div className="mt-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">Filter op sector</p>
          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <Button
                key={sector.id}
                variant={selectedSector === sector.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSector(sector.id)}
                className="gap-2"
              >
                {iconMap[sector.icon]}
                {sector.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <ScrollArea className="mt-6 h-[calc(100vh-280px)]">
          <div className="space-y-3 pr-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductSelect(product.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all hover:shadow-md ${
                  currentProduct.id === product.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src={product.product.image || "/placeholder.svg"}
                      alt={product.product.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className="text-xs gap-1"
                        style={{
                          borderColor: product.brand.color.primary,
                          color: product.brand.color.primary,
                        }}
                      >
                        {iconMap[product.sectorIcon]}
                        {product.sector}
                      </Badge>
                      {currentProduct.id === product.id && (
                        <Badge className="text-xs bg-primary">
                          <Check className="h-3 w-3 mr-1" />
                          Actief
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm truncate">{product.product.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {product.brand.name} · {product.product.model}
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Powered by{" "}
            <img src="/images/logo-light.svg" alt="productdb" className="inline-block h-4 ml-1 align-middle" />
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
