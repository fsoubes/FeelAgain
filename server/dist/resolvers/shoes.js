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
exports.ShoesResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Shoes_1 = require("../entities/Shoes");
const mongodb_1 = require("mongodb");
const Images_1 = require("../entities/Images");
const Variants_1 = require("../entities/Variants");
let ShoesResolver = class ShoesResolver {
    getSingleShoe(articleId, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shoe = yield Shoes_1.ShoesModel.findById(articleId);
                if (!shoe) {
                    throw new Error("Invalid recipe ID");
                }
                return shoe;
            }
            catch (err) {
                throw err;
            }
        });
    }
    images(shoes, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield Images_1.ImagesModel.find({
                _id: {
                    $in: shoes.images,
                },
            });
            return images;
        });
    }
    variants(shoes, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const variants = yield Variants_1.VariantsModel.find({
                _id: {
                    $in: shoes.variants,
                },
            });
            return variants;
        });
    }
    test2(isArg, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return isArg;
            }
            catch (err) {
                throw err;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Shoes_1.Shoes),
    __param(0, type_graphql_1.Arg("articleId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongodb_1.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], ShoesResolver.prototype, "getSingleShoe", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Shoes_1.Shoes, Object]),
    __metadata("design:returntype", Promise)
], ShoesResolver.prototype, "images", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Shoes_1.Shoes, Object]),
    __metadata("design:returntype", Promise)
], ShoesResolver.prototype, "variants", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("isArg")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object]),
    __metadata("design:returntype", Promise)
], ShoesResolver.prototype, "test2", null);
ShoesResolver = __decorate([
    type_graphql_1.Resolver((_of) => Shoes_1.Shoes)
], ShoesResolver);
exports.ShoesResolver = ShoesResolver;
//# sourceMappingURL=shoes.js.map