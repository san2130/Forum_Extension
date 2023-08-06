var apiData;

async function callAPI() {
  const response = await fetch("https://www.placement.iitbhu.ac.in/forum/c/notice-board/2023-24/");
  const data = await response.text();
  return {
    data,
  };
}

function display() {
  callAPI().then((data) => {
      apiData = data.data;
      const inject = document.getElementById('posts');
      inject.innerHTML = apiData;
    });
}

display();
setInterval(display, 60*1000);