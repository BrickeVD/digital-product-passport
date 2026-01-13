"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Search,
  CheckCircle2,
  ExternalLink,
  Hash,
  Layers,
  Copy,
  Check,
  RefreshCw,
  Puzzle,
  Info,
} from "lucide-react"
import { useState } from "react"
import type { DemoProduct } from "@/lib/demo-products"

interface ReplacementPartsProps {
  product: DemoProduct
}

export function ReplacementParts({ product }: ReplacementPartsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("slijtdelen")

  const slijtdelen = product.replacementParts
  const optioneleProducten = product.optionalProducts

  const currentParts = activeTab === "slijtdelen" ? slijtdelen : optioneleProducten

  const filteredParts = currentParts.filter(
    (part) =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const copyToClipboard = (part: (typeof slijtdelen)[0]) => {
    const eamData = `${part.partNumber}\t${part.quantity}\t${part.unit}\t${part.name}`
    navigator.clipboard.writeText(eamData)
    setCopiedId(part.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Check if there are no replacement parts (like for food products)
  const hasReplacementParts = slijtdelen.length > 0
  const hasOptionalProducts = optioneleProducten.length > 0

  if (!hasReplacementParts && !hasOptionalProducts) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="py-12">
          <div className="text-center">
            <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Geen vervangingsonderdelen</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Dit product heeft geen vervangingsonderdelen of optionele uitbreidingen. Dit is gebruikelijk voor
              consumptiegoederen zoals voedingsproducten.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="slijtdelen" className="flex items-center gap-2" disabled={!hasReplacementParts}>
            <RefreshCw className="w-4 h-4" />
            Slijtdelen / Vervanging
            <Badge variant="secondary" className="ml-1">
              {slijtdelen.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="optioneel" className="flex items-center gap-2" disabled={!hasOptionalProducts}>
            <Puzzle className="w-4 h-4" />
            Optionele Producten
            <Badge variant="secondary" className="ml-1">
              {optioneleProducten.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="slijtdelen" className="space-y-6">
          {hasReplacementParts ? (
            <>
              {/* BOM Export */}
              <Card className="bg-muted/30 border-dashed">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    Bill of Materials (BOM) - EAM Export
                  </CardTitle>
                  <CardDescription>Standaard slijtdelen die bij vervanging nodig zijn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Artikelnr.</th>
                          <th className="text-center py-2 px-3 font-medium text-muted-foreground">Aantal</th>
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Eenheid</th>
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Omschrijving</th>
                          <th className="text-center py-2 px-3 font-medium text-muted-foreground">Kopiëren</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slijtdelen.map((part) => (
                          <tr key={part.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-2 px-3 font-mono text-xs">{part.partNumber}</td>
                            <td className="py-2 px-3 text-center">
                              <span className="inline-flex items-center justify-center bg-primary/10 text-primary font-semibold rounded-md px-2 py-0.5 min-w-[3rem]">
                                {part.quantity}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-muted-foreground">{part.unit}</td>
                            <td className="py-2 px-3">{part.name}</td>
                            <td className="py-2 px-3 text-center">
                              <button
                                onClick={() => copyToClipboard(part)}
                                className="p-1.5 rounded-md hover:bg-muted transition-colors"
                                title="Kopieer naar klembord"
                              >
                                {copiedId === part.id ? (
                                  <Check className="w-4 h-4 text-primary" />
                                ) : (
                                  <Copy className="w-4 h-4 text-muted-foreground" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Parts Detail List */}
              <PartsDetailList
                parts={filteredParts as any}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedPart={selectedPart}
                setSelectedPart={setSelectedPart}
                title="Slijtdelen Detail"
                description="Onderdelen met beperkte levensduur die periodiek vervangen moeten worden"
                showQuantity={true}
              />
            </>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="py-8 text-center text-muted-foreground">
                Geen slijtdelen beschikbaar voor dit product.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="optioneel" className="space-y-6">
          {hasOptionalProducts ? (
            <>
              <Card className="bg-blue-500/5 border-blue-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Puzzle className="w-4 h-4 text-blue-600" />
                    Optionele Uitbreidingen
                  </CardTitle>
                  <CardDescription>
                    Deze producten zijn niet standaard geïnstalleerd, maar kunnen als uitbreiding worden toegevoegd.
                  </CardDescription>
                </CardHeader>
              </Card>

              <PartsDetailList
                parts={filteredParts as any}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedPart={selectedPart}
                setSelectedPart={setSelectedPart}
                title="Optionele Producten"
                description={`Uitbreidingsmodules en accessoires voor ${product.product.model}`}
                showQuantity={false}
              />
            </>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="py-8 text-center text-muted-foreground">
                Geen optionele producten beschikbaar voor dit product.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PartsDetailList({
  parts,
  searchTerm,
  setSearchTerm,
  selectedPart,
  setSelectedPart,
  title,
  description,
  showQuantity,
}: {
  parts: Array<{
    id: string
    name: string
    partNumber: string
    category: string
    quantity?: number
    unit?: string
    lifespan?: string
    description: string
    specifications: Array<{ label: string; value: string }>
  }>
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedPart: string | null
  setSelectedPart: (id: string | null) => void
  title: string
  description: string
  showQuantity: boolean
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op naam, artikelnummer of categorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4">
          {parts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? `Geen onderdelen gevonden voor "${searchTerm}"` : "Geen onderdelen beschikbaar"}
            </div>
          ) : (
            parts.map((part) => (
              <div
                key={part.id}
                className={`border border-border rounded-lg overflow-hidden transition-all ${
                  selectedPart === part.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{part.name}</h3>
                        <Badge className="bg-primary/10 text-primary">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Beschikbaar
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">{part.partNumber}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{part.category}</Badge>
                        {part.lifespan && (
                          <span className="text-xs text-muted-foreground">Levensduur: {part.lifespan}</span>
                        )}
                      </div>
                    </div>
                    {showQuantity && part.quantity !== undefined && (
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-1 px-4 py-2 bg-primary/5 rounded-lg border border-primary/20">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Hash className="w-3 h-3" />
                            <span>Aantal in product</span>
                          </div>
                          <span className="text-2xl font-bold text-primary">{part.quantity}</span>
                          <span className="text-xs text-muted-foreground">{part.unit}</span>
                        </div>
                      </div>
                    )}
                    {!showQuantity && (
                      <Badge variant="secondary" className="text-xs">
                        Optioneel
                      </Badge>
                    )}
                  </div>
                </div>

                {selectedPart === part.id && (
                  <div className="border-t border-border bg-muted/30 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Beschrijving</h4>
                        <p className="text-sm text-muted-foreground mb-4">{part.description}</p>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Technische Specificaties</h4>
                        <dl className="space-y-2">
                          {part.specifications.map((spec) => (
                            <div key={spec.label} className="flex justify-between text-sm">
                              <dt className="text-muted-foreground">{spec.label}</dt>
                              <dd className="font-medium font-mono">{spec.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                      <div>
                        <button className="flex items-center gap-1 mt-4 text-sm text-primary hover:underline">
                          <ExternalLink className="w-4 h-4" />
                          Bekijk productpagina
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
