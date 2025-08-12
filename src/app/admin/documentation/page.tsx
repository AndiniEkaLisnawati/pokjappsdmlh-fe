"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Camera, Calendar, MapPin, Users, } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const documentationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  participants: z.number().min(1, "Participants must be at least 1"),
  photos: z.number().min(0, "Photos count cannot be negative"),
  image: z.string().optional(),
});

type DocumentationFormData = z.infer<typeof documentationSchema>;

const DocumentationManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const form = useForm<DocumentationFormData>({
    resolver: zodResolver(documentationSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
      type: "",
      participants: 0,
      photos: 0,
      image: "",
    },
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Workshop Teknologi Hijau 2024",
      date: "2024-01-15",
      location: "Jakarta Convention Center",
      type: "Workshop",
      participants: 150,
      photos: 25,
      description: "Workshop tentang implementasi teknologi ramah lingkungan di industri",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Seminar Nasional Lingkungan Hidup",
      date: "2024-01-20",
      location: "Universitas Indonesia",
      type: "Seminar",
      participants: 300,
      photos: 45,
      description: "Seminar nasional tentang isu-isu terkini lingkungan hidup di Indonesia",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Pelatihan Sertifikasi ISO 14001",
      date: "2024-02-05",
      location: "Bogor",
      type: "Pelatihan",
      participants: 40,
      photos: 18,
      description: "Pelatihan sertifikasi sistem manajemen lingkungan ISO 14001",
      image: "/placeholder.svg"
    },
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Workshop': return 'bg-blue-100 text-blue-800';
      case 'Seminar': return 'bg-green-100 text-green-800';
      case 'Pelatihan': return 'bg-purple-100 text-purple-800';
      case 'Kunjungan': return 'bg-orange-100 text-orange-800';
      case 'Forum': return 'bg-teal-100 text-teal-800';
      case 'Expo': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || activity.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  const onSubmit = (data: DocumentationFormData) => {
    if (editingItem) {
      setActivities(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...data, id: editingItem.id }
          : item
      ));
      toast.success("Activity Updated",{
        description: "The activity documentation has been updated successfully."});
    } else {
      const newActivity = {
        id: Date.now(),
        title: data.title,
        date: data.date,
        location: data.location,
        type: data.type,
        participants: data.participants,
        photos: data.photos,
        description: data.description,
        image: "/placeholder.svg"
      };
      setActivities(prev => [...prev, newActivity]);
      toast.success("Activity Added",
        {description: "New activity documentation has been added successfully.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };

type Item = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  participants: number;
  photos: number;
  image: string;
};

  const handleEdit = (item: Item ) => {
    setEditingItem(item);
    form.reset({
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      type: item.type,
      participants: item.participants,
      photos: item.photos,
      image: item.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setActivities(prev => prev.filter(item => item.id !== id));
    toast.success("Activity Deleted",
      {description: "The activity documentation has been deleted successfully.",
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
          <h1 className="text-3xl font-bold text-foreground">Documentation Management</h1>
          <p className="text-muted-foreground">Manage activity documentation, photos, and reports</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Documentation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Documentation" : "Add New Documentation"}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the activity documentation details." : "Add a new activity documentation to the system."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter activity title" {...field} />
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
                          <Textarea placeholder="Enter activity description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
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
                          <Input placeholder="Enter location" {...field} />
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
                              <SelectValue placeholder="Select activity type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Seminar">Seminar</SelectItem>
                            <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                            <SelectItem value="Kunjungan">Kunjungan</SelectItem>
                            <SelectItem value="Forum">Forum</SelectItem>
                            <SelectItem value="Expo">Expo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participants</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Number of participants" 
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
                    name="photos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photos Count</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Number of photos" 
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
                    name="image"
                    render={({ }) => (
                      <FormItem>
                        <FormLabel>Cover Image</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" placeholder="Upload cover image" />
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
                    {editingItem ? "Update" : "Add"} Documentation
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
            <div className="text-3xl font-bold text-primary mb-2">{activities.length}</div>
            <div className="text-sm text-muted-foreground">Total Activities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {activities.reduce((sum, activity) => sum + activity.photos, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Photos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {new Set(activities.map(activity => activity.location)).size}
            </div>
            <div className="text-sm text-muted-foreground">Locations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {activities.reduce((sum, activity) => sum + activity.participants, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
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
                  placeholder="Search activities..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="pelatihan">Pelatihan</SelectItem>
                <SelectItem value="kunjungan">Kunjungan</SelectItem>
                <SelectItem value="forum">Forum</SelectItem>
                <SelectItem value="expo">Expo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Activity Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Photos</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {activity.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                      {activity.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(activity.date).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="w-4 h-4" />
                      {activity.participants}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Camera className="w-4 h-4" />
                      {activity.photos}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(activity)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(activity.id)}>
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

export default DocumentationManagement;