"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  recoilObject: () => recoilObject,
  recoilObjectWithRoot: () => recoilObjectWithRoot
});
module.exports = __toCommonJS(src_exports);

// src/recoil-object/recoil-object.js
var import_recoil2 = require("recoil");
var import_recoil_nexus = require("recoil-nexus");

// src/utils/is-object.ts
var import_recoil = require("recoil");

// src/utils/is-promise.ts
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

// src/utils/is-object.ts
function isObject(obj) {
  return typeof obj === "object" && !isPromise(obj) && !import_recoil.RecoilLoadable.isLoadable(obj);
}

// src/recoil-object/recoil-object.js
function getEffectsSelf(args, parent, propKey) {
  var _a, _b, _c, _d;
  if (parent) {
    return [
      ...((_b = (_a = args.options) == null ? void 0 : _a["_self"]) == null ? void 0 : _b.effects) || [],
      ({ onSet }) => {
        onSet((newValue) => {
          (0, import_recoil_nexus.setRecoil)(parent, (currVal) => ({
            ...currVal,
            [propKey]: newValue
          }));
        });
      }
    ];
  }
  return ((_d = (_c = args.options) == null ? void 0 : _c["_self"]) == null ? void 0 : _d.effects) || [];
}
function getEffectsNode(args, propKey, useRootAtom, _self) {
  var _a, _b, _c, _d;
  if (useRootAtom) {
    return [
      ...((_b = (_a = args.options) == null ? void 0 : _a[propKey]) == null ? void 0 : _b.effects) || [],
      useRootAtom && (({ onSet }) => {
        onSet((newValue) => {
          (0, import_recoil_nexus.setRecoil)(_self, (currVal) => ({
            ...currVal,
            [propKey]: newValue
          }));
        });
      })
    ];
  }
  return ((_d = (_c = args.options) == null ? void 0 : _c[atomKey]) == null ? void 0 : _d.effects) || [];
}
function getSelfNode(args, parent, propKey) {
  var _a;
  return (0, import_recoil2.atom)({
    ...(_a = args.options) == null ? void 0 : _a._self,
    key: args.key,
    default: args.default,
    effects: getEffectsSelf(args, parent, propKey)
  });
}
function createRecoilObject(args, useRootAtom, parent, propKey) {
  const _self = useRootAtom ? getSelfNode(args, parent, propKey) : void 0;
  function mapper(e) {
    var _a, _b;
    const [propKey2, propVal] = e;
    const atomkey = `${args.key}.${String(propKey2)}`;
    if (isObject(propVal)) {
      return [
        propKey2,
        createRecoilObject({
          key: atomkey,
          default: propVal,
          options: (_a = args.options) == null ? void 0 : _a[propKey2]
        }, useRootAtom, _self, propKey2)
      ];
    }
    return [
      propKey2,
      (0, import_recoil2.atom)({
        ...(_b = args.options) == null ? void 0 : _b[propKey2],
        key: atomkey,
        default: propVal,
        effects: getEffectsNode(args, propKey2, useRootAtom, _self)
      })
    ];
  }
  function reducer(prev, curr) {
    return {
      ...prev,
      [curr[0]]: curr[1]
    };
  }
  return Object.entries(args.default).map(mapper).reduce(reducer, useRootAtom ? { _self } : {});
}
function recoilObject(args) {
  return createRecoilObject(args, false);
}
function recoilObjectWithRoot(args) {
  return createRecoilObject(args, true);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  recoilObject,
  recoilObjectWithRoot
});
//# sourceMappingURL=index.cjs.map