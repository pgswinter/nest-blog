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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ArticleService = void 0;
var tag_entity_1 = require("./../entities/tag.entity");
var user_entity_1 = require("./../entities/user.entity");
var article_entity_1 = require("./../entities/article.entity");
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var typeorm_2 = require("typeorm");
var ArticleService = /** @class */ (function () {
    function ArticleService(articleRepo, userRepo, tagRepo) {
        this.articleRepo = articleRepo;
        this.userRepo = userRepo;
        this.tagRepo = tagRepo;
    }
    ArticleService.prototype.updatesTags = function (tagList) {
        return __awaiter(this, void 0, void 0, function () {
            var foundTags, newTags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tagRepo.find({
                            where: tagList.map(function (t) { return ({ tag: t }); })
                        })];
                    case 1:
                        foundTags = _a.sent();
                        newTags = tagList.filter(function (t) { return !foundTags.map(function (t) { return t.tag; }).includes(t); });
                        return [4 /*yield*/, Promise.all(this.tagRepo.create(newTags.map(function (t) { return ({ tag: t }); })).map(function (t) { return t.save(); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.findAll = function (user, query) {
        return __awaiter(this, void 0, void 0, function () {
            var findOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findOptions = {
                            where: {}
                        };
                        if (query.author) {
                            findOptions.where['author.username'] = query.author;
                        }
                        if (query.favorited) {
                            findOptions.where['favoritedBy.username'] = query.favorited;
                        }
                        if (query.tag) {
                            findOptions.where.tagList = typeorm_2.Like("%" + query.tag + "%");
                        }
                        if (query.offset) {
                            findOptions.offset = query.offset;
                        }
                        if (query.limit) {
                            findOptions.limit = query.limit;
                        }
                        return [4 /*yield*/, this.articleRepo.find(findOptions)];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (article) {
                            return article.toArticle(user);
                        })];
                }
            });
        });
    };
    ArticleService.prototype.findFeed = function (user, query) {
        return __awaiter(this, void 0, void 0, function () {
            var followee, findOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({
                            where: { id: user.id },
                            relations: ['followee']
                        })];
                    case 1:
                        followee = (_a.sent()).followee;
                        findOptions = __assign(__assign({}, query), { where: followee.map(function (follow) { return ({ author: follow.id }); }) });
                        return [4 /*yield*/, this.articleRepo.find(findOptions)];
                    case 2: return [2 /*return*/, (_a.sent()).map(function (article) {
                            return article.toArticle(user);
                        })];
                }
            });
        });
    };
    ArticleService.prototype.findBySlug = function (slug) {
        return this.articleRepo.findOne({
            where: { slug: slug }
        });
    };
    ArticleService.prototype.ensureOwnership = function (user, article) {
        return article.author.id === user.id;
    };
    ArticleService.prototype.createArticle = function (user, data) {
        return __awaiter(this, void 0, void 0, function () {
            var article, slug;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        article = this.articleRepo.create(data);
                        article.author = user;
                        return [4 /*yield*/, this.updatesTags(data.tagList)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, article.save()];
                    case 2:
                        slug = (_a.sent()).slug;
                        return [4 /*yield*/, this.articleRepo.findOne({ slug: slug })];
                    case 3: return [2 /*return*/, (_a.sent()).toArticle(user)];
                }
            });
        });
    };
    ArticleService.prototype.updateArticle = function (slug, user, data) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBySlug(slug)];
                    case 1:
                        article = _a.sent();
                        if (!this.ensureOwnership(user, article)) {
                            throw new common_1.UnauthorizedException();
                        }
                        return [4 /*yield*/, this.articleRepo.update({ slug: slug }, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, article.toArticle(user)];
                }
            });
        });
    };
    ArticleService.prototype.deleteArticle = function (slug, user) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBySlug(slug)];
                    case 1:
                        article = _a.sent();
                        if (!this.ensureOwnership(user, article)) {
                            throw new common_1.UnauthorizedException();
                        }
                        return [4 /*yield*/, this.articleRepo.remove(article)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.favoriteArticle = function (slug, user) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBySlug(slug)];
                    case 1:
                        article = _a.sent();
                        article.favoritedBy.push(user);
                        return [4 /*yield*/, article.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.findBySlug(slug)];
                    case 3: return [2 /*return*/, (_a.sent()).toArticle(user)];
                }
            });
        });
    };
    ArticleService.prototype.unfavoriteArticle = function (slug, user) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBySlug(slug)];
                    case 1:
                        article = _a.sent();
                        article.favoritedBy = article.favoritedBy.filter(function (fav) { return fav.id !== user.id; });
                        return [4 /*yield*/, article.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.findBySlug(slug)];
                    case 3: return [2 /*return*/, (_a.sent()).toArticle(user)];
                }
            });
        });
    };
    ArticleService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(article_entity_1.ArticleEntity)),
        __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
        __param(2, typeorm_1.InjectRepository(tag_entity_1.TagEntity))
    ], ArticleService);
    return ArticleService;
}());
exports.ArticleService = ArticleService;
