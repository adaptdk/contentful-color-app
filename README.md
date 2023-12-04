# Adapt Essentials: Colors
This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Bug reports
If you've found any issues, please open an issue here: [https://github.com/adaptdk/adapt-toolkit-color-picker/issues](https://github.com/adaptdk/adapt-toolkit-color-picker/issues)

## Feature requests
If you think the application is missing any features, please open an issue here: [https://github.com/adaptdk/adapt-toolkit-color-picker/issues](https://github.com/adaptdk/adapt-toolkit-color-picker/issues)

## Table of Contents
1. [Examples](#examples)
    1. [Configure via GUI](#configure-via-gui)
    2. [Configure via JSON](#configure-via-json)
    3. [Defined colors in a content field](#access-all-defined-colors-in-a-content-field)
    4. [Validated colors in a content field](#access-only-validated-colors-in-a-content-field)
2. [How to use the Application](#how-to-use)
    1. [After installation, how do I configure the application?](#after-installation-how-do-i-configure-the-application)
        1. [Adding a color bar to a group](#adding-a-color-bar-to-a-group)
        2. [Editing a color bar](#editing-a-color-bar)
        3. [Removing a color bar](#removing-a-color-bar)
        4. [Editing a color group](#editing-a-color-group)
        5. [JSON Editor](#json-editor)
    2. [How to configure the app on a field?](#how-to-configure-the-app-on-a-field)
    3. [Validating colors on a field](#validating-colors-on-a-field)
    4. [Querying the field](#querying-the-field)
4. [Developing](#developing)
5. [Available scripts](#available-scripts)
6. [Libraries to use](#libraries-to-use)
7. [Contentful Management SDK](#using-the-contentful-management-sdk)
8. [Learn more](#learn-more)

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
### After installation, how do I configure the application?
Once the application is successfully installed, you will be directed to the configuration screen. There you can find basic instructions on how to start building your design system.
In the Editing Options, there will be a preconfigured Default group with a single color inside of it.

#### Adding a color bar to a group
Clicking the **+ Add Color** button will create a new color in the group
![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/737e5297-8c34-4ed0-bee2-79aaf8e6a2ff)

#### Editing a color bar
To change the label of the color, simply type it in the **LABEL** field of a color.

To change a color, you have two options:
1. Edit the `#HEX` value directly in the input field labeled as **HEX**;
2. Click on the color box to open a color picker;

![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/f949ea15-4f66-4a54-a93e-3fa46e0079ae)

#### Removing a color bar
To remove a color bar, simply click the red trash bin icon.

⚠️ **Warning:** This will remove the color without confirmation!
![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/04aa6e73-1eff-4538-b9bc-3dc09bd7955c)

#### Editing a color group
To edit settings of a group, simply click the pencil icon in the **GROUP SETTINGS** "box"
![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/af99848d-415c-4f95-98d4-f1e6092f63f4)

#### JSON Editor
More advanced users can instead use the JSON Editor to configure their color groups and colors.

Each item's ID is generated via [uuidv4](https://www.npmjs.com/package/uuidv4).

ℹ️ **Pro tip:** Instead of generating IDs yourself, create multiple default placeholder items - they will already come with an ID!
![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/051b5251-ea0e-4b6c-9efd-79f980f15065)

### How to configure the app on a field?
After you're done configuring your color design system, using it is extremely simple!
1. Create a new **Text** field in your content type

![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/13cf47f5-037e-4037-9f26-d7d8d6b37dea)

2. In the newly created field's settings, scroll down to the **Appearance** section and select **Adapt Essentials: Colors**

![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/64589d0e-e798-40fa-8e60-01c38b06a28e)

3. After you save your content type, you're done and ready to use the field!

![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/1c7f82e1-63df-4280-a75a-9c4f3a73b291)

### Validating colors on a field
1. Go to your field's settings, scroll down to **Validation** and select the **Accept only specified values** checkbox. Simply input the **LABEL** value of a color and hit enter. In our example, we have a color of `"hexColor": "#0f6ad2"` and `"label": "blue-500"`, so we're going to input `blue-500` in to the validation field.

![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/fb45f946-5b2b-48ae-9585-29f968772783)

2. After you save your content type, you're done and ready to use the validated field!

![image](https://github.com/adaptdk/adapt-toolkit-color-picker/assets/69549795/e51908b9-0bcb-457c-9719-6fe1c20457c6)

### Querying the field
Querying the field is the same as querying a basic text field. So if your field is called `color`, that's what the API response will respond to.

The returned value is the **LABEL**, so in our example of `"hexColor": "#0f6ad2"` and `"label": "blue-500"`, the returned value would be `color: 'blue-500'`


## Developing

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

[Privacy Policy](https://adaptagency.com/privacy-policy)
