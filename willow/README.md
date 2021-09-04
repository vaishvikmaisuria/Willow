## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🏁 Getting Started <a name = "getting_started"></a>](#-getting-started-)
- [Folder Structure <a name = "folder_structure"></a>](#folder-structure-)
- [Built Using <a name = "built_using"></a>](#built-using-)
- [DevTools <a name = "dev_tools"></a>](#devtools-)
  - [Prerequisites <a name = "prerequisites"></a>](#prerequisites-)
  - [Installation <a name = "installation"></a>](#installation-)
- [🎈 Usage <a name="usage"></a>](#-usage-)
- [🌲Environment Variables<a name = "environment_variables"></a>](#environment-variables)
- [Current Issues <a name = "issues"></a>](#current-issues-)
- [Authors <a name = "authors"></a>](#authors-)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

## Folder Structure <a name = "folder_structure"></a>

- components/
  - ExampleComponent/
    - index.js
    - ExampleComponent.test.js
- pages/
- network/
- requests/
  - tasks/
  - users/
- helpers/
- testing/

Each component/page/request is contained within a folder accompanied with a test file.
Components/pages connect to the backend by calling requests, with either useAsync or within a useEffect.

## Built Using <a name = "built_using"></a>

- React!
- Chakra-UI
- Material-UI
- Axios
- Formik
- Yup
- React-Testing-Library

## DevTools <a name = "dev_tools"></a>

Here are some extensions that you may find useful:

- React Developer Tools (viewing the component tree)
-
-

### Prerequisites <a name = "prerequisites"></a>

What things you need to install and run the application

- Docker
- Node.js runtime

### Installation <a name = "installation"></a>

A step by step series of examples that tell you how to get a development environment running.

1. Check out the latest code on the main branch
2. Create an environment file in the root directory
   - See [here](#environment_variables) for more details about what to put in the .env file
3. From the root directory, run make build and then make run.

## 🎈 Usage <a name="usage"></a>

- Navigate to localhost:3000 on your favorite browser

## 🌲Environment Variables<a name = "environment_variables"></a>

Your environment file should be set up like the follow below: (or look at .env example)
​```
ROOT_USERNAME=root
ROOT_PWD=#########

API_USERNAME=api
API_PWD=#########
​```

## Current Issues <a name = "issues"></a>

1. Security
2. User authenitcation
3. Price History UI

## Authors <a name = "authors"></a>

- Vaishvik Maisuria
