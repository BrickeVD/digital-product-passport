"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Check, X, Info, Wheat, Milk, Egg, Fish, Shell, Nut, Leaf } from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"

interface AllergensSectionProps {
  product: DemoProduct
  compact?: boolean
}

// Common allergens with their icons
const allergenIcons: Record<string, React.ElementType> = {
  gluten: Wheat,
  melk: Milk,
  lactose: Milk,
  eieren: Egg,
  vis: Fish,
  schaaldieren: Shell,
  noten: Nut,
  pinda: Nut,
  soja: Leaf,
}

export function AllergensSection({ product, compact = false }: AllergensSectionProps) {
  const allergens = product.allergens

  // Only show for food products
  if (product.sector !== "Voeding" || !allergens) {
    return null
  }

  const { contains, mayContain, freeFrom } = allergens

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-primary" />
            Allergenen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contains && contains.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {contains.map((allergen) => (
                  <Badge key={allergen} variant="destructive" className="text-xs">
                    <X className="h-3 w-3 mr-1" />
                    {allergen}
                  </Badge>
                ))}
              </div>
            )}
            {freeFrom && freeFrom.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {freeFrom.slice(0, 4).map((item) => (
                  <Badge key={item} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    {item}
                  </Badge>
                ))}
                {freeFrom.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{freeFrom.length - 4} meer
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Allergeneninformatie
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contains allergens - Warning */}
        {contains && contains.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Bevat</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {contains.map((allergen) => {
                const IconComponent = allergenIcons[allergen.toLowerCase()] || AlertTriangle
                return (
                  <Badge key={allergen} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1">
                    <IconComponent className="h-4 w-4 mr-2" />
                    {allergen}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        {/* May contain - Caution */}
        {mayContain && mayContain.length > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">Kan sporen bevatten van</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {mayContain.map((allergen) => {
                const IconComponent = allergenIcons[allergen.toLowerCase()] || Info
                return (
                  <Badge
                    key={allergen}
                    variant="outline"
                    className="bg-amber-100 text-amber-800 border-amber-300 px-3 py-1"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {allergen}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        {/* Free from - Safe */}
        {freeFrom && freeFrom.length > 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Check className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Vrij van</h3>
            </div>
            <p className="text-sm text-green-700 mb-3">Op basis van de ingrediënten bevat dit product geen:</p>
            <div className="flex flex-wrap gap-2">
              {freeFrom.map((item) => {
                const IconComponent = allergenIcons[item.toLowerCase()] || Check
                return (
                  <Badge
                    key={item}
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-300 px-3 py-1"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {item}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        {/* Ingredients list if available */}
        {allergens.ingredients && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Ingrediënten</h3>
            <p className="text-sm text-muted-foreground">{allergens.ingredients}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>
            De "Vrij van" informatie is gebaseerd op de ingrediëntenlijst. Als een allergeen niet in de ingrediënten
            voorkomt, is het product per definitie vrij van dit allergeen. Raadpleeg altijd de verpakking voor de meest
            actuele informatie.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
