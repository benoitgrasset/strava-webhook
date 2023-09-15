# Strava webhook

## Documentation

https://developers.strava.com/docs/webhooks/

https://developers.strava.com/docs/webhookexample/

https://www.strava.com/settings/api

## Example

https://medium.com/@eric.l.m.thomas/setting-up-strava-webhooks-e8b825329dc7

https://github.com/amn41/doarun/blob/master/functions/strava-hook.js

## Autres solutions

https://mywindsock.com/

https://www.activityfix.com/

https://strautomator.com/home

## localtunnel config

## Installation

- install localtunnel (`npm install -g localtunnel`), nodejs, express, body-parser
- GET /event -> callback URL is https://url.io/event
- GET /webhook -> callback URL is https://strava-webhook.loca.lt/webhook, Use the same callback_url, appended with `/webhook`

## How to launch

- `yarn start` ou
- `sudo node index.js` et
- `lt --port 8000`
  Finally, make a Postman or cURL request to subscribe to a webhook:
- `node request.js`

## Principe

- Une fois qu'une nouvelle activite est uploadée sur strava -> on recoit un event via un webhook auquel on est inscrit
- On modifie cette activité pour y ajouter une description
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

- [ ] deploy app and launch webhook subscription
- [ ] get authorization_code && access_token (scope: "activity:write")
- [ ] get callback_url
- [ ] get the new description (volume total / semaine / temperature)

## Deployment

https://dashboard.render.com/web/srv-ck0scgj6fquc73f4aeag/logs
