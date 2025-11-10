const videoBtn = document.getElementById("video-button");
const videoWrapper = document.getElementById("video-wrapper");

videoBtn.addEventListener("click", function () {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/F_UmiKMwRwA?autoplay=1&rel=0&modestbranding=1";
    iframe.title = "Cooking process";
    iframe.allow = "autoplay; fullscreen";
    iframe.allowFullscreen = true;

    iframe.classList.add("video--playing");

    videoWrapper.innerHTML = "";
    videoWrapper.appendChild(iframe);
});
