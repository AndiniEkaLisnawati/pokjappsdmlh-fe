"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import Logo from "../../../public/Logos2.png"
import Image from "next/image";
const TrainingPartnerships = () => {
  const trainings = [
    {
      id: 1,
      title: "Pelatihan Teknologi Hijau untuk Industri",
      partner: "Institut Teknologi Bandung",
      duration: "5 Hari",
      startDate: "2024-02-15",
      endDate: "2024-02-19",
      location: "Jakarta",
      participants: 25,
      status: "Berlangsung",
      category: "Teknologi"
    },
    {
      id: 2,
      title: "Workshop Manajemen Limbah B3",
      partner: "Universitas Gadjah Mada",
      duration: "3 Hari",
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      location: "Yogyakarta",
      participants: 30,
      status: "Mendatang",
      category: "Lingkungan"
    },
    {
      id: 3,
      title: "Sertifikasi Auditor Lingkungan",
      partner: "Badan Standardisasi Nasional",
      duration: "7 Hari",
      startDate: "2024-01-20",
      endDate: "2024-01-26",
      location: "Bogor",
      participants: 20,
      status: "Selesai",
      category: "Sertifikasi"
    },
    {
      id: 4,
      title: "Pelatihan AMDAL dan UKL-UPL",
      partner: "Kementerian Lingkungan Hidup",
      duration: "4 Hari",
      startDate: "2024-04-05",
      endDate: "2024-04-08",
      location: "Bandung",
      participants: 35,
      status: "Mendatang",
      category: "Regulasi"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Berlangsung': return 'default';
      case 'Mendatang': return 'secondary';
      case 'Selesai': return 'outline';
      default: return 'secondary';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Teknologi': return 'bg-blue-100 text-blue-800';
      case 'Lingkungan': return 'bg-green-100 text-green-800';
      case 'Sertifikasi': return 'bg-purple-100 text-purple-800';
      case 'Regulasi': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="min-h-screen dark:bg-slate-800 dark:text-slate-50 bg-gradient-to-br from-background to-muted/30">

        <section className="w-screen px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg">


              <div className="text-center md:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                   Kemitraan Pelatihan
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
                    Training Partnerships
                  </span>
                </h1>

                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-6">
                   Jaringan kemitraan pelatihan dengan berbagai institusi untuk memperluas akses
              dan kualitas program pelatihan lingkungan hidup.
                </p>
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


        <div className="max-w-7xl mx-auto px-4 mt-10 sm:px-6 lg:px-8 pb-16">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">Program Aktif</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">8</div>
                <div className="text-sm text-muted-foreground">Mitra Institusi</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">245</div>
                <div className="text-sm text-muted-foreground">Total Peserta</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Tingkat Kepuasan</div>
              </CardContent>
            </Card>
          </div>

          {/* Training Programs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Program Pelatihan Kemitraan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program Pelatihan</TableHead>
                    <TableHead>Mitra</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Jadwal</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Peserta</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainings.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{training.title}</div>
                          <div className="text-sm text-muted-foreground">{training.duration}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{training.partner}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(training.category)}`}>
                          {training.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(training.startDate).toLocaleDateString('id-ID')}</div>
                          <div className="text-muted-foreground">s/d {new Date(training.endDate).toLocaleDateString('id-ID')}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {training.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {training.participants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(training.status)}>
                          {training.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Partner Institutions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Institusi Mitra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Institut Teknologi Bandung",
                  "Universitas Gadjah Mada",
                  "Badan Standardisasi Nasional",
                  "Kementerian Lingkungan Hidup",
                  "Universitas Indonesia",
                  "Institut Pertanian Bogor",
                  "Universitas Diponegoro",
                  "LIPI"
                ].map((partner, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-slate-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="font-bold text-lg text-muted-foreground">
                        {partner.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm">{partner}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TrainingPartnerships;