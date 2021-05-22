# Sync whereby status to slack app


## Steps to use this
- Repalce MY_SLACK_TOKEN with your token 
- Repalce MY_FAV_ROMMS with your room links
- npm run build
- load folder `build` in unpack extension under `chrome://extensions/`


## How To generate token 
- https://api.slack.com/apps
- create app
- go to App-Level Tokens
- https://api.slack.com/apps/<APP-ID>/oauth 
- scroll to User Token Scopes
- add `users.profile:write`