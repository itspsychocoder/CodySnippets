import "../../css/globals.css"
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Login - CodySnippets',
  description: 'Login to CodySnippets',
}

export default function RootLayout({ children }) {
  return (
    <>
        {children}
    </>
  )
}
