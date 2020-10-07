"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var user_decoration_1 = require("../auth/user.decoration");
var passport_1 = require("@nestjs/passport");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.findCurrentUser = function (_a) {
        var username = _a.username;
        return this.userService.findByUsername(username);
    };
    UserController.prototype.update = function (_a, data) {
        var username = _a.username;
        return this.userService.updateUser(username, data);
    };
    __decorate([
        common_1.Get(),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, user_decoration_1.User())
    ], UserController.prototype, "findCurrentUser");
    __decorate([
        common_1.Put(),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, user_decoration_1.User()),
        __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true })))
    ], UserController.prototype, "update");
    UserController = __decorate([
        common_1.Controller('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
