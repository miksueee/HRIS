import { motion } from 'framer-motion';
import { DollarSign, Users, FileText, Download, Calendar } from 'lucide-react';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { employees, hrStats, Employee } from '@/data/mockData';

export default function PayrollPage() {
  const activeEmployees = employees.filter(e => e.status !== 'resigned');

  const columns = [
    { key: 'employeeNumber' as const, header: 'ID', sortable: true },
    { key: 'name' as const, header: 'Name', sortable: true },
    { key: 'department' as const, header: 'Department', sortable: true },
    { key: 'position' as const, header: 'Position' },
    { 
      key: 'salary' as const, 
      header: 'Basic Salary (QR)',
      render: (item: Employee) => item.salary.toLocaleString()
    },
    { 
      key: 'allowances' as const, 
      header: 'Allowances (QR)',
      render: (item: Employee) => Math.round(item.salary * 0.15).toLocaleString()
    },
    { 
      key: 'deductions' as const, 
      header: 'Deductions (QR)',
      render: (item: Employee) => Math.round(item.salary * 0.05).toLocaleString()
    },
    { 
      key: 'netSalary' as const, 
      header: 'Net Salary (QR)',
      render: (item: Employee) => {
        const net = item.salary + (item.salary * 0.15) - (item.salary * 0.05);
        return (
          <span className="font-semibold text-accent">{net.toLocaleString()}</span>
        );
      }
    },
  ];

  const totalNet = activeEmployees.reduce((sum, e) => {
    return sum + e.salary + (e.salary * 0.15) - (e.salary * 0.05);
  }, 0);

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
            <DollarSign className="h-6 w-6 text-accent" />
            Payroll Management
          </h1>
          <p className="page-subtitle">Generate and manage employee payroll (QR - Qatari Rial)</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Select Period
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90">
            <FileText className="h-4 w-4 mr-2" />
            Generate Payroll
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="section-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-accent/10">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeEmployees.length}</p>
              <p className="text-sm text-muted-foreground">Active Employees</p>
            </div>
          </div>
        </div>
        <div className="section-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-secondary/10">
              <DollarSign className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{hrStats.totalPayroll.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Basic (QR)</p>
            </div>
          </div>
        </div>
        <div className="section-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-success/10">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{Math.round(hrStats.totalPayroll * 0.15).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Allowances (QR)</p>
            </div>
          </div>
        </div>
        <div className="section-card bg-gradient-to-r from-secondary to-accent text-secondary-foreground">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-secondary-foreground/20">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalNet.toLocaleString()}</p>
              <p className="text-sm opacity-80">Net Payroll (QR)</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payroll Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title flex items-center gap-2 mb-0">
            <FileText className="h-5 w-5 text-accent" />
            Payroll Details - January 2025
          </h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
        <DataTable
          data={activeEmployees}
          columns={columns}
          searchPlaceholder="Search employees..."
        />
      </motion.div>
    </div>
  );
}
