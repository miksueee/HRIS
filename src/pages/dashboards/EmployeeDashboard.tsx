import { motion } from 'framer-motion';
import { Clock, Calendar, CheckCircle, AlertCircle, User, Briefcase, FileText } from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { attendanceRecords, leaveRequests, otRequests } from '@/data/mockData';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  
  // Filter data for current employee
  const myAttendance = attendanceRecords.filter(a => a.employeeName === 'Fatima Hassan');
  const myLeaves = leaveRequests.filter(l => l.employeeName === 'Fatima Hassan');
  const myOT = otRequests.filter(o => o.employeeName === 'Fatima Hassan');

  const lateCount = myAttendance.filter(a => a.status === 'late').length;
  const absentCount = myAttendance.filter(a => a.status === 'absent').length;
  const presentCount = myAttendance.filter(a => a.status === 'present').length;

  const attendanceColumns = [
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

  const leaveColumns = [
    { key: 'type', header: 'Type', sortable: true },
    { key: 'startDate', header: 'Start', sortable: true },
    { key: 'endDate', header: 'End' },
    { key: 'days', header: 'Days' },
    { key: 'reason', header: 'Reason' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof leaveRequests[0]) => <StatusBadge status={item.status} />
    },
  ];

  const otColumns = [
    { key: 'date', header: 'Date', sortable: true },
    { key: 'hours', header: 'Hours' },
    { key: 'reason', header: 'Reason' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof otRequests[0]) => <StatusBadge status={item.status} />
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
        <h1 className="page-title">Welcome, {user?.name?.split(' ')[0]}!</h1>
        <p className="page-subtitle">Here's your personal dashboard overview</p>
      </motion.div>

      {/* Quick Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-card bg-gradient-to-r from-secondary to-accent text-secondary-foreground"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-secondary-foreground/20 flex items-center justify-center text-2xl font-bold">
            {user?.name?.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold font-heading">{user?.name}</h2>
            <p className="opacity-90">Senior Developer • Engineering</p>
            <p className="text-sm opacity-75">Employee #{user?.employeeNumber}</p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-xs opacity-75">Leave Balance</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{presentCount}</p>
              <p className="text-xs opacity-75">Days Present</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{myOT.filter(o => o.status === 'approved').length}</p>
              <p className="text-xs opacity-75">OT Approved</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Present Days"
          value={presentCount}
          icon={<CheckCircle className="h-6 w-6" />}
          variant="accent"
        />
        <KPICard
          title="Late Arrivals"
          value={lateCount}
          icon={<Clock className="h-6 w-6" />}
        />
        <KPICard
          title="Absences"
          value={absentCount}
          icon={<AlertCircle className="h-6 w-6" />}
        />
        <KPICard
          title="Pending Requests"
          value={myLeaves.filter(l => l.status === 'pending').length + myOT.filter(o => o.status === 'pending').length}
          icon={<FileText className="h-6 w-6" />}
        />
      </div>

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title flex items-center gap-2 mb-0">
            <Briefcase className="h-5 w-5 text-accent" />
            My Attendance
          </h3>
        </div>
        <DataTable
          data={myAttendance}
          columns={attendanceColumns}
          searchable={false}
        />
      </motion.div>

      {/* Leave & OT Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2 mb-0">
              <Calendar className="h-5 w-5 text-accent" />
              My Leave Requests
            </h3>
          </div>
          <DataTable
            data={myLeaves}
            columns={leaveColumns}
            searchable={false}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2 mb-0">
              <Clock className="h-5 w-5 text-accent" />
              My Overtime Requests
            </h3>
          </div>
          <DataTable
            data={myOT}
            columns={otColumns}
            searchable={false}
          />
        </motion.div>
      </div>

      {/* Reminders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="section-card"
      >
        <h3 className="section-title flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-accent" />
          Reminders
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <Clock className="h-5 w-5 text-warning" />
            <div>
              <p className="text-sm font-medium text-foreground">Submit your progress report</p>
              <p className="text-xs text-muted-foreground">Daily report due by 5:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <Calendar className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Upcoming leave</p>
              <p className="text-xs text-muted-foreground">Annual leave scheduled for Feb 1-5, 2025 (pending approval)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
