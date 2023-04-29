import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './App.css'

//
// - TODO
//
// - onClick pour ouvrir l'image
// - 
//
//

export default function ImageFetcher() {
  
  
  const [selectedDay, setSelectedDay] =useState('')
  const [pageUrl, setPageUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageExtract, setImageExtract] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  

  const inputRef = useRef()

  useEffect(() => {
    fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${selectedDay}`)
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.tfa.thumbnail.source)
        setImageTitle(data.tfa.titles.normalized)
        setImageDescription(data.tfa.description)
        setImageExtract(data.tfa.extract)
        setPageUrl(data.tfa.content_urls.desktop.page)
    })
      .catch(error => console.error(error));
  }, [selectedDay]);


   const openURL = async (url) => {
    window.open(url, '_blank')
  }

  const handleDateChange = (e) => {
    const date = e.target.value
    const formattedDate = date.split('-').join('/')
    setSelectedDay(formattedDate)
  }
  return (
    <div>
        <input
          ref={inputRef}
          type='date'
          onChange={handleDateChange}
          >
        </input>

        {selectedDay !== '' ? " " : <h3>choose a date</h3> }
        
        <h2>{imageTitle}</h2>
        <h3>{imageDescription}</h3>
        <img 
          src={imageUrl} 
          alt={imageTitle} 
          onClick={() => openURL(pageUrl) }
          />
        <p>{imageExtract}</p>
        {selectedDay !== '' ? <button
          onClick={ () => openURL(pageUrl)}
        >go to wiki page</button> :" " }

        



    </div>
  );
}
