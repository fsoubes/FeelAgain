"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolvers = void 0;
const shoes_1 = require("./shoes");
const user_1 = require("./user");
const blog_1 = require("./blog");
const add_1 = require("./add");
exports.Resolvers = [
    user_1.UserResolver,
    blog_1.BlogResolver,
    add_1.AddResolver,
    shoes_1.ShoesResolver,
];
//# sourceMappingURL=index.js.map