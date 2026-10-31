export type CategoryType = 'all' | 'coffee' | 'non-coffee' | 'tea' | 'food' | 'specials';

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'non-coffee' | 'tea' | 'food' | 'specials';
  description: string;
  price: number;
  formattedPrice: string;
  image: string;
  temperature: 'iced' | 'hot' | 'both';
  isSignature?: boolean;
  isPopular?: boolean;
  tastingNotes?: string[];
  isVerified?: boolean;
}

export interface MenuCategory {
  id: CategoryType;
  label: string;
  description: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  location: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    googleMapsUrl: string;
    embedMapUrl: string;
    landmark: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
    display: string;
  };
  contact: {
    phone: string;
    formattedPhone: string;
    whatsappUrl: string;
    instagramHandle: string;
    instagramUrl: string;
  };
  disclaimer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  caption: string;
}
