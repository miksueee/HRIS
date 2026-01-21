import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Building2, Briefcase, Calendar, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+974 5555 1234',
    address: 'Doha, Qatar',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password changed successfully');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header"
      >
        <h1 className="page-title flex items-center gap-2">
          <User className="h-6 w-6 text-accent" />
          My Profile
        </h1>
        <p className="page-subtitle">Manage your personal information and account settings</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-card bg-gradient-to-r from-secondary to-accent text-secondary-foreground"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-secondary-foreground/20 flex items-center justify-center text-3xl font-bold">
            {user?.name?.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold font-heading">{user?.name}</h2>
            <p className="opacity-90">Senior Developer • Engineering</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm opacity-80">
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {user?.employeeNumber}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined Jan 2021
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="section-card"
        >
          <h3 className="section-title flex items-center gap-2">
            <User className="h-5 w-5 text-accent" />
            Personal Information
          </h3>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </form>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section-card"
        >
          <h3 className="section-title flex items-center gap-2">
            <Lock className="h-5 w-5 text-accent" />
            Change Password
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
              <Lock className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Employment Details (Read-only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="section-card"
      >
        <h3 className="section-title flex items-center gap-2">
          <Building2 className="h-5 w-5 text-accent" />
          Employment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Employee Number</p>
            <p className="font-medium text-foreground">{user?.employeeNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="font-medium text-foreground">{user?.department}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Position</p>
            <p className="font-medium text-foreground">Senior Developer</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
              Regular
            </span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Join Date</p>
            <p className="font-medium text-foreground">January 10, 2021</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Manager</p>
            <p className="font-medium text-foreground">Mohammed Al-Rashid</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
