# RouteME

A geolocation web app.

![Desktop View](./readme_images/routeme_desktop.PNG)
![Ipad view](./readme_images/routeme_ipad.PNG) ![Mobile view](./readme_images/routme_mobile.PNG)

## Table of Contents

- [Project Name](#project-name)
- [Table of Contents](#table-of-contents)
- [About](#about)
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Used](#technology-used)
- [Authors](#authors)
- [Acknowledgement](#acknowledgement)

## About

Route me is a geolocation web app. it is a group portfolio project done by Alx software engineering
student which serve as a final project for the foundation phase of our softeware engineering journey
in  ALX.
RouteMe is a Projecte initiated to help commutters navigate their environment and get info location update. the user friendly interface enable seamless navigation.

## Demo

- open any browser of your choice preferably on phone to get accurrate location.
- enable location on you phone or pc. and make sure you grant location access when asked by your device
- click the link https://provolearning.tech/route-me or enter it in your opened browser 

## Features

- `My location`: shows user current location on the map
- `point of interest`: show marker of place of intrest on your current location
- `search box`: seach for any specific location on the map

## Installation

1. clone the repository

```bash
root> _
root> git clone https://github.com/Zuribaby/alx-route-me.git
...

```
2. change directory to the cloned repository

```bash
root> cd alx-route-me
```
3. install dependencies

```bash
#get update for you linux machine
root/alx-route-me> sudo apt-get update
...
#install python3
root/alx-route-me> sudo app-get install python3
...

#install pip
root/alx-route-me> sudo app-get install python3-pip
...

#install flask
root/alx-route-me> pip3 install python3-flask

#install Node.js and npm
root/alx-route-me> pip3 install node.js npm
...

#install gunicorn 
root/alx-route-me> pip3 install gunicorn
...

```
4. generate self signed ssl certificate

```bash
#ckeck if Openssl is installed or isntall if not
root/alx-route-me> openssl --version
...

root/alx-route-me> sudo apt-get install openssl
...

#Generate a Private Key
root/alx-route-me> openssl genpkey -algorithm RSA -out private.key
...

#Generate a Certificate Signing Request
root/alx-route-me> openssl req -new -key private.key -out certificate.csr
...

#Generate self signed certificate
root/alx-route-me> openssl x509 -req -in certificate.csr -signkey private.key -out certificate.crt
...

```
`Note:` follow installation processes and provide necessary information amd permissions.

## Usage 

```bash
root/alx-route-me>gunicorn -b 0.0.0.0:443 --certfile=/path/to/certificate.crt --keyfile=/path/to/private.key app:app
... 
#your https server will start 
#use the url provided by the server
```

## Technology Used

- Flask
- HTML/CSS
- JavaScript

## Authors

[Chiamaka Nwobodo](https://github.com/Zuribaby)
  [![Github](./readme_images/github.png)](https://github.com/Zuribaby)
  [![Linkedin](./readme_images/linkedin.png)](https://www.linkedin.com/in/yourusername)

[Aanuoluwapo Shodipo](https://github.com/Desolution1)
  [![Github](./readme_images/github.png)](https://github.com/Desolution1)
  [![Linkedin](./readme_images/linkedin.png)](https://www.linkedin.com/in/yourusername)

[Provo Iyenoma](https://github.com/Provoski)
  [![Github](./readme_images/github.png)](https://github.com/Provoski)
  [![Linkedin](./readme_images/linkedin.png)](https://www.linkedin.com/in/iyenoma-provo-6b633516a)

## Acknowledgement
We would like to extend our thanks to the following resources for their contributions and support in the development of this project:

- **ALX-SE** - a big thank you to ALX-SE community for providing the platform and tools needed to achieve this milestone 
- **OpenStreetMap** - We are grateful for to OpenStreetMap open source community for providing API, frameworks, and tools that made this project possible.
- **Stack Overflow** - The Stack Overflow community has been instrumental in helping us overcome technical challenges.
- **GitHub** - Making collaboration and version control seamless.
- **Chatgpt** - Helped reduced time that would otherwise be wasted for code debugging. 