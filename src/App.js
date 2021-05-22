/* eslint-disable no-undef */
import "./App.css";

const MY_SLACK_TOKEN =
  "xoxp-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

const MY_FAV_ROOMS = [
  "https://whereby.com/my-room",
  "https://whereby.com/my-room-2",
];

function App() {
  function makeApiCall(paylaod = {}) {
    const { userName } = paylaod;
    return fetch("https://slack.com/api/users.profile.set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + MY_SLACK_TOKEN,
      },
      body: JSON.stringify({
        profile: {
          status_text: userName ? "On whereby- " + userName : "",
          status_emoji: userName ? ":where_by:" : "",
          status_expiration: 0,
        },
      }),
    });
  }

  function onClick(e, index) {
    e.preventDefault();
    const roomUrl = MY_FAV_ROOMS[index];
    const userName = roomUrl.substring(20);

    makeApiCall({ userName })
      .then((r) => r.json())
      .then((result) => {
        window.open(roomUrl, "_blank").focus();
        // Result now contains the response text, do what you want...
      });
  }

  function endCall() {
    makeApiCall()
      .then((r) => r.json())
      .then((result) => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
          const tabId = tabs[0].id;
          chrome.tabs.remove(tabId, () => {});
        });
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Click on room</p>
        <div className="mainSection">
          {MY_FAV_ROOMS.map((_, index) => {
            return (
              <a
                className="App-link"
                href={_}
                target="_blank"
                onClick={(e) => onClick(e, index)}
                rel="noopener noreferrer"
              >
                {_.substring(20)}
              </a>
            );
          })}
        </div>
        <div>
          <button onClick={endCall}>End Call</button>
        </div>
      </header>
    </div>
  );
}

export default App;
