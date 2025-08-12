"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Calendar, MapPin, Users } from "lucide-react";
import Logo from "../../../public/Logos2.png";
import Image from 'next/image';

const TrainingPartnerships = () => {
  const partnerships = [
    {
      id: 1,
      partnerName: "Pemerintah Provinsi DKI Jakarta",
      scope: "Pelatihan Pengelolaan Sampah dan Limbah B3",
      pksNumber: "PKS-001/KLHK/2024",
      region: "DKI Jakarta",
      trainingsHeld: 3,
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "Aktif",
      category: "Pemda Provinsi"
    },
    {
      id: 2,
      partnerName: "Kementerian Perindustrian RI",
      scope: "Sertifikasi Green Industry dan Teknologi Bersih",
      pksNumber: "PKS-002/KLHK/2024",
      region: "Nasional",
      trainingsHeld: 5,
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      status: "Aktif",
      category: "Kementerian"
    },
    {
      id: 3,
      partnerName: "Pemerintah Provinsi Jawa Barat",
      scope: "Pelatihan AMDAL dan UKL-UPL",
      pksNumber: "PKS-003/KLHK/2024",
      region: "Jawa Barat",
      trainingsHeld: 2,
      startDate: "2024-03-10",
      endDate: "2024-12-15",
      status: "Aktif",
      category: "Pemda Provinsi"
    },
    {
      id: 4,
      partnerName: "Kementerian ESDM",
      scope: "Pelatihan Monitoring Kualitas Air dan Udara",
      pksNumber: "PKS-004/KLHK/2024",
      region: "Nasional",
      trainingsHeld: 4,
      startDate: "2024-01-20",
      endDate: "2024-10-31",
      status: "Selesai",
      category: "Kementerian"
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
    <div className="min-h-screen max-w-screen dark:bg-slate-900 bg-gray-100 dark:text-slate-50">
  
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Total Kemitraan</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-sm text-muted-foreground">Pemda Provinsi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-sm text-muted-foreground">Kementerian</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">14</div>
              <div className="text-sm text-muted-foreground">Pelatihan Dilaksanakan</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Daftar Kemitraan dan PKS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mitra</TableHead>
                  <TableHead>Nomor PKS</TableHead>
                  <TableHead>Ruang Lingkup</TableHead>
                  <TableHead>Wilayah</TableHead>
                  <TableHead>Pelatihan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerships.map((partnership) => (
                  <TableRow key={partnership.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{partnership.partnerName}</div>
                        <div className={`text-sm text-black dark:text-slate-50 dark:bg-gray-800 ${getCategoryColor(partnership.category)}`}>{partnership.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{partnership.pksNumber}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-xs">{partnership.scope}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {partnership.region}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {partnership.trainingsHeld} pelatihan
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(partnership.status)}>
                        {partnership.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Active Partnership
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

  
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Mitra Pemerintah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Pemerintah Provinsi DKI Jakarta", logo: "🏛️" },
                { name: "Kementerian Perindustrian RI", logo: "🏭" }, 
                { name: "Pemerintah Provinsi Jawa Barat", logo: "🏞️" },
                { name: "Kementerian ESDM", logo: "⚡" },
                { name: "Pemerintah Provinsi Jawa Tengah", logo: "🏛️" },
                { name: "Kementerian Kelautan & Perikanan", logo: "🌊" },
                { name: "Pemerintah Provinsi Jawa Timur", logo: "🗻" },
                { name: "Kementerian Pertanian", logo: "🌾" }
              ].map((partner, index) => (
                <div key={index} className="group border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {partner.logo}
                  </div>
                  <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{partner.name}</h3>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">Official Partner</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingPartnerships;