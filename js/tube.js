let sortingData;
const allCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categories = data.data;
  categorieName(categories);
};

const categorieName = (data) => {
  const tab = document.getElementById("all-category");
  data.forEach((element) => {
    const tabList = document.createElement("div");
    tabList.innerHTML = `<a class="tab bg-[#d3d3d3] hover:bg-[#FF1F3D] text-[#252525] rounded  hover:text-white font-semibold" id="${element?.category_id}" onclick="showdata('${element?.category_id}');">${element?.category}</a>`;
    tab.appendChild(tabList);
  });
};

const showdata = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const allData = data.data;
  showDataDetails(allData);
  sortingData = allData;
};
function shorting() {
  const sortByView = sortingData.sort((a, b) => {
    const fview = a.others.views.split("K");
    const fviewnum = parseFloat(fview[0]);
    const sview = b.others.views.split("K");
    const sviewnum = parseFloat(sview[0]);
    return sviewnum - fviewnum;
  });

  showDataDetails(sortByView);
}

function showDataDetails(singledata) {
  const cardontainer = document.getElementById("card-container");
  cardontainer.innerHTML = "";

  // nodata message
  const nodata = document.getElementById("no-data");
  if (singledata.length > 0) {
    nodata.classList.add("hidden");
  } else {
    nodata.classList.remove("hidden");
  }
  // nodata message end here

  singledata.forEach((element) => {
    const min = Math.floor(element?.others?.posted_date / 60);
    const hrs = Math.floor(min / 60);
    const leftmin = min % 60;
    const card = document.createElement("div");
    card.classList = "card mb-0 md:mb-4 lg:mb-8";
    card.innerHTML = `
          <div class="relative ">
            <img src="${
              element?.thumbnail
            }" class="w-full h-[200px]  rounded-lg" alt="Shoes" />
            <p class="text-xs text-white bg-[#171717] rounded px-2 py-1 absolute bottom-2 right-2 ${
              element.others.posted_date ? "block" : "hidden"
            }">${hrs}hrs  ${leftmin}min ago</p>
          </div>
          <div class="flex justify-between gap-4 pt-5">
            <div class="w-11">
              <img src="${
                element?.authors[0]?.profile_picture
              }" class=" w-11 h-11 rounded-full object-cover" alt="">
            </div>
            <div class="flex-1">
              <h2 class=" text-[#171717] font-bold text-2xl">${
                element?.title
              }</h2>
              <p class="text-[#9a9a9a] mt-1 text-lg flex items-center">${
                element?.authors[0]?.profile_name
              } <span class="ms-2">${
      element.authors[0].verified
        ? `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon><polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
              </svg>`
        : ""
    }</span></p>
              <p class="text-[#9a9a9a] text-base">${
                element?.others?.views
              } views</p>
              
            </div>
          </div>
        `;

    cardontainer.appendChild(card);
  });
}

allCategory();
showdata("1000");
