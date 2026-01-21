import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { progressReports } from '@/data/mockData';

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header"
      >
        <h1 className="page-title flex items-center gap-2">
          <FileText className="h-6 w-6 text-accent" />
          Progress Reports
        </h1>
        <p className="page-subtitle">View daily progress reports from your team</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-foreground">{progressReports.length}</p>
          <p className="text-sm text-muted-foreground">Reports Today</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-success">
            {progressReports.reduce((sum, r) => sum + r.tasksCompleted.length, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Tasks Completed</p>
        </div>
        <div className="section-card text-center">
          <p className="text-3xl font-bold text-accent">
            {progressReports.reduce((sum, r) => sum + r.hoursWorked, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total Hours Logged</p>
        </div>
      </motion.div>

      {/* Progress Reports Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="section-title">Today's Reports - January 20, 2025</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {progressReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="section-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                  {report.employeeName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{report.employeeName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {report.hoursWorked} hours logged
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{report.date}</span>
              </div>
              
              <div className="space-y-4">
                {/* Completed Tasks */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Completed ({report.tasksCompleted.length})
                  </p>
                  <ul className="space-y-1.5">
                    {report.tasksCompleted.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                        <span className="text-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* In Progress */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-accent" />
                    In Progress ({report.tasksInProgress.length})
                  </p>
                  <ul className="space-y-1.5">
                    {report.tasksInProgress.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Blockers */}
                {report.blockers.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 text-destructive" />
                      Blockers ({report.blockers.length})
                    </p>
                    <ul className="space-y-1.5">
                      {report.blockers.map((blocker, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                          <span className="text-foreground">{blocker}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
