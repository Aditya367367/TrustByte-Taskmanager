
import React from 'react';
import TrustByteLogo from "../assets/logo.jpg"; 

export default function Logo({ size, className }) {
 
  const logoSize = size || 24;

  return (
    <img
      src={TrustByteLogo}
      alt="TrustByte Logo"
      style={{ width: logoSize, height: logoSize }}
      className={className}
    />
  );
}