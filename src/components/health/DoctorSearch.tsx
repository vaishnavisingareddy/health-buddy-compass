import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Star, Video, User, Stethoscope } from "lucide-react";
import { DOCTORS, SPECIALTIES } from "@/data/doctors";
import { Doctor, TimeSlot, Appointment } from "@/types/appointment";
import { toast } from "@/hooks/use-toast";

interface DoctorSearchProps {
  onEarnPoints?: (points: number) => void;
}

export function DoctorSearch({ onEarnPoints }: DoctorSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingReason, setBookingReason] = useState("");
  const [patientName, setPatientName] = useState("");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const filteredDoctors = DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedSlot || !bookingReason.trim() || !patientName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      patientName,
      date: selectedSlot.date,
      time: selectedSlot.time,
      type: selectedSlot.type,
      status: "scheduled",
      reason: bookingReason,
      consultationFee: selectedDoctor.consultationFee
    };

    setAppointments(prev => [...prev, newAppointment]);
    onEarnPoints?.(20); // Reward for booking appointment

    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${selectedDoctor.name} is confirmed for ${selectedSlot.date} at ${selectedSlot.time}.`
    });

    // Reset form
    setIsBookingDialogOpen(false);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setBookingReason("");
    setPatientName("");
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search doctors or specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="md:w-[200px]">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              {SPECIALTIES.map(specialty => (
                <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <Card key={doctor.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-gray-500">({doctor.experience} years exp)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {doctor.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  Consultation Fee: ₹{doctor.consultationFee}
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{doctor.bio}</p>

              <div className="flex flex-wrap gap-1">
                {doctor.languages.map(lang => (
                  <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                ))}
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => setSelectedDoctor(doctor)}>
                    View Available Slots
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Doctor Info */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <p className="text-sm text-green-600 font-medium">Fee: ₹{doctor.consultationFee}</p>
                      </div>
                    </div>

                    {/* Available Slots */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Available Time Slots</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                        {doctor.availableSlots
                          .filter(slot => slot.isAvailable)
                          .slice(0, 15) // Show first 15 available slots
                          .map(slot => (
                          <Card 
                            key={slot.id} 
                            className={`p-3 cursor-pointer transition-colors ${
                              selectedSlot?.id === slot.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4" />
                                {new Date(slot.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4" />
                                {slot.time}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                {slot.type === 'online' ? <Video className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                {slot.type === 'online' ? 'Video Call' : 'In Person'}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Booking Form */}
                    {selectedSlot && (
                      <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium">Booking Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Your full name"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                          />
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            {new Date(selectedSlot.date).toLocaleDateString()} at {selectedSlot.time}
                          </div>
                        </div>
                        <Textarea
                          placeholder="Reason for consultation (required)"
                          value={bookingReason}
                          onChange={(e) => setBookingReason(e.target.value)}
                          rows={3}
                        />
                        <Button onClick={handleBookAppointment} className="w-full bg-green-600 hover:bg-green-700 text-white">
                          Confirm Booking (₹{doctor.consultationFee})
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>

      {/* My Appointments */}
      {appointments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map(appointment => (
              <Card key={appointment.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{appointment.doctorName}</h3>
                    <Badge variant={appointment.status === 'scheduled' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {appointment.type === 'online' ? <Video className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      {appointment.type === 'online' ? 'Video Call' : 'In Person'}
                    </div>
                  </div>
                  <p className="text-sm"><strong>Reason:</strong> {appointment.reason}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorSearch;
