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
import { Plus, Search, Edit, Trash2, Handshake, MapPin, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const partnershipSchema = z.object({
  partnerName: z.string().min(1, "Partner name is required"),
  scope: z.string().min(1, "Scope is required"),
  pksNumber: z.string().min(1, "PKS number is required"),
  region: z.string().min(1, "Region is required"),
  trainingsHeld: z.number().min(0, "Must be a positive number"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.string().min(1, "Status is required"),
  category: z.string().min(1, "Category is required"),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

interface Partnership {
  id: number;
  partnerName: string;
  scope: string;
  pksNumber: string;
  region: string;
  trainingsHeld: number;
  startDate: string;
  endDate: string;
  status: string;
  category: string;
}

const PartnershipManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartnership, setEditingPartnership] = useState<Partnership | null>(null);

  const [partnerships, setPartnerships] = useState<Partnership[]>([
    {
      id: 1,
      partnerName: "Pemerintah Provinsi DKI Jakarta",
      scope: "Pelatihan Pengelolaan Sampah dan Limbah B3",
      pksNumber: "PKS-001/KLHK/2024",
      region: "DKI Jakarta",
      trainingsHeld: 3,
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "Aktif",
      category: "Pemda Provinsi"
    },
    {
      id: 2,
      partnerName: "Kementerian Perindustrian RI",
      scope: "Sertifikasi Green Industry dan Teknologi Bersih",
      pksNumber: "PKS-002/KLHK/2024",
      region: "Nasional",
      trainingsHeld: 5,
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      status: "Aktif",
      category: "Kementerian"
    },
    {
      id: 3,
      partnerName: "Pemerintah Provinsi Jawa Barat",
      scope: "Pelatihan AMDAL dan UKL-UPL",
      pksNumber: "PKS-003/KLHK/2024",
      region: "Jawa Barat",
      trainingsHeld: 2,
      startDate: "2024-03-10",
      endDate: "2024-12-15",
      status: "Aktif",
      category: "Pemda Provinsi"
    },
    {
      id: 4,
      partnerName: "Kementerian ESDM",
      scope: "Pelatihan Monitoring Kualitas Air dan Udara",
      pksNumber: "PKS-004/KLHK/2024",
      region: "Nasional",
      trainingsHeld: 4,
      startDate: "2024-01-20",
      endDate: "2024-10-31",
      status: "Selesai",
      category: "Kementerian"
    }
  ]);

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      partnerName: "",
      scope: "",
      pksNumber: "",
      region: "",
      trainingsHeld: 0,
      startDate: "",
      endDate: "",
      status: "",
      category: "",
    }
  });

  const onSubmit = (data: PartnershipFormData) => {
    if (editingPartnership) {
      setPartnerships(prev => prev.map(partnership => 
        partnership.id === editingPartnership.id 
          ? { ...partnership, ...data }
          : partnership
      ));
      toast.success("Partnership Updated",
        {description: "Partnership has been successfully updated.",
      });
    } else {
      const newPartnership: Partnership = {
        id: Math.max(...partnerships.map(p => p.id), 0) + 1,
        partnerName: data.partnerName,
        scope: data.scope,
        pksNumber: data.pksNumber,
        region: data.region,
        trainingsHeld: data.trainingsHeld,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        category: data.category,
      };
      setPartnerships(prev => [...prev, newPartnership]);
      toast("Partnership Added",
        {description: "New partnership has been successfully added.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingPartnership(null);
    form.reset();
  };

  const handleEdit = (partnership: Partnership) => {
    setEditingPartnership(partnership);
    form.reset(partnership);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setPartnerships(prev => prev.filter(partnership => partnership.id !== id));
    toast("Partnership Deleted",
      {description: "Partnership has been successfully deleted.",
   
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'default';
      case 'Selesai': return 'secondary';
      case 'Ditunda': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredPartnerships = partnerships.filter(partnership => {
    const matchesSearch = partnership.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.scope.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.pksNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || partnership.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || partnership.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Partnership Management</h1>
          <p className="text-muted-foreground">Manage training partnerships and PKS agreements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingPartnership(null); form.reset(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Partnership
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPartnership ? "Edit Partnership" : "Add New Partnership"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="partnerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partner Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Kementerian">Kementerian</SelectItem>
                            <SelectItem value="Pemda Provinsi">Pemda Provinsi</SelectItem>
                            <SelectItem value="Pemda Kabupaten">Pemda Kabupaten</SelectItem>
                            <SelectItem value="Swasta">Swasta</SelectItem>
                            <SelectItem value="NGO">NGO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pksNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PKS Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="trainingsHeld"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trainings Held</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
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
                            <SelectItem value="Aktif">Aktif</SelectItem>
                            <SelectItem value="Selesai">Selesai</SelectItem>
                            <SelectItem value="Ditunda">Ditunda</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="scope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scope</FormLabel>
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
                    {editingPartnership ? "Update" : "Add"} Partnership
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
            <div className="text-2xl font-bold text-primary">{partnerships.length}</div>
            <div className="text-sm text-muted-foreground">Total Partnerships</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {partnerships.filter(p => p.status === "Aktif").length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {partnerships.filter(p => p.category === "Kementerian").length}
            </div>
            <div className="text-sm text-muted-foreground">Kementerian</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {partnerships.reduce((sum, p) => sum + p.trainingsHeld, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Trainings</div>
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
                  placeholder="Search partnerships..." 
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
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Ditunda">Ditunda</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Kementerian">Kementerian</SelectItem>
                <SelectItem value="Pemda Provinsi">Pemda Provinsi</SelectItem>
                <SelectItem value="Swasta">Swasta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

  
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Handshake className="w-5 h-5" />
            Partnership List ({filteredPartnerships.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>PKS Number</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Trainings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartnerships.map((partnership) => (
                <TableRow key={partnership.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{partnership.partnerName}</div>
                      <div className="text-sm text-muted-foreground">{partnership.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">{partnership.pksNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm max-w-xs line-clamp-2">{partnership.scope}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {partnership.region}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {partnership.trainingsHeld}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(partnership.status)}>
                      {partnership.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(partnership.startDate).toLocaleDateString('id-ID')}</div>
                      <div className="text-muted-foreground">
                        to {new Date(partnership.endDate).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(partnership)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(partnership.id)}>
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

export default PartnershipManagement;