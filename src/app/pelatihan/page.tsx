"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  User,
  EyeIcon,
  FileText
} from "lucide-react";
import Image from 'next/image';
import Logo from "../../../public/Logos5.png"
const Training = () => {
  const worksheetFolders = [
    {
      id: 1,
      title: "Pelatihan AMDAL Batch 15",
      instructor: "Dr. Ahmad Santoso",
      duration: "3 Days",
      participants: 25,
      maleParticipants: 15,
      femaleParticipants: 10,
      trainersCount: 4,
      date: "15-17 Februari 2025",
      location: "Jakarta",
      status: "Ongoing",
      type: "Sertifikasi"
    },
    {
      id: 2,
      title: "Workshop Pengelolaan Limbah B3",
      instructor: "Ir. Siti Rahayu, M.Eng",
      duration: "2 Days",
      participants: 30,
      maleParticipants: 18,
      femaleParticipants: 12,
      trainersCount: 3,
      date: "22-23 Februari 2025",
      location: "Bandung",
      status: "Completed",
      type: "Workshop"
    },
    {
      id: 3,
      title: "Pelatihan Green Technology",
      instructor: "Prof. Dr. Budi Hartono",
      duration: "5 Days",
      participants: 20,
      maleParticipants: 12,
      femaleParticipants: 8,
      trainersCount: 5,
      date: "1-5 Maret 2025",
      location: "Yogyakarta",
      status: "Ongoing",
      type: "Sertifikasi"
    }
  ];

  const completedTrainings = [
    {
      id: 1,
      title: "Forest Conservation Management",
      participants: 35,
      date: "10-12 Januari 2025",
      rating: 4.8,
      certificates: 32
    },
    {
      id: 2,
      title: "Water Quality Monitoring",
      participants: 28,
      date: "8-9 Januari 2025",
      rating: 4.9,
      certificates: 28
    },
    {
      id: 3,
      title: "Renewable Energy Implementation",
      participants: 22,
      date: "3-5 Januari 2025",
      rating: 4.7,
      certificates: 20
    }
  ];

  const trainingMaterials = [
    {
      id: 1,
      title: "Environmental Law Handbook",
      type: "PDF",
      size: "2.5 MB",
      downloads: 156
    },
    {
      id: 2,
      title: "Sustainability Assessment Guide",
      type: "PDF",
      size: "1.8 MB",
      downloads: 203
    },
    {
      id: 3,
      title: "Training Methodology Video",
      type: "MP4",
      size: "45 MB",
      downloads: 89
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-slate-50">

      <div className="w-screen px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full min-h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 px-6 md:px-16 py-12 rounded-2xl shadow-lg">

            <div className="text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Program Pelatihan
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
                  Training Programs
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-6">
                Program pelatihan komprehensif untuk pengembangan kompetensi SDM lingkungan hidup
                dengan metode pembelajaran modern dan sertifikasi profesional.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="shadow-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Daftar Pelatihan
                </Button>
                <Button variant="outline" size="lg">
                  <FileText className="w-5 h-5 mr-2" />
                  Materi Pelatihan
                </Button>
              </div>
            </div>


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
      </div>
    </div>

  <section className="pb-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 mt-10 ">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-1">48</div>
            <div className="text-sm text-muted-foreground">Program Aktif</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-1">1,250</div>
            <div className="text-sm text-muted-foreground">Peserta Terlatih</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-1">95%</div>
            <div className="text-sm text-muted-foreground">Tingkat Kelulusan</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-1">4.8</div>
            <div className="text-sm text-muted-foreground">Rating Rata-rata</div>
          </CardContent>
        </Card>
      </div>
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="upcoming" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Worksheet Folders</TabsTrigger>
          <TabsTrigger value="completed">Completed Training</TabsTrigger>
        </TabsList>

        {/* Worksheet Folders */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6">
            {worksheetFolders.map((training) => (
              <Card key={training.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant={training.status === "Ongoing" ? "default" : "secondary"}>
                          {training.status}
                        </Badge>
                        <Badge variant="outline">{training.type}</Badge>
                      </div>
                      <CardTitle className="text-xl">{training.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {training.instructor}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {training.duration}
                        </span>
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View Only
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {training.date}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {training.location}
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Users className="w-4 h-4 mr-2" />
                      {training.maleParticipants} Laki-laki
                    </div>
                    <div className="flex items-center text-pink-600">
                      <Users className="w-4 h-4 mr-2" />
                      {training.femaleParticipants} Perempuan
                    </div>
                    <div className="flex items-center text-green-600">
                      <User className="w-4 h-4 mr-2" />
                      {training.trainersCount} Trainer
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Trainings */}
        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-6">
            {completedTrainings.map((training) => (
              <Card key={training.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{training.title}</CardTitle>
                      <CardDescription>{training.date}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{training.rating}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        View Certificate
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {training.participants} peserta
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Award className="w-4 h-4 mr-2" />
                      {training.certificates} sertifikat diterbitkan
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  </section>


  </>
  );
};

export default Training;