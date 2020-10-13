"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArticleModule = void 0;
var tag_entity_1 = require("./../entities/tag.entity");
var user_entity_1 = require("./../entities/user.entity");
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var article_service_1 = require("./article.service");
var article_controller_1 = require("./article.controller");
var article_entity_1 = require("../entities/article.entity");
var auth_module_1 = require("../auth/auth.module");
var comment_entity_1 = require("./../entities/comment.entity");
var comments_service_1 = require("./comments.service");
var comments_controller_1 = require("./comments.controller");
var ArticleModule = /** @class */ (function () {
    function ArticleModule() {
    }
    ArticleModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    article_entity_1.ArticleEntity,
                    user_entity_1.UserEntity,
                    comment_entity_1.CommentEntity,
                    tag_entity_1.TagEntity
                ]),
                auth_module_1.AuthModule,
            ],
            providers: [
                article_service_1.ArticleService,
                comments_service_1.CommentsService
            ],
            controllers: [
                article_controller_1.ArticleController,
                comments_controller_1.CommentsController
            ]
        })
    ], ArticleModule);
    return ArticleModule;
}());
exports.ArticleModule = ArticleModule;
