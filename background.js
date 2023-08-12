var apiData;
var call = 0;

async function callAPI() {
  const response = await fetch("https://www.placement.iitbhu.ac.in/forum/c/notice-board/2023-24/");
  const data = await response.text();
  return {
    data,
  };
}

function setText(badge) {
  chrome.action.setBadgeText({
      text: badge,
    }, () => {
      console.log('Finished setting badge text')
  });
}

function display() {
  callAPI().then((data) => {
      apiData = data.data;
      var flag = apiData.includes("topic-unread");
      setText("");
      if(flag)
      {
          setText("NEW");
      }
    });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed");
  display();
});

chrome.runtime.onStartup.addListener( () => {
  console.log("On");
  display();
});

chrome.alarms.create({
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  display();
});
