import React from 'react';
import { CheckCircle, XCircle, Globe, MapPin, Smartphone } from 'lucide-react';
import type { PhoneValidation } from '../types/phone';

interface ValidationResultsProps {
  validation: PhoneValidation;
}

export const ValidationResults: React.FC<ValidationResultsProps> = ({ validation }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-blue-500" />;
      case 'landline':
        return <Phone className="w-5 h-5 text-green-500" />;
      case 'voip':
        return <Globe className="w-5 h-5 text-purple-500" />;
      default:
        return <Smartphone className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mobile':
        return 'bg-blue-100 text-blue-800';
      case 'landline':
        return 'bg-green-100 text-green-800';
      case 'voip':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        {validation.isValid ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
        <h3 className="text-xl font-semibold text-gray-900">Phone Number Validation</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              validation.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {validation.isValid ? 'Valid' : 'Invalid'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">International Format</label>
            <p className="text-gray-900 font-mono">{validation.international}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">National Format</label>
            <p className="text-gray-900 font-mono">{validation.national}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Type</label>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(validation.type)}`}>
              {getTypeIcon(validation.type)}
              <span className="capitalize">{validation.type}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-900">{validation.country || 'Unknown'}</span>
              <span className="text-gray-500">({validation.countryCode})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};