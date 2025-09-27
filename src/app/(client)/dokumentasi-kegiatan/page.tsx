"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/main/LoadingScreen";
import DocumentationImg from "../../../../public/dokumentasi.png";
import fallbackJpg from "../../../../public/fallback.png";
import { motion, AnimatePresence } from "framer-motion";
import NoData from "../NoData";

interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  participants: number;
  photos: number;
  description: string;
  image?: string;
  photosUrl?: string;
}

const Documentation = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(
          "https://pokjappsdmlh-be.vercel.app/api/activity"
        );
        const data: Activity[] = await res.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Workshop":
        return "bg-blue-100 text-blue-800";
      case "Seminar":
        return "bg-green-100 text-green-800";
      case "Pelatihan":
        return "bg-purple-100 text-purple-800";
      case "Kunjungan":
        return "bg-orange-100 text-orange-800";
      case "Forum":
        return "bg-teal-100 text-teal-800";
      case "Expo":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen dark:bg-slate-800 dark:text-slate-50 bg-gradient-to-br from-background to-muted/30">
      <section className="w-screen px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center md:text-left max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Camera className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Dokumentasi kegiatan
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent animate-gradient">
                  Activity Documentation
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-6">
                Dokumentasi lengkap kegiatan, foto, video, dan laporan untuk
                transparansi dan evaluasi program yang berkelanjutan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src={DocumentationImg}
                alt="Ilustrasi Program Pelatihan"
                width={420}
                height={420}
                className="w-auto h-[250px] md:h-[360px] object-cover drop-shadow-2xl rounded-xl mb-6 md:mb-0 md:self-end hover:scale-105 transition-transform duration-500"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <LoadingScreen
          showSpinner={true}
          message="Loading Documentation.."
          mode="inline"
        />
      ) : (
        <>
          <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <AnimatePresence>
                {[
                  {
                    label: "Total Activities",
                    value: activities.length,
                  },
                  {
                    label: "Total Photos",
                    value: activities.reduce(
                      (sum, activity) => sum + activity.photos,
                      0
                    ),
                  },
                  {
                    label: "Locations",
                    value: new Set(
                      activities.map((activity) => activity.location)
                    ).size,
                  },
                  {
                    label: "Total Participants",
                    value: activities.reduce(
                      (sum, activity) => sum + activity.participants,
                      0
                    ),
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {item.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Card className="my-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search
                        values={searchTerm}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                      />
                      <Input
                        placeholder="Cari kegiatan..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Jenis Kegiatan" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="pelatihan">Pelatihan</SelectItem>
                      <SelectItem value="kunjungan">Kunjungan</SelectItem>
                      <SelectItem value="forum">Forum</SelectItem>
                      <SelectItem value="expo">Expo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedMonth}
                    onValueChange={setSelectedMonth}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Bulan</SelectItem>
                      <SelectItem value="01">Januari 2024</SelectItem>
                      <SelectItem value="02">Februari 2024</SelectItem>
                      <SelectItem value="03">Maret 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>
{ activities.length === 0 ? (
              <NoData subject="Dokumentasi Kegiatan" />
      ) : (
        <>
            <div className="mt-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities
                .filter((activity) => {
                  const matchesSearch =
                    activity.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    activity.description
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  const matchesType =
                    selectedType === "all" ||
                    activity.type.toLowerCase() === selectedType;
                  const matchesMonth =
                    selectedMonth === "all" || activity.date.split("-")[1];
                  return matchesSearch && matchesType && matchesMonth;
                })
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={activity.image || fallbackJpg}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                        fill
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            activity.type
                          )}`}
                        >
                          {activity.type}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {activity.photos} foto
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {activity.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(activity.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {activity.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {activity.participants} peserta
                        </div>
                      </div>
                      {activity.photosUrl && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              window.open(activity.photosUrl, "_blank")
                            }
                            size="sm"
                            variant="outline"
                            className="flex-1 hover:cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>

            
              </div>
              </>)}
          </div>
        </>
      )}
    </div>
  );
};

export default Documentation;
