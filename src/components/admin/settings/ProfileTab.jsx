import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { TbUser, TbMail, TbDeviceMobile } from 'react-icons/tb';

const ProfileTab = ({ profile, onChange, onSave }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={onChange}
              placeholder="Enter your full name"
              icon={<TbUser className="text-gray-400" />}
            />
          </div>
          
          <div>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profile.email}
              onChange={onChange}
              placeholder="Enter your email"
              icon={<TbMail className="text-gray-400" />}
            />
          </div>
          
          <div>
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={onChange}
              placeholder="+254 700 000000"
              icon={<TbDeviceMobile className="text-gray-400" />}
            />
          </div>
          
          <div className="flex items-end">
            <Button variant="primary" onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <Button variant="secondary" size="sm">
              Change Password
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">
                {profile.twoFactorEnabled 
                  ? 'Two-factor authentication is enabled' 
                  : 'Add an extra layer of security to your account'}
              </p>
            </div>
            <Button 
              variant={profile.twoFactorEnabled ? 'danger' : 'primary'} 
              size="sm"
            >
              {profile.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Account Activity</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Last Login</p>
              <p className="text-sm text-gray-500">
                {new Date(profile.lastLogin).toLocaleString()}
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {profile.role}
            </span>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Active Sessions</h4>
            {profile.activeSessions?.map((session) => (
              <div key={session.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{session.device}</p>
                  <p className="text-xs text-gray-500">
                    {session.location} • {session.lastActive}
                    {session.current && (
                      <span className="ml-2 text-xs font-medium text-green-600">Current</span>
                    )}
                  </p>
                </div>
                {!session.current && (
                  <button 
                    type="button" 
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Sign out
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
