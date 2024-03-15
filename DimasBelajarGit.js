const getMovie = async () => {
  const options = {
    method: 'GET',
    url: 'https://moviesverse1.p.rapidapi.com/get-trending-trailers',
    headers: {
      'X-RapidAPI-Key': 'ba2a226b2emsh56133bc0d959e0cp137bd0jsnc0ff6548f1a9',
      'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    
    const trailerList = response.data && response.data.trailers

    return trailerList 

  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const trailerList = await getMovie()

  const movieList =  document.getElementById('movieList')

  trailerList.forEach((trailer) => {
    const movieItem = document.createElement('li')
    movieItem.className = 'movie-item'

    const anchorTOVideo = document.createElement('a')
    anchorTOVideo.href = trailer.videoLink
    anchorTOVideo.target = '_blank'

    const poster = document.createElement('img')
    poster.src = trailer.image
    poster.alt = trailer.title

    const trailerDetail = document.createElement('div')
    trailerDetail.className = 'movie-details'

    const title = document.createElement('h2')
    title.className = 'movie-title'
    title.textContent = trailer.title

    const released = document.createElement('p')
    released.className = 'movie-year'
    released.textContent = 'Release Date : ' + trailer.releaseDate;

    const trailerLength = document.createElement('p')
    trailerLength.className = 'movie-year'
    trailerLength.textContent = 'Trailer Length : ' + trailer.trailerLength

    trailerDetail.appendChild(title)
    trailerDetail.appendChild(released)
    trailerDetail.appendChild(trailerLength)

    anchorTOVideo.appendChild(poster)
    
    movieItem.appendChild(anchorTOVideo)
    movieItem.appendChild(trailerDetail)

    movieList.appendChild(movieItem)
  })
})