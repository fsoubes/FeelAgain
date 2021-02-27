"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogResolver = void 0;
const User_1 = require("../entities/User");
const isAuth_1 = require("../middlewares/isAuth");
const mongodb_1 = require("mongodb");
const blog_input_1 = require("./types/blog-input");
const type_graphql_1 = require("type-graphql");
const pagination_result_1 = require("./types/pagination-result");
const type_graphql_2 = require("type-graphql");
const Blog_1 = require("../entities/Blog");
const dateToString_1 = require("../helpers/dateToString");
const dateFormater_1 = require("../helpers/dateFormater");
const voteRating_1 = require("./enum/voteRating");
const updoot_1 = require("../helpers/updoot");
let PaginationResponse = class PaginationResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", pagination_result_1.PaginationInfo)
], PaginationResponse.prototype, "pageInfo", void 0);
__decorate([
    type_graphql_1.Field(() => [Blog_1.Blog]),
    __metadata("design:type", Array)
], PaginationResponse.prototype, "edges", void 0);
PaginationResponse = __decorate([
    type_graphql_1.ObjectType()
], PaginationResponse);
let BlogResolver = class BlogResolver {
    getSingleArticle(articleId, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield Blog_1.BlogModel.findById(articleId);
                if (!article) {
                    throw new Error("Invalid recipe ID");
                }
                return article;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getArticles(limit, cursor, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                limit = limit ? limit : 10;
                let match = Object.assign({}, (cursor && {
                    title: {
                        $gt: cursor,
                    },
                }));
                const cursorOptions = cursor
                    ? {
                        limit: limit + 1,
                        where: match,
                    }
                    : {
                        where: match,
                        limit: limit + 1,
                    };
                const articles = yield Blog_1.BlogModel.find({}, {}, Object.assign({}, cursorOptions))
                    .sort({
                    title: 1,
                })
                    .lean();
                const hasNextPage = articles.length > limit;
                if (articles.length > 0) {
                    const edges = hasNextPage ? articles.slice(0, -1) : articles;
                    return {
                        edges: [...edges],
                        pageInfo: {
                            hasNextPage: hasNextPage,
                            endCursor: edges[edges.length - 1].title,
                        },
                    };
                }
                else {
                    return [];
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    addArticle(blogInput, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = new Blog_1.BlogModel(Object.assign(Object.assign({}, blogInput), { author: req.session.userId }));
                yield article.save();
                return article;
            }
            catch (err) {
                throw err;
            }
        });
    }
    ratingReview(rating, articleId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.session.userId;
                const article = yield Blog_1.BlogModel.findById(articleId);
                let thumbs = updoot_1.isUpdoot(currentUser, article);
                if (rating === thumbs || (!thumbs && rating === "NULL") || !article) {
                    return false;
                }
                const voting = updoot_1.votingRes(thumbs, rating, currentUser);
                yield Blog_1.BlogModel.findOneAndUpdate({
                    _id: articleId,
                }, voting, {
                    new: true,
                    useFindAndModify: false,
                });
                return true;
            }
            catch (err) {
                throw err;
            }
        });
    }
    author(articles, { userLoader }) {
        return userLoader.load(articles.author);
    }
    authRating(article, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return updoot_1.isUpdoot(req.session.userId, article);
        });
    }
    createdAt(articles, {}) {
        const currentDate = new Date();
        return dateFormater_1.getIntervalBetweenDates(currentDate, dateToString_1.dateToString(articles.createdAt));
    }
};
__decorate([
    type_graphql_2.Query(() => Blog_1.Blog),
    __param(0, type_graphql_2.Arg("articleId")),
    __param(1, type_graphql_2.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongodb_1.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "getSingleArticle", null);
__decorate([
    type_graphql_2.Query(() => PaginationResponse),
    __param(0, type_graphql_2.Arg("limit")),
    __param(1, type_graphql_2.Arg("cursor", () => String, { nullable: true })),
    __param(2, type_graphql_2.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "getArticles", null);
__decorate([
    type_graphql_2.Mutation(() => Blog_1.Blog),
    type_graphql_2.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_2.Arg("blog")),
    __param(1, type_graphql_2.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_input_1.BlogInput, Object]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "addArticle", null);
__decorate([
    type_graphql_2.Mutation(() => Boolean),
    type_graphql_2.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_2.Arg("rating")),
    __param(1, type_graphql_2.Arg("articleId")),
    __param(2, type_graphql_2.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "ratingReview", null);
__decorate([
    type_graphql_2.FieldResolver(() => User_1.User),
    __param(0, type_graphql_2.Root()), __param(1, type_graphql_2.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Blog_1.Blog, Object]),
    __metadata("design:returntype", void 0)
], BlogResolver.prototype, "author", null);
__decorate([
    type_graphql_2.FieldResolver(() => String),
    __param(0, type_graphql_2.Root()), __param(1, type_graphql_2.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Blog_1.Blog, Object]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "authRating", null);
__decorate([
    type_graphql_2.FieldResolver(),
    __param(0, type_graphql_2.Root()), __param(1, type_graphql_2.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Blog_1.Blog, Object]),
    __metadata("design:returntype", void 0)
], BlogResolver.prototype, "createdAt", null);
BlogResolver = __decorate([
    type_graphql_2.Resolver((_of) => Blog_1.Blog)
], BlogResolver);
exports.BlogResolver = BlogResolver;
//# sourceMappingURL=blog.js.map