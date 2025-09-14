"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Calendar, MapPin, Users } from "lucide-react";
import Logo from "../../../../public/Logos2.png";
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"
import LoadingScreen from "@/components/main/LoadingScreen";

type Partnership = {
  id: string;
  partnerName: string;
  scope: string;
  pksNumber: string;
  region: string;
  trainingsHeld: number;
  startDate: string;
  endDate: string;
  status: string;
  category: string;
  logoUrl?: string;
  contactPerson?: string;
  email?: string;
  phoneNumber?: string;
};

const TrainingPartnerships = () => {

  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<{ data: Partnership[] }>("https://pokjappsdmlh-be.vercel.app/api/partnership")
      .then((res) => {
        setPartnerships(res.data.data)
      })
      .catch((err) => {
        console.error("Error fetching partnerships:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'default';
      case 'Selesai': return 'outline';
      case 'Ditunda': return 'secondary';
      default: return 'destructive';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Kementerian': return 'bg-blue-100 text-blue-800';
      case 'Pemda Provinsi': return 'bg-green-100 text-green-800';
      case 'Pemda Kabupaten': return 'bg-purple-100 text-purple-800';
      case 'Swasta': return 'bg-orange-100 text-orange-800';
      case 'NGO': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};


  return (
    <div className="min-h-screen max-w-screen dark:bg-slate-900 bg-gray-100 dark:text-slate-50">

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
                dan kualitas program pelatihan lingkungan hidup.POKJABANGKOM
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
              className="w-auto h-[250px] md:h-[360px] object-cover drop-shadow-2xl rounded-xl mb-6 md:mb-0 md:self-end"
              priority
              />
              </motion.div>
          </motion.div>
        </div>
      </section>

      {loading? <LoadingScreen mode="inline" message="Loading Kemitraan Kerjasama.."/> : <>

    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{partnerships.length}</div>
              <div className="text-sm text-muted-foreground">Total Kemitraan</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{partnerships.filter(p => p.category === 'Pemda Provinsi').length}</div>
              <div className="text-sm text-muted-foreground">Pemda Provinsi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{partnerships.filter(p => p.category === 'Kementerian').length}</div>
              <div className="text-sm text-muted-foreground">Kementerian</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{partnerships.reduce((sum, p) => sum + p.trainingsHeld, 0)}</div>
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
                  <TableHead>Tanggal mulai - Tanggal selesai</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerships.map((partnership) => (
                  <TableRow key={partnership.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{partnership.partnerName}</div>
                        <div className="flex justify-end">

                        <Badge className={`text-xs text-black dark:text-slate-50 dark:bg-gray-800 ${getCategoryColor(partnership.category)}`}>{partnership.category}</Badge>
                        </div>
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
                        <div className="inline-flex items-center gap-1 px-2 py-1 p-2 bg-green-50 text-green-700 rounded-full text-xs">
                          {formatDate(partnership.startDate)} s/d <br /> {formatDate(partnership.endDate)}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>




<Card className="mt-8 shadow-sm border rounded-2xl">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Users className="w-5 h-5" />
      Kontak Mitra Pelatihan
    </CardTitle>
  </CardHeader>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {partnerships.map((partner, idx) => (
      <motion.div
        key={partner.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: idx * 0.05 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted overflow-hidden">
                {partner.logoUrl ? (
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.partnerName} logo`}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-sm font-semibold">
                    {partner.partnerName.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{partner.partnerName}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getCategoryColor(
                    partner.category
                  )}`}
                >
                  {partner.category}
                </span>
              </div>
            </div>
            <Badge
              variant={partner.status === "Aktif" ? "default" : "secondary"}
              className="text-[10px] px-2 py-1"
            >
              {partner.status}
            </Badge>
          </div>

          <div className="space-y-1 text-xs text-muted-foreground">
            <p>{partner.contactPerson}</p>
            <p>{partner.email}</p>
            <p>{partner.phoneNumber}</p>
          </div>
        </Card>
      </motion.div>
    ))}
  </div>
</Card>
      </div >
       </>}
    </div >
  );
};

export default TrainingPartnerships;