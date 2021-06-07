
## 📝 Table of Contents
- [📝 Table of Contents](#-table-of-contents)
- [🏁 Getting Started <a name = "getting_started"></a>](#-getting-started-)
- [Folder Structure <a name = "folder_structure"></a>](#folder-structure-)
- [Prerequisites <a name = "prerequisites"></a>](#prerequisites-)
- [Installation <a name = "installation"></a>](#installation-)
- [🎈 Usage <a name="usage"></a>](#-usage-)
- [Current Issues <a name = "issues"></a>](#current-issues-)
- [Authors <a name = "authors"></a>](#authors-)
- [Credits/Citation <a name = "credit"></a>](#credit-)


## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

## Folder Structure <a name = "folder_structure"></a>
Currently no file structure 

## Prerequisites <a name = "prerequisites"></a>
What things you need to install and run the application
- docker -> `https://docs.docker.com/get-docker/`
- kubectl -> `https://kubernetes.io/docs/tasks/tools/`
- minikube -> `https://minikube.sigs.k8s.io/docs/start/`
- ingress -> `https://kubernetes.github.io/ingress-nginx/deploy/#minikube`

## Installation <a name = "installation"></a>
A step by step series of examples that tell you how to get a development environment running.

1. Check out the latest code on the main branch
2. From the root directory, cd into willow_api
    2.1. docker build -t DOCKER_USERNAME/willowapi .
    2.2. docker push DOCKER_USERNAME/willowapi 
3. From the root directory, cd into willow 
    3.1. docker build -t DOCKER_USERNAME/willow .
    3.2. docker push DOCKER_USERNAME/willow 
4. From the root directory, minikube start
5. ingress -> `https://kubernetes.github.io/ingress-nginx/deploy/#minikube`
    ### To Fix ingress error
    5.1. minikube delete
    5.2. rm -r -fo ~\.minikube
    5.3 minikube start 
    5.4. minikube addons enable ingress
6. kubectl apply -f k8s
### To check if everything is working
7. kubectl get all
8. minikube dashboard
### Get ip 
9. minikube ip

## 🎈 Usage <a name="usage"></a>
- Navigate to localhost:8080 on your favorite browser


## Current Issues <a name = "issues"></a>
1. Add Jenkins and Ansible

## Authors <a name = "authors"></a>

- Vaishvik Maisuria

## Credit <a name = "authors"></a>

Medium: https://betterprogramming.pub/deploy-a-full-stack-go-and-react-app-on-kubernetes-4f31cdd9a48b

