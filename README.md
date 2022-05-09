# Social Network API

This is an API for a social network web application, it has all routes to perform add users, share thoughts, add friends and react to any thoughts.

## Description

The API contains a thre tables model on a Mongoo DB, it has all the controles to CRUD all tables and its routes. The API was constructed using JavaScript, Node.js, MongoDB, Mongoose package and Express.js package. This API perform all the basic activities for a social neetwork like create and update users, get all users, get an user by id, delete an user, add friends and remove them, of course the friends must be users of the social network. Ones you are user, you will be able to create and update thoughts, get all thoughts, get one thought by id, delete thoughts, add reactions to a thought and remove them one by one.  

## Table of Contents
* [Description](#description)
* [Walkthough](#walkthrou)
* [Installation](#installation)
* [Tests](#tests)
* [Contact](#contact)


## Installation
The package.json has everything you need, just tun "npm install", the folder structure is important so please be aware and do not change it. 
You need to have Mongoo DB installed and configure yor database and all connections properly.

## Tests
Just run "npm start", the aplication runs at localserver port 3001.
Please use insomnia or any tool you be familiar with to run the test, these are the routes you can test:

* /api/thought to retrive or add a thought
* /api/thought/:thoughtId for retrive, update and delete a single thought
* /api/tought/:thoughtId/reactions to add a reaction
*  /api/toughts/:thoughtId/reactions/:reactionId  to delete a single reaction from a specific though
* /api/users to retrive and add new user
* /api/users/:userId to retrive, update and delete a single user
* /api/users//:userId/friends/:friendId to add and delete a friend 


## Usage & Walkthrough Videos

I am to slow to test and the free version of Screencastify only allow 5 minutes long videos, so a split the walkthrough video in two parts

To see the first part of the API on operation just click following link. You will watch add a new user (POST), retrive all users (GET), retrive one user (GET), update user (UPDATE), delete user (DELETE), add and delete a friend [Walkthrough Video Part 1](https://drive.google.com/file/d/11LsdzBgGvxd3ZWAbcDzgrp6xS20PR-mJ/view)

To see the second part of the API on operation where you will watch a CRUD for thoughts and adding and deleting reactions click the next link [Walkthrough Video Part 2](https://drive.google.com/file/d/1e387MJU5822Ef5sbpgaGxDepJZ1nJGe3/view)


## Technologies 

* JavaScript
* Node.js
* MongoDB
* Express package
* Mongoose package
* Insomnia

## Autor
    For any question or inquiery
* GitHub: [mariopatino](https://github.com/mariopatino)

## License 
  This project is license under the "https://opensource.org/licenses/MIT"