// Mock data for the HRIS system

export interface Employee {
  id: string;
  employeeNumber: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'regular' | 'probationary' | 'resigned';
  joinDate: string;
  manager: string;
  salary: number;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  day: string;
  timeIn: string | null;
  timeOut: string | null;
  status: 'present' | 'late' | 'absent' | 'half-day' | 'on-leave';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  type: 'annual' | 'sick' | 'emergency' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface OTRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  hours: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface ProgressReport {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  tasksCompleted: string[];
  tasksInProgress: string[];
  blockers: string[];
  hoursWorked: number;
}

// Mock Employees
export const employees: Employee[] = [
  {
    id: '1',
    employeeNumber: 'EMP001',
    name: 'Sarah Al-Thani',
    email: 'sarah@company.qa',
    department: 'Human Resources',
    position: 'HR Manager',
    status: 'regular',
    joinDate: '2020-03-15',
    manager: 'CEO',
    salary: 25000,
  },
  {
    id: '2',
    employeeNumber: 'EMP002',
    name: 'Mohammed Al-Rashid',
    email: 'mohammed@company.qa',
    department: 'Engineering',
    position: 'Engineering Manager',
    status: 'regular',
    joinDate: '2019-08-01',
    manager: 'CTO',
    salary: 35000,
  },
  {
    id: '3',
    employeeNumber: 'EMP003',
    name: 'Fatima Hassan',
    email: 'fatima@company.qa',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'regular',
    joinDate: '2021-01-10',
    manager: 'Mohammed Al-Rashid',
    salary: 22000,
  },
  {
    id: '4',
    employeeNumber: 'EMP004',
    name: 'Ahmed Khalil',
    email: 'ahmed@company.qa',
    department: 'Engineering',
    position: 'Developer',
    status: 'probationary',
    joinDate: '2024-10-01',
    manager: 'Mohammed Al-Rashid',
    salary: 15000,
  },
  {
    id: '5',
    employeeNumber: 'EMP005',
    name: 'Layla Ibrahim',
    email: 'layla@company.qa',
    department: 'Marketing',
    position: 'Marketing Specialist',
    status: 'regular',
    joinDate: '2022-06-20',
    manager: 'Marketing Director',
    salary: 18000,
  },
  {
    id: '6',
    employeeNumber: 'EMP006',
    name: 'Omar Farouk',
    email: 'omar@company.qa',
    department: 'Finance',
    position: 'Accountant',
    status: 'regular',
    joinDate: '2021-09-15',
    manager: 'CFO',
    salary: 20000,
  },
  {
    id: '7',
    employeeNumber: 'EMP007',
    name: 'Nour Al-Din',
    email: 'nour@company.qa',
    department: 'Engineering',
    position: 'QA Engineer',
    status: 'resigned',
    joinDate: '2020-04-01',
    manager: 'Mohammed Al-Rashid',
    salary: 17000,
  },
  {
    id: '8',
    employeeNumber: 'EMP008',
    name: 'Rania Mahmoud',
    email: 'rania@company.qa',
    department: 'Engineering',
    position: 'UI/UX Designer',
    status: 'regular',
    joinDate: '2023-02-14',
    manager: 'Mohammed Al-Rashid',
    salary: 19000,
  },
];

// Mock Attendance Records
export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: '3', employeeName: 'Fatima Hassan', date: '2025-01-20', day: 'Monday', timeIn: '08:55', timeOut: '17:30', status: 'present' },
  { id: '2', employeeId: '3', employeeName: 'Fatima Hassan', date: '2025-01-19', day: 'Sunday', timeIn: '09:15', timeOut: '17:45', status: 'late' },
  { id: '3', employeeId: '3', employeeName: 'Fatima Hassan', date: '2025-01-18', day: 'Saturday', timeIn: null, timeOut: null, status: 'absent' },
  { id: '4', employeeId: '3', employeeName: 'Fatima Hassan', date: '2025-01-16', day: 'Thursday', timeIn: '08:45', timeOut: '17:00', status: 'present' },
  { id: '5', employeeId: '3', employeeName: 'Fatima Hassan', date: '2025-01-15', day: 'Wednesday', timeIn: '08:50', timeOut: '17:15', status: 'present' },
  { id: '6', employeeId: '4', employeeName: 'Ahmed Khalil', date: '2025-01-20', day: 'Monday', timeIn: '09:30', timeOut: '18:00', status: 'late' },
  { id: '7', employeeId: '4', employeeName: 'Ahmed Khalil', date: '2025-01-19', day: 'Sunday', timeIn: '08:55', timeOut: '17:30', status: 'present' },
  { id: '8', employeeId: '8', employeeName: 'Rania Mahmoud', date: '2025-01-20', day: 'Monday', timeIn: '08:45', timeOut: '17:15', status: 'present' },
  { id: '9', employeeId: '8', employeeName: 'Rania Mahmoud', date: '2025-01-19', day: 'Sunday', timeIn: null, timeOut: null, status: 'on-leave' },
];

// Mock Leave Requests
export const leaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '3',
    employeeName: 'Fatima Hassan',
    department: 'Engineering',
    type: 'annual',
    startDate: '2025-02-01',
    endDate: '2025-02-05',
    days: 5,
    reason: 'Family vacation',
    status: 'pending',
    appliedDate: '2025-01-18',
  },
  {
    id: '2',
    employeeId: '4',
    employeeName: 'Ahmed Khalil',
    department: 'Engineering',
    type: 'sick',
    startDate: '2025-01-22',
    endDate: '2025-01-23',
    days: 2,
    reason: 'Medical appointment',
    status: 'pending',
    appliedDate: '2025-01-20',
  },
  {
    id: '3',
    employeeId: '8',
    employeeName: 'Rania Mahmoud',
    department: 'Engineering',
    type: 'annual',
    startDate: '2025-01-19',
    endDate: '2025-01-19',
    days: 1,
    reason: 'Personal matters',
    status: 'approved',
    appliedDate: '2025-01-15',
  },
  {
    id: '4',
    employeeId: '5',
    employeeName: 'Layla Ibrahim',
    department: 'Marketing',
    type: 'emergency',
    startDate: '2025-01-25',
    endDate: '2025-01-26',
    days: 2,
    reason: 'Family emergency',
    status: 'pending',
    appliedDate: '2025-01-20',
  },
];

// Mock OT Requests
export const otRequests: OTRequest[] = [
  {
    id: '1',
    employeeId: '3',
    employeeName: 'Fatima Hassan',
    department: 'Engineering',
    date: '2025-01-21',
    hours: 3,
    reason: 'Project deadline - API integration',
    status: 'pending',
    appliedDate: '2025-01-20',
  },
  {
    id: '2',
    employeeId: '4',
    employeeName: 'Ahmed Khalil',
    department: 'Engineering',
    date: '2025-01-20',
    hours: 2,
    reason: 'Bug fixes for production release',
    status: 'approved',
    appliedDate: '2025-01-19',
  },
  {
    id: '3',
    employeeId: '8',
    employeeName: 'Rania Mahmoud',
    department: 'Engineering',
    date: '2025-01-22',
    hours: 4,
    reason: 'Design deliverables for client presentation',
    status: 'pending',
    appliedDate: '2025-01-20',
  },
];

// Mock Progress Reports
export const progressReports: ProgressReport[] = [
  {
    id: '1',
    employeeId: '3',
    employeeName: 'Fatima Hassan',
    date: '2025-01-20',
    tasksCompleted: ['Implemented user authentication', 'Fixed navigation bug'],
    tasksInProgress: ['API integration for payments', 'Unit tests'],
    blockers: [],
    hoursWorked: 8.5,
  },
  {
    id: '2',
    employeeId: '4',
    employeeName: 'Ahmed Khalil',
    date: '2025-01-20',
    tasksCompleted: ['Code review', 'Documentation update'],
    tasksInProgress: ['Feature development - Dashboard charts'],
    blockers: ['Waiting for design specs'],
    hoursWorked: 8,
  },
  {
    id: '3',
    employeeId: '8',
    employeeName: 'Rania Mahmoud',
    date: '2025-01-20',
    tasksCompleted: ['Mobile app wireframes', 'Icon set revision'],
    tasksInProgress: ['Dashboard redesign', 'User flow diagrams'],
    blockers: [],
    hoursWorked: 8,
  },
];

// Summary statistics
export const hrStats = {
  totalEmployees: employees.length,
  regularEmployees: employees.filter(e => e.status === 'regular').length,
  probationaryEmployees: employees.filter(e => e.status === 'probationary').length,
  resignedEmployees: employees.filter(e => e.status === 'resigned').length,
  pendingLeaves: leaveRequests.filter(l => l.status === 'pending').length,
  pendingOT: otRequests.filter(o => o.status === 'pending').length,
  totalPayroll: employees.filter(e => e.status !== 'resigned').reduce((sum, e) => sum + e.salary, 0),
};

export const departmentStats = [
  { department: 'Engineering', count: 5 },
  { department: 'Human Resources', count: 1 },
  { department: 'Marketing', count: 1 },
  { department: 'Finance', count: 1 },
];

export const monthlyLeaveStats = [
  { month: 'Oct', leaves: 8 },
  { month: 'Nov', leaves: 12 },
  { month: 'Dec', leaves: 15 },
  { month: 'Jan', leaves: 10 },
];
