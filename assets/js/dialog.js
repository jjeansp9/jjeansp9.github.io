document.addEventListener("DOMContentLoaded", function() {
  // dialog.html 파일을 fetch로 불러옵니다.
  fetch('pages/dialog.html')
    .then(function(response) {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.text();
    })
    .then(function(htmlString) {
      // DOMParser를 사용해 HTML 문자열을 파싱합니다.
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlString, 'text/html');
      // dialog.html 내부에서 #customDialog 요소를 추출합니다.
      var dialogElement = doc.getElementById('customDialog');
      if (!dialogElement) {
        console.error("dialog.html에 #customDialog 요소가 없습니다.");
        return;
      }
      // 추출한 다이얼로그 요소를 index.html의 dialogContainer에 삽입합니다.
      document.getElementById('dialogContainer').appendChild(dialogElement);

      // 이제 다이얼로그가 DOM에 추가되었으므로 이벤트 리스너를 등록합니다.
      var trigger = document.getElementById("trigger");
      var dialog = document.getElementById("customDialog");
      var closeBtn = dialog.querySelector(".close");

      // 트리거 클릭 시 다이얼로그 활성화 (active 클래스 추가)
      trigger.addEventListener("click", function() {
        dialog.classList.add("active");
      });

      // 닫기 버튼 클릭 시 다이얼로그 비활성화 (active 클래스 제거)
      closeBtn.addEventListener("click", function() {
        dialog.classList.remove("active");
      });

      // 다이얼로그 영역 외부 클릭 시 닫기
      window.addEventListener("click", function(e) {
        if (e.target === dialog) {
          dialog.classList.remove("active");
        }
      });
    })
    .catch(function(err) {
      console.error("Error loading dialog.html:", err);
    });
});