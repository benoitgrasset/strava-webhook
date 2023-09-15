import dotenv from "dotenv";

dotenv.config();

async function postData(url = "", credentials = {}) {
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
    body: JSON.stringify(credentials),
  });
  return response.json();
}

const pushSubsriptionsUrl = "https://www.strava.com/api/v3/push_subscriptions";

const { client_id, client_secret, callback_url, verify_token } = process.env;

postData(pushSubsriptionsUrl, {
  client_id,
  client_secret,
  callback_url,
  verify_token,
})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error.message);
  });
