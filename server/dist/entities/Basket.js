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
exports.BasketModel = exports.Basket = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const Shoes_1 = require("./Shoes");
const User_1 = require("./User");
let Basket = class Basket {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", mongodb_1.ObjectId)
], Basket.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field((_type) => [Shoes_1.Shoes]),
    typegoose_1.prop({ ref: Shoes_1.Shoes, default: [], nullable: false }),
    __metadata("design:type", Array)
], Basket.prototype, "products", void 0);
__decorate([
    type_graphql_1.Field((_type) => User_1.User),
    typegoose_1.prop({ ref: User_1.User, nullable: true }),
    __metadata("design:type", Object)
], Basket.prototype, "user", void 0);
Basket = __decorate([
    type_graphql_1.ObjectType()
], Basket);
exports.Basket = Basket;
exports.BasketModel = typegoose_1.getModelForClass(Basket);
//# sourceMappingURL=Basket.js.map