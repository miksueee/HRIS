import { cn } from '@/lib/utils';

type StatusType = 'regular' | 'probationary' | 'resigned' | 'pending' | 'approved' | 'rejected' | 'present' | 'late' | 'absent' | 'on-leave' | 'half-day';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  regular: { label: 'Regular', className: 'bg-green-100 text-green-800' },
  probationary: { label: 'Probationary', className: 'bg-amber-100 text-amber-800' },
  resigned: { label: 'Resigned', className: 'bg-red-100 text-red-800' },
  pending: { label: 'Pending', className: 'bg-blue-100 text-blue-800' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
  present: { label: 'Present', className: 'bg-green-100 text-green-800' },
  late: { label: 'Late', className: 'bg-amber-100 text-amber-800' },
  absent: { label: 'Absent', className: 'bg-red-100 text-red-800' },
  'on-leave': { label: 'On Leave', className: 'bg-blue-100 text-blue-800' },
  'half-day': { label: 'Half Day', className: 'bg-purple-100 text-purple-800' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}
