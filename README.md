# UQ Degree Planner

A website for planning the courses to be taken over the duration of a degree studied at UQ. 

Built on a stack of Typescript, React and Redux on the front-end, Java Spring Boot and Hibernate for the back-end, and mySQL as the database. 

AWS has been used to deploy the application: an EC2 instance has been used to host a docker container containing the website, and RDS has been used for hosting the database.

Additionally, this project features an end-to-end CI/CD pipeline, including front-end linting and tests for both the front and back-end, that was developed using Github Actions, ECR and AWS CodeDeploy. 

You can access the deployed website at [uqdegreeplanner.work](https://www.uqdegreeplanner.work/).

## Features

* Ability to select degrees to be taken, including any majors/minors/extended majors
* Calculates the courses that need to be taken for each degree and major 
* Provides an interface for planning the year and semester to take each course in
* Saves degree plans onto local device without needing to log in
* Supports both mobile and desktop usage

## Degree Selection
![image](https://user-images.githubusercontent.com/62117275/111273865-0ef7f880-8680-11eb-8cfe-d8acd1bd7ae8.png)

## Major Selection
![image](https://user-images.githubusercontent.com/62117275/143033469-25b96c8e-1acc-4846-b0bf-9ea44f38a2a5.png)

## Course Selection
![image](https://user-images.githubusercontent.com/62117275/143009806-431a5236-90be-4abc-a7a4-4ef44cae0d50.png)

## Running Locally
The easiest method to build your own instance will be to use the provided dockerfile: see https://docs.docker.com/get-docker/ for how to install Docker if you do not already have it installed.

To build the image from the root directory of the repository, you can use 

```
docker build -t uq_degree_planner .
```

or a tag of your choice.

To run the container you will need to provide it three environment variables. 
```
SPRING_DATASOURCE_URL: An URL to a mySQL database. 
SPRING_DATASOURCE_USERNAME: The mySQL username.
SPRING_DATASOURCE_PASSWORD: The mySQL password.
```
This is most easily achieved by using a .env file: see the .envEXAMPLE file in the root directory.

You can then run the container by using
```
docker run -d --env-file .env --net=host uq_degree_planner:latest
```
Note that host networking has been used (to facilitate the external database link), so port 8080 should ideally be currently unused. 

The website should then be available on http://localhost:8080/.

Note that this is unlikely to be very useful without access to a populated mySQL database as there will be no data to populate the website with; contact wyu17 if you are interested in hosting your own instance. 


### 

## Credits
### Bernado Castilho's dragdroptouch polyfill
Drag and drop support on mobile devices was enabled using https://github.com/Bernardo-Castilho/dragdroptouch

### Lilac Kapul's UQ Info
The scripts used to populate the database were adapted from https://github.com/liilac/uqinfo

### Bootstrapped with create-react-app
https://github.com/facebook/create-react-app
