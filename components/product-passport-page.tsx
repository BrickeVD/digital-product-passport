"use client"

import { useState, useEffect } from "react"
import { PassportHeader } from "./passport/passport-header"
import { ProductHero } from "./passport/product-hero"
import { ProductSpecifications } from "./passport/product-specifications"
import { ReplacementParts } from "./passport/replacement-parts"
import { MaintenanceHistory } from "./passport/maintenance-history"
import { SustainabilityInfo } from "./passport/sustainability-info"
import { CertificationsSection } from "./passport/certifications-section"
import { QRSection } from "./passport/qr-section"
import { OwnershipSection } from "./passport/ownership-section"
import { DocumentationSection } from "./passport/documentation-section"
import { AllergensSection } from "./passport/allergens-section"
import { DemoProductSelector } from "./demo-product-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { demoProducts, type DemoProduct } from "@/lib/demo-products"

export function ProductPassportPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentProduct, setCurrentProduct] = useState<DemoProduct>(demoProducts[0])

  useEffect(() => {
    const root = document.documentElement
    const { color } = currentProduct.brand

    root.style.setProperty("--primary", color.primary)
    root.style.setProperty("--accent", color.primary)
    root.style.setProperty("--ring", color.primary)
    root.style.setProperty("--secondary", color.secondary)
    root.style.setProperty("--brand", color.primary)
    root.style.setProperty("--brand-muted", color.muted)

    return () => {
      root.style.removeProperty("--primary")
      root.style.removeProperty("--accent")
      root.style.removeProperty("--ring")
      root.style.removeProperty("--secondary")
      root.style.removeProperty("--brand")
      root.style.removeProperty("--brand-muted")
    }
  }, [currentProduct])

  const handleProductChange = (product: DemoProduct) => {
    setCurrentProduct(product)
    setActiveTab("overview")
  }

  const isFood = currentProduct.sector === "Voeding"
  const hasDocumentation = currentProduct.documentation && currentProduct.documentation.length > 0

  return (
    <div className="min-h-screen bg-background">
      <PassportHeader product={currentProduct} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductHero product={currentProduct} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted px-4 py-3 rounded-lg"
            >
              Overzicht
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted px-4 py-3 rounded-lg"
            >
              Specificaties
            </TabsTrigger>
            {isFood && (
              <TabsTrigger
                value="allergens"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted px-4 py-3 rounded-lg"
              >
                Allergenen
              </TabsTrigger>
            )}
            {!isFood && (
              <TabsTrigger
                value="replacement"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted px-4 py-3 rounded-lg"
              >
                Vervanging
              </TabsTrigger>
            )}
            {!isFood && (
              <TabsTrigger
                value="maintenance"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted px-4 py-3 rounded-lg"
              >
                Onderhoud
              </TabsTrigger>
            )}
            <TabsTrigger
              value="documentation"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted px-4 py-3 rounded-lg"
            >
              Documentatie
            </TabsTrigger>
            <TabsTrigger
              value="sustainability"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted px-4 py-3 rounded-lg"
            >
              Duurzaamheid
            </TabsTrigger>
            <TabsTrigger
              value="ownership"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted px-4 py-3 rounded-lg"
            >
              Eigendom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ProductSpecifications product={currentProduct} />
                {isFood && <AllergensSection product={currentProduct} compact />}
                <CertificationsSection product={currentProduct} />
              </div>
              <div className="space-y-6">
                <QRSection product={currentProduct} />
                <SustainabilityInfo product={currentProduct} compact />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <ProductSpecifications product={currentProduct} detailed />
          </TabsContent>

          {isFood && (
            <TabsContent value="allergens" className="mt-6">
              <AllergensSection product={currentProduct} />
            </TabsContent>
          )}

          <TabsContent value="replacement" className="mt-6">
            <ReplacementParts product={currentProduct} />
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6">
            <MaintenanceHistory product={currentProduct} />
          </TabsContent>

          <TabsContent value="documentation" className="mt-6">
            <DocumentationSection product={currentProduct} />
          </TabsContent>

          <TabsContent value="sustainability" className="mt-6">
            <SustainabilityInfo product={currentProduct} />
          </TabsContent>

          <TabsContent value="ownership" className="mt-6">
            <OwnershipSection product={currentProduct} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo-light.svg" alt="productdb" className="h-7 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 productdb. Alle rechten voorbehouden. EU Digital Product Passport compliant.
            </p>
          </div>
        </div>
      </footer>

      <DemoProductSelector currentProductId={currentProduct.id} onProductChange={handleProductChange} />
    </div>
  )
}
