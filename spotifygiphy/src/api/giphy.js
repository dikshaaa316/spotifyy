import axios from "axios";

const GIPHY_API_KEY = "YOUR_GIPHY_API_KEY";

export const fetchGif = async (searchTerm) => {
  try {
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: GIPHY_API_KEY,
        q: searchTerm,
        limit: 1,
      },
    });

    return res.data.data[0]?.images.original.url;
  } catch (error) {
    console.error("Error fetching GIF:", error);
    return null;
  }
};
