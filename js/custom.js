var apiData;
var call = 0;

async function callAPI() {
  const response = await fetch("https://www.placement.iitbhu.ac.in/forum/c/notice-board/2023-24/");
  const data = await response.text();
  return {
    data,
  };
}

async function markReadAPI() {
  await fetch("https://www.placement.iitbhu.ac.in/forum/mark_all_as_read/");
}

function setText(badge) {
  chrome.action.setBadgeText({
      text: badge,
    }, () => {
      console.log('Finished setting badge text')
  });
}

function markall() {
  markReadAPI();
  setText("");
  console.log("Marked all as read");
}

function display() {
  if(call>0)
  {
      var inject = document.getElementById('posts');
      var read = document.getElementById('read');
      read.classList.remove("loaded");
      read.classList.add("loading2");
      inject.innerHTML = "<div class='lds-dual-ring'></div>";
      inject.classList.add("loading");
  }
  callAPI().then((data) => {
      document.getElementById("mark").addEventListener("click", markall);
      apiData = data.data;
      var flag = apiData.includes("topic-unread");
      if(!flag)
      {
          setText("");
      }
      var inject = document.getElementById('posts');
      var read = document.getElementById('read');
      read.classList.remove("loading2");
      read.classList.add("loaded");
      inject.classList.remove("loading");
      inject.innerHTML = apiData;
    });
  call+=1;
}

display();
setInterval(display, 60*1000);