import React, { useEffect, useState } from 'react';
import { API_KEY,imageUrl} from '../../Constants/Constants';
import axios from '../../axios';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState()
  const [randomNumber,setRandomNumber] = useState(0)

  const  handleGenerateRandom = () => {
    const randomValue = Math.floor(Math.random() * 20); //random number generating
    setRandomNumber(randomValue);
  }

  useEffect(() => {
    handleGenerateRandom(); // Call the function to generate the random number on page load
  }, []);

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      setMovie(response.data.results[randomNumber])
    })
  }, [randomNumber])
  
  return (
    <div
    style={{backgroundImage: `url(${movie ? imageUrl+movie.backdrop_path : ""}) `}}
    className='banner'>
        <div className='content'>
            <h1 className='title'>{movie ? movie.title : "" }</h1>
            <div className="banner-buttons">
                <button className='button'>Play</button>
                <button className='button'>My List</button>
            </div>
            <h1 className='description'>{movie ? movie.overview : "" }</h1>
        </div>
        <div className="fade-bottom"></div>
    </div>
  )
}

export default Banner