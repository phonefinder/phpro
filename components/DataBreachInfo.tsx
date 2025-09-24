import React from 'react';
import { Shield, AlertTriangle, Calendar, Database } from 'lucide-react';
import type { DataBreachInfo } from '../types/phone';

interface DataBreachInfoProps {
  breaches: DataBreachInfo;
}

export const DataBreachInfo: React.FC<DataBreachInfoProps> = ({ breaches }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-semibold text-gray-900">Data Breach History</h3>
      </div>

      {!breaches.breached ? (
        <div className="text-center py-8">
          <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-green-700 font-medium">No known data breaches found</p>
          <p className="text-gray-600 text-sm mt-2">This phone number has not appeared in any known data breaches</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-red-800 font-medium">
                Found in {breaches.breaches.length} data breach{breaches.breaches.length > 1 ? 'es' : ''}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {breaches.breaches.map((breach, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{breach.name}</h4>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(breach.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-3">{breach.description}</p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compromised Data Types:</label>
                  <div className="flex flex-wrap gap-2">
                    {breach.dataClasses.map((dataClass, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        <Database className="w-3 h-3" />
                        <span>{dataClass}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};