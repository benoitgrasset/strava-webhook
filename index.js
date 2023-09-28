"use strict";

import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import { addDescription } from "./updateActivity.js";

// creates express http server
const app = express().use(bodyParser.json());

app.use(helmet());

// Sets server port and logs message on success
app.listen(process.env.PORT || 80, () => console.log("webhook is listening"));

// Creates the endpoint for our webhook
app.post("/webhook", (req, res) => {
  console.log("webhook event received!", req.query, req.body);
  res.status(200).send("EVENT_RECEIVED");
});

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  // Your verify token. Should be a random string.
  const { verify_token } = process.env;
  // Parses the query params
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Verifies that the mode and token sent are valid
    if (mode === "subscribe" && token === verify_token) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.json({ "hub.challenge": challenge });

      const eventData = req.body;
      if (
        eventData.object_type === "activity" &&
        eventData.aspect_type === "create"
      ) {
        const activityId = eventData.object_id;
        console.log("Activity ID: ", activityId);
        if (activityId !== undefined) {
          const description = "new activity";
          addDescription(activityId, description).then((data) => {
            console.log(data);
          });
        }
      }
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    console.error("token not found");
  }
});
