const listCourses = document.querySelector(".lst-courses");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");
const searchBarForm = document.querySelector(".search-bar-form");


/**
 * @description show courses in Html Format
 * @param {JSON} courseJsonData
 * @returns {HTMLElement} Course data in Html Format
 */


function showCourses(item) {
  const { image, title, rating, price, author } = item;
  const stars = [1 , 1 , 1 , 1 , 0];
  return `<div class="card">
        <div class="card-img">
          <a href="#"><img src="${image}" alt="python" /></a>
        </div>
        <div class="card-info">
          <div class="card-title">
            ${title}
          </div>
          <div class="card-auther">${author[0].name}</div>
          <div class="card-rate">
            <ul id="ul-list">
              <i>${rating.toFixed(1)}</i>
              <i class="${
                stars[0] == 1
                  ? "fas fa-star"
                  : stars[0] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
              <i class="${
                stars[1] == 1
                  ? "fas fa-star"
                  : stars[1] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
              <i class="${
                stars[2] == 1
                  ? "fas fa-star"
                  : stars[2] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
              <i class="${
                stars[3] == 1
                  ? "fas fa-star"
                  : stars[3] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
              <i class="${
                stars[4] == 1
                  ? "fas fa-star"
                  : stars[4] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
            </ul>
          </div>
          <div class="card-price">E£${price}</div>
        </div>
        </div>`;
}


/**
 * @description fetch courses data from server in json format
 * @param {url} url
 * @returns {Promise} Course data in JSON format
 */


async function fetchCourses(url) {
  let to_return = await fetch(url);
  to_return = await to_return.json();
  return to_return;
}


async function getHeader(Header ,btn_name) {
  console.log("first");
  let courses = "";

  const DATA = await fetchCourses("https://api.npoint.io/c5b769d0f483b77cc8f9");

  console.log(DATA);
  
  let countCourses = 0;
  DATA.header = Header;
  for (let card of DATA.courses) {
    console.log(card);

    courses += showCourses(card);

    countCourses++;

    if(countCourses >= 5)
        break;
  }
  console.log(countCourses);


  const courseCardElement = `<div class="show-courses">
  <div class="hder-of-courses-section">
    <div class="title">${DATA.header}</div>
    <div class="details">${DATA.description}</div>
  </div>
  <button type="button" class="btn-Explore">Explore ${btn_name}</button>
  <div class="lst-courses">${courses}</div>
</div>`;


  document.querySelectorAll("show-courses").innerHTML = courseCardElement;

}


getHeader("courses" , "python");


/**
 * @description handle search click event
 */


searchBarForm.addEventListener("submit",  (event) => {

    console.log("second\n");

    event.preventDefault();
    
    const content = document.querySelectorAll("#myTabContent .active .show-courses .lst-courses .card");

    console.log(content);

    for(let i = 0;i < content.length;i++) {
      
      const title = content[i].querySelector(".card-info .card-title").textContent.trim();
      
      console.log(title,searchInput.value);

      if(title != searchInput.value && searchInput.value !== ""){
        content[i].classList.add("d-none");
      } else {
        content[i].classList.remove("d-none");
      }

    }

});