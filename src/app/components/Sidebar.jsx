import { Home, Folder, FileText, Briefcase } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const menuItems = [
  { name: "Application", icon: Home, href: "/application", role: "student" },
  { name: "Applications", icon: Home, href: "/dashboard", role: "admin" },
  { name: "Cases", icon: Briefcase, href: "/case", role: "admin" },
  //   { name: "Reports", icon: Folder, href: "/reports" },
];

export default function Sidebar() {
  const Mainrole = localStorage.getItem("role");
  const router = useRouter();
  const handleLogut = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
      {/* Logo / Title */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems
          .filter(({ role }) => Mainrole === role)
          .map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </Link>
          ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          className="w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-medium hover:bg-red-700"
          onClick={handleLogut}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
