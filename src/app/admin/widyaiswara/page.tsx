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
import { Search, Plus, Edit, Trash2, Users, Mail, Phone, Award, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const widyaiswaraSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  specialization: z.string().min(1, "Specialization is required"),
  experience: z.string().min(1, "Experience is required"),
  education: z.string().min(1, "Education is required"),
  certifications: z.string().optional(),
  bio: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  avatar: z.string().optional(),
});

type WidyaiswaraFormData = z.infer<typeof widyaiswaraSchema>;

const WidyaiswaraManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Widyaiswara | null>(null);

  const form = useForm<WidyaiswaraFormData>({
    resolver: zodResolver(widyaiswaraSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
      education: "",
      certifications: "",
      bio: "",
      status: "",
      avatar: "",
    },
  });

  const [widyaiswaras, setWidyaiswaras] = useState([
    {
      id: 1,
      name: "Dr. Ahmad Santoso",
      email: "ahmad.santoso@pokjappsdm.id",
      phone: "+62-21-786-7222",
      specialization: "Environmental Management",
      experience: "15 Years",
      education: "Ph.D in Environmental Science",
      certifications: "ISO 14001 Lead Auditor, AMDAL Certified",
      bio: "Expert in environmental management systems and sustainability practices.",
      status: "Active",
      avatar: "/placeholder.svg",
      trainingsCount: 25,
      participantsCount: 450
    },
    {
      id: 2,
      name: "Prof. Dr. Siti Rahayu",
      email: "siti.rahayu@pokjappsdm.id",
      phone: "+62-22-250-0935",
      specialization: "Green Technology",
      experience: "20 Years",
      education: "Professor in Environmental Engineering",
      certifications: "Green Technology Expert, Renewable Energy Certified",
      bio: "Leading researcher in green technology and renewable energy systems.",
      status: "Active",
      avatar: "/placeholder.svg",
      trainingsCount: 30,
      participantsCount: 600
    },
    {
      id: 3,
      name: "Dr. Budi Hartono",
      email: "budi.hartono@pokjappsdm.id",
      phone: "+62-274-544-008",
      specialization: "Environmental Assessment",
      experience: "12 Years",
      education: "Ph.D in Environmental Assessment",
      certifications: "AMDAL Expert, Environmental Consultant",
      bio: "Specialist in environmental impact assessment and sustainable development.",
      status: "Active",
      avatar: "/placeholder.svg",
      trainingsCount: 18,
      participantsCount: 320
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'secondary';
      case 'On Leave': return 'outline';
      default: return 'secondary';
    }
  };

  const getSpecializationColor = (specialization: string) => {
    switch (specialization) {
      case 'Environmental Management': return 'bg-green-100 text-green-800';
      case 'Green Technology': return 'bg-blue-100 text-blue-800';
      case 'Environmental Assessment': return 'bg-purple-100 text-purple-800';
      case 'Waste Management': return 'bg-orange-100 text-orange-800';
      case 'Climate Change': return 'bg-red-100 text-red-800';
      case 'Renewable Energy': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredWidyaiswaras = widyaiswaras.filter(widyaiswara => {
    const matchesSearch = widyaiswara.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widyaiswara.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widyaiswara.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === "all" || 
                                  widyaiswara.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());
    const matchesStatus = selectedStatus === "all" || widyaiswara.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const onSubmit = (data: WidyaiswaraFormData) => {
    if (editingItem) {
      setWidyaiswaras(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { 
              ...item, 
              ...data, 
              id: editingItem.id,
              trainingsCount: editingItem.trainingsCount,
              participantsCount: editingItem.participantsCount
            }
          : item
      ));
      toast.success("Widyaiswara Updated",
        {description: "The widyaiswara has been updated successfully.",
      });
    } else {
      const newWidyaiswara = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialization: data.specialization,
        experience: data.experience,
        education: data.education,
        certifications: data.certifications || "",
        bio: data.bio || "",
        status: data.status,
        avatar: "/placeholder.svg",
        trainingsCount: 0,
        participantsCount: 0
      };
      setWidyaiswaras(prev => [...prev, newWidyaiswara]);
      toast.success("Widyaiswara Added",
        {description: "New widyaiswara has been added successfully.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };

  type Widyaiswara = {
id?: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  education: string;
  certifications: string;
  bio: string;
  status: string;
  avatar: string;
  trainingsCount: number;
  participantsCount: number;
};

  const handleEdit = (item: Widyaiswara) => {
    setEditingItem(item);
    form.reset({
      name: item.name,
      email: item.email,
      phone: item.phone,
      specialization: item.specialization,
      experience: item.experience,
      education: item.education,
      certifications: item.certifications,
      bio: item.bio,
      status: item.status,
      avatar: item.avatar,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setWidyaiswaras(prev => prev.filter(item => item.id !== id));
    toast.warning("Widyaiswara Deleted",
      {description: "The widyaiswara has been deleted successfully.",
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
          <h1 className="text-3xl font-bold text-foreground">Widyaiswara Management</h1>
          <p className="text-muted-foreground">Manage trainers and instructors</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Widyaiswara
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Widyaiswara" : "Add New Widyaiswara"}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the widyaiswara details." : "Add a new widyaiswara to the system."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid grid-cols-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Environmental Management">Environmental Management</SelectItem>
                            <SelectItem value="Green Technology">Green Technology</SelectItem>
                            <SelectItem value="Environmental Assessment">Environmental Assessment</SelectItem>
                            <SelectItem value="Waste Management">Waste Management</SelectItem>
                            <SelectItem value="Climate Change">Climate Change</SelectItem>
                            <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 15 Years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Education</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter education background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Certifications</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter certifications (comma separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter brief biography" {...field} />
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
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="On Leave">On Leave</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ }) => (
                      <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" placeholder="Upload avatar" />
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
                    {editingItem ? "Update" : "Add"} Widyaiswara
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
            <div className="text-3xl font-bold text-primary mb-2">{widyaiswaras.length}</div>
            <div className="text-sm text-muted-foreground">Total Widyaiswara</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {widyaiswaras.filter(w => w.status === "Active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Instructors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {widyaiswaras.reduce((sum, w) => sum + w.trainingsCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Trainings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {widyaiswaras.reduce((sum, w) => sum + w.participantsCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Participants Trained</div>
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
                  placeholder="Search widyaiswara..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="environmental management">Environmental Management</SelectItem>
                <SelectItem value="green technology">Green Technology</SelectItem>
                <SelectItem value="environmental assessment">Environmental Assessment</SelectItem>
                <SelectItem value="waste management">Waste Management</SelectItem>
                <SelectItem value="climate change">Climate Change</SelectItem>
                <SelectItem value="renewable energy">Renewable Energy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Widyaiswara List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWidyaiswaras.map((widyaiswara) => (
                <TableRow key={widyaiswara.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {widyaiswara.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{widyaiswara.name}</div>
                        <div className="text-sm text-muted-foreground">{widyaiswara.education}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        {widyaiswara.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {widyaiswara.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSpecializationColor(widyaiswara.specialization)}`}>
                      {widyaiswara.specialization}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Award className="w-4 h-4" />
                      {widyaiswara.experience}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <BookOpen className="w-3 h-3" />
                        {widyaiswara.trainingsCount} trainings
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {widyaiswara.participantsCount} participants
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(widyaiswara.status)}>
                      {widyaiswara.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(widyaiswara)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(widyaiswara.id)}>
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

export default WidyaiswaraManagement;