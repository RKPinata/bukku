import Head from "next/head"
import React from "react"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cost Tracker</title>
        {/* meta tags */}
      </Head>
      <div className="relative flex flex-col min-h-screen antialiased font-sans ">
        <main className="relative flex flex-col flex-grow text-foreground max-w-screen-xl px-36 py-16
        ">
          {children}
        </main>
      </div>
    </>
  )
}

export { Layout }
