// src/recoil-object/recoil-object.js
import { atom } from "recoil";
import { setRecoil } from "recoil-nexus";

// src/utils/is-object.ts
import { RecoilLoadable } from "recoil";

// src/utils/is-promise.ts
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

// src/utils/is-object.ts
function isObject(obj) {
  return obj !== null && typeof obj === "object" && !isPromise(obj) && !RecoilLoadable.isLoadable(obj);
}

// src/recoil-object/recoil-object.js
function getEffectsSelf(args, parent, propKey) {
  var _a, _b, _c, _d;
  if (parent) {
    return [
      ...((_b = (_a = args.options) == null ? void 0 : _a["_self"]) == null ? void 0 : _b.effects) || [],
      ({ onSet }) => {
        onSet((newValue) => {
          setRecoil(parent, (currVal) => ({
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
          setRecoil(_self, (currVal) => ({
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
  return atom({
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
      atom({
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
export {
  recoilObject,
  recoilObjectWithRoot
};
//# sourceMappingURL=index.js.map