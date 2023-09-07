require("dotenv").config();

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

const url = "https://www.strava.com/api/v3/push_subscriptions";

const { client_id, client_secret, callback_url, verify_token } = process.env;

postData(url, {
  client_id,
  client_secret,
  callback_url,
  verify_token,
}).then((data) => {
  console.log(data);
});
