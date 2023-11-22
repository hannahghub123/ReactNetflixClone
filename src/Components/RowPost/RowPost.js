import React, { useEffect, useState } from "react";
import "./RowPost.css";
import { API_KEY, imageUrl } from "../../Constants/Constants";
import axios from "../../axios";
import ReactPlayer from "react-player/youtube";

const RowPost = (props) => {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState(null);

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        alert("Network Error");
      });
  }, []);

  const handleMovieTrailer = (id) => {
    axios
      .get(`movie/${id}/videos?language=en-US&api_key=${API_KEY}`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0].key);
        } else {
          console.log("Trailer not available");
        }
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovieTrailer(obj.id)}
            className={props.isSmall ? "small-poster-img" : "poster-img"}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
            key={obj.id}
          />
        ))}
      </div>
      {urlId && (
      <div className="video-container">
       <ReactPlayer
      url={`https://www.youtube.com/watch?v=${urlId}`}
      controls={true}
      width="100%"
      height="400px"
    />
    <button className="close-button" onClick={() => setUrlId(null)} title="close">
      X
    </button>
  </div>
)}
    </div>
  );
};

export default RowPost;
