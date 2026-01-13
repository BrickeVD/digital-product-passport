"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Recycle, Factory, Zap, TrendingDown, Wrench } from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"

interface SustainabilityInfoProps {
  product: DemoProduct
  compact?: boolean
}

export function SustainabilityInfo({ product, compact = false }: SustainabilityInfoProps) {
  const sustainability = product.sustainability

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Leaf className="w-5 h-5 text-primary" />
            Duurzaamheid
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Recycleerbaarheid</span>
            <span className="font-bold text-foreground">{sustainability.recyclability}</span>
          </div>
          <Progress value={Number.parseInt(sustainability.recyclability)} className="h-2" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Recycle className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold">{sustainability.co2Footprint}</p>
              <p className="text-xs text-muted-foreground">CO₂ voetafdruk</p>
            </div>
            {sustainability.repairabilityScore && (
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <Wrench className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">{sustainability.repairabilityScore}/10</p>
                <p className="text-xs text-muted-foreground">Reparatie index</p>
              </div>
            )}
            {sustainability.energyLabel && (
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">{sustainability.energyLabel}</p>
                <p className="text-xs text-muted-foreground">Energie label</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="w-5 h-5 text-primary" />
            Circulariteit
          </CardTitle>
          <CardDescription>EU Ecodesign compliance en circulariteitsindicatoren</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{sustainability.recyclability}</p>
              <p className="text-sm text-muted-foreground">Recycleerbaarheid</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{sustainability.co2Footprint}</p>
              <p className="text-sm text-muted-foreground">CO₂ voetafdruk</p>
            </div>
            {sustainability.repairabilityScore && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-foreground">{sustainability.repairabilityScore}/10</p>
                <p className="text-sm text-muted-foreground">Reparatie-index</p>
              </div>
            )}
            {sustainability.energyLabel && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-foreground">{sustainability.energyLabel}</p>
                <p className="text-sm text-muted-foreground">Energie label</p>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Materiaalsamenstelling</h4>
            <div className="space-y-3">
              {sustainability.materials.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-foreground flex items-center gap-2">
                      {item.name}
                      {item.recyclable && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0">
                          <Recycle className="w-3 h-3" />
                        </Badge>
                      )}
                    </span>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-primary" />
            Milieu & Energie
          </CardTitle>
          <CardDescription>Duurzaamheidskenmerken en certificeringen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sustainability.energySavingFeatures && sustainability.energySavingFeatures.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-primary" />
                Duurzaamheidskenmerken
              </h4>
              <ul className="space-y-2">
                {sustainability.energySavingFeatures.map((feature, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <Leaf className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Certificeringen</h4>
            <div className="flex flex-wrap gap-2">
              {sustainability.certifications.map((cert) => (
                <Badge key={cert} className="bg-primary/10 text-primary">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
