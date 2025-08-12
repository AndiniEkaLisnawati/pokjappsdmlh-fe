"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Search, Edit, Trash2, Building2, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const lpkSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  location: z.string().min(1, "Location is required"),
  programs: z.string().min(1, "Programs are required"),
  status: z.string().min(1, "Status is required"),
  accreditationNumber: z.string().min(1, "Accreditation number is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  phone: z.string().min(1, "Phone is required"),
  trainingTypes: z.string().min(1, "Training types are required"),
});

type LPKFormData = z.infer<typeof lpkSchema>;

interface LPK {
  id: number;
  name: string;
  type: string;
  location: string;
  programs: string[];
  status: string;
  accreditationNumber: string;
  contactPerson: string;
  phone: string;
  trainingTypes: string;
}

const LPKManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLPK, setEditingLPK] = useState<LPK | null>(null);

  const [lpkData, setLPKData] = useState<LPK[]>([
    {
      id: 1,
      name: "LPK Universitas Indonesia",
      type: "Perguruan Tinggi",
      location: "Depok",
      programs: ["Environmental Management", "Waste Management", "Climate Change"],
      status: "Terakreditasi",
      accreditationNumber: "ACC-LPK-2023-001",
      contactPerson: "Dr. Ahmad Santoso",
      phone: "+62-21-786-7222",
      trainingTypes: "Manajemen Lingkungan, Audit Lingkungan"
    },
    {
      id: 2,
      name: "LPK Institut Teknologi Bandung",
      type: "Perguruan Tinggi",
      location: "Bandung", 
      programs: ["Green Technology", "Renewable Energy", "Environmental Engineering"],
      status: "Terakreditasi",
      accreditationNumber: "ACC-LPK-2023-002",
      contactPerson: "Prof. Dr. Siti Rahayu",
      phone: "+62-22-250-0935",
      trainingTypes: "Teknologi Hijau, Energi Terbarukan, Teknik Lingkungan"
    },
    {
      id: 3,
      name: "LPK Universitas Gadjah Mada",
      type: "Perguruan Tinggi",
      location: "Yogyakarta",
      programs: ["Environmental Assessment", "Sustainable Development"],
      status: "Terakreditasi", 
      accreditationNumber: "ACC-LPK-2023-003",
      contactPerson: "Dr. Budi Hartono",
      phone: "+62-274-544-008",
      trainingTypes: "Penilaian Lingkungan, Pembangunan Berkelanjutan"
    },
    {
      id: 4,
      name: "LPK Politeknik Negeri Jakarta",
      type: "Perguruan Tinggi",
      location: "Jakarta",
      programs: ["Industrial Waste Management", "Environmental Monitoring"],
      status: "Proses Akreditasi",
      accreditationNumber: "PROC-LPK-2024-001",
      contactPerson: "Ir. Made Santika",
      phone: "+62-21-739-4760",
      trainingTypes: "Pengelolaan Limbah Industri, Monitoring Lingkungan"
    }
  ]);

  const form = useForm<LPKFormData>({
    resolver: zodResolver(lpkSchema),
    defaultValues: {
      name: "",
      type: "",
      location: "",
      programs: "",
      status: "",
      accreditationNumber: "",
      contactPerson: "",
      phone: "",
      trainingTypes: "",
    }
  });

  const onSubmit = (data: LPKFormData) => {
    if (editingLPK) {

      setLPKData(prev => prev.map(lpk => 
        lpk.id === editingLPK.id 
          ? { 
              ...lpk, 
              ...data, 
              programs: data.programs.split(",").map(p => p.trim())
            }
          : lpk
      ));
      toast.success("LPK Updated",
        {description: "LPK has been successfully updated.",
      });
    } else {
    
      const newLPK: LPK = {
        id: Math.max(...lpkData.map(l => l.id), 0) + 1,
        name: data.name,
        type: data.type,
        location: data.location,
        status: data.status,
        accreditationNumber: data.accreditationNumber,
        contactPerson: data.contactPerson,
        phone: data.phone,
        trainingTypes: data.trainingTypes,
        programs: data.programs.split(",").map(p => p.trim()),
      };
      setLPKData(prev => [...prev, newLPK]);
      toast.success("LPK Added",
        {description: "New LPK has been successfully added.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingLPK(null);
    form.reset();
  };

  const handleEdit = (lpk: LPK) => {
    setEditingLPK(lpk);
    form.reset({
      name: lpk.name,
      type: lpk.type,
      location: lpk.location,
      programs: lpk.programs.join(", "),
      status: lpk.status,
      accreditationNumber: lpk.accreditationNumber,
      contactPerson: lpk.contactPerson,
      phone: lpk.phone,
      trainingTypes: lpk.trainingTypes,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setLPKData(prev => prev.filter(lpk => lpk.id !== id));
    toast.warning("LPK Deleted",
      {description: "LPK has been successfully deleted.",
    });
  };

  const filteredLPK = lpkData.filter(lpk => {
    const matchesSearch = lpk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lpk.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lpk.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lpk.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
    
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">LPK Management</h1>
          <p className="text-muted-foreground">Manage Lembaga Pelatihan Kerja (LPK) data</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingLPK(null); form.reset(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add LPK
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLPK ? "Edit LPK" : "Add New LPK"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LPK Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                            <SelectItem value="Perguruan Tinggi">Perguruan Tinggi</SelectItem>
                            <SelectItem value="Lembaga Swasta">Lembaga Swasta</SelectItem>
                            <SelectItem value="Instansi Pemerintah">Instansi Pemerintah</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                            <SelectItem value="Terakreditasi">Terakreditasi</SelectItem>
                            <SelectItem value="Proses Akreditasi">Proses Akreditasi</SelectItem>
                            <SelectItem value="Belum Terakreditasi">Belum Terakreditasi</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accreditationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accreditation Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="programs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programs (comma separated)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="trainingTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Training Types</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingLPK ? "Update" : "Add"} LPK
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{lpkData.length}</div>
            <div className="text-sm text-muted-foreground">Total LPK</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {lpkData.filter(l => l.status === "Terakreditasi").length}
            </div>
            <div className="text-sm text-muted-foreground">Terakreditasi</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {lpkData.filter(l => l.status === "Proses Akreditasi").length}
            </div>
            <div className="text-sm text-muted-foreground">Proses Akreditasi</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(lpkData.flatMap(l => l.programs)).size}
            </div>
            <div className="text-sm text-muted-foreground">Total Programs</div>
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
                  placeholder="Search LPK..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Terakreditasi">Terakreditasi</SelectItem>
                <SelectItem value="Proses Akreditasi">Proses Akreditasi</SelectItem>
                <SelectItem value="Belum Terakreditasi">Belum Terakreditasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

    
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            LPK List ({filteredLPK.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>LPK Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Programs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLPK.map((lpk) => (
                <TableRow key={lpk.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lpk.name}</div>
                      <div className="text-sm text-muted-foreground">{lpk.type}</div>
                      <div className="text-xs text-muted-foreground">{lpk.accreditationNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{lpk.location}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{lpk.contactPerson}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {lpk.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lpk.status === "Terakreditasi" ? "default" : "secondary"}>
                      {lpk.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm max-w-xs">
                      {lpk.programs.slice(0, 2).join(", ")}
                      {lpk.programs.length > 2 && `... +${lpk.programs.length - 2} more`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(lpk)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(lpk.id)}>
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

export default LPKManagement;