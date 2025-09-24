import React, { useState } from 'react';
import { Search, Phone } from 'lucide-react';

interface PhoneInputProps {
  onSubmit: (phoneNumber: string) => void;
  isLoading: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ onSubmit, isLoading }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      onSubmit(phoneNumber.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-blue-100 p-4 rounded-full">
            <Phone className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Phone Intelligence Lookup</h2>
          <p className="text-gray-600">Enter a phone number to get comprehensive intelligence data</p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 555 123 4567"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              disabled={isLoading}
            />
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
          <button
            type="submit"
            disabled={!phoneNumber.trim() || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Analyze Phone Number</span>
              </>
            )}
          </button>
        </form>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <h4 className="font-semibold text-blue-900 mb-2">📋 Phone Number Format Instructions</h4>
          <div className="text-blue-800 space-y-1 text-left">
            <p><strong>✅ Correct formats:</strong></p>
            <div className="ml-4 space-y-1 font-mono text-xs">
              <p>• +1 555 123 4567 (US)</p>
              <p>• +65 1234 5678 (Singapore)</p>
              <p>• +44 20 7946 0958 (UK)</p>
              <p>• +49 30 12345678 (Germany)</p>
              <p>• +33 1 42 86 83 26 (France)</p>
            </div>
            <p className="mt-2"><strong>⚠️ Important:</strong> Always include the country code with + sign</p>
          </div>
        </div>
      </div>
    </div>
  );
};