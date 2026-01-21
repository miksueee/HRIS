import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle, XCircle, Calendar, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { leaveRequests, otRequests, progressReports, attendanceRecords } from '@/data/mockData';

export default function ManagerDashboard() {
  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending');
  const pendingOT = otRequests.filter(o => o.status === 'pending');
  const departmentAttendance = attendanceRecords.filter(a => 
    ['Fatima Hassan', 'Ahmed Khalil', 'Rania Mahmoud'].includes(a.employeeName)
  );

  const leaveColumns = [
    { key: 'employeeName', header: 'Employee', sortable: true },
    { key: 'type', header: 'Type' },
    { key: 'startDate', header: 'Start' },
    { key: 'endDate', header: 'End' },
    { key: 'days', header: 'Days' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof leaveRequests[0]) => <StatusBadge status={item.status} />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: typeof leaveRequests[0]) => item.status === 'pending' ? (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-7 px-2 text-success border-success/30 hover:bg-success/10">
            <CheckCircle className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline" className="h-7 px-2 text-destructive border-destructive/30 hover:bg-destructive/10">
            <XCircle className="h-3 w-3" />
          </Button>
        </div>
      ) : null
    },
  ];

  const otColumns = [
    { key: 'employeeName', header: 'Employee', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'hours', header: 'Hours' },
    { key: 'reason', header: 'Reason' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof otRequests[0]) => <StatusBadge status={item.status} />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: typeof otRequests[0]) => item.status === 'pending' ? (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-7 px-2 text-success border-success/30 hover:bg-success/10">
            <CheckCircle className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline" className="h-7 px-2 text-destructive border-destructive/30 hover:bg-destructive/10">
            <XCircle className="h-3 w-3" />
          </Button>
        </div>
      ) : null
    },
  ];

  const attendanceColumns = [
    { key: 'employeeName', header: 'Employee', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'day', header: 'Day' },
    { key: 'timeIn', header: 'Time In', render: (item: typeof attendanceRecords[0]) => item.timeIn || '-' },
    { key: 'timeOut', header: 'Time Out', render: (item: typeof attendanceRecords[0]) => item.timeOut || '-' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof attendanceRecords[0]) => <StatusBadge status={item.status} />
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header"
      >
        <h1 className="page-title">Manager Dashboard</h1>
        <p className="page-subtitle">Engineering Department Overview</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Team Members"
          value={4}
          icon={<Users className="h-6 w-6" />}
          variant="accent"
        />
        <KPICard
          title="Pending Leaves"
          value={pendingLeaves.length}
          icon={<Calendar className="h-6 w-6" />}
        />
        <KPICard
          title="Pending OT"
          value={pendingOT.length}
          icon={<Clock className="h-6 w-6" />}
        />
        <KPICard
          title="Reports Today"
          value={progressReports.length}
          icon={<FileText className="h-6 w-6" />}
        />
      </div>

      {/* Approval Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leave Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2 mb-0">
              <Calendar className="h-5 w-5 text-accent" />
              Leave Approvals
            </h3>
            {pendingLeaves.length > 0 && (
              <span className="flex items-center gap-1 text-sm text-warning">
                <AlertCircle className="h-4 w-4" />
                {pendingLeaves.length} pending
              </span>
            )}
          </div>
          <DataTable
            data={leaveRequests.filter(l => ['Engineering'].includes(l.department))}
            columns={leaveColumns}
            searchable={false}
          />
        </motion.div>

        {/* Pending OT Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2 mb-0">
              <Clock className="h-5 w-5 text-accent" />
              Overtime Approvals
            </h3>
            {pendingOT.length > 0 && (
              <span className="flex items-center gap-1 text-sm text-warning">
                <AlertCircle className="h-4 w-4" />
                {pendingOT.length} pending
              </span>
            )}
          </div>
          <DataTable
            data={otRequests}
            columns={otColumns}
            searchable={false}
          />
        </motion.div>
      </div>

      {/* Attendance Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title flex items-center gap-2 mb-0">
            <TrendingUp className="h-5 w-5 text-accent" />
            Team Attendance
          </h3>
        </div>
        <DataTable
          data={departmentAttendance}
          columns={attendanceColumns}
          searchPlaceholder="Search attendance..."
        />
      </motion.div>

      {/* Progress Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="section-title flex items-center gap-2">
          <FileText className="h-5 w-5 text-accent" />
          Today's Progress Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressReports.map((report) => (
            <div key={report.id} className="section-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
                  {report.employeeName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-foreground">{report.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{report.hoursWorked} hours logged</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Completed</p>
                  <ul className="text-sm space-y-1">
                    {report.tasksCompleted.map((task, i) => (
                      <li key={i} className="flex items-center gap-2 text-success">
                        <CheckCircle className="h-3 w-3" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1">In Progress</p>
                  <ul className="text-sm space-y-1">
                    {report.tasksInProgress.map((task, i) => (
                      <li key={i} className="flex items-center gap-2 text-accent">
                        <Clock className="h-3 w-3" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {report.blockers.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Blockers</p>
                    <ul className="text-sm space-y-1">
                      {report.blockers.map((blocker, i) => (
                        <li key={i} className="flex items-center gap-2 text-destructive">
                          <AlertCircle className="h-3 w-3" />
                          {blocker}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
