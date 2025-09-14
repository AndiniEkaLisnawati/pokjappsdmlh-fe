"use client"
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface SlideProps {
  id: number;
  title: string;
  image: string;
  path: string;
  description: string;
  icon: ReactNode;
  gradient: string;
}

export default function Slide({ id, title, path, image, description, icon }: SlideProps) {
 return (
<div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
  <Link href={path} key={id}>
    <Image
      src={image}
      alt={title}
      width={800}
      height={500}
      className="h-72 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />

    {/* Overlay dengan gradasi hijau-biru */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 via-teal-500/30 to-blue-600/30 group-hover:from-green-500/40 group-hover:to-blue-500/40 transition-colors duration-500 flex flex-col items-center justify-center text-center text-white px-6 py-8 space-y-5 backdrop-blur-xs hover:backdrop-blur-none">

      {/* Icon container */}
      <div className="w-16 h-16 flex items-center justify-center rounded-xl shadow-lg bg-gradient-to-tr from-green-400 to-blue-500 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold tracking-wide group-hover:text-white drop-shadow-md transition-all duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/90 line-clamp-3 max-w-md leading-relaxed">
        {description}
      </p>

      {/* Button */}
      <Button
        variant="ghost"
        size="sm"
        className="text-white bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        asChild
      >
        <Link href={path} className="flex items-center gap-2 font-medium">
          <span>Lihat Detail</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  </Link>
</div>

);

}
