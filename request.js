import dotenv from "dotenv";

dotenv.config();

const pushSubsriptionsUrl = "https://www.strava.com/api/v3/push_subscriptions";

const { client_id, client_secret, callback_url, verify_token } = process.env;

const createStravaWebhook = async () => {
  const url = pushSubsriptionsUrl;
  const credentials = {
    client_id,
    client_secret,
    callback_url,
    verify_token,
  };
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
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error.message);
    });

  return response;
};

const getStravaWebhookDetails = async () => {
  const url = `${pushSubsriptionsUrl}?client_id=${client_id}&client_secret=${client_secret}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error.message);
    });

  return response;
};

const deleteStravaWebhook = async () => {
  const details = await getStravaWebhookDetails();

  for (let subscription of details) {
    const url = `${pushSubsriptionsUrl}/${subscription.id}?client_id=${client_id}&client_secret=${client_secret}&id=${subscription.id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }
};

// **************************************************************
// **************************************************************

// getStravaWebhookDetails().then((data) => {
//   console.log(data);
// });

// deleteStravaWebhook().then((data) => {
//   console.log(data);
// });

createStravaWebhook().then((data) => {
  console.log(data);
});
