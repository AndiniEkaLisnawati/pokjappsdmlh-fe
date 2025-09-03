"use client"
import { useEffect, useState } from "react";
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
import axios from "axios";
import { toast } from "sonner";

const lpkSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  locations: z.string().min(1, "locations is required"),
  programs: z.string().min(1, "Programs are required"),
  status: z.string().min(1, "Status is required"),
  accreditationNumber: z.string().min(1, "Accreditation number is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  phone: z.string().min(1, "Phone is required")
});

type LPKFormData = z.infer<typeof lpkSchema>;

interface LPK {
  id: number;
  name: string;
  type: string;
  locations: string;
  programs: string[];
  status: string;
  accreditationNumber: string;
  contactPerson: string;
  phone: string;
}

const LPKManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLPK, setEditingLPK] = useState<LPK | null>(null);

  const [lpkData, setLPKData] = useState<LPK[]>([]);

  useEffect(() => {
    axios.get("https://pokjappsdmlh-be.vercel.app/api/lpk")
      .then(res => setLPKData(res.data))
      .catch(err => console.error(err))
  }, [])

  const form = useForm<LPKFormData>({
    resolver: zodResolver(lpkSchema),
    defaultValues: {
      name: "",
      type: "",
      locations: "",
      programs: "",
      status: "",
      accreditationNumber: "",
      contactPerson: "",
      phone: ""
    }
  });

  const onSubmit = async (data: LPKFormData) => {
    try {
      if (editingLPK) {
        await axios.put(`https://pokjappsdmlh-be.vercel.app/api/lpk/${editingLPK.id}`, {
          ...data,
          programs: data.programs.split(",").map(p => p.trim()),
        });
        toast.success("LPK Updated", {
          description: "LPK has been successfully updated.",
        });
      } else {
        await axios.post("https://pokjappsdmlh-be.vercel.app/api/lpk", {
          ...data,
          programs: data.programs.split(",").map(p => p.trim()),
        });
        toast.success("LPK Added", {
          description: "New LPK has been successfully added.",
        });
      }

      const res = await axios.get("https://pokjappsdmlh-be.vercel.app/api/lpk");
      setLPKData(res.data);

      setIsDialogOpen(false);
      setEditingLPK(null);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Error", { description: "Failed to save LPK." });
    }
  };

  const handleEdit = (lpk: LPK) => {
    setEditingLPK(lpk);
    form.reset({
      name: lpk.name,
      type: lpk.type,
      locations: lpk.locations,
      programs: lpk.programs.join(", "),
      status: lpk.status,
      accreditationNumber: lpk.accreditationNumber,
      contactPerson: lpk.contactPerson,
      phone: lpk.phone,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    axios.delete(`https://pokjappsdmlh-be.vercel.app/api/lpk/${id}`)

    setTimeout(() => {
      axios.get("https://pokjappsdmlh-be.vercel.app/api/lpk")
        .then(res => setLPKData(res.data))
        toast.warning("LPK Deleted",
          {
            description: "LPK has been successfully deleted.",
          });
    }, 10);
  };

  const filteredLPK = lpkData.filter(lpk => {
    const matchesSearch = lpk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lpk.locations.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                    name="locations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>locations</FormLabel>
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
                <TableHead>locations</TableHead>
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
                  <TableCell>{lpk.locations}</TableCell>
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