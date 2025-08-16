"use client"
import { useState, useEffect } from "react";
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
import axios from "axios";


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

const governmentPartnerSchema = z.object({
  name: z.string().min(1, "Partner name is required"),
  logo: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  status: z.string().min(1, "Status is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;
type GovernmentPartnerFormData = z.infer<typeof governmentPartnerSchema>;

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

interface GovernmentPartner {
  id: number;
  name: string;
  logo?: string;
  type: string;
  status: string;
  contactPerson: string;
  email: string;
  phone: string;
}

const PartnershipManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartnership, setEditingPartnership] = useState<Partnership | null>(null);
  
  // Government Partners state
  const [isGovDialogOpen, setIsGovDialogOpen] = useState(false);
  const [editingGovPartner, setEditingGovPartner] = useState<GovernmentPartner | null>(null);
  const [govSearchTerm, setGovSearchTerm] = useState("");

  const [partnerships, setPartnerships] = useState<Partnership[]>([])

    useEffect(() => {
    axios.get('http://localhost:3000/api/partnership')
    .then(res => setPartnerships(res.data))
    .catch(err => err.message)
  }, [])

  const [governmentPartners, setGovernmentPartners] = useState<GovernmentPartner[]>([
    {
      id: 1,
      name: "Pemerintah Provinsi DKI Jakarta",
      logo: "🏛️",
      type: "Pemerintah Provinsi",
      status: "Aktif",
      contactPerson: "Budi Santoso",
      email: "budi.santoso@jakarta.go.id",
      phone: "+62-21-123456"
    },
    {
      id: 2,
      name: "Kementerian Perindustrian RI",
      logo: "🏭",
      type: "Kementerian",
      status: "Aktif",
      contactPerson: "Siti Rahayu",
      email: "siti.rahayu@kemenperin.go.id",
      phone: "+62-21-789012"
    },
    {
      id: 3,
      name: "Pemerintah Provinsi Jawa Barat",
      logo: "🏞️",
      type: "Pemerintah Provinsi",
      status: "Aktif",
      contactPerson: "Ahmad Wijaya",
      email: "ahmad.wijaya@jabarprov.go.id",
      phone: "+62-22-345678"
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

  const govForm = useForm<GovernmentPartnerFormData>({
    resolver: zodResolver(governmentPartnerSchema),
    defaultValues: {
      name: "",
      logo: "",
      type: "",
      status: "",
      contactPerson: "",
      email: "",
      phone: "",
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
      toast.success("Partnership Added",
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
    toast.warning("Partnership Deleted",
      {description: "Partnership has been successfully deleted.",
    });
  };

  const onGovSubmit = (data: GovernmentPartnerFormData) => {
    if (editingGovPartner) {
      setGovernmentPartners(prev => prev.map(partner => 
        partner.id === editingGovPartner.id 
          ? { ...partner, ...data }
          : partner
      ));
      toast.success("Government Partner Updated",
        {description: "Government partner has been successfully updated.",
      });
    } else {
      const newPartner: GovernmentPartner = {
        id: Math.max(...governmentPartners.map(p => p.id), 0) + 1,
        name: data.name,
        logo: data.logo,
        type: data.type,
        status: data.status,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
      };
      setGovernmentPartners(prev => [...prev, newPartner]);
      toast.success("Government Partner Added",
        {description: "New government partner has been successfully added.",
      });
    }
    
    setIsGovDialogOpen(false);
    setEditingGovPartner(null);
    govForm.reset();
  };

  const handleGovEdit = (partner: GovernmentPartner) => {
    setEditingGovPartner(partner);
    govForm.reset(partner);
    setIsGovDialogOpen(true);
  };

  const handleGovDelete = (id: number) => {
    setGovernmentPartners(prev => prev.filter(partner => partner.id !== id));
    toast.warning("Government Partner Deleted",
      {description: "Government partner has been successfully deleted.",
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

  const filteredGovPartners = governmentPartners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(govSearchTerm.toLowerCase()) ||
                         partner.contactPerson.toLowerCase().includes(govSearchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(govSearchTerm.toLowerCase());
    return matchesSearch;
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


      <Card className="mt-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Government Partners ({filteredGovPartners.length})
            </CardTitle>
            <Dialog open={isGovDialogOpen} onOpenChange={setIsGovDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingGovPartner(null); govForm.reset(); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Government Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingGovPartner ? "Edit Government Partner" : "Add New Government Partner"}</DialogTitle>
                </DialogHeader>
                <Form {...govForm}>
                  <form onSubmit={govForm.handleSubmit(onGovSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={govForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Partner Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={govForm.control}
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
                                <SelectItem value="Kementerian">Kementerian</SelectItem>
                                <SelectItem value="Pemerintah Provinsi">Pemerintah Provinsi</SelectItem>
                                <SelectItem value="Pemerintah Kabupaten">Pemerintah Kabupaten</SelectItem>
                                <SelectItem value="Lembaga Negara">Lembaga Negara</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={govForm.control}
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
                                <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={govForm.control}
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
                        control={govForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={govForm.control}
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
                      <FormField
                        control={govForm.control}
                        name="logo"
                        render={({ }) => (
                          <FormItem>
                            <FormLabel>Logo/Image</FormLabel>
                            <FormControl>
                              <Input type="file" accept="image/*" placeholder="Upload logo" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsGovDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingGovPartner ? "Update" : "Add"} Partner
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search government partners..." 
                className="pl-10"
                value={govSearchTerm}
                onChange={(e) => setGovSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGovPartners.map((partner) => (
              <Card key={partner.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{partner.logo || "🏛️"}</div>
                    <div>
                      <h3 className="font-medium text-sm">{partner.name}</h3>
                      <p className="text-xs text-muted-foreground">{partner.type}</p>
                    </div>
                  </div>
                  <Badge variant={partner.status === "Aktif" ? "default" : "secondary"}>
                    {partner.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>{partner.contactPerson}</div>
                  <div>{partner.email}</div>
                  <div>{partner.phone}</div>
                </div>
                <div className="flex gap-1 mt-3">
                  <Button size="sm" variant="outline" onClick={() => handleGovEdit(partner)} className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleGovDelete(partner.id)} className="flex-1">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnershipManagement;