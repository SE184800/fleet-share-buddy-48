import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Shield, Users, Building, FileText, BarChart3, Plus, Settings, Search, UserPlus, Lock, LogOut, ArrowLeft, Car, Calendar, DollarSign, TrendingUp, Download, Eye, CheckCircle, Trash2 } from "lucide-react";
import ChatBox from "@/components/ChatBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newStaffData, setNewStaffData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    province: ""
  });
  const [createdStaff, setCreatedStaff] = useState<any>(null);
  const {
    toast
  } = useToast();
  const stats = [{
    label: "Tổng nhân viên",
    value: 25,
    icon: Users,
    color: "primary"
  }, {
    label: "Showroom",
    value: 12,
    icon: Building,
    color: "success"
  }, {
    label: "Hợp đồng",
    value: 158,
    icon: FileText,
    color: "warning"
  }, {
    label: "Doanh thu (tháng)",
    value: "2.5B VNĐ",
    icon: BarChart3,
    color: "primary"
  }];
  const staffList = [{
    id: "ST001",
    name: "Nguyễn Văn Nam",
    email: "nam.nguyen@ecoshare.vn",
    role: "Staff",
    status: "active",
    groups: 3,
    province: "Hồ Chí Minh"
  }, {
    id: "ST002",
    name: "Trần Thị Lan",
    email: "lan.tran@ecoshare.vn",
    role: "Staff",
    status: "active",
    groups: 2,
    province: "Hà Nội"
  }, {
    id: "ST003",
    name: "Lê Văn Tùng",
    email: "tung.le@ecoshare.vn",
    role: "Staff",
    status: "inactive",
    groups: 0,
    province: "Đà Nẵng"
  }];
  const showrooms = [{
    id: "SR001",
    name: "EcoShare Saigon Center",
    address: "123 Nguyễn Huệ, Q1, HCM",
    manager: "Nguyễn Văn A",
    vehicles: 15,
    status: "active"
  }, {
    id: "SR002",
    name: "EcoShare Hanoi Plaza",
    address: "456 Hoàn Kiếm, Hà Nội",
    manager: "Trần Thị B",
    vehicles: 12,
    status: "active"
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "destructive";
      default:
        return "secondary";
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Hoạt động";
      case "inactive":
        return "Ngưng hoạt động";
      default:
        return "Không xác định";
    }
  };
  const handleCreateStaff = () => {
    if (!newStaffData.name || !newStaffData.email || !newStaffData.username || !newStaffData.password || !newStaffData.province) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin",
        variant: "destructive"
      });
      return;
    }

    // Simulate staff creation
    const created = {
      id: `ST${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...newStaffData
    };
    setCreatedStaff(created);
    setShowAddStaffModal(false);
    setShowSuccessModal(true);

    // Reset form
    setNewStaffData({
      name: "",
      email: "",
      username: "",
      password: "",
      province: ""
    });
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-glow">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Bảng điều khiển quản trị</h1>
            <p className="text-sm opacity-90">Quản lý toàn bộ hệ thống EcoShare</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => navigate('/login')}>
              <LogOut className="h-4 w-4 mr-1" />
              Đăng xuất
            </Button>
            <Shield className="h-8 w-8" />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map(stat => <Card key={stat.label} className="shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 text-${stat.color}`} />
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="staff" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="staff">Nhân viên</TabsTrigger>
            <TabsTrigger value="showrooms">Showroom</TabsTrigger>
            <TabsTrigger value="contracts">Hợp đồng</TabsTrigger>
            <TabsTrigger value="analytics">Phân tích</TabsTrigger>
            <TabsTrigger value="history">Lịch sử xe</TabsTrigger>
          </TabsList>

          {/* Staff Management */}
          <TabsContent value="staff">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Quản lý nhân viên</span>
                    </CardTitle>
                    <CardDescription>
                      Tạo, chỉnh sửa và quản lý tài khoản nhân viên
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-primary hover:shadow-glow" onClick={() => setShowAddStaffModal(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm nhân viên
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input placeholder="Tìm kiếm nhân viên..." className="pl-9" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {staffList.map(staff => <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{staff.name}</h3>
                          <Badge variant={getStatusColor(staff.status) as any}>
                            {getStatusText(staff.status)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>{staff.email}</span>
                          <span className="mx-2">•</span>
                          <span>{staff.province}</span>
                          <span className="mx-2">•</span>
                          <span>{staff.groups} nhóm quản lý</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-1" />
                          Chỉnh sửa
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lock className="h-4 w-4 mr-1" />
                          {staff.status === "active" ? "Khóa" : "Mở khóa"}
                        </Button>
                        {staff.status === "blocked" && <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Sa thải
                          </Button>}
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Showroom Management */}
          <TabsContent value="showrooms">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Quản lý Showroom</span>
                    </CardTitle>
                    <CardDescription>
                      Quản lý các showroom và hợp đồng đối tác
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-primary hover:shadow-glow">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm showroom
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {showrooms.map(showroom => <div key={showroom.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{showroom.name}</h3>
                          <Badge variant={getStatusColor(showroom.status) as any}>
                            {getStatusText(showroom.status)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>{showroom.address}</span>
                          <span className="mx-2">•</span>
                          <span>Quản lý: {showroom.manager}</span>
                          <span className="mx-2">•</span>
                          <span>{showroom.vehicles} xe</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          Xem hợp đồng
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-1" />
                          Chỉnh sửa
                        </Button>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contracts */}
          <TabsContent value="contracts">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Quản lý hợp đồng</span>
                </CardTitle>
                <CardDescription>
                  Hợp đồng được phân theo nhân viên quản lý và xử lý
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[{
                  id: "HD001",
                  title: "Hợp đồng Showroom HCM",
                  staff: "Nguyễn Văn Nam",
                  type: "Showroom",
                  status: "approved",
                  value: "500M VNĐ",
                  date: "15/01/2024"
                }, {
                  id: "HD002",
                  title: "Hợp đồng đồng sở hữu VF8",
                  staff: "Trần Thị Lan",
                  type: "Xe điện",
                  status: "pending",
                  value: "1.2B VNĐ",
                  date: "20/01/2024"
                }, {
                  id: "HD003",
                  title: "Hợp đồng bảo trì xe",
                  staff: "Lê Văn Tùng",
                  type: "Bảo trì",
                  status: "approved",
                  value: "50M VNĐ",
                  date: "18/01/2024"
                }].map(contract => <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{contract.title}</h3>
                          <Badge variant={contract.status === 'approved' ? 'default' : 'secondary'}>
                            {contract.type}
                          </Badge>
                          <Badge variant={contract.status === 'approved' ? 'default' : 'outline'}>
                            {contract.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>Mã: {contract.id}</span>
                          <span className="mx-2">•</span>
                          <span>NV xử lý: {contract.staff}</span>
                          <span className="mx-2">•</span>
                          <span>Giá trị: {contract.value}</span>
                          <span className="mx-2">•</span>
                          <span>{contract.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Xem
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Tải về
                        </Button>
                        {contract.status === 'pending' && <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Duyệt
                          </Button>}
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Phân tích & Báo cáo AI</span>
                </CardTitle>
                <CardDescription>
                  Phân tích dữ liệu hệ thống với AI và tạo báo cáo chi tiết
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" />
                      <p className="text-2xl font-bold">+25%</p>
                      <p className="text-sm text-muted-foreground">Tăng trưởng doanh thu</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">1,245</p>
                      <p className="text-sm text-muted-foreground">Người dùng hoạt động</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Car className="h-8 w-8 mx-auto mb-2 text-warning" />
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-sm text-muted-foreground">Tỷ lệ sử dụng xe</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-success" />
                      <p className="text-2xl font-bold">156M</p>
                      <p className="text-sm text-muted-foreground">Doanh thu tháng</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Phân tích xu hướng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-success/10 border border-success/20 rounded">
                          <p className="font-medium text-success">📈 Xu hướng tích cực</p>
                          <p className="text-sm">Số lượng đăng ký mới tăng 35% so với tháng trước</p>
                        </div>
                        <div className="p-3 bg-warning/10 border border-warning/20 rounded">
                          <p className="font-medium text-warning">⚠️ Cần chú ý</p>
                          <p className="text-sm">Thời gian sử dụng trung bình giảm 8% trong tuần qua</p>
                        </div>
                        <div className="p-3 bg-primary/10 border border-primary/20 rounded">
                          <p className="font-medium text-primary">💡 Gợi ý AI</p>
                          <p className="text-sm">Nên mở rộng dịch vụ tại Đà Nẵng và Cần Thơ</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Báo cáo tự động</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <p className="font-medium">Báo cáo doanh thu tháng</p>
                            <p className="text-sm text-muted-foreground">Tự động tạo mỗi ngày 1</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Tải về
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <p className="font-medium">Phân tích hiệu suất xe</p>
                            <p className="text-sm text-muted-foreground">Cập nhật hàng tuần</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <p className="font-medium">Dự báo xu hướng AI</p>
                            <p className="text-sm text-muted-foreground">Dự báo 3 tháng tới</p>
                          </div>
                          <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Phân tích
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicle History */}
          <TabsContent value="history">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Lịch sử mua bán xe</span>
                </CardTitle>
                <CardDescription>
                  Theo dõi toàn bộ lịch sử giao dịch xe trong hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-2xl font-bold text-success">142</p>
                          <p className="text-sm text-muted-foreground">Xe đã bán</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-2xl font-bold text-primary">24</p>
                          <p className="text-sm text-muted-foreground">Xe đang hoạt động</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-2xl font-bold text-warning">8</p>
                          <p className="text-sm text-muted-foreground">Xe đang bảo trì</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Giao dịch gần đây</h4>
                    {[{
                    id: "TX001",
                    type: "Mua",
                    vehicle: "VinFast VF8 2024",
                    buyer: "Nhóm HCM-Q1 (12 thành viên)",
                    seller: "VinFast Showroom HCM",
                    price: "1.2B VNĐ",
                    date: "22/01/2024",
                    status: "completed"
                  }, {
                    id: "TX002",
                    type: "Bán",
                    vehicle: "Tesla Model Y 2023",
                    buyer: "Công ty ABC",
                    seller: "Nhóm HN-Cầu Giấy (8 thành viên)",
                    price: "950M VNĐ",
                    date: "20/01/2024",
                    status: "completed"
                  }, {
                    id: "TX003",
                    type: "Mua",
                    vehicle: "Hyundai Kona Electric",
                    buyer: "Nhóm ĐN-Hải Châu (6 thành viên)",
                    seller: "Hyundai Đà Nẵng",
                    price: "750M VNĐ",
                    date: "18/01/2024",
                    status: "processing"
                  }].map(transaction => <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Badge variant={transaction.type === 'Mua' ? 'default' : 'secondary'}>
                              {transaction.type}
                            </Badge>
                            <h3 className="font-semibold">{transaction.vehicle}</h3>
                            <Badge variant={transaction.status === 'completed' ? 'default' : 'outline'}>
                              {transaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            <span>{transaction.buyer}</span>
                            <span className="mx-2">←</span>
                            <span>{transaction.seller}</span>
                            <span className="mx-2">•</span>
                            <span className="text-success font-medium">{transaction.price}</span>
                            <span className="mx-2">•</span>
                            <span>{transaction.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Chi tiết
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" />
                            Hợp đồng
                          </Button>
                        </div>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Chat Button */}
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => setShowChat(true)} size="lg" className="rounded-full bg-gradient-primary hover:shadow-glow shadow-lg">
            Phân tích AI
          </Button>
        </div>

        {/* Chat Box */}
        {showChat && <ChatBox isOpen={showChat} onClose={() => setShowChat(false)} userType="admin" />}

        {/* Add Staff Modal */}
        <dialog open={showAddStaffModal} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-background rounded-lg shadow-elegant max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            
          </div>
        </dialog>

        {/* Success Modal */}
        <dialog open={showSuccessModal} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-background rounded-lg shadow-elegant max-w-md w-full mx-4">
            
          </div>
        </dialog>
      </div>
    </div>;
}