import { Doctor, TimeSlot } from "@/types/appointment";

// Mock data for doctors
export const DOCTORS: Doctor[] = [
  {
    id: "dr-001",
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    rating: 4.8,
    experience: 12,
    location: "Apollo Hospital, Delhi",
    image: "/placeholder.svg",
    consultationFee: 1200,
    languages: ["Hindi", "English", "Punjabi"],
    bio: "Specialist in skin conditions, acne treatment, and cosmetic dermatology with over 12 years of experience.",
    availableSlots: generateTimeSlots("dr-001")
  },
  {
    id: "dr-002", 
    name: "Dr. Rajesh Gupta",
    specialty: "Endocrinologist",
    rating: 4.9,
    experience: 15,
    location: "Fortis Hospital, Mumbai",
    image: "/placeholder.svg",
    consultationFee: 1500,
    languages: ["Hindi", "English", "Marathi"],
    bio: "Expert in diabetes management, thyroid disorders, and hormonal imbalances.",
    availableSlots: generateTimeSlots("dr-002")
  },
  {
    id: "dr-003",
    name: "Dr. Kavitha Reddy",
    specialty: "Gynecologist",
    rating: 4.7,
    experience: 10,
    location: "Max Hospital, Hyderabad",
    image: "/placeholder.svg",
    consultationFee: 1350,
    languages: ["Telugu", "Hindi", "English"],
    bio: "Specializing in PCOS, reproductive health, and women's wellness.",
    availableSlots: generateTimeSlots("dr-003")
  },
  {
    id: "dr-004",
    name: "Dr. Arjun Mehta",
    specialty: "Cardiologist",
    rating: 4.9,
    experience: 20,
    location: "Manipal Hospital, Bangalore",
    image: "/placeholder.svg",
    consultationFee: 2000,
    languages: ["Kannada", "Hindi", "English"],
    bio: "Leading cardiologist specializing in heart disease prevention and treatment.",
    availableSlots: generateTimeSlots("dr-004")
  },
  {
    id: "dr-005",
    name: "Dr. Sunita Kapoor",
    specialty: "Psychiatrist",
    rating: 4.8,
    experience: 14,
    location: "AIIMS, New Delhi",
    image: "/placeholder.svg",
    consultationFee: 1100,
    languages: ["Hindi", "English", "Haryanvi"],
    bio: "Expert in anxiety, depression, and mental health support with a compassionate approach.",
    availableSlots: generateTimeSlots("dr-005")
  },
  {
    id: "dr-006",
    name: "Dr. Anil Kumar",
    specialty: "General Surgeon",
    rating: 4.6,
    experience: 18,
    location: "CMC Vellore, Tamil Nadu",
    image: "/placeholder.svg",
    consultationFee: 1800,
    languages: ["Tamil", "Hindi", "English"],
    bio: "Experienced surgeon specializing in minimally invasive procedures and post-operative care.",
    availableSlots: generateTimeSlots("dr-006")
  }
];

function generateTimeSlots(doctorId: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  // Generate slots for next 14 days
  for (let day = 1; day <= 14; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    
    // Skip weekends for some doctors
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const dateStr = date.toISOString().split('T')[0];
    
    // Morning slots
    const morningTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
    // Afternoon slots  
    const afternoonTimes = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
    
    [...morningTimes, ...afternoonTimes].forEach((time, index) => {
      // Randomly make some slots unavailable
      const isAvailable = Math.random() > 0.3;
      
      slots.push({
        id: `${doctorId}-${dateStr}-${time}`,
        date: dateStr,
        time,
        isAvailable,
        type: Math.random() > 0.5 ? 'online' : 'in-person'
      });
    });
  }
  
  return slots;
}

export const SPECIALTIES = [
  "All Specialties",
  "Dermatologist", 
  "Endocrinologist",
  "Gynecologist",
  "Cardiologist", 
  "Psychiatrist",
  "General Surgeon",
  "Pediatrician",
  "Orthopedist",
  "Neurologist"
];
