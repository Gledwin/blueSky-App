"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header/header";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "./providers";
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { http, WagmiProvider } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";



import { QueryClient, QueryClientProvider } from "@tanstack/react-query";




const inter = Inter({ subsets: ["latin"] });





const config = getDefaultConfig({
  appName: "Stekcit BwC",
  projectId: process.env.WALLETCONNECT_PROJECT_ID!,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className = "min-h-screen flex flex-col"> 
         
        <ThemeProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider
                theme={lightTheme({
                  accentColor: "black",
                  accentColorForeground: "white",
                  borderRadius: "large",
                  fontStack: "rounded",
                  overlayBlur: "small",
                })}
              >
                <Header/>
              {children}
                <Footer/>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
         
        </div>
        </body>
    </html>
  );
}
