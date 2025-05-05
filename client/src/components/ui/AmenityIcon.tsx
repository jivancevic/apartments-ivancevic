import React from 'react';
import { 
  Wifi, Utensils, Snowflake, Tv, Wind, Droplets, 
  ParkingMeter, Network, Umbrella, Volume2, Mountain
} from 'lucide-react';

interface AmenityIconProps {
  icon: string;
  className?: string;
}

const AmenityIcon: React.FC<AmenityIconProps> = ({ icon, className = "" }) => {
  const iconSize = 16;
  const defaultProps = {
    size: iconSize,
    className
  };

  switch (icon) {
    case 'wifi':
      return <Wifi {...defaultProps} />;
    case 'utensils':
      return <Utensils {...defaultProps} />;
    case 'snowflake':
      return <Snowflake {...defaultProps} />;
    case 'tv':
      return <Tv {...defaultProps} />;
    case 'wind':
      return <Wind {...defaultProps} />;
    case 'water':
      return <Droplets {...defaultProps} />;
    case 'parking':
      return <ParkingMeter {...defaultProps} />;
    case 'tree':
      return <Network {...defaultProps} />;
    case 'umbrella-beach':
      return <Umbrella {...defaultProps} />;
    case 'volume-off':
      return <Volume2 {...defaultProps} />;
    case 'mountain':
      return <Mountain {...defaultProps} />;
    default:
      return null;
  }
};

export default AmenityIcon;
