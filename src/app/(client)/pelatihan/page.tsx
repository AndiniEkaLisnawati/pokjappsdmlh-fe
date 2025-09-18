"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/main/LoadingScreen";
import {
  Clock,
  Users,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  User,
  EyeIcon,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../../../public/Logos5.png";
import axios from "axios";
import Link from "next/link";

export interface Training {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  participants: number;
  maleParticipants: number;
  femaleParticipants: number;
  trainersCount: number;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
  type: string;
}

export interface CompletedTraining {
  id: string;
  title: string;
  participants: number;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  totalCertificate: number;
  certificate: string;
  satisfaction: number;
  rating: string;
}

const Training = () => {
  const [training, setTraining] = useState<Training[]>([]);
  const [completedTrainings, setCompletedTrainings] = useState<
    CompletedTraining[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_TRAINING_URL = "https://pokjappsdmlh-be.vercel.app/api/training";
  const API_COMPLETED_TRAINING_URL =
    "https://pokjappsdmlh-be.vercel.app/api/completedTrainings";
  useEffect(() => {
    axios
      .get(API_TRAINING_URL)
      .then((response) => {
        setTraining(response.data);
      })
      .catch((error) => {
        console.error("Error fetching training data:", error);
      });

    axios
      .get(API_COMPLETED_TRAINING_URL)
      .then((response) => {
        setCompletedTrainings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching completed trainings:", error);
      });

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <>
        {isLoading ? (
          <LoadingScreen mode="inline" />
        ) : (
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
                      Program pelatihan komprehensif untuk pengembangan
                      kompetensi SDM lingkungan hidup dengan metode pembelajaran
                      modern dan sertifikasi profesional.
                    </p>
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

            <section className="pb-12 pt-6 px-4 sm:px-6 lg:px-8 dark:bg-slate-800">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  // bikin lebih DRY
                  {
                    label: "Total Programs",
                    value: training.length + completedTrainings.length,
                    color: "text-primary",
                  },
                  {
                    label: "Ongoing",
                    value: training.filter((t) => t.status === "Ongoing")
                      .length,
                    color: "text-green-600",
                  },
                  {
                    label: "Completed",
                    value:
                      training.filter((t) => t.status === "Completed").length +
                      completedTrainings.length,
                    color: "text-blue-600",
                  },
                  {
                    label: "Total Participants",
                    value:
                      training.reduce((sum, t) => sum + t.participants, 0) +
                      completedTrainings.reduce(
                        (sum, t) => sum + t.participants,
                        0
                      ),
                    color: "text-purple-600",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <Card className="hover:scale-[1.02] transition-transform duration-300 shadow-md hover:shadow-xl">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`text-3xl font-extrabold ${item.color}`}
                        >
                          {item.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>
                        {item.label === "Total Participants" && (
                          <div className="flex justify-center space-x-6 mt-3 text-xs">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-muted-foreground mr-1" />
                              Ongoing:{" "}
                              {training
                                .filter((t) => t.status === "Ongoing")
                                .reduce((sum, t) => sum + t.participants, 0)}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-muted-foreground mr-1" />
                              Completed:{" "}
                              {training
                                .filter((t) => t.status === "Completed")
                                .reduce((sum, t) => sum + t.participants, 0) +
                                completedTrainings.reduce(
                                  (sum, t) => sum + t.participants,
                                  0
                                )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Tabs Section */}
              <div className="max-w-7xl mx-auto mt-12">
                <Tabs defaultValue="upcoming" className="space-y-8">
                  <TabsList className="grid w-full grid-cols-2 rounded-xl shadow-sm">
                    <TabsTrigger value="upcoming">
                      Worksheet Folders
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Certificate Training
                    </TabsTrigger>
                  </TabsList>

                  {/* Upcoming Training */}
                  <TabsContent value="upcoming" className="space-y-6">
                    <div className="grid gap-6">
                      {training.map((training, i) => (
                        <motion.div
                          key={training.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.15 }}
                        >
                          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Badge
                                      variant={
                                        training.status === "Ongoing"
                                          ? "default"
                                          : "secondary"
                                      }
                                    >
                                      {training.status}
                                    </Badge>
                                    <Badge variant="outline">
                                      {training.type}
                                    </Badge>
                                  </div>
                                  <CardTitle className="text-xl font-semibold">
                                    {training.title}
                                  </CardTitle>
                                  <CardDescription className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
                                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(
                                    training.startDate
                                  ).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  })}{" "}
                                  -{" "}
                                  {new Date(
                                    training.endDate
                                  ).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </div>
                                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {training.location}
                                </div>
                                <div className="grid grid-cols-[20px_1fr] items-center gap-2 text-blue-600">
                                  <Users className="w-4 h-4" />
                                  {training.maleParticipants} Laki-laki
                                </div>
                                <div className="grid grid-cols-[20px_1fr] items-center gap-2 text-pink-600">
                                  <Users className="w-4 h-4" />
                                  {training.femaleParticipants} Perempuan
                                </div>
                                <div className="grid grid-cols-[20px_1fr] items-center gap-2 text-green-600">
                                  <User className="w-4 h-4" />
                                  {training.trainersCount} Pengajar
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  {completedTrainings.length === 0 ? (
                    <TabsContent value="completed" className="space-y-6">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        No Certificate trainings available.
                      </div>
                    </TabsContent>
                  ) : (
                    <TabsContent value="completed" className="space-y-6">
                      <div className="grid gap-6">
                        {completedTrainings.map((training, i) => (
                          <motion.div
                            key={training.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                          >
                            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div className="space-y-2">
                                    <CardTitle className="text-xl font-semibold">
                                      {training.title}
                                    </CardTitle>
                                    <CardDescription className="flex items-center text-sm text-muted-foreground">
                                      <Calendar className="w-4 h-4 mr-2" />
                                      {new Date(
                                        training.startDate
                                      ).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })}{" "}
                                      -{" "}
                                      {new Date(
                                        training.endDate
                                      ).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </CardDescription>
                                  </div>
                                  <div className="text-right flex flex-col gap-2">
                                    <div className="flex items-center space-x-1">
                                      <Award className="w-4 h-4 text-yellow-500" />
                                      <span className="text-sm font-medium">
                                        {training.satisfaction}
                                      </span>
                                    </div>
                                    <Link
                                      href={training.certificate}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Button variant="outline" size="sm">
                                        <EyeIcon className="w-4 h-4 mr-1" />
                                        View Certificate
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-2" />
                                    {training.participants} peserta
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {training.location}
                                  </div>
                                  <div className="flex items-center">
                                    <Award className="w-4 h-4 mr-2" />
                                    {training.totalCertificate} sertifikat
                                    diterbitkan
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </section>
          
      </div>
      </>
        )}
    </>
  );
};

export default Training;
