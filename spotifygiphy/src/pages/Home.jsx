import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

const client_id = "f306a37db9a8462dbee024ee152696f4";
const client_secret = "7a19f90d6bfc457c86a6c0e55b675d10";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getToken = async () => {
      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
      });

      const data = await result.json();
      setAccessToken(data.access_token);
    };

    getToken();
  }, []);

  const search = async () => {
    console.log("Search for " + searchInput);

    const searchParams = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    const artistData = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParams)
      .then(response => response.json());

    const artistId = artistData.artists?.items[0]?.id;

    if (!artistId) {
      alert("No artist found");
      return;
    }

    const albumsData = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=20`, searchParams)
      .then(response => response.json());

    setAlbums(albumsData.items);
  };

  return (
    <div className="SpotifyApp">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for album"
            type="text"
            onKeyPress={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map((album, i) => (
            <Card key={i} >
              <Card.Img src={album.images[0]?.url} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
