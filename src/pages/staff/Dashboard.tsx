import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  FileCheck, 
  TrendingUp, 
  Car,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  LogOut,
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Activity
} from "lucide-react";
import ChatBox from "@/components/ChatBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function StaffDashboard() {
  const [showChat, setShowChat] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const navigate = useNavigate();

  const stats = [
    { label: "Đơn chờ duyệt", value: 12, icon: Clock, color: "warning" },
    { label: "Đơn đã duyệt", value: 45, icon: CheckCircle, color: "success" },
    { label: "Nhóm quản lý", value: 8, icon: Users, color: "primary" },
    { label: "Xe hoạt động", value: 24, icon: Car, color: "primary" }
  ];

  const pendingApplications = [
    {
      id: "APP-001",
      applicant: "Nguyễn Văn A",
      vehicle: "VinFast VF8",
      ownership: "40%",
      date: "2024-01-20",
      status: "pending",
      details: {
        email: "nguyenvana@email.com",
        phone: "0123456789",
        idNumber: "001234567890",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        coOwners: [
          { name: "Trần Thị B", email: "tranthib@email.com", ownership: "35%" },
          { name: "Lê Văn C", email: "levanc@email.com", ownership: "25%" }
        ],
        totalAmount: "1,200,000,000 VNĐ"
      }
    },
    {
      id: "APP-002", 
      applicant: "Trần Thị B",
      vehicle: "Tesla Model Y",
      ownership: "35%",
      date: "2024-01-21",
      status: "pending",
      details: {
        email: "tranthib@email.com",
        phone: "0987654321",
        idNumber: "001987654321",
        address: "456 Đường XYZ, Quận 3, TP.HCM",
        coOwners: [
          { name: "Nguyễn Văn A", email: "nguyenvana@email.com", ownership: "40%" },
          { name: "Phạm Văn D", email: "phamvand@email.com", ownership: "25%" }
        ],
        totalAmount: "1,800,000,000 VNĐ"
      }
    },
    {
      id: "APP-003",
      applicant: "Lê Văn C",
      vehicle: "Hyundai Kona",
      ownership: "50%",
      date: "2024-01-22", 
      status: "pending",
      details: {
        email: "levanc@email.com",
        phone: "0369852147",
        idNumber: "001369852147",
        address: "789 Đường DEF, Quận 7, TP.HCM",
        coOwners: [
          { name: "Hoàng Thị E", email: "hoangthie@email.com", ownership: "30%" },
          { name: "Vũ Văn F", email: "vuvanf@email.com", ownership: "20%" }
        ],
        totalAmount: "800,000,000 VNĐ"
      }
    }
  ];

  const handleApprove = (appId: string) => {
    console.log("Approved application:", appId);
    // Add approval logic here
  };

  const handleReject = (appId: string) => {
    console.log("Rejected application:", appId);
    // Add rejection logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-glow">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Bảng điều khiển nhân viên</h1>
            <p className="text-sm opacity-90">Quản lý đơn đăng ký và nhóm đồng sở hữu</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate('/login')}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 text-${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Đơn đăng ký</TabsTrigger>
            <TabsTrigger value="groups">Quản lý nhóm</TabsTrigger>
            <TabsTrigger value="vehicles">Quản lý xe</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>

          {/* Applications Management */}
          <TabsContent value="applications">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5" />
                  <span>Đơn đăng ký chờ duyệt</span>
                </CardTitle>
                <CardDescription>
                  Xem xét và phê duyệt các đơn đăng ký xe điện
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{app.applicant}</h3>
                          <Badge variant="secondary">{app.vehicle}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>Mã: {app.id}</span>
                          <span className="mx-2">•</span>
                          <span>Tỷ lệ sở hữu: {app.ownership}</span>
                          <span className="mx-2">•</span>
                          <span>Ngày nộp: {app.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedApp(app)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Chi tiết
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-success border-success hover:bg-success hover:text-success-foreground"
                          onClick={() => handleApprove(app.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Duyệt
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleReject(app.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Từ chối
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Groups Management */}
          <TabsContent value="groups">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Quản lý nhóm</span>
                </CardTitle>
                <CardDescription>
                  Theo dõi và quản lý các nhóm đồng sở hữu theo tỉnh/showroom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedGroup({
                      id: "g-hcm-q1",
                      name: "Nhóm HCM - Quận 1",
                      members: 12,
                      fund: 50000000,
                      requests: [
                        { id: "req-001", type: "delete_group", description: "Yêu cầu xóa nhóm từ admin Nguyễn Văn A", date: "2024-01-20", status: "pending" },
                        { id: "req-002", type: "add_member", description: "Thêm thành viên: member@email.com", date: "2024-01-19", status: "pending" }
                      ]
                    })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Nhóm HCM - Quận 1</h3>
                          <p className="text-sm text-muted-foreground">12 thành viên</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <MapPin className="h-6 w-6 text-primary" />
                          <Badge variant="destructive" className="mt-1 text-xs">2 yêu cầu</Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Quỹ nhóm:</span>
                          <span className="font-medium">50,000,000 VNĐ</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedGroup({
                      id: "g-hn-cg",
                      name: "Nhóm HN - Cầu Giấy",
                      members: 8,
                      fund: 35000000,
                      requests: [
                        { id: "req-003", type: "remove_member", description: "Xóa thành viên: oldmember@email.com", date: "2024-01-18", status: "pending" }
                      ]
                    })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Nhóm HN - Cầu Giấy</h3>
                          <p className="text-sm text-muted-foreground">8 thành viên</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <MapPin className="h-6 w-6 text-primary" />
                          <Badge variant="destructive" className="mt-1 text-xs">1 yêu cầu</Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Quỹ nhóm:</span>
                          <span className="font-medium">35,000,000 VNĐ</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Lịch sử sử dụng xe gần đây</h4>
                  <div className="space-y-2">
                    {[
                      { user: "Nguyễn Văn A", vehicle: "VF8 - 51A-123.45", time: "8:00 - 17:00", date: "20/01/2024" },
                      { user: "Trần Thị B", vehicle: "Model Y - 30A-678.90", time: "14:00 - 20:00", date: "19/01/2024" },
                      { user: "Lê Văn C", vehicle: "Kona - 29A-111.22", time: "9:00 - 12:00", date: "19/01/2024" }
                    ].map((record, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">{record.user}</p>
                          <p className="text-sm text-muted-foreground">{record.vehicle}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p>{record.time}</p>
                          <p className="text-muted-foreground">{record.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicles Management */}
          <TabsContent value="vehicles">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Quản lý xe</span>
                </CardTitle>
                <CardDescription>
                  Theo dõi lịch sử sử dụng và trạng thái xe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Đang sử dụng</Badge>
                        <Activity className="h-4 w-4 text-success" />
                      </div>
                      <h3 className="font-semibold">VinFast VF8</h3>
                      <p className="text-sm text-muted-foreground">51A-123.45</p>
                      <div className="mt-2 text-sm">
                        <p>Người dùng: Nguyễn Văn A</p>
                        <p>Thời gian: 8:00 - 17:00</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Sẵn sàng</Badge>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold">Tesla Model Y</h3>
                      <p className="text-sm text-muted-foreground">30A-678.90</p>
                      <div className="mt-2 text-sm">
                        <p>Pin: 85%</p>
                        <p>Vị trí: Showroom Q1</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="destructive">Bảo trì</Badge>
                        <Activity className="h-4 w-4 text-destructive" />
                      </div>
                      <h3 className="font-semibold">Hyundai Kona</h3>
                      <p className="text-sm text-muted-foreground">29A-111.22</p>
                      <div className="mt-2 text-sm">
                        <p>Lý do: Thay lốp</p>
                        <p>Dự kiến: 22/01/2024</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Lịch sử bảo trì</h4>
                  <div className="space-y-3">
                    {[
                      { vehicle: "VF8 - 51A-123.45", type: "Kiểm tra định kỳ", cost: "500,000 VNĐ", date: "15/01/2024" },
                      { vehicle: "Model Y - 30A-678.90", type: "Thay pin phụ", cost: "2,500,000 VNĐ", date: "10/01/2024" },
                      { vehicle: "Kona - 29A-111.22", type: "Sửa chữa điện", cost: "1,200,000 VNĐ", date: "05/01/2024" }
                    ].map((record, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">{record.vehicle}</p>
                          <p className="text-sm text-muted-foreground">{record.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-destructive">{record.cost}</p>
                          <p className="text-sm text-muted-foreground">{record.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Báo cáo hoạt động</span>
                </CardTitle>
                <CardDescription>
                  Thống kê và phân tích hoạt động hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">142</p>
                      <p className="text-sm text-muted-foreground">Lượt sử dụng (tháng)</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-success" />
                      <p className="text-2xl font-bold">25.5M</p>
                      <p className="text-sm text-muted-foreground">Doanh thu (tháng)</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-warning" />
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">Tỷ lệ sử dụng</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Car className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">24/26</p>
                      <p className="text-sm text-muted-foreground">Xe hoạt động</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Báo cáo theo nhóm</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { group: "Nhóm HCM - Q1", usage: "45 lượt", revenue: "12.5M VNĐ" },
                          { group: "Nhóm HN - Cầu Giấy", usage: "32 lượt", revenue: "8.2M VNĐ" },
                          { group: "Nhóm ĐN - Hải Châu", usage: "28 lượt", revenue: "4.8M VNĐ" }
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                            <div>
                              <p className="font-medium">{item.group}</p>
                              <p className="text-sm text-muted-foreground">{item.usage}</p>
                            </div>
                            <p className="font-medium text-success">{item.revenue}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Xu hướng sử dụng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Thứ 2</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: '70%'}}></div>
                            </div>
                            <span className="text-sm">70%</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span>Thứ 3</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                            </div>
                            <span className="text-sm">85%</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span>Thứ 4</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: '90%'}}></div>
                            </div>
                            <span className="text-sm">90%</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span>Thứ 5</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <span className="text-sm">75%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Detail Modal */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5" />
              <span>Chi tiết đơn đăng ký - {selectedApp?.id}</span>
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đơn đăng ký đồng sở hữu xe điện
            </DialogDescription>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-6">
              {/* Vehicle Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="h-5 w-5" />
                    <span>Thông tin xe</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-lg">{selectedApp.vehicle}</h4>
                      <p className="text-muted-foreground">Tổng giá trị: {selectedApp.details.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ngày đăng ký</p>
                      <p className="font-medium">{selectedApp.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Owner Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Chủ sở hữu chính</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {selectedApp.applicant.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{selectedApp.applicant}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Chủ sở hữu chính</Badge>
                          <Badge className="bg-primary/20 text-primary">{selectedApp.ownership}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          {(parseFloat(selectedApp.ownership) * parseFloat(selectedApp.details.totalAmount.replace(/[^0-9]/g, '')) / 100).toLocaleString()} VNĐ
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedApp.details.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Số điện thoại</p>
                        <p className="font-medium">{selectedApp.details.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CCCD/CMND</p>
                        <p className="font-medium">{selectedApp.details.idNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Địa chỉ</p>
                        <p className="font-medium">{selectedApp.details.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Co-owners Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Đồng sở hữu ({selectedApp.details.coOwners.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedApp.details.coOwners.map((coOwner: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Avatar>
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            {coOwner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{coOwner.name}</h4>
                          <p className="text-sm text-muted-foreground">{coOwner.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{coOwner.ownership}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(parseFloat(coOwner.ownership) * parseFloat(selectedApp.details.totalAmount.replace(/[^0-9]/g, '')) / 100).toLocaleString()} VNĐ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ownership Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Tổng kết tỷ lệ sở hữu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Chủ sở hữu chính:</span>
                      <span className="font-semibold">{selectedApp.ownership}</span>
                    </div>
                    {selectedApp.details.coOwners.map((coOwner: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{coOwner.name}:</span>
                        <span className="font-semibold">{coOwner.ownership}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3 flex justify-between items-center font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-primary">
                        {(parseFloat(selectedApp.ownership) + selectedApp.details.coOwners.reduce((sum: number, co: any) => sum + parseFloat(co.ownership), 0))}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button 
                  variant="outline"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    handleReject(selectedApp.id);
                    setSelectedApp(null);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Từ chối
                </Button>
                <Button 
                  className="bg-gradient-primary hover:shadow-glow"
                  onClick={() => {
                    handleApprove(selectedApp.id);
                    setSelectedApp(null);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Phê duyệt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Group Details Dialog */}
      <Dialog open={selectedGroup !== null} onOpenChange={() => setSelectedGroup(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Chi tiết nhóm: {selectedGroup?.name}</span>
            </DialogTitle>
            <DialogDescription>
              Thông tin nhóm và các yêu cầu từ admin
            </DialogDescription>
          </DialogHeader>

          {selectedGroup && (
            <div className="space-y-6">
              {/* Group Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tên nhóm</p>
                      <p className="font-semibold">{selectedGroup.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Số thành viên</p>
                      <p className="font-semibold">{selectedGroup.members} người</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quỹ nhóm</p>
                      <p className="font-semibold">{selectedGroup.fund.toLocaleString()} VNĐ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Yêu cầu từ Admin</span>
                    <Badge variant="destructive">{selectedGroup.requests.length} yêu cầu</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedGroup.requests.map((request: any) => (
                      <div key={request.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={
                                request.type === "delete_group" ? "destructive" : 
                                request.type === "add_member" ? "default" : 
                                "secondary"
                              }
                            >
                              {request.type === "delete_group" ? "Xóa nhóm" : 
                               request.type === "add_member" ? "Thêm thành viên" : 
                               "Xóa thành viên"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{request.date}</span>
                          </div>
                          <Badge variant="outline">Chờ xử lý</Badge>
                        </div>
                        
                        <p className="text-sm">{request.description}</p>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-success border-success hover:bg-success hover:text-success-foreground"
                            onClick={() => {
                              console.log("Approved request:", request.id);
                              toast({
                                title: "Đã duyệt yêu cầu",
                                description: `Yêu cầu ${request.type === "delete_group" ? "xóa nhóm" : request.type === "add_member" ? "thêm thành viên" : "xóa thành viên"} đã được phê duyệt thành công.`
                              });
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Duyệt
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => {
                              console.log("Rejected request:", request.id);
                              toast({
                                title: "Đã từ chối yêu cầu",
                                description: `Yêu cầu ${request.type === "delete_group" ? "xóa nhóm" : request.type === "add_member" ? "thêm thành viên" : "xóa thành viên"} đã bị từ chối.`,
                                variant: "destructive"
                              });
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Từ chối
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedGroup(null)}>
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}