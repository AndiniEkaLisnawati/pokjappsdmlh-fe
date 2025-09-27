"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  Award,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { motion } from 'framer-motion'
import NoData from "../NoData";

interface Lecturers {
  id: number;
  name: string;
  photo: string;
  expertise: string[];
  position: string;
  education: string;
  experience: string;
  certifications: string[];
  email: string;
  phone: string;
  trainings_conducted: number;
  participants_trained: number;
  status: string;
  type: string;
}

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedExpertise, setSelectedExpertise] = useState("all");

  const [lecturers, setLecturers] = useState<Lecturers[] | []>([]);

  useEffect(() => {
    axios
      .get("https://pokjappsdmlh-be.vercel.app/api/lecturer")
      .then((res) => setLecturers(res.data))
      .catch((err) => err.message);
  });

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Widyaiswara Utama":
        return "bg-purple-100 text-purple-800";
      case "Widyaiswara Madya":
        return "bg-blue-100 text-blue-800";
      case "Widyaiswara Muda":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "default";
      case "Cuti":
        return "secondary";
      case "Non-Aktif":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 dark:text-slate-50">
        <section className="py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center space-x-3 mb-6"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
              Widyaiswara
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Lecturer
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-slate-50 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Profil lengkap para widyaiswara dan instruktur ahli dalam bidang
            lingkungan hidup dengan keahlian, sertifikasi, dan pengalaman yang
            beragam.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
       <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-8 animate-fade-in">
  {[
    {
      label: "Internal",
      value: lecturers.filter((l) => l.type === "internal").length,
      color: "text-blue-600",
    },
    {
      label: "Eksternal",
      value: lecturers.filter((l) => l.type === "eksternal").length,
      color: "text-blue-600",
    },
    {
      label: "Total",
      value: lecturers.length,
      color: "text-blue-600",
    },
    {
      label: "S1",
      value: lecturers.filter((l) => l.education.includes("S1")).length,
      color: "text-indigo-600",
    },
    {
      label: "S2",
      value: lecturers.filter((l) => l.education.includes("S2")).length,
      color: "text-purple-600",
    },
    {
      label: "Bidang Keahlian",
      value: new Set(
        lecturers.flatMap((l) => l.expertise)
      ).size,
      color: "text-emerald-600",
    },
  ].map((stat, i) => (
    <Card
      key={i}
      className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm"
    >
      <CardContent className="p-6 text-center">
        <div className={`text-3xl font-bold ${stat.color} mb-2`}>
          {stat.value}
        </div>
        <div className="text-sm text-gray-600">{stat.label}</div>
      </CardContent>
    </Card>
  ))}
</div>


        {/* Filters */}
        <Card className="mb-8 border-0 bg-white/70 backdrop-blur-sm shadow-lg animate-slide-up">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Cari widyaiswara berdasarkan nama atau keahlian..."
                    className="pl-10 border-gray-200 focus:border-blue-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={selectedEducation}
                onValueChange={setSelectedEducation}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tingkat Pendidikan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tingkat</SelectItem>
                  <SelectItem value="s1">S1</SelectItem>
                  <SelectItem value="s2">S2</SelectItem>
                  <SelectItem value="s3">S3</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">Eksternal</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedExpertise}
                onValueChange={setSelectedExpertise}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Bidang Keahlian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Bidang</SelectItem>
                  <SelectItem value="teknologi">Teknologi Hijau</SelectItem>
                  <SelectItem value="limbah">Manajemen Limbah</SelectItem>
                  <SelectItem value="hukum">Hukum Lingkungan</SelectItem>
                  <SelectItem value="ekologi">Ekologi</SelectItem>
                  <SelectItem value="air">Pengolahan Air</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

   {
            lecturers.length === 0 ? (<><NoData subject="Widyaiswara" /></>) : (<>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
       
         
          {lecturers
            .filter((lecturer: Lecturers) => {
              const matchesSearch =
                lecturer.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                lecturer.expertise.some((exp) =>
                  exp.toLowerCase().includes(searchTerm.toLowerCase())
                );
              const matchesEducation =
                selectedEducation === "all" ||
                lecturer.education.toLowerCase().includes(selectedEducation);
              const matchesType =
                selectedType === "all" ||
                lecturer.type?.toLowerCase() === selectedType;
              const matchesExpertise =
                selectedExpertise === "all" ||
                lecturer.expertise.some((exp) =>
                  exp.toLowerCase().includes(selectedExpertise)
                );
              return (
                matchesSearch &&
                matchesEducation &&
                matchesType &&
                matchesExpertise
              );
            })
            .map((lecturer: Lecturers) => (
            
              <Card
                key={lecturer.id}
                className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                      <Image
                        width={30}
                        height={30}
                        src={lecturer.photo}
                        alt={lecturer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-2">
                          {lecturer.name}
                        </h3>
                        <Badge
                          variant={getStatusColor(lecturer.status)}
                          className="text-xs"
                        >
                          {lecturer.status}
                        </Badge>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(
                          lecturer.position
                        )}`}
                      >
                        {lecturer.position}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Expertise */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Bidang Keahlian
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {lecturer.expertise.slice(0, 2).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {lecturer.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{lecturer.expertise.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Education & Experience */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">
                        {lecturer.education}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {lecturer.experience} Pengalaman
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {lecturer.trainings_conducted}
                      </div>
                      <div className="text-xs text-gray-500">Pelatihan</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {lecturer.participants_trained}
                      </div>
                      <div className="text-xs text-gray-500">Peserta</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a href={`mailto:${lecturer.email}`} className="flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                    </a>
                    <a href={`tel:${lecturer.phone}`} className="flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Telepon
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}


        </div>
           </>) }
      </div>
    </div>
  );
};

export default Portfolio;
