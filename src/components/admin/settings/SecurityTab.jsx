import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { TbLock, TbDeviceDesktop, TbRefresh, TbCopy, TbCheck } from 'react-icons/tb';

const SecurityTab = ({ security, twoFA, onToggle2FA, onVerify2FA, onDisable2FA }) => {
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(twoFA.secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggle2FAClick = async () => {
    if (security.twoFactorEnabled) {
      await onDisable2FA();
    } else {
      await onToggle2FA();
      setShow2FASetup(true);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const success = await onVerify2FA(code);
    if (success) {
      setShow2FASetup(false);
      setCode('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Two-Factor Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">
                {security.twoFactorEnabled 
                  ? 'Two-factor authentication is enabled' 
                  : 'Add an extra layer of security to your account'}
              </p>
            </div>
            <Button 
              variant={security.twoFactorEnabled ? 'danger' : 'primary'} 
              size="sm"
              onClick={handleToggle2FAClick}
              disabled={twoFA.loading}
            >
              {security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>

          {show2FASetup && (
            <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-4">Set Up Two-Factor Authentication</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <img src={twoFA.qrCode} alt="QR Code" className="h-48 w-48" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secret Key
                    </label>
                    <div className="flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow">
                        <input
                          type="text"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-l-md sm:text-sm border-gray-300 bg-gray-50"
                          value={twoFA.secret}
                          readOnly
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        {copied ? (
                          <TbCheck className="h-4 w-4 text-green-600" />
                        ) : (
                          <TbCopy className="h-4 w-4 text-gray-400" />
                        )}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleVerify}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Verification Code
                      </label>
                      <Input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="font-mono text-center tracking-widest"
                        required
                      />
                    </div>

                    <div className="flex space-x-3 mt-4">
                      <Button 
                        type="submit" 
                        variant="primary"
                        disabled={code.length !== 6 || twoFA.loading}
                        loading={twoFA.loading}
                      >
                        Verify & Enable
                      </Button>
                      <Button 
                        type="button" 
                        variant="secondary"
                        onClick={() => {
                          setShow2FASetup(false);
                          setCode('');
                        }}
                        disabled={twoFA.loading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Active Sessions</h3>
        
        <div className="space-y-4">
          {security.activeSessions?.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <TbDeviceDesktop className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{session.device}</p>
                  <p className="text-xs text-gray-500">
                    {session.location} • {session.lastActive}
                    {session.current && (
                      <span className="ml-2 text-xs font-medium text-green-600">Current</span>
                    )}
                  </p>
                </div>
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
  );
};

export default SecurityTab;
