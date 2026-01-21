import { motion } from 'framer-motion';
import { Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { leaveRequests, LeaveRequest } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function LeavesPage() {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';
  const isHR = user?.role === 'hr';

  const columns = [
    { key: 'employeeName' as const, header: 'Employee', sortable: true },
    { key: 'department' as const, header: 'Department', sortable: true },
    { 
      key: 'type' as const, 
      header: 'Type', 
      sortable: true,
      render: (item: LeaveRequest) => (
        <span className="capitalize">{item.type}</span>
      )
    },
    { key: 'startDate' as const, header: 'Start Date', sortable: true },
    { key: 'endDate' as const, header: 'End Date' },
    { key: 'days' as const, header: 'Days' },
    { key: 'reason' as const, header: 'Reason' },
    { 
      key: 'status' as const, 
      header: 'Status',
      render: (item: LeaveRequest) => <StatusBadge status={item.status} />
    },
    ...(isManager ? [{
      key: 'actions' as const,
      header: 'Actions',
      render: (item: LeaveRequest) => item.status === 'pending' ? (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-7 px-2 text-success border-success/30 hover:bg-success/10">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approve
          </Button>
          <Button size="sm" variant="outline" className="h-7 px-2 text-destructive border-destructive/30 hover:bg-destructive/10">
            <XCircle className="h-3 w-3 mr-1" />
            Reject
          </Button>
        </div>
      ) : null
    }] : []),
  ];

  const pendingCount = leaveRequests.filter(l => l.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="page-header mb-0">
          <h1 className="page-title flex items-center gap-2">
            <Calendar className="h-6 w-6 text-accent" />
            Leave Management
          </h1>
          <p className="page-subtitle">
            {isHR ? 'View all employee leave requests' : 'Approve or reject leave requests'}
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-lg border border-warning/20">
            <AlertCircle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-foreground">{pendingCount} pending approvals</span>
          </div>
        )}
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-foreground">{leaveRequests.length}</p>
          <p className="text-sm text-muted-foreground">Total Requests</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-accent">{pendingCount}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-success">{leaveRequests.filter(l => l.status === 'approved').length}</p>
          <p className="text-sm text-muted-foreground">Approved</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-destructive">{leaveRequests.filter(l => l.status === 'rejected').length}</p>
          <p className="text-sm text-muted-foreground">Rejected</p>
        </div>
      </motion.div>

      {/* Leave Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          data={leaveRequests}
          columns={columns}
          searchPlaceholder="Search leave requests..."
        />
      </motion.div>
    </div>
  );
}
