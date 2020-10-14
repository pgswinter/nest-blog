"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateUserDTO = exports.RegisterDTO = exports.LoginDTO = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var LoginDTO = /** @class */ (function () {
    function LoginDTO() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(4),
        swagger_1.ApiProperty({ type: String, description: 'email' })
    ], LoginDTO.prototype, "email");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(4),
        swagger_1.ApiProperty({ type: String, description: 'password' })
    ], LoginDTO.prototype, "password");
    return LoginDTO;
}());
exports.LoginDTO = LoginDTO;
var RegisterDTO = /** @class */ (function (_super) {
    __extends(RegisterDTO, _super);
    function RegisterDTO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(4),
        class_validator_1.MaxLength(20),
        swagger_1.ApiProperty({ type: String, description: 'username' })
    ], RegisterDTO.prototype, "username");
    return RegisterDTO;
}(LoginDTO));
exports.RegisterDTO = RegisterDTO;
var UpdateUserDTO = /** @class */ (function () {
    function UpdateUserDTO() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "email");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "image");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "bio");
    return UpdateUserDTO;
}());
exports.UpdateUserDTO = UpdateUserDTO;
