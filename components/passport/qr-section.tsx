"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Copy, ExternalLink } from "lucide-react"
import { useState } from "react"
import type { DemoProduct } from "@/lib/demo-products"

interface QRSectionProps {
  product: DemoProduct
}

export function QRSection({ product }: QRSectionProps) {
  const [copied, setCopied] = useState(false)
  const passportUrl = `https://dpp.productdb.eu/p/${product.product.model}-${product.product.serialNumber}`

  const handleCopy = () => {
    navigator.clipboard.writeText(passportUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <QrCode className="w-5 h-5 text-primary" />
          Product Paspoort Link
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-center">
          <img
            src={`/generic-qr-code.png?height=144&width=144&query=QR code for ${product.product.name}`}
            alt={`QR Code voor ${product.product.name} Digital Product Passport`}
            className="w-36 h-36"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Paspoort URL</p>
          <div className="flex gap-2">
            <code className="flex-1 text-xs bg-muted p-2 rounded-md font-mono truncate">{passportUrl}</code>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          {copied && <p className="text-xs text-primary">Gekopieerd!</p>}
        </div>

        <Button variant="outline" className="w-full bg-transparent" asChild>
          <a href={passportUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in nieuw tabblad
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
