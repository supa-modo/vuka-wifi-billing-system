import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { TbWifi, TbEye, TbEyeOff, TbRefresh } from 'react-icons/tb';

const NetworkTab = ({ network, onChange, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-6">
      {/* WiFi Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">WiFi Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Network Name (SSID)"
              name="ssid"
              value={network.ssid}
              onChange={onChange}
              placeholder="Enter SSID"
              icon={<TbWifi className="text-gray-400" />}
            />
          </div>
          
          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={network.password}
              onChange={onChange}
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <TbEyeOff size={20} />
              ) : (
                <TbEye size={20} />
              )}
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bandwidth Limit (MB)
            </label>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              name="bandwidthLimit"
              value={network.bandwidthLimit}
              onChange={onChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>100 MB</span>
              <span className="font-medium">{network.bandwidthLimit} MB</span>
              <span>5000 MB</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Devices per User
            </label>
            <input
              type="range"
              min="1"
              max="10"
              name="maxDevices"
              value={network.maxDevices}
              onChange={onChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span className="font-medium">{network.maxDevices} devices</span>
              <span>10</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="captivePortalEnabled"
              name="captivePortalEnabled"
              type="checkbox"
              checked={network.captivePortalEnabled}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="captivePortalEnabled" className="ml-2 block text-sm text-gray-700">
              Enable Captive Portal
            </label>
          </div>
          
          <div className="flex justify-end items-end">
            <Button variant="primary" onClick={onSave}>
              Save Network Settings
            </Button>
          </div>
        </div>
      </div>
      
      {/* Captive Portal Settings */}
      {network.captivePortalEnabled && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Captive Portal Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portal Theme
              </label>
              <select
                name="portalTheme"
                value={network.portalTheme}
                onChange={onChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portal Logo URL
              </label>
              <Input
                type="text"
                name="portalLogo"
                value={network.portalLogo}
                onChange={onChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portal Title
              </label>
              <Input
                type="text"
                name="portalTitle"
                value={network.portalTitle}
                onChange={onChange}
                placeholder="Welcome to Our WiFi"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Welcome Message
              </label>
              <textarea
                name="portalWelcomeMessage"
                rows={3}
                value={network.portalWelcomeMessage}
                onChange={onChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                placeholder="Welcome to our WiFi network. Please enjoy your stay!"
              />
            </div>
            
            <div className="md:col-span-2 flex justify-end">
              <Button variant="primary" onClick={onSave}>
                Save Portal Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTab;
