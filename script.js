let currentSong = new Audio();
let play = document.getElementById("play");

async function getsongs() {
  let a = await fetch("http://127.0.0.1:3000/saregama/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }
  return songs;
}

const playmusic = (track, pause = false) => {
  if (pause == false) {
    currentSong.src = track;
    currentSong.play();
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    currentSong.ontimeupdate = () => {
      document.querySelector(".circle").style.left =
        (currentSong.currentTime / currentSong.duration) * 100 + "%";

    };
  } else {
    currentSong.pause();
    play.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
};

const addtoplaybar = (songinfo, songimg, index) => {
  let songinfoo = document.querySelector(".songinfo");
  let songimgg = document.querySelector(".songimg");
  songinfoo.innerHTML = `Playing : ${songinfo}`;
  songimgg.innerHTML = `<img src="${songimg}" alt="">`;

};

async function main() {
  let songs = await getsongs();

  let cards = document.querySelectorAll(".card");
  let i = 0;
  for (const card of cards) {
    let linkt = document.createElement("a");
    linkt.innerHTML = songs[i];
    linkt.classList.add("link");
    card.appendChild(linkt);
    i++;
  }
  let ind;
  //Plying the song
  Array.from(cards).forEach((e, index) => {
    e.addEventListener("click", (element) => {
      console.log(e.lastElementChild.innerHTML);
      playmusic(e.lastElementChild.innerHTML);
      let songinfo = e.getElementsByTagName("p")[0].innerHTML;
      let songimg = e.firstElementChild.getAttribute("src");
      addtoplaybar(songinfo, songimg, index);
      ind=index

    });
  });

  //default Song
  addtoplaybar(
    cards[1].getElementsByTagName("p")[0].innerHTML,
    cards[1].firstElementChild.getAttribute("src")
  );
  playmusic(cards[1].querySelector(".link").innerHTML, true);


//   Play Button
  play.addEventListener("click", (element) => {
    if (currentSong.paused) {
      currentSong.play();
      play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
      currentSong.pause();
      play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  });

  //seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let per = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = per + "%";
    currentSong.currentTime = (currentSong.duration * per) / 100;
  });

  //previous Button
  let prev = document.querySelector(".buttons").firstElementChild;
      prev.addEventListener("click", (element) => {

        let prevIndex = (ind - 1) % cards.length; // Wrap around to the beginning if it exceeds the length
        let prevCard = cards[prevIndex];
        let song = prevCard.lastElementChild.innerHTML;
        playmusic(song);
        let songinfo = prevCard.getElementsByTagName("p")[0].innerHTML;
        let songimg = prevCard.firstElementChild.getAttribute("src");
        addtoplaybar(songinfo, songimg, ind);
        ind--;
      });

      //Next Button
      let next = document.querySelector(".buttons").lastElementChild;
      next.addEventListener("click", (element) => {
        let nextIndex = (ind + 1) % cards.length; // Wrap around to the beginning if it exceeds the length
        let nextCard = cards[nextIndex];
        let song1 = nextCard.lastElementChild.innerHTML;
        playmusic(song1);
        let songinfo1 = nextCard.getElementsByTagName("p")[0].innerHTML;
        let songimg1 = nextCard.firstElementChild.getAttribute("src");
        addtoplaybar(songinfo1, songimg1, ind);
        ind++;
      });

      //circle previous Button
      let pre=document.querySelector('.buttons > :nth-child(2)')
      pre.addEventListener("click",(ele)=>
      {
        playmusic(cards[ind].lastElementChild.innerHTML);
      })

      //circle next button
      let nex=document.querySelector('.buttons > :nth-child(4)')
      nex.addEventListener("click",(ele)=>
      {
        playmusic(cards[ind+1].lastElementChild.innerHTML);
        let songinfo1 = cards[ind+1].getElementsByTagName("p")[0].innerHTML;
        let songimg1 = cards[ind+1].firstElementChild.getAttribute("src");
        addtoplaybar(songinfo1, songimg1, ind+1);
      })

      //volume
      document.querySelector(".volume").lastElementChild.addEventListener("change",(e)=>{
        console.log(e.target.value);
        currentSong.volume=parseInt(e.target.value)/100
      })

      console.log(currentSong.currentTime);
      if(currentSong.currentTime==currentSong.duration)
      {
        document.querySelector(".buttons").lastElementChild.click();
      }


      // JavaScript code to toggle between main and albums divs
      
      
    


      
}

main();
