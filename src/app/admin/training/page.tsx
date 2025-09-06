"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Search, Edit, Trash2, BookOpen, Calendar, MapPin, Users, User, Clock, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";


const trainingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  instructor: z.string().min(1, "Instructor is required"),
  duration: z.string().min(1, "Duration is required"),
  participants: z.number().min(1, "Participants must be at least 1"),
  maleParticipants: z.number().min(0, "Must be a positive number"),
  femaleParticipants: z.number().min(0, "Must be a positive number"),
  trainersCount: z.number().min(1, "Must have at least 1 trainer"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().min(1, "Location is required"),
  status: z.string().min(1, "Status is required"),
  type: z.string().min(1, "Type is required"),
});

const completedTrainingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  participants: z.number().min(1, "Participants must be at least 1"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(1, "Location is required"),
  certificate: z.string().min(1, "Certificate info is required"),
  totalCertificate: z.number().min(0, "Must be a positive number"),
  satisfaction: z.number().min(1).max(5, "Rating must be between 1-5"),
});

type TrainingFormData = z.infer<typeof trainingSchema>;
type CompletedTrainingFormData = z.infer<typeof completedTrainingSchema>;

interface Training {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  participants: number;
  maleParticipants: number;
  femaleParticipants: number;
  trainersCount: number;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
  type: string;
}

interface CompletedTraining {
  id: string;
  title: string;
  participants: number;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  totalCertificate: number;
  certificate: string;
  satisfaction: number;
}

const TrainingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  

  const [isCompletedDialogOpen, setIsCompletedDialogOpen] = useState(false);
  const [editingCompletedTraining, setEditingCompletedTraining] = useState<CompletedTraining | null>(null);
  const [completedSearchTerm, setCompletedSearchTerm] = useState("");

  const [trainings, setTrainings] = useState<Training[]>([]);

  const API_TRAINING_URL = "https://pokjappsdmlh-be.vercel.app/api/training";
  const API_COMPLETED_URL = "https://pokjappsdmlh-be.vercel.app/api/completedTrainings"

  useEffect(() => {
    axios.get(API_TRAINING_URL)
    .then((res) => setTrainings(res.data))
    .catch((err) => err.message)
  }, [])

  const [completedTrainings, setCompletedTrainings] = useState<CompletedTraining[]>([]);

  useEffect(()=> {
    axios.get(API_COMPLETED_URL)
    .then((res) => setCompletedTrainings(res.data))
    .catch((err) => err.message)
  }, [])

  const form = useForm<TrainingFormData>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      title: "",
      instructor: "",
      duration: "",
      participants: 0,
      maleParticipants: 0,
      femaleParticipants: 0,
      trainersCount: 0,
      startDate: "",
      endDate: "",
      location: "",
      status: "",
      type: "",
    }
  });

  const completedForm = useForm<CompletedTrainingFormData>({
    resolver: zodResolver(completedTrainingSchema),
    defaultValues: {
      title: "",
      participants: 0,
      startDate: "",
      endDate: "",
      duration: "",
      location: "",
      certificate: "",
      totalCertificate: 0,
      satisfaction: 5,
    }
  });

  const onSubmit = async(data: TrainingFormData) => {
        const payload = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };
    if (editingTraining) {
      await axios.put(`${API_TRAINING_URL}/${editingTraining.id}`, payload)
      setTrainings(prev => prev.map(training => 
        training.id === editingTraining.id 
          ? { ...training, ...data }
          : training
      ));
      toast.success("Training Updated",
        {description: "Training has been successfully updated.",
      });
    } else {
      const res = await axios.post(API_TRAINING_URL, data)
      setTrainings(prev => [...prev, res.data]);
      toast.success("Training Added",
        {description: "New training has been successfully added.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingTraining(null);
    form.reset();
  };

  const handleEdit = async(training: Training) => {
    setEditingTraining(training);
    form.reset(training);
    setIsDialogOpen(true);
  };

  const handleDelete = async(id: string) => {
    await axios.delete(`https://pokjappsdmlh-be.vercel.app/api/training/${id}`);

    setTimeout(() => {
      axios.get("https://pokjappsdmlh-be.vercel.app/api/training")
        .then(res => setTrainings(res.data))
        toast.warning("Training Deleted",
          {
            description: "Training has been successfully deleted.",
          });
    }, 2000);
  };

  const onCompletedSubmit = async (data: CompletedTrainingFormData) => {
      const payload = {
      ...data,
      participants: Number(data.participants),
      satisfaction: Number(data.satisfaction),
      totalCertificate: Number(data.totalCertificate),
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };
    if (editingCompletedTraining) {
      await axios.put(`${API_COMPLETED_URL}/${editingCompletedTraining.id}`, payload);
      setCompletedTrainings(prev => prev.map(training => 
        training.id === editingCompletedTraining.id 
          ? { ...training, ...payload }
          : training
      ));
      toast.success("Completed Training Updated",
        {description: "Completed training has been successfully updated.",
      });
    } else {
    const res = await axios.post(API_COMPLETED_URL, data)
      setCompletedTrainings(prev => [...prev, res.data]);
      toast.success("Completed Training Added",
        {description: "New completed training has been successfully added.",
      });
    }
    
    setIsCompletedDialogOpen(false);
    setEditingCompletedTraining(null);
    completedForm.reset();
  };

  const handleCompletedEdit = async(training: CompletedTraining) => {
    setEditingCompletedTraining(training);
    completedForm.reset(training);
    setIsCompletedDialogOpen(true);
  };

  const handleCompletedDelete = async (id: string) => {
    await axios.delete(`${API_COMPLETED_URL}/${id}`);
    setCompletedTrainings(prev => prev.filter(training => training.id !== id));
    toast.success("Completed Training Deleted",
      {description: "Completed training has been successfully deleted.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing': return 'default';
      case 'Completed': return 'secondary';
      case 'Scheduled': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || training.status === statusFilter;
    const matchesType = typeFilter === "all" || training.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredCompletedTrainings = completedTrainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(completedSearchTerm.toLowerCase()) ||
                         training.location.toLowerCase().includes(completedSearchTerm.toLowerCase()) ||
                         training.certificate.toLowerCase().includes(completedSearchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Training Management</h1>
          <p className="text-muted-foreground">Manage training programs and workshops</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingTraining(null); form.reset(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Training
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTraining ? "Edit Training" : "Add New Training"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Training Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instructor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructor</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                          <Input {...field} type="text" placeholder="e.g., 3 Days" />
                        </FormControl>
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
                          <Input {...field} type="date" />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Participants</FormLabel>
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
                    name="maleParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Male Participants</FormLabel>
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
                    name="femaleParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Female Participants</FormLabel>
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
                    name="trainersCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Trainers</FormLabel>
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
                            <SelectItem value="Sertifikasi">Sertifikasi</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Seminar">Seminar</SelectItem>
                            <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                          </SelectContent>
                        </Select>
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
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="Ongoing">Ongoing</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingTraining ? "Update" : "Add"} Training
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
            <div className="text-2xl font-bold text-primary">{trainings.length + completedTrainings.length}</div>
            <div className="text-sm text-muted-foreground">Total Programs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {trainings.filter(t => t.status === "Ongoing").length}
            </div>
            <div className="text-sm text-muted-foreground">Ongoing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {trainings.filter(t => t.status === "Completed").length + completedTrainings.length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {trainings.reduce((sum, t) => sum + t.participants, 0) + completedTrainings.reduce((sum, t) => sum + t.participants, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
            <div className="flex justify-center space-x-4 mt-2">
              <div className="flex items-center justify-center mt-2">
                <Users className="w-4 h-4 text-muted-foreground mr-1" />
                <p className="text-[10px]">Ongoing : {trainings.reduce((sum, t) => sum + t.participants, 0)}</p>
              </div>
              <div className="flex items-center justify-center mt-2">
                <Users className="w-4 h-4 text-muted-foreground mr-1" />
                <p className="text-[10px]">Completed : {completedTrainings.reduce((sum, t) => sum + t.participants, 0)}</p>
              </div>
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
                  placeholder="Search trainings..." 
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
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Sertifikasi">Sertifikasi</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
                <SelectItem value="Pelatihan">Pelatihan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

    
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Training List ({filteredTrainings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Training</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{training.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(training.startDate).toLocaleDateString('id-ID')} - {new Date(training.endDate).toLocaleDateString('id-ID')}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {training.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {training.instructor}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {training.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{training.participants} total</div>
                      <div className="text-sm text-muted-foreground">
                        {training.maleParticipants}M, {training.femaleParticipants}F
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {training.trainersCount} trainers
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {training.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(training.status)}>
                      {training.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(training)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(training.id)}>
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
              <Clock className="w-5 h-5" />
              Completed Training ({filteredCompletedTrainings.length})
            </CardTitle>
            <Dialog open={isCompletedDialogOpen} onOpenChange={setIsCompletedDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingCompletedTraining(null); completedForm.reset(); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Completed Training
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingCompletedTraining ? "Edit Completed Training" : "Add New Completed Training"}</DialogTitle>
                </DialogHeader>
                <Form {...completedForm}>
                  <form onSubmit={completedForm.handleSubmit(onCompletedSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={completedForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Training Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={completedForm.control}
                        name="participants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Participants</FormLabel>
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
                        control={completedForm.control}
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
                        control={completedForm.control}
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
                      <FormField
                        control={completedForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 3 Days" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={completedForm.control}
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
                      <FormField control={completedForm.control}
                      name="totalCertificate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Total Certificate</FormLabel>
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
                        control={completedForm.control}
                        name="certificate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Certificate Link</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={completedForm.control}
                        name="satisfaction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Satisfaction Rating (1-5)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                max="5" 
                                step="0.1"
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsCompletedDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingCompletedTraining ? "Update" : "Add"} Completed Training
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
                placeholder="Search completed trainings..." 
                className="pl-10"
                value={completedSearchTerm}
                onChange={(e) => setCompletedSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Training Title</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Completion Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Certificate</TableHead>
                <TableHead>Satisfaction</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompletedTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell>
                    <div className="font-medium">{training.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {training.participants}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {new Date(training.startDate).toLocaleDateString('id-ID')}
                      {" - "}
                      {new Date(training.endDate).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {training.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {training.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link target="_blank" href={training.certificate} className="font-mono text-sm text-blue-500 text-nowrap"><span className="flex gap-2">Visit Link<ExternalLink size={16} /></span></Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      {training.satisfaction}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleCompletedEdit(training)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleCompletedDelete(training.id)}>
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

export default TrainingManagement;