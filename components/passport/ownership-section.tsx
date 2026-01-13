"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Building2,
  Calendar,
  FileCheck,
  History,
  ShieldCheck,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react"
import type { DemoProduct } from "@/lib/demo-products"

interface OwnershipSectionProps {
  product: DemoProduct
}

export function OwnershipSection({ product }: OwnershipSectionProps) {
  const [showClaimForm, setShowClaimForm] = useState(false)
  const [claimStatus, setClaimStatus] = useState<"idle" | "pending" | "success">("idle")

  const currentOwner = product.ownership.current
  const ownershipHistory = product.ownership.history

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "purchase":
      case "Aankoop":
        return <Badge className="bg-primary/10 text-primary">Aankoop</Badge>
      case "transfer":
      case "Overdracht":
        return <Badge className="bg-secondary text-secondary-foreground">Overdracht</Badge>
      case "lease":
      case "Lease":
        return <Badge className="bg-warning/20 text-warning-foreground">Lease</Badge>
      case "Fabrikant":
        return <Badge variant="outline">Fabrikant</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setClaimStatus("pending")
    setTimeout(() => {
      setClaimStatus("success")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Current Ownership Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Huidige Eigenaar
          </CardTitle>
          <CardDescription>Geverifieerde eigendomsregistratie voor dit product</CardDescription>
        </CardHeader>
        <CardContent>
          {currentOwner ? (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{currentOwner.company}</h3>
                    <p className="text-sm text-muted-foreground">{currentOwner.contact}</p>
                  </div>
                  {currentOwner.verified && (
                    <Badge className="bg-primary/10 text-primary">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Geverifieerd
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Sinds {new Date(currentOwner.since).toLocaleDateString("nl-BE")}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Download Certificaat
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Geen eigenaar geregistreerd</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Claim Ownership Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Eigendom Claimen
          </CardTitle>
          <CardDescription>
            Bent u de nieuwe eigenaar van dit product? Registreer uw eigendom voor garantie en onderhoud.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {claimStatus === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Claim Ingediend</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Uw eigendomsclaim is ontvangen en wordt geverifieerd. U ontvangt binnen 24-48 uur een bevestiging per
                e-mail.
              </p>
            </div>
          ) : showClaimForm ? (
            <form onSubmit={handleClaimSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Bedrijfsnaam *</Label>
                  <Input id="company" placeholder="Uw bedrijfsnaam" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kvk">KvK-nummer *</Label>
                  <Input id="kvk" placeholder="12345678" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contactpersoon *</Label>
                  <Input id="contact" placeholder="Uw naam" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mailadres *</Label>
                  <Input id="email" type="email" placeholder="email@bedrijf.nl" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefoonnummer</Label>
                  <Input id="phone" type="tel" placeholder="+32 6 12345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Installatielocatie *</Label>
                  <Input id="location" placeholder="Stad, Land" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proof">Bewijs van eigendom</Label>
                <Textarea
                  id="proof"
                  placeholder="Beschrijf hoe u eigenaar bent geworden (aankoop, overname, etc.) en voeg relevante documentnummers toe..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acquisition">Type eigendom *</Label>
                <select
                  id="acquisition"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                >
                  <option value="">Selecteer type...</option>
                  <option value="purchase">Aankoop (nieuw)</option>
                  <option value="transfer">Overdracht (tweedehands)</option>
                  <option value="lease">Lease / Huur</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={claimStatus === "pending"}>
                  {claimStatus === "pending" ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Verwerken...
                    </>
                  ) : (
                    <>
                      Claim Indienen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowClaimForm(false)}>
                  Annuleren
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground">
                    Registreer uw eigendom om toegang te krijgen tot garantie, onderhoudsdocumentatie en technische
                    ondersteuning.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verificatie duurt normaal 24-48 uur na indiening.
                  </p>
                </div>
              </div>
              <Button onClick={() => setShowClaimForm(true)} className="flex-shrink-0">
                <UserPlus className="w-4 h-4 mr-2" />
                Start Claim
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ownership History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Eigendomshistorie
          </CardTitle>
          <CardDescription>Volledige traceerbare eigendomsketen van dit product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-6">
              {/* Current owner first */}
              {currentOwner && (
                <div className="relative flex gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary text-primary-foreground">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{currentOwner.company}</h4>
                        {currentOwner.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <Badge className="bg-primary/10 text-primary">Huidig</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{currentOwner.contact}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(currentOwner.since).toLocaleDateString("nl-BE")} — heden
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* History */}
              {ownershipHistory.map((record, index) => (
                <div key={index} className="relative flex gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-muted text-muted-foreground">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className={`flex-1 ${index === ownershipHistory.length - 1 ? "pb-0" : "pb-6"}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{record.company}</h4>
                      {getTypeBadge(record.type)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(record.from).toLocaleDateString("nl-BE")} —{" "}
                        {new Date(record.to).toLocaleDateString("nl-BE")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
