"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wrench, Calendar, User, CheckCircle2, AlertCircle, Clock, Plus, Info } from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"

interface MaintenanceHistoryProps {
  product: DemoProduct
}

export function MaintenanceHistory({ product }: MaintenanceHistoryProps) {
  const maintenanceRecords = product.maintenance.history
  const upcomingMaintenance = product.maintenance.upcoming

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-primary/10 text-primary">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Voltooid
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Gepland
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Achterstallig
          </Badge>
        )
      default:
        return (
          <Badge className="bg-primary/10 text-primary">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Voltooid
          </Badge>
        )
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Hoog</Badge>
      case "medium":
        return <Badge variant="secondary">Normaal</Badge>
      case "low":
        return <Badge variant="outline">Laag</Badge>
      default:
        return <Badge variant="secondary">Normaal</Badge>
    }
  }

  // For products without maintenance (like food)
  if (maintenanceRecords.length === 0 && upcomingMaintenance.length === 0) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="py-12">
          <div className="text-center">
            <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Geen onderhoudshistorie</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Dit product heeft geen onderhoudshistorie of geplande onderhoudstaken. Dit is normaal voor
              consumptiegoederen zoals voedingsproducten.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" />
                    Onderhoudshistorie
                  </CardTitle>
                  <CardDescription>Volledige historie van alle onderhoudswerkzaamheden</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nieuw rapport
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {maintenanceRecords.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nog geen onderhoudshistorie beschikbaar voor dit product.
                </div>
              ) : (
                maintenanceRecords.map((record, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{record.type}</h3>
                          {getStatusBadge("completed")}
                        </div>
                        <p className="text-sm text-muted-foreground">{record.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium text-foreground">
                          {new Date(record.date).toLocaleDateString("nl-BE", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Technicus:</span>
                        <span className="font-medium">{record.technician}</span>
                      </div>
                      {record.nextService && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Volgende service:</span>
                          <span className="font-medium">{record.nextService}</span>
                        </div>
                      )}
                    </div>

                    {record.partsUsed && record.partsUsed.length > 0 && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <span className="text-xs text-muted-foreground">Gebruikte onderdelen: </span>
                        {record.partsUsed.map((part) => (
                          <Badge key={part} variant="outline" className="ml-1 font-mono text-xs">
                            {part}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-5 h-5 text-primary" />
                Gepland onderhoud
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMaintenance.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">Geen gepland onderhoud</div>
              ) : (
                upcomingMaintenance.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{item.type}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    {getPriorityBadge(item.priority)}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Productinformatie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Merk</span>
                  <span className="font-medium">{product.brand.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">{product.product.model}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Garantie tot</span>
                  <span className="font-medium">
                    {new Date(product.product.warrantyUntil).toLocaleDateString("nl-BE")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
