import React from 'react';
import { 
  Wifi, Utensils, Snowflake, Tv, Droplets, 
  Network, Umbrella, Volume2, Mountain,
  Handshake, Sparkles, MapPin, Compass, BedDouble,
  BedSingle, Sofa, AlertCircle, Ban, Building, Coffee, 
  Car, Droplet, Ruler, Star, Trees, Users, Home, Bath,
  Scissors, Microwave, Blend, WashingMachine, RockingChair,
  Waves, Landmark, Fan, CupSoda, ParkingCircle
} from 'lucide-react';

interface AmenityIconProps {
  icon: string;
  className?: string;
  size?: number;
}

const AmenityIcon: React.FC<AmenityIconProps> = ({ icon, className = "", size = 16 }) => {
  const defaultProps = {
    size,
    className
  };

  switch (icon) {
    // Basic amenities
    case 'wifi':
      return <Wifi {...defaultProps} />;
    case 'utensils':
      return <Utensils {...defaultProps} />;
    case 'kitchen':
      return <Utensils {...defaultProps} />;
    case 'snowflake':
      return <Snowflake {...defaultProps} />;
    case 'ac':
      return <Snowflake {...defaultProps} />;
    case 'tv':
      return <Tv {...defaultProps} />;
    
    // View and outdoor amenities
    case 'balcony':
      return <RockingChair {...defaultProps} />;
    case 'sea-view':
      return <Waves {...defaultProps} />;
    case 'water':
      return <Waves {...defaultProps} />;
    case 'city-view':
      return <Landmark {...defaultProps} />;
    case 'garden':
      return <Trees {...defaultProps} />;
    case 'tree':
      return <Network {...defaultProps} />;
    case 'umbrella-beach':
      return <Umbrella {...defaultProps} />;
    case 'mountain':
      return <Mountain {...defaultProps} />;
    
    // Kitchen appliances
    case 'coffee-machine':
      return <Coffee {...defaultProps} />;
    case 'microwave':
      return <Microwave {...defaultProps} />;
    case 'smoothie-maker':
      return <CupSoda {...defaultProps} />;
    case 'dishwasher':
      return <Droplet {...defaultProps} />;
    case 'washing-machine':
      return <WashingMachine {...defaultProps} />;
    
    // Bathroom and bedroom amenities
    case 'bathroom':
      return <Bath {...defaultProps} />;
    case 'hair-dryer':
      return <Fan {...defaultProps} />;
    
    // Parking
    case 'parking':
      return <ParkingCircle {...defaultProps} />;
    
    // Room features
    case 'room-size':
      return <Ruler {...defaultProps} />;
    case 'guests':
      return <Users {...defaultProps} />;
    case 'apartment-type':
      return <Home {...defaultProps} />;
    case 'volume-off':
      return <Volume2 {...defaultProps} />;
    
    // Utility icons
    case 'alert':
      return <AlertCircle {...defaultProps} />;
    case 'ban':
      return <Ban {...defaultProps} />;
    case 'star':
      return <Star {...defaultProps} />;
    
    // Feature icons
    case 'handshake':
      return <Handshake {...defaultProps} />;
    case 'sparkles':
      return <Sparkles {...defaultProps} />;
    case 'map-pin':
      return <MapPin {...defaultProps} />;
    case 'compass':
      return <Compass {...defaultProps} />;
    case 'building':
      return <Building {...defaultProps} />;
    
    // Bed type icons
    case 'bed-double':
      return <BedDouble {...defaultProps} />;
    case 'bed-single':
      return <BedSingle {...defaultProps} />;
    case 'sofa-bed':
      return <Sofa {...defaultProps} />;
    
    default:
      console.warn(`Icon '${icon}' not found in AmenityIcon component`);
      return null;
  }
};

export default AmenityIcon;
