document.addEventListener("DOMContentLoaded", function() {
    var trigger = document.getElementById("trigger");
    var dialog = document.getElementById("customDialog");
    var closeBtn = document.querySelector("#customDialog .close");
  
    // 트리거 클릭 시 다이얼로그 활성화
    trigger.addEventListener("click", function() {
      dialog.classList.add("active");
    });
  
    // 닫기 버튼 클릭 시 다이얼로그 비활성화
    closeBtn.addEventListener("click", function() {
      dialog.classList.remove("active");
    });
  
    // 다이얼로그 영역 외부 클릭 시 닫기
    window.addEventListener("click", function(e) {
      if (e.target === dialog) {
        dialog.classList.remove("active");
      }
    });
  });
  