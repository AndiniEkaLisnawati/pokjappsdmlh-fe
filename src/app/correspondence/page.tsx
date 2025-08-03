import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Send, FileText, Calendar, User, Download, Eye, Clock } from "lucide-react";

const Correspondence = () => {
  const submissions = [
    {
      id: "SRT-001/2024",
      subject: "Permohonan Kerjasama Penelitian",
      category: "Kerjasama",
      recipient: "Direktorat Penelitian",
      submitter: "Dr. Ahmad Wijaya",
      date: "2024-02-15",
      status: "Disetujui",
      urgency: "Normal",
      response_date: "2024-02-18"
    },
    {
      id: "SRT-002/2024",
      subject: "Izin Pelaksanaan Workshop",
      category: "Izin",
      recipient: "Bagian Akademik",
      submitter: "Prof. Siti Nurhasanah",
      date: "2024-02-14",
      status: "Menunggu",
      urgency: "Tinggi",
      response_date: null
    },
    {
      id: "SRT-003/2024",
      subject: "Laporan Kegiatan Pelatihan",
      category: "Laporan",
      recipient: "Kepala Program",
      submitter: "Dr. Bambang Supriyanto",
      date: "2024-02-12",
      status: "Diproses",
      urgency: "Normal",
      response_date: null
    },
    {
      id: "SRT-004/2024",
      subject: "Permohonan Anggaran Kegiatan",
      category: "Anggaran",
      recipient: "Bagian Keuangan",
      submitter: "Dr. Ratna Dewi",
      date: "2024-02-10",
      status: "Ditolak",
      urgency: "Rendah",
      response_date: "2024-02-13"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disetujui': return 'default';
      case 'Menunggu': return 'secondary';
      case 'Diproses': return 'outline';
      case 'Ditolak': return 'destructive';
      default: return 'secondary';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Tinggi': return 'bg-red-100 text-red-800';
      case 'Normal': return 'bg-yellow-100 text-yellow-800';
      case 'Rendah': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br dark:bg-slate-800 dark:text-slate-50 from-background to-muted/30">

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Mail className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Surat Menyurat</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Correspondence & Administration
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Sistem administrasi dan korespondensi internal untuk kelancaran operasional 
            dan komunikasi resmi antar unit kerja.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Tabs defaultValue="submit" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submit">Ajukan Surat</TabsTrigger>
            <TabsTrigger value="history">Riwayat Pengajuan</TabsTrigger>
            <TabsTrigger value="stats">Statistik</TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Form Pengajuan Surat Internal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Perihal Surat</Label>
                    <Input id="subject" placeholder="Masukkan perihal surat..." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kerjasama">Kerjasama</SelectItem>
                        <SelectItem value="izin">Izin</SelectItem>
                        <SelectItem value="laporan">Laporan</SelectItem>
                        <SelectItem value="anggaran">Anggaran</SelectItem>
                        <SelectItem value="undangan">Undangan</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient">Unit Tujuan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih unit tujuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="direktorat">Direktorat Penelitian</SelectItem>
                        <SelectItem value="akademik">Bagian Akademik</SelectItem>
                        <SelectItem value="keuangan">Bagian Keuangan</SelectItem>
                        <SelectItem value="sdm">Bagian SDM</SelectItem>
                        <SelectItem value="kepala">Kepala Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Tingkat Urgensi</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat urgensi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tinggi">Tinggi</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Isi Surat</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Tuliskan isi surat dengan jelas dan lengkap..."
                    className="min-h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachment">Lampiran (Opsional)</Label>
                  <Input id="attachment" type="file" multiple />
                  <p className="text-sm text-muted-foreground">
                    Format yang didukung: PDF, DOC, DOCX, JPG, PNG (Max. 10MB per file)
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Pengajuan
                  </Button>
                  <Button type="button" variant="outline">
                    Simpan Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Riwayat Pengajuan Surat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Input placeholder="Cari berdasarkan perihal atau nomor surat..." />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No. Surat</TableHead>
                      <TableHead>Perihal</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tujuan</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Urgensi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-mono text-sm">{submission.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{submission.subject}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {submission.submitter}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{submission.category}</TableCell>
                        <TableCell>{submission.recipient}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {new Date(submission.date).toLocaleDateString('id-ID')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(submission.urgency)}`}>
                            {submission.urgency}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
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

          <TabsContent value="stats">
            <div className="space-y-8">
          
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">127</div>
                    <div className="text-sm text-muted-foreground">Total Pengajuan</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">89</div>
                    <div className="text-sm text-muted-foreground">Disetujui</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">28</div>
                    <div className="text-sm text-muted-foreground">Menunggu</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">10</div>
                    <div className="text-sm text-muted-foreground">Ditolak</div>
                  </CardContent>
                </Card>
              </div>

           
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengajuan per Kategori</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: "Kerjasama", count: 35, percentage: 28 },
                        { category: "Izin", count: 28, percentage: 22 },
                        { category: "Laporan", count: 24, percentage: 19 },
                        { category: "Anggaran", count: 22, percentage: 17 },
                        { category: "Undangan", count: 18, percentage: 14 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary rounded-full h-2" 
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Waktu Respons Rata-rata</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { unit: "Direktorat Penelitian", days: 3.2, status: "Baik" },
                        { unit: "Bagian Akademik", days: 2.8, status: "Sangat Baik" },
                        { unit: "Bagian Keuangan", days: 4.5, status: "Cukup" },
                        { unit: "Bagian SDM", days: 2.1, status: "Sangat Baik" },
                        { unit: "Kepala Program", days: 1.8, status: "Sangat Baik" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.unit}</span>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{item.days} hari</span>
                            <Badge variant="outline" className="text-xs">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Correspondence;