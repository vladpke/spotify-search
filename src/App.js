// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

let spotifyApi = new SpotifyWebApi();
let token = window.localStorage.getItem("token");
spotifyApi.setAccessToken(token);

let searchTerm = "Frank Ocean";
let searchResults = {};

// Search tracks whose name, album or artist contains 'Love'
spotifyApi.searchTracks(searchTerm).then(
  function(data) {
    searchResults = data.body;
    console.log('Search by "' + searchTerm + '"', data.body);
  }, function(err) {
    console.error(err);
  }
);

function App() {
  const CLIENT_ID = "18ebc1920094456f89a9b99bee1ba327";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

  }, [])

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }

  return (
    <div className="App">
        <header className="App-header">
            {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}><button className="spotify-button">Login to Spotify</button></a>
                : <button className="spotify-button" onClick={logout}>Logout</button>}
            <h1>Search for songs, artists and albums on Spotify</h1>
            <form>
                <input id="rcorners" type="search" placeholder="Artists, songs, or albums" onChange={e => searchTerm = e.target.value}/>
                {/* <button type={"submit"}>Search</button> */}
            </form>
        </header>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
