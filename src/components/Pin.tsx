import React, { useState } from 'react';
import PinCode from 'react-native-pin-code';

interface DynamicPinCodeProps {
  initialValue?: string;
}

const DynamicPinCode: React.FC<DynamicPinCodeProps> = ({ initialValue }) => {
  const [pin, setPin] = useState<string>(initialValue || '');

  const handleChange = (newPin: string) => {
    setPin(newPin);
  };

  return (
    <PinCode
      pin={pin}
      onChange={handleChange}
    />
  );
};

export default DynamicPinCode;
