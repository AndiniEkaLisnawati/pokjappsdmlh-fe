"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Handshake,
  Award,
  Building2,
  Phone,
  BookOpen,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Jumbotron from "../../../../public/LPK.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/main/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMemo } from "react";

const Partnerships = () => {
  interface lpkProps {
    id: string;
    name: string;
    locations: string;
    type: string;
    programs: string[];
    status: string;
    accreditationNumber: string;
    contactPerson: string;
    phone: string;
  }
  const [lpkData, setLpkData] = useState<lpkProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokjappsdmlh-be.vercel.app/api/lpk")
      .then((res) => setLpkData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  // 🔎 Filtered data
  const filteredData = useMemo(() => {
    return lpkData.filter(
      (lpk) =>
        lpk.name.toLowerCase().includes(search.toLowerCase()) ||
        lpk.accreditationNumber.toLowerCase().includes(search.toLowerCase()) ||
        lpk.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, lpkData]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
                Kelola kemitraan strategis, proses akreditasi, dan lembaga
                pelatihan kerja untuk meningkatkan kualitas program pengembangan
                SDM lingkungan hidup.
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
        {isLoading ? (
          <LoadingScreen message="Loading Akreditasi LPK.." mode="inline" />
        ) : (
          <>
            {/* Statistik Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { value: lpkData.length, label: "Total LPK", icon: Building2 },
                {
                  value: lpkData.filter((lpk) => lpk.status === "Terakreditasi")
                    .length,
                  label: "Terakreditasi",
                  icon: Award,
                },
                {
                  value: lpkData.filter(
                    (lpk) => lpk.status === "Proses Akreditasi"
                  ).length,
                  label: "Proses Akreditasi",
                  icon: Phone,
                },
                {
                  value: lpkData.filter((lpk) => lpk.programs).length,
                  label: "Jenis Pelatihan",
                  icon: BookOpen,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="hover:shadow-lg transition duration-300 border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-3">
                        <item.icon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                      </div>
                      <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">
                        {item.value}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {item.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

   
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Cari LPK, No. Akreditasi, atau Status..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9"
                />
              </div>
            </div>

        
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Card className="hover:shadow-xl transition duration-500 border border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                    <Building2 className="w-5 h-5" />
                    Daftar Lembaga Pelatihan Kerja (LPK) Terakreditasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-100 dark:bg-slate-800">
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
                      {paginatedData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6">
                            Tidak ada data ditemukan
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedData.map((lpk, i) => (
                          <motion.tr
                            key={lpk.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                            whileHover={{
                              backgroundColor: "rgba(59,130,246,0.06)",
                            }}
                            className="transition-colors"
                          >
                            <TableCell>
                              <div>
                                <div className="font-medium">{lpk.name}</div>
                                <div className="text-sm text-nowrap text-muted-foreground flex items-center gap-1">
                                  <MapPin width={15}></MapPin> {lpk.locations}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-nowrap font-mono text-sm">
                                {lpk.accreditationNumber}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-nowrap font-medium text-sm">
                                  {lpk.contactPerson}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Phone className="w-3 h-3" />
                                  {lpk.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{lpk.type}</div>
                            </TableCell>
                            <TableCell className="text-sm align-top max-w-md">
                              <ul className="list-disc space-y-1">
                                {lpk.programs.map((program, idx) => (
                                  <li
                                    key={idx}
                                    className="whitespace-normal break-words"
                                  >
                                    {program}
                                  </li>
                                ))}
                              </ul>
                            </TableCell>

                            <TableCell>
                              <Badge
                                className={
                                  lpk.status === "Terakreditasi"
                                    ? "bg-green-100 text-green-700 border-green-300 text-nowrap"
                                    : "bg-amber-100 text-amber-700 border-amber-300 text-nowrap"
                                }
                              >
                                {lpk.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  Terverifikasi
                                </span>
                              </motion.div>
                            </TableCell>
                          </motion.tr>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-muted-foreground">
                Halaman {page} dari {totalPages || 1}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-900 border-teal-300 hover:border-teal-400"
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(page + 1)}
                  className="bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-900 border-teal-300 hover:border-teal-400"
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Partnerships;
