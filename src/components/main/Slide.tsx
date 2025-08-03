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

export default function Slide({ id, title, path, image, description, icon, gradient }: SlideProps) {
 return (
  <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
    <Link href={path} key={id}>
      <Image
        src={image}
        alt={title}
        width={800}
        height={500}
        className="h-72 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300 flex flex-col items-center justify-center text-center text-white px-6 py-8 space-y-4">
        
        {/* Icon Wrapper */}
        <div className={`w-14 h-14 flex items-center justify-center rounded-xl shadow-md bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/80 line-clamp-3 max-w-md">
          {description}
        </p>

        {/* Action Button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-white hover:bg-primary group-hover:translate-x-1 transition-all duration-200"
          asChild
        >
          <a href={path} className="flex items-center gap-2">
            <span>Lihat Detail</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </Link>
  </div>
);

}
