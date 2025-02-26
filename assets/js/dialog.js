document.addEventListener("DOMContentLoaded", function () {
  // JSON 데이터 파일 불러오기
  fetch('data/projects.json')
    .then(response => response.json())
    .then(itemsData => {
      // id가 itemsContainer인 모든 요소들을 선택합니다.
      const containers = document.querySelectorAll('#itemsContainer');
      const numContainers = containers.length;
      
      // JSON 데이터의 각 항목을 라운드 로빈 방식으로 분배하며 DOM에 추가합니다.
      itemsData.forEach((item, index) => {
        const container = containers[index % numContainers];
        let element;
        
        // 마지막 아이템은 링크 형태로 생성 (다이얼로그 없이 별도 처리)
        if (index === itemsData.length - 1) {
          element = document.createElement('a');
          element.href = item.link ? item.link : "/files/travin.pdf";
          element.classList.add('item-link');
          element.target = "_blank";
          element.rel = "noopener noreferrer";
          
          const article = document.createElement('article');
          article.classList.add('items');
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
          // data-img-list를 JSON 문자열 형태로 저장 (나중에 JSON.parse()로 배열로 변환)
          element.setAttribute('data-img-list', JSON.stringify(item.img_list));
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
      });
      
      // 항목들이 모두 생성된 후, 다이얼로그 설정을 한 번 호출합니다.
      setupDialog();
    })
    .catch(err => console.error("Error loading items.json:", err));

  // 다이얼로그 설정 함수: dialog.html을 불러오고, 이벤트 리스너를 등록합니다.
  function setupDialog() {
    fetch('pages/dialog.html')
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.text();
      })
      .then(htmlString => {
        // DOMParser를 사용해 HTML 문자열을 파싱합니다.
        var parser = new DOMParser();
        var doc = parser.parseFromString(htmlString, 'text/html');
        var dialogElement = doc.getElementById('customDialog');
        if (!dialogElement) {
          console.error("dialog.html에 #customDialog 요소가 없습니다.");
          return;
        }
        // 다이얼로그 요소를 index.html의 dialogContainer에 삽입합니다.
        document.getElementById('dialogContainer').appendChild(dialogElement);

        // 다이얼로그 DOM 요소를 선택합니다.
        const dialog = document.getElementById("customDialog");
        const closeBtn = dialog.querySelector(".close");

        // 모든 항목(.item)에 대해 클릭 이벤트 등록 (다이얼로그 띄우기)
        const triggers = document.querySelectorAll(".item");
        triggers.forEach(trigger => {
          trigger.addEventListener("click", function () {
            const data = {
              title: trigger.getAttribute("data-title"),
              content: trigger.getAttribute("data-content"),
              img: trigger.getAttribute("data-img"),
              // data-img-list를 JSON 문자열에서 배열로 변환합니다.
              imgList: JSON.parse(trigger.getAttribute("data-img-list"))
            };
            updateDialogContent(data);
            dialog.classList.add("active");
            document.body.style.overflow = "hidden";
            const dialogBody = document.getElementById("dialogBody");
            console.log(dialogBody.scrollHeight, dialogBody.clientHeight);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                dialogBody.scrollTop = 0;
              });
            });
          });
        });

        // 닫기 버튼 클릭 시 다이얼로그 비활성화
        closeBtn.addEventListener("click", function () {
          dialog.classList.remove("active");
          document.body.style.overflow = "auto";
        });

        // 다이얼로그 외부 클릭 시 닫기 처리
        window.addEventListener("click", function (e) {
          if (e.target === dialog) {
            dialog.classList.remove("active");
            document.body.style.overflow = "auto";
          }
        });
      })
      .catch(err => console.error("Error loading dialog.html:", err));
  }

  // --- 슬라이더 관련 전역 변수 ---
  let currentSlideIndex = 0;  // 현재 표시 중인 이미지 인덱스
  let totalSlides = 0;        // 총 이미지 수

  // 슬라이더의 위치와 화살표 버튼 상태를 업데이트하는 함수
  function updateSliderPosition() {
    const imageListEl = document.getElementById("dialogImageList");
    const containerWidth = document.getElementById("dialogImageContainer").offsetWidth;
    // 현재 슬라이드 인덱스에 따라 이미지 리스트를 좌우로 이동시킵니다.
    imageListEl.style.transform = `translateX(-${currentSlideIndex * containerWidth}px)`;
    updateSliderControls();
  }

  // 화살표 버튼의 보임/숨김을 업데이트하는 함수
  function updateSliderControls() {
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");

    if (totalSlides <= 1) {
      leftArrow.classList.add("hidden");
      rightArrow.classList.add("hidden");
      return;
    }
    if (currentSlideIndex === 0) {
      leftArrow.classList.add("hidden");
      rightArrow.classList.remove("hidden");
    } else if (currentSlideIndex === totalSlides - 1) {
      rightArrow.classList.add("hidden");
      leftArrow.classList.remove("hidden");
    } else {
      leftArrow.classList.remove("hidden");
      rightArrow.classList.remove("hidden");
    }
  }

  // 다이얼로그 내용 업데이트 함수
  function updateDialogContent(data) {
    // 다이얼로그 내의 제목, 내용, 그리고 이미지 슬라이더 컨테이너를 선택합니다.
    const titleEl = document.querySelector("#customDialog #title");
    const contentEl = document.querySelector("#customDialog #background");
    const imageListEl = document.querySelector("#customDialog #dialogImageList");

    if (titleEl) titleEl.textContent = data.title;
    if (contentEl) contentEl.textContent = data.content;

    // 이미지 슬라이더 컨테이너를 초기화합니다.
    imageListEl.innerHTML = '';

    // data.imgList가 배열이면, 슬라이더를 초기화합니다.
    if (data.imgList && Array.isArray(data.imgList) && data.imgList.length > 0) {
      currentSlideIndex = 0;         // 첫 번째 슬라이드부터 시작
      totalSlides = data.imgList.length;  // 총 이미지 수 설정

      // 각 이미지 URL마다 <img> 태그를 생성하여 imageListEl에 추가합니다.
      data.imgList.forEach(imgUrl => {
        const imgTag = document.createElement('img');
        imgTag.src = imgUrl;
        imgTag.alt = data.title;
        imageListEl.appendChild(imgTag);
      });
    } else {
      console.error("imgList is empty or not provided.");
    }

    // 슬라이더의 초기 위치와 화살표 상태를 업데이트합니다.
    updateSliderPosition();

    // 좌우 화살표 버튼의 이벤트 리스너를 설정합니다.
    // (이벤트 리스너 중복 등록을 피하기 위해, 기존 버튼을 교체합니다.)
    const leftArrowOld = document.getElementById("leftArrow");
    const rightArrowOld = document.getElementById("rightArrow");
    
    // 새 노드로 교체하여 이전 이벤트 리스너들을 제거합니다.
    const leftArrow = leftArrowOld.cloneNode(true);
    const rightArrow = rightArrowOld.cloneNode(true);
    leftArrowOld.parentNode.replaceChild(leftArrow, leftArrowOld);
    rightArrowOld.parentNode.replaceChild(rightArrow, rightArrowOld);
    
    // 좌측 화살표 클릭 이벤트: 이전 슬라이드로 이동
    leftArrow.addEventListener("click", function () {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSliderPosition();
      }
    });
    // 우측 화살표 클릭 이벤트: 다음 슬라이드로 이동
    rightArrow.addEventListener("click", function () {
      if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateSliderPosition();
      }
    });
  }
});
