import Link from "next/link";
import Image from "next/image";

interface SlideProps {
  id: number;
  title: string;
  image: string;
  path: string;
}

export default function Slide({ id, title, path, image }: SlideProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group">
      <Link key={id} href={path}>
        <Image
          src={image}
          alt={title}
          className="h-72 w-full object-cover transform group-hover:scale-105 transition duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all flex flex-col justify-center items-center text-white">
          <p className="mt-2 text-3xl text-white">{id}</p>
          <h2 className="text-4xl font-bold drop-shadow-lg">{title}</h2>
        </div>
      </Link>
    </div>
  );
}
