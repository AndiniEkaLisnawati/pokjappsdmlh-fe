"use client";

import { ReactNode, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Handshake,
  BookOpen,
  Camera,
  FileText,
  Users,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Settings, Building2, Moon, Sun, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import LoadingScreen from "@/components/main/LoadingScreen";

type StatItem = {
  title: string;
  value: number | string;
  change: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [cardLoading, setCardLoading] = useState(true);

  const siteSettingsSchema = z.object({
    siteTitle: z.string().min(1, "Site title is required"),
    siteTagline: z.string().min(1, "Site tagline is required"),
    contactEmail: z.string().email("Valid email is required"),
    contactPhone: z.string().min(1, "Contact phone is required"),
    address: z.string().min(1, "Address is required"),
  });

  type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const siteForm = useForm<SiteSettingsFormData>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteTitle: "POKJA PPSDM KLHK",
      siteTagline:
        "Pelatihan Profesional untuk Sumber Daya Manusia Lingkungan Hidup",
      contactEmail: "info@pokjappsdm.id",
      contactPhone: "+62-21-123456",
      address: "Jl. D.I. Panjaitan Kav 24, Jakarta Timur 13410",
    },
  });

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    const theme = checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", checked);
    toast.success("Theme Updated", {
      description: `Switched to ${theme} mode`,
    });
  };

  const onSiteSettingsSubmit = (data: SiteSettingsFormData) => {
    // In a real app, this would make an API call
    console.log("Site settings update:", data);
    toast.success("Site Settings Updated", {
      description: "Site settings have been successfully updated.",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          lpkRes,
          widyaiswaraRes,
          activityRes,
          pelatihanRes,
          syllabusRes,
          partnershipRes,
        ] = await Promise.all([
          fetch("https://pokjappsdmlh-be.vercel.app/api/lpk").then((res) =>
            res.json()
          ),
          fetch("https://pokjappsdmlh-be.vercel.app/api/lecturer").then((res) =>
            res.json()
          ),
          fetch("https://pokjappsdmlh-be.vercel.app/api/activity").then((res) =>
            res.json()
          ),
          fetch("https://pokjappsdmlh-be.vercel.app/api/training").then((res) =>
            res.json()
          ),
          fetch("https://pokjappsdmlh-be.vercel.app/api/curriculum").then(
            (res) => res.json()
          ),
          fetch("https://pokjappsdmlh-be.vercel.app/api/partnership").then(
            (res) => res.json()
          ),
        ]);
setStats([
  {
    title: "Total LPK",
    value: lpkRes.length,
    change: "+",
    icon: <Building2 className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Partnerships",
    value: partnershipRes.length,
    change: "+",
    icon: <Handshake className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Training Programs",
    value: pelatihanRes.length,
    change: "+",
    icon: <BookOpen className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Documentation Items",
    value: activityRes.length,
    change: "+",
    icon: <Camera className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Curriculum Items",
    value: syllabusRes.length,
    change: "+",
    icon: <FileText className="h-6 w-6" />,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    title: "Widyaiswara",
    value: widyaiswaraRes.length,
    change: "+",
    icon: <Users className="h-6 w-6" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
]);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setCardLoading(false);
      }
    };

    fetchData();
  }, []);

  const quickActions = [
    {
      title: "Add New LPK",
      icon: Building2,
      link: "/admin/lpk",
      color: "bg-blue-600",
    },
    {
      title: "Create Partnership",
      icon: Handshake,
      link: "/admin/partnerships",
      color: "bg-green-600",
    },
    {
      title: "Add Training",
      icon: BookOpen,
      link: "/admin/training",
      color: "bg-purple-600",
    },
    {
      title: "Upload Documentation",
      icon: Camera,
      link: "/admin/documentation",
      color: "bg-orange-600",
    },
    {
      title: "Add Curriculum",
      icon: FileText,
      link: "/admin/curriculum",
      color: "bg-teal-600",
    },
    {
      title: "Add Widyaiswara",
      icon: Users,
      link: "/admin/widyaiswara",
      color: "bg-pink-600",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all aspects of the POKJA PPSDMLH platform from here.
        </p>
      </div>

      {/* Stats */}

      {cardLoading ? (
        <LoadingScreen mode="inline" message="Card Loading.." />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
      <div className="grid gap-8">
  

        <div className="flex gap-2">
          {/* Settings Section */}
          <div className="flex-1">
            {/* Site Settings */}
            <Card>
              {/* Settings Header */}
              <div className="m-5 flex items-center gap-3">
                <Settings className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold">Settings</h2>
                  <p className="text-muted-foreground">
                    Manage application settings
                  </p>
                </div>
              </div>
              <CardContent>
                <Form {...siteForm}>
                  <form
                    onSubmit={siteForm.handleSubmit(onSiteSettingsSubmit)}
                    className="space-y-4"
                  >
                    {/* Title */}
                    <FormField
                      control={siteForm.control}
                      name="siteTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Tagline */}
                    <FormField
                      control={siteForm.control}
                      name="siteTagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Tagline</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={2} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={siteForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={siteForm.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Address */}
                    <FormField
                      control={siteForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Update Site Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <Card className=" max-w-md max-h-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.link}>
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all"
                    >
                      <div
                        className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}
                      >
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-center">
                        {action.title}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDarkMode ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="dark-mode" className="text-sm font-medium">
                  Dark Mode
                </Label>
                <p className="text-xs text-muted-foreground">
                  Toggle between light and dark themes
                </p>
              </div>
              {/* Toggle switch di sini */}
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
