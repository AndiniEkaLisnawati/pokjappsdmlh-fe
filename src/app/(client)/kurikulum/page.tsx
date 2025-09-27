"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Search, Eye, Calendar, FileText, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Logo from "../../../../public/Logos4.png";
import Link from "next/link";
import { format } from "date-fns" 
import {motion} from 'framer-motion'
import LoadingScreen from "@/components/main/LoadingScreen";

export interface CurriculumProps {
  id: string
  title: string
  field: string
  level: string
  duration: string
  lastUpdated: string
  version: string
  status: string
  description: string
  modules: number
  fileLink?: string | null
}

const Curriculum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const[loading, setLoading] = useState(true);


  const [curriculums, setCurriculums] = useState<CurriculumProps[]>([]);
  const API_KURIKULUM = "https://pokjappsdmlh-be.vercel.app/api/curriculum/";

  useEffect(() => {
    axios.get<CurriculumProps[]>(API_KURIKULUM)
      .then((res) => setCurriculums(res.data))
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);



  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFieldColor = (field: string) => {
    switch (field.toLowerCase()) {
      case "teknologi": return "bg-blue-100 text-blue-800";
      case "lingkungan": return "bg-green-100 text-green-800";
      case "audit": return "bg-purple-100 text-purple-800";
      case "pendidikan": return "bg-purple-100 text-purple-800";
      case "regulasi": return "bg-orange-100 text-orange-800";
      case "energi": return "bg-yellow-100 text-yellow-800";
      case "pertanian": return "bg-yellow-100 text-yellow-800";
      case "konservasi": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

 return (
  <div className="min-h-screen dark:bg-slate-900 bg-gray-100 dark:text-slate-50">
    <section className="w-screen px-4 sm:px-6 lg:px-8 py-5">
      <div className="max-w-7xl mx-auto">
      
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 
          bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 
          transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                Silabus
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent animate-gradient">
                Syllabus
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-6">
              Silabus detail dengan rencana pembelajaran, materi, dan metode
              evaluasi untuk setiap mata pelajaran dalam program pelatihan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image
              src={Logo}
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
      <LoadingScreen mode="inline" message="Loading Syllabus.." />
    ) : (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-5 py-10">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                value: curriculums.length,
                label: "Total Kurikulum",
              },
              {
                value: curriculums.filter((p) => p.status === "Active").length,
                label: "Kurikulum Aktif",
              },
              {
                value: curriculums.reduce((sum, k) => sum + k.modules, 0),
                label: "Total Modul",
              },
              {
                value:
                  curriculums.length > 0
                    ? format(
                        new Date(
                          Math.max(
                            ...curriculums.map((c) =>
                              new Date(c.lastUpdated).getTime()
                            )
                          )
                        ),
                        "dd MMM yyyy"
                      )
                    : "-",
                label: "Update Terakhir",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="hover:shadow-lg transition duration-300 border border-slate-200 dark:border-slate-700 
                bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">
                      {item.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {item.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FILTER BAR */}
          <Card className="mb-8 hover:shadow-xl transition duration-500 border border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Cari kurikulum..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Bidang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Bidang</SelectItem>
                  <SelectItem value="teknologi">Teknologi</SelectItem>
                  <SelectItem value="lingkungan">Lingkungan</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="regulasi">Regulasi</SelectItem>
                  <SelectItem value="energi">Energi</SelectItem>
                  <SelectItem value="konservasi">Konservasi</SelectItem>
                  <SelectItem value="pendidikan">Pendidikan</SelectItem>
                  <SelectItem value="pertanian">Pertanian</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="beginner">Dasar</SelectItem>
                  <SelectItem value="intermediate">Menengah</SelectItem>
                  <SelectItem value="advanced">Lanjutan</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => {
                  setSelectedField("all");
                  setSelectedLevel("all");
                  setSearchTerm("");
                }}
                className="bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-900 border-teal-300 hover:border-teal-400"
              >
                <Filter className="w-4 h-4 mr-2" /> Clear
              </Button>
            </CardContent>
          </Card>

          {/* TABLE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Card className="hover:shadow-xl transition duration-500 border border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                  <BookOpen className="w-5 h-5" /> Daftar Kurikulum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-100 dark:bg-slate-800">
                      <TableHead>Kurikulum</TableHead>
                      <TableHead>Bidang</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Terakhir Diperbarui</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {curriculums
                      .filter((c) => {
                        const matchesSearch =
                          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.description
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase());
                        const matchesField =
                          selectedField === "all" ||
                          c.field.toLowerCase() === selectedField;
                        const matchesLevel =
                          selectedLevel === "all" ||
                          c.level.toLowerCase() === selectedLevel;
                        return matchesSearch && matchesField && matchesLevel;
                      })
                      .map((curriculum, i) => (
                        <motion.tr
                          key={curriculum.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i }}
                          whileHover={{
                            backgroundColor: "rgba(59,130,246,0.06)",
                          }}
                          className="transition-colors"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {curriculum.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {curriculum.modules} modul •{" "}
                                {curriculum.version}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {curriculum.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getFieldColor(
                                curriculum.field
                              )}`}
                            >
                              {curriculum.field}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                                curriculum.level
                              )}`}
                            >
                              {curriculum.level}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">
                            {curriculum.duration}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                curriculum.status === "Active"
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : "bg-amber-100 text-amber-700 border-amber-300"
                              }
                            >
                              {curriculum.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {new Date(
                                curriculum.lastUpdated
                              ).toLocaleDateString("id-ID")}
                            </div>
                          </TableCell>
                          {curriculum.fileLink && (
                            <TableCell>
                              <Link href={curriculum.fileLink} target="_blank">
                                <Button
                                  size="sm"
                                  className="bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-900 border-teal-300 hover:border-teal-400"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                            </TableCell>
                          )}
                        </motion.tr>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    )}
  </div>
);

};

export default Curriculum;