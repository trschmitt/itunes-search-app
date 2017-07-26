
let list = document.querySelector("#list");
let baseURL = "https://itunes.apple.com/search"
let search = document.querySelector("form");


search.addEventListener("submit", (event) => {
  event.preventDefault();

  let searchTerm = event.target.querySelector("input").value;
  let userReq = `${baseURL}?term=${searchTerm}`

  fetch(userReq).then((response) => {
      if (response.status !== 200) {
        console.log("The status is " + response.status);
      }

      response.json().then((musicData) => {
        console.log(musicData);
        let result = musicData.results;
        let templateContainer = "";
        let template = "";
        result.forEach((song) => {
          console.log(song);
          template = `
            <li>
              <img src="${song.artworkUrl100}" alt="picture-not-found">
              <a href="${song.collectionViewUrl}"><h4>${song.artistName}</h4></a>
              <a href="${song.trackViewUrl}"><h5>${song.trackName}</h5></a>
            </li>
          `
          templateContainer += template;
        });
        searchTerm = "";
        list.innerHTML = templateContainer;
      })
    }
  )
})
// 5. Create a way to listen for a click that will play the song in the audio play
