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

// --- Zod schema, type, and helpers ---
const widyaiswaraSchema = z.object({
  name: z.string().min(1, "Name is required"),
  photo: z.string().optional(),
  expertise: z.array(z.string().min(1, "Expertise is required")),
  position: z.string().min(1, "Position is required"),
  education: z.string().min(1, "Education is required"),
  experience: z.string().min(1, "Experience is required"),
  certifications: z.array(z.string().min(1, "Certification is required")),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  trainings_conducted: z.number().min(0, "Trainings conducted is required"),
  participants_trained: z.number().min(0, "Participants trained is required"),
  status: z.string().min(1, "Status is required"),
  type: z.string().min(1, "Type is required"),
});

type WidyaiswaraFormData = z.infer<typeof widyaiswaraSchema>;

type Widyaiswara = WidyaiswaraFormData & { id: number };

const statusOptions = [
  { value: "Aktif", label: "Aktif" },
  { value: "Non-Aktif", label: "Non-Aktif" },
  { value: "Cuti", label: "Cuti" },
];

const expertiseOptions = [
  "Manajemen Lingkungan",
  "Teknologi Hijau",
  "Energi Terbarukan",
  "Penilaian Lingkungan",
  "Pengelolaan Limbah",
  "Perubahan Iklim",
];

// --- Dummy data ---
const initialWidyaiswaras: Widyaiswara[] = [
  {
    id: 1,
    name: "Dr. Ahmad Wijaya, S.T., M.T.",
    photo: "/placeholder.svg",
    expertise: ["Teknologi Hijau", "Energi Terbarukan", "Manajemen Lingkungan"],
    position: "Widyaiswara Madya",
    education: "S3 Teknik Lingkungan - ITB",
    experience: "15 Tahun",
    certifications: ["ISO 14001 Lead Auditor", "Certified Environmental Professional"],
    email: "ahmad.wijaya@ppsdmlh.go.id",
    phone: "+62 21 1234567",
    trainings_conducted: 45,
    participants_trained: 1250,
    status: "Aktif",
    type: "Internal"
  },
  {
    id: 2,
    name: "Ir. Siti Rahmawati, M.Env.",
    photo: "/placeholder.svg",
    expertise: ["Manajemen Lingkungan", "Penilaian Lingkungan"],
    position: "Widyaiswara Muda",
    education: "S2 Ilmu Lingkungan - UI",
    experience: "8 Tahun",
    certifications: ["Certified Environmental Impact Assessor"],
    email: "siti.rahmawati@ppsdmlh.go.id",
    phone: "+62 21 7654321",
    trainings_conducted: 28,
    participants_trained: 700,
    status: "Non-Aktif",
    type: "Internal"
  },
  {
    id: 3,
    name: "Budi Santoso, S.T.",
    photo: "/placeholder.svg",
    expertise: ["Pengelolaan Limbah"],
    position: "Widyaiswara Pertama",
    education: "S1 Teknik Kimia - UGM",
    experience: "5 Tahun",
    certifications: ["Waste Management Specialist"],
    email: "budi.santoso@ppsdmlh.go.id",
    phone: "+62 21 9876543",
    trainings_conducted: 12,
    participants_trained: 320,
    status: "Cuti",
    type: "Eksternal"
  }
];

// --- Helper for status badge color ---
const getStatusColor = (status: string) => {
  switch (status) {
    case "Aktif": return "default";
    case "Non-Aktif": return "secondary";
    case "Cuti": return "outline";
    default: return "secondary";
  }
};

// --- Helper for expertise badge color ---


const WidyaiswaraManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Widyaiswara | null>(null);

  const [widyaiswaras, setWidyaiswaras] = useState<Widyaiswara[]>(initialWidyaiswaras);

  const form = useForm<WidyaiswaraFormData>({
    resolver: zodResolver(widyaiswaraSchema),
    defaultValues: {
      name: "",
      photo: "",
      expertise: [],
      position: "",
      education: "",
      experience: "",
      certifications: [],
      email: "",
      phone: "",
      trainings_conducted: 0,
      participants_trained: 0,
      status: "",
      type: "",
    },
  });

  // --- Filtering logic ---
  const filteredWidyaiswaras = widyaiswaras.filter(widyaiswara => {
    const matchesSearch =
      widyaiswara.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widyaiswara.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ||
      widyaiswara.status.toLowerCase() === selectedStatus.toLowerCase();

    const matchesExpertise =
      selectedExpertise === "all" ||
      widyaiswara.expertise.map(e => e.toLowerCase()).includes(selectedExpertise.toLowerCase());

    return matchesSearch && matchesStatus && matchesExpertise;
  });

  // --- Form submit handler ---
  const onSubmit = (data: WidyaiswaraFormData) => {
    if (editingItem) {
      setWidyaiswaras(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? { ...item, ...data }
            : item
        )
      );
      toast.success("Widyaiswara Updated", {
        description: "The widyaiswara has been updated successfully.",
      });
    } else {
      const newWidyaiswara: Widyaiswara = {
        ...data,
        id: Date.now(),
      };
      setWidyaiswaras(prev => [...prev, newWidyaiswara]);
      toast.success("Widyaiswara Added", {
        description: "New widyaiswara has been added successfully.",
      });
    }
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };

  // --- Edit handler ---
  const handleEdit = (item: Widyaiswara) => {
    setEditingItem(item);
    form.reset({
      name: item.name,
      photo: item.photo,
      expertise: item.expertise,
      position: item.position,
      education: item.education,
      experience: item.experience,
      certifications: item.certifications,
      email: item.email,
      phone: item.phone,
      trainings_conducted: item.trainings_conducted,
      participants_trained: item.participants_trained,
      status: item.status,
      type: item.type,
    });
    setIsDialogOpen(true);
  };

  // --- Delete handler ---
  const handleDelete = (id: number) => {
    setWidyaiswaras(prev => prev.filter(item => item.id !== id));
    toast.warning("Widyaiswara Deleted", {
      description: "The widyaiswara has been deleted successfully.",
    });
  };

  // --- Add handler ---
  const handleAdd = () => {
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(true);
  };

  // --- Certifications field helper (comma separated <-> array) ---
  const certificationsToString = (certs: string[]) => certs.join(", ");
  const certificationsFromString = (str: string) =>
    str.split(",").map(s => s.trim()).filter(Boolean);

  // --- Expertise field helper (multi select) ---
  const expertiseFromString = (str: string) =>
    str.split(",").map(s => s.trim()).filter(Boolean);

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
              <form
                onSubmit={form.handleSubmit((data) => {
                  // Convert certifications and expertise from string if needed
                  const fixedData: WidyaiswaraFormData = {
                    ...data,
                    certifications:
                      typeof data.certifications === "string"
                        ? certificationsFromString(data.certifications)
                        : data.certifications,
                    expertise:
                      typeof data.expertise === "string"
                        ? expertiseFromString(data.expertise)
                        : data.expertise,
                  };
                  onSubmit(fixedData);
                })}
                className="space-y-5 overflow-y-auto max-h-[75vh] p-2"
              >
                <div className="grid grid-cols-2 gap-4">
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
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expertise</FormLabel>
                        <Select
                          onValueChange={(val) => field.onChange([val])}
                          defaultValue={field.value?.[0] || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select expertise" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {expertiseOptions.map(opt => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter position" {...field} />
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
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 15 Tahun" {...field} />
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
                          <Textarea
                            placeholder="Enter certifications (comma separated)"
                            value={
                              Array.isArray(field.value)
                                ? certificationsToString(field.value)
                                : field.value || ""
                            }
                            onChange={e => field.onChange(certificationsFromString(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter photo URL or leave blank" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="trainings_conducted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trainings Conducted</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="0"
                            {...field}
                            value={field.value ?? 0}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="participants_trained"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participants Trained</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="0"
                            {...field}
                            value={field.value ?? 0}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
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
                            {statusOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Internal">Internal</SelectItem>
                            <SelectItem value="Eksternal">Eksternal</SelectItem>
                          </SelectContent>
                        </Select>
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
              {widyaiswaras.filter(w => w.status === "Aktif").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Instructors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {widyaiswaras.reduce((sum, w) => sum + (w.trainings_conducted || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Trainings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {widyaiswaras.reduce((sum, w) => sum + (w.participants_trained || 0), 0)}
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
            <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                {expertiseOptions.map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value.toLowerCase()}>{opt.label}</SelectItem>
                ))}
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
                <TableHead>Expertise</TableHead>
                <TableHead>Position</TableHead>
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
                    <div className="flex flex-wrap gap-1">
                      {widyaiswara.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded-full text-xs font-medium `}
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{widyaiswara.position}</div>
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
                        {widyaiswara.trainings_conducted} trainings
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {widyaiswara.participants_trained} participants
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