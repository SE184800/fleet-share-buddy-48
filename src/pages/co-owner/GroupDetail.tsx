import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import QRCode from "react-qr-code";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "@/hooks/use-toast";
import { CURRENT_USER_ID, getGroupById } from "@/data/mockGroups";
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
                {myRole === "admin" && (
                  <Button onClick={() => setOpenAddMember(true)} size="sm">
                    Thêm thành viên
                  </Button>
                )}
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
                      {myRole === "admin" && m.id !== CURRENT_USER_ID && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedMemberToRemove(m.id);
                            setOpenRemoveMember(true);
                          }}
                        >
                          Xóa
                        </Button>
                      )}
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
              <CardTitle>Xe của nhóm</CardTitle>
              <CardDescription>Hình ảnh, thông tin và trạng thái</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.vehicles.map(v => <div key={v.id} className="border rounded-md p-3">
                    <img src={v.imageUrl} alt={`Hình ảnh xe ${v.name}`} loading="lazy" className="w-full h-32 object-cover rounded mb-2" />
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-sm text-muted-foreground mb-2">{v.info}</div>
                    <Badge variant={v.status === "maintenance" ? "destructive" : v.status === "in-use" ? "secondary" : "default"}>
                      {v.status === "available" ? "Sẵn sàng" : v.status === "in-use" ? "Đang sử dụng" : "Bảo dưỡng"}
                    </Badge>
                  </div>)}
              </div>
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
              <Input 
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Nhập email thành viên"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Xác nhận hành động:</label>
              <Input 
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Nhập 'Xác nhận thêm thành viên'"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
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
                }}
                className="flex-1"
              >
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
              <Input 
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Nhập 'Xác nhận xóa thành viên'"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="destructive"
                onClick={() => {
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
                }}
                className="flex-1"
              >
                Gửi yêu cầu xóa
              </Button>
              <Button variant="outline" onClick={() => setOpenRemoveMember(false)}>
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