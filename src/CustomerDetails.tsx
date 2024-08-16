import React, { useState, useEffect } from 'react';
import { Customer } from './type';
import './CustomerDetails.css';

const CustomerDetails = ({ customer }: { customer: Customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch('https://picsum.photos/v2/list');
      const data = await response.json();
      const photos = data.map((photo: any) => photo.download_url);
      setPhotos(photos);
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSetIndex((prevIndex) => (prevIndex + 9) % photos.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [photos]);

  const displayedPhotos = photos.slice(currentSetIndex, currentSetIndex + 9);

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.name}</p>
      <p>Title: {customer.title}</p>
      <p>Address: {customer.address}</p>
      <div className="photo-grid">
        {displayedPhotos.map((photo: string, index: number) => (
          <img key={index} src={photo} alt="Photo" />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
