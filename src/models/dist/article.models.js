"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateArticleDTO = exports.CreateArticleDTO = void 0;
var class_validator_1 = require("class-validator");
var CreateArticleDTO = /** @class */ (function () {
    function CreateArticleDTO() {
    }
    __decorate([
        class_validator_1.IsString()
    ], CreateArticleDTO.prototype, "title");
    __decorate([
        class_validator_1.IsString()
    ], CreateArticleDTO.prototype, "body");
    __decorate([
        class_validator_1.IsString()
    ], CreateArticleDTO.prototype, "description");
    __decorate([
        class_validator_1.IsArray()
    ], CreateArticleDTO.prototype, "tagList");
    return CreateArticleDTO;
}());
exports.CreateArticleDTO = CreateArticleDTO;
var UpdateArticleDTO = /** @class */ (function () {
    function UpdateArticleDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateArticleDTO.prototype, "title");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateArticleDTO.prototype, "body");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateArticleDTO.prototype, "description");
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsOptional()
    ], UpdateArticleDTO.prototype, "tagList");
    return UpdateArticleDTO;
}());
exports.UpdateArticleDTO = UpdateArticleDTO;
