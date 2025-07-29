import { useState } from 'react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { TbCopy, TbCheck } from 'react-icons/tb';

const MpesaSettings = ({ settings, onChange, onSave, loading, onToggle }) => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fields = [
    { 
      name: 'mpesaShortcode', 
      label: 'Shortcode', 
      required: true,
      placeholder: 'e.g., 123456' 
    },
    { 
      name: 'mpesaPasskey', 
      label: 'Passkey', 
      type: 'password',
      required: true,
      placeholder: 'Your M-Pesa passkey'
    },
    { 
      name: 'mpesaConsumerKey', 
      label: 'Consumer Key', 
      type: 'password',
      required: true,
      placeholder: 'Your M-Pesa consumer key'
    },
    { 
      name: 'mpesaConsumerSecret', 
      label: 'Consumer Secret', 
      type: 'password',
      required: true,
      placeholder: 'Your M-Pesa consumer secret'
    },
    { 
      name: 'mpesaCallbackUrl', 
      label: 'Callback URL', 
      value: `${window.location.origin}/api/mpesa/callback`,
      readonly: true,
      copyable: true,
      help: 'Use this URL in your M-Pesa API settings'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">M-Pesa Settings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure your M-Pesa payment gateway settings
          </p>
        </div>
        <button
          type="button"
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            settings.mpesaEnabled ? 'bg-green-600' : 'bg-gray-200'
          }`}
          onClick={() => onToggle('mpesa', !settings.mpesaEnabled)}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              settings.mpesaEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {settings.mpesaEnabled && (
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="relative">
                <Input
                  type={field.type || 'text'}
                  name={field.name}
                  value={field.value || settings[field.name] || ''}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  className={field.copyable ? 'pr-10' : ''}
                  disabled={field.readonly}
                />
                {field.copyable && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => handleCopy(field.name, field.value || settings[field.name])}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      title={copiedField === field.name ? 'Copied!' : 'Copy to clipboard'}
                    >
                      {copiedField === field.name ? (
                        <TbCheck className="h-5 w-5 text-green-500" />
                      ) : (
                        <TbCopy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
              {field.help && (
                <p className="mt-1 text-xs text-gray-500">{field.help}</p>
              )}
            </div>
          ))}
          
          <div className="pt-2">
            <Button variant="primary" onClick={onSave} loading={loading}>
              Save M-Pesa Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MpesaSettings;
