import { useState } from 'react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { TbCopy, TbCheck } from 'react-icons/tb';

const PaypalSettings = ({ settings, onChange, onSave, loading, onToggle }) => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fields = [
    { 
      name: 'paypalClientId', 
      label: 'Client ID', 
      required: true,
      placeholder: 'Your PayPal client ID'
    },
    { 
      name: 'paypalSecret', 
      label: 'Secret', 
      type: 'password',
      required: true,
      placeholder: 'Your PayPal secret'
    },
    {
      name: 'paypalEnvironment',
      label: 'Environment',
      type: 'select',
      options: [
        { value: 'sandbox', label: 'Sandbox (Test)' },
        { value: 'live', label: 'Live (Production)' }
      ],
      required: true
    },
    { 
      name: 'paypalWebhookUrl', 
      label: 'Webhook URL', 
      value: `${window.location.origin}/api/paypal/webhook`,
      readonly: true,
      copyable: true,
      help: 'Use this URL in your PayPal webhook settings'
    },
    { 
      name: 'paypalWebhookId', 
      label: 'Webhook ID', 
      placeholder: 'Your PayPal webhook ID',
      help: 'Enter the webhook ID from PayPal if you want to verify webhook events'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">PayPal Settings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure your PayPal payment gateway settings
          </p>
        </div>
        <button
          type="button"
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            settings.paypalEnabled ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          onClick={() => onToggle('paypal', !settings.paypalEnabled)}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              settings.paypalEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {settings.paypalEnabled && (
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={settings[field.name] || ''}
                  onChange={onChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
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
                        onClick={() => handleCopy(field.name, field.value)}
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
              )}
              
              {field.help && (
                <p className="mt-1 text-xs text-gray-500">{field.help}</p>
              )}
            </div>
          ))}
          
          <div className="pt-2">
            <Button variant="primary" onClick={onSave} loading={loading}>
              Save PayPal Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaypalSettings;
