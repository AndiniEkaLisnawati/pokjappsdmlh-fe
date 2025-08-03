"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Search, Download, Eye, Calendar, FileText } from "lucide-react";

const Curriculum = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">

      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Kurikulum</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Curriculum
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Kurikulum terstruktur dan up-to-date untuk semua program pelatihan 
            sesuai standar kompetensi nasional lingkungan hidup.
          </p>

          <Button size="lg" className="shadow-xl">
            <FileText className="w-5 h-5 mr-2" />
            Upload Kurikulum Baru
          </Button>
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
                  />
                </div>
              </div>
              <Button variant="outline">
                Filter
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
                {curriculums.map((curriculum) => (
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