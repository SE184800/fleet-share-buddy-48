import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Leaf, Users, Shield, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">EcoShare</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Đăng nhập</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-primary hover:shadow-glow">Đăng ký</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Tương lai xe điện<br/>
            <span className="text-yellow-300">Đồng sở hữu thông minh</span>
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Kết nối những người có cùng tầm nhìn để sở hữu xe điện một cách thông minh, 
            tiết kiệm và bền vững cho tương lai xanh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                Bắt đầu ngay
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn EcoShare?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-card shadow-elegant">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tiết kiệm chi phí</h3>
              <p className="text-muted-foreground">
                Chia sẻ chi phí mua xe và bảo dưỡng với các thành viên khác
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gradient-card shadow-elegant">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Thân thiện môi trường</h3>
              <p className="text-muted-foreground">
                Giảm lượng khí thải và bảo vệ môi trường với xe điện
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gradient-card shadow-elegant">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cộng đồng chia sẻ</h3>
              <p className="text-muted-foreground">
                Kết nối với những người có cùng tư duy bền vững
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gradient-card shadow-elegant">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bảo đảm pháp lý</h3>
              <p className="text-muted-foreground">
                Hợp đồng điện tử minh bạch và đảm bảo quyền lợi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình xanh?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Tham gia cộng đồng EcoShare ngay hôm nay và trở thành một phần của cuộc cách mạng giao thông bền vững.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
              Đăng ký miễn phí
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
