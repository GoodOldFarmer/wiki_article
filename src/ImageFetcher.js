import React, { useState, useEffect } from 'react';
import './App.css'

//
// - TODO
//
// - onClick pour ouvrir l'image
//
//
export default function ImageFetcher() {
    
    function getCurrentDay() {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    }
    
    // const currentDate = '2023/01/28'
    const currentDate = getCurrentDay()

  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageExtract, setImageExtract] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  

  useEffect(() => {
    fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${currentDate}`)
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.tfa.thumbnail.source)
        setImageTitle(data.tfa.titles.normalized)
        setImageDescription(data.tfa.description)
        setImageExtract(data.tfa.extract)
    })
    //   .then(data => )
      .catch(error => console.error(error));
  }, [currentDate]);


  
  return (
    <div>
    
        <img src={imageUrl} alt={imageTitle} />
        <h2>{imageTitle}</h2>
        <h3>{imageDescription}</h3>
        <p>{imageExtract}</p>

    </div>
  );
}
