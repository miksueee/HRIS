import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, Plus } from 'lucide-react';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { attendanceRecords, AttendanceRecord } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function AttendancePage() {
  const { user } = useAuth();
  
  // Filter attendance based on role
  const records = user?.role === 'employee' 
    ? attendanceRecords.filter(a => a.employeeName === 'Fatima Hassan')
    : attendanceRecords;

  const columns = [
    ...(user?.role !== 'employee' ? [{ key: 'employeeNumber' as const, header: 'ID' }] : []),
    ...(user?.role !== 'employee' ? [{ key: 'employeeName' as const, header: 'Name', sortable: true }] : []),
    { key: 'date' as const, header: 'Date', sortable: true },
    { key: 'day' as const, header: 'Day' },
    { 
      key: 'timeIn' as const, 
      header: 'Time In', 
      render: (item: AttendanceRecord) => item.timeIn || '-' 
    },
    { 
      key: 'timeOut' as const, 
      header: 'Time Out', 
      render: (item: AttendanceRecord) => item.timeOut || '-' 
    },
    { 
      key: 'status' as const, 
      header: 'Status',
      render: (item: AttendanceRecord) => <StatusBadge status={item.status} />
    },
  ];

  // Stats
  const presentDays = records.filter(r => r.status === 'present').length;
  const lateDays = records.filter(r => r.status === 'late').length;
  const absentDays = records.filter(r => r.status === 'absent').length;

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
            {user?.role === 'employee' ? 'My Attendance' : 'Attendance Records'}
          </h1>
          <p className="page-subtitle">View and manage attendance records</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Generate Monthly Report
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90">
            <FileText className="h-4 w-4 mr-2" />
            Request Adjustment
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="section-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-success/10">
            <Clock className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{presentDays}</p>
            <p className="text-sm text-muted-foreground">Present Days</p>
          </div>
        </div>
        <div className="section-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-warning/10">
            <Clock className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{lateDays}</p>
            <p className="text-sm text-muted-foreground">Late Arrivals</p>
          </div>
        </div>
        <div className="section-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-destructive/10">
            <Clock className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{absentDays}</p>
            <p className="text-sm text-muted-foreground">Absent Days</p>
          </div>
        </div>
      </motion.div>

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          data={records}
          columns={columns}
          searchPlaceholder="Search attendance records..."
        />
      </motion.div>
    </div>
  );
}
