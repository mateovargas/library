// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Book = require("../models/book.js");
var Sequelize = require('sequelize');
var path = require("path");
var express = require('express');
var apiRouter = express.Router();

// Routes
// =============================================================
module.exports = function(app) {

  // Add sequelize code to get all books and return them as JSON
  app.get("/api/all", function(req, res) {
    Book.findAll().then(function(results){
      res.json(results);
    });
  });

  // Add sequelize code to get a specific book and return it as JSON
  app.get("/api/:book", function(req, res) {
    Book.findOne({
      where: {
        title: req.params.book
      }
    }).then(function(result){
      return res.json(result);
    });
  });

  // Add sequelize code to get all books of a specific genre and return them as JSON
  app.get("/api/genre/:genre", function(req, res) {
    Book.findAll({
      where: {
        genre: {
          [Sequelize.Op.like]: req.params.genre //get the books of this genre
        }
      }
    }).then(function(item){
      res.json(item);
    });
  });

  // Add sequelize code to get all books from a specific author and return them as JSON
  app.get("/api/author/:author", function(req, res) {
    Book.findAll({
      where: {
        author: {
          [Sequelize.Op.like]: req.params.author //get the books of this genre
        }
      }
    }).then(function (item) {
      res.json(item);
    });
  });

  // Add sequelize code to get all "long" books (more than 150 pages) and return them as JSON
  app.get("/api/books/long", function(req, res) {
    Book.findAll({
      where: {
        pages: {
          [Sequelize.Op.gt]: 200 //get the books of this genre
        }
      }
    }).then(function (item) {
      res.json(item);
    });
  });

  // Add sequelize code to get all "short" books (150 pages or less) and return them as JSON
  app.get("/api/books/short", function(req, res) {
    Book.findAll({
      where: {
        pages: {
          [Sequelize.Op.lt]: 200 //get the books of this genre
        }
      }
    }).then(function (item) {
      res.json(item);
    });
  });

  // Add sequelize code to create a book
  app.post("/api/new", function(req, res) {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        pages: req.body.pages
      }).then(function(item){
        console.log('Created entry ', item);
        res.json(item);
      });
  });

  // Add sequelize code to delete a book
  app.post("/api/delete", function(req, res) {
    Book.destroy({
      where: {
        id: req.body.id
      }
    });
  });

};
