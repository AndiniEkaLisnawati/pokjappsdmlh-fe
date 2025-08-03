// src/components/MegaCard.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MegaCardProps {
  id?: number; // optional, could be used for slide number or badge
  title: string;
  description: string;
  image?: string; // optional background image
  icon?: React.ReactNode; // optional icon from lucide-react (or any icon library)
  href: string;
  gradient: string; // tailwind gradient classes (e.g., "from-blue-600 to-blue-700")
}

const MegaCard: React.FC<MegaCardProps> = ({
  id,
  title,
  description,
  image,
  icon,
  href,
  gradient,
}) => {
  return (
    <Link href={href}>
      <div className="group relative rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105">
        {/* Background Image Section */}
        {image && (
          <Image
            src={image}
            alt={title}
            width={800}
            height={500}
            className="h-72 w-full object-cover"
          />
        )}

        {/* Overlay Section */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t",
            gradient
          )}
        >
          {id && (
            <span className="absolute top-4 left-4 text-3xl font-bold text-white opacity-70">
              {id}
            </span>
          )}
          <div className="flex items-center space-x-2">
            {icon && <div className="text-white">{icon}</div>}
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <p className="mt-2 text-sm text-white">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default MegaCard;
