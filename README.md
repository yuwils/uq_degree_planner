# UQ Degree Planner

A website for planning the courses to be taken over the duration of a degree studied at UQ.

Built on a stack of Typescript, React, Java Spring Boot and mySQL. 

## Features

* Saves degree plans onto local device without a login requirement
* Supports both mobile and desktop 
* Supports both single and dual degrees

Currently hosted using Amazon EC2 at https://www.uqdegreeplanner.work/

## Degree Selection
![image](https://user-images.githubusercontent.com/62117275/109971603-28c14380-7d42-11eb-87f3-b1d7c3e3c1b4.png)

## Course Selection
![image](https://user-images.githubusercontent.com/62117275/109969855-1d6d1880-7d40-11eb-8d5f-d736124ca5e9.png)

## How to Host
The easiest method to host your own instance is using the provided docker-compose file.

First, clone this repo and install Docker Engine and Docker Compose; instructions can be found here: https://docs.docker.com.

Mac and Windows users will require Docker Desktop, while Linux users will require both Docker Engine and Docker Compose.

Before you build the images, you will need to create a .env file in the root directory and set the values for the mysql password and the Spring Boot mysql environmental variable; an example called .envEXAMPLE has been provided.  

Then run these commmands to build and start the docker containers:

`docker-compose build`
`docker-compose up`

The website should then be available on http://localhost:3000/.

Note: this will not be very useful without access to the mySql database; you may generate your own, or contact wyu17 if you are interested in hosting your own instance. 

## Planned Features

* Support for a greater range of degrees

* Support for pre-existing credits (e.g high school credits transferring to university or transferring credit from other degrees)

* Enforcing prerequisites and incompatible classes

* Add warning for overloaded semesters

* Refactor code base to use less any types and add additional documentation comments

### 

## Credits
### Bernado Castilho's dragdroptouch polyfill
Drag and drop support on mobile devices was enabled using https://github.com/Bernardo-Castilho/dragdroptouch

### Lilac Kapul's UQ Info
The scripts used to populate the database were adapted from https://github.com/liilac/uqinfo

### Josh Comeau's useStickyState hook
Persistent local storage was partially implemented using the useStickyState hook found at https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/

### Bootstrapped with create-react-app
https://github.com/facebook/create-react-app
