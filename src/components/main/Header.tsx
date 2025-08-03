"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Users, Home, Mail } from "lucide-react";
import ToggleTheme from "@/components/main/ToggleTheme";
import Image from "next/image";
import Logo from "../../../public/image.png";

export default function Header(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = false;

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/portfolio", label: "Portfolio Widyaiswara", icon: Users },
    { href: "/correspondence", label: "Surat Menyurat", icon: Mail },
  ];



  return (
    <nav className="bg-background/90 dark:bg-slate-800 dark:text-slate-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
       
          <div className="flex items-center space-x-3">
           <Image src={Logo} alt="Logo" width={40} height={40} />
            <div>
              <h1 className="text-xl font-bold text-foreground">POKJA PPSDMLH</h1>
              <p className="text-xs text-muted-foreground">Platform Internal</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <>
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </a>
                  </>
              );
            })}
       
          </div>

          <div className="hidden md:flex items-center space-x-4">
          <ToggleTheme></ToggleTheme>
            <Button variant="outline" size="sm">
              Admin Panel
            </Button>
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
                {isAdmin?
                <Button variant="outline" size="sm" className="w-full">
                  Admin Panel
                </Button>
                :
                <ToggleTheme></ToggleTheme>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};