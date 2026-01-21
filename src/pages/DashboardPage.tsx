import { useAuth } from '@/contexts/AuthContext';
import HRDashboard from './dashboards/HRDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import EmployeeDashboard from './dashboards/EmployeeDashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'hr':
      return <HRDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    default:
      return <EmployeeDashboard />;
  }
}
