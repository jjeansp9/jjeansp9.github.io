window.onscroll = function() {makeSticky()};

var nav = document.getElementById("nav");
var iframe = document.getElementById("myIframe"); // iframe 요소를 가져옴
var sticky = nav.offsetTop;

function makeSticky() {
    if (window.pageYOffset > sticky) {
      if (!nav.classList.contains("sticky")) {
        nav.classList.add("sticky");
        // nav가 sticky 상태가 되면, iframe의 marginTop을 조정
        var navHeight = nav.offsetHeight; // nav 요소의 높이를 가져옴
        iframe.style.marginTop = navHeight + "px"; // iframe의 marginTop을 nav 높이만큼 설정
      }
    } else {
      if (nav.classList.contains("sticky")) {
        nav.classList.remove("sticky");
        // nav가 sticky 상태가 아니면, iframe의 marginTop을 원래대로 설정
        iframe.style.marginTop = '0px'; // iframe의 marginTop을 초기화
      }
    }
  }