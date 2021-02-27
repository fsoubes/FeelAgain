"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.votingRes = exports.isUpdoot = void 0;
const mapToString = (array) => array.map((item) => item.toString());
const isUpdoot = (currentUser, article) => {
    return mapToString(article === null || article === void 0 ? void 0 : article.upRating).includes(currentUser)
        ? "UP"
        : mapToString(article === null || article === void 0 ? void 0 : article.downRating).includes(currentUser)
            ? "DOWN"
            : null;
};
exports.isUpdoot = isUpdoot;
const votingRes = (thumbs, rating, currentUser) => {
    const increment = {
        positiveRating: (!thumbs && rating === "DOWN") || (thumbs === "DOWN" && rating !== "UP")
            ? 0
            : rating === "UP"
                ? 1
                : -1,
        totalVoting: rating === "NULL"
            ? -1
            : (thumbs === "UP" && rating === "DOWN") ||
                (thumbs === "DOWN" && rating === "UP")
                ? 0
                : 1,
    };
    if (rating === "NULL") {
        return {
            $pull: {
                upRating: currentUser,
                downRating: currentUser,
            },
            $inc: Object.assign({}, increment),
        };
    }
    else if (rating === "UP") {
        return {
            $push: {
                upRating: currentUser,
            },
            $pull: {
                downRating: thumbs === "DOWN" ? currentUser : null,
            },
            $inc: Object.assign({}, increment),
        };
    }
    else {
        return {
            $push: {
                downRating: currentUser,
            },
            $pull: {
                upRating: thumbs === "UP" ? currentUser : null,
            },
            $inc: Object.assign({}, increment),
        };
    }
};
exports.votingRes = votingRes;
//# sourceMappingURL=updoot.js.map