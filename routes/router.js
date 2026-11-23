const express = require("express");
const routeList = [];
const expressRouter = express.Router();
const namedRoutes = new Map();
const groupStack = []; // هر عضو: { prefix, as, middleware }

const joinPath = (...parts) =>
  "/" +
  parts
    .map((p) => String(p).replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");

const fnName = (fn) => fn.name || "Closure";

function register(method, path, ...handlers) {
  const fullPath = joinPath(...groupStack.map((g) => g.prefix || ""), path);
  const middleware = groupStack.flatMap((g) => g.middleware || []);
  const namePrefix = groupStack.map((g) => g.as || "").join("");

  expressRouter[method](fullPath, ...middleware, ...handlers);

  const entry = {
    method: method.toUpperCase(),
    uri: fullPath,
    name: "",
    action: fnName(handlers[handlers.length - 1]),
    middleware: middleware.map(fnName),
  };
  routeList.push(entry);

  return {
    name(n) {
      entry.name = namePrefix + n;
      namedRoutes.set(entry.name, fullPath);
      return this;
    },
  };
}

const Route = {
  get: (p, ...h) => register("get", p, ...h),
  post: (p, ...h) => register("post", p, ...h),
  put: (p, ...h) => register("put", p, ...h),
  patch: (p, ...h) => register("patch", p, ...h),
  delete: (p, ...h) => register("delete", p, ...h),

  group(options, callback) {
    groupStack.push(options);
    callback();
    groupStack.pop();
  },

  router: expressRouter,
};

// معادل route() در لاراول
function route(name, params = {}, query = {}) {
  const template = namedRoutes.get(name);
  if (!template) throw new Error(`Route [${name}] not defined.`);

  const used = new Set();
  let url = template.replace(/:(\w+)/g, (_, key) => {
    if (params[key] === undefined)
      throw new Error(`Missing param [${key}] for route [${name}]`);
    used.add(key);
    return encodeURIComponent(params[key]);
  });

  // پارامترهای اضافه را به query string می‌بریم (مثل لاراول)
  const extra = { ...query };
  for (const [k, v] of Object.entries(params)) if (!used.has(k)) extra[k] = v;
  const qs = new URLSearchParams(extra).toString();

  return qs ? `${url}?${qs}` : url;
}

const getRoutes = () => routeList;

module.exports = { Route, route, getRoutes };
