"use strict";
exports.__esModule = true;
exports.User = void 0;
var common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator(function (data, ctx) {
    var req = ctx.switchToHttp().getRequest();
    console.log("xxxxxxxx: ", req.user);
    return req.user;
});
