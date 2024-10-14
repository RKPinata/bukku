import Head from "next/head"
import React from "react"
import { Toaster } from "@components/ui/sonner"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cost Tracker</title>
        {/* meta tags */}
      </Head>
      <div className="relative flex flex-col min-h-screen antialiased font-sans items-center">
        <main
          className="relative flex flex-col flex-grow text-foreground px-36 py-16 max-w-screen-xl
        "
        >
          {children}
        </main>
        <Toaster richColors theme="light" />
      </div>
    </>
  )
}

export { Layout }
