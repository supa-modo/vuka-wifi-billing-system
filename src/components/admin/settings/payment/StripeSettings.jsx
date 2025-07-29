import { useState } from 'react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { TbCopy, TbCheck } from 'react-icons/tb';

const StripeSettings = ({ settings, onChange, onSave, loading, onToggle }) => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fields = [
    { 
      name: 'stripePublishableKey', 
      label: 'Publishable Key', 
      required: true,
      placeholder: 'pk_test_... or pk_live_...'
    },
    { 
      name: 'stripeSecretKey', 
      label: 'Secret Key', 
      type: 'password',
      required: true,
      placeholder: 'sk_test_... or sk_live_...'
    },
    { 
      name: 'stripeWebhookSecret', 
      label: 'Webhook Signing Secret', 
      type: 'password',
      required: true,
      placeholder: 'whsec_...',
      help: 'Required for processing webhook events'
    },
    { 
      name: 'stripeWebhookUrl', 
      label: 'Webhook URL', 
      value: `${window.location.origin}/api/stripe/webhook`,
      readonly: true,
      copyable: true,
      help: 'Use this URL in your Stripe webhook settings'
    },
    {
      name: 'stripeStatementDescriptor',
      label: 'Statement Descriptor',
      placeholder: 'Your Business Name',
      help: 'Appears on customer\'s credit card statement (max 22 characters)',
      maxLength: 22
    }
  ];

  // Check if we're in test mode
  const isTestMode = settings.stripePublishableKey?.startsWith('pk_test_');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Stripe Settings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure your Stripe payment gateway settings
          </p>
        </div>
        <button
          type="button"
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            settings.stripeEnabled ? 'bg-purple-600' : 'bg-gray-200'
          }`}
          onClick={() => onToggle('stripe', !settings.stripeEnabled)}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              settings.stripeEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {settings.stripeEnabled && (
        <div className="space-y-4">
          {/* Test mode indicator */}
          {settings.stripePublishableKey && (
            <div className={`p-3 rounded-md ${
              isTestMode ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-green-50 border-l-4 border-green-400'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {isTestMode ? (
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    isTestMode ? 'text-yellow-800' : 'text-green-800'
                  }`}>
                    {isTestMode ? 'Test Mode' : 'Live Mode'}
                  </p>
                  <p className={`text-xs ${
                    isTestMode ? 'text-yellow-700' : 'text-green-700'
                  }`}>
                    {isTestMode 
                      ? 'You are currently in test mode. No real charges will be processed.'
                      : 'You are currently in live mode. Real charges will be processed.'}
                  </p>
                </div>
              </div>
            </div>
          )}

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
                  maxLength={field.maxLength}
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
              {field.help && (
                <p className="mt-1 text-xs text-gray-500">{field.help}</p>
              )}
            </div>
          ))}
          
          <div className="pt-2">
            <Button variant="primary" onClick={onSave} loading={loading}>
              Save Stripe Settings
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Testing in Test Mode</h4>
            <p className="text-xs text-gray-500 mb-3">
              Use these test card numbers to simulate payments in test mode:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2 rounded border border-gray-200">
                <div className="font-medium">Visa (success)</div>
                <div className="text-gray-600">4242 4242 4242 4242</div>
                <div className="text-gray-500 text-2xs">Any future date, any 3 digits</div>
              </div>
              <div className="bg-white p-2 rounded border border-gray-200">
                <div className="font-medium">3D Secure Auth</div>
                <div className="text-gray-600">4000 0025 0000 3155</div>
                <div className="text-gray-500 text-2xs">Complete authentication</div>
              </div>
              <div className="bg-white p-2 rounded border border-gray-200">
                <div className="font-medium">Insufficient Funds</div>
                <div className="text-gray-600">4000 0000 0000 9995</div>
                <div className="text-gray-500 text-2xs">Will be declined</div>
              </div>
              <div className="bg-white p-2 rounded border border-gray-200">
                <div className="font-medium">More test cards</div>
                <a 
                  href="https://stripe.com/docs/testing#cards" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs"
                >
                  View all test cards →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StripeSettings;
