"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Handshake, Award, Building2, Phone } from "lucide-react";
import Image from "next/image";
import Jumbotron from "../../../../public/Jumbotron2.png"
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/main/LoadingScreen";



const Partnerships = () => {

interface lpkProps {
  id: string,
  name: string,
  locations: string,
  type: string,
  programs: string[],
  status: string,
  accreditationNumber: string,
  contactPerson: string,
  phone: string
}
const [lpkData, setLpkData] = useState<lpkProps[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(()=>{
axios.get("https://pokjappsdmlh-be.vercel.app/api/lpk")
.then(res => setLpkData(res.data))
.catch(err => console.error(err))
.finally(() => setIsLoading(false))
},[])




return (
  <div className="min-h-screen dark:bg-slate-900 bg-gray-100 dark:text-slate-50">
    <section className="w-screen px-4 sm:px-6 lg:px-8 py-5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Handshake className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                Akreditasi
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent animate-gradient">
                Accreditation LPK
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-6">
              Kelola kemitraan strategis, proses akreditasi, dan lembaga pelatihan kerja
              untuk meningkatkan kualitas program pengembangan SDM lingkungan hidup.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image
              src={Jumbotron}
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

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-5 py-10">
  {isLoading?<LoadingScreen message="Loading Akreditasi LPK.." mode="inline" /> : <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { value: lpkData.length, label: "Total LPK" },
          { value: lpkData.filter(lpk => lpk.status === 'Terakreditasi').length, label: "Terakreditasi" },
          { value: lpkData.filter(lpk => lpk.status === 'Proses Akreditasi').length, label: "Proses Akreditasi" },
          { value: lpkData.filter(lpk => lpk.programs).length, label: "Jenis Pelatihan" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Card className="hover:shadow-xl transition-shadow duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 animate-bounce" />
              Daftar Lembaga Pelatihan Kerja (LPK) Terakreditasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama LPK</TableHead>
                  <TableHead>No. Akreditasi</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Jenis Pelatihan</TableHead>
                  <TableHead>Program Pelatihan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lpkData.map((lpk, i) => (
                  <motion.tr
                    key={lpk.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ scale: 1.01, backgroundColor: "rgba(59,130,246,0.05)" }}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{lpk.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <div className="w-3 h-3" />
                          {lpk.locations}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm text-nowrap">{lpk.accreditationNumber}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex flex-col items-center gap-2">
                          <div className="font-medium text-sm text-nowrap">{lpk.contactPerson}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {lpk.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-s">{lpk.type}</div>
                    </TableCell>
                    <TableCell className="text-md max-w-md">
                      {lpk.programs.slice(0, 2).join(", ")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={lpk.status === "Terakreditasi" ? "default" : "secondary"}
                        className="animate-fadeIn"
                      >
                        {lpk.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">Verified</span>
                      </motion.div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </>}
    </div>
  </div>
);

};

export default Partnerships;