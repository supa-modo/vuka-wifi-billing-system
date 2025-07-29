import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { TbMail, TbDeviceMobile, TbBell } from 'react-icons/tb';

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100">
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

const NotificationsTab = ({ notifications, onChange, onSave }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (email && !notifications.emailRecipients?.includes(email)) {
      onChange({
        target: {
          name: 'emailRecipients',
          value: [...(notifications.emailRecipients || []), email]
        }
      });
      setEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    onChange({
      target: {
        name: 'emailRecipients',
        value: notifications.emailRecipients?.filter(e => e !== emailToRemove) || []
      }
    });
  };

  const handleAddPhone = (e) => {
    e.preventDefault();
    if (phone && !notifications.smsRecipients?.includes(phone)) {
      onChange({
        target: {
          name: 'smsRecipients',
          value: [...(notifications.smsRecipients || []), phone]
        }
      });
      setPhone('');
    }
  };

  const handleRemovePhone = (phoneToRemove) => {
    onChange({
      target: {
        name: 'smsRecipients',
        value: notifications.smsRecipients?.filter(p => p !== phoneToRemove) || []
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Email Notifications</h3>
        
        <div className="space-y-4">
          <ToggleSwitch
            enabled={notifications.email}
            onChange={(enabled) => onChange({ target: { name: 'email', checked: enabled } })}
            label="Enable Email Notifications"
            description="Receive important system notifications via email"
          />
          
          {notifications.email && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Recipients
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    icon={<TbMail className="text-gray-400" />}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleAddEmail}
                    disabled={!email}
                  >
                    Add
                  </Button>
                </div>
                
                {notifications.emailRecipients?.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {notifications.emailRecipients.map((email) => (
                      <div key={email} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-sm text-gray-700">{email}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEmail(email)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2 pt-4">
                <ToggleSwitch
                  enabled={notifications.lowBalance}
                  onChange={(enabled) => onChange({ target: { name: 'lowBalance', checked: enabled } })}
                  label="Low Balance Alerts"
                  description="Get notified when user balances are running low"
                />
                <ToggleSwitch
                  enabled={notifications.paymentReceived}
                  onChange={(enabled) => onChange({ target: { name: 'paymentReceived', checked: enabled } })}
                  label="Payment Notifications"
                  description="Get notified when payments are received"
                />
                <ToggleSwitch
                  enabled={notifications.newLogin}
                  onChange={(enabled) => onChange({ target: { name: 'newLogin', checked: enabled } })}
                  label="New Login Alerts"
                  description="Get notified of new logins to the admin panel"
                />
                <ToggleSwitch
                  enabled={notifications.systemAlerts}
                  onChange={(enabled) => onChange({ target: { name: 'systemAlerts', checked: enabled } })}
                  label="System Alerts"
                  description="Receive important system notifications"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* SMS Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">SMS Notifications</h3>
        
        <div className="space-y-4">
          <ToggleSwitch
            enabled={notifications.sms}
            onChange={(enabled) => onChange({ target: { name: 'sms', checked: enabled } })}
            label="Enable SMS Notifications"
            description="Receive important system notifications via SMS"
          />
          
          {notifications.sms && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Numbers
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000000"
                    icon={<TbDeviceMobile className="text-gray-400" />}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleAddPhone}
                    disabled={!phone}
                  >
                    Add
                  </Button>
                </div>
                
                {notifications.smsRecipients?.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {notifications.smsRecipients.map((number) => (
                      <div key={number} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-sm text-gray-700">{number}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePhone(number)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2 pt-4">
                <ToggleSwitch
                  enabled={notifications.criticalAlerts}
                  onChange={(enabled) => onChange({ target: { name: 'criticalAlerts', checked: enabled } })}
                  label="Critical Alerts"
                  description="Receive critical system alerts via SMS"
                />
                <ToggleSwitch
                  enabled={notifications.paymentSMS}
                  onChange={(enabled) => onChange({ target: { name: 'paymentSMS', checked: enabled } })}
                  label="Payment Confirmations"
                  description="Get SMS confirmations for payments"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button variant="primary" onClick={onSave}>
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationsTab;
