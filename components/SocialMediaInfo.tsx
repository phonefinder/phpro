import React from 'react';
import { Users, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import type { SocialMediaInfo } from '../types/phone';

interface SocialMediaInfoProps {
  socialMedia: SocialMediaInfo;
}

export const SocialMediaInfo: React.FC<SocialMediaInfoProps> = ({ socialMedia }) => {
  const getPlatformIcon = (platform: string) => {
    // In a real app, you'd use actual platform icons
    return <Users className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-900">Social Media Associations</h3>
      </div>

      {socialMedia.platforms.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No public social media associations found</p>
          <p className="text-gray-500 text-sm mt-2">This phone number is not publicly linked to social media profiles</p>
        </div>
      ) : (
        <div className="space-y-3">
          {socialMedia.platforms.map((platform, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                {getPlatformIcon(platform.platform)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{platform.platform}</span>
                    {platform.verified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  {platform.username && (
                    <p className="text-sm text-gray-600">@{platform.username}</p>
                  )}
                </div>
              </div>
              
              {platform.profileUrl && (
                <a
                  href={platform.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};