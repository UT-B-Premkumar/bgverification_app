import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto ">
        {children}
      </main>
    </div>
  );
}
