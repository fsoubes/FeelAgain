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
exports.UserLogin = exports.UserRegister = void 0;
const type_graphql_1 = require("type-graphql");
let UserRegister = class UserRegister {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegister.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegister.prototype, "nickname", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserRegister.prototype, "password", void 0);
UserRegister = __decorate([
    type_graphql_1.InputType()
], UserRegister);
exports.UserRegister = UserRegister;
let UserLogin = class UserLogin {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserLogin.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserLogin.prototype, "password", void 0);
UserLogin = __decorate([
    type_graphql_1.InputType()
], UserLogin);
exports.UserLogin = UserLogin;
//# sourceMappingURL=user-input.js.map