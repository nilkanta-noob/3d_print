import React from 'react';
import { prisma } from '@/lib/prisma';
import { Package, Search, Download, Clock, CheckCircle, FileText, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany({
    include: { 
      user: true,
      files: true 
    },
    orderBy: { createdAt: 'desc' }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'QUOTE_REQUESTED': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'QUOTE_SENT': return 'bg-accent-primary/10 text-accent-primary border-accent-primary/20';
      case 'CONFIRMED': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'PRINTING': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary p-6 lg:p-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-widest text-text-primary flex items-center gap-3">
            <Package className="text-accent-primary" />
            Admin Dashboard
          </h1>
          <p className="text-text-secondary text-sm mt-1">Manage quotation requests and orders</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-9 pr-4 py-2 bg-surface border border-border rounded-sm focus:border-accent-primary outline-none text-sm w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface border border-border p-6 rounded-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Total Requests</p>
            <h3 className="text-3xl font-mono font-bold">{orders.length}</h3>
          </div>
          <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-sm">
            <FileText className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-surface border border-border p-6 rounded-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Pending Quotes</p>
            <h3 className="text-3xl font-mono font-bold">
              {orders.filter(o => o.status === 'QUOTE_REQUESTED').length}
            </h3>
          </div>
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-sm">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Active Jobs</p>
            <h3 className="text-3xl font-mono font-bold">
              {orders.filter(o => o.status === 'PRINTING').length}
            </h3>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-sm">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-surface border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Order ID</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Customer</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Specs</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Files</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Date</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <span className="font-mono text-sm font-bold text-accent-primary">{order.orderNumber}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-sm text-text-primary">{order.user.name || order.billingName}</div>
                    <div className="text-xs text-text-secondary">{order.user.email}</div>
                    <div className="text-xs text-text-secondary">{order.user.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <span className="text-text-secondary">Mat:</span> <span className="font-bold">{order.material}</span>
                    </div>
                    {order.customerNotes && (
                      <div className="text-xs text-text-secondary mt-1 max-w-[200px] truncate" title={order.customerNotes}>
                        {order.customerNotes}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {order.files.map(f => (
                      <div key={f.id} className="flex items-center gap-2 text-sm text-accent-primary">
                        <Download className="w-3 h-3" />
                        <span className="truncate max-w-[150px] inline-block" title={f.fileName}>{f.fileName}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-text-secondary">{new Date(order.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-text-secondary hover:text-accent-primary transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-text-secondary">
                    No quotation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
