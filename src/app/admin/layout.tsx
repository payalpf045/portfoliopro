import AdminAuthWrapper from '@/components/admin/admin-auth-wrapper';
import AdminSidebar from '@/components/admin/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthWrapper>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 bg-secondary/30">
          {children}
        </main>
      </div>
    </AdminAuthWrapper>
  );
}
