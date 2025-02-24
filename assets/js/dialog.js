// document.addEventListener("DOMContentLoaded", function() {
//   // dialog.html 파일을 fetch로 불러옵니다.
//   fetch('pages/dialog.html')
//     .then(function(response) {
//       if (!response.ok) {
//         throw new Error("HTTP error " + response.status);
//       }
//       return response.text();
//     })
//     .then(function(htmlString) {
//       // DOMParser를 사용해 HTML 문자열을 파싱합니다.
//       var parser = new DOMParser();
//       var doc = parser.parseFromString(htmlString, 'text/html');
//       // dialog.html 내부에서 #customDialog 요소를 추출합니다.
//       var dialogElement = doc.getElementById('customDialog');
//       if (!dialogElement) {
//         console.error("dialog.html에 #customDialog 요소가 없습니다.");
//         return;
//       }
//       // 추출한 다이얼로그 요소를 index.html의 dialogContainer에 삽입합니다.
//       document.getElementById('dialogContainer').appendChild(dialogElement);

//       // 이제 다이얼로그가 DOM에 추가되었으므로 이벤트 리스너를 등록합니다.
//       var trigger = document.getElementById("trigger");
//       var dialog = document.getElementById("customDialog");
//       var closeBtn = dialog.querySelector(".close");

//       // 트리거 클릭 시 다이얼로그 활성화 (active 클래스 추가)
//       trigger.addEventListener("click", function() {
//         dialog.classList.add("active");
//       });

//       // 닫기 버튼 클릭 시 다이얼로그 비활성화 (active 클래스 제거)
//       closeBtn.addEventListener("click", function() {
//         dialog.classList.remove("active");
//       });

//       // 다이얼로그 영역 외부 클릭 시 닫기
//       window.addEventListener("click", function(e) {
//         if (e.target === dialog) {
//           dialog.classList.remove("active");
//         }
//       });
//     })
//     .catch(function(err) {
//       console.error("Error loading dialog.html:", err);
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
  // JSON 데이터 파일 불러오기
  fetch('data/projects.json')
    .then(response => response.json())
    .then(itemsData => {
      // id가 itemsContainer인 모든 요소들을 선택합니다.
    const containers = document.querySelectorAll('#itemsContainer');
    const numContainers = containers.length;
    
    // JSON 데이터의 각 항목을 순회하며 라운드 로빈 방식으로 분배합니다.
    itemsData.forEach((item, index) => {
      const container = containers[index % numContainers];
      let element;
      
      // 마지막 아이템인 경우: 링크 형태로 생성
      if (index === itemsData.length - 1) {
        element = document.createElement('a');
        // JSON에 link 프로퍼티가 있다면 사용, 없으면 기본값 사용
        element.href = item.link ? item.link : "/files/travin.pdf";
        element.classList.add('item-link');
        element.target = "_blank";
        element.rel = "noopener noreferrer";
        
        // 내부에 article 요소 생성
        const article = document.createElement('article');
        article.classList.add('items');
        // 마지막 아이템은 다이얼로그로 띄우지 않으므로 data-attributes는 추가하지 않습니다.
        article.innerHTML = `
          <div class="image fit">
            <img src="${item.img}" alt="${item.title}">
          </div>
          <header>
            <h3>${item.title}</h3>
          </header>
        `;
        element.appendChild(article);
      } else {
        // 일반 항목: 클릭 시 다이얼로그를 띄움 (data-attributes로 데이터 저장)
        element = document.createElement('article');
        element.classList.add('item');
        element.setAttribute('data-title', item.title);
        element.setAttribute('data-content', item.content);
        element.setAttribute('data-img', item.img);
        element.innerHTML = `
          <div class="image fit">
              <img src="${item.img}" alt="${item.title}">
            </div>
            <header>
              <h3>${item.title}</h3>
            </header>
          
        `;
      }
      container.appendChild(element);
      // 항목들이 모두 생성된 후 다이얼로그 처리 코드를 실행합니다.
      setupDialog();
    });
    })
    .catch(err => console.error("Error loading items.json:", err));

  function setupDialog() {
    // dialog.html 파일을 fetch로 불러옵니다.
    fetch('pages/dialog.html')
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.text();
      })
      .then(function (htmlString) {
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
        const dialog = document.getElementById("customDialog");
        const closeBtn = dialog.querySelector(".close");

        // 모든 항목에 대해 클릭 이벤트 등록
        const triggers = document.querySelectorAll(".item");
        triggers.forEach(function (trigger) {
          trigger.addEventListener("click", function () {
            // 각 항목의 데이터 읽기
            const data = {
              title: trigger.getAttribute("data-title"),
              content: trigger.getAttribute("data-content"),
              img: trigger.getAttribute("data-img")
            };
            // 다이얼로그에 데이터를 업데이트하는 함수 호출
            updateDialogContent(data);
            dialog.classList.add("active");
          });
        });

        // 닫기 버튼 클릭 시 다이얼로그 비활성화
        closeBtn.addEventListener("click", function () {
          dialog.classList.remove("active");
        });

        // 다이얼로그 영역 외부 클릭 시 닫기
        window.addEventListener("click", function (e) {
          if (e.target === dialog) {
            dialog.classList.remove("active");
          }
        });
      })
      .catch(function (err) {
        console.error("Error loading dialog.html:", err);
      });
  }

  // 다이얼로그 내용 업데이트 함수
  function updateDialogContent(data) {
    var titleEl = document.querySelector("#customDialog #dialogTitle");
    var contentEl = document.querySelector("#customDialog #dialogContent");
    var imageEl = document.querySelector("#customDialog #dialogImage");

    if (titleEl) titleEl.textContent = data.title;
    if (contentEl) contentEl.textContent = data.content;
    if (imageEl) imageEl.src = data.img;
  }
});