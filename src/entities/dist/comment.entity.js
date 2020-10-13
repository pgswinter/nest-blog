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
exports.CommentEntity = void 0;
var article_entity_1 = require("./article.entity");
var class_transformer_1 = require("class-transformer");
var user_entity_1 = require("./user.entity");
var typeorm_1 = require("typeorm");
var abstract_entity_1 = require("./abstract-entity");
var CommentEntity = /** @class */ (function (_super) {
    __extends(CommentEntity, _super);
    function CommentEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentEntity.prototype.toJSON = function () {
        return class_transformer_1.classToPlain(this);
    };
    __decorate([
        typeorm_1.Column()
    ], CommentEntity.prototype, "body");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_entity_1.UserEntity; }, function (user) { return user.comments; }, { eager: true })
    ], CommentEntity.prototype, "author");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return article_entity_1.ArticleEntity; }, function (article) { return article.comments; })
    ], CommentEntity.prototype, "article");
    CommentEntity = __decorate([
        typeorm_1.Entity('comments')
    ], CommentEntity);
    return CommentEntity;
}(abstract_entity_1.AbstractEntity));
exports.CommentEntity = CommentEntity;
