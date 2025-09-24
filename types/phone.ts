export interface PhoneValidation {
  isValid: boolean;
  formatted: string;
  international: string;
  national: string;
  countryCode: string;
  country: string;
  type: 'mobile' | 'landline' | 'voip' | 'unknown';
}

export interface CarrierInfo {
  name: string;
  type: 'mobile' | 'landline' | 'voip';
  country: string;
  region?: string;
}

export interface DataBreachInfo {
  breached: boolean;
  breaches: Array<{
    name: string;
    date: string;
    description: string;
    dataClasses: string[];
  }>;
}

export interface SocialMediaInfo {
  platforms: Array<{
    platform: string;
    username?: string;
    profileUrl?: string;
    verified: boolean;
  }>;
}

export interface PhoneIntelligence {
  validation: PhoneValidation;
  carrier?: CarrierInfo;
  breaches?: DataBreachInfo;
  socialMedia?: SocialMediaInfo;
  riskScore: number;
  lastUpdated: string;
}