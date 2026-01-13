"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, Shield } from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"

interface ProductHeroProps {
  product: DemoProduct
}

export function ProductHero({ product }: ProductHeroProps) {
  const statusBadge = {
    active: { label: "Actief", icon: Clock, variant: "outline" as const },
    warranty: { label: "Garantie", icon: Shield, variant: "secondary" as const },
    service: { label: "Service nodig", icon: Clock, variant: "destructive" as const },
  }

  const status = statusBadge[product.product.status]

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="aspect-square lg:aspect-auto bg-muted flex items-center justify-center p-8">
          <img
            src={product.product.image || "/placeholder.svg"}
            alt={product.product.name}
            className="max-w-full max-h-80 object-contain"
            onError={(e) => {
              e.currentTarget.src =
                "/placeholder.svg?height=320&width=320&query=" + encodeURIComponent(product.product.name)
            }}
          />
        </div>

        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-primary text-primary-foreground">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Gevalideerd
            </Badge>
            <Badge variant="secondary">
              <Shield className="w-3 h-3 mr-1" />
              EU DPP Compliant
            </Badge>
            <Badge variant={status.variant}>
              <status.icon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 text-balance">{product.product.name}</h2>
          <p className="text-muted-foreground mb-2">{product.product.description}</p>
          <p className="text-sm text-muted-foreground mb-6">
            {product.brand.name} {product.product.series}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Product ID</p>
              <p className="font-mono text-sm font-medium">{product.product.model}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">UPC / EAN</p>
              <p className="font-mono text-sm font-medium">{product.product.upc}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Serienummer</p>
              <p className="text-sm font-medium">{product.product.serialNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Garantie tot</p>
              <p className="text-sm font-medium">
                {new Date(product.product.warrantyUntil).toLocaleDateString("nl-BE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
