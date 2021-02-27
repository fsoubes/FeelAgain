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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = exports.Blog = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
let Blog = class Blog {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", mongodb_1.ObjectId)
], Blog.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", Date)
], Blog.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Blog.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Blog.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Blog.prototype, "image_url", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typegoose_1.prop({ type: () => [String], default: [] }),
    __metadata("design:type", Array)
], Blog.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typegoose_1.prop({ type: () => [String], default: [] }),
    __metadata("design:type", Array)
], Blog.prototype, "source", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typegoose_1.prop({ type: () => [String], default: [] }),
    __metadata("design:type", Array)
], Blog.prototype, "social", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Blog.prototype, "article", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Blog.prototype, "isPublished", void 0);
__decorate([
    type_graphql_1.Field((_type) => Number),
    typegoose_1.prop({ default: 0 }),
    __metadata("design:type", Number)
], Blog.prototype, "positiveRating", void 0);
__decorate([
    type_graphql_1.Field((_type) => Number),
    typegoose_1.prop({ default: 0 }),
    __metadata("design:type", Number)
], Blog.prototype, "totalVoting", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Blog.prototype, "authRating", void 0);
__decorate([
    type_graphql_1.Field((_type) => User_1.User),
    typegoose_1.prop({ ref: User_1.User, required: false }),
    __metadata("design:type", Object)
], Blog.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field((_type) => [User_1.User]),
    typegoose_1.prop({ ref: User_1.User, default: [], nullable: false }),
    __metadata("design:type", Array)
], Blog.prototype, "upRating", void 0);
__decorate([
    type_graphql_1.Field((_type) => [User_1.User]),
    typegoose_1.prop({ ref: User_1.User, default: [], nullable: false }),
    __metadata("design:type", Array)
], Blog.prototype, "downRating", void 0);
__decorate([
    type_graphql_1.Field((_type) => Comment_1.Comment),
    typegoose_1.prop({ ref: Comment_1.Comment, required: false }),
    __metadata("design:type", Object)
], Blog.prototype, "comments", void 0);
Blog = __decorate([
    type_graphql_1.ObjectType()
], Blog);
exports.Blog = Blog;
exports.BlogModel = typegoose_1.getModelForClass(Blog, {
    schemaOptions: { timestamps: true },
});
//# sourceMappingURL=Blog.js.map