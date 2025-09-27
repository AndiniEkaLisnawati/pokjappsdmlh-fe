"use client";

import { ReactNode, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Handshake,
  BookOpen,
  Camera,
  FileText,
  Users,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Building2, Moon, Sun } from "lucide-react";
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

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    const theme = checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", checked);
    toast.success("Theme Updated", {
      description: `Switched to ${theme} mode`,
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
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    title: "Active Partnerships",
    value: partnershipRes.length,
    change: "+",
    icon: <Handshake className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    title: "Training Programs",
    value: pelatihanRes.length,
    change: "+",
    icon: <BookOpen className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    title: "Documentation Items",
    value: activityRes.length,
    change: "+",
    icon: <Camera className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    title: "Curriculum Items",
    value: syllabusRes.length,
    change: "+",
    icon: <FileText className="h-6 w-6" />,
    color: "text-teal-600",
    bgColor: "bg-teal-100 dark:bg-teal-900/20",
  },
  {
    title: "Widyaiswara",
    value: widyaiswaraRes.length,
    change: "+",
    icon: <Users className="h-6 w-6" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100 dark:bg-pink-900/20",
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
                      
                    </div>
                    <p className="text-sm text-green-600">{stat.change}</p>
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
