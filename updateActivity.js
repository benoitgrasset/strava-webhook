import fetch from "cross-fetch";
import dotenv from "dotenv";

dotenv.config();

const { client_id, client_secret, refresh_token } = process.env;

// URLs
const baseUrl = "/";
const redirect_uri = baseUrl + "redirect";

// GET
const scope =
  "read,profile:read_all,activity:read,activity:read_all,activity:write";
const oauthURL = `https://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=auto&scope=${scope}`;

// get access_token
const postCallGetAccessToken = async (authorization_code) => {
  const url = `https://www.strava.com/api/v3/oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${authorization_code}&grant_type=authorization_code`;
  const response = await fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error.message);
    });

  return response.access_token;
};

// get refresh_token
const postCallGetRefreshToken = async () => {
  const url = `https://www.strava.com/api/v3/oauth/token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}&grant_type=refresh_token`;
  const response = await fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error.message);
    });

  return response.access_token;
};

// get recent (last 4 weeks) stast and the year-to-date stats
const getGlobalStats = async (client_id, access_token) => {
  const url = `https://www.strava.com/api/v3/athletes/${client_id}/stats`;
  const globalStats = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error.message);
    });

  return globalStats;
};

/**
 * - get authorization_code && access_token (scope: "activity:write")
 */

export const addDescription = async (
  activityId,
  description = "new activity"
) => {
  const url = `https://www.strava.com/api/v3/activities/${activityId}`;
  const access_token = await postCallGetRefreshToken();
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
    body: JSON.stringify({ description }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return response;
};

// for example
const activityId = "9823566546";
const description = "new activity";

addDescription(activityId, description).then((data) => console.log(data));
