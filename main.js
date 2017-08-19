let list    = document.querySelector("#list");
let baseURL = "https://itunes.apple.com/search";
let search  = document.querySelector("form");
let music   = document.querySelector("img");

search.addEventListener("submit", event => {
  event.preventDefault();

  let searchTerm = event.target.querySelector("input").value;
  let userReq    = `${baseURL}?term=${searchTerm}`;

  fetch(userReq).then(response => {
    if (response.status !== 200) {
      console.log("The status is " + response.status);
    }

    response.json().then(musicData => {
      console.log(musicData);
      let result   = musicData.results;
      let templateContainer = "";
      let template = "";
      result.forEach(song => {
        template = `
            <li>
              <a href="${song.previewUrl}"><img class="song-preview" src="${song.artworkUrl100}" alt="picture-not-found"></a>
              <a href="${song.collectionViewUrl}"><h4>${song.artistName}</h4></a>
              <a href="${song.trackViewUrl}"><h5>${song.trackName}</h5></a>
            </li>
          `;
        templateContainer += template;
      });
      searchTerm = "";
      list.innerHTML = templateContainer;

      let previewSong = document.getElementsByClassName("song-preview");
      let musicPlayer = document.querySelector("audio");

      for (let i = 0; i < previewSong.length; i++) {
        previewSong[i].addEventListener("click", (e) => {
          e.preventDefault();
          musicPlayer.setAttribute("src", result[i].previewUrl);
        });
      };

    });
  });
});

// 5. Create a way to listen for a click that will play the song in the audio play
