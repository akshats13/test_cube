import React from'react';
import { Customer } from './type';

interface CustomerCardProps {
  customer: Customer;
  isSelected: boolean;
  onSelect: (customer: Customer) => void;
}

const CustomerCard = ({ customer, isSelected, onSelect }: CustomerCardProps) => {
  const handleClick = () => {
    onSelect(customer);
  };

  return (
    <button
      aria-label="Select customer"
      style={{
        backgroundColor: isSelected? '#f0f0f0' : '#fff',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <h2>{customer.name}</h2>
      <p>{customer.title}</p>
    </button>
  );
};

export default CustomerCard;