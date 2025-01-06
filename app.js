let input = document.querySelector(".search-box input");
let btn = document.querySelector(".btn button");
let images = document.querySelector(".images");
let load = document.querySelector("#load");
let loader = document.querySelector(".loader");   // loader wale div ko select kr rha hu mai html file se

const access = "hbJ2Rr4jt-jnVaDC-WfKy7y4B4Xsb3ckfSVFTBkuOmc";
let page = 1;
let keyword = "";

function download(imgurl) {
  fetch(imgurl)
    .then((res) => res.blob())
    .then((file) => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("failed download"));
}

async function getResponse() {
  loader.style.display = "block";  /*Jaise hi fetch krne wala function chlega i want to see a loader on the screen that why i am changing it from display = none to display = block */

  keyword = input.value;
  let url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${access}&per_page=15 `;

  //study about the try and catch block ki kya kaam krta hai ye and kyu use krte hai ,, easy hai soo chilll hoke ye pdh lena
  try {
    let response = await fetch(url);
    let data = await response.json();
    let results = data.results;
    console.log(results);
    if (page == 1) {
      images.innerHTML = "";
    }
    load.style.display = "block";
    results.map((result) => {
      let li = document.createElement("li");
      li.classList.add("image");
      let html = `<img src="${result.preview_photos[0].urls.small}" alt="">
                <div class="details">
                    <div class="user">
                        <img src="camera.svg" alt="img">
                        <span>${result.title}</span>
                    </div>
                    <div class="download" onclick=download('${result.preview_photos[0].urls.small}')>
                        <img src="download.svg" alt="img">
                    </div>
                </div>`;
      li.innerHTML = html;
      images.appendChild(li);
    });
  } catch (error) {
    alert("Failed to fetch the data from the API");  // ye jo error hai jo hume receive hoga agr data fetch nhi ho paya hai toh
  } finally {
    loader.style.display = "none";   //jaise hi data mil gya waise hi frse display = none kr denge so that ki loader show na ho screen pe
  }
}

input.addEventListener("keyup", (e) => {
  page++;

  if (e.key == "Enter") {
    getResponse();
  }
});

btn.addEventListener("click", () => {
  page = 1;
  getResponse();
});

load.addEventListener("click", () => {
  page++;
  getResponse();
});
