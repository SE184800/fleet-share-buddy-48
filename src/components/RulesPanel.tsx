import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Calendar, DollarSign, Clock, AlertTriangle, Users } from "lucide-react";

export function RulesPanel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/10">
          <Shield className="h-4 w-4 mr-2" />
          Quy định & Vi phạm
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Quy định sử dụng EcoShare & Mức phạt vi phạm
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            Tất cả quy định và hệ thống phạt minh bạch cho các vi phạm, nhấp vào từng mục để xem chi tiết
          </p>
        </DialogHeader>
        
        {/* Basic Rules Section */}
        <div className="mt-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">📋 Quy định cơ bản</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">1. Thành viên & Sở hữu</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Tỷ lệ sở hữu tối thiểu: 20%</li>
                <li>• Xác minh danh tính bắt buộc</li>
                <li>• Giấy phép lái xe hợp lệ</li>
                <li>• Hợp đồng ký kết đầy đủ</li>
              </ul>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">2. Sử dụng xe</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Đặt lịch trước tối thiểu 2 giờ</li>
                <li>• Thời gian sử dụng tối đa: 8 giờ/lần</li>
                <li>• Trả xe đúng giờ, đúng địa điểm</li>
                <li>• Báo cáo sự cố ngay lập tức</li>
              </ul>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">3. Thanh toán</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Chi phí điện: theo km sử dụng</li>
                <li>• Bảo trì định kỳ: chia đều</li>
                <li>• Thanh toán trong 7 ngày</li>
                <li>• Phí trễ hạn: 50k/ngày</li>
              </ul>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">4. Bảo trì & Vệ sinh</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Vệ sinh xe sau mỗi lần sử dụng</li>
                <li>• Kiểm tra tình trạng trước/sau</li>
                <li>• Bảo trì định kỳ theo lịch</li>
                <li>• Sạc pin đầy trước khi trả</li>
              </ul>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">5. Bảo hiểm & Trách nhiệm</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Bảo hiểm bắt buộc có hiệu lực</li>
                <li>• Chịu trách nhiệm khi sử dụng</li>
                <li>• Bồi thường thiệt hại do lỗi</li>
                <li>• Không cho thuê lại</li>
              </ul>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border">
              <h4 className="font-semibold text-primary mb-2">6. Quyết định nhóm</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Bỏ phiếu theo tỷ lệ sở hữu</li>
                <li>• Quyết định khẩn cấp có bằng chứng</li>
                <li>• Thời hạn bỏ phiếu: 48 giờ</li>
                <li>• Đồng thuận tối thiểu: 51%</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4 text-center text-destructive">⚠️ Mức phạt vi phạm</h3>
        
        <Accordion type="single" collapsible className="w-full mt-6">
          {/* Penalty 1 - Schedule Violations */}
          <AccordionItem value="penalty-1" className="mb-4">
            <AccordionTrigger className="bg-gradient-card rounded-lg px-6 py-4 shadow-elegant hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className="bg-destructive/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-destructive" />
                  </div>
                  <span className="text-lg font-semibold">Vi phạm lịch sử dụng</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Quy định 2.3</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Quy định 2.4</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Sử dụng xe quá thời hạn hoặc không trả xe đúng giờ
                </p>
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <p className="text-sm font-medium text-destructive">
                    Mức phạt: Cảnh cáo lần 1, phạt 200,000 VNĐ từ lần 2
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Penalty 2 - Payment Delays */}
          <AccordionItem value="penalty-2" className="mb-4">
            <AccordionTrigger className="bg-gradient-card rounded-lg px-6 py-4 shadow-elegant hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className="bg-destructive/10 rounded-full p-2">
                    <DollarSign className="h-5 w-5 text-destructive" />
                  </div>
                  <span className="text-lg font-semibold">Thanh toán chậm trễ</span>
                </div>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Quy định 3.4</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Không thanh toán chi phí trong thời hạn quy định
                </p>
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <p className="text-sm font-medium text-destructive">
                    Mức phạt: 50,000 VNĐ/ngày + tạm khóa quyền đặt lịch
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Penalty 3 - Schedule Conflicts */}
          <AccordionItem value="penalty-3" className="mb-4">
            <AccordionTrigger className="bg-gradient-card rounded-lg px-6 py-4 shadow-elegant hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className="bg-destructive/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-destructive" />
                  </div>
                  <span className="text-lg font-semibold">Đặt lịch xung đột</span>
                </div>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Quy định 2.5</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Đặt lịch trùng với thành viên khác hoặc không hủy đúng hạn
                </p>
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <p className="text-sm font-medium text-destructive">
                    Mức phạt: 100,000 VNĐ và mất ưu tiên đặt lịch 30 ngày
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Penalty 4 - Ownership Requirements */}
          <AccordionItem value="penalty-4" className="mb-4">
            <AccordionTrigger className="bg-gradient-card rounded-lg px-6 py-4 shadow-elegant hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className="bg-destructive/10 rounded-full p-2">
                    <Users className="h-5 w-5 text-destructive" />
                  </div>
                  <span className="text-lg font-semibold">Vi phạm tỷ lệ sở hữu</span>
                </div>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Quy định 1.2</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Không đáp ứng yêu cầu tỷ lệ sở hữu tối thiểu hoặc chậm xác minh
                </p>
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <p className="text-sm font-medium text-destructive">
                    Mức phạt: Tạm khóa tài khoản đến khi hoàn thành xác minh
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Penalty 5 - Emergency Bypass */}
          <AccordionItem value="penalty-5" className="mb-4">
            <AccordionTrigger className="bg-gradient-card rounded-lg px-6 py-4 shadow-elegant hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className="bg-destructive/10 rounded-full p-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <span className="text-lg font-semibold">Lạm dụng quyết định khẩn cấp</span>
                </div>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Quy định 4.7</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Sử dụng quyết định khẩn cấp không đúng mục đích hoặc thiếu bằng chứng
                </p>
                <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <p className="text-sm font-medium text-destructive">
                    Mức phạt: 500,000 VNĐ và mất quyền đưa ra quyết định khẩn cấp 90 ngày
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}