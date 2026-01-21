import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { otRequests, OTRequest } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function OvertimePage() {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';
  const isHR = user?.role === 'hr';

  const columns = [
    { key: 'employeeName' as const, header: 'Employee', sortable: true },
    { key: 'department' as const, header: 'Department', sortable: true },
    { key: 'date' as const, header: 'Date', sortable: true },
    { 
      key: 'hours' as const, 
      header: 'Hours',
      render: (item: OTRequest) => `${item.hours} hrs`
    },
    { key: 'reason' as const, header: 'Reason' },
    { key: 'appliedDate' as const, header: 'Applied On', sortable: true },
    { 
      key: 'status' as const, 
      header: 'Status',
      render: (item: OTRequest) => <StatusBadge status={item.status} />
    },
    ...(isManager ? [{
      key: 'actions' as const,
      header: 'Actions',
      render: (item: OTRequest) => item.status === 'pending' ? (
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

  const pendingCount = otRequests.filter(o => o.status === 'pending').length;
  const totalHoursApproved = otRequests
    .filter(o => o.status === 'approved')
    .reduce((sum, o) => sum + o.hours, 0);

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
            <Clock className="h-6 w-6 text-accent" />
            Overtime Requests
          </h1>
          <p className="page-subtitle">
            {isHR ? 'View all overtime requests' : 'Manage overtime approvals'}
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
          <p className="text-3xl font-bold text-foreground">{otRequests.length}</p>
          <p className="text-sm text-muted-foreground">Total Requests</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-accent">{pendingCount}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-success">{otRequests.filter(o => o.status === 'approved').length}</p>
          <p className="text-sm text-muted-foreground">Approved</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-secondary">{totalHoursApproved} hrs</p>
          <p className="text-sm text-muted-foreground">Total Hours Approved</p>
        </div>
      </motion.div>

      {/* OT Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          data={otRequests}
          columns={columns}
          searchPlaceholder="Search overtime requests..."
        />
      </motion.div>
    </div>
  );
}
