"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUserRoutes = void 0;
var user_1 = require("../db/user");
var UserData_1 = require("../model/UserData");
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
    app.put("/user/:userUid/", function (req, res) {
        var userUid = req.params.userUid;
        if ((0, UserData_1.isValidUserType)(req.body.userType)) {
            console.log("Adding user data");
            (0, user_1.putUserData)(__assign({ userUid: userUid }, req.body));
            res.send("OK!");
        }
        else {
            console.log("Rejecting because invalid userType: " + req.body.userType);
            res.status(500).send("Invalid userType.");
        }
    });
};
exports.startUserRoutes = startUserRoutes;
