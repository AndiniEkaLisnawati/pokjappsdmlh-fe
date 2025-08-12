"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Search, Eye, Calendar, FileText, Filter } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../../../public/Logos4.png"

const Curriculum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const curriculums = [
    {
      id: 1,
      title: "Kurikulum Teknologi Ramah Lingkungan",
      field: "Teknologi",
      level: "Menengah",
      duration: "40 Jam",
      lastUpdated: "2024-01-15",
      version: "v2.1",
      status: "Aktif",
      description: "Kurikulum komprehensif tentang teknologi ramah lingkungan untuk industri",
      modules: 8,
      fileSize: "2.5 MB"
    },
    {
      id: 2,
      title: "Kurikulum Manajemen Limbah B3",
      field: "Lingkungan",
      level: "Lanjutan",
      duration: "60 Jam",
      lastUpdated: "2024-02-01",
      version: "v3.0",
      status: "Aktif",
      description: "Panduan lengkap pengelolaan limbah bahan berbahaya dan beracun",
      modules: 12,
      fileSize: "3.8 MB"
    },
    {
      id: 3,
      title: "Kurikulum Audit Lingkungan",
      field: "Audit",
      level: "Lanjutan",
      duration: "80 Jam",
      lastUpdated: "2023-12-20",
      version: "v2.3",
      status: "Aktif",
      description: "Kurikulum untuk pelatihan auditor lingkungan bersertifikat",
      modules: 15,
      fileSize: "4.2 MB"
    },
    {
      id: 4,
      title: "Kurikulum AMDAL dan UKL-UPL",
      field: "Regulasi",
      level: "Menengah",
      duration: "50 Jam",
      lastUpdated: "2024-01-30",
      version: "v1.8",
      status: "Aktif",
      description: "Kurikulum tentang analisis mengenai dampak lingkungan",
      modules: 10,
      fileSize: "3.1 MB"
    },
    {
      id: 5,
      title: "Kurikulum Energi Terbarukan",
      field: "Energi",
      level: "Dasar",
      duration: "30 Jam",
      lastUpdated: "2024-02-10",
      version: "v1.5",
      status: "Aktif",
      description: "Pengenalan teknologi dan implementasi energi terbarukan",
      modules: 6,
      fileSize: "2.0 MB"
    },
    {
      id: 6,
      title: "Kurikulum Konservasi Air",
      field: "Konservasi",
      level: "Dasar",
      duration: "25 Jam",
      lastUpdated: "2023-11-15",
      version: "v1.2",
      status: "Revisi",
      description: "Teknik dan strategi konservasi sumber daya air",
      modules: 5,
      fileSize: "1.8 MB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'default';
      case 'Revisi': return 'secondary';
      case 'Draft': return 'outline';
      default: return 'secondary';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Dasar': return 'bg-green-100 text-green-800';
      case 'Menengah': return 'bg-yellow-100 text-yellow-800';
      case 'Lanjutan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFieldColor = (field: string) => {
    switch (field) {
      case 'Teknologi': return 'bg-blue-100 text-blue-800';
      case 'Lingkungan': return 'bg-green-100 text-green-800';
      case 'Audit': return 'bg-purple-100 text-purple-800';
      case 'Regulasi': return 'bg-orange-100 text-orange-800';
      case 'Energi': return 'bg-yellow-100 text-yellow-800';
      case 'Konservasi': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 dark:text-slate-50">

       <section className="w-screen px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg">


            <div className="text-center md:text-left max-w-2xl">
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


              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

                <Button size="lg" className="shadow-xl">
                  <FileText className="w-5 h-5 mr-2" />
                  Upload Silabus Baru
                </Button>
              </div>
            </div>

            {/* Image */}
            <Image
              src={Logo}
              alt="Ilustrasi Program Pelatihan"
              width={420}
              height={420}
              className="w-auto h-[250px] md:h-[360px] object-cover drop-shadow-2xl rounded-xl mb-6 md:mb-0 md:self-end"
              priority
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">18</div>
              <div className="text-sm text-muted-foreground">Total Kurikulum</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-sm text-muted-foreground">Bidang Spesialisasi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">85</div>
              <div className="text-sm text-muted-foreground">Total Modul</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,250</div>
              <div className="text-sm text-muted-foreground">Jam Pelatihan</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
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
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="dasar">Dasar</SelectItem>
                  <SelectItem value="menengah">Menengah</SelectItem>
                  <SelectItem value="lanjutan">Lanjutan</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Curriculum Table */}
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
                          {curriculum.modules} modul • {curriculum.version} • {curriculum.fileSize}
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
                        {new Date(curriculum.lastUpdated).toLocaleDateString('id-ID')}
                      </div>
                    </TableCell>
                    <TableCell>
               
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
             
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary by Field */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ringkasan per Bidang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { field: "Teknologi", count: 3, hours: 170 },
                { field: "Lingkungan", count: 4, hours: 220 },
                { field: "Audit", count: 2, hours: 130 },
                { field: "Regulasi", count: 3, hours: 180 },
                { field: "Energi", count: 2, hours: 80 },
                { field: "Konservasi", count: 4, hours: 160 }
              ].map((item, index) => (
                <div key={index} className="border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{item.count}</div>
                  <div className="text-sm font-medium mb-1">{item.field}</div>
                  <div className="text-xs text-muted-foreground">{item.hours} jam</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Curriculum;