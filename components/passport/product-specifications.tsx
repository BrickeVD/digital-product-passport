"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Cpu,
  Zap,
  Gauge,
  Box,
  Shield,
  Activity,
  Scale,
  Percent,
  MapPin,
  Award,
  Sun,
  Palette,
  Circle,
  RotateCw,
  Volume2,
  Package,
} from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"

interface ProductSpecificationsProps {
  product: DemoProduct
  detailed?: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Activity,
  Shield,
  Weight: Box,
  Box,
  Gauge,
  Scale,
  Percent,
  MapPin,
  Award,
  Sun,
  Palette,
  Circle,
  RotateCw,
  Volume2,
  Package,
}

export function ProductSpecifications({ product, detailed = false }: ProductSpecificationsProps) {
  if (detailed) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.specifications.categories.map((section) => (
          <Card key={section.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{section.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                {section.specs.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                  >
                    <dt className="text-sm text-muted-foreground">{item.label}</dt>
                    <dd className="text-sm font-medium font-mono">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary" />
          Kernspecificaties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.specifications.key.map((spec) => {
            const Icon = spec.icon ? iconMap[spec.icon] || Box : Box
            return (
              <div key={spec.label} className="bg-muted/50 rounded-lg p-4 text-center">
                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{spec.value}</p>
                <p className="text-sm font-medium text-foreground mt-1">{spec.label}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
