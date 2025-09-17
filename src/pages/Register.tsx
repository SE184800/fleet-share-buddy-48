import { useNavigate, Link } from "react-router-dom";
import { Car, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !fullName || !phone) {
      toast({
        title: "Lỗi đăng ký",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Lỗi đăng ký",
        description: "Mật khẩu xác nhận không khớp",
        variant: "destructive",
      });
      return;
    }

    // Redirect to OTP verification with user info
    navigate("/verify-otp", {
      state: { phone, email, fullName }
    });

    toast({
      title: "Đăng ký thành công",
      description: "Vui lòng xác thực tài khoản bằng mã OTP",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-glow border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">EcoShare</span>
          </div>
          <CardTitle className="text-2xl font-bold">Đăng ký tài khoản</CardTitle>
          <CardDescription>
            Tạo tài khoản để tham gia cộng đồng đồng sở hữu xe điện
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Nhập họ và tên đầy đủ"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu*</Label>
              <Field
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
              />
              <div className="text-red-500 text-xs">
                {errorMessage.confirmPassword || <ErrorMessage name="confirmPassword" />}
              </div>
            </div>
            <div style={{ height: 5 }} />
            <div className="flex items-center space-x-2">
              <Field
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
              />
              <Label htmlFor="acceptTerms" className="mb-0">
                Tôi đồng ý với{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setShowTerms(true)}
                >
                  Điều khoản và Điều kiện
                </button>
              </Label>
            </div>
            <div className="text-red-500 text-xs">
              {errorMessage.acceptTerms || <ErrorMessage name="acceptTerms" />}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:shadow-glow"
              disabled={isSubmitting}
            >
              Đăng ký
            </Button>

          </Form>
            )}
        </Formik>
        {showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-primary"
                onClick={() => setShowTerms(false)}
                aria-label="Đóng"
              >
                ×
              </button>
              <h2 className="text-lg font-bold mb-2">Điều khoản và Điều kiện</h2>
              <div className="max-h-80 overflow-y-auto text-sm text-gray-700 space-y-2">
                <p>
                  <strong>1. Đăng ký tài khoản:</strong> Bạn phải cung cấp thông tin chính xác và chịu trách nhiệm về thông tin đã đăng ký.
                </p>
                <p>
                  <strong>2. Bảo mật:</strong> Bạn có trách nhiệm bảo mật thông tin tài khoản và không chia sẻ với người khác.
                </p>
                <p>
                  <strong>3. Quyền sử dụng:</strong> Tài khoản chỉ được sử dụng cho mục đích hợp pháp liên quan đến dịch vụ EcoShare.
                </p>
                <p>
                  <strong>4. Quyền thay đổi:</strong> Chúng tôi có quyền thay đổi, cập nhật điều khoản bất kỳ lúc nào mà không cần báo trước.
                </p>
                <p>
                  <strong>5. Giới hạn trách nhiệm:</strong> Chúng tôi không chịu trách nhiệm với các thiệt hại phát sinh do việc sử dụng sai mục đích hoặc vi phạm điều khoản.
                </p>
                <p>
                  <strong>6. Liên hệ:</strong> Nếu có thắc mắc, vui lòng liên hệ bộ phận hỗ trợ của EcoShare.
                </p>
              </div>
              <div className="mt-4 text-right">
                <Button type="button" onClick={() => setShowTerms(false)}>
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Đã có tài khoản? </span>
          <Link to="/login" className="text-primary hover:underline font-medium">
            Đăng nhập ngay
          </Link>
        </div>

        <div className="mt-4">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay về trang chủ</span>
          </Link>
        </div>
      </CardContent>
    </Card>
    </div >
  );
}