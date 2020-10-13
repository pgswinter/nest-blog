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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArticleEntity = void 0;
var comment_entity_1 = require("./comment.entity");
var class_transformer_1 = require("class-transformer");
var user_entity_1 = require("./user.entity");
var typeorm_1 = require("typeorm");
var abstract_entity_1 = require("./abstract-entity");
var slugify = require("slug");
var ArticleEntity = /** @class */ (function (_super) {
    __extends(ArticleEntity, _super);
    function ArticleEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArticleEntity.prototype.generateSlug = function () {
        this.slug =
            slugify(this.title, { lower: true }) +
                '-' +
                ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    };
    ArticleEntity.prototype.toJSON = function () {
        return class_transformer_1.classToPlain(this);
    };
    ArticleEntity.prototype.toArticle = function (user) {
        var favorited = null;
        if (user) {
            favorited = this.favoritedBy.map(function (user) { return user.id; }).includes(user.id);
        }
        var article = this.toJSON();
        delete article.favoritedBy;
        return __assign(__assign({}, article), { favorited: favorited });
    };
    __decorate([
        typeorm_1.Column()
    ], ArticleEntity.prototype, "slug");
    __decorate([
        typeorm_1.Column()
    ], ArticleEntity.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], ArticleEntity.prototype, "description");
    __decorate([
        typeorm_1.Column()
    ], ArticleEntity.prototype, "body");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return user_entity_1.UserEntity; }, function (user) { return user.favorites; }, { eager: true }),
        typeorm_1.JoinTable()
    ], ArticleEntity.prototype, "favoritedBy");
    __decorate([
        typeorm_1.RelationCount(function (article) { return article.favoritedBy; })
    ], ArticleEntity.prototype, "favoritesCount");
    __decorate([
        typeorm_1.OneToMany(function (type) { return comment_entity_1.CommentEntity; }, function (comment) { return comment.article; })
    ], ArticleEntity.prototype, "comments");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_entity_1.UserEntity; }, function (user) { return user.articles; }, { eager: true })
    ], ArticleEntity.prototype, "author");
    __decorate([
        typeorm_1.Column('simple-array')
    ], ArticleEntity.prototype, "tagList");
    __decorate([
        typeorm_1.BeforeInsert()
    ], ArticleEntity.prototype, "generateSlug");
    ArticleEntity = __decorate([
        typeorm_1.Entity('articles')
    ], ArticleEntity);
    return ArticleEntity;
}(abstract_entity_1.AbstractEntity));
exports.ArticleEntity = ArticleEntity;
