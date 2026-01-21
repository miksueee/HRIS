import { motion } from 'framer-motion';
import { Users, UserCheck, UserMinus, Clock, Calendar, DollarSign, TrendingUp, FileText } from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { hrStats, employees, leaveRequests, departmentStats, monthlyLeaveStats } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(205, 77%, 26%)', 'hsl(205, 56%, 46%)', 'hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)'];

export default function HRDashboard() {
  const employeeColumns = [
    { key: 'employeeNumber', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'position', header: 'Position' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof employees[0]) => <StatusBadge status={item.status} />
    },
  ];

  const leaveColumns = [
    { key: 'employeeName', header: 'Employee', sortable: true },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'startDate', header: 'Start Date', sortable: true },
    { key: 'days', header: 'Days' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: typeof leaveRequests[0]) => <StatusBadge status={item.status} />
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
        <h1 className="page-title">HR Dashboard</h1>
        <p className="page-subtitle">Overview of employee statistics and pending requests</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Employees"
          value={hrStats.totalEmployees}
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
          variant="accent"
        />
        <KPICard
          title="Regular"
          value={hrStats.regularEmployees}
          icon={<UserCheck className="h-6 w-6" />}
        />
        <KPICard
          title="Probationary"
          value={hrStats.probationaryEmployees}
          icon={<Clock className="h-6 w-6" />}
        />
        <KPICard
          title="Monthly Payroll"
          value={`${hrStats.totalPayroll.toLocaleString()} QR`}
          icon={<DollarSign className="h-6 w-6" />}
          variant="secondary"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="section-card"
        >
          <h3 className="section-title flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Employees by Department
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="department"
                  label={({ department, count }) => `${department}: ${count}`}
                  labelLine={false}
                >
                  {departmentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Leaves */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section-card"
        >
          <h3 className="section-title flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Monthly Leave Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyLeaveStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="leaves" fill="hsl(205, 56%, 46%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2 mb-0">
              <Users className="h-5 w-5 text-accent" />
              Employee Directory
            </h3>
          </div>
          <DataTable
            data={employees.slice(0, 5)}
            columns={employeeColumns}
            searchable={false}
          />
        </motion.div>

        {/* Pending Leave Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2 mb-0">
              <FileText className="h-5 w-5 text-accent" />
              Leave Requests
            </h3>
            <span className="text-sm text-muted-foreground">
              {hrStats.pendingLeaves} pending
            </span>
          </div>
          <DataTable
            data={leaveRequests}
            columns={leaveColumns}
            searchable={false}
          />
        </motion.div>
      </div>
    </div>
  );
}
