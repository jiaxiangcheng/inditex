import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navBar";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Podcasts",
    description: "Listen to your favorite podcasts",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="divide-y divide-gray-300/50 ">
                    <StoreProvider>
                        <QueryProvider>
                            <NavBar />
                            {children}
                        </QueryProvider>
                    </StoreProvider>
                </div>
            </body>
        </html>
    );
}
