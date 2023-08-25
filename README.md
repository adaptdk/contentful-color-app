# Adaptive Colors
This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Table of Contents
1. [Examples](#examples)
    1. [Configure via GUI](#configure-via-gui)
    2. [Configure via JSON](#configure-via-json)
    3. [Defined colors in a content field](#access-all-defined-colors-in-a-content-field)
    4. [Validated colors in a content field](#access-only-validated-colors-in-a-content-field)
2. [How to use](#how-to-use)
3. [Available scripts](#available-scripts)
4. [Libraries to use](#libraries-to-use)
5. [Contentful Management SDK](#using-the-contentful-management-sdk)
6. [Learn more](#learn-more)

## Examples
### Configure via GUI
<details>
  <summary>Image 1</summary>
  
![image](https://github.com/adaptdk/contentful-color-app/assets/69549795/6af534ad-1929-4083-bdc4-aaa733e1f460)
</details>
<details>
  <summary>Image 2</summary>
  
![image](https://github.com/adaptdk/contentful-color-app/assets/69549795/5a51ea27-9831-4cf3-a84a-e7f8b130ef71)
</details>

### Configure via JSON
<details>
  <summary>Image</summary>

  ![image](https://github.com/adaptdk/contentful-color-app/assets/69549795/4383de08-02e8-4053-8933-4517ad506cd3)
</details>

### Access all defined colors in a content field
<details>
  <summary>Image</summary>

  ![image](https://github.com/adaptdk/contentful-color-app/assets/69549795/d298663f-6001-4840-acd5-7ea846a2a45a)
</details>

### Access only validated colors in a content field
<details>
  <summary>Image 1</summary>

  ![image](https://github.com/adaptdk/contentful-color-app/assets/69549795/ca8d64ce-4505-4247-85b1-a33d03b0bf48)
</details>
<details>
  <summary>Image 2</summary>

  ![image](https://github.com/adaptdk/contentful-color-app/assets/69549795/5406a1fb-861e-4b91-88b8-8ecf50571d6a)
</details>

## How to use

Execute create-contentful-app with npm, npx or yarn to bootstrap the example:

```bash
# npx
npx create-contentful-app --example vite-react

# npm
npm init contentful-app --example vite-react

# Yarn
yarn create contentful-app --example vite-react
```

## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

#### `npm run upload`

Uploads the `dist` folder to Contentful and creates a bundle that is automatically activated.
The command guides you through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful) for more information about the deployment process.

#### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is  
that with this command all required arguments are read from the environment variables, for example when you add
the upload command to your CI pipeline.

For this command to work, the following environment variables must be set:

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)

## Libraries to use

To make your app look and feel like Contentful use the following libraries:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – Contentful's field editor React components

## Using the `contentful-management` SDK

In the default create contentful app output, a contentful management client is
passed into each location. This can be used to interact with Contentful's
management API. For example

```js
// Use the client
cma.locale.getMany({}).then((locales) => console.log(locales));
```

Visit the [`contentful-management` documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#using-the-contentful-management-library)
to find out more.

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.
