import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import type { PhoneValidation } from '../types/phone';

export function validatePhoneNumber(phoneNumber: string): PhoneValidation {
  try {
    if (!isValidPhoneNumber(phoneNumber)) {
      return {
        isValid: false,
        formatted: phoneNumber,
        international: phoneNumber,
        national: phoneNumber,
        countryCode: '',
        country: '',
        type: 'unknown'
      };
    }

    const parsed = parsePhoneNumber(phoneNumber);
    
    return {
      isValid: true,
      formatted: parsed.formatInternational(),
      international: parsed.formatInternational(),
      national: parsed.formatNational(),
      countryCode: parsed.country || '',
      country: getCountryName(parsed.country || ''),
      type: parsed.getType() === 'MOBILE' ? 'mobile' : 
            parsed.getType() === 'FIXED_LINE' ? 'landline' : 
            parsed.getType() === 'VOIP' ? 'voip' : 'unknown'
    };
  } catch (error) {
    return {
      isValid: false,
      formatted: phoneNumber,
      international: phoneNumber,
      national: phoneNumber,
      countryCode: '',
      country: '',
      type: 'unknown'
    };
  }
}

function getCountryName(countryCode: string): string {
  const countryNames: Record<string, string> = {
    'US': 'United States',
    'CA': 'Canada',
    'GB': 'United Kingdom',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'IT': 'Italy',
    'ES': 'Spain',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'IN': 'India',
    'CN': 'China',
    'JP': 'Japan',
    'KR': 'South Korea',
    'RU': 'Russia',
    'SG': 'Singapore',
    'MY': 'Malaysia',
    'TH': 'Thailand',
    'VN': 'Vietnam',
    'PH': 'Philippines',
    'ID': 'Indonesia',
    'HK': 'Hong Kong',
    'TW': 'Taiwan',
    'NZ': 'New Zealand',
    'ZA': 'South Africa',
    'NG': 'Nigeria',
    'KE': 'Kenya',
    'EG': 'Egypt',
    'SA': 'Saudi Arabia',
    'AE': 'United Arab Emirates',
    'TR': 'Turkey',
    'IL': 'Israel',
    'GR': 'Greece',
    'PT': 'Portugal',
    'NL': 'Netherlands',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'PL': 'Poland'
  };
  
  return countryNames[countryCode] || countryCode;
}