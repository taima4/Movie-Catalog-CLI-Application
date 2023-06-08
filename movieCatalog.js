const fileHandler = require('./fileHandler');
const apiRequest = require('./apiRequest');
const utils = require('./utils');

const movieCatalog = {
  async start() {
    console.log('*********************************************');
    console.log('Welcome to the Movie Catalog CLI Application!');
    console.log('*********************************************');

    while (true){
      console.log('1- Display Movie Catalog');
      console.log('2- Add New Movie');
      console.log('3- Update Movie Details');
      console.log('4- Delete Movie');
      console.log('5- Search and Filter');
      console.log('6- Fetch Movie Data');
      console.log('7- Exit');

      const choice = await utils.getInput('Enter your choice: ');

      switch (choice) {
        case '1':
          await this.displayMovieCatalog();
          break;
        case '2':
          await this.addNewMovie();
          break;
        case '3':
          await this.updateMovieDetails();
          break;
        case '4':
          await this.deleteMovie();
          break;
        case '5':
          await this.searchAndFilter();
          break;
        case '6':
          await this.fetchMovieData();
          break;
        case '7':
          console.log('Thank you');
          return;
        default:
          console.log('Please try again.');
      }
    }
  },

  async displayMovieCatalog() {
    const movies = await fileHandler.readDataFromFile();
      console.log('Movie Catalog:');
      movies.forEach((movie) => {
          console.log(movie);
      });
    
  },

  async addNewMovie() {
    const movie = {};
    movie.title = await utils.getInput('title of the movie: ');
    movie.director = await utils.getInput('director of the movie: ');
    movie.releaseYear = await utils.getInput('release year of the movie: ');
    movie.genre = await utils.getInput('genre of the movie: ');

    const movies = await fileHandler.readDataFromFile();
    movies.push(movie);

    await fileHandler.writeDataToFile(movies);

  },

  async updateMovieDetails() {
    const movies = await fileHandler.readDataFromFile();
  

    console.log('Select the movie to update:');
    movies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title}`);
    });

    const choice = await utils.getInput('Enter the movie number: ');
    const selectedMovie = movies[choice - 1];

   console.log('Update movie details:');
    selectedMovie.title = await utils.getInput(`Enter the title of the movie (${selectedMovie.title}): `);
    selectedMovie.director = await utils.getInput(`Enter the director of the movie (${selectedMovie.director}): `);
    selectedMovie.releaseYear = await utils.getInput(`Enter the release year of the movie (${selectedMovie.releaseYear}): `);
    selectedMovie.genre = await utils.getInput(`Enter the genre of the movie (${selectedMovie.genre}): `);

    await fileHandler.writeDataToFile(movies);

  },

  async deleteMovie() {
    const movies = await fileHandler.readDataFromFile();
  
    console.log('Select the movie to delete:');
    movies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title}`);
    });

    const choice = await utils.getInput('Enter the movie number: ');
    const selectedMovie = movies[choice - 1];

   const updatedMovies = movies.filter((movie) => movie !== selectedMovie);

    await fileHandler.writeDataToFile(updatedMovies);
  },

  async searchAndFilter() {
    const movies = await fileHandler.readDataFromFile();
  
    console.log('Search and Filter Options:');
    console.log('1. Search by Title');
    console.log('2. Search by Director');
    console.log('3. Search by Genre');
    console.log('4. Filter by Release Year');

    const option = await utils.getInput('Enter your option: ');

    switch (option) {
        case '1':
          const title = await utils.getInput('the title: ');

          const titleSearchResults = movies.filter((movie) => movie.title.toLowerCase().includes(title.toLowerCase()));
          this.displaySearchResults(titleSearchResults);
          break;

        case '2':
          const director = await utils.getInput('the director : ');
          const directorSearchResults = movies.filter((movie) => movie.director.toLowerCase().includes(director.toLowerCase()));
          this.displaySearchResults(directorSearchResults);

          break;
        case '3':
          const genre = await utils.getInput('the genre : ');

          const genreSearchResults = movies.filter((movie) => movie.genre.toLowerCase().includes(genre.toLowerCase()));
          this.displaySearchResults(genreSearchResults);
          break;
        case '4':
          const releaseYear = await utils.getInput('the release year to filter: ');
          const filteredMovies = movies.filter((movie) => movie.releaseYear === releaseYear);
          this.displaySearchResults(filteredMovies);
          break;
        default:
          console.log('Invalid option.');
      }
      
  },

  displaySearchResults(results) {
   
      console.log('Search Results:');
      results.forEach((movie) => {
        console.log(movie);
      });
    
  },

  async fetchMovieData() {
    const movieTitle = await utils.getInput('Enter the movie title to fetch: ');

    try {
      const movieData = await apiRequest.fetchMovieData(movieTitle);

      const movies = await fileHandler.readDataFromFile();
      movies.push(movieData);

      await fileHandler.writeDataToFile(movies);

      console.log('Movie data fetched and added successfully.');
    } catch (error) {
      console.log('Error fetching movie data:', error.message);
    }
  },
};

module.exports = movieCatalog;
