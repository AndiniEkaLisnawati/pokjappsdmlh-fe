"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Download, Eye, Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/Logos4.png"

const Syllabus = () => {
  const syllabuses = [
    {
      id: 1,
      title: "Pengantar Teknologi Hijau",
      course: "Teknologi Ramah Lingkungan",
      instructor: "Dr. Ahmad Wijaya",
      credits: 3,
      duration: "16 Minggu",
      students: 25,
      lastUpdated: "2024-01-15",
      version: "v2.1",
      status: "Aktif",
      semester: "Ganjil 2024",
      description: "Mata kuliah pengantar tentang konsep dan aplikasi teknologi hijau",
      fileSize: "1.8 MB"
    },
    {
      id: 2,
      title: "Pengelolaan Limbah Industri",
      course: "Manajemen Limbah B3",
      instructor: "Prof. Siti Nurhasanah",
      credits: 4,
      duration: "18 Minggu",
      students: 30,
      lastUpdated: "2024-02-01",
      version: "v3.0",
      status: "Aktif",
      semester: "Genap 2024",
      description: "Pembelajaran mendalam tentang pengelolaan limbah berbahaya dan beracun",
      fileSize: "2.5 MB"
    },
    {
      id: 3,
      title: "Sistem Audit Lingkungan",
      course: "Audit Lingkungan",
      instructor: "Dr. Bambang Supriyanto",
      credits: 3,
      duration: "16 Minggu",
      students: 20,
      lastUpdated: "2023-12-20",
      version: "v2.3",
      status: "Aktif",
      semester: "Ganjil 2024",
      description: "Metodologi dan praktik audit sistem manajemen lingkungan",
      fileSize: "2.2 MB"
    },
    {
      id: 4,
      title: "Analisis Dampak Lingkungan",
      course: "AMDAL dan UKL-UPL",
      instructor: "Dr. Ratna Dewi",
      credits: 4,
      duration: "18 Minggu",
      students: 35,
      lastUpdated: "2024-01-30",
      version: "v1.8",
      status: "Aktif",
      semester: "Genap 2024",
      description: "Prosedur dan metode analisis mengenai dampak lingkungan",
      fileSize: "3.0 MB"
    },
    {
      id: 5,
      title: "Teknologi Energi Terbarukan",
      course: "Energi Terbarukan",
      instructor: "Dr. Eko Prasetyo",
      credits: 3,
      duration: "16 Minggu",
      students: 28,
      lastUpdated: "2024-02-10",
      version: "v1.5",
      status: "Aktif",
      semester: "Ganjil 2024",
      description: "Teknologi dan implementasi sumber energi terbarukan",
      fileSize: "2.1 MB"
    }
  ];

  const weeklyPlans = [
    {
      week: 1,
      topic: "Pengantar Teknologi Hijau",
      learning_objectives: "Memahami konsep dasar teknologi ramah lingkungan",
      materials: "Slide presentasi, artikel jurnal",
      activities: "Diskusi kelompok, studi kasus",
      evaluation: "Quiz, partisipasi diskusi"
    },
    {
      week: 2,
      topic: "Prinsip-Prinsip Keberlanjutan",
      learning_objectives: "Menganalisis prinsip pembangunan berkelanjutan",
      materials: "Modul, video pembelajaran",
      activities: "Presentasi kelompok, analisis kasus",
      evaluation: "Tugas kelompok, presentasi"
    },
    {
      week: 3,
      topic: "Teknologi Bersih dalam Industri",
      learning_objectives: "Mengevaluasi implementasi teknologi bersih",
      materials: "Studi kasus industri, jurnal penelitian",
      activities: "Kunjungan industri, laporan observasi",
      evaluation: "Laporan kunjungan, refleksi"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'default';
      case 'Draft': return 'secondary';
      case 'Revisi': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-slate-50 to-teal-100 dark:from-slate-800 dark:to-teal-900 dark:via-slate-800 dark:text-slate-50">
      <section className="w-screen px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg">


            <div className="text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4">
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
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detail Silabus</TabsTrigger>
            <TabsTrigger value="schedule">Jadwal Mingguan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24</div>
                  <div className="text-sm text-muted-foreground">Total Silabus</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Mata Kuliah</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">12</div>
                  <div className="text-sm text-muted-foreground">Instruktur</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">450</div>
                  <div className="text-sm text-muted-foreground">Total Peserta</div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Cari silabus atau mata kuliah..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Syllabus Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {syllabuses.map((syllabus) => (
                <Card key={syllabus.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={getStatusColor(syllabus.status)}>
                        {syllabus.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{syllabus.version}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{syllabus.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{syllabus.course}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{syllabus.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {syllabus.duration} • {syllabus.credits} SKS
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {syllabus.semester}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {syllabus.students} peserta
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {syllabus.description}
                    </p>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Lihat
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Unduh
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>Detail Silabus</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mata Kuliah</TableHead>
                      <TableHead>Instruktur</TableHead>
                      <TableHead>SKS</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Peserta</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Terakhir Update</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {syllabuses.map((syllabus) => (
                      <TableRow key={syllabus.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{syllabus.title}</div>
                            <div className="text-sm text-muted-foreground">{syllabus.course}</div>
                          </div>
                        </TableCell>
                        <TableCell>{syllabus.instructor}</TableCell>
                        <TableCell>{syllabus.credits}</TableCell>
                        <TableCell>{syllabus.duration}</TableCell>
                        <TableCell>{syllabus.students}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(syllabus.status)}>
                            {syllabus.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(syllabus.lastUpdated).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Jadwal Pembelajaran Mingguan</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Contoh jadwal untuk mata kuliah Pengantar Teknologi Hijau
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Minggu</TableHead>
                      <TableHead>Topik</TableHead>
                      <TableHead>Tujuan Pembelajaran</TableHead>
                      <TableHead>Materi</TableHead>
                      <TableHead>Aktivitas</TableHead>
                      <TableHead>Evaluasi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {weeklyPlans.map((plan) => (
                      <TableRow key={plan.week}>
                        <TableCell className="font-medium">{plan.week}</TableCell>
                        <TableCell className="font-medium">{plan.topic}</TableCell>
                        <TableCell>{plan.learning_objectives}</TableCell>
                        <TableCell>{plan.materials}</TableCell>
                        <TableCell>{plan.activities}</TableCell>
                        <TableCell>{plan.evaluation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-center">
                  <Button variant="outline">Lihat Jadwal Lengkap</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Syllabus;