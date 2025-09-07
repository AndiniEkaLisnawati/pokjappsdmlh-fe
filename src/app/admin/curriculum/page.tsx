"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, BookOpen, Calendar, } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {format} from 'date-fns'
import LoadingScreen from "@/components/main/LoadingScreen";

const curriculumSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  field: z.string().min(1, "Field is required"),
  level: z.string().min(1, "Level is required"),
  duration: z.string().min(1, "Duration is required"),
  modules: z.number().min(1, "Modules must be at least 1"),
  version: z.string().min(1, "Version is required"),
  status: z.string().min(1, "Status is required"),
  fileLink: z.string().optional(),
})

type CurriculumFormData = z.infer<typeof curriculumSchema>

type Item = {
  id: string
  title: string
  description: string
  field: string
  level: string
  duration: string
  modules: number
  version: string
  status: string
  fileLink: string | null
  lastUpdated: string
}

const CurriculumManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedField, setSelectedField] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [curriculums, setCurriculums] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  const form = useForm<CurriculumFormData>({
    resolver: zodResolver(curriculumSchema),
    defaultValues: {
      title: "",
      description: "",
      field: "",
      level: "",
      duration: "",
      modules: 0,
      version: "",
      status: "",
      fileLink: "",
    },
  })

    const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "Active": return "default";
      case "revisi": return "secondary";
      case "Draft": return "outline";
      default: return "secondary";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFieldColor = (field: string) => {
    switch (field.toLowerCase()) {
      case "teknologi": return "bg-blue-100 text-blue-800";
      case "lingkungan": return "bg-green-100 text-green-800";
      case "audit": return "bg-purple-100 text-purple-800";
      case "pendidikan": return "bg-purple-100 text-purple-800";
      case "regulasi": return "bg-orange-100 text-orange-800";
      case "energi": return "bg-yellow-100 text-yellow-800";
      case "pertanian": return "bg-yellow-100 text-yellow-800";
      case "konservasi": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://pokjappsdmlh-be.vercel.app/api/curriculum/")
        const data = await res.json()
        setCurriculums(data)
      } catch (error) {
        console.error("Failed to fetch curriculums:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredCurriculums = curriculums.filter(curriculum => {
    const matchesSearch =
      curriculum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curriculum.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesField =
      selectedField === "all" || curriculum.field.toLowerCase() === selectedField
    const matchesLevel =
      selectedLevel === "all" || curriculum.level.toLowerCase() === selectedLevel
    return matchesSearch && matchesField && matchesLevel
  })

  const onSubmit = (data: CurriculumFormData) => {
    if (editingItem) {
  
      setCurriculums(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                ...data,
                lastUpdated: new Date().toISOString(),
              }
            : item
        )
      )
      toast.success("Curriculum Updated", {
        description: "The curriculum has been updated successfully.",
      })
    } else {

      const newCurriculum: Item = {
        id: crypto.randomUUID(), 
        ...data,
        fileLink: data.fileLink || null,
        lastUpdated: new Date().toISOString(),
      }
      setCurriculums(prev => [...prev, newCurriculum])
      toast.success("Curriculum Added", {
        description: "New curriculum has been added successfully.",
      })
    }

    setIsDialogOpen(false)
    setEditingItem(null)
    form.reset()
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item)
    form.reset({
      title: item.title,
      description: item.description,
      field: item.field,
      level: item.level,
      duration: item.duration,
      modules: item.modules,
      version: item.version,
      status: item.status,
      fileLink: item.fileLink || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setCurriculums(prev => prev.filter(item => item.id !== id))
    toast.success("Curriculum Deleted", {
      description: "The curriculum has been deleted successfully.",
    })
  }

  const handleAdd = () => {
    setEditingItem(null)
    form.reset()
    setIsDialogOpen(true)
  }

  if (loading) return <LoadingScreen mode="inline" message="Loading Curriculum.." showSpinner={true} />;


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Curriculum Management</h1>
          <p className="text-muted-foreground">Manage training materials and syllabus</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Curriculum
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Curriculum" : "Add New Curriculum"}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the curriculum details." : "Add a new curriculum to the system."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 overflow-y-auto max-h-[80vh] p-2" >
                <div className="grid grid-cols-2 gap-1">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter curriculum title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter curriculum description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="field"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Teknologi">Teknologi</SelectItem>
                            <SelectItem value="Lingkungan">Lingkungan</SelectItem>
                            <SelectItem value="Audit">Audit</SelectItem>
                            <SelectItem value="Regulasi">Regulasi</SelectItem>
                            <SelectItem value="Energi">Energi</SelectItem>
                            <SelectItem value="Konservasi">Konservasi</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Dasar">Dasar</SelectItem>
                            <SelectItem value="Menengah">Menengah</SelectItem>
                            <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 40 Jam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Modules</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Number of modules" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="version"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Version</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., v2.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Aktif">Aktif</SelectItem>
                            <SelectItem value="Revisi">Revisi</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fileLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Link</FormLabel>
                        <FormControl>
                          <Input placeholder="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingItem ? "Update" : "Add"} Curriculum
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

    
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
               <Card>
                 <CardContent className="p-6 text-center">
                   <div className="text-3xl font-bold text-primary mb-2">{curriculums.length}</div>
                   <div className="text-sm text-muted-foreground">Total Kurikulum</div>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="p-6 text-center">
                   <div className="text-3xl font-bold text-primary mb-2">{curriculums.filter(p => p.status === "Active").length}</div>
                   <div className="text-sm text-muted-foreground">Kurikulum Aktif</div>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="p-6 text-center">
                   <div className="text-3xl font-bold text-primary mb-2">{curriculums.reduce((sum, k) => sum + k.modules, 0)}</div>
                   <div className="text-sm text-muted-foreground">Total Modul</div>
                 </CardContent>
               </Card>
               <Card>
     
     
                 <Card>
                   <CardContent className="p-6 text-center">
                     <div className="text-3xl font-bold text-primary mb-2">
                       {curriculums.length > 0
                         ? format(
                           new Date(
                             Math.max(...curriculums.map(c => new Date(c.lastUpdated).getTime()))
                           ),
                           "dd MMM yyyy"
                         )
                         : "-"}
                     </div>
                     <div className="text-sm text-muted-foreground">Update Terakhir</div>
                   </CardContent>
                 </Card>
     
               </Card>
             </div>

    
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search curricula..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="teknologi">Teknologi</SelectItem>
                <SelectItem value="lingkungan">Lingkungan</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
                <SelectItem value="regulasi">Regulasi</SelectItem>
                <SelectItem value="energi">Energi</SelectItem>
                <SelectItem value="konservasi">Konservasi</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="dasar">Dasar</SelectItem>
                <SelectItem value="menengah">Menengah</SelectItem>
                <SelectItem value="lanjutan">Lanjutan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Curriculum List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curriculum</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCurriculums.map((curriculum) => (
                <TableRow key={curriculum.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{curriculum.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {curriculum.modules} modules • {curriculum.version} • {curriculum.fileLink}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {curriculum.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFieldColor(curriculum.field)}`}>
                      {curriculum.field}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(curriculum.level)}`}>
                      {curriculum.level}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{curriculum.duration}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(curriculum.status)}>
                      {curriculum.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(curriculum.lastUpdated).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(curriculum)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(curriculum.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurriculumManagement;