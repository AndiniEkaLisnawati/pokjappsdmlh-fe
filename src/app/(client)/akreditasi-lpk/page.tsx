"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Handshake, Award, Building2, Phone } from "lucide-react";
import Image from "next/image";
import Jumbotron from "../../../../public/Jumbotron2.png"
import axios from "axios";
import { useEffect, useState } from "react";



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

useEffect(()=>{
axios.get("http://localhost:3000/api/lpk")
.then(res => setLpkData(res.data))
.catch(err => console.error(err))
},[])


  return (
    <div className="min-h-screen dark:bg-slate-900 bg-gray-100 dark:text-slate-50">
      <section className="w-screen px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg">

            <div className="text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <Handshake className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                   Akreditasi
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
                   Accreditation LPK
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-6">
                Kelola kemitraan strategis, proses akreditasi, dan lembaga pelatihan kerja
                untuk meningkatkan kualitas program pengembangan SDM lingkungan hidup.
              </p>
            </div>


            <Image
              src={Jumbotron}
              alt="Ilustrasi Program Pelatihan"
              width={420}
              height={420}
              className="w-auto h-[250px] md:h-[360px] object-cover drop-shadow-2xl rounded-xl mb-6 md:mb-0 md:self-end"
              priority
            />
          </div>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-5 py-10">
     
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Total LPK</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Terakreditasi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <div className="text-sm text-muted-foreground">Proses Akreditasi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Jenis Pelatihan</div>
            </CardContent>
          </Card>
        </div>

    
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
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
                {lpkData.map((lpk) => (
                  <TableRow key={lpk.id}>
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
                      <div className="font-mono text-sm">{lpk.accreditationNumber}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary">
                              {lpk.contactPerson.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{lpk.contactPerson}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {lpk.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                   
                    <TableCell>
                      <div className="text-sm max-w-s">
                        {lpk.type}
                      </div>
                    </TableCell>
                    <TableCell className="text-md max-w-md">
                      {lpk.programs}
                    </TableCell>
                    <TableCell>
                      <Badge variant={lpk.status === "Terakreditasi" ? "default" : "secondary"}>
                        {lpk.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">Verified</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Partnerships;