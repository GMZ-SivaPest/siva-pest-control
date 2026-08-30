"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import {
  Search, RefreshCw, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock,
  MessageSquare, Send, Trash2, X, Check, AlertCircle, Shield, MessageCircle,
  Users, TrendingUp, Building2
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  city: string;
  service: string;
  propertyType: string;
  preferredDate: string | null;
  source: string;
  status: string;
  whatsappSent: boolean;
  createdAt: string;
  notes: string | null;
}

interface Stats {
  total: number;
  leadsInPeriod: number;
  periodDays: number;
  whatsappSent: number;
  byStatus: Record<string, number>;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  quoted: "bg-purple-100 text-purple-800",
  won: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
  whatsapp_sent: "bg-emerald-100 text-emerald-800",
};

export default function AdminLeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadLeads = useCallback(async (page: number) => {
    setIsLoadingLeads(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(pagination.limit) });
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/leads?${params}`);
      if (res.ok) {
        const d = await res.json();
        setLeads(d.leads);
        setPagination(d.pagination);
      }
    } catch { showToast("Failed to load leads", "error"); }
    setIsLoadingLeads(false);
  }, [search, statusFilter, pagination.limit]);

  const loadStats = async () => {
    try {
      const res = await fetch("/api/leads/stats");
      if (res.ok) setStats(await res.json());
    } catch { /* optional */ }
  };

  const checkSession = async () => {
    try {
      const res = await fetch("/api/leads?limit=1");
      if (res.ok) {
        setIsAuthenticated(true);
        await Promise.all([loadLeads(1), loadStats()]);
      }
    } catch { /* not auth */ }
    setIsLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      void checkSession();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const timeout = setTimeout(() => {
      void loadLeads(1);
    }, 0);

    return () => clearTimeout(timeout);
  }, [search, statusFilter, isAuthenticated, loadLeads]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        await Promise.all([loadLeads(1), loadStats()]);
      } else {
        const d = await res.json();
        setLoginError(d.error || "Login failed");
      }
    } catch { setLoginError("Network error"); }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setLeads([]);
    setStats(null);
  };

  const openLeadDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setNotesValue(lead.notes || "");
    setEditingNotes(false);
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    const res = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      showToast("Status updated", "success");
      await Promise.all([loadLeads(pagination.page), loadStats()]);
      setSelectedLead((prev) => prev ? { ...prev, status } : null);
    } else showToast("Failed to update", "error");
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    const res = await fetch(`/api/leads/${selectedLead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: notesValue }),
    });
    if (res.ok) {
      showToast("Notes saved", "success");
      setEditingNotes(false);
      await loadLeads(pagination.page);
      setSelectedLead((prev) => prev ? { ...prev, notes: notesValue } : null);
    } else showToast("Failed to save", "error");
  };

  const resendWhatsApp = async (leadId: string) => {
    const res = await fetch(`/api/leads/${leadId}/whatsapp`, { method: "POST" });
    const d = await res.json();
    if (d.ok) {
      showToast(d.dryRun ? "WhatsApp (DRY RUN)" : "WhatsApp sent", "success");
      await loadLeads(pagination.page);
    } else showToast(d.error || "Failed", "error");
  };

  const deleteLead = async (leadId: string) => {
    if (!confirm("Delete this lead?")) return;
    const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Deleted", "success");
      setSelectedLead(null);
      await Promise.all([loadLeads(pagination.page), loadStats()]);
    } else showToast("Failed to delete", "error");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RefreshCw className="h-8 w-8 animate-spin text-orange" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-orange/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-orange" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-brown">Admin Panel</h1>
              <p className="text-sm text-brown/60">Siva Pest Control</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brown mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brown/20 focus:border-orange outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brown/20 focus:border-orange outline-none"
                required
              />
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {loginError}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-orange text-white font-semibold rounded-xl hover:bg-orange/90 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-orange" />
              </div>
              <div>
                <h1 className="font-bold text-brown">Leads Admin</h1>
                <p className="text-xs text-brown/60">Siva Pest Control</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => loadLeads(pagination.page)}
                className="p-2 text-brown/60 hover:text-brown hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <RefreshCw className={`h-5 w-5 ${isLoadingLeads ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-brown/70 hover:text-brown hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <StatCard icon={<Users className="h-5 w-5" />} label="Total Leads" value={stats.total} color="brown" />
            <StatCard icon={<TrendingUp className="h-5 w-5" />} label={`Last ${stats.periodDays} Days`} value={stats.leadsInPeriod} color="orange" />
            <StatCard icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value={stats.whatsappSent} color="green" />
            <StatCard icon={<Check className="h-5 w-5" />} label="Won" value={stats.byStatus.won || 0} color="green" />
            <StatCard icon={<Building2 className="h-5 w-5" />} label="New" value={stats.byStatus.new || 0} color="blue" />
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange outline-none"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange outline-none"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoadingLeads ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center"><RefreshCw className="h-6 w-6 animate-spin mx-auto text-gray-400" /></td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No leads found</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openLeadDetail(lead)}>
                    <td className="px-6 py-4"><div className="font-medium text-brown">{lead.name}</div><div className="text-sm text-gray-500">{lead.city}</div></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-gray-400" /><a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>{lead.phone}</a></div>
                      {lead.email && <div className="flex items-center gap-2 text-sm mt-1"><Mail className="h-4 w-4 text-gray-400" /><span className="text-gray-600">{lead.email}</span></div>}
                    </td>
                    <td className="px-6 py-4"><div className="text-sm font-medium text-brown">{lead.service}</div><div className="text-xs text-gray-500">{lead.propertyType}</div></td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status] || "bg-gray-100"}`}>{lead.status}</span>
                      {lead.whatsappSent && <div className="mt-1"><span className="inline-flex items-center gap-1 text-xs text-green-600"><MessageCircle className="h-3 w-3" />WA</span></div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{format(new Date(lead.createdAt), "MMM d, yyyy")}</td>
                    <td className="px-6 py-4"><button onClick={(e) => { e.stopPropagation(); resendWhatsApp(lead.id); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><MessageCircle className="h-4 w-4" /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">Page {pagination.page} of {pagination.totalPages}</div>
              <div className="flex gap-2">
                <button onClick={() => loadLeads(pagination.page - 1)} disabled={pagination.page <= 1} className="p-2 rounded-lg border border-gray-200 disabled:opacity-50"><ChevronLeft className="h-4 w-4" /></button>
                <button onClick={() => loadLeads(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} className="p-2 rounded-lg border border-gray-200 disabled:opacity-50"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-brown">Lead Details</h2>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-brown">{selectedLead.name}</h3>
                  <div className="flex items-center gap-2 mt-1"><MapPin className="h-4 w-4 text-gray-400" /><span className="text-gray-600">{selectedLead.city}</span></div>
                </div>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${STATUS_COLORS[selectedLead.status] || "bg-gray-100"}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Phone</div>
                    <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:underline font-medium">{selectedLead.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Email</div>
                    <div className="text-sm text-gray-700">{selectedLead.email || "—"}</div>
                  </div>
                </div>
              </div>

              {/* Service details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase">Service</div>
                  <div className="text-sm font-medium text-brown">{selectedLead.service}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Property</div>
                  <div className="text-sm text-gray-700">{selectedLead.propertyType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Preferred Date</div>
                  <div className="text-sm text-gray-700">{selectedLead.preferredDate || "—"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Source</div>
                  <div className="text-sm text-gray-700">{selectedLead.source}</div>
                </div>
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Message</div>
                  <div className="p-3 rounded-xl bg-gray-50 text-sm text-gray-700 whitespace-pre-wrap">{selectedLead.message}</div>
                </div>
              )}

              {/* WhatsApp status */}
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">
                  {selectedLead.whatsappSent ? "WhatsApp message sent" : "WhatsApp not sent yet"}
                </span>
              </div>

              {/* Notes editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-500 uppercase">Internal Notes</div>
                  {!editingNotes && (
                    <button onClick={() => setEditingNotes(true)} className="text-xs text-blue-600 hover:underline">
                      Edit
                    </button>
                  )}
                </div>
                {editingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-orange outline-none text-sm"
                      placeholder="Add internal notes for the sales team..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveNotes}
                        className="px-4 py-2 text-sm bg-orange text-white font-medium rounded-lg hover:bg-orange/90"
                      >
                        Save Notes
                      </button>
                      <button
                        onClick={() => { setEditingNotes(false); setNotesValue(selectedLead.notes || ""); }}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-gray-50 text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedLead.notes || "No notes yet."}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-200">
                <button
                  onClick={() => resendWhatsApp(selectedLead.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg"
                >
                  <Send className="h-4 w-4" />
                  {selectedLead.whatsappSent ? "Resend WhatsApp" : "Send WhatsApp"}
                </button>
                <button
                  onClick={() => deleteLead(selectedLead.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg ml-auto"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-60 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "brown" | "orange" | "green" | "blue";
}) {
  const colorClasses: Record<string, string> = {
    brown: "bg-brown/10 text-brown",
    orange: "bg-orange/10 text-orange",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="mt-3 text-2xl font-bold text-brown">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}