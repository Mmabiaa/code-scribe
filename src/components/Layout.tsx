
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BookText, 
  Users, 
  Share2, 
  Sparkles, 
  Library, 
  Target, 
  HelpCircle, 
  Video,
  UserPlus,
  LayoutTemplate,
  Home,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem = ({ icon: Icon, label, href, isActive }: NavItemProps) => {
  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-2",
        isActive && "bg-secondary font-medium"
      )}
    >
      <Link to={href}>
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
};

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const Layout = ({ children, title, subtitle }: LayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Code, label: "Code Editor", href: "/" },
    { icon: BookText, label: "Learning", href: "/learn" },
    { icon: Users, label: "Community", href: "/community" },
    { icon: Share2, label: "Collaboration", href: "/collaborate" },
    { icon: Sparkles, label: "AI Assistant", href: "/assistant" },
    { icon: Library, label: "Resources", href: "/resources" },
    { icon: Target, label: "Progress", href: "/progress" },
    { icon: HelpCircle, label: "Quizzes", href: "/quizzes" },
    { icon: Video, label: "Workshops", href: "/workshops" },
    { icon: UserPlus, label: "Mentorship", href: "/mentorship" },
    { icon: LayoutTemplate, label: "Showcase", href: "/showcase" },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-background p-4 hidden md:block">
        <div className="flex items-center gap-2 font-semibold text-lg mb-6">
          <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
            Beta
          </span>
          CodeScribe v2
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={
                item.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.href)
              }
            />
          ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        {(title || subtitle) && (
          <div className="p-4 md:p-6 border-b">
            {title && <h1 className="text-2xl font-semibold">{title}</h1>}
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        <div className="flex-1 p-4 md:p-6">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
