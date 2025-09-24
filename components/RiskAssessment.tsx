import React from 'react';
import { Shield, AlertTriangle, TrendingUp } from 'lucide-react';

interface RiskAssessmentProps {
  riskScore: number;
  lastUpdated: string;
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({ riskScore, lastUpdated }) => {
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' };
    if (score < 60) return { level: 'Medium', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
    return { level: 'High', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' };
  };

  const risk = getRiskLevel(riskScore);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-500" />
        <h3 className="text-xl font-semibold text-gray-900">Risk Assessment</h3>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${risk.bgColor} ${risk.textColor} mb-4`}>
            {risk.level === 'Low' ? (
              <Shield className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span className="font-semibold">{risk.level} Risk</span>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
                  Risk Score
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {riskScore}/100
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${riskScore}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  risk.level === 'Low' ? 'bg-green-500' :
                  risk.level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Risk Factors</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Data breach exposure</li>
            <li>• Line type and carrier reputation</li>
            <li>• Social media exposure</li>
            <li>• Historical usage patterns</li>
          </ul>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      </div>
    </div>
  );
};