"use client"
import MySwiper from "@/components/main/MySwiper";
import { Building2, MapPin, MailIcon, PhoneCallIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const images = [
    "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center text-center px-4">
      <div className="absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center">
        <MySwiper image={images} />
        <div className="bg-gradient-to-tr from-transparent to-slate-100/90 dark:to-gray-900 drop-shadow-md inset-0 absolute justify-center items-center flex flex-col">
          <div className="max-w-7xl mx-auto text-center flex flex-col justify-center items-center">
            <motion.div
      className="inline-flex items-center space-x-3 mb-6"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
        <Building2 className="w-8 h-8 text-white" />
      </div>
      <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
        Platform Internal
      </span>
    </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                POKJA PPSDMLH
              </span>
            </h1>
            <div className="bg-teal-200/50 rounded-bl-3xl rounded-tr-3xl p-1.5 max-w-3/4">
              <p className="text-xl font-semibold text-teal-900 dark:text-slate-50 mb-8 max-w-3xl mx-auto animate-slide-up">
                Platform terintegrasi untuk pengelolaan dan koordinasi
                Pengembangan Program Sumber Daya Manusia Lingkungan Hidup yang
                efisien dan terstruktur.
              </p>
            </div>
            <div className="flex mt-10 items-center justify-center gap-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 animate-fade-in">
              <MapPin className="w-4 h-4 text-teal-300" />
              <span className="text-sm text-white font-semibold">
                Kawasan Puspiptek Serpong Gd. 210, Jl. Raya Puspitek, Muncul,
                Kec. Serpong, Kota Tangerang Selatan, Banten 15314
              </span>
            </div>
            <div className="mt-5 flex gap-3">
                <div className="flex gap-2">
                    <MailIcon className="text-teal-300" />
                    <p className="text-slate-50 font-semibold">adminbangkom@gmail.com</p>
                </div>
                <div className="flex gap-2">
                    <PhoneCallIcon className="text-teal-300"/>
                    <p className="text-slate-50 font-semibold">+62-21-123456</p>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
