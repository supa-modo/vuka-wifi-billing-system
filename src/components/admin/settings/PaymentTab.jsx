import { useState } from 'react';
import { Button } from '../../ui/Button';
import MpesaSettings from './payment/MpesaSettings';
import PaypalSettings from './payment/PaypalSettings';
import StripeSettings from './payment/StripeSettings';
import { TbCreditCard, TbDeviceMobile, TbWorld } from 'react-icons/tb';

const PaymentTab = ({ payment, onChange, onSave, loading = {} }) => {
  const [activeTab, setActiveTab] = useState('mpesa');

  const handleToggleGateway = (gateway, enabled) => {
    onChange({
      target: {
        name: `${gateway}Enabled`,
        value: enabled
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Gateways</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'mpesa', icon: <TbDeviceMobile className="h-6 w-6 text-green-600 mr-2" /> },
            { id: 'paypal', icon: <TbWorld className="h-6 w-6 text-blue-600 mr-2" /> },
            { id: 'stripe', icon: <TbCreditCard className="h-6 w-6 text-purple-600 mr-2" /> }
          ].map(({ id, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`p-4 rounded-lg border-2 ${
                activeTab === id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                {icon}
                <span className="font-medium capitalize">{id}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'mpesa' && (
            <MpesaSettings 
              settings={payment}
              onChange={onChange}
              onSave={() => onSave('mpesa')}
              loading={loading.mpesa}
              onToggle={handleToggleGateway}
            />
          )}
          
          {activeTab === 'paypal' && (
            <PaypalSettings 
              settings={payment}
              onChange={onChange}
              onSave={() => onSave('paypal')}
              loading={loading.paypal}
              onToggle={handleToggleGateway}
            />
          )}
          
          {activeTab === 'stripe' && (
            <StripeSettings 
              settings={payment}
              onChange={onChange}
              onSave={() => onSave('stripe')}
              loading={loading.stripe}
              onToggle={handleToggleGateway}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentTab;
