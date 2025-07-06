import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - Alpine Education',
  description: 'Admin panel for managing Alpine Education website content and data.',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Implement proper authentication
  // For now, allow access to admin panel

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Alpine Admin</h1>
          </div>
          <nav className="mt-6">
            <div className="px-4 space-y-2">
              <a href="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Dashboard
              </a>
              <a href="/admin/content" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Content Management
              </a>
              <a href="/admin/countries" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Countries
              </a>
              <a href="/admin/students" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Students
              </a>
              <a href="/admin/uploads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                File Uploads
              </a>
              <a href="/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Users
              </a>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 