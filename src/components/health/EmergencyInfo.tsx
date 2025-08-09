import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function EmergencyInfo() {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const findHospitals = () => {
    if (!navigator.geolocation) {
      setMapUrl("https://www.google.com/maps/search/hospitals");
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setMapUrl(`https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`);
    }, () => setMapUrl("https://www.google.com/maps/search/hospitals"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="soft">Emergency Info</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>When to seek urgent help</DialogTitle>
        </DialogHeader>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Severe chest pain, sudden shortness of breath</li>
          <li>Uncontrolled bleeding or fainting</li>
          <li>High fever with confusion or stiff neck</li>
          <li>Severe abdominal pain after surgery</li>
        </ul>
        <div className="flex gap-2 mt-4">
          <Button variant="hero" onClick={findHospitals}>Hospitals near me</Button>
          {mapUrl && (
            <a href={mapUrl} target="_blank" rel="noreferrer" className="contents" aria-label="Open hospitals map">
              <Button variant="soft">Open map</Button>
            </a>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">If you think it’s an emergency, call local emergency services immediately.</p>
      </DialogContent>
    </Dialog>
  );
}
