const fetch = require('isomorphic-fetch');

const apiRequest = {
  async fetchMovieData(movieTitle) {
    const apiKey = 'YOUR_API_KEY'; 
    const apiUrl = `https://api.example.com/movies?apikey=${apiKey}&title=${encodeURIComponent(movieTitle)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || data.Error) {
      throw new Error('Movie data not found.');
    }

    const movieData = {
      title: data.Title,
      director: data.Director,
      releaseYear: data.Year,
      genre: data.Genre,
    };

    return movieData;
  },
};

module.exports = apiRequest;
