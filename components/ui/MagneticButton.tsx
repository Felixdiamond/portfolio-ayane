
import React from 'react';
import Magnetic from './Magnetic';
import Button from './Button';

interface MagneticButtonProps {
  title: string;
  icon?: React.ReactNode;
  position?: string;
  handleClick?: () => void;
  otherClasses?: string;
}

const MagneticButton = ({ title, icon, position, handleClick, otherClasses }: MagneticButtonProps) => {
  return (
    <Magnetic>
      <Button
        title={title}
        icon={icon}
        position={position || 'left'}
        handleClick={handleClick}
        otherClasses={otherClasses}
      />
    </Magnetic>
  );
};

export default MagneticButton;
