import type { PhoneIntelligence, CarrierInfo, DataBreachInfo, SocialMediaInfo } from '../types/phone';
import { validatePhoneNumber } from './phoneValidation';

// Veriphone API service
async function getVeriphoneCarrierInfo(phoneNumber: string): Promise<CarrierInfo | null> {
  const apiKey = import.meta.env.VITE_VERIPHONE_API_KEY;
  
  if (!apiKey) {
    console.warn('Veriphone API key not found in environment variables');
    return null;
  }

  try {
    // Ensure phone number is in E.164 format (starts with +)
    const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    const url = `https://api.veriphone.io/v2/verify?key=${apiKey}&phone=${encodeURIComponent(formattedNumber)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Veriphone API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if the API returned an error
    if (!data.status || data.status === 'error') {
      console.warn('Veriphone API returned error:', data.message || 'Unknown error');
      return null;
    }

    // Map Veriphone response to our CarrierInfo type
    const carrierInfo: CarrierInfo = {
      name: data.carrier || 'Unknown Carrier',
      type: mapPhoneType(data.phone_type),
      country: data.country || 'Unknown',
      region: data.phone_region || undefined
    };

    return carrierInfo;
  } catch (error) {
    console.error('Error fetching carrier info from Veriphone:', error);
    return null;
  }
}

// Helper function to map Veriphone phone types to our types
function mapPhoneType(veriphoneType: string): 'mobile' | 'landline' | 'voip' {
  if (!veriphoneType) return 'mobile'; // Default fallback
  
  const type = veriphoneType.toLowerCase();
  
  if (type.includes('mobile') || type.includes('cell')) {
    return 'mobile';
  } else if (type.includes('landline') || type.includes('fixed')) {
    return 'landline';
  } else if (type.includes('voip') || type.includes('virtual')) {
    return 'voip';
  }
  
  return 'mobile'; // Default fallback
}

// Fallback carrier data for when API fails
const fallbackCarrierData: Record<string, CarrierInfo> = {
  'US': {
    name: 'US Carrier',
    type: 'mobile',
    country: 'United States',
    region: 'North America'
  },
  'CA': {
    name: 'Canadian Carrier',
    type: 'mobile',
    country: 'Canada',
    region: 'North America'
  },
  'GB': {
    name: 'UK Carrier',
    type: 'mobile',
    country: 'United Kingdom',
    region: 'Europe'
  },
  'SG': {
    name: 'Singapore Carrier',
    type: 'mobile',
    country: 'Singapore',
    region: 'Asia Pacific'
  },
  'AU': {
    name: 'Australian Carrier',
    type: 'mobile',
    country: 'Australia',
    region: 'Asia Pacific'
  },
  'DE': {
    name: 'German Carrier',
    type: 'mobile',
    country: 'Germany',
    region: 'Europe'
  },
  'FR': {
    name: 'French Carrier',
    type: 'mobile',
    country: 'France',
    region: 'Europe'
  },
  'JP': {
    name: 'Japanese Carrier',
    type: 'mobile',
    country: 'Japan',
    region: 'Asia Pacific'
  },
  'IN': {
    name: 'Indian Carrier',
    type: 'mobile',
    country: 'India',
    region: 'Asia Pacific'
  },
  'BR': {
    name: 'Brazilian Carrier',
    type: 'mobile',
    country: 'Brazil',
    region: 'South America'
  }
};

const mockBreachData: DataBreachInfo = {
  breached: true,
  breaches: [
    {
      name: 'Collection #1',
      date: '2019-01-07',
      description: 'Large collection of credential stuffing lists',
      dataClasses: ['Email addresses', 'Passwords', 'Phone numbers']
    },
    {
      name: 'Facebook',
      date: '2021-04-03',
      description: 'Phone numbers and personal data of Facebook users',
      dataClasses: ['Phone numbers', 'Email addresses', 'Names', 'Locations']
    }
  ]
};

const mockSocialMediaData: SocialMediaInfo = {
  platforms: [
    {
      platform: 'WhatsApp',
      verified: true
    },
    {
      platform: 'Telegram',
      username: 'user123',
      verified: false
    }
  ]
};

export async function getPhoneIntelligence(phoneNumber: string): Promise<PhoneIntelligence> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const validation = validatePhoneNumber(phoneNumber);
  
  if (!validation.isValid) {
    return {
      validation,
      riskScore: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  // Try to get real carrier info from Veriphone API
  let carrier = await getVeriphoneCarrierInfo(validation.international);
  
  // If Veriphone API fails, fall back to mock data based on country code
  if (!carrier) {
    carrier = fallbackCarrierData[validation.countryCode] || {
      name: 'Unknown Carrier',
      type: validation.type,
      country: validation.country,
      region: 'Unknown'
    };
  }

  // Calculate risk score based on various factors
  let riskScore = 0;
  if (mockBreachData.breached) riskScore += 30;
  if (carrier.type === 'voip') riskScore += 25; // Higher risk for VOIP
  if (mockSocialMediaData.platforms.length > 2) riskScore += 15;
  
  // Add some randomization to make it more realistic
  riskScore += Math.floor(Math.random() * 10);

  return {
    validation,
    carrier,
    breaches: mockBreachData,
    socialMedia: mockSocialMediaData,
    riskScore: Math.min(riskScore, 100),
    lastUpdated: new Date().toISOString()
  };
}

// Real API integration functions (commented out for demo)
/*
export async function getTwilioLookup(phoneNumber: string) {
  const response = await fetch(`https://lookups.twilio.com/v1/PhoneNumbers/${phoneNumber}?Type=carrier`, {
    headers: {
      'Authorization': `Basic ${btoa(process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN)}`
    }
  });
  return response.json();
}

export async function getHaveIBeenPwnedData(phoneNumber: string) {
  const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${phoneNumber}`, {
    headers: {
      'hibp-api-key': process.env.HIBP_API_KEY || ''
    }
  });
  return response.json();
}
*/