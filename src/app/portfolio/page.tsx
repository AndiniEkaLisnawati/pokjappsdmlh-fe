"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Filter, Download, Mail, Phone, Award, GraduationCap } from "lucide-react";
import Image from "next/image";

const Portfolio = () => {
  const lecturers = [
    {
      id: 1,
      name: "Dr. Ahmad Wijaya, S.T., M.T.",
      photo: "/placeholder.svg",
      expertise: ["Teknologi Hijau", "Energi Terbarukan", "Manajemen Lingkungan"],
      position: "Widyaiswara Madya",
      education: "S3 Teknik Lingkungan - Institut Teknologi Bandung",
      experience: "15 Tahun",
      certifications: ["ISO 14001 Lead Auditor", "Certified Environmental Professional"],
      email: "ahmad.wijaya@ppsdmlh.go.id",
      phone: "+62 21 1234567",
      trainings_conducted: 45,
      participants_trained: 1250,
      status: "Aktif"
    },
    {
      id: 2,
      name: "Prof. Dr. Siti Nurhasanah, M.Si.",
      photo: "/placeholder.svg",
      expertise: ["Manajemen Limbah B3", "Kimia Lingkungan", "Toksikologi"],
      position: "Widyaiswara Utama",
      education: "S3 Kimia - Universitas Indonesia",
      experience: "22 Tahun",
      certifications: ["Hazardous Waste Management Specialist", "Environmental Toxicology Expert"],
      email: "siti.nurhasanah@ppsdmlh.go.id",
      phone: "+62 21 1234568",
      trainings_conducted: 68,
      participants_trained: 1850,
      status: "Aktif"
    },
    {
      id: 3,
      name: "Dr. Bambang Supriyanto, S.H., M.H.",
      photo: "/placeholder.svg",
      expertise: ["Hukum Lingkungan", "AMDAL", "Audit Lingkungan"],
      position: "Widyaiswara Madya",
      education: "S3 Hukum - Universitas Gadjah Mada",
      experience: "18 Tahun",
      certifications: ["Environmental Law Specialist", "EIA Expert"],
      email: "bambang.supriyanto@ppsdmlh.go.id",
      phone: "+62 21 1234569",
      trainings_conducted: 52,
      participants_trained: 1420,
      status: "Aktif"
    },
    {
      id: 4,
      name: "Dr. Ratna Dewi Sartika, S.Si., M.Sc.",
      photo: "/placeholder.svg",
      expertise: ["Ekologi", "Konservasi Biodiversitas", "Restorasi Ekosistem"],
      position: "Widyaiswara Muda",
      education: "S3 Biologi - Institut Pertanian Bogor",
      experience: "8 Tahun",
      certifications: ["Certified Ecologist", "Biodiversity Conservation Specialist"],
      email: "ratna.dewi@ppsdmlh.go.id",
      phone: "+62 21 1234570",
      trainings_conducted: 28,
      participants_trained: 780,
      status: "Aktif"
    },
    {
      id: 5,
      name: "Dr. Eko Prasetyo, S.T., M.T.",
      photo: "/placeholder.svg",
      expertise: ["Teknologi Pengolahan Air", "Sanitasi Lingkungan", "Water Treatment"],
      position: "Widyaiswara Madya",
      education: "S3 Teknik Sipil - Universitas Diponegoro",
      experience: "12 Tahun",
      certifications: ["Water Treatment Professional", "Environmental Engineering Expert"],
      email: "eko.prasetyo@ppsdmlh.go.id",
      phone: "+62 21 1234571",
      trainings_conducted: 38,
      participants_trained: 1050,
      status: "Aktif"
    },
    {
      id: 6,
      name: "Dr. Maya Sari Indrawati, S.Si., M.Si.",
      photo: "/placeholder.svg",
      expertise: ["Monitoring Lingkungan", "Analisis Kualitas Air", "GIS"],
      position: "Widyaiswara Muda",
      education: "S3 Ilmu Lingkungan - Universitas Padjadjaran",
      experience: "6 Tahun",
      certifications: ["Environmental Monitoring Specialist", "GIS Professional"],
      email: "maya.sari@ppsdmlh.go.id",
      phone: "+62 21 1234572",
      trainings_conducted: 22,
      participants_trained: 650,
      status: "Cuti"
    }
  ];

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Widyaiswara Utama': return 'bg-purple-100 text-purple-800';
      case 'Widyaiswara Madya': return 'bg-blue-100 text-blue-800';
      case 'Widyaiswara Muda': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'default';
      case 'Cuti': return 'secondary';
      case 'Non-Aktif': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">      

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium uppercase tracking-wider bg-gradient-to-bl from-blue-600 to-blue-700 bg-clip-text text-transparent">
  Portfolio Widyaiswara
</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-indigo-900 to-blue-400 bg-clip-text text-transparent">
              Lecturer Portfolio
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Profil lengkap para widyaiswara dan instruktur ahli dalam bidang lingkungan hidup 
            dengan keahlian, sertifikasi, dan pengalaman yang beragam.
          </p>

          <Button size="lg" className="shadow-xl">
            <Users className="w-5 h-5 mr-2" />
            Tambah Widyaiswara
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <div className="text-sm text-muted-foreground">Total Widyaiswara</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Bidang Keahlian</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">320</div>
              <div className="text-sm text-muted-foreground">Total Pelatihan</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">8,450</div>
              <div className="text-sm text-muted-foreground">Peserta Terlatih</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Cari widyaiswara berdasarkan nama atau keahlian..." 
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
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
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Jabatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jabatan</SelectItem>
                  <SelectItem value="utama">Widyaiswara Utama</SelectItem>
                  <SelectItem value="madya">Widyaiswara Madya</SelectItem>
                  <SelectItem value="muda">Widyaiswara Muda</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lecturers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lecturers.map((lecturer) => (
            <Card key={lecturer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
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
                      <h3 className="font-semibold text-lg line-clamp-2">{lecturer.name}</h3>
                      <Badge variant={getStatusColor(lecturer.status)} className="text-xs">
                        {lecturer.status}
                      </Badge>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(lecturer.position)}`}>
                      {lecturer.position}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Expertise */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Bidang Keahlian</h4>
                  <div className="flex flex-wrap gap-1">
                    {lecturer.expertise.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
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
                    <span className="text-muted-foreground truncate">{lecturer.education}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{lecturer.experience} Pengalaman</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-border">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{lecturer.trainings_conducted}</div>
                    <div className="text-xs text-muted-foreground">Pelatihan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{lecturer.participants_trained}</div>
                    <div className="text-xs text-muted-foreground">Peserta</div>
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Telepon
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Muat Lebih Banyak
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;