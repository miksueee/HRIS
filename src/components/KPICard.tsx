import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function KPICard({ title, value, icon, trend, variant = 'default', className }: KPICardProps) {
  const variantStyles = {
    default: 'bg-card border-border/50',
    primary: 'bg-primary text-primary-foreground border-primary',
    secondary: 'bg-secondary text-secondary-foreground border-secondary',
    accent: 'bg-accent/10 border-accent/20',
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary-foreground/10 text-primary-foreground',
    secondary: 'bg-secondary-foreground/10 text-secondary-foreground',
    accent: 'bg-accent/20 text-accent',
  };

  const textStyles = {
    default: '',
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    accent: 'text-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl p-6 border shadow-card hover:shadow-card-hover transition-all duration-200',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn('text-sm font-medium uppercase tracking-wide mb-1', 
            variant === 'default' ? 'text-muted-foreground' : 'opacity-80',
            textStyles[variant]
          )}>
            {title}
          </p>
          <p className={cn('text-3xl font-bold font-heading', textStyles[variant])}>
            {value}
          </p>
          {trend && (
            <div className={cn('flex items-center mt-2 text-sm', textStyles[variant])}>
              <span className={cn(
                'font-medium',
                trend.isPositive ? 'text-success' : 'text-destructive',
                variant !== 'default' && 'opacity-90'
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className={cn('ml-1', variant === 'default' ? 'text-muted-foreground' : 'opacity-70')}>
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', iconStyles[variant])}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
