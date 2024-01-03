# Documentation
https://quasar.dev/components

# SpeedGrocerQuasar (speedgrocerquasar)

This is a grocery app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

# iPhone App Dev/Build Documentation
https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/build-commands

#### Prerequisites 
```bash 
npm i @capactor/core (unconfirmed)
npm i -D @capactor/cli
``` 

#### Production Build
```bash
npm releaseios
```
or 
```bash 
quasar build -m capacitor -T ios
```

#### Dev Build
```bash
npm devios
``` 
or
```bash
quasar dev -m capacitor -T ios
```

# How Tos
#### Rename iOS App
1. In xCode, double click on Target>AppName
2. Go to Pods>Podfile change target to AppName
3. Go to ```capacitor.config.json``` and change ```"scheme": "AppName"```
4. In the quasar project do ```npm releaseios```