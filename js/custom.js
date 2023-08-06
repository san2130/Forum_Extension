var apiData;
var call = 0;

async function callAPI() {
  const response = await fetch("https://www.placement.iitbhu.ac.in/forum/c/notice-board/2023-24/");
  const data = await response.text();
  return {
    data,
  };
}

function display() {
  if(call>0)
  {
      var inject = document.getElementById('posts');
      inject.innerHTML = "<div class='lds-dual-ring'></div>";
      inject.classList.add("loading");
  }
  callAPI().then((data) => {
      apiData = data.data;
      var inject = document.getElementById('posts');
      inject.classList.remove("loading");
      inject.innerHTML = apiData;
    });
  call+=1;
}

display();
setInterval(display, 60*1000);