"use strict";

var _ = require("lodash"); // author: @btcostner

export const toDot = function toDot(obj: any) {
  var div =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".";
  var pre = arguments.length > 2 ? arguments[2] : undefined;

  if (typeof obj !== "object") {
    throw new Error("toDot requires a valid object");
  }

  if (pre != null) {
    pre = pre + div;
  } else {
    pre = "";
  }

  let iteration = {} as any;
  Object.keys(obj).forEach((key) => {
    if (_.isPlainObject(obj[key])) {
      Object.assign(iteration, toDot(obj[key]));
    } else {
      iteration[pre + key] = obj[key];
    }
  });
  return iteration;
};
