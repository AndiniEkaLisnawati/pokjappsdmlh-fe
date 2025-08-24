"use client"
import { useState } from "react";
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

const curriculumSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  field: z.string().min(1, "Field is required"),
  level: z.string().min(1, "Level is required"),
  duration: z.string().min(1, "Duration is required"),
  modules: z.number().min(1, "Modules must be at least 1"),
  version: z.string().min(1, "Version is required"),
  status: z.string().min(1, "Status is required"),
  fileSize: z.string().optional(),
});

type CurriculumFormData = z.infer<typeof curriculumSchema>;

const CurriculumManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState< Item| null>(null);

  type Item = {
  id: number;
  title: string;
  description: string;
  field: string;
  level: string;
  duration: string;
  modules: number;
  version: string;
  status: string;
  fileSize: string;
};

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
      fileSize: "",
    },
  });

  const [curriculums, setCurriculums] = useState([
    {
      id: 1,
      title: "Kurikulum Teknologi Ramah Lingkungan",
      field: "Teknologi",
      level: "Menengah",
      duration: "50 Jam",
      lastUpdated: "2024-01-15",
      version: "v2.1",
      status: "Aktif",
      description: "Kurikulum komprehensif tentang teknologi ramah lingkungan untuk industri",
      modules: 8,
      fileSize: "2.5 MB"
    },
    {
      id: 2,
      title: "Kurikulum Manajemen Limbah B3",
      field: "Lingkungan",
      level: "Lanjutan",
      duration: "60 Jam",
      lastUpdated: "2024-02-01",
      version: "v3.0",
      status: "Aktif",
      description: "Panduan lengkap pengelolaan limbah bahan berbahaya dan beracun",
      modules: 12,
      fileSize: "3.8 MB"
    },
    {
      id: 3,
      title: "Kurikulum Audit Lingkungan",
      field: "Audit",
      level: "Lanjutan",
      duration: "80 Jam",
      lastUpdated: "2023-12-20",
      version: "v2.3",
      status: "Aktif",
      description: "Kurikulum untuk pelatihan auditor lingkungan bersertifikat",
      modules: 15,
      fileSize: "4.2 MB"
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'default';
      case 'Revisi': return 'secondary';
      case 'Draft': return 'outline';
      default: return 'secondary';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Dasar': return 'bg-green-100 text-green-800';
      case 'Menengah': return 'bg-yellow-100 text-yellow-800';
      case 'Lanjutan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFieldColor = (field: string) => {
    switch (field) {
      case 'Teknologi': return 'bg-blue-100 text-blue-800';
      case 'Lingkungan': return 'bg-green-100 text-green-800';
      case 'Audit': return 'bg-purple-100 text-purple-800';
      case 'Regulasi': return 'bg-orange-100 text-orange-800';
      case 'Energi': return 'bg-yellow-100 text-yellow-800';
      case 'Konservasi': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCurriculums = curriculums.filter(curriculum => {
    const matchesSearch = curriculum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         curriculum.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = selectedField === "all" || curriculum.field.toLowerCase() === selectedField;
    const matchesLevel = selectedLevel === "all" || curriculum.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesField && matchesLevel;
  });

  const onSubmit = (data: CurriculumFormData) => {
    if (editingItem) {
      setCurriculums(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { 
              ...item, 
              ...data, 
              id: editingItem.id,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : item
      ));
      toast.success("Curriculum Updated",
        {description: "The curriculum has been updated successfully.",
      });
    } else {
      const newCurriculum = {
        id: Date.now(),
        title: data.title,
        field: data.field,
        level: data.level,
        duration: data.duration,
        version: data.version,
        status: data.status,
        description: data.description,
        modules: data.modules,
        fileSize: data.fileSize || "",
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setCurriculums(prev => [...prev, newCurriculum]);
      toast.success("Curriculum Added",
        {description: "New curriculum has been added successfully.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };



  const handleEdit = (item: Item) => {
    setEditingItem(item);
    form.reset({
      title: item.title,
      description: item.description,
      field: item.field,
      level: item.level,
      duration: item.duration,
      modules: item.modules,
      version: item.version,
      status: item.status,
      fileSize: item.fileSize,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCurriculums(prev => prev.filter(item => item.id !== id));
    toast.success("Curriculum Deleted",
      {description: "The curriculum has been deleted successfully.",
    });
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(true);
  };

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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1" >
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
                    name="fileSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Size</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2.5 MB" {...field} />
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

    
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{curriculums.length}</div>
            <div className="text-sm text-muted-foreground">Total Curricula</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {new Set(curriculums.map(c => c.field)).size}
            </div>
            <div className="text-sm text-muted-foreground">Specialization Fields</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {curriculums.reduce((sum, c) => sum + c.modules, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Modules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {curriculums.filter(c => c.status === "Aktif").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Curricula</div>
          </CardContent>
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
                        {curriculum.modules} modules • {curriculum.version} • {curriculum.fileSize}
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