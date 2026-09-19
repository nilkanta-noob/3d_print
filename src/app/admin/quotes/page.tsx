import { prisma } from "@/lib/prisma";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      files: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-text-primary uppercase tracking-widest">
          Quotations & Orders
        </h1>
        <div className="text-sm font-mono text-text-secondary">
          Total: {orders.length}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-sm overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Order ID</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Customer</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Material</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Date</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-text-secondary font-sans text-sm">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const primaryFile = order.files[0];

                return (
                  <tr key={order.id} className="hover:bg-background/30 transition-colors">
                    <td className="p-4 font-mono text-sm text-accent-primary">{order.orderNumber}</td>
                    <td className="p-4 font-sans text-sm">
                      <div className="font-bold text-text-primary">{order.user?.name || 'Unknown'}</div>
                      <div className="text-text-secondary text-xs">{order.user?.email}</div>
                      <div className="text-text-secondary text-xs">{order.user?.phone}</div>
                    </td>
                    <td className="p-4 font-sans text-sm text-text-primary">
                      {order.material}
                    </td>
                    <td className="p-4 font-sans text-sm text-text-secondary">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-accent-primary/10 text-accent-primary border border-accent-primary/30 rounded-sm text-xs font-bold tracking-widest uppercase">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {primaryFile ? (
                        <a
                          href={`/api/admin/files/${primaryFile.id}/download`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border hover:border-accent-primary/50 hover:text-accent-primary rounded-sm text-xs font-bold tracking-widest uppercase transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          STL
                        </a>
                      ) : (
                        <span className="text-xs text-text-secondary italic">No File</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
