"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { CartCountProvider } from './CartCountContext'

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartCountProvider>
        {children}
      </CartCountProvider>
    </SessionProvider>
  )
}
