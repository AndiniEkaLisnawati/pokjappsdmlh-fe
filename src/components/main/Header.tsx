"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Users, Building, Handshake, BookOpenText, Shield, GraduationCap, CameraIcon } from "lucide-react";
import ToggleTheme from "@/components/main/ToggleTheme";
import Image from "next/image";
import Logo from "../../../public/image.png";
import Link from "next/link";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const navLinks = [
    { href: "/akreditasi-lpk", label: "Akreditasi LPK", icon: Building },
    { href: "/partner-kerjasama", label: "Kerjasama", icon: Handshake },
    { href: "/kurikulum", label: "Syllabus", icon: BookOpenText },
    { href: "/portfolio", label: "Pengajar", icon: Users },
    { href: "/pelatihan", label: "Pelatihan", icon: GraduationCap },
    { href: "/dokumentasi-kegiatan", label: "Dokumentasi", icon: CameraIcon },
  ];




  return (
    <nav className="bg-background/90 dark:bg-slate-800 dark:text-slate-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">


          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <Image src={Logo} alt="Logo" width={42} height={42} className="rounded-lg shadow-sm" />
            <div> <h1 className="text-xl font-bold text-indigo-900 dark:text-indigo-200">POKJA PPSDMLH</h1> <p className="text-xs text-muted-foreground">Platform Internal</p> </div>
          </Link>



          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              return (

                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </a>

              );
            })}

          </div>
<Link href="/login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 shadow-md hover:cursor-pointer">
                    <Shield className="w-4 h-4" />
                    <span className="text-teal-400">Admin</span>
                  </Button>
                </Link>
          <div className="hidden md:flex items-center space-x-4">
            <ToggleTheme></ToggleTheme>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{link.label}</span>
                  </a>
                );
              })}


              <div className="pt-2 border-t border-border mt-2">
                  
                <ToggleTheme></ToggleTheme>
              
                <div className="hidden md:flex items-center space-x-4">

                 
                    <ToggleTheme />

          
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};