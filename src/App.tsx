import React, { useState } from 'react';
import { Phone, Shield, Database, Users, TrendingUp } from 'lucide-react';
import { PhoneInput } from './components/PhoneInput';
import { ValidationResults } from './components/ValidationResults';
import { CarrierInfo } from './components/CarrierInfo';
import { DataBreachInfo } from './components/DataBreachInfo';
import { SocialMediaInfo } from './components/SocialMediaInfo';
import { RiskAssessment } from './components/RiskAssessment';
import { FakeTrackingResults } from './components/FakeTrackingResults';
import { getPhoneIntelligence } from './services/phoneIntelligence';
import type { PhoneIntelligence } from './types/phone';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [intelligence, setIntelligence] = useState<PhoneIntelligence | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchedNumber, setSearchedNumber] = useState<string>('');

  const handlePhoneSubmit = async (phoneNumber: string) => {
    setIsLoading(true);
    setError(null);
    setIntelligence(null);
    setSearchedNumber(phoneNumber);

    try {
      const result = await getPhoneIntelligence(phoneNumber);
      setIntelligence(result);
    } catch (err) {
      setError('Failed to analyze phone number. Please try again.');
      console.error('Phone intelligence error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setIntelligence(null);
    setError(null);
    setSearchedNumber('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PhoneIntel Pro</h1>
                <p className="text-gray-600">Professional Phone Intelligence System</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Professional Grade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!intelligence && !isLoading && (
          <div className="max-w-2xl mx-auto">
            <PhoneInput onSubmit={handlePhoneSubmit} isLoading={isLoading} />
            
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            
            {/* Features Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Validation</h3>
                <p className="text-sm text-gray-600">Format validation and carrier detection</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <Shield className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Breach Check</h3>
                <p className="text-sm text-gray-600">Data breach history analysis</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Social Media</h3>
                <p className="text-sm text-gray-600">Public profile associations</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Risk Score</h3>
                <p className="text-sm text-gray-600">Comprehensive risk assessment</p>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Phone Number</h3>
            <p className="text-gray-600">Gathering intelligence from multiple sources...</p>
          </div>
        )}

        {intelligence && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Intelligence Report</h2>
              <button
                onClick={handleNewSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                New Search
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ValidationResults validation={intelligence.validation} />
                
                {intelligence.carrier && (
                  <CarrierInfo carrier={intelligence.carrier} />
                )}
                
                {intelligence.breaches && (
                  <DataBreachInfo breaches={intelligence.breaches} />
                )}
                
                {intelligence.socialMedia && (
                  <SocialMediaInfo socialMedia={intelligence.socialMedia} />
                )}
              </div>
              
              <div className="space-y-8">
                <RiskAssessment 
                  riskScore={intelligence.riskScore} 
                  lastUpdated={intelligence.lastUpdated} 
                />
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">API Integration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Twilio Lookup</span>
                      <span className="text-green-600 font-medium">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">HaveIBeenPwned</span>
                      <span className="text-green-600 font-medium">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">NumVerify</span>
                      <span className="text-green-600 font-medium">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Truecaller</span>
                      <span className="text-yellow-600 font-medium">Limited</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Fake Tracking Results Below */}
            <FakeTrackingResults phoneNumber={searchedNumber} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;