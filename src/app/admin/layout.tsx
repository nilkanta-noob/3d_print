import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If there is no session or role is not ADMIN, redirect to login
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface px-6 py-4 flex items-center justify-between">
        <div className="font-display font-bold tracking-widest text-text-primary uppercase">
          PrintWarriors <span className="text-accent-primary">Admin</span>
        </div>
        <div className="text-sm text-text-muted font-sans">
          {session.user?.email}
        </div>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
