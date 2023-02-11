"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUserRoutes = void 0;
var user_1 = require("../db/user");
var startUserRoutes = function (app) {
    app.get("/user/:userUid/", function (req, res) {
        var userUid = req.params.userUid;
        (0, user_1.getUserData)(userUid)
            .then(function (user) {
            res.json(user);
        })
            .catch(function (error) {
            res.status(500).send("Error");
        });
    });
};
exports.startUserRoutes = startUserRoutes;
