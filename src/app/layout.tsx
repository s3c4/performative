import Link from 'next/link';
import './global.scss';
import { Inter as FontSans } from "next/font/google"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});
export default function RootLayout({
    children,
}: {
    readonly children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="author" content="Andrei Secareanu" />
                <title>Andrei Secareanu - Performative</title>
            </head>
            <body
                className={
                    "font-sans " +
                    fontSans.variable
                }
            >
                <section className='container px-4 sm:px-6 lg:px-8 mx-auto py-4'>
                    <div className='flex flex-row gap-2 items-center mb-4'>
                        <Link className='text-sm border-1 rounded-sm mb-4 p-1 cursor-pointer' href='/'>Dashboard</Link>
                        <Link className='text-sm border-1 rounded-sm mb-4 p-1 cursor-pointer' href='/create'>Create New Transaction</Link>
                    </div>
                </section>
                {children}
            </body>
        </html>
    )
}