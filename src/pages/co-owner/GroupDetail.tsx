import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, AlertTriangle } from "lucide-react";
import QRCode from "react-qr-code";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "@/hooks/use-toast";
import { CURRENT_USER_ID, getGroupById } from "@/data/mockGroups";
import { RuleViolationPanel } from "@/components/RuleViolationPanel";
import { EmergencyDecisionDialog } from "@/components/EmergencyDecisionDialog";
import { VotingDecisionDialog } from "@/components/VotingDecisionDialog";
import { useRuleEngine } from "@/hooks/useRuleEngine";
export default function GroupDetail() {
  const {
    groupId
  } = useParams();
  const navigate = useNavigate();
  const group = useMemo(() => groupId ? getGroupById(groupId) : undefined, [groupId]);
  useSEO({
    title: group ? `${group.name} | Nhóm | EcoShare` : "Nhóm | EcoShare",
    description: group ? `Thông tin nhóm ${group.name}, chủ sở hữu, thành viên và xe.` : "Chi tiết nhóm đồng sở hữu",
    canonicalPath: group ? `/co-owner/groups/${group.id}` : "/co-owner/groups"
  });
  const [amount, setAmount] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openRemoveMember, setOpenRemoveMember] = useState(false);
  const [selectedMemberToRemove, setSelectedMemberToRemove] = useState<string>("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [confirmText, setConfirmText] = useState("");

  // Service request states
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [openServiceRequest, setOpenServiceRequest] = useState(false);
  const [paymentType, setPaymentType] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [editingRequest, setEditingRequest] = useState<string | null>(null);
  const [serviceRequests, setServiceRequests] = useState<Array<{
    id: string;
    vehicleId: string;
    vehicleName: string;
    paymentType: string;
    serviceType: string;
    description: string;
    status: "pending" | "approved" | "rejected";
    date: string;
    requester: string;
    votingStatus?: {
      approvalPercentage: number;
      ownershipPercentage: number;
      votesCount: number;
      totalMembers: number;
    };
  }>>([
    {
      id: "req-001",
      vehicleId: "car-honda-city",
      vehicleName: "Honda City",
      paymentType: "fund",
      serviceType: "Bảo dưỡng định kỳ",
      description: "Thay dầu máy và kiểm tra hệ thống phanh",
      status: "pending",
      date: "2024-01-15",
      requester: "Trần B",
      votingStatus: {
        approvalPercentage: 75,
        ownershipPercentage: 65,
        votesCount: 3,
        totalMembers: 4
      }
    },
    {
      id: "req-002", 
      vehicleId: "car-toyota-vios",
      vehicleName: "Toyota Vios",
      paymentType: "self",
      serviceType: "Sửa chữa",
      description: "Thay lốp trước bị thủng",
      status: "approved",
      date: "2024-01-10",
      requester: "Nguyễn Văn A",
      votingStatus: {
        approvalPercentage: 100,
        ownershipPercentage: 85,
        votesCount: 4,
        totalMembers: 4
      }
    },
    {
      id: "req-003",
      vehicleId: "car-honda-city", 
      vehicleName: "Honda City",
      paymentType: "fund",
      serviceType: "Rửa xe",
      description: "Rửa xe và vệ sinh nội thất",
      status: "rejected",
      date: "2024-01-08",
      requester: "Lê C",
      votingStatus: {
        approvalPercentage: 25,
        ownershipPercentage: 30,
        votesCount: 1,
        totalMembers: 4
      }
    }
  ]);

  // Rule Engine cho nhóm
  const { 
    violations, 
    isChecking, 
    checkRules, 
    resolveViolation 
  } = useRuleEngine(groupId || "", CURRENT_USER_ID);

  // Demo function để tạo vi phạm cho thành viên khác nhau
  const triggerGroupViolations = () => {
    // Tạo vi phạm cho các thành viên khác nhau trong nhóm
    const demoMembers = group?.users || [];
    
    demoMembers.forEach((member, index) => {
      checkRules(
        {
          id: `schedule-${member.id}`,
          userId: member.id,
          groupId: groupId || "",
          vehicleId: "vehicle-1",
          startTime: "2024-01-20T09:00:00Z",
          endTime: "2024-01-20T18:00:00Z",
          actualReturnTime: index % 2 === 0 ? "2024-01-20T19:30:00Z" : undefined, // Một số trả muộn
          status: "completed",
          priority: 50,
          isEmergency: false
        },
        {
          userId: member.id,
          groupId: groupId || "",
          totalHours: 80 + (index * 20),
          totalDays: 10 + (index * 3),
          consecutiveDaysUsed: index === 0 ? 16 : 8, // Thành viên đầu tiên vi phạm
          violationCount: index % 3,
          lastUsageDate: "2024-01-19T00:00:00Z"
        },
        index === 1 ? {
          id: `debt-${member.id}`,
          userId: member.id,
          groupId: groupId || "",
          amount: 500000,
          type: "fine" as const,
          dueDate: "2023-12-31T00:00:00Z",
          overdueDays: 18, // Thành viên thứ 2 nợ quá hạn
          status: "overdue" as const,
          description: "Phí sử dụng xe tháng 12/2023"
        } : undefined,
        {
          userId: member.id,
          groupId: groupId || "",
          ownershipPercentage: 35,
          status: "active" as const,
          identityVerified: true,
          licenseVerified: index !== 2, // Thành viên thứ 3 chưa xác minh bằng lái
          joinedAt: "2023-12-01T00:00:00Z"
        }
      );
    });
  };
  if (!group) {
    return <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Không tìm thấy nhóm</CardTitle>
            <CardDescription>Vui lòng kiểm tra lại liên kết.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate(-1)}>Quay lại</Button>
          </CardContent>
        </Card>
      </div>;
  }
  const owner = group.users.find(u => u.id === group.ownerId)!;
  const members = group.users.filter(u => u.id !== group.ownerId);
  const me = group.users.find(u => u.id === CURRENT_USER_ID);
  const myRole = me?.role ?? "member";

  // Mock usage percentages and monthly contributions
  const getUserUsage = (userId: string) => {
    const usageMap: Record<string, number> = {
      "owner-1": 45,
      "member-1": 35,
      "member-2": 20
    };
    return usageMap[userId] || 0;
  };
  const getMonthlyContribution = (userId: string) => {
    const usage = getUserUsage(userId);
    const baseAmount = 2000000; // 2 triệu VND base
    return Math.round(baseAmount * (usage / 100));
  };
  const min = group.minTransfer;
  const handleGenerateQR = () => {
    const amt = Number(amount);
    if (!amt || isNaN(amt) || amt < min) {
      toast({
        title: "Số tiền không hợp lệ",
        description: `Tối thiểu ${min.toLocaleString("vi-VN")} VNĐ`
      });
      setShowQR(false);
      return;
    }
    setShowQR(true);
    toast({
      title: "Đã tạo QR chuyển tiền",
      description: `${amt.toLocaleString("vi-VN")} VNĐ`
    });
  };
  const myTransactions = group.transactions.filter(t => t.userId === CURRENT_USER_ID);
  const qrValue = `ecoshare:pay?group=${group.id}&amount=${Number(amount) || 0}&currency=VND`;
  return <div className="container mx-auto p-6">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate(-1)}>← Quay lại</Button>
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <Badge variant="secondary">Vai trò của bạn: {myRole === "admin" ? "Admin" : "Member"}</Badge>
        </div>
      </header>

      {/* Thanh ngang quỹ chung + chuyển tiền + lịch sử */}
      <section className="mb-6">
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3 items-end">
              <div>
                <div className="text-sm text-muted-foreground">Quỹ chung</div>
                <div className="text-2xl font-bold">{group.fund.toLocaleString("vi-VN")} VNĐ</div>
              </div>
              <div>
                <div className="mb-3">
                  <div className="text-sm text-muted-foreground mb-2">Đóng góp hàng tháng của bạn theo tỉ lệ sử dụng:</div>
                  {me && <div className="flex items-center justify-between text-xs">
                      <span>{me.name}: {getUserUsage(me.id)}%</span>
                      <span className="font-medium text-primary">{getMonthlyContribution(me.id).toLocaleString()} VNĐ</span>
                    </div>}
                </div>
                
                <Input id="amount" type="number" min={min} placeholder={`${min}`} value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleGenerateQR} className="flex-1">Tạo QR chuyển tiền</Button>
                <Button variant="outline" onClick={() => setOpenHistory(true)}>Lịch sử giao dịch</Button>
              </div>
            </div>

            {showQR && <div className="mt-6 flex items-center gap-6">
                <div className="rounded-md border p-4 bg-background">
                  <QRCode value={qrValue} size={144} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">QR cho nhóm</div>
                  <div className="font-semibold">{group.name}</div>
                  <div className="text-sm">Số tiền: {Number(amount).toLocaleString("vi-VN")} VNĐ</div>
                </div>
              </div>}
          </CardContent>
        </Card>
      </section>

      {/* 3 phần nội dung */}
      <main className="grid gap-6 lg:grid-cols-2">
        {/* Phần 1: Profile chủ sở hữu */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Chủ sở hữu nhóm</CardTitle>
              <CardDescription>Thông tin người quản trị nhóm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={owner.avatar} alt={`Ảnh đại diện ${owner.name}`} loading="lazy" />
                    <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-semibold flex items-center gap-2">
                      {owner.name} 
                      <Badge>Admin</Badge>
                      {owner.id === CURRENT_USER_ID && <Badge variant="outline">Bạn</Badge>}
                    </div>
                    {owner.email && <div className="text-sm text-muted-foreground">{owner.email}</div>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{getUserUsage(owner.id)}%</div>
                  <div className="text-xs text-muted-foreground">Tỉ lệ sử dụng</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Phần 2: Đồng sở hữu */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Đồng sở hữu</CardTitle>
                  <CardDescription>Các thành viên trong nhóm</CardDescription>
                </div>
                {myRole === "admin" && <Button onClick={() => setOpenAddMember(true)} size="sm">
                    Thêm thành viên
                  </Button>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Chủ sở hữu */}
                

                {/* Đồng sở hữu */}
                {members.map(m => <div key={m.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={m.avatar} alt={`Ảnh đại diện ${m.name}`} loading="lazy" />
                        <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {m.name}
                          {m.id === CURRENT_USER_ID && <Badge variant="outline">Bạn</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground">Member</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">{getUserUsage(m.id)}%</div>
                        <div className="text-xs text-muted-foreground">Tỉ lệ sử dụng</div>
                      </div>
                      {myRole === "admin" && m.id !== CURRENT_USER_ID}
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Phần 3: Xe */}
        <section className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Xe của nhóm</CardTitle>
                  <CardDescription>Hình ảnh, thông tin và trạng thái</CardDescription>
                </div>
                 <div className="flex gap-2">
                   <VotingDecisionDialog
                     trigger={
                       <Button disabled={!selectedVehicle} size="sm">
                         Request dịch vụ
                       </Button>
                     }
                     onSubmit={(decision) => {
                       // Demo: Simulate voting process
                       const currentUser = group?.users.find(m => m.id === CURRENT_USER_ID);
                       const requestTitle = `Dịch vụ ${serviceType || 'bảo dưỡng'} cho xe ${selectedVehicle}`;
                       const requestDescription = `Yêu cầu từ ${currentUser?.name}: ${serviceDescription || decision.description}`;
                       
                       console.log("Service request voting:", {
                         groupId,
                         title: requestTitle,
                         description: requestDescription,
                         requester: currentUser?.name,
                         decision
                       });

                       // Demo: Simulate voting results after 3 seconds
                       toast({
                         title: "Đã tạo bỏ phiếu",
                         description: "Thành viên sẽ bỏ phiếu trong 7 ngày tới"
                       });

                       setTimeout(() => {
                         // Simulate >50% members (3/4) and >60% ownership voting yes
                         const approvalPercentage = 75; // 3/4 members = 75%
                         const ownershipPercentage = 65; // Combined ownership of yes voters
                         
                         if (approvalPercentage > 50 && ownershipPercentage > 60) {
                           toast({
                             title: "✅ Yêu cầu đã được thông qua",
                             description: `Tỷ lệ đồng ý: ${approvalPercentage}% thành viên, ${ownershipPercentage}% quyền sở hữu. Đã gửi lên staff!`,
                             duration: 5000
                           });
                           
                           // Simulate sending to staff
                           console.log("Request approved and sent to staff:", {
                             title: requestTitle,
                             description: requestDescription,
                             approvalPercentage,
                             ownershipPercentage,
                             status: "sent_to_staff"
                           });
                         } else {
                           toast({
                             title: "❌ Yêu cầu bị từ chối",
                             description: `Không đủ tỷ lệ thông qua (cần >50% thành viên và >60% quyền sở hữu)`,
                             duration: 5000
                           });
                         }
                       }, 3000);
                     }}
                   />
                  <EmergencyDecisionDialog
                    trigger={
                      <Button variant="outline" size="sm" disabled={!selectedVehicle}>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Quyết định khẩn cấp
                      </Button>
                    }
                    onSubmit={(decision) => {
                      console.log("Emergency decision for group:", groupId, decision);
                      toast({
                        title: "Quyết định khẩn cấp đã được gửi",
                        description: "Staff sẽ xem xét và phê duyệt quyết định của bạn"
                      });
                    }}
                  />
                 </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="vehicles">
                <TabsList>
                  <TabsTrigger value="vehicles">Danh sách xe</TabsTrigger>
                  <TabsTrigger value="requests">Yêu cầu dịch vụ ({serviceRequests.length})</TabsTrigger>
                  <TabsTrigger value="violations">Quản lý vi phạm ({violations.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="vehicles">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.vehicles.map(v => <div key={v.id} className={`border rounded-md p-3 cursor-pointer transition-colors ${selectedVehicle === v.id ? "border-primary bg-primary/5" : "hover:bg-accent/50"}`} onClick={() => setSelectedVehicle(v.id)}>
                        <img src={v.imageUrl} alt={`Hình ảnh xe ${v.name}`} loading="lazy" className="w-full h-32 object-cover rounded mb-2" />
                        <div className="font-semibold flex items-center gap-2">
                          {v.name}
                          {selectedVehicle === v.id && <Badge variant="outline">Đã chọn</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{v.info}</div>
                        <Badge variant={v.status === "maintenance" ? "destructive" : v.status === "in-use" ? "secondary" : "default"}>
                          {v.status === "available" ? "Sẵn sàng" : v.status === "in-use" ? "Đang sử dụng" : "Bảo dưỡng"}
                        </Badge>
                      </div>)}
                  </div>
                </TabsContent>
                
                <TabsContent value="requests">
                  <div className="space-y-3">
                    {serviceRequests.length === 0 ? <div className="text-center py-6 text-muted-foreground">
                        Chưa có yêu cầu dịch vụ nào
                      </div> : serviceRequests.map(request => <div key={request.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="font-medium">{request.vehicleName}</div>
                                <Badge variant="outline" className="text-xs">
                                  {request.requester}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{request.serviceType}</div>
                              <div className="text-sm mt-1">{request.description}</div>
                              {request.votingStatus && (
                                <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>Tỷ lệ đồng ý: {request.votingStatus.approvalPercentage}% ({request.votingStatus.votesCount}/{request.votingStatus.totalMembers})</div>
                                    <div>Quyền sở hữu: {request.votingStatus.ownershipPercentage}%</div>
                                  </div>
                                  <div className="mt-1 text-xs">
                                    {request.status === "approved" && "✅ Đã thông qua và gửi lên staff"}
                                    {request.status === "rejected" && "❌ Không đủ tỷ lệ thông qua"}
                                    {request.status === "pending" && "⏳ Đang chờ bỏ phiếu..."}
                                  </div>
                                </div>
                              )}
                              <div className="text-xs text-muted-foreground mt-2">
                                {request.paymentType === "self" ? "Tự chi trả" : "Dùng quỹ chung"} • {request.date}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={request.status === "pending" ? "secondary" : request.status === "approved" ? "default" : "destructive"}>
                                {request.status === "pending" ? "Chờ duyệt" : request.status === "approved" ? "Đã duyệt" : "Từ chối"}
                              </Badge>
                              {request.status === "pending" && <div className="flex gap-1">
                                  <Button size="sm" variant="outline" onClick={() => {
                            setEditingRequest(request.id);
                            setSelectedVehicle(request.vehicleId);
                            setPaymentType(request.paymentType);
                            setServiceType(request.serviceType);
                            setServiceDescription(request.description);
                            setOpenServiceRequest(true);
                          }}>
                                    Sửa
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => {
                            setServiceRequests(prev => prev.filter(r => r.id !== request.id));
                            toast({
                              title: "Đã xóa yêu cầu",
                              description: "Yêu cầu dịch vụ đã được xóa thành công"
                            });
                          }}>
                                    Xóa
                                  </Button>
                                </div>}
                            </div>
                          </div>
                        </div>)}
                  </div>
                </TabsContent>

                <TabsContent value="violations">
                  <div className="space-y-4">
                    {/* Rule Engine Controls */}
                    <Card className="border-l-4 border-l-orange-500">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-orange-500" />
                          <CardTitle className="text-lg">Hệ thống quản lý vi phạm nhóm</CardTitle>
                        </div>
                        <CardDescription>
                          Xem vi phạm của tất cả thành viên trong nhóm này
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Tất cả thành viên đều có thể xem vi phạm của nhau để đảm bảo tính minh bạch trong nhóm.
                          </p>
                          <Button onClick={triggerGroupViolations} disabled={isChecking}>
                            {isChecking ? "Đang kiểm tra..." : "Tạo vi phạm demo cho nhóm"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Violations Panel */}
                    <RuleViolationPanel
                      violations={violations}
                      onResolve={resolveViolation}
                      canResolve={myRole === "admin"} // Chỉ admin mới có thể resolve
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Lịch sử giao dịch */}
      <Dialog open={openHistory} onOpenChange={setOpenHistory}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lịch sử giao dịch</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="mine">
            <TabsList>
              <TabsTrigger value="mine">Của tôi</TabsTrigger>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
            </TabsList>
            <TabsContent value="mine">
              <TransactionTable rows={myTransactions.map(t => ({
              ...t,
              groupName: group.name
            }))} />
            </TabsContent>
            <TabsContent value="all">
              <TransactionTable rows={group.transactions.map(t => ({
              ...t,
              groupName: group.name
            }))} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Dialog thêm thành viên */}
      <Dialog open={openAddMember} onOpenChange={setOpenAddMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm thành viên mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email thành viên mới:</label>
              <Input value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)} placeholder="Nhập email thành viên" />
            </div>
            <div>
              <label className="text-sm font-medium">Xác nhận hành động:</label>
              <Input value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder="Nhập 'Xác nhận thêm thành viên'" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
              if (confirmText === "Xác nhận thêm thành viên" && newMemberEmail.trim()) {
                toast({
                  title: "Yêu cầu đã được gửi",
                  description: "Staff sẽ xử lý yêu cầu thêm thành viên trong 24h"
                });
                setOpenAddMember(false);
                setNewMemberEmail("");
                setConfirmText("");
              } else {
                toast({
                  title: "Thông tin không hợp lệ",
                  description: "Vui lòng nhập đúng text xác nhận và email"
                });
              }
            }} className="flex-1">
                Gửi yêu cầu
              </Button>
              <Button variant="outline" onClick={() => setOpenAddMember(false)}>
                Hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog xóa thành viên */}
      <Dialog open={openRemoveMember} onOpenChange={setOpenRemoveMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa thành viên</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm?</p>
            <div>
              <label className="text-sm font-medium">Xác nhận hành động:</label>
              <Input value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder="Nhập 'Xác nhận xóa thành viên'" />
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => {
              if (confirmText === "Xác nhận xóa thành viên") {
                toast({
                  title: "Yêu cầu đã được gửi",
                  description: "Staff sẽ xử lý yêu cầu xóa thành viên trong 24h"
                });
                setOpenRemoveMember(false);
                setConfirmText("");
                setSelectedMemberToRemove("");
              } else {
                toast({
                  title: "Text xác nhận không đúng",
                  description: "Vui lòng nhập đúng text xác nhận"
                });
              }
            }} className="flex-1">
                Gửi yêu cầu xóa
              </Button>
              <Button variant="outline" onClick={() => setOpenRemoveMember(false)}>
                Hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog yêu cầu dịch vụ */}
      <Dialog open={openServiceRequest} onOpenChange={setOpenServiceRequest}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingRequest ? "Chỉnh sửa yêu cầu dịch vụ" : "Yêu cầu dịch vụ xe"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Xe đã chọn:</Label>
              <div className="mt-1 p-2 bg-accent/30 rounded-md">
                {group.vehicles.find(v => v.id === selectedVehicle)?.name || "Chưa chọn xe"}
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Hình thức thanh toán:</Label>
              <RadioGroup value={paymentType} onValueChange={setPaymentType} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self" id="self" />
                  <Label htmlFor="self">Tự chi trả (tự lái xe đi thực hiện dịch vụ)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group">Dùng quỹ chung (gửi xe lên công ty vận hành)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Loại dịch vụ:</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Chọn loại dịch vụ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parking">Đậu xe</SelectItem>
                  <SelectItem value="wash">Rửa xe</SelectItem>
                  <SelectItem value="maintenance">Bảo dưỡng</SelectItem>
                  <SelectItem value="repair">Sửa chữa</SelectItem>
                  <SelectItem value="inspection">Kiểm định</SelectItem>
                  <SelectItem value="insurance">Bảo hiểm</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Mô tả chi tiết:</Label>
              <Textarea value={serviceDescription} onChange={e => setServiceDescription(e.target.value)} placeholder="Nhập mô tả chi tiết về dịch vụ cần thực hiện..." className="mt-1" rows={3} />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => {
              if (!selectedVehicle || !paymentType || !serviceType || !serviceDescription.trim()) {
                toast({
                  title: "Thông tin chưa đầy đủ",
                  description: "Vui lòng điền đầy đủ thông tin yêu cầu"
                });
                return;
              }
              if (editingRequest) {
                // Update existing request
                setServiceRequests(prev => prev.map(req => req.id === editingRequest ? {
                  ...req,
                  vehicleId: selectedVehicle,
                  vehicleName: group.vehicles.find(v => v.id === selectedVehicle)?.name || "",
                  paymentType,
                  serviceType,
                  description: serviceDescription
                } : req));
                toast({
                  title: "Cập nhật thành công",
                  description: "Yêu cầu dịch vụ đã được cập nhật"
                });
              } else {
                // Create new request
                const newRequest = {
                  id: `req-${Date.now()}`,
                  vehicleId: selectedVehicle,
                  vehicleName: group.vehicles.find(v => v.id === selectedVehicle)?.name || "",
                  paymentType,
                  serviceType,
                  description: serviceDescription,
                  status: "pending" as const,
                  date: new Date().toLocaleDateString("vi-VN"),
                  requester: group?.users.find(u => u.id === CURRENT_USER_ID)?.name || "Unknown"
                };
                setServiceRequests(prev => [...prev, newRequest]);
                toast({
                  title: "Gửi yêu cầu thành công",
                  description: "Staff sẽ xử lý yêu cầu của bạn trong 24h"
                });
              }

              // Reset form
              setOpenServiceRequest(false);
              setEditingRequest(null);
              setPaymentType("");
              setServiceType("");
              setServiceDescription("");
            }} className="flex-1">
                {editingRequest ? "Cập nhật yêu cầu" : "Gửi yêu cầu"}
              </Button>
              <Button variant="outline" onClick={() => {
              setOpenServiceRequest(false);
              setEditingRequest(null);
              setPaymentType("");
              setServiceType("");
              setServiceDescription("");
            }}>
                Hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}
interface TxRow {
  id: string;
  name: string;
  amount: number;
  type: "in" | "out";
  date: string;
  groupName: string;
}
function TransactionTable({
  rows
}: {
  rows: TxRow[];
}) {
  return <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ngày</TableHead>
            <TableHead>Người thực hiện</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead className="text-right">Số tiền (VNĐ)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(r => <TableRow key={r.id}>
              <TableCell>{new Date(r.date).toLocaleDateString("vi-VN")}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.type === "in" ? "Nạp quỹ" : "Chi quỹ"}</TableCell>
              <TableCell className="text-right">{r.amount.toLocaleString("vi-VN")}</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>;
}