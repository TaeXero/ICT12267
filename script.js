const videos = [
  "video/animal loop 1",
  "video/animal loop 2",
  "video/animal loop 3"
];

let index = 0;
const bgVideo = document.getElementById("bgVideo");

bgVideo.src = videos[index];

bgVideo.addEventListener("ended", () => {
  index = (index + 1) % videos.length;
  bgVideo.src = videos[index];
  bgVideo.play();
});
