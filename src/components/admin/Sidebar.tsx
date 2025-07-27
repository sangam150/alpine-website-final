"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Globe,
  Upload,
  Settings,
  FileText,
  MessageCircle,
  LogOut,
  Bot,
  Phone,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: MessageCircle },
  { label: "Appointments", href: "/admin/appointments", icon: FileText },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Country Pages", href: "/admin/countries", icon: Globe },
  { label: "Blog Manager", href: "/admin/content", icon: BookOpen },
  { label: "Resources", href: "/admin/resources", icon: Upload },
  { label: "Test Prep", href: "/admin/testprep", icon: BookOpen },
  { label: "Banners", href: "/admin/banners", icon: Upload },
  { label: "Testimonials", href: "/admin/testimonials", icon: Users },
  { label: "AI Feedback Log", href: "/admin/ai-feedback", icon: Bot },
  { label: "SEO Metadata", href: "/admin/seo", icon: Globe },
  { label: "Contact Info", href: "/admin/contact", icon: Phone },
  { label: "Legal Pages", href: "/admin/legal", icon: FileText },
  { label: "Admin Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 shadow-sm fixed left-0 top-0 z-30">
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-gray-100">
        Alpine Admin
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition font-medium ${pathname === href ? "bg-blue-100 text-blue-700" : ""}`}
          >
            <Icon className="h-5 w-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center w-full text-left text-gray-500 hover:text-red-600 font-medium">
          <LogOut className="h-5 w-5 mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
}
