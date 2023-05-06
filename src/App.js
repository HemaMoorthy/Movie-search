import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const containerStyle = {
  height: '50px'
};

const cardStyle = {
  margin: '10px 0',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  transition: '0.3s',
  borderRadius: '5px',
  overflow: 'hidden',
  height: '550px'
};


function App() {
  const [movies, setMovies] = useState([]);
  console.log(movies);

  const LIST_MOVIES_API =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=60b704b4a45baaced2c70b88a3ad39cb&page=1';

  const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';

  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=60b704b4a45baaced2c70b88a3ad39cb&query=';

  useEffect(() => {
    const fetchAllMovies = async () => {
      const res = await axios.get(LIST_MOVIES_API);
      setMovies(res.data.results);
    };
    fetchAllMovies();
  }, []);


  const handleChange = async(value)=>{
    const res = await axios.get(`${SEARCH_API}`+value);
    setMovies(res.data.results);

  }

  return (
    <div className="App bg-dark">
      <div className="container-fluid  text-light bg-dark text-center" style={containerStyle}>
        <center>
          <h2>Movie Search App</h2>
        </center>
      </div>
      <br />
      <div className="container ">
        <div className="row">
          <div className="col-md-6 offset-md-3 d-flex justify-content-center">
            <form className="form-inline">
              <input className="form-control mr-sm-2" type="search" placeholder="Search Movies" aria-label="Search"  onChange={(e)=>handleChange(e.target.value)}/>
            </form>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="col-md-12">
          <div className="row justify-content-center">
            <h3 className="text-center">Latest Movies</h3>
            {movies && movies.length > 0 ? (
              movies.map(item => (
                <div className="col-md-4" key={item.id}>
                  <div className="card" style={cardStyle}>
                    <div style={{ height: '400px', overflow: 'hidden' }}>
                      <img src={IMAGE_URL + item.poster_path} className="card-img-top" alt="" />
                    </div>
                    <div className="card-body">
                      <p className="card-text">{item.title}</p>
                      <p className="card-text">Release Date:{item.release_date}</p>
        
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>loading...</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
