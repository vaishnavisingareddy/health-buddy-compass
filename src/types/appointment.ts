export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  location: string;
  image: string;
  availableSlots: TimeSlot[];
  consultationFee: number;
  languages: string[];
  bio: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
  type: 'online' | 'in-person';
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
  type: 'online' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  consultationFee: number;
}
