import React from 'react';
import { Radio, Building, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import type { CarrierInfo } from '../types/phone';

interface CarrierInfoProps {
  carrier: CarrierInfo;
}

export const CarrierInfo: React.FC<CarrierInfoProps> = ({ carrier }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Radio className="w-4 h-4 text-blue-500" />;
      case 'landline':
        return <Building className="w-4 h-4 text-green-500" />;
      case 'voip':
        return <Globe className="w-4 h-4 text-purple-500" />;
      default:
        return <Radio className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mobile':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'landline':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'voip':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIndicator = (type: string) => {
    if (type === 'voip') {
      return (
        <div className="flex items-center space-x-1 text-orange-600">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">Higher Risk</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-1 text-green-600">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Standard Risk</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Radio className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-900">Carrier Information</h3>
        <div className="ml-auto">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Live Data
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carrier Name</label>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-gray-500" />
              <span className="text-gray-900 font-medium">{carrier.name}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Network Type</label>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(carrier.type)}`}>
              {getTypeIcon(carrier.type)}
              <span className="capitalize">{carrier.type}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Assessment</label>
            {getRiskIndicator(carrier.type)}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-gray-900">{carrier.country}</span>
            </div>
          </div>

          {carrier.region && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <span className="text-gray-900">{carrier.region}</span>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Verified by Veriphone</span>
            </div>
            <p className="text-xs text-blue-700">Real-time carrier data from telecommunications database</p>
          </div>
        </div>
      </div>
    </div>
  );
};