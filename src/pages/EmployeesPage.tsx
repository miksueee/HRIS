import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Filter, MoreHorizontal, Edit, Trash2, UserPlus } from 'lucide-react';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { employees, Employee } from '@/data/mockData';

export default function EmployeesPage() {
  const [employeeList, setEmployeeList] = useState<Employee[]>(employees);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    department: string;
    position: string;
    status: 'regular' | 'probationary' | 'resigned';
    salary: string;
  }>({
    name: '',
    email: '',
    department: '',
    position: '',
    status: 'probationary',
    salary: '',
  });

  const departments = ['Engineering', 'Human Resources', 'Marketing', 'Finance', 'Operations'];
  
  const handleAddEmployee = () => {
    const newEmployee: Employee = {
      id: String(employeeList.length + 1),
      employeeNumber: `EMP${String(employeeList.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      department: formData.department,
      position: formData.position,
      status: formData.status,
      joinDate: new Date().toISOString().split('T')[0],
      manager: 'TBD',
      salary: Number(formData.salary),
    };
    
    setEmployeeList([...employeeList, newEmployee]);
    setIsDialogOpen(false);
    setFormData({ name: '', email: '', department: '', position: '', status: 'probationary', salary: '' });
  };

  const columns = [
    { key: 'employeeNumber', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'position', header: 'Position', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: Employee) => <StatusBadge status={item.status} />
    },
    { 
      key: 'salary', 
      header: 'Salary (QR)',
      render: (item: Employee) => item.salary.toLocaleString()
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      )
    },
  ];

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
            <Users className="h-6 w-6 text-accent" />
            Employee Directory
          </h1>
          <p className="page-subtitle">Manage all employee records</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-heading">Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@company.qa"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as 'regular' | 'probationary' | 'resigned' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="probationary">Probationary</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="resigned">Resigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="salary">Salary (QR)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="Monthly salary"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddEmployee} className="bg-secondary hover:bg-secondary/90">
                Add Employee
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Employee Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          data={employeeList}
          columns={columns}
          searchPlaceholder="Search employees..."
        />
      </motion.div>
    </div>
  );
}
