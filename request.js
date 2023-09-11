require("dotenv").config();

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
}).then((data) => {
  console.log(data);
});

// URLs
const baseUrl = "/";
const redirect_uri = baseUrl + "redirect";

// GET
const scope = "read,profile:read_all,activity:read,activity:read_all";
const oauthURL = `https://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=auto&scope=${scope}`;

const authorization_code = "";

// get access_token
const postCallGetAccesToken = async (authorization_code) => {
  const url = `https://www.strava.com/api/v3/oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${authorization_code}&grant_type=authorization_code`;
  const response = await fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .catch((error) => {
      Sentry.captureException(error);
      console.error(error.message);
    });

  return response.access_token;
};

/**
 * - get access_token & authorization_code
 * - get activityId, sent by webhook
 */

const access_token = "";

addDescription = async (activityId, description = "new activity") => {
  const url = `https://www.strava.com/api/v3/activities/${activityId}`;
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(description),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return response;
};
