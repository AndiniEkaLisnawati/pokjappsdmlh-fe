"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Handshake, 
  BookOpen, 
  Camera, 
  FileText, 
  Users,
  Activity,
  Target
} from "lucide-react"
import Link from "next/link"

type StatItem = {
  title: string
  value: number | string
  change: string
  icon: any
  color: string
  bgColor: string
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatItem[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          lpkRes,
          widyaiswaraRes,
          activityRes,
          pelatihanRes,
          syllabusRes,
          partnershipRes
        ] = await Promise.all([
          fetch("https://pokjappsdmlh-be.vercel.app/api/lpk").then(res => res.json()),
          fetch("https://pokjappsdmlh-be.vercel.app/api/lecturer").then(res => res.json()),
          fetch("https://pokjappsdmlh-be.vercel.app/api/activity").then(res => res.json()),
          fetch("https://pokjappsdmlh-be.vercel.app/api/training").then(res => res.json()),
          fetch("https://pokjappsdmlh-be.vercel.app/api/curriculum").then(res => res.json()),
          fetch("https://pokjappsdmlh-be.vercel.app/api/partnership").then(res => res.json())
        ])

        setStats([
          {
            title: "Total LPK",
            value: lpkRes.length,
            change: "+ data dari API",
            icon: Building2,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
          },
          {
            title: "Active Partnerships",
            value: partnershipRes.length,
            change: "+ data dari API",
            icon: Handshake,
            color: "text-green-600",
            bgColor: "bg-green-100"
          },
          {
            title: "Training Programs",
            value: pelatihanRes.length,
            change: "+ data dari API",
            icon: BookOpen,
            color: "text-purple-600",
            bgColor: "bg-purple-100"
          },
          {
            title: "Documentation Items",
            value: activityRes.length,
            change: "+ data dari API",
            icon: Camera,
            color: "text-orange-600",
            bgColor: "bg-orange-100"
          },
          {
            title: "Curriculum Items",
            value: syllabusRes.length,
            change: "+ data dari API",
            icon: FileText,
            color: "text-teal-600",
            bgColor: "bg-teal-100"
          },
          {
            title: "Widyaiswara",
            value: widyaiswaraRes.length,
            change: "+ data dari API",
            icon: Users,
            color: "text-pink-600",
            bgColor: "bg-pink-100"
          }
        ])

        // recent activity → ambil dari endpoint activity
        setRecentActivity(
          activityRes.slice(0, 5).map((a: any) => ({
            action: a.title || "Activity",
            entity: a.description || "-",
            time: a.createdAt ? new Date(a.createdAt).toLocaleString() : "Recently"
          }))
        )
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      }
    }

    fetchData()
  }, [])

  const quickActions = [
    { title: "Add New LPK", icon: Building2, link: "/admin/lpk", color: "bg-blue-600" },
    { title: "Create Partnership", icon: Handshake, link: "/admin/partnerships", color: "bg-green-600" },
    { title: "Add Training", icon: BookOpen, link: "/admin/training", color: "bg-purple-600" },
    { title: "Upload Documentation", icon: Camera, link: "/admin/documentation", color: "bg-orange-600" },
    { title: "Add Curriculum", icon: FileText, link: "/admin/curriculum", color: "bg-teal-600" },
    { title: "Add Widyaiswara", icon: Users, link: "/admin/widyaiswara", color: "bg-pink-600" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all aspects of the POKJA PPSDMLH platform from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
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
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-center">{action.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.entity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
