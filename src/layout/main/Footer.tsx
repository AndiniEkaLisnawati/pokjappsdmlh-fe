"use client"
import React from 'react'
import Image from 'next/image'
import Logo from "../../../public/image.png"

const Footer = () => {
  return (
    <div>
      <footer className="bg-gradient-to-br from-slate-50 to-sky-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src={Logo} alt='Logo' width={30} height={30}></Image>
            <span className="text-lg font-semibold text-foreground">POKJA PPSDMLH</span>
          </div>
          <p className="text-muted-foreground">
            © 2025 POKJA PPSDMLH. Platform Internal untuk Pengembangan SDM Lingkungan Hidup.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default Footer