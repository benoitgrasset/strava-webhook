# Strava webhook

## Documentation

https://developers.strava.com/docs/webhooks/

https://developers.strava.com/docs/webhookexample/

https://www.strava.com/settings/api

## Example

https://medium.com/@eric.l.m.thomas/setting-up-strava-webhooks-e8b825329dc7

## ngrok config

https://dashboard.ngrok.com/get-started/setup

## Installation

- install ngrock, nodejs, express, body-parser
- ngrok config add-authtoken 2V7DN9OijtTdRwGEyRsRH4jxTma_3GR4mKUYQTdPTEU5P4uss
- `callback_url` is obtained launching `ngrock http 80`, `Forwarding`
- GET /event -> callback URL is https://07590f65.ngrok.io/event (`Forwarding` ngrok)
- GET /webhook -> callback URL is https://07590f65.ngrok.io/webhook

## How to launch

- `sudo node index.js` / `node request.js`
- `ngrok http 80`

## Principe

- Une fois qu'une nouvelle activite est uploadée sur strava -> on recoit un event via un webhook auquel on est inscrit
- On modifie cette actviité pour y ajouter une description
- `PUT /activities/{id} { body: JSON.stringify({ description: 'test' })}`

## Event Data

| eventData       |                              |
| --------------- | ---------------------------- |
| object_type     | "activity" / "athlete"       |
| object_id       | number                       |
| aspect_type     | "create", "update", "delete" |
| updates         | hash                         |
| owner_id        | number                       |
| subscription_id | number                       |
| event_time      | number                       |

## TODO

- [ ] get authorization_code && access_token (scope: "activity:write")
