import express from "express";

const configViewEngine = (app) => {
    // Configure static files and view engine
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

export default configViewEngine;
