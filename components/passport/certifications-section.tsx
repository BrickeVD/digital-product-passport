"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"

interface CertificationsSectionProps {
  product: DemoProduct
}

export function CertificationsSection({ product }: CertificationsSectionProps) {
  const certifications = product.certifications

  if (certifications.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Certificeringen & Keurmerken
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-sm text-foreground mb-1">{cert.name}</h4>
              <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground mb-2 font-mono">{cert.number}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {cert.validUntil}
                </Badge>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
