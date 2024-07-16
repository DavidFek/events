# Project Title

Events and Authors management/browser

## Description

The app allows creation and browsing of events and authors in a secure way, requiring registration and the usage of JWT token authentication.

## Getting Started

### Dependencies

IDE  
Docker

### How to use

1 - Create a .env file in the backend root folder with DATABASE_URL("mysql://root:password@mysql:3306/nestjs_prisma"),JWT_SECRET,MYSQL_DATABASE(nestjs_prisma), MYSQL_ROOT_PASSWORD, ADMIN_EMAIL and ADMIN_PASSWORD.
2 - Make sure docker is running  
3 - Navigate into the root folder of the project  
4 - Run the following CLI command to create and start the docker images: `docker-compose up -d --build`  
5 - Once docker has finished creating and launching the images run the following command to initiate the database schema: `docker-compose run backend npx prisma migrate deploy`
6 - After the database schema has been initiated, run the seed script to populate the database with initial data: `docker-compose run backend npx prisma db seed`

## Usage

### Frontend

Register and login using the landing page (default localhost:80) depending on the role selected you can use the navigation bar on the left side of the page to browse/edit events,authors,users or your own profile.

#### Role management

The project comes with a base admin user that you can set up in the backend .env file. Use this to give admin rights to other users.

### Backend

You can access the backend api documentation on http://localhost:3000/api once you have everything up and running.

## Contact

Project Link: [https://github.com/DavidFek/events]
