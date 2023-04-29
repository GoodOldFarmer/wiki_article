import React, { useState, useEffect } from 'react';
import './App.css'

//
// - TODO
//
// - onClick pour ouvrir l'image
// - 
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

  let currentDay = getCurrentDay()

  
  
  const [pageUrl, setPageUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageExtract, setImageExtract] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  
  
 

  useEffect(() => {
    fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${currentDay}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setImageUrl(data.tfa.thumbnail.source)
        setImageTitle(data.tfa.titles.normalized)
        setImageDescription(data.tfa.description)
        setImageExtract(data.tfa.extract)
        setPageUrl(data.tfa.content_urls.desktop.page)
    })
      .catch(error => console.error(error));
  }, [currentDay]);


   const openURL = async (url) => {
    window.open(url, '_blank')
  }

  return (
    <div>
        <h3> {currentDay}</h3>
        <img 
          src={imageUrl} 
          alt={imageTitle} 
          onClick={() => openURL(pageUrl) }
        />
        <h2>{imageTitle}</h2>
        <h3>{imageDescription}</h3>
        <p>{imageExtract}</p>
        <button
          onClick={ () => openURL(pageUrl)}
        >go to wiki page</button>


    </div>
  );
}
