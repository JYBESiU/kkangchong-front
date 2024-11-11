import { useState } from 'react';

// Custom hook to calculate inverse cosine
export const useInverseCosine = () => {
  const [result, setResult] = useState<number | null>(null); // Store the result of the calculation

  const calculateInverseCosine = (value: number) => {
    // Check if the value is within the valid range for inverse cosine
    if (value < -1 || value > 1) {
      // Invalid input for acos
      alert('Input value must be between -1 and 1');
      setResult(null);
      return;
    }

    const radians = Math.acos(value); // Result in radians
    const degrees = radians * (180 / Math.PI); // Convert radians to degrees
    setResult(degrees); // Store the result in degrees
  };

  return {
    result, // The calculated result (in degrees)
    calculateInverseCosine, // Function to calculate the inverse cosine
  };
};
