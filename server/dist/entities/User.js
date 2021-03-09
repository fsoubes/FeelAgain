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
exports.UserModel = exports.User = void 0;
const mongodb_1 = require("mongodb");
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const Basket_1 = require("./Basket");
let User = class User {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", mongodb_1.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ nullable: true, unique: true, index: true }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ nullable: true, required: true, unique: true, index: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field((_type) => Basket_1.Basket),
    typegoose_1.prop({ ref: Basket_1.Basket, required: false }),
    __metadata("design:type", Object)
], User.prototype, "basket", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typegoose_1.index({ email: 1, nickname: 1 }, { unique: true })
], User);
exports.User = User;
exports.UserModel = typegoose_1.getModelForClass(User, {
    schemaOptions: { timestamps: true },
});
//# sourceMappingURL=User.js.map