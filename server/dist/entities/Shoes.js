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
exports.ShoesModel = exports.Shoes = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const Variants_1 = require("./Variants");
const Images_1 = require("./Images");
const OptionShoes_1 = require("./OptionShoes");
let Shoes = class Shoes {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", mongodb_1.ObjectId)
], Shoes.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Shoes.prototype, "id", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: [] }),
    __metadata("design:type", Array)
], Shoes.prototype, "switchLinks", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Shoes.prototype, "switch", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Shoes.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Shoes.prototype, "score", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Shoes.prototype, "scored_by", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Shoes.prototype, "visited_by", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Shoes.prototype, "bought_by", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Shoes.prototype, "handle", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Shoes.prototype, "vendor", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typegoose_1.prop({ type: () => [String], default: [] }),
    __metadata("design:type", Array)
], Shoes.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Shoes.prototype, "body_html", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Shoes.prototype, "product_type", void 0);
__decorate([
    type_graphql_1.Field((_type) => [Variants_1.Variants]),
    typegoose_1.prop({ ref: Variants_1.Variants, default: [], nullable: false }),
    __metadata("design:type", Array)
], Shoes.prototype, "variants", void 0);
__decorate([
    type_graphql_1.Field((_type) => [OptionShoes_1.OptionShoes]),
    typegoose_1.prop({ type: () => OptionShoes_1.OptionShoes, default: [] }),
    __metadata("design:type", Array)
], Shoes.prototype, "options", void 0);
__decorate([
    type_graphql_1.Field((_type) => [Images_1.Images]),
    typegoose_1.prop({ ref: Images_1.Images, default: [], nullable: false }),
    __metadata("design:type", Array)
], Shoes.prototype, "images", void 0);
Shoes = __decorate([
    type_graphql_1.ObjectType()
], Shoes);
exports.Shoes = Shoes;
exports.ShoesModel = typegoose_1.getModelForClass(Shoes);
//# sourceMappingURL=Shoes.js.map