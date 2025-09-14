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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "Active": return "default";
      case "revisi": return "secondary";
      case "Draft": return "outline";
      default: return "secondary";
    }
  };

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 dark:text-slate-50">

      <section className="w-screen px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <motion.div
           initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg">


            <motion.div 
               initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4 animate-bounce-gentle">
                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  silabus
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
                  Syllabus
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Silabus detail dengan rencana pembelajaran, materi, dan metode evaluasi
                untuk setiap mata pelajaran dalam program pelatihan.
              </p>



            </motion.div>

          <motion.div
          initial={{opacity: 0, scale:0.9}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.3, delay: 0.3}}>

            <Image
              src={Logo}
              alt="Ilustrasi Program Pelatihan"
              width={420}
              height={420}
              className="w-auto h-[250px] md:h-[360px] object-cover drop-shadow-2xl rounded-xl mb-6 md:mb-0 md:self-end"
              priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {loading? <LoadingScreen mode="inline" message="loading Syllabus.."/> : <>
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">


        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{curriculums.length}</div>
              <div className="text-sm text-muted-foreground">Total Kurikulum</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{curriculums.filter(p => p.status === "Active").length}</div>
              <div className="text-sm text-muted-foreground">Kurikulum Aktif</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{curriculums.reduce((sum, k) => sum + k.modules, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Modul</div>
            </CardContent>
          </Card>
          <Card>


            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {curriculums.length > 0
                    ? format(
                      new Date(
                        Math.max(...curriculums.map(c => new Date(c.lastUpdated).getTime()))
                      ),
                      "dd MMM yyyy"
                    )
                    : "-"}
                </div>
                <div className="text-sm text-muted-foreground">Update Terakhir</div>
              </CardContent>
            </Card>

          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Cari kurikulum..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
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
                  <SelectItem value="pendidikan">Energi</SelectItem>
                  <SelectItem value="pertanian">Konservasi</SelectItem>
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
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Daftar Kurikulum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
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
                  .filter(curriculum => {
                    const matchesSearch = curriculum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      curriculum.description.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesField = selectedField === "all" || curriculum.field.toLowerCase() === selectedField;
                    const matchesLevel = selectedLevel === "all" || curriculum.level.toLowerCase() === selectedLevel;
                    return matchesSearch && matchesField && matchesLevel;
                  })
                  .map((curriculum) => (
                    <TableRow key={curriculum.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{curriculum.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {curriculum.modules} modul • {curriculum.version}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {curriculum.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFieldColor(curriculum.field)}`}>
                          {curriculum.field}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(curriculum.level)}`}>
                          {curriculum.level}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{curriculum.duration}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(curriculum.status)}>
                          {curriculum.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(curriculum.lastUpdated).toLocaleDateString("id-ID")}
                        </div>
                      </TableCell>
                      {curriculum.fileLink && (
                        <TableCell>
                          <Link href={curriculum.fileLink} target="_blank">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>

                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      </>}
    </div>

  );
};

export default Curriculum;