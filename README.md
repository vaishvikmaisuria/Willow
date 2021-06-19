# StockPortfolio
Simple Stocks and Dividend Tracker 

## 📝 Table of Contents
- [📝 Table of Contents](#-table-of-contents)
- [🏁 Getting Started <a name = "getting_started"></a>](#-getting-started-)
- [Folder Structure <a name = "folder_structure"></a>](#folder-structure-)
- [Prerequisites <a name = "prerequisites"></a>](#prerequisites-)
- [Installation <a name = "installation"></a>](#installation-)
- [🎈 Usage <a name="usage"></a>](#-usage-)
- [⚡ UI <a name="ui"></a>](#-ui-)
- [Current Issues <a name = "issues"></a>](#current-issues-)
- [Authors <a name = "authors"></a>](#authors-)
- [Credits/Citation <a name = "credit"></a>](#credit-)


## 🏁 Getting Started <a name = "getting_started"></a>
This project will help a individual manage all of their investmnents and help them make educated guesses to predict the 
next best stock to increase their dividend output.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

## Folder Structure <a name = "folder_structure"></a>
- k8s/
- willow/
    - nginx/
- willow_api/

The 2 main microservices of the project are the Frontend which is the willow folder and is made with react. The second microservice is the backend made with Golang and is called willow_api. The k8s folder contains all the Dev Ops configuration related to kubernates 

## Prerequisites <a name = "prerequisites"></a>
What things you need to install and run the application
- docker -> `https://docs.docker.com/get-docker/`
- kubectl -> `https://kubernetes.io/docs/tasks/tools/`
- minikube -> `https://minikube.sigs.k8s.io/docs/start/`
- code editor -> `https://code.visualstudio.com/`

## 🎈 Usage <a name="usage"></a>
### run the frontend and backend with docker
#### on Linux 
> make build
#### on Windows
> docker-compose up --build
- Navigate to localhost:3000 on your favorite browser

### Docker images
#### Frontend -> willow 
`vaishvik7568/willow`
#### Backend -> willow_api 
`vaishvik7568/willowapi`

### Run the Application with Kubernetes 
see documentation [this README.md](k8s/README.md)  

## ⚡ UI <a name="ui"></a>
### Images coming soon 
### Starting dashboard
![screenshot1](/imgs/screenshot-1.png)
### Main page to add stocks 
![screenshot2](/imgs/screenshot-2.png)
### NavBar
![screenshot3](/imgs/screenshot-4.png)
### Ligh/Dark mode
![screenshot4](/imgs/screenshot-5.png)
### Usage and Contribution
![screenshot5](/imgs/screenshot-6.png)

## Current Issues <a name = "issues"></a>
1. Add Jenkins and Ansible
2. Add more test
3. Add ML to predict stocks

## Authors <a name = "authors"></a>

- Vaishvik Maisuria





