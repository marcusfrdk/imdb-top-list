import axios from 'axios';

const getIds = async (maxLength: number) => {
  const url = 'https://www.imdb.com/chart/top/';
  let ids_list: any = [];

  // Scrape movie IDs
  if (ids_list.length < maxLength) {
    await axios
      .get(url)
      .then((res) => {
        const html = res.data;
        const regex = new RegExp(/(\/title\/w{0,9})\w+/g);
        let id: any;

        while (ids_list.length < maxLength) {
          id = regex.exec(html);
          id = id[0].replace('/title/', '');

          if (!ids_list.includes(id)) {
            ids_list.push(id);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  return ids_list;
};

const getMovies = async (ids: string[]) => {
  let movies: any = [];

  for (let i = 0; i < ids.length; i++) {
    let url = `http://www.omdbapi.com/?i=${ids[i]}&apikey=faaf7071`;

    await axios
      .get(url)
      .then((res: any) => {
        let title = res.data.Title;
        let posterUrl = res.data.Poster;
        let director = res.data.Director;
        let rating = res.data.imdbRating;
        let released = res.data.Released;

        let movie: Movie = {
          title,
          posterUrl,
          director,
          rating,
          released,
        };

        console.log(`Adding movie ${title}...`);

        movies.push(movie);
      })
      .catch((err: any) => console.log(err));
  }

  return movies;
};

export default async (length: number) => {
  const ids: any = await getIds(length);
  let movies: any = await getMovies(ids);

  console.log('Finished getting movies...');

  return movies;
};

interface Movie {
  title: string;
  posterUrl: string;
  rating: string;
  released: string;
  director: string;
}
