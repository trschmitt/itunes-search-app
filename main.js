
let list = document.querySelector("#list");
let baseURL = "https://itunes.apple.com/search"
let search = document.querySelector(".form");


search.addEventListener("submit", (event) => {
  event.preventDefault();

  let searchTerm = event.target.querySelector("input").value;
  let userReq = `${baseURL}?term=${searchTerm}`

  fetch(userReq)
  .then(
    (response) => {
      if (response.status !== 200) {
        console.log("The status is " + response.status);
      }

      response.json().then((musicData) => {
        let result = musicData.results;
        let templateContainer = "";
        let template = "";
        results.forEach((song) => {
          template = `
            <li>
              <img src="${artworkUrl100}" alt="recipe-picture-not-found">
              <a href="${collectionViewUrl}"><h4>${artistName}</h4></a>
              <a href="${trackViewUrl}"><h5>${trackName}</h5></a>
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
