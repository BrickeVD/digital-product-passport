"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { demoProducts, type DemoProduct } from "./demo-products"

interface DemoContextType {
  currentProduct: DemoProduct
  setCurrentProduct: (product: DemoProduct) => void
  products: DemoProduct[]
  isDemo: boolean
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [currentProduct, setCurrentProduct] = useState<DemoProduct>(demoProducts[0])

  // Apply brand colors when product changes
  useEffect(() => {
    const root = document.documentElement
    const { color } = currentProduct.brand

    // Update CSS variables for brand colors
    root.style.setProperty("--primary", color.primary)
    root.style.setProperty("--accent", color.primary)
    root.style.setProperty("--ring", color.primary)
    root.style.setProperty("--brand", color.primary)
    root.style.setProperty("--secondary", color.secondary)
    root.style.setProperty("--brand-muted", color.muted)
    root.style.setProperty("--success", color.primary)
    root.style.setProperty("--chart-1", color.primary)
    root.style.setProperty("--sidebar-primary", color.primary)
    root.style.setProperty("--sidebar-ring", color.primary)
  }, [currentProduct])

  return (
    <DemoContext.Provider
      value={{
        currentProduct,
        setCurrentProduct,
        products: demoProducts,
        isDemo: true,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider")
  }
  return context
}
