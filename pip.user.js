// ==UserScript==
// @name         Picture-in-Picture for Youtube
// @version      2.6.1
// @description  Picture-in-Picture button and other useful features.
// @author       Super Zombi, shelbyKiraM
// @match        https://www.youtube.com/*
// @homepageURL  https://github.com/shelbyKiraM/Picture-in-Picture-for-Youtube
// @supportURL   https://github.com/shelbyKiraM/Picture-in-Picture-for-Youtube/issues
// @updateURL    https://raw.githubusercontent.com/shelbyKiraM/Picture-in-Picture-for-Youtube/main/pip.user.js
// @downloadURL  https://raw.githubusercontent.com/shelbyKiraM/Picture-in-Picture-for-Youtube/main/pip.user.js
// ==/UserScript==

'use strict';

const DOM = window.trustedTypes?.createPolicy('BypassTT', { createHTML: HTML => HTML }), images = {
  "close.png":"", "A1.gif":"", "A2.gif":"", "A3.gif":"",
  "speedometer.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0ODguNiA0ODguNiI+DQoJPHBhdGggZmlsbD0iI2FhYSIgZD0iTTE4OC41LDI3MC4zYy0yNC40LDI4LjEtMjMuMiw3MS43LDIuNiw5OC42YzE0LjQsMTUuMSwzMy43LDIyLjYsNTIuOSwyMi42YzE4LjgsMCwzNy41LTcuMiw1MS44LTIxLjUNCgkJYzYuNS02LjUsMTEuNi0xNCwxNS4xLTIxLjlsMCwwbDk0LjUtMTgzLjJjMi41LTUuMi0yLjktMTAuNi04LjEtOC4xbC0xODMuMiw5NC41bDAsMEMyMDQuNiwyNTUuNSwxOTUuOSwyNjEuOSwxODguNSwyNzAuM3oNCgkJIE0yMjEuOSwyOTYuMWM2LjEtNi4xLDE0LjEtOS4yLDIyLjEtOS4yczE2LDMuMSwyMi4yLDkuMmMxMi4yLDEyLjIsMTIuMiwzMi4xLDAsNDQuM2MtNi4xLDYuMS0xNC4xLDkuMi0yMi4yLDkuMg0KCQljLTgsMC0xNi0zLjEtMjIuMS05LjJDMjA5LjYsMzI4LjEsMjA5LjYsMzA4LjMsMjIxLjksMjk2LjF6IE00NDAuMiwzNDEuNGMwLTM0LjYtOS4xLTY4LjYtMjYuNC05OC4zYy02LjctMTEuNi0yLjgtMjYuNCw4LjgtMzMuMQ0KCQljMTEuNi02LjcsMjYuNC0yLjgsMzMuMSw4LjhjMjEuNSwzNy4xLDMyLjksNzkuNSwzMi45LDEyMi42YzAsMTMuNC0xMC44LDI0LjItMjQuMiwyNC4yQzQ1MS4xLDM2NS42LDQ0MC4yLDM1NC44LDQ0MC4yLDM0MS40eg0KCQkgTTAsMzQxLjRDMCwyMDYuNywxMDkuNiw5Ny4xLDI0NC4zLDk3LjFjMzEuMywwLDYxLjgsNS44LDkwLjYsMTcuNGMxMi40LDUsMTguNCwxOSwxMy41LDMxLjRjLTUsMTIuNC0xOSwxOC40LTMxLjQsMTMuNQ0KCQljLTIzLjEtOS4yLTQ3LjYtMTMuOS03Mi43LTEzLjljLTEwOCwwLTE5NS45LDg3LjktMTk1LjksMTk1LjljMCwxMy40LTEwLjgsMjQuMi0yNC4yLDI0LjJDMTAuOCwzNjUuNiwwLDM1NC44LDAsMzQxLjR6Ii8+DQo8L3N2Zz4=",
  "full.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+DQogIDxnIGZpbGw9IiNhYWEiPg0KICAgIDxwYXRoIGQ9Ik0xIDF2NmgyVjNoNFYxSDF6Ii8+DQogICAgPHBhdGggZD0iTTEgMTJ2Nmg2di0ySDN2LTR6Ii8+DQogICAgPHBhdGggZD0iTTE5IDF2NmgtMlYzaC00VjFoNloiLz4NCiAgICA8cGF0aCBkPSJNMTguOTk3IDEydjZoLTZ2LTJoNHYtNGgyWiIvPg0KICA8L2c+DQo8L3N2Zz4=",
  // "noise.png":"",
  "download.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0cm9rZT0iI2FhYSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdmlld0JveD0iMCAwIDIyIDIyIj4KICA8cGF0aCBkPSJNIDExIDYgTCAxMSAxMyBNIDExIDEzIEwgMTQgMTAgTSAxMSAxMyBMIDggMTAiLz4KICA8cGF0aCBkPSJNIDE1IDE2IEwgNyAxNiBNIDIxIDExIEMgMjEgMTUuNzEgMjEgMTguMDcgMTkuNTQgMTkuNTQgQyAxOC4wNyAyMSAxNS43IDIxIDExIDIxIEMgNi4yOSAyMSAzLjkzIDIxIDIuNDYgMTkuNTQgQyAxIDE4LjA3IDEgMTUuNyAxIDExIEMgMSA2LjI5IDEgMy45MyAyLjQ2IDIuNDYgQyAzLjkzIDEgNi4zIDEgMTEgMSBDIDE1LjcxIDEgMTguMDcgMSAxOS41NCAyLjQ2IEMgMjAuNTEgMy40NCAyMC44NCA0LjgxIDIwLjk0IDciLz4KPC9zdmc+",
}, locale = { 'en': { "settings": "Settings", "activatePip": "Activate PiP", "animation": "Animation", "noAnimation": "No animation", "otherSet": "Other settings", "hideButtonLabels": "Hide button labels", "hideClips": "Hide «Clips» Button", "hideDownload": "Hide «Download» Button", "hideSponsor": "Hide «Sponsor» Button", "hideWatchOnTv": "Hide «Watch on TV»", "hideShortsRemix": "Hide «Remix» in Shorts", "hideShortsChannelAvatar": "Hide Channel Avatar in Shorts", "speed": "Speed", "playbackSpeed": "Playback speed", "fullscreen": "Full screen", "fullscreenMode": "Full screen mode", "maximumVolume": "Maximum volume", "skipAds": "Skip ads", "Hotkeys": "Hotkeys", "rewind": "Rewind: ", "autoplayNext": "Autoplay", "play_pause": "Play/Pause", "saveBut": "Save", "closeBut": "Close", "resetBut": "Reset", "download": "Download", "downloadShorts": "Video downloading" } }

function db_get(value, default_=undefined) {
  return default_
}

function get_message(name, default_="en") {
  var userLang = (navigator.language || navigator.userLanguage).slice(0,2).toLowerCase();
  if (Object.keys(locale).includes(userLang) && Object.keys(locale[userLang]).includes(name)) {
    return locale[userLang][name]
  }
  return locale[default_][name]
}

/////////////////////////////////

main();
document.addEventListener("yt-navigate-finish", () => {
  main();
});

document.addEventListener("yt-player-updated", () => {
  if (db_get("maximumVolume", false)) {
    smartVolume(document.querySelector("video"))
  }
});

function getVideoId(url) {
  const urlObject = new URL(url), pathname = urlObject.pathname;
  if (pathname.startsWith("/clip")) {
    return document.querySelector("meta[itemprop='videoId']").content;
  } else {
    return urlObject.searchParams.get("v");
  }
}

function isVideoLoaded() {
  const videoId = getVideoId(window.location.href);
  return (
    document.querySelector(`ytd-watch-flexy[video-id='${videoId}']`) !== null ||
    // mobile: no video-id attribute
    document.querySelector('#player[loading="false"]:not([hidden])') !== null
  );
}

function getButtons() {
  //---   If Menu Element Is Displayed:   ---//
  if (document.getElementById("menu-container")?.offsetParent === null) {
    return document.querySelector("ytd-menu-renderer.ytd-watch-metadata > div");
    //---   If Menu Element Isnt Displayed:   ---//
  } else {
    return document
    .getElementById("menu-container")
    ?.querySelector("#top-level-buttons-computed");
  }
}
/*
function hide_icon(target_svg) {
let timerId = setInterval(() => {
if (getButtons()?.offsetParent && isVideoLoaded()) {
let arr = [ ...document.querySelectorAll('#flexible-item-buttons ytd-button-renderer'),
...document.querySelectorAll('#top-level-buttons-computed ytd-button-renderer')]
for (let i = 0; i < arr.length; i++) {
let icon = arr[i].querySelectorAll('svg')
if (icon[0]) {
if (target_svg == icon[0].getElementsByTagName('path')[0].getAttribute('d')) {
if (arr[i].parentElement == document.querySelector('ytd-download-button-renderer')) {
arr[i].parentElement.remove()
} else {
arr[i].remove()
}
break
}
}
}
clearInterval(timerId)
}
}, 200);
}

function hide_button(id) {
let timerId = setInterval(() => {
if (getButtons()?.offsetParent && isVideoLoaded()) {
let el = document.getElementById(id)
if (el) { el.remove() }
clearInterval(timerId)
}
}, 200);
}
*/
function hideAllText_onButton() {
  let timerId = setInterval(() => {
    if (getButtons()?.offsetParent && isVideoLoaded()) {
      let arr = document.querySelectorAll('#top-level-buttons-computed yt-button-view-model')
      for (let i = 0; i < arr.length; i++) {
        let text_element = arr[i].querySelector(".yt-spec-button-shape-next__button-text-content")
        if (text_element) {
          let icon = text_element.previousElementSibling;
          icon.style.marginLeft = 0;
          icon.style.marginRight = 0;
          text_element.remove()
        }
      }
      clearInterval(timerId)
    }
  }, 200);
}

function hideWatchOnTV() {
  let button = document.querySelector('.ytp-remote-button');
  button.style.display = 'none';
  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      button.style.display = 'none';
    });
  });
  observer.observe(button, {attributes: true});
}
function isInViewport(element) {
  const rect = element.getBoundingClientRect(), height = innerHeight || document.documentElement.clientHeight, width = innerWidth || document.documentElement.clientWidth;
  return (
    !(rect.top == 0 && rect.left == 0 && rect.bottom == 0 && rect.right == 0) &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= height &&
    rect.right <= width
  );
}
function getShortsCurrent(selector) {
  let elements = document.querySelectorAll(selector)
  for (let element of elements) {
    if (isInViewport(element)) {
      return element
    }
  }
}

var currentSpeed = 1;
function addSpeedometer(parrent) {
  function click_heandler(element) {
    document.body.onclick = function(event) {
      let path = event.path || (event.composedPath && event.composedPath());
      if (path.includes(element)) {
        if (path.includes(element.lastChild)) { return }
        let result = element.lastChild.style.visibility == "hidden" ? "visible" : "hidden";
        element.lastChild.style.visibility = result;
      } else { element.lastChild.style.visibility = "hidden"; }
    }
  }
  if (!parrent.querySelector("#speedometer")) {
    let div = document.createElement("div")
    div.id = "speedometer"
    div.title = get_message("speed")
    div.style.marginBottom = "16px"
    div.style.position = "relative"
    div.style.display = "flex";
    div.style.alignItems = "center";
    let img = document.createElement("img")
    img.src = images["speedometer.svg"]
    img.draggable = false;
    img.style.userSelect = "none"
    img.style.cursor = "pointer"
    img.style.height = "32px"
    img.style.marginBottom = "2px";
    click_heandler(div)

    let slider_area = document.createElement("div")
    slider_area.style.visibility = "hidden";
    slider_area.style.display = "flex";
    slider_area.style.alignItems = "center";
    slider_area.style.position = "absolute";
    slider_area.style.left = "40px";

    let input = document.createElement("input")
    input.type = "range"
    input.min = 1
    input.max = 2
    input.step = 0.25
    input.value = currentSpeed
    input.style.cursor = "ew-resize"
    input.oninput = function(e) {
      e.target.nextElementSibling.textContent = e.target.value + "x";
      let video = getShortsCurrent("#shorts-container video")
      currentSpeed = e.target.value;
      video.playbackRate = e.target.value;
    }
    let text = document.createElement("span")
    text.textContent = currentSpeed + "x";
    text.style.fontSize = "14px";
    text.style.marginLeft = "5px";
    text.style.color = "#aaa"
    text.style.userSelect = "none"

    slider_area.appendChild(input)
    slider_area.appendChild(text)

    div.appendChild(img)
    div.appendChild(slider_area)
    parrent.insertBefore(div, parrent.querySelector("#share-button"));
    getShortsCurrent("#shorts-container .overlay").style.overflow = "visible"
  } else {
    parrent.querySelector("#speedometer input").value = currentSpeed;
    parrent.querySelector("#speedometer span").textContent = currentSpeed + "x";
    click_heandler(parrent.querySelector("#speedometer"))
  }
}
function addFullScreen(parrent, video) {
  if (!parrent.querySelector("#fullScreener")) {
    let div = document.createElement("div")
    div.id = "fullScreener"
    div.title = get_message("fullscreen")
    div.style.marginBottom = "14px"
    div.style.cursor = "pointer"
    div.style.transition = "0.2s ease"
    div.onmouseover = _=> {
      div.style.transform = "scale(1.15)"
      setTimeout(function() { div.style.transform = "" }, 150)
    }
    div.onclick = _=>{
      let video = getShortsCurrent("#shorts-container video")
      video.style.objectFit = "contain";
      video.requestFullscreen();
    }
    let img = document.createElement("img")
    img.src = images["full.svg"]
    img.draggable = false;
    img.style.userSelect = "none"
    img.style.width = "28px"
    div.appendChild(img)
    parrent.insertBefore(div, parrent.querySelector("#share-button"));
  }
  video.addEventListener("fullscreenchange", _=>{
    function fullScreener() {
      if (!video.hasAttribute("controls")) {
        video.setAttribute("controls","controls")
      }
      if (video.hasAttribute("data-no-fullscreen")) {
        video.removeAttribute("data-no-fullscreen")
      }
    }

    if (document.fullscreenElement) {
      let controlsObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          fullScreener()
        });
      });
      controlsObserver.observe(video, {attributes: true});
      fullScreener()

      var playRateHandler = function() {
        let element = getShortsCurrent("#shorts-container #actions").querySelector("#speedometer input")
        if (element) {
          currentSpeed = video.playbackRate;
          element.value = currentSpeed;
          element.nextElementSibling.textContent = currentSpeed + "x";
        }
      }

      video.addEventListener("ratechange", playRateHandler)
      video.addEventListener("fullscreenchange", _=>{
        if (!document.fullscreenElement) {
          controlsObserver.disconnect()
          video.removeAttribute("controls")
          video.removeEventListener("ratechange", playRateHandler); 
        }
      })
    }
  })
}
function addDownloadButton(parrent) {
  if (!parrent.querySelector("#downloadShort")) {
    let div = document.createElement("div")
    div.id = "downloadShort"
    div.title = get_message("download")
    div.style.marginBottom = "14px"
    div.style.cursor = "pointer"
    div.style.transition = "0.2s ease"
    div.onmouseover = _=> {
      if (!div.getAttribute("disabled")) {
        div.style.transform = "scale(1.15)"
        setTimeout(function() { div.style.transform = "" }, 150)
      }
    }
    div.onclick = _=>{
      if (!div.getAttribute("disabled")) {
        div.setAttribute("disabled", true)
        div.style.cursor = "wait"
        let video = getShortsCurrent("#shorts-container video")
        if(!video) {return}
        let stream = video.captureStream ? video.captureStream() : video.mozCaptureStream(), recordedChunks = [], recorder = new MediaRecorder(stream, { mimeType : 'video/webm' })
        recorder.ondataavailable = e=>{
          if (e.data.size > 0) {
            recordedChunks.push(e.data)
          }
        }
        recorder.onstop = _=>{
          let blob = new Blob(recordedChunks, { type: 'video/webm' }), url = URL.createObjectURL(blob), a = document.createElement('a')
          a.href = url
          a.download = `${document.title}.webm`
          a.click()
          div.removeAttribute("disabled")
          div.style.cursor = "pointer"
          video.ontimeupdate = null
          video.setAttribute("loop", true)
        }
        video.currentTime = 0;
        video.playbackRate = 1;
        video.play();
        recorder.start();
        video.onended = _=>recorder.stop();
        video.ontimeupdate = _=>video.removeAttribute("loop")
      }
    }
    let img = document.createElement("img")
    img.src = images["download.svg"]
    img.draggable = false;
    img.style.userSelect = "none"
    img.style.width = "36px"
    div.appendChild(img)
    parrent.insertBefore(div, parrent.querySelector("#share-button"));
  }
}

function smartVolume(video) {
  function check() {
    let data = JSON.parse(window.localStorage.getItem("yt-player-volume"));
    if (data) {
      let currentVolume = JSON.parse(data.data).volume/100;
      if (video.volume != currentVolume) {
        video.volume = currentVolume;
      }
    }
  }
  check()
  video.addEventListener("volumechange", check, true)
}

var currentShortID = 0;
function adsSkiper(container) {
  // Disable adBlock ( @@||youtube.com/shorts/*^$document )
  let ads = container.querySelector(".ytd-ad-slot-renderer")
  if (ads) {
    let reelId = getReelId(container)
    if (reelId < currentShortID) {
      document.querySelector("#navigation-button-up button").click()
    } else {
      document.querySelector("#navigation-button-down button").click()
    }
    return true
  }
}
function getReelId(container) {
  let parent = container.closest(".reel-video-in-sequence-new")
  if (parent) {
    let val = parent.getAttribute("id")
    if (val && !isNaN(val)) {
      return parseInt(val)
    }
  }
  return 0
}

var HotKeysWorker = function(e) {
  if (document.activeElement == document.querySelector("#search-form input") || // search
    document.activeElement == document.querySelector('input[name="search_query"]') || // search
    document.activeElement.classList.contains("yt-formatted-string")         // comments
) {return}

let vid = getShortsCurrent("#shorts-container video");

if (db_get("shortcuts", {})["J_and_L"]) {
  J_L_rewind(parseInt(db_get("shortcuts", {})["J_and_L"]))
}
if (db_get("shortcuts", {})["ArrowLeftRight"]) {
  Left_Right_arrow_rewind(parseInt(db_get("shortcuts", {})["ArrowLeftRight"]))
}
if (db_get("shortcuts", {})["fullscreen"]) {
  fullScreen_button()
}
if (db_get("shortcuts", {})["play_pause"]) {
  play_pause_button()
}

function rewind_manager(sec) {
  let target = Math.max(0, vid.currentTime + sec);
  if (target < vid.duration) {
    vid.currentTime = target;
  }
}

function J_L_rewind(sec) {
  if (e.keyCode == 74) {      // J
    rewind_manager(0 - sec)
  } else if (e.keyCode == 76) { // L
    rewind_manager(sec)
  }
}
function Left_Right_arrow_rewind(sec) {
  if (e.keyCode == 37) {      // ArrowLeft
    rewind_manager(0 - sec)
  } else if (e.keyCode == 39) { // ArrowRight
    rewind_manager(sec)
  }
}
function fullScreen_button() {
  if (e.keyCode == 70) {      // F
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      vid.style.objectFit = "contain";
      vid.requestFullscreen();
    }
  }
}
function play_pause_button() {
  if (e.keyCode == 32) {
    e.preventDefault();
  }
}
}

function main() {
const clips_svg = "M8,7c0,0.55-0.45,1-1,1S6,7.55,6,7c0-0.55,0.45-1,1-1S8,6.45,8,7z M7,16c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1s1-0.45,1-1 C8,16.45,7.55,16,7,16z M10.79,8.23L21,18.44V20h-3.27l-5.76-5.76l-1.27,1.27C10.89,15.97,11,16.47,11,17c0,2.21-1.79,4-4,4 c-2.21,0-4-1.79-4-4c0-2.21,1.79-4,4-4c0.42,0,0.81,0.08,1.19,0.2l1.37-1.37l-1.11-1.11C8,10.89,7.51,11,7,11c-2.21,0-4-1.79-4-4 c0-2.21,1.79-4,4-4c2.21,0,4,1.79,4,4C11,7.43,10.91,7.84,10.79,8.23z M10.08,8.94L9.65,8.5l0.19-0.58C9.95,7.58,10,7.28,10,7 c0-1.65-1.35-3-3-3S4,5.35,4,7c0,1.65,1.35,3,3,3c0.36,0,0.73-0.07,1.09-0.21L8.7,9.55l0.46,0.46l1.11,1.11l0.71,0.71l-0.71,0.71 L8.9,13.91l-0.43,0.43l-0.58-0.18C7.55,14.05,7.27,14,7,14c-1.65,0-3,1.35-3,3c0,1.65,1.35,3,3,3s3-1.35,3-3 c0-0.38-0.07-0.75-0.22-1.12l-0.25-0.61L10,14.8l1.27-1.27l0.71-0.71l0.71,0.71L18.15,19H20v-0.15L10.08,8.94z M17.73,4H21v1.56 l-5.52,5.52l-2.41-2.41L17.73,4z M18.15,5l-3.67,3.67l1,1L20,5.15V5H18.15z", download_svg = "M17 18V19H6V18H17ZM16.5 11.4L15.8 10.7L12 14.4V4H11V14.4L7.2 10.6L6.5 11.3L11.5 16.3L16.5 11.4Z"

if (Object.keys(db_get("shortcuts", {})).length > 0) {
  window.removeEventListener("keydown", HotKeysWorker, true)
}
if (window.location.pathname.startsWith("/shorts")) {
  let timerId = setInterval(() => {
    let actions = getShortsCurrent("#shorts-container #actions")
    let video = getShortsCurrent("#shorts-container video")
    if (video) {
      let container = video.closest("ytd-reel-video-renderer")

      if (db_get("skipAds", true)) {
        let adsFounded = adsSkiper(container)
        if (adsFounded) {
          clearInterval(timerId)
          return
        }
      }
      currentShortID = getReelId(container)
    }
    if (actions && video) {
      clearInterval(timerId)
      if (db_get("shorts_download", false)) {
        addDownloadButton(actions)
      }
      if (db_get("speedometer", true)) {
        video.playbackRate = currentSpeed
        addSpeedometer(actions)
      }
      if (db_get("fullscreenBut", true)) {
        addFullScreen(actions, video)
      }
      if (db_get("autoNext", false)) {
        video.addEventListener("timeupdate", () => {
          video.removeAttribute("loop")
        })
        video.addEventListener("ended", _=> {
          document.querySelector("#navigation-button-down button").click()
        })
      }
      if (Object.keys(db_get("shortcuts", {})).length > 0) {
        window.addEventListener("keydown", HotKeysWorker, true)
      }
      if (db_get("hideButtonLabels", false)) {
        [
          actions.querySelector("#share-button span[role='text']"),
          actions.querySelector("#remix-button span[role='text']"),
        ].forEach(text_element=>{
          if (text_element) {
            text_element.parentElement.remove()
          }
        })
      }
      if (db_get("hideShortsRemix", false)) {
        let button = actions.querySelector("#remix-button")
        if (button) {
          button.remove()
        }
      }
      if (db_get("hideShortsChannelAvatar", false)) {
        let button = actions.querySelector("#pivot-button")
        if (button) {
          button.remove()
        }
      }
    }
  }, 50);
  return
}
let video = document.querySelector(":is(ytd-watch-flexy, ytd-shorts):not([hidden]) video")
if (video) {
  main_watch(video)
} else if (window.location.pathname.startsWith("/watch")) {
  let timerId = setInterval(() => {
    let video = document.querySelector("video")
    if (video) {
      clearInterval(timerId)
      main_watch(video)
    }
  }, 10);
}

function main_watch(video) {
  if (db_get("maximumVolume", true)) {
    smartVolume(video)
  }
  if (db_get("hideButtonLabels", true)) {
    hideAllText_onButton()
  }
  if (db_get("hideWatchOnTv", false)) {
    hideWatchOnTV()
  }
  if (db_get("hideSponsor", false)) {
    hide_button("sponsor-button")
  }
  /*
  if (db_get("hideClips", false)) {
  hide_icon(clips_svg)
  }
  if (db_get("hideDownload", false)) {
  hide_icon(download_svg)
  }
  */

  if (db_get("activatePip", true)) {
    var button = document.getElementsByClassName('ytp-pip-button')[0];
    button.style.display = 'inline-block';

    /*
    document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
    button.style.display = 'none';
    } else {
    button.style.display = 'inline-block';
    }
    });
    */
      
    var hover_animation = true, animation = db_get("animation", "default");
    if (animation == "animation_1") {
      document.addEventListener('enterpictureinpicture', () => {
        document.getElementById('pip_custom_path').style.transform = "translate(2450px, 2100px) rotateY(180deg) rotateX(180deg)"
      });
      document.addEventListener('leavepictureinpicture', () => {
        document.getElementById('pip_custom_path').style.transform = ""
      });
    } else if (animation == "animation_2") {
      document.addEventListener('enterpictureinpicture', () => {
        document.getElementById('pip_custom_path').style.transform = "translateY(2100px) translateX(2450px) rotate(-180deg)"
      });
      document.addEventListener('leavepictureinpicture', () => {
        document.getElementById('pip_custom_path').style.transform = ""
      });
    } else if (animation == "animation_3") {
      document.addEventListener('enterpictureinpicture', () => {
        document.getElementById('pip_custom_path').style.opacity = 0
        setTimeout(_=>{
          document.getElementById('pip_custom_path').setAttribute('d', "M1645 1619 c-11 -6 -172 -163 -357 -348 l-338 -336 0 142 c0 137 -1 142 -26 172 -32 38 -80 49 -122 27 -17 -9 -36 -25 -42 -35 -14 -26 -14 -586 0 -612 24 -45 53 -49 333 -49 167 0 276 4 296 11 64 22 80 107 32 161 l-29 33 -148 5 -147 5 244 238 c134 131 290 287 347 347 95 102 102 113 102 151 0 75 -79 123 -145 88z");
          document.getElementById('pip_custom_path').style.opacity = 1
        }, 200)
      });
      document.addEventListener('leavepictureinpicture', () => {
        document.getElementById('pip_custom_path').style.opacity = 0
        setTimeout(_=>{
          document.getElementById('pip_custom_path').setAttribute('d', "M1348 1825 c-35 -19 -48 -44 -48 -90 0 -46 23 -81 62 -94 17 -6 88 -11 157 -11 l125 0 -342 -343 -342 -343 0 -51 c0 -45 4 -54 31 -77 22 -19 42 -26 72 -26 41 0 44 3 389 347 l348 348 0 -138 c0 -155 9 -186 59 -207 42 -17 95 -5 121 27 19 25 20 39 20 319 l0 293 -24 28 -24 28 -289 2 c-241 2 -292 0 -315 -12z");
          document.getElementById('pip_custom_path').style.opacity = 1
        }, 200)
      });
    } else {
      hover_animation = false;

      document.addEventListener('enterpictureinpicture', () => {
        var g = document.getElementById('pip_svg');
        g.innerHTML = "";

        var path1 = document.createElement('path');
        path1.setAttribute('d', "M1645 1619 c-11 -6 -172 -163 -357 -348 l-338 -336 0 142 c0 137 -1 142 -26 172 -32 38 -80 49 -122 27 -17 -9 -36 -25 -42 -35 -14 -26 -14 -586 0 -612 24 -45 53 -49 333 -49 167 0 276 4 296 11 64 22 80 107 32 161 l-29 33 -148 5 -147 5 244 238 c134 131 290 287 347 347 95 102 102 113 102 151 0 75 -79 123 -145 88z");
        var path2 = document.createElement('path');
        path2.setAttribute('d', "M26 1584 l-26 -27 0 -664 0 -664 25 -24 24 -25 836 0 837 0 29 29 29 29 0 307 c0 325 -3 350 -49 375 -35 18 -87 12 -120 -16 l-31 -26 0 -249 0 -249 -690 0 -690 0 0 515 0 515 411 0 411 0 29 29 c41 41 41 101 0 142 l-29 29 -485 0 -484 0 -27 -26z");
          
        g.appendChild(path1);
        g.appendChild(path2);

        g.innerHTML += "";
      });
      document.addEventListener('leavepictureinpicture', () => {
        var g = document.getElementById('pip_svg');
        g.innerHTML = "";

        var path1 = document.createElement('path');
        path1.setAttribute('d', "M1348 1825 c-35 -19 -48 -44 -48 -90 0 -46 23 -81 62 -94 17 -6 88 -11 157 -11 l125 0 -342 -343 -342 -343 0 -51 c0 -45 4 -54 31 -77 22 -19 42 -26 72 -26 41 0 44 3 389 347 l348 348 0 -138 c0 -155 9 -186 59 -207 42 -17 95 -5 121 27 19 25 20 39 20 319 l0 293 -24 28 -24 28 -289 2 c-241 2 -292 0 -315 -12z");
        var path2 = document.createElement('path');
        path2.setAttribute('d', "M26 1584 l-26 -27 0 -664 0 -664 25 -24 24 -25 836 0 837 0 29 29 29 29 0 307 c0 325 -3 350 -49 375 -35 18 -87 12 -120 -16 l-31 -26 0 -249 0 -249 -690 0 -690 0 0 515 0 515 411 0 411 0 29 29 c41 41 41 101 0 142 l-29 29 -485 0 -484 0 -27 -26z");
          
        g.appendChild(path1);
        g.appendChild(path2);

        g.innerHTML += "";
      });
    }

    button.style.transform = 'scale(0.9)';
    button.style.transition = '0.2s';

    if (hover_animation) {
      button.onmouseover = function() {
        this.style.transform = "scale(0.95)"
      }
      button.onmouseleave = function() {
        this.style.transform = 'scale(0.9)'
      }
    }

    var svg = button.children[0];
    svg.innerHTML = "";
      
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', "0 0 300 300");

    var g = document.createElement('g');
    g.setAttribute('transform', 'translate(60,240) scale(0.1,-0.1)');
    g.setAttribute('fill', '#fff');
    g.setAttribute('stroke', 'none');
    g.setAttribute('id', 'pip_svg');

    var path1 = document.createElement('path');
    path1.id = "pip_custom_path"
    path1.style.transformOrigin = 'center'
    path1.style.transition = "0.25s cubic-bezier(0, 0.5, 0.2, 1)"
      
    path1.setAttribute('d', "M1348 1825 c-35 -19 -48 -44 -48 -90 0 -46 23 -81 62 -94 17 -6 88 -11 157 -11 l125 0 -342 -343 -342 -343 0 -51 c0 -45 4 -54 31 -77 22 -19 42 -26 72 -26 41 0 44 3 389 347 l348 348 0 -138 c0 -155 9 -186 59 -207 42 -17 95 -5 121 27 19 25 20 39 20 319 l0 293 -24 28 -24 28 -289 2 c-241 2 -292 0 -315 -12z");
    var path2 = document.createElement('path');
    path2.setAttribute('d', "M26 1584 l-26 -27 0 -664 0 -664 25 -24 24 -25 836 0 837 0 29 29 29 29 0 307 c0 325 -3 350 -49 375 -35 18 -87 12 -120 -16 l-31 -26 0 -249 0 -249 -690 0 -690 0 0 515 0 515 411 0 411 0 29 29 c41 41 41 101 0 142 l-29 29 -485 0 -484 0 -27 -26z");
      
    g.appendChild(path1);
    g.appendChild(path2);
    svg.appendChild(g);

    svg.innerHTML += "";
  }
}
}