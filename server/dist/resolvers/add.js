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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Shoes_1 = require("../entities/Shoes");
const readJson_1 = require("../helpers/readJson");
const Variants_1 = require("../entities/Variants");
const Images_1 = require("../entities/Images");
let AddResolver = class AddResolver {
    addShoes({}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = readJson_1.readJSON("./data/anaki.json");
            try {
                for (let i = 0; i <= data.length; i++) {
                    if (!data[i]) {
                        continue;
                    }
                    let _a = data[i], { images, variants } = _a, partialObject = __rest(_a, ["images", "variants"]);
                    const shoes = new Shoes_1.ShoesModel(Object.assign({}, partialObject));
                    for (let j = 0; j < variants.length; j++) {
                        const addVariants = new Variants_1.VariantsModel(Object.assign(Object.assign({}, variants[j]), { product_id: shoes._id, quantity: Math.floor(Math.random() * 50) + 1 }));
                        yield addVariants.save();
                        shoes.variants.push(addVariants._id);
                    }
                    for (let k = 0; k < images.length; k++) {
                        const addImages = new Images_1.ImagesModel(Object.assign(Object.assign({}, images[k]), { product_id: shoes._id }));
                        yield addImages.save();
                        shoes.images.push(addImages._id);
                    }
                    yield shoes.save();
                }
                return true;
            }
            catch (err) {
                throw err;
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddResolver.prototype, "addShoes", null);
AddResolver = __decorate([
    type_graphql_1.Resolver((_of) => Shoes_1.Shoes)
], AddResolver);
exports.AddResolver = AddResolver;
//# sourceMappingURL=add.js.map