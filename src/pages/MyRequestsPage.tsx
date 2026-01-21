import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, Calendar, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { leaveRequests, otRequests, LeaveRequest, OTRequest } from '@/data/mockData';
import { toast } from 'sonner';

export default function MyRequestsPage() {
  const [isOTDialogOpen, setIsOTDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  
  const [otForm, setOtForm] = useState({
    date: '',
    hours: '',
    reason: '',
  });

  const [leaveForm, setLeaveForm] = useState({
    type: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
  });

  // Filter for current employee
  const myLeaves = leaveRequests.filter(l => l.employeeName === 'Fatima Hassan');
  const myOT = otRequests.filter(o => o.employeeName === 'Fatima Hassan');

  const handleOTSubmit = () => {
    toast.success('Overtime request submitted successfully');
    setIsOTDialogOpen(false);
    setOtForm({ date: '', hours: '', reason: '' });
  };

  const handleLeaveSubmit = () => {
    toast.success('Leave request submitted successfully');
    setIsLeaveDialogOpen(false);
    setLeaveForm({ type: 'annual', startDate: '', endDate: '', reason: '' });
  };

  const leaveColumns = [
    { 
      key: 'type' as const, 
      header: 'Type',
      render: (item: LeaveRequest) => (
        <span className="capitalize">{item.type}</span>
      )
    },
    { key: 'startDate' as const, header: 'Start', sortable: true },
    { key: 'endDate' as const, header: 'End' },
    { key: 'days' as const, header: 'Days' },
    { key: 'reason' as const, header: 'Reason' },
    { key: 'appliedDate' as const, header: 'Applied On' },
    { 
      key: 'status' as const, 
      header: 'Status',
      render: (item: LeaveRequest) => <StatusBadge status={item.status} />
    },
  ];

  const otColumns = [
    { key: 'date' as const, header: 'Date', sortable: true },
    { 
      key: 'hours' as const, 
      header: 'Hours',
      render: (item: OTRequest) => `${item.hours} hrs`
    },
    { key: 'reason' as const, header: 'Reason' },
    { key: 'appliedDate' as const, header: 'Applied On' },
    { 
      key: 'status' as const, 
      header: 'Status',
      render: (item: OTRequest) => <StatusBadge status={item.status} />
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
            <FileText className="h-6 w-6 text-accent" />
            My Requests
          </h1>
          <p className="page-subtitle">View and submit leave and overtime requests</p>
        </div>

        <div className="flex gap-2">
          {/* Leave Request Dialog */}
          <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Apply Leave
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">Apply for Leave</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Leave Type</Label>
                  <Select value={leaveForm.type} onValueChange={(v) => setLeaveForm({ ...leaveForm, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="emergency">Emergency Leave</SelectItem>
                      <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={leaveForm.startDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={leaveForm.endDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="leaveReason">Reason</Label>
                  <Textarea
                    id="leaveReason"
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    placeholder="Provide reason for leave..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleLeaveSubmit} className="bg-secondary hover:bg-secondary/90">
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* OT Request Dialog */}
          <Dialog open={isOTDialogOpen} onOpenChange={setIsOTDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-secondary hover:bg-secondary/90">
                <Clock className="h-4 w-4 mr-2" />
                Apply Overtime
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">Apply for Overtime</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="otDate">Date</Label>
                  <Input
                    id="otDate"
                    type="date"
                    value={otForm.date}
                    onChange={(e) => setOtForm({ ...otForm, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="otHours">Hours</Label>
                  <Input
                    id="otHours"
                    type="number"
                    min="1"
                    max="8"
                    value={otForm.hours}
                    onChange={(e) => setOtForm({ ...otForm, hours: e.target.value })}
                    placeholder="Number of overtime hours"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="otReason">Reason</Label>
                  <Textarea
                    id="otReason"
                    value={otForm.reason}
                    onChange={(e) => setOtForm({ ...otForm, reason: e.target.value })}
                    placeholder="Describe the work to be done during overtime..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsOTDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleOTSubmit} className="bg-secondary hover:bg-secondary/90">
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-foreground">15</p>
          <p className="text-sm text-muted-foreground">Leave Balance</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-accent">{myLeaves.filter(l => l.status === 'pending').length}</p>
          <p className="text-sm text-muted-foreground">Pending Leaves</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-accent">{myOT.filter(o => o.status === 'pending').length}</p>
          <p className="text-sm text-muted-foreground">Pending OT</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-success">{myOT.filter(o => o.status === 'approved').reduce((sum, o) => sum + o.hours, 0)}</p>
          <p className="text-sm text-muted-foreground">OT Hours Approved</p>
        </div>
      </motion.div>

      {/* Leave Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="section-title flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          Leave Requests
        </h3>
        <DataTable
          data={myLeaves}
          columns={leaveColumns}
          searchable={false}
        />
      </motion.div>

      {/* OT Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="section-title flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" />
          Overtime Requests
        </h3>
        <DataTable
          data={myOT}
          columns={otColumns}
          searchable={false}
        />
      </motion.div>
    </div>
  );
}
