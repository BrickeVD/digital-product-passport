"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ExternalLink, Book, FileVideo, FileWarning, Wrench } from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"

interface DocumentationSectionProps {
  product: DemoProduct
}

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Book,
  FileVideo,
  FileWarning,
  Wrench,
}

export function DocumentationSection({ product }: DocumentationSectionProps) {
  const documents = product.documentation || []

  if (documents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Documentatie & Handleidingen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Geen documentatie beschikbaar voor dit product.</p>
        </CardContent>
      </Card>
    )
  }

  // Group documents by category
  const groupedDocs = documents.reduce(
    (acc, doc) => {
      const category = doc.category || "Overig"
      if (!acc[category]) acc[category] = []
      acc[category].push(doc)
      return acc
    },
    {} as Record<string, typeof documents>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Documentatie & Handleidingen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedDocs).map(([category, docs]) => (
          <div key={category}>
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">{category}</h3>
            <div className="space-y-3">
              {docs.map((doc, index) => {
                const IconComponent = iconMap[doc.icon || "FileText"] || FileText
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{doc.type}</span>
                          {doc.size && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{doc.size}</span>
                            </>
                          )}
                          {doc.language && (
                            <Badge variant="outline" className="text-xs">
                              {doc.language}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Openen
                          </a>
                        </Button>
                      )}
                      {doc.downloadUrl && (
                        <Button size="sm" asChild>
                          <a href={doc.downloadUrl} download>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
