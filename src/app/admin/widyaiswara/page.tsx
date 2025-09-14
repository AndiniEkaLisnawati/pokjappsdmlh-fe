"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
  Award,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios, { AxiosError } from "axios";
import LoadingScreen from "@/components/main/LoadingScreen";
import Image from "next/image";

const widyaiswaraSchema = z.object({
  name: z.string().min(1, "Name is required"),
  expertise: z.array(z.string().min(1, "Expertise is required")),
  position: z.string().min(1, "Position is required"),
  education: z.string().min(1, "Education is required"),
  experience: z.string().min(1, "Experience is required"),
  certifications: z.array(z.string().min(1, "Certification is required")),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  photo: z.string().optional(),
  trainings_conducted: z.number().min(0, "Trainings conducted is required"),
  participants_trained: z.number().min(0, "Participants trained is required"),
  status: z.string().min(1, "Status is required"),
  type: z.string().min(1, "Type is required"),
});

type WidyaiswaraFormData = z.infer<typeof widyaiswaraSchema>;
type Widyaiswara = WidyaiswaraFormData & { id: string };

const statusOptions = ["Aktif", "Non-Aktif", "Cuti"];
const expertiseOptions = [
  "Manajemen Lingkungan",
  "Teknologi Hijau",
  "Energi Terbarukan",
  "Penilaian Lingkungan",
  "Pengelolaan Limbah",
  "Perubahan Iklim",
  "Other..",
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aktif":
      return "default";
    case "Non-Aktif":
      return "secondary";
    case "Cuti":
      return "outline";
    default:
      return "secondary";
  }
};

const WidyaiswaraManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Widyaiswara | null>(null);
  const [loading, setLoading] = useState(true);
  const [widyaiswaras, setWidyaiswaras] = useState<Widyaiswara[]>([]);
  const [photos, setPhotos] = useState<File | null>(null);

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

  const fetchWidyaiswaras = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Widyaiswara[]>(
        "https://pokjappsdmlh-be.vercel.app/api/lecturer"
      );
      setWidyaiswaras(res.data);
    } catch (error: unknown) {
      const msg = error instanceof AxiosError ? error.message : "Unknown error";
      toast.error("Failed to fetch data: " + msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWidyaiswaras();
  }, []);

  const filteredWidyaiswaras = widyaiswaras.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      w.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesExpertise =
      selectedExpertise === "all" ||
      w.expertise
        .map((e) => e.toLowerCase())
        .includes(selectedExpertise.toLowerCase());
    return matchesSearch && matchesStatus && matchesExpertise;
  });

  const certificationsToString = (certs: string[]) => certs.join(", ");
  const certificationsFromString = (str: string) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  const expertiseFromString = (str: string) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const onSubmit = async (data: WidyaiswaraFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("position", data.position);
      formData.append("education", data.education);
      formData.append("experience", data.experience);
      formData.append("status", data.status);
      formData.append("type", data.type);
      formData.append("trainings_conducted", String(data.trainings_conducted));
      formData.append(
        "participants_trained",
        String(data.participants_trained)
      );
      formData.append("expertise", JSON.stringify(data.expertise));
      formData.append("certifications", JSON.stringify(data.certifications));

      if (photos) {
        formData.append("photo", photos);
      }

      if (editingItem) {
    
        const { data: res } = await axios.put<Widyaiswara>(
          `https://pokjappsdmlh-be.vercel.app/api/lecturer/${editingItem.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setWidyaiswaras((prev) =>
          prev.map((item) => (item.id === editingItem.id ? res : item))
        );
        toast.success("Updated successfully");
      } else {
        const { data: res } = await axios.post<Widyaiswara>(
          "https://pokjappsdmlh-be.vercel.app/api/lecturer",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setWidyaiswaras((prev) => [...prev, res]);
        toast.success("Added successfully");
      }
    } catch (error: unknown) {
      const msg = error instanceof AxiosError ? error.message : "Unknown error";
      toast.error("Operation failed: " + msg);
    } finally {
      setIsDialogOpen(false);
      setEditingItem(null);
      form.reset();
      setPhotos(null); 
    }
  };

  const handleEdit = (item: Widyaiswara) => {
    setEditingItem(item);
    form.reset({
      ...item,
      certifications: item.certifications ?? [],
      expertise: item.expertise ?? [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://pokjappsdmlh-be.vercel.app/api/lecturer/${id}`
      );
      setWidyaiswaras((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted successfully");
    } catch (error: unknown) {
      const msg = error instanceof AxiosError ? error.message : "Unknown error";
      toast.error("Failed to delete: " + msg);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Widyaiswara Management
            </h1>
            <p className="text-muted-foreground">
              Manage trainers and instructors
            </p>
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
                  {editingItem
                    ? "Update the widyaiswara details."
                    : "Add a new widyaiswara to the system."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => {
                    
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
                            <Input
                              type="email"
                              placeholder="Enter email address"
                              {...field}
                            />
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
                            <Input
                              placeholder="Enter phone number"
                              {...field}
                            />
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
                              {expertiseOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
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
                            <Input
                              placeholder="e.g., S2- Ph.D. Bioteknologi - Universitas Kyoto"
                              {...field}
                            />
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
                              onChange={(e) =>
                                field.onChange(
                                  certificationsFromString(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="photo"
                      render={({ }) => (
                        <FormItem>
                          <FormLabel>Photo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setPhotos(e.target.files?.[0] ?? null)
                              }
                            />
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
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
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
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusOptions.map((opt) => (
                                <SelectItem key={opt} value={opt.toLowerCase()}>
                                  {opt}
                                </SelectItem>
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Internal">Internal</SelectItem>
                              <SelectItem value="Eksternal">
                                Eksternal
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
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
              <div className="text-3xl font-bold text-primary mb-2">
                {widyaiswaras.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Widyaiswara
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {widyaiswaras.filter((w) => w.status === "Aktif").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Instructors
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {widyaiswaras.reduce(
                  (sum, w) => sum + (w.trainings_conducted || 0),
                  0
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Trainings
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {widyaiswaras.reduce(
                  (sum, w) => sum + (w.participants_trained || 0),
                  0
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Participants Trained
              </div>
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
              <Select
                value={selectedExpertise}
                onValueChange={setSelectedExpertise}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise</SelectItem>
                  {expertiseOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt} value={opt.toLowerCase()}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
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
                        <TableCell className="flex-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {widyaiswara.photo ? (
                                  <Image
                                    className="rounded-full"
                                    src={
                                      typeof widyaiswara.photo === "string" && widyaiswara.photo.startsWith("http")
                                        ? widyaiswara.photo 
                                        : photos instanceof File
                                          ? URL.createObjectURL(photos) 
                                          : "/default-avatar.png" 
                                    }
                                    width={30}
                                    height={30}
                                    alt={widyaiswara.name}
                                  />
                                ) : (
                                  widyaiswara.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                )}
                              </span>

                            </div>
                            <div>
                              <div className="font-medium">
                                {widyaiswara.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {widyaiswara.education}
                              </div>
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
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(widyaiswara)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(widyaiswara.id)}
                            >
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
          </>
        )}
      </div>
    </>
  );
};

export default WidyaiswaraManagement;
