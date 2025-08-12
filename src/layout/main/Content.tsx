import Slide from "@/components/main/Slide";
import {
Handshake,
GraduationCap,
Camera,
BookOpen,
User,
Building,
} from "lucide-react";

export default function Content() {

const items = [
  {
    id: 1,
    title: "LPK Accreditation",
    path: "/akreditasi-lpk",
    image: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <Building className="w-6 h-6" />,
    gradient: "from-blue-600 to-blue-700",
    description: "Kelola kemitraan strategis, proses akreditasi, dan lembaga pelatihan kerja untuk meningkatkan kualitas program pengembangan SDM."
  },
  {
    id: 2,
    title: "Collabs Partnerships",
    path: "/partner-kerjasama",
    image: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <Handshake className="w-6 h-6" />,
    gradient: "from-emerald-600 to-emerald-700",
    description: "Jaringan kemitraan pelatihan dengan berbagai institusi untuk memperluas akses dan kualitas program pelatihan."
  },
  {
    id: 3,
    title: "Training",
    path: "/pelatihan",
    image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: "from-yellow-600 to-yellow-700",
    description: "Program pelatihan komprehensif untuk pengembangan kompetensi SDM lingkungan hidup dengan metode pembelajaran modern."
  },
  {
    id: 4,
    title: "Activity Documentation",
    path: "/dokumentasi-kegiatan",
    image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <Camera className="w-6 h-6" />,
    gradient: "from-purple-600 to-purple-700",
    description: "Dokumentasi lengkap kegiatan, foto, video, dan laporan untuk transparansi dan evaluasi program yang berkelanjutan."
  },
  {
    id: 5,
    title: "Curriculum",
    path: "/kurikulum",
    image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <BookOpen className="w-6 h-6" />,
    gradient: "from-orange-600 to-orange-700",
    description: "Kurikulum terstruktur dan up-to-date untuk semua program pelatihan sesuai standar kompetensi nasional."
  },
  {
    id: 6,
    title: "Widyaiswara",
    path: "/portfolio",
    image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <User className="w-6 h-6" />,
    gradient: "from-teal-600 to-teal-700",
    description: "Silabus detail dengan rencana pembelajaran, materi, dan metode evaluasi untuk setiap mata pelajaran."
  }
];


    return (
        <section className="py-16 px-4 dark:text-slate-50 dark:font-bold hover:text-slate-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 bg-gray-50 dark:bg-gray-900">
            {items.map((item) => (
                <Slide key={item.id} id={item.id} title={item.title} image={item.image} path={item.path} icon={item.icon} gradient={item.gradient} description={item.description} />
            ))}
        </section>
    );
}
