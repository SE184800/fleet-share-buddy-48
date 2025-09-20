import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  FileText, 
  Users, 
  Calendar, 
  Download,
  MessageCircle,
  Bell,
  Plus,
  Shield,
  AlertTriangle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ChatBox from "@/components/ChatBox";
import UserDropdown from "@/components/UserDropdown";
import VehicleBooking from "@/components/VehicleBooking";
import { RuleViolationPanel } from "@/components/RuleViolationPanel";
import { EmergencyDecisionDialog } from "@/components/EmergencyDecisionDialog";
import { useRuleEngine } from "@/hooks/useRuleEngine";
import { useState } from "react";

export default function CoOwnerDashboard() {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  
  // Rule Engine Demo Data
  const { 
    violations, 
    isChecking, 
    checkRules, 
    canMakeBooking, 
    resolveViolation 
  } = useRuleEngine("group-1", "user-1");

  
  // Demo function to trigger violations manually
  const triggerDemoViolations = () => {
    checkRules(
      {
        id: "schedule-1",
        userId: "user-1",
        groupId: "group-1",
        vehicleId: "vehicle-1",
        startTime: "2024-01-20T09:00:00Z",
        endTime: "2024-01-20T18:00:00Z",
        actualReturnTime: "2024-01-20T19:30:00Z", // Late return
        status: "completed",
        priority: 50,
        isEmergency: false
      },
      {
        userId: "user-1",
        groupId: "group-1",
        totalHours: 120,
        totalDays: 16,
        consecutiveDaysUsed: 16, // Exceeds 14 day limit
        violationCount: 1,
        lastUsageDate: "2024-01-19T00:00:00Z"
      },
      {
        id: "debt-1",
        userId: "user-1",
        groupId: "group-1",
        amount: 500000,
        type: "fine",
        dueDate: "2023-12-31T00:00:00Z",
        overdueDays: 18, // Exceeds 15 day limit
        status: "overdue",
        description: "Phí sử dụng xe tháng 12/2023"
      },
      {
        userId: "user-1",
        groupId: "group-1",
        ownershipPercentage: 35,
        status: "active",
        identityVerified: true,
        licenseVerified: false, // Missing license verification
        joinedAt: "2023-12-01T00:00:00Z"
      }
    );
  };
  const registrations = [
    {
      id: "VX-001",
      vehicle: "VinFast VF8",
      status: "approved",
      ownership: "35%",
      date: "2024-01-15",
      contract: "contract-vx001.pdf"
    },
    {
      id: "VX-002", 
      vehicle: "Tesla Model Y",
      status: "pending",
      ownership: "40%",
      date: "2024-01-20",
      contract: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved": return "Đã duyệt";
      case "pending": return "Đang xử lý";
      case "rejected": return "Từ chối";
      default: return "Không xác định";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-glow">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">EcoShare</h1>
              <p className="text-sm opacity-90">Bảng điều khiển chủ sở hữu</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/co-owner/vehicle-registration">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Plus className="h-4 w-4 mr-2" />
                Đăng ký xe
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
            </Button>
            <UserDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Group-based Rule Management */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Quản lý theo nhóm</h2>
          
          {/* Group 1: VinFast VF8 */}
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Car className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Nhóm VinFast VF8</CardTitle>
                    <CardDescription>5 thành viên • Xe điện</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">Đang hoạt động</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Group Members */}
              <div>
                <h4 className="font-medium mb-3">Thành viên nhóm</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: "Nguyễn Văn A", ownership: "35%", violations: 2, status: "Hoạt động" },
                    { name: "Trần Thị B", ownership: "25%", violations: 0, status: "Hoạt động" },
                    { name: "Lê Văn C", ownership: "20%", violations: 1, status: "Tạm khóa" },
                    { name: "Phạm Thị D", ownership: "15%", violations: 0, status: "Hoạt động" },
                    { name: "Hoàng Văn E", ownership: "5%", violations: 3, status: "Cảnh cáo" }
                  ].map((member, index) => (
                    <Card key={index} className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{member.name}</span>
                          <Badge variant={member.status === "Hoạt động" ? "default" : 
                                        member.status === "Tạm khóa" ? "destructive" : "secondary"}>
                            {member.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>Sở hữu: {member.ownership}</div>
                          <div>Vi phạm: {member.violations}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Group Controls */}
              <div className="flex gap-2 pt-3 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Vi phạm nhóm
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Vi phạm quy định - Nhóm VinFast VF8</DialogTitle>
                    </DialogHeader>
                    <RuleViolationPanel
                      violations={violations}
                      onResolve={resolveViolation}
                      canResolve={false}
                    />
                  </DialogContent>
                </Dialog>
                
                <EmergencyDecisionDialog
                  trigger={
                    <Button variant="outline" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Quyết định khẩn cấp
                    </Button>
                  }
                  onSubmit={(decision) => {
                    console.log("Emergency decision for VF8 group:", decision);
                  }}
                />
                
                <Button onClick={triggerDemoViolations} disabled={isChecking} size="sm">
                  {isChecking ? "Kiểm tra..." : "Demo vi phạm"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Group 2: Tesla Model Y */}
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Car className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Nhóm Tesla Model Y</CardTitle>
                    <CardDescription>3 thành viên • Xe điện</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">Đang hoạt động</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Group Members */}
              <div>
                <h4 className="font-medium mb-3">Thành viên nhóm</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: "Đỗ Văn F", ownership: "40%", violations: 0, status: "Hoạt động" },
                    { name: "Vũ Thị G", ownership: "35%", violations: 1, status: "Hoạt động" },
                    { name: "Bùi Văn H", ownership: "25%", violations: 0, status: "Hoạt động" }
                  ].map((member, index) => (
                    <Card key={index} className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{member.name}</span>
                          <Badge variant={member.status === "Hoạt động" ? "default" : 
                                        member.status === "Tạm khóa" ? "destructive" : "secondary"}>
                            {member.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>Sở hữu: {member.ownership}</div>
                          <div>Vi phạm: {member.violations}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Group Controls */}
              <div className="flex gap-2 pt-3 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Vi phạm nhóm
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Vi phạm quy định - Nhóm Tesla Model Y</DialogTitle>
                    </DialogHeader>
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-muted-foreground">Nhóm này chưa có vi phạm nào</p>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <EmergencyDecisionDialog
                  trigger={
                    <Button variant="outline" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Quyết định khẩn cấp
                    </Button>
                  }
                  onSubmit={(decision) => {
                    console.log("Emergency decision for Tesla group:", decision);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Nhóm của tôi</CardTitle>
              <CardDescription>
                Quản lý các nhóm đồng sở hữu đã tham gia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => navigate('/co-owner/groups')}>
                Xem nhóm
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Hợp đồng</CardTitle>
              <CardDescription>
                Xem và tải xuống hợp đồng đồng sở hữu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => navigate('/co-owner/contracts')}>
                Xem hợp đồng
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Booking */}
        <VehicleBooking />

        {/* Registration History */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Lịch sử đăng ký xe</span>
            </CardTitle>
            <CardDescription>
              Theo dõi trạng thái các đơn đăng ký xe điện
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registrations.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{reg.vehicle}</h3>
                      <Badge variant={getStatusColor(reg.status) as any}>
                        {getStatusText(reg.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span>Mã: {reg.id}</span>
                      <span className="mx-2">•</span>
                      <span>Tỷ lệ sở hữu: {reg.ownership}</span>
                      <span className="mx-2">•</span>
                      <span>Ngày đăng ký: {reg.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Chat Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setShowChat(true)}
            size="lg"
            className="rounded-full bg-gradient-primary hover:shadow-glow shadow-lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Hỗ trợ AI
          </Button>
        </div>

        {/* Chat Box */}
        {showChat && (
          <ChatBox
            isOpen={showChat}
            onClose={() => setShowChat(false)}
            userType="co-owner"
          />
        )}
      </div>
    </div>
  );
}