import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Car, Users, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingSlot {
  id: string;
  time: string;
  date: string;
  vehicle: string;
  bookedBy: string;
  ownershipLevel: number;
  canOverride?: boolean;
}

interface Vehicle {
  id: string;
  name: string;
  available: boolean;
}

export default function VehicleBooking() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Mock data - would come from backend
  const vehicles: Vehicle[] = [
    { id: "1", name: "VinFast VF8", available: true },
    { id: "2", name: "Tesla Model Y", available: true },
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ];

  const existingBookings: BookingSlot[] = [
    {
      id: "1",
      time: "09:00",
      date: "2024-01-16",
      vehicle: "VinFast VF8",
      bookedBy: "Nguyễn Văn A (60%)",
      ownershipLevel: 60,
      canOverride: false
    },
    {
      id: "2", 
      time: "14:00",
      date: "2024-01-16",
      vehicle: "Tesla Model Y",
      bookedBy: "Trần Thị B (25%)",
      ownershipLevel: 25,
      canOverride: true
    }
  ];

  const currentUserOwnership = 35; // Mock current user ownership percentage

  const getOwnershipColor = (ownership: number) => {
    if (ownership >= 50) return "default";
    if (ownership >= 30) return "secondary";
    return "outline";
  };

  const canBookSlot = (time: string, date: string, vehicle: string) => {
    const existingBooking = existingBookings.find(
      b => b.time === time && b.date === date && b.vehicle === vehicle
    );
    
    if (!existingBooking) return true;
    
    // Can override if current user has higher ownership
    return existingBooking.ownershipLevel < currentUserOwnership;
  };

  const handleBooking = () => {
    if (!selectedVehicle || !selectedDate || !selectedTime) return;
    
    console.log("Booking:", { selectedVehicle, selectedDate, selectedTime });
    // Here would integrate with backend to create booking
  };

  const handleCancelBooking = (bookingId: string) => {
    console.log("Cancelling booking:", bookingId);
    // Here would integrate with backend to cancel booking
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Đặt lịch sử dụng xe</span>
        </CardTitle>
        <CardDescription>
          Lên lịch sử dụng xe điện trong nhóm đồng sở hữu
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Chọn xe</label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn xe" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.name}>
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span>{vehicle.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Chọn ngày</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Chọn giờ</label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn giờ" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => {
                  const canBook = selectedVehicle && selectedDate ? 
                    canBookSlot(time, selectedDate, selectedVehicle) : true;
                  
                  return (
                    <SelectItem 
                      key={time} 
                      value={time}
                      disabled={!canBook}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{time}</span>
                        {!canBook && <AlertCircle className="h-4 w-4 text-destructive" />}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleBooking}
          className="w-full bg-gradient-primary hover:shadow-glow"
          disabled={!selectedVehicle || !selectedDate || !selectedTime}
        >
          Đặt lịch
        </Button>

        {/* Existing Bookings */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Lịch đã đặt</span>
          </h4>
          <div className="space-y-3">
            {existingBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="flex items-center justify-between p-3 border rounded-lg bg-accent/20"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span className="font-medium">{booking.vehicle}</span>
                    </div>
                    <Badge variant={getOwnershipColor(booking.ownershipLevel) as "default" | "secondary" | "destructive" | "outline"}>
                      {booking.bookedBy}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {booking.date} • {booking.time}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {booking.canOverride && (
                    <Badge variant="secondary" className="text-xs bg-warning/20 text-warning-foreground">
                      Có thể thay thế
                    </Badge>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Info */}
        <div className="bg-gradient-card p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h5 className="font-medium text-sm">Thứ tự ưu tiên đặt lịch</h5>
              <p className="text-xs text-muted-foreground mt-1">
                Chủ sở hữu với tỷ lệ cao hơn sẽ được ưu tiên. Bạn có thể thay thế lịch của người có tỷ lệ sở hữu thấp hơn.
              </p>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  Tỷ lệ sở hữu của bạn: {currentUserOwnership}%
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
