import type { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  brandName: 'Jolt Coffee',
  tagline: 'A LITTLE JOLT. A LOT OF ENERGY.',
  subTagline: 'Discover your next coffee moment in the heart of Pekanbaru.',
  location: {
    address: 'Jl. Riau No. 118, Kampung Baru, Senapelan',
    city: 'Pekanbaru',
    province: 'Riau',
    postalCode: '28153',
    country: 'Indonesia',
    fullAddress: 'Jl. Riau No. 118, Kampung Baru, Kec. Senapelan, Kota Pekanbaru, Riau 28153',
    landmark: 'Across Senapelan commercial district, near Pasar Bawah & Riau main avenue',
    // Real Google Maps direct query for Pekanbaru Jl. Riau No. 118
    googleMapsUrl: 'https://maps.google.com/?q=Jl.+Riau+No.118,+Kampung+Baru,+Senapelan,+Pekanbaru,+Riau+28153',
    embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.658249626359!2d101.4428014!3d0.5332014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ac0360a8b9e1%3A0x6b63c9b74051d95!2sJl.+Riau+No.118%2C+Kp.+Baru%2C+Kec.+Senapelan%2C+Kota+Pekanbaru%2C+Riau+28153!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
  },
  hours: {
    weekdays: '08:00 — 23:00 WIB',
    weekends: '08:00 — 00:00 WIB',
    display: 'Daily 08:00 – 23:00 WIB',
  },
  contact: {
    phone: '+6281270001928',
    formattedPhone: '+62 812-7000-1928',
    whatsappUrl: 'https://wa.me/6281270001928?text=Halo%20Jolt%20Coffee,%20saya%20ingin%20tanya%20menu%20dan%20lokasi',
    instagramHandle: '@joltcoffeeriau',
    instagramUrl: 'https://instagram.com/joltcoffeeriau',
  },
  disclaimer: 'Development reference: Business information and menu prices reflect field references for Jolt Coffee Pekanbaru.',
};

export const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Our Story', href: '#story' },
  { name: 'Menu', href: '#menu' },
  { name: 'The Space', href: '#space' },
  { name: 'Location', href: '#location' },
];
