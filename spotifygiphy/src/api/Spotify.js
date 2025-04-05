import axios from "axios";

export const searchSpotifyTrack = async (searchTerm) => {
  try {
    const response = await axios.get("http://localhost:5000/spotify/search", {
      params: { q: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Spotify track:", error);
    return null;
  }
};

