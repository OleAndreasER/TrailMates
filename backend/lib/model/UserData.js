"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUserType = void 0;
var isValidUserType = function (userType) {
    return ["User", "Admin", "Advertiser"].includes(userType);
};
exports.isValidUserType = isValidUserType;
