import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Calendar, DollarSign, Clock, AlertTriangle, Users } from "lucide-react";
import carHeroImage from "@/assets/car-hero-image.png";

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
        <DialogHeader className="relative text-center">
          <div className="absolute top-0 right-0">
            <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
              Vi phạm
            </div>
          </div>
          
          {/* Car Hero Image */}
          <div className="mx-auto mb-4 w-64 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center overflow-hidden">
            <img 
              src={carHeroImage} 
              alt="EcoShare Car"
              className="w-full h-full object-contain"
            />
          </div>
          
          <DialogTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Quy định sử dụng EcoShare
          </DialogTitle>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
            Tìm hiểu các quy định và nguyên tắc hoạt động để có trải nghiệm tốt nhất khi sử dụng dịch vụ
          </p>
        </DialogHeader>
        
        {/* Basic Rules Section */}
        <div className="mt-8 mb-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-primary">Quy định cơ bản</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rule 1 - Ownership Management */}
            <div className="group p-6 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-900/10 dark:to-emerald-800/5 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-2.5 shadow-sm">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 text-base">1. Quản lý quyền sở hữu & thành viên</h4>
              </div>
              <div className="text-sm space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">ID</span>
                  </div>
                  <p><span className="font-medium text-emerald-700 dark:text-emerald-300">CCCD/CMND + GPLX</span> - Bắt buộc trước khi tham gia nhóm</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">✍️</span>
                  </div>
                  <p><span className="font-medium text-emerald-700 dark:text-emerald-300">E-contract</span> - Thay đổi tỷ lệ sở hữu cần chữ ký số tất cả thành viên</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">👑</span>
                  </div>
                  <p><span className="font-medium text-emerald-700 dark:text-emerald-300">Admin</span> - Chỉ admin mới có quyền quản lý thành viên</p>
                </div>
              </div>
            </div>

            {/* Rule 2 - Scheduling */}
            <div className="group p-6 bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-800/5 rounded-xl border border-blue-200/50 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2.5 shadow-sm">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 text-base">2. Đặt lịch & sử dụng xe</h4>
              </div>
              <div className="text-sm space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">1</div>
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">2</div>
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">3</div>
                  </div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">Ai đặt trước → Ưu tiên trước</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Thứ tự ưu tiên khi xung đột:</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="bg-blue-500 text-white px-2 py-1 rounded">Tỷ lệ sở hữu cao</div>
                    <span>→</span>
                    <div className="bg-blue-400 text-white px-2 py-1 rounded">Sử dụng ít</div>
                    <span>→</span>
                    <div className="bg-blue-300 text-white px-2 py-1 rounded">Đăng ký sớm</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <div className="w-4 h-4 bg-blue-400 rounded"></div>
                    <div className="w-4 h-4 bg-blue-300 rounded"></div>
                    <div className="w-4 h-4 bg-blue-200 rounded"></div>
                    <span className="text-blue-600 text-sm font-medium ml-1">14 ngày</span>
                  </div>
                  <p className="text-sm">Giới hạn sử dụng liên tục (7 ngày vào dịp lễ/tết)</p>
                </div>
              </div>
            </div>

            {/* Rule 3 - Costs */}
            <div className="group p-6 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-900/10 dark:to-amber-800/5 rounded-xl border border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-2.5 shadow-sm">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 text-base">3. Chi phí & thanh toán</h4>
              </div>
              <div className="text-sm space-y-3">
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <p className="font-medium text-amber-700 dark:text-amber-300">Chia chi phí theo tỷ lệ sở hữu</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400">Hoặc theo mức độ sử dụng</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-amber-200 dark:bg-amber-800 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <span className="text-xs text-amber-600 dark:text-amber-400">40%</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">💳</span>
                  </div>
                  <p><span className="font-medium text-amber-700 dark:text-amber-300">E-wallet/Banking</span> - Thanh toán trực tuyến bắt buộc</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">🚫</span>
                  </div>
                  <p><span className="font-medium text-red-700 dark:text-red-300">Nợ &gt; 15 ngày</span> → Khóa quyền đặt lịch</p>
                </div>
              </div>
            </div>

            {/* Rule 4 - Group Decisions */}
            <div className="group p-6 bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-900/10 dark:to-purple-800/5 rounded-xl border border-purple-200/50 dark:border-purple-800/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-2.5 shadow-sm">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 text-base">4. Nhóm đồng sở hữu & quyết định chung</h4>
              </div>
              <div className="text-sm space-y-3">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👥</span>
                      <span className="font-medium text-purple-700 dark:text-purple-300">Tối đa 5 người</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📊</span>
                      <span className="font-medium text-purple-700 dark:text-purple-300">Min 15% sở hữu</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-purple-600 dark:text-purple-400">Tỷ lệ thông qua:</span>
                    <div className="flex-1 h-3 bg-purple-200 dark:bg-purple-800 rounded-full">
                      <div className="h-3 bg-purple-500 rounded-full" style={{width: '70%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">70%</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">🤖</span>
                  </div>
                  <p><span className="font-medium text-purple-700 dark:text-purple-300">AI Gợi ý</span> - Chỉ mang tính tham khảo, không bắt buộc</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">🚨</span>
                  </div>
                  <p><span className="font-medium text-orange-700 dark:text-orange-300">Khẩn cấp</span> - Có thể bỏ qua bỏ phiếu với bằng chứng xác thực</p>
                </div>
              </div>
            </div>

            {/* Rule 5 - Disputes */}
            <div className="group p-6 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-900/10 dark:to-red-800/5 rounded-xl border border-red-200/50 dark:border-red-800/30 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200 hover:shadow-lg lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5 shadow-sm">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-red-700 dark:text-red-300 text-base">5. Tranh chấp & giám sát</h4>
              </div>
              <div className="text-sm space-y-3">
                <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">📝</div>
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-300">Log bất biến</p>
                      <p className="text-xs text-red-600 dark:text-red-400">Tất cả hành động được ghi nhận và không thể chỉnh sửa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Đặt lịch</span>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">Thanh toán</span>
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs">Bỏ phiếu</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">S</div>
                    <span className="text-xl">→</span>
                    <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">A</div>
                  </div>
                  <p><span className="font-medium text-red-700 dark:text-red-300">Staff → Admin</span> - Cấp độ giải quyết tranh chấp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-6 mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-destructive/10 to-destructive/5 px-4 py-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h3 className="text-lg font-semibold text-destructive">Mức phạt vi phạm</h3>
          </div>
        </div>
        
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