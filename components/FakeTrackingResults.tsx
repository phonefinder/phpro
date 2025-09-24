import React, { useState, useEffect } from 'react';
import { Shield, MessageSquare, Camera, Volume2, Clock, Smartphone, Monitor, Image, Video, AlertTriangle, Eye, Lock, Users, Database } from 'lucide-react';

interface FakeTrackingResultsProps {
  phoneNumber: string;
}

export const FakeTrackingResults: React.FC<FakeTrackingResultsProps> = ({ phoneNumber }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [countdown, setCountdown] = useState(595); // 9:55 in seconds

  const scanningSteps = [
    "Connecting with nearby towers...",
    "Sending HTTPS request...",
    "Linking the phone number...",
    "Searching for vulnerabilities in the web application...",
    "Vulnerability found in temporary QR code...",
    "Authenticating phone number...",
    "Retrieving information on chats, photos, audios, videos, and contacts..."
  ];

  useEffect(() => {
    if (currentStep < scanningSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (!showResults) {
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, showResults]);

  useEffect(() => {
    if (showResults && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showResults, countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const affiliateLink = "https://track.bzfrs.co/aff_c?offer_id=99&aff_id=22495&url_id=2402&source=email-compra";

  return (
    <div className="space-y-8 mt-12">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="w-6 h-6 text-red-500" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Advanced Intelligence Scan</h3>
        </div>

        {/* Scanning Process */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
          <div className="space-y-3">
            {scanningSteps.slice(0, currentStep + 1).map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></div>
                <span className={`text-sm sm:text-base text-gray-700 ${index === currentStep ? 'animate-pulse' : ''}`}>{step}</span>
              </div>
            ))}
            {currentStep < scanningSteps.length && (
              <div className="flex items-center space-x-3 mt-4">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-600 font-medium">Processing...</span>
              </div>
            )}
          </div>
        </div>

        {showResults && (
          <div className="space-y-8">
            {/* Suspicious Activity Detection */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Suspicious Activity Detection</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <span className="text-sm sm:text-base text-gray-700">Messages containing "secret"</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">4 found</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-sm sm:text-base text-gray-700">Messages containing "love"</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">7 found</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <span className="text-sm sm:text-base text-gray-700">Deleted messages (24h)</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">35 found</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <span className="text-sm sm:text-base text-gray-700">Password-protected videos</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">Detected</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-sm sm:text-base text-gray-700">Flagged conversations</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">2 archived</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-sm sm:text-base text-gray-700">Location data</span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">Not found</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Detection */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Image className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Evidence Detection</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative group">
                  <img 
                    src="/public/IMG_A4BFEEAE00F0-1.png" 
                    alt="Instagram Evidence" 
                    className="w-full h-32 object-cover rounded-lg blur-sm transition-all duration-300 group-hover:blur-none"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-white font-semibold block">Instagram</span>
                      <Lock className="w-4 h-4 text-white mx-auto mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <img 
                    src="/public/IMG_B88EADA7D01F-1.png" 
                    alt="Messenger Evidence" 
                    className="w-full h-32 object-cover rounded-lg blur-sm transition-all duration-300 group-hover:blur-none"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-white font-semibold block">Messenger</span>
                      <Lock className="w-4 h-4 text-white mx-auto mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <img 
                    src="/public/Captura-de-Tela-2025-03-14-as-06.26.09.png" 
                    alt="Telegram Evidence" 
                    className="w-full h-32 object-cover rounded-lg blur-sm transition-all duration-300 group-hover:blur-none"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-white font-semibold block">Telegram</span>
                      <Lock className="w-4 h-4 text-white mx-auto mt-1" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4">
                <p className="text-blue-800 text-xs sm:text-sm">Content encrypted — only available with full access.</p>
              </div>
              
              <button 
                onClick={() => window.open(affiliateLink, '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                🔓 Unlock now to access all media content
              </button>
            </div>

            {/* Encrypted Messages */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Encrypted Suspicious Messages</h3>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <p className="text-yellow-600 font-medium mb-2 text-sm sm:text-base">🟨 "You know I don't usually act like that..."</p>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">[Encrypted message – unlock to read]</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <p className="text-yellow-600 font-medium mb-2 text-sm sm:text-base">🟨 "That wasn't supposed to happen again."</p>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">[Encrypted message – unlock to read]</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <p className="text-yellow-600 font-medium mb-2 text-sm sm:text-base">🟨 "Let's just pretend it was a coincidence."</p>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">[Encrypted message – unlock to read]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Monitoring */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-purple-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Activity at Unusual Hours</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-pink-50 border border-pink-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-pink-500" />
                      <span className="text-gray-700 text-sm sm:text-base">Instagram access</span>
                    </div>
                    <span className="text-pink-600 font-medium text-sm sm:text-base">02:13 AM</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700 text-sm sm:text-base">Telegram messages</span>
                    </div>
                    <span className="text-blue-600 font-medium text-sm sm:text-base">05:47 AM</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Image className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700 text-sm sm:text-base">Messenger media</span>
                    </div>
                    <span className="text-blue-600 font-medium text-sm sm:text-base">00:00-01:15</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 text-sm sm:text-base">Call history</span>
                    </div>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">No match</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-xs sm:text-sm italic">
                  "Unusual patterns may indicate attempts to hide behavior."
                </p>
              </div>
            </div>

            {/* Device Connections */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Monitor className="w-6 h-6 text-green-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Recently Connected Devices</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Monitor className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 text-sm sm:text-base">Windows 10</span>
                  </div>
                  <span className="text-gray-600 text-sm sm:text-base">Unknown Location</span>
                </div>
                
                <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 text-sm sm:text-base">Phone</span>
                  </div>
                  <span className="text-blue-600 text-sm sm:text-base">Last Access: 03:44 AM</span>
                </div>
                
                <div className="flex items-center justify-between p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700 text-sm sm:text-base">Incognito mode detected</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">1 device</span>
                </div>
              </div>
            </div>

            {/* Hidden Media Files */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Video className="w-6 h-6 text-red-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Hidden Media Files</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <Video className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-red-600 mb-1">4</div>
                  <div className="text-xs sm:text-sm text-gray-700">Password Protected Videos</div>
                </div>
                
                <div className="text-center p-3 sm:p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <Image className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">12</div>
                  <div className="text-xs sm:text-sm text-gray-700">Hidden Images</div>
                </div>
                
                <div className="text-center p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Volume2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">6</div>
                  <div className="text-xs sm:text-sm text-gray-700">Deleted Audio Files</div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Temporary Report Access</h3>
              </div>
              
              <div className="text-center">
                <p className="text-red-700 mb-4 text-sm sm:text-base">⚠️ This report will expire in:</p>
                <div className="text-2xl sm:text-4xl font-bold text-red-600 mb-4">
                  ⏳ {formatTime(countdown)}
                </div>
                <p className="text-red-700 mb-6 text-sm sm:text-base">
                  After that, all data will be automatically encrypted for security.
                </p>
                
                <button 
                  onClick={() => window.open(affiliateLink, '_blank')}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-bold transition-colors duration-200"
                >
                  🟥 Unlock Full Report Now
                </button>
              </div>
            </div>

            {/* Final Upgrade Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl shadow-lg p-4 sm:p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Limited Access – Encryption Detected</h3>
                </div>
                
                <div className="space-y-4 text-gray-700 text-sm sm:text-base">
                  <p>With PhoneIntel Basic, sensitive information is encrypted for privacy protection.</p>
                  <p>We've found potentially suspicious content — including deleted messages, hidden conversations, and password-protected media.</p>
                  <p>To view real conversations, images, and videos, you must unlock the full version.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                  <p className="text-gray-900 font-semibold mb-4 text-sm sm:text-base">
                    👉 Upgrade to PhoneIntel Complete to reveal everything.
                  </p>
                  <button 
                    onClick={() => window.open(affiliateLink, '_blank')}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    🔓 UNLOCK EVERYTHING NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};