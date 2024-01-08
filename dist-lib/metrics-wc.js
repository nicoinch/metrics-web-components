function ka(e, t) {
  const r = new Set(e.split(","));
  return t ? (a) => r.has(a.toLowerCase()) : (a) => r.has(a);
}
const J = {}, Tt = [], Te = () => {
}, Ci = () => !1, Ar = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Oa = (e) => e.startsWith("onUpdate:"), ne = Object.assign, Na = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, Ai = Object.prototype.hasOwnProperty, W = (e, t) => Ai.call(e, t), D = Array.isArray, It = (e) => Lr(e) === "[object Map]", nn = (e) => Lr(e) === "[object Set]", V = (e) => typeof e == "function", ae = (e) => typeof e == "string", Mt = (e) => typeof e == "symbol", Q = (e) => e !== null && typeof e == "object", sn = (e) => (Q(e) || V(e)) && V(e.then) && V(e.catch), ln = Object.prototype.toString, Lr = (e) => ln.call(e), Li = (e) => Lr(e).slice(8, -1), cn = (e) => Lr(e) === "[object Object]", Ta = (e) => ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, hr = /* @__PURE__ */ ka(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Rr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Ri = /-(\w)/g, Ge = Rr((e) => e.replace(Ri, (t, r) => r ? r.toUpperCase() : "")), Pi = /\B([A-Z])/g, Ae = Rr(
  (e) => e.replace(Pi, "-$1").toLowerCase()
), dn = Rr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Br = Rr((e) => e ? `on${dn(e)}` : ""), Be = (e, t) => !Object.is(e, t), Yr = (e, t) => {
  for (let r = 0; r < e.length; r++)
    e[r](t);
}, yr = (e, t, r) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: r
  });
}, zi = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, to = (e) => {
  const t = ae(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let ro;
const fn = () => ro || (ro = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ia(e) {
  if (D(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const a = e[r], o = ae(a) ? Ui(a) : Ia(a);
      if (o)
        for (const n in o)
          t[n] = o[n];
    }
    return t;
  } else if (ae(e) || Q(e))
    return e;
}
const Mi = /;(?![^(]*\))/g, Di = /:([^]+)/, Fi = /\/\*[^]*?\*\//g;
function Ui(e) {
  const t = {};
  return e.replace(Fi, "").split(Mi).forEach((r) => {
    if (r) {
      const a = r.split(Di);
      a.length > 1 && (t[a[0].trim()] = a[1].trim());
    }
  }), t;
}
function Ke(e) {
  let t = "";
  if (ae(e))
    t = e;
  else if (D(e))
    for (let r = 0; r < e.length; r++) {
      const a = Ke(e[r]);
      a && (t += a + " ");
    }
  else if (Q(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const Vi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ji = /* @__PURE__ */ ka(Vi);
function un(e) {
  return !!e || e === "";
}
const Ne = (e) => ae(e) ? e : e == null ? "" : D(e) || Q(e) && (e.toString === ln || !V(e.toString)) ? JSON.stringify(e, bn, 2) : String(e), bn = (e, t) => t && t.__v_isRef ? bn(e, t.value) : It(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [a, o], n) => (r[Xr(a, n) + " =>"] = o, r),
    {}
  )
} : nn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => Xr(r))
} : Mt(t) ? Xr(t) : Q(t) && !D(t) && !cn(t) ? String(t) : t, Xr = (e, t = "") => {
  var r;
  return Mt(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
};
let Pe;
class pn {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Pe, !t && Pe && (this.index = (Pe.scopes || (Pe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const r = Pe;
      try {
        return Pe = this, t();
      } finally {
        Pe = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Pe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Pe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let r, a;
      for (r = 0, a = this.effects.length; r < a; r++)
        this.effects[r].stop();
      for (r = 0, a = this.cleanups.length; r < a; r++)
        this.cleanups[r]();
      if (this.scopes)
        for (r = 0, a = this.scopes.length; r < a; r++)
          this.scopes[r].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Hi(e) {
  return new pn(e);
}
function $i(e, t = Pe) {
  t && t.active && t.effects.push(e);
}
function Wi() {
  return Pe;
}
let _t;
class Sa {
  constructor(t, r, a, o) {
    this.fn = t, this.trigger = r, this.scheduler = a, this.active = !0, this.deps = [], this._dirtyLevel = 3, this._trackId = 0, this._runnings = 0, this._queryings = 0, this._depsLength = 0, $i(this, o);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      this._dirtyLevel = 0, this._queryings++, ft();
      for (const t of this.deps)
        if (t.computed && (Gi(t.computed), this._dirtyLevel >= 2))
          break;
      ut(), this._queryings--;
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 3 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = ct, r = _t;
    try {
      return ct = !0, _t = this, this._runnings++, ao(this), this.fn();
    } finally {
      oo(this), this._runnings--, _t = r, ct = t;
    }
  }
  stop() {
    var t;
    this.active && (ao(this), oo(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Gi(e) {
  return e.value;
}
function ao(e) {
  e._trackId++, e._depsLength = 0;
}
function oo(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      mn(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function mn(e, t) {
  const r = e.get(t);
  r !== void 0 && t._trackId !== r && (e.delete(t), e.size === 0 && e.cleanup());
}
let ct = !0, aa = 0;
const vn = [];
function ft() {
  vn.push(ct), ct = !1;
}
function ut() {
  const e = vn.pop();
  ct = e === void 0 ? !0 : e;
}
function Ca() {
  aa++;
}
function Aa() {
  for (aa--; !aa && oa.length; )
    oa.shift()();
}
function gn(e, t, r) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const a = e.deps[e._depsLength];
    a !== t ? (a && mn(a, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const oa = [];
function hn(e, t, r) {
  Ca();
  for (const a of e.keys())
    if (!(!a.allowRecurse && a._runnings) && a._dirtyLevel < t && (!a._runnings || t !== 2)) {
      const o = a._dirtyLevel;
      a._dirtyLevel = t, o === 0 && (!a._queryings || t !== 2) && (a.trigger(), a.scheduler && oa.push(a.scheduler));
    }
  Aa();
}
const wn = (e, t) => {
  const r = /* @__PURE__ */ new Map();
  return r.cleanup = e, r.computed = t, r;
}, na = /* @__PURE__ */ new WeakMap(), yt = Symbol(""), ia = Symbol("");
function xe(e, t, r) {
  if (ct && _t) {
    let a = na.get(e);
    a || na.set(e, a = /* @__PURE__ */ new Map());
    let o = a.get(r);
    o || a.set(r, o = wn(() => a.delete(r))), gn(
      _t,
      o
    );
  }
}
function et(e, t, r, a, o, n) {
  const i = na.get(e);
  if (!i)
    return;
  let s = [];
  if (t === "clear")
    s = [...i.values()];
  else if (r === "length" && D(e)) {
    const l = Number(a);
    i.forEach((d, b) => {
      (b === "length" || !Mt(b) && b >= l) && s.push(d);
    });
  } else
    switch (r !== void 0 && s.push(i.get(r)), t) {
      case "add":
        D(e) ? Ta(r) && s.push(i.get("length")) : (s.push(i.get(yt)), It(e) && s.push(i.get(ia)));
        break;
      case "delete":
        D(e) || (s.push(i.get(yt)), It(e) && s.push(i.get(ia)));
        break;
      case "set":
        It(e) && s.push(i.get(yt));
        break;
    }
  Ca();
  for (const l of s)
    l && hn(
      l,
      3
    );
  Aa();
}
const Ki = /* @__PURE__ */ ka("__proto__,__v_isRef,__isVue"), _n = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Mt)
), no = /* @__PURE__ */ Bi();
function Bi() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...r) {
      const a = G(this);
      for (let n = 0, i = this.length; n < i; n++)
        xe(a, "get", n + "");
      const o = a[t](...r);
      return o === -1 || o === !1 ? a[t](...r.map(G)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...r) {
      ft(), Ca();
      const a = G(this)[t].apply(this, r);
      return Aa(), ut(), a;
    };
  }), e;
}
function Yi(e) {
  const t = G(this);
  return xe(t, "has", e), t.hasOwnProperty(e);
}
class yn {
  constructor(t = !1, r = !1) {
    this._isReadonly = t, this._shallow = r;
  }
  get(t, r, a) {
    const o = this._isReadonly, n = this._shallow;
    if (r === "__v_isReactive")
      return !o;
    if (r === "__v_isReadonly")
      return o;
    if (r === "__v_isShallow")
      return n;
    if (r === "__v_raw")
      return a === (o ? n ? ss : On : n ? kn : En).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(a) ? t : void 0;
    const i = D(t);
    if (!o) {
      if (i && W(no, r))
        return Reflect.get(no, r, a);
      if (r === "hasOwnProperty")
        return Yi;
    }
    const s = Reflect.get(t, r, a);
    return (Mt(r) ? _n.has(r) : Ki(r)) || (o || xe(t, "get", r), n) ? s : me(s) ? i && Ta(r) ? s : s.value : Q(s) ? o ? Nn(s) : Pa(s) : s;
  }
}
class xn extends yn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, a, o) {
    let n = t[r];
    if (!this._shallow) {
      const l = Lt(n);
      if (!xr(a) && !Lt(a) && (n = G(n), a = G(a)), !D(t) && me(n) && !me(a))
        return l ? !1 : (n.value = a, !0);
    }
    const i = D(t) && Ta(r) ? Number(r) < t.length : W(t, r), s = Reflect.set(t, r, a, o);
    return t === G(o) && (i ? Be(a, n) && et(t, "set", r, a) : et(t, "add", r, a)), s;
  }
  deleteProperty(t, r) {
    const a = W(t, r);
    t[r];
    const o = Reflect.deleteProperty(t, r);
    return o && a && et(t, "delete", r, void 0), o;
  }
  has(t, r) {
    const a = Reflect.has(t, r);
    return (!Mt(r) || !_n.has(r)) && xe(t, "has", r), a;
  }
  ownKeys(t) {
    return xe(
      t,
      "iterate",
      D(t) ? "length" : yt
    ), Reflect.ownKeys(t);
  }
}
class Xi extends yn {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, r) {
    return !0;
  }
  deleteProperty(t, r) {
    return !0;
  }
}
const Ji = /* @__PURE__ */ new xn(), qi = /* @__PURE__ */ new Xi(), Qi = /* @__PURE__ */ new xn(
  !0
), La = (e) => e, Pr = (e) => Reflect.getPrototypeOf(e);
function fr(e, t, r = !1, a = !1) {
  e = e.__v_raw;
  const o = G(e), n = G(t);
  r || (Be(t, n) && xe(o, "get", t), xe(o, "get", n));
  const { has: i } = Pr(o), s = a ? La : r ? Ma : er;
  if (i.call(o, t))
    return s(e.get(t));
  if (i.call(o, n))
    return s(e.get(n));
  e !== o && e.get(t);
}
function ur(e, t = !1) {
  const r = this.__v_raw, a = G(r), o = G(e);
  return t || (Be(e, o) && xe(a, "has", e), xe(a, "has", o)), e === o ? r.has(e) : r.has(e) || r.has(o);
}
function br(e, t = !1) {
  return e = e.__v_raw, !t && xe(G(e), "iterate", yt), Reflect.get(e, "size", e);
}
function io(e) {
  e = G(e);
  const t = G(this);
  return Pr(t).has.call(t, e) || (t.add(e), et(t, "add", e, e)), this;
}
function so(e, t) {
  t = G(t);
  const r = G(this), { has: a, get: o } = Pr(r);
  let n = a.call(r, e);
  n || (e = G(e), n = a.call(r, e));
  const i = o.call(r, e);
  return r.set(e, t), n ? Be(t, i) && et(r, "set", e, t) : et(r, "add", e, t), this;
}
function lo(e) {
  const t = G(this), { has: r, get: a } = Pr(t);
  let o = r.call(t, e);
  o || (e = G(e), o = r.call(t, e)), a && a.call(t, e);
  const n = t.delete(e);
  return o && et(t, "delete", e, void 0), n;
}
function co() {
  const e = G(this), t = e.size !== 0, r = e.clear();
  return t && et(e, "clear", void 0, void 0), r;
}
function pr(e, t) {
  return function(a, o) {
    const n = this, i = n.__v_raw, s = G(i), l = t ? La : e ? Ma : er;
    return !e && xe(s, "iterate", yt), i.forEach((d, b) => a.call(o, l(d), l(b), n));
  };
}
function mr(e, t, r) {
  return function(...a) {
    const o = this.__v_raw, n = G(o), i = It(n), s = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, d = o[e](...a), b = r ? La : t ? Ma : er;
    return !t && xe(
      n,
      "iterate",
      l ? ia : yt
    ), {
      // iterator protocol
      next() {
        const { value: p, done: g } = d.next();
        return g ? { value: p, done: g } : {
          value: s ? [b(p[0]), b(p[1])] : b(p),
          done: g
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function nt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Zi() {
  const e = {
    get(n) {
      return fr(this, n);
    },
    get size() {
      return br(this);
    },
    has: ur,
    add: io,
    set: so,
    delete: lo,
    clear: co,
    forEach: pr(!1, !1)
  }, t = {
    get(n) {
      return fr(this, n, !1, !0);
    },
    get size() {
      return br(this);
    },
    has: ur,
    add: io,
    set: so,
    delete: lo,
    clear: co,
    forEach: pr(!1, !0)
  }, r = {
    get(n) {
      return fr(this, n, !0);
    },
    get size() {
      return br(this, !0);
    },
    has(n) {
      return ur.call(this, n, !0);
    },
    add: nt("add"),
    set: nt("set"),
    delete: nt("delete"),
    clear: nt("clear"),
    forEach: pr(!0, !1)
  }, a = {
    get(n) {
      return fr(this, n, !0, !0);
    },
    get size() {
      return br(this, !0);
    },
    has(n) {
      return ur.call(this, n, !0);
    },
    add: nt("add"),
    set: nt("set"),
    delete: nt("delete"),
    clear: nt("clear"),
    forEach: pr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((n) => {
    e[n] = mr(
      n,
      !1,
      !1
    ), r[n] = mr(
      n,
      !0,
      !1
    ), t[n] = mr(
      n,
      !1,
      !0
    ), a[n] = mr(
      n,
      !0,
      !0
    );
  }), [
    e,
    r,
    t,
    a
  ];
}
const [
  es,
  ts,
  rs,
  as
] = /* @__PURE__ */ Zi();
function Ra(e, t) {
  const r = t ? e ? as : rs : e ? ts : es;
  return (a, o, n) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? a : Reflect.get(
    W(r, o) && o in a ? r : a,
    o,
    n
  );
}
const os = {
  get: /* @__PURE__ */ Ra(!1, !1)
}, ns = {
  get: /* @__PURE__ */ Ra(!1, !0)
}, is = {
  get: /* @__PURE__ */ Ra(!0, !1)
}, En = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap(), ss = /* @__PURE__ */ new WeakMap();
function ls(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function cs(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ls(Li(e));
}
function Pa(e) {
  return Lt(e) ? e : za(
    e,
    !1,
    Ji,
    os,
    En
  );
}
function ds(e) {
  return za(
    e,
    !1,
    Qi,
    ns,
    kn
  );
}
function Nn(e) {
  return za(
    e,
    !0,
    qi,
    is,
    On
  );
}
function za(e, t, r, a, o) {
  if (!Q(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const n = o.get(e);
  if (n)
    return n;
  const i = cs(e);
  if (i === 0)
    return e;
  const s = new Proxy(
    e,
    i === 2 ? a : r
  );
  return o.set(e, s), s;
}
function St(e) {
  return Lt(e) ? St(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Lt(e) {
  return !!(e && e.__v_isReadonly);
}
function xr(e) {
  return !!(e && e.__v_isShallow);
}
function Tn(e) {
  return St(e) || Lt(e);
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function In(e) {
  return yr(e, "__v_skip", !0), e;
}
const er = (e) => Q(e) ? Pa(e) : e, Ma = (e) => Q(e) ? Nn(e) : e;
class Sn {
  constructor(t, r, a, o) {
    this._setter = r, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Sa(
      () => t(this._value),
      () => Er(this, 1)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = a;
  }
  get value() {
    const t = G(this);
    return Da(t), (!t._cacheable || t.effect.dirty) && Be(t._value, t._value = t.effect.run()) && Er(t, 2), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function fs(e, t, r = !1) {
  let a, o;
  const n = V(e);
  return n ? (a = e, o = Te) : (a = e.get, o = e.set), new Sn(a, o, n || !o, r);
}
function Da(e) {
  ct && _t && (e = G(e), gn(
    _t,
    e.dep || (e.dep = wn(
      () => e.dep = void 0,
      e instanceof Sn ? e : void 0
    ))
  ));
}
function Er(e, t = 3, r) {
  e = G(e);
  const a = e.dep;
  a && hn(
    a,
    t
  );
}
function me(e) {
  return !!(e && e.__v_isRef === !0);
}
function $t(e) {
  return us(e, !1);
}
function us(e, t) {
  return me(e) ? e : new bs(e, t);
}
class bs {
  constructor(t, r) {
    this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? t : G(t), this._value = r ? t : er(t);
  }
  get value() {
    return Da(this), this._value;
  }
  set value(t) {
    const r = this.__v_isShallow || xr(t) || Lt(t);
    t = r ? t : G(t), Be(t, this._rawValue) && (this._rawValue = t, this._value = r ? t : er(t), Er(this, 3));
  }
}
function $e(e) {
  return me(e) ? e.value : e;
}
const ps = {
  get: (e, t, r) => $e(Reflect.get(e, t, r)),
  set: (e, t, r, a) => {
    const o = e[t];
    return me(o) && !me(r) ? (o.value = r, !0) : Reflect.set(e, t, r, a);
  }
};
function Cn(e) {
  return St(e) ? e : new Proxy(e, ps);
}
class ms {
  constructor(t) {
    this.dep = void 0, this.__v_isRef = !0;
    const { get: r, set: a } = t(
      () => Da(this),
      () => Er(this)
    );
    this._get = r, this._set = a;
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function vs(e) {
  return new ms(e);
}
var Bt = { NVM_INC: "/Users/nicoinch/.nvm/versions/node/v18.17.0/include/node", STARSHIP_SHELL: "zsh", TERM_PROGRAM: "vscode", NODE: "/Users/nicoinch/.nvm/versions/node/v18.17.0/bin/node", INIT_CWD: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components", PYENV_ROOT: "/Users/nicoinch/.pyenv", NVM_CD_FLAGS: "-q", TERM: "xterm-256color", SHELL: "/bin/zsh", npm_config_metrics_registry: "https://registry.npmjs.org/", TMPDIR: "/var/folders/gl/zwpzw6rj0p7g0fz29sd453vw0000gn/T/", npm_config_global_prefix: "/Users/nicoinch/.nvm/versions/node/v18.17.0", TERM_PROGRAM_VERSION: "1.86.0-insider", ORIGINAL_XDG_CURRENT_DESKTOP: "undefined", MallocNanoZone: "0", COLOR: "1", npm_config_noproxy: "", npm_config_local_prefix: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components", ZSH: "/Users/nicoinch/.oh-my-zsh", NVM_DIR: "/Users/nicoinch/.nvm", USER: "nicoinch", LS_COLORS: "di=1;36:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43", COMMAND_MODE: "unix2003", npm_config_globalconfig: "/Users/nicoinch/.nvm/versions/node/v18.17.0/etc/npmrc", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.uGpAUI27at/Listeners", __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x0", npm_execpath: "/Users/nicoinch/.nvm/versions/node/v18.17.0/lib/node_modules/npm/bin/npm-cli.js", PYENV_VIRTUALENV_INIT: "1", PAGER: "less", LSCOLORS: "Gxfxcxdxbxegedabagacad", PATH: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components/node_modules/.bin:/Users/nicoinch/Workspace/JobHunt/Diabolocom/node_modules/.bin:/Users/nicoinch/Workspace/JobHunt/node_modules/.bin:/Users/nicoinch/Workspace/node_modules/.bin:/Users/nicoinch/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/nicoinch/.nvm/versions/node/v18.17.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/opt/homebrew/Cellar/pyenv-virtualenv/1.2.1/shims:/Users/nicoinch/.pyenv/shims:/opt/homebrew/opt/openjdk/bin:/Users/nicoinch/.nvm/versions/node/v18.17.0/bin:/opt/homebrew/bin", npm_package_json: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components/package.json", npm_config_userconfig: "/Users/nicoinch/.npmrc", npm_config_init_module: "/Users/nicoinch/.npm-init.js", CLOUDSDK_DEVAPPSERVER_PYTHON: "/Users/nicoinch/Workspace/Heycook/code/heycook/venv/bin/python2", __CFBundleIdentifier: "com.microsoft.VSCodeInsiders", npm_command: "run-script", PWD: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components", npm_lifecycle_event: "build", EDITOR: "vi", npm_package_name: "metrics-web-components", LANG: "en_US.UTF-8", CLOUDSDK_PYTHON: "python3", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "--ms-enable-electron-run-as-node", XPC_FLAGS: "0x0", npm_config_node_gyp: "/Users/nicoinch/.nvm/versions/node/v18.17.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", npm_package_version: "0.0.0", XPC_SERVICE_NAME: "0", PYENV_SHELL: "zsh", SHLVL: "1", HOME: "/Users/nicoinch", VSCODE_GIT_ASKPASS_MAIN: "/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/extensions/git/dist/askpass-main.js", npm_config_cache: "/Users/nicoinch/.npm", STARSHIP_SESSION_KEY: "3152613789192622", LESS: "-R", LOGNAME: "nicoinch", npm_lifecycle_script: "npm run build-tailwind && vue-tsc && vite build -c vite.lib.config.ts && vite build", VSCODE_GIT_IPC_HANDLE: "/var/folders/gl/zwpzw6rj0p7g0fz29sd453vw0000gn/T/vscode-git-fcfdeff721.sock", NVM_BIN: "/Users/nicoinch/.nvm/versions/node/v18.17.0/bin", npm_config_user_agent: "npm/9.6.7 node/v18.17.0 darwin arm64 workspaces/false", VSCODE_GIT_ASKPASS_NODE: "/Applications/Visual Studio Code - Insiders.app/Contents/Frameworks/Code - Insiders Helper (Plugin).app/Contents/MacOS/Code - Insiders Helper (Plugin)", GIT_ASKPASS: "/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/extensions/git/dist/askpass.sh", npm_node_execpath: "/Users/nicoinch/.nvm/versions/node/v18.17.0/bin/node", npm_config_prefix: "/Users/nicoinch/.nvm/versions/node/v18.17.0", COLORTERM: "truecolor", _: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components/node_modules/.bin/vite", NODE_ENV: "production" };
const Yt = [];
function gs(e, ...t) {
  ft();
  const r = Yt.length ? Yt[Yt.length - 1].component : null, a = r && r.appContext.config.warnHandler, o = hs();
  if (a)
    tt(
      a,
      r,
      11,
      [
        e + t.join(""),
        r && r.proxy,
        o.map(
          ({ vnode: n }) => `at <${ni(r, n.type)}>`
        ).join(`
`),
        o
      ]
    );
  else {
    const n = [`[Vue warn]: ${e}`, ...t];
    o.length && n.push(`
`, ...ws(o)), console.warn(...n);
  }
  ut();
}
function hs() {
  let e = Yt[Yt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const r = t[0];
    r && r.vnode === e ? r.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const a = e.component && e.component.parent;
    e = a && a.vnode;
  }
  return t;
}
function ws(e) {
  const t = [];
  return e.forEach((r, a) => {
    t.push(...a === 0 ? [] : [`
`], ..._s(r));
  }), t;
}
function _s({ vnode: e, recurseCount: t }) {
  const r = t > 0 ? `... (${t} recursive calls)` : "", a = e.component ? e.component.parent == null : !1, o = ` at <${ni(
    e.component,
    e.type,
    a
  )}`, n = ">" + r;
  return e.props ? [o, ...ys(e.props), n] : [o + n];
}
function ys(e) {
  const t = [], r = Object.keys(e);
  return r.slice(0, 3).forEach((a) => {
    t.push(...An(a, e[a]));
  }), r.length > 3 && t.push(" ..."), t;
}
function An(e, t, r) {
  return ae(t) ? (t = JSON.stringify(t), r ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? r ? t : [`${e}=${t}`] : me(t) ? (t = An(e, G(t.value), !0), r ? t : [`${e}=Ref<`, t, ">"]) : V(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = G(t), r ? t : [`${e}=`, t]);
}
function tt(e, t, r, a) {
  let o;
  try {
    o = a ? e(...a) : e();
  } catch (n) {
    zr(n, t, r);
  }
  return o;
}
function De(e, t, r, a) {
  if (V(e)) {
    const n = tt(e, t, r, a);
    return n && sn(n) && n.catch((i) => {
      zr(i, t, r);
    }), n;
  }
  const o = [];
  for (let n = 0; n < e.length; n++)
    o.push(De(e[n], t, r, a));
  return o;
}
function zr(e, t, r, a = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let n = t.parent;
    const i = t.proxy, s = `https://vuejs.org/errors/#runtime-${r}`;
    for (; n; ) {
      const d = n.ec;
      if (d) {
        for (let b = 0; b < d.length; b++)
          if (d[b](e, i, s) === !1)
            return;
      }
      n = n.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      tt(
        l,
        null,
        10,
        [e, i, s]
      );
      return;
    }
  }
  xs(e, r, o, a);
}
function xs(e, t, r, a = !0) {
  console.error(e);
}
let tr = !1, sa = !1;
const ue = [];
let He = 0;
const Ct = [];
let Qe = null, wt = 0;
const Ln = /* @__PURE__ */ Promise.resolve();
let Fa = null;
function Rn(e) {
  const t = Fa || Ln;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Es(e) {
  let t = He + 1, r = ue.length;
  for (; t < r; ) {
    const a = t + r >>> 1, o = ue[a], n = rr(o);
    n < e || n === e && o.pre ? t = a + 1 : r = a;
  }
  return t;
}
function Ua(e) {
  (!ue.length || !ue.includes(
    e,
    tr && e.allowRecurse ? He + 1 : He
  )) && (e.id == null ? ue.push(e) : ue.splice(Es(e.id), 0, e), Pn());
}
function Pn() {
  !tr && !sa && (sa = !0, Fa = Ln.then(Mn));
}
function ks(e) {
  const t = ue.indexOf(e);
  t > He && ue.splice(t, 1);
}
function Os(e) {
  D(e) ? Ct.push(...e) : (!Qe || !Qe.includes(
    e,
    e.allowRecurse ? wt + 1 : wt
  )) && Ct.push(e), Pn();
}
function fo(e, t, r = tr ? He + 1 : 0) {
  for (; r < ue.length; r++) {
    const a = ue[r];
    if (a && a.pre) {
      if (e && a.id !== e.uid)
        continue;
      ue.splice(r, 1), r--, a();
    }
  }
}
function zn(e) {
  if (Ct.length) {
    const t = [...new Set(Ct)];
    if (Ct.length = 0, Qe) {
      Qe.push(...t);
      return;
    }
    for (Qe = t, Qe.sort((r, a) => rr(r) - rr(a)), wt = 0; wt < Qe.length; wt++)
      Qe[wt]();
    Qe = null, wt = 0;
  }
}
const rr = (e) => e.id == null ? 1 / 0 : e.id, Ns = (e, t) => {
  const r = rr(e) - rr(t);
  if (r === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return r;
};
function Mn(e) {
  sa = !1, tr = !0, ue.sort(Ns);
  const t = Te;
  try {
    for (He = 0; He < ue.length; He++) {
      const r = ue[He];
      r && r.active !== !1 && (Bt.NODE_ENV !== "production" && t(r), tt(r, null, 14));
    }
  } finally {
    He = 0, ue.length = 0, zn(), tr = !1, Fa = null, (ue.length || Ct.length) && Mn();
  }
}
function Ts(e, t, ...r) {
  if (e.isUnmounted)
    return;
  const a = e.vnode.props || J;
  let o = r;
  const n = t.startsWith("update:"), i = n && t.slice(7);
  if (i && i in a) {
    const b = `${i === "modelValue" ? "model" : i}Modifiers`, { number: p, trim: g } = a[b] || J;
    g && (o = r.map((x) => ae(x) ? x.trim() : x)), p && (o = r.map(zi));
  }
  let s, l = a[s = Br(t)] || // also try camelCase event handler (#2249)
  a[s = Br(Ge(t))];
  !l && n && (l = a[s = Br(Ae(t))]), l && De(
    l,
    e,
    6,
    o
  );
  const d = a[s + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[s])
      return;
    e.emitted[s] = !0, De(
      d,
      e,
      6,
      o
    );
  }
}
function Dn(e, t, r = !1) {
  const a = t.emitsCache, o = a.get(e);
  if (o !== void 0)
    return o;
  const n = e.emits;
  let i = {}, s = !1;
  if (!V(e)) {
    const l = (d) => {
      const b = Dn(d, t, !0);
      b && (s = !0, ne(i, b));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !n && !s ? (Q(e) && a.set(e, null), null) : (D(n) ? n.forEach((l) => i[l] = null) : ne(i, n), Q(e) && a.set(e, i), i);
}
function Mr(e, t) {
  return !e || !Ar(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), W(e, t[0].toLowerCase() + t.slice(1)) || W(e, Ae(t)) || W(e, t));
}
let he = null, Dr = null;
function kr(e) {
  const t = he;
  return he = e, Dr = e && e.type.__scopeId || null, t;
}
function Is(e) {
  Dr = e;
}
function Ss() {
  Dr = null;
}
function Cs(e, t = he, r) {
  if (!t || e._n)
    return e;
  const a = (...o) => {
    a._d && _o(-1);
    const n = kr(t);
    let i;
    try {
      i = e(...o);
    } finally {
      kr(n), a._d && _o(1);
    }
    return i;
  };
  return a._n = !0, a._c = !0, a._d = !0, a;
}
function Jr(e) {
  const {
    type: t,
    vnode: r,
    proxy: a,
    withProxy: o,
    props: n,
    propsOptions: [i],
    slots: s,
    attrs: l,
    emit: d,
    render: b,
    renderCache: p,
    data: g,
    setupState: x,
    ctx: L,
    inheritAttrs: S
  } = e;
  let U, R;
  const j = kr(e);
  try {
    if (r.shapeFlag & 4) {
      const P = o || a, H = Bt.NODE_ENV !== "production" && x.__isScriptSetup ? new Proxy(P, {
        get(C, z, q) {
          return gs(
            `Property '${String(
              z
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(C, z, q);
        }
      }) : P;
      U = je(
        b.call(
          H,
          P,
          p,
          n,
          x,
          g,
          L
        )
      ), R = l;
    } else {
      const P = t;
      Bt.NODE_ENV, U = je(
        P.length > 1 ? P(
          n,
          Bt.NODE_ENV !== "production" ? {
            get attrs() {
              return l;
            },
            slots: s,
            emit: d
          } : { attrs: l, slots: s, emit: d }
        ) : P(
          n,
          null
          /* we know it doesn't need it */
        )
      ), R = t.props ? l : As(l);
    }
  } catch (P) {
    Qt.length = 0, zr(P, e, 1), U = be(dt);
  }
  let F = U;
  if (R && S !== !1) {
    const P = Object.keys(R), { shapeFlag: H } = F;
    P.length && H & 7 && (i && P.some(Oa) && (R = Ls(
      R,
      i
    )), F = Rt(F, R));
  }
  return r.dirs && (F = Rt(F), F.dirs = F.dirs ? F.dirs.concat(r.dirs) : r.dirs), r.transition && (F.transition = r.transition), U = F, kr(j), U;
}
const As = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Ar(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, Ls = (e, t) => {
  const r = {};
  for (const a in e)
    (!Oa(a) || !(a.slice(9) in t)) && (r[a] = e[a]);
  return r;
};
function Rs(e, t, r) {
  const { props: a, children: o, component: n } = e, { props: i, children: s, patchFlag: l } = t, d = n.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return a ? uo(a, i, d) : !!i;
    if (l & 8) {
      const b = t.dynamicProps;
      for (let p = 0; p < b.length; p++) {
        const g = b[p];
        if (i[g] !== a[g] && !Mr(d, g))
          return !0;
      }
    }
  } else
    return (o || s) && (!s || !s.$stable) ? !0 : a === i ? !1 : a ? i ? uo(a, i, d) : !0 : !!i;
  return !1;
}
function uo(e, t, r) {
  const a = Object.keys(t);
  if (a.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < a.length; o++) {
    const n = a[o];
    if (t[n] !== e[n] && !Mr(r, n))
      return !0;
  }
  return !1;
}
function Ps({ vnode: e, parent: t }, r) {
  if (r)
    for (; t; ) {
      const a = t.subTree;
      if (a.suspense && a.suspense.activeBranch === e && (a.el = e.el), a === e)
        (e = t.vnode).el = r, t = t.parent;
      else
        break;
    }
}
const zs = Symbol.for("v-ndc"), Ms = (e) => e.__isSuspense;
function Ds(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Os(e);
}
const Fs = Symbol.for("v-scx"), Us = () => qt(Fs);
function Vs(e, t) {
  return Fr(e, null, t);
}
function js(e, t) {
  return Fr(
    e,
    null,
    { flush: "sync" }
  );
}
const vr = {};
function At(e, t, r) {
  return Fr(e, t, r);
}
function Fr(e, t, {
  immediate: r,
  deep: a,
  flush: o,
  once: n,
  onTrack: i,
  onTrigger: s
} = J) {
  if (t && n) {
    const C = t;
    t = (...z) => {
      C(...z), H();
    };
  }
  const l = de, d = (C) => a === !0 ? C : (
    // for deep: false, only traverse root-level properties
    Nt(C, a === !1 ? 1 : void 0)
  );
  let b, p = !1, g = !1;
  if (me(e) ? (b = () => e.value, p = xr(e)) : St(e) ? (b = () => d(e), p = !0) : D(e) ? (g = !0, p = e.some((C) => St(C) || xr(C)), b = () => e.map((C) => {
    if (me(C))
      return C.value;
    if (St(C))
      return d(C);
    if (V(C))
      return tt(C, l, 2);
  })) : V(e) ? t ? b = () => tt(e, l, 2) : b = () => (x && x(), De(
    e,
    l,
    3,
    [L]
  )) : b = Te, t && a) {
    const C = b;
    b = () => Nt(C());
  }
  let x, L = (C) => {
    x = F.onStop = () => {
      tt(C, l, 4), x = F.onStop = void 0;
    };
  }, S;
  if (Hr)
    if (L = Te, t ? r && De(t, l, 3, [
      b(),
      g ? [] : void 0,
      L
    ]) : b(), o === "sync") {
      const C = Us();
      S = C.__watcherHandles || (C.__watcherHandles = []);
    } else
      return Te;
  let U = g ? new Array(e.length).fill(vr) : vr;
  const R = () => {
    if (!(!F.active || !F.dirty))
      if (t) {
        const C = F.run();
        (a || p || (g ? C.some((z, q) => Be(z, U[q])) : Be(C, U))) && (x && x(), De(t, l, 3, [
          C,
          // pass undefined as the old value when it's changed for the first time
          U === vr ? void 0 : g && U[0] === vr ? [] : U,
          L
        ]), U = C);
      } else
        F.run();
  };
  R.allowRecurse = !!t;
  let j;
  o === "sync" ? j = R : o === "post" ? j = () => _e(R, l && l.suspense) : (R.pre = !0, l && (R.id = l.uid), j = () => Ua(R));
  const F = new Sa(b, Te, j), P = Wi(), H = () => {
    F.stop(), P && Na(P.effects, F);
  };
  return t ? r ? R() : U = F.run() : o === "post" ? _e(
    F.run.bind(F),
    l && l.suspense
  ) : F.run(), S && S.push(H), H;
}
function Hs(e, t, r) {
  const a = this.proxy, o = ae(e) ? e.includes(".") ? Fn(a, e) : () => a[e] : e.bind(a, a);
  let n;
  V(t) ? n = t : (n = t.handler, r = t);
  const i = de;
  Pt(this);
  const s = Fr(o, n.bind(a), r);
  return i ? Pt(i) : xt(), s;
}
function Fn(e, t) {
  const r = t.split(".");
  return () => {
    let a = e;
    for (let o = 0; o < r.length && a; o++)
      a = a[r[o]];
    return a;
  };
}
function Nt(e, t, r = 0, a) {
  if (!Q(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (r >= t)
      return e;
    r++;
  }
  if (a = a || /* @__PURE__ */ new Set(), a.has(e))
    return e;
  if (a.add(e), me(e))
    Nt(e.value, t, r, a);
  else if (D(e))
    for (let o = 0; o < e.length; o++)
      Nt(e[o], t, r, a);
  else if (nn(e) || It(e))
    e.forEach((o) => {
      Nt(o, t, r, a);
    });
  else if (cn(e))
    for (const o in e)
      Nt(e[o], t, r, a);
  return e;
}
function vt(e, t, r, a) {
  const o = e.dirs, n = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const s = o[i];
    n && (s.oldValue = n[i].value);
    let l = s.dir[a];
    l && (ft(), De(l, r, 8, [
      e.el,
      s,
      e,
      t
    ]), ut());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ye(e, t) {
  return V(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ne({ name: e.name }, t, { setup: e })
  ) : e;
}
const Xt = (e) => !!e.type.__asyncLoader, Un = (e) => e.type.__isKeepAlive;
function $s(e, t) {
  Vn(e, "a", t);
}
function Ws(e, t) {
  Vn(e, "da", t);
}
function Vn(e, t, r = de) {
  const a = e.__wdc || (e.__wdc = () => {
    let o = r;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Ur(t, a, r), r) {
    let o = r.parent;
    for (; o && o.parent; )
      Un(o.parent.vnode) && Gs(a, t, r, o), o = o.parent;
  }
}
function Gs(e, t, r, a) {
  const o = Ur(
    t,
    e,
    a,
    !0
    /* prepend */
  );
  Va(() => {
    Na(a[t], o);
  }, r);
}
function Ur(e, t, r = de, a = !1) {
  if (r) {
    const o = r[e] || (r[e] = []), n = t.__weh || (t.__weh = (...i) => {
      if (r.isUnmounted)
        return;
      ft(), Pt(r);
      const s = De(t, r, e, i);
      return xt(), ut(), s;
    });
    return a ? o.unshift(n) : o.push(n), n;
  }
}
const rt = (e) => (t, r = de) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Hr || e === "sp") && Ur(e, (...a) => t(...a), r)
), Ks = rt("bm"), jn = rt("m"), Bs = rt("bu"), Ys = rt("u"), Xs = rt("bum"), Va = rt("um"), Js = rt("sp"), qs = rt(
  "rtg"
), Qs = rt(
  "rtc"
);
function Zs(e, t = de) {
  Ur("ec", e, t);
}
function el(e, t, r, a) {
  let o;
  const n = r && r[a];
  if (D(e) || ae(e)) {
    o = new Array(e.length);
    for (let i = 0, s = e.length; i < s; i++)
      o[i] = t(e[i], i, void 0, n && n[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++)
      o[i] = t(i + 1, i, void 0, n && n[i]);
  } else if (Q(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (i, s) => t(i, s, void 0, n && n[s])
      );
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let s = 0, l = i.length; s < l; s++) {
        const d = i[s];
        o[s] = t(e[d], d, s, n && n[s]);
      }
    }
  else
    o = [];
  return r && (r[a] = o), o;
}
function tl(e, t, r = {}, a, o) {
  if (he.isCE || he.parent && Xt(he.parent) && he.parent.isCE)
    return t !== "default" && (r.name = t), be("slot", r, a && a());
  let n = e[t];
  n && n._c && (n._d = !1), Ie();
  const i = n && Hn(n(r)), s = ei(
    ye,
    {
      key: r.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (a ? a() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !o && s.scopeId && (s.slotScopeIds = [s.scopeId + "-s"]), n && n._c && (n._d = !0), s;
}
function Hn(e) {
  return e.some((t) => Ir(t) ? !(t.type === dt || t.type === ye && !Hn(t.children)) : !0) ? e : null;
}
const la = (e) => e ? ai(e) ? Ga(e) || e.proxy : la(e.parent) : null, Jt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ne(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => la(e.parent),
    $root: (e) => la(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ja(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Ua(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Rn.bind(e.proxy)),
    $watch: (e) => Hs.bind(e)
  })
), qr = (e, t) => e !== J && !e.__isScriptSetup && W(e, t), rl = {
  get({ _: e }, t) {
    const { ctx: r, setupState: a, data: o, props: n, accessCache: i, type: s, appContext: l } = e;
    let d;
    if (t[0] !== "$") {
      const x = i[t];
      if (x !== void 0)
        switch (x) {
          case 1:
            return a[t];
          case 2:
            return o[t];
          case 4:
            return r[t];
          case 3:
            return n[t];
        }
      else {
        if (qr(a, t))
          return i[t] = 1, a[t];
        if (o !== J && W(o, t))
          return i[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && W(d, t)
        )
          return i[t] = 3, n[t];
        if (r !== J && W(r, t))
          return i[t] = 4, r[t];
        ca && (i[t] = 0);
      }
    }
    const b = Jt[t];
    let p, g;
    if (b)
      return t === "$attrs" && xe(e, "get", t), b(e);
    if (
      // css module (injected by vue-loader)
      (p = s.__cssModules) && (p = p[t])
    )
      return p;
    if (r !== J && W(r, t))
      return i[t] = 4, r[t];
    if (
      // global properties
      g = l.config.globalProperties, W(g, t)
    )
      return g[t];
  },
  set({ _: e }, t, r) {
    const { data: a, setupState: o, ctx: n } = e;
    return qr(o, t) ? (o[t] = r, !0) : a !== J && W(a, t) ? (a[t] = r, !0) : W(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (n[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: a, appContext: o, propsOptions: n }
  }, i) {
    let s;
    return !!r[i] || e !== J && W(e, i) || qr(t, i) || (s = n[0]) && W(s, i) || W(a, i) || W(Jt, i) || W(o.config.globalProperties, i);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : W(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function al(e, t, r = J) {
  const a = jr(), o = Ge(t), n = Ae(t), i = vs((l, d) => {
    let b;
    return js(() => {
      const p = e[t];
      Be(b, p) && (b = p, d());
    }), {
      get() {
        return l(), r.get ? r.get(b) : b;
      },
      set(p) {
        const g = a.vnode.props;
        !(g && // check if parent has passed v-model
        (t in g || o in g || n in g) && (`onUpdate:${t}` in g || `onUpdate:${o}` in g || `onUpdate:${n}` in g)) && Be(p, b) && (b = p, d()), a.emit(`update:${t}`, r.set ? r.set(p) : p);
      }
    };
  }), s = t === "modelValue" ? "modelModifiers" : `${t}Modifiers`;
  return i[Symbol.iterator] = () => {
    let l = 0;
    return {
      next() {
        return l < 2 ? { value: l++ ? e[s] || {} : i, done: !1 } : { done: !0 };
      }
    };
  }, i;
}
function Or(e) {
  return D(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
function ol(e, t) {
  return !e || !t ? e || t : D(e) && D(t) ? e.concat(t) : ne({}, Or(e), Or(t));
}
let ca = !0;
function nl(e) {
  const t = ja(e), r = e.proxy, a = e.ctx;
  ca = !1, t.beforeCreate && bo(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: n,
    methods: i,
    watch: s,
    provide: l,
    inject: d,
    // lifecycle
    created: b,
    beforeMount: p,
    mounted: g,
    beforeUpdate: x,
    updated: L,
    activated: S,
    deactivated: U,
    beforeDestroy: R,
    beforeUnmount: j,
    destroyed: F,
    unmounted: P,
    render: H,
    renderTracked: C,
    renderTriggered: z,
    errorCaptured: q,
    serverPrefetch: Xe,
    // public API
    expose: Ee,
    inheritAttrs: ke,
    // assets
    components: fe,
    directives: Je,
    filters: Ut
  } = t;
  if (d && il(d, a, null), i)
    for (const X in i) {
      const Y = i[X];
      V(Y) && (a[X] = Y.bind(r));
    }
  if (o) {
    const X = o.call(r, r);
    Q(X) && (e.data = Pa(X));
  }
  if (ca = !0, n)
    for (const X in n) {
      const Y = n[X], ve = V(Y) ? Y.bind(r, r) : V(Y.get) ? Y.get.bind(r, r) : Te, mt = !V(Y) && V(Y.set) ? Y.set.bind(r) : Te, qe = Ot({
        get: ve,
        set: mt
      });
      Object.defineProperty(a, X, {
        enumerable: !0,
        configurable: !0,
        get: () => qe.value,
        set: (Se) => qe.value = Se
      });
    }
  if (s)
    for (const X in s)
      $n(s[X], a, r, X);
  if (l) {
    const X = V(l) ? l.call(r) : l;
    Reflect.ownKeys(X).forEach((Y) => {
      Gn(Y, X[Y]);
    });
  }
  b && bo(b, e, "c");
  function le(X, Y) {
    D(Y) ? Y.forEach((ve) => X(ve.bind(r))) : Y && X(Y.bind(r));
  }
  if (le(Ks, p), le(jn, g), le(Bs, x), le(Ys, L), le($s, S), le(Ws, U), le(Zs, q), le(Qs, C), le(qs, z), le(Xs, j), le(Va, P), le(Js, Xe), D(Ee))
    if (Ee.length) {
      const X = e.exposed || (e.exposed = {});
      Ee.forEach((Y) => {
        Object.defineProperty(X, Y, {
          get: () => r[Y],
          set: (ve) => r[Y] = ve
        });
      });
    } else
      e.exposed || (e.exposed = {});
  H && e.render === Te && (e.render = H), ke != null && (e.inheritAttrs = ke), fe && (e.components = fe), Je && (e.directives = Je);
}
function il(e, t, r = Te) {
  D(e) && (e = da(e));
  for (const a in e) {
    const o = e[a];
    let n;
    Q(o) ? "default" in o ? n = qt(
      o.from || a,
      o.default,
      !0
    ) : n = qt(o.from || a) : n = qt(o), me(n) ? Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => n.value,
      set: (i) => n.value = i
    }) : t[a] = n;
  }
}
function bo(e, t, r) {
  De(
    D(e) ? e.map((a) => a.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function $n(e, t, r, a) {
  const o = a.includes(".") ? Fn(r, a) : () => r[a];
  if (ae(e)) {
    const n = t[e];
    V(n) && At(o, n);
  } else if (V(e))
    At(o, e.bind(r));
  else if (Q(e))
    if (D(e))
      e.forEach((n) => $n(n, t, r, a));
    else {
      const n = V(e.handler) ? e.handler.bind(r) : t[e.handler];
      V(n) && At(o, n, e);
    }
}
function ja(e) {
  const t = e.type, { mixins: r, extends: a } = t, {
    mixins: o,
    optionsCache: n,
    config: { optionMergeStrategies: i }
  } = e.appContext, s = n.get(t);
  let l;
  return s ? l = s : !o.length && !r && !a ? l = t : (l = {}, o.length && o.forEach(
    (d) => Nr(l, d, i, !0)
  ), Nr(l, t, i)), Q(t) && n.set(t, l), l;
}
function Nr(e, t, r, a = !1) {
  const { mixins: o, extends: n } = t;
  n && Nr(e, n, r, !0), o && o.forEach(
    (i) => Nr(e, i, r, !0)
  );
  for (const i in t)
    if (!(a && i === "expose")) {
      const s = sl[i] || r && r[i];
      e[i] = s ? s(e[i], t[i]) : t[i];
    }
  return e;
}
const sl = {
  data: po,
  props: mo,
  emits: mo,
  // objects
  methods: Kt,
  computed: Kt,
  // lifecycle
  beforeCreate: ge,
  created: ge,
  beforeMount: ge,
  mounted: ge,
  beforeUpdate: ge,
  updated: ge,
  beforeDestroy: ge,
  beforeUnmount: ge,
  destroyed: ge,
  unmounted: ge,
  activated: ge,
  deactivated: ge,
  errorCaptured: ge,
  serverPrefetch: ge,
  // assets
  components: Kt,
  directives: Kt,
  // watch
  watch: cl,
  // provide / inject
  provide: po,
  inject: ll
};
function po(e, t) {
  return t ? e ? function() {
    return ne(
      V(e) ? e.call(this, this) : e,
      V(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ll(e, t) {
  return Kt(da(e), da(t));
}
function da(e) {
  if (D(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function ge(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Kt(e, t) {
  return e ? ne(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function mo(e, t) {
  return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ne(
    /* @__PURE__ */ Object.create(null),
    Or(e),
    Or(t ?? {})
  ) : t;
}
function cl(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const r = ne(/* @__PURE__ */ Object.create(null), e);
  for (const a in t)
    r[a] = ge(e[a], t[a]);
  return r;
}
function Wn() {
  return {
    app: null,
    config: {
      isNativeTag: Ci,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let dl = 0;
function fl(e, t) {
  return function(a, o = null) {
    V(a) || (a = ne({}, a)), o != null && !Q(o) && (o = null);
    const n = Wn(), i = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const l = n.app = {
      _uid: dl++,
      _component: a,
      _props: o,
      _container: null,
      _context: n,
      _instance: null,
      version: Dl,
      get config() {
        return n.config;
      },
      set config(d) {
      },
      use(d, ...b) {
        return i.has(d) || (d && V(d.install) ? (i.add(d), d.install(l, ...b)) : V(d) && (i.add(d), d(l, ...b))), l;
      },
      mixin(d) {
        return n.mixins.includes(d) || n.mixins.push(d), l;
      },
      component(d, b) {
        return b ? (n.components[d] = b, l) : n.components[d];
      },
      directive(d, b) {
        return b ? (n.directives[d] = b, l) : n.directives[d];
      },
      mount(d, b, p) {
        if (!s) {
          const g = be(a, o);
          return g.appContext = n, p === !0 ? p = "svg" : p === !1 && (p = void 0), b && t ? t(g, d) : e(g, d, p), s = !0, l._container = d, d.__vue_app__ = l, Ga(g.component) || g.component.proxy;
        }
      },
      unmount() {
        s && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(d, b) {
        return n.provides[d] = b, l;
      },
      runWithContext(d) {
        Tr = l;
        try {
          return d();
        } finally {
          Tr = null;
        }
      }
    };
    return l;
  };
}
let Tr = null;
function Gn(e, t) {
  if (de) {
    let r = de.provides;
    const a = de.parent && de.parent.provides;
    a === r && (r = de.provides = Object.create(a)), r[e] = t;
  }
}
function qt(e, t, r = !1) {
  const a = de || he;
  if (a || Tr) {
    const o = a ? a.parent == null ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides : Tr._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return r && V(t) ? t.call(a && a.proxy) : t;
  }
}
function ul(e, t, r, a = !1) {
  const o = {}, n = {};
  yr(n, Vr, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Kn(e, t, o, n);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  r ? e.props = a ? o : ds(o) : e.type.props ? e.props = o : e.props = n, e.attrs = n;
}
function bl(e, t, r, a) {
  const {
    props: o,
    attrs: n,
    vnode: { patchFlag: i }
  } = e, s = G(o), [l] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (a || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const b = e.vnode.dynamicProps;
      for (let p = 0; p < b.length; p++) {
        let g = b[p];
        if (Mr(e.emitsOptions, g))
          continue;
        const x = t[g];
        if (l)
          if (W(n, g))
            x !== n[g] && (n[g] = x, d = !0);
          else {
            const L = Ge(g);
            o[L] = fa(
              l,
              s,
              L,
              x,
              e,
              !1
            );
          }
        else
          x !== n[g] && (n[g] = x, d = !0);
      }
    }
  } else {
    Kn(e, t, o, n) && (d = !0);
    let b;
    for (const p in s)
      (!t || // for camelCase
      !W(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((b = Ae(p)) === p || !W(t, b))) && (l ? r && // for camelCase
      (r[p] !== void 0 || // for kebab-case
      r[b] !== void 0) && (o[p] = fa(
        l,
        s,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (n !== s)
      for (const p in n)
        (!t || !W(t, p)) && (delete n[p], d = !0);
  }
  d && et(e, "set", "$attrs");
}
function Kn(e, t, r, a) {
  const [o, n] = e.propsOptions;
  let i = !1, s;
  if (t)
    for (let l in t) {
      if (hr(l))
        continue;
      const d = t[l];
      let b;
      o && W(o, b = Ge(l)) ? !n || !n.includes(b) ? r[b] = d : (s || (s = {}))[b] = d : Mr(e.emitsOptions, l) || (!(l in a) || d !== a[l]) && (a[l] = d, i = !0);
    }
  if (n) {
    const l = G(r), d = s || J;
    for (let b = 0; b < n.length; b++) {
      const p = n[b];
      r[p] = fa(
        o,
        l,
        p,
        d[p],
        e,
        !W(d, p)
      );
    }
  }
  return i;
}
function fa(e, t, r, a, o, n) {
  const i = e[r];
  if (i != null) {
    const s = W(i, "default");
    if (s && a === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && V(l)) {
        const { propsDefaults: d } = o;
        r in d ? a = d[r] : (Pt(o), a = d[r] = l.call(
          null,
          t
        ), xt());
      } else
        a = l;
    }
    i[
      0
      /* shouldCast */
    ] && (n && !s ? a = !1 : i[
      1
      /* shouldCastTrue */
    ] && (a === "" || a === Ae(r)) && (a = !0));
  }
  return a;
}
function Bn(e, t, r = !1) {
  const a = t.propsCache, o = a.get(e);
  if (o)
    return o;
  const n = e.props, i = {}, s = [];
  let l = !1;
  if (!V(e)) {
    const b = (p) => {
      l = !0;
      const [g, x] = Bn(p, t, !0);
      ne(i, g), x && s.push(...x);
    };
    !r && t.mixins.length && t.mixins.forEach(b), e.extends && b(e.extends), e.mixins && e.mixins.forEach(b);
  }
  if (!n && !l)
    return Q(e) && a.set(e, Tt), Tt;
  if (D(n))
    for (let b = 0; b < n.length; b++) {
      const p = Ge(n[b]);
      vo(p) && (i[p] = J);
    }
  else if (n)
    for (const b in n) {
      const p = Ge(b);
      if (vo(p)) {
        const g = n[b], x = i[p] = D(g) || V(g) ? { type: g } : ne({}, g);
        if (x) {
          const L = wo(Boolean, x.type), S = wo(String, x.type);
          x[
            0
            /* shouldCast */
          ] = L > -1, x[
            1
            /* shouldCastTrue */
          ] = S < 0 || L < S, (L > -1 || W(x, "default")) && s.push(p);
        }
      }
    }
  const d = [i, s];
  return Q(e) && a.set(e, d), d;
}
function vo(e) {
  return e[0] !== "$";
}
function go(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function ho(e, t) {
  return go(e) === go(t);
}
function wo(e, t) {
  return D(t) ? t.findIndex((r) => ho(r, e)) : V(t) && ho(t, e) ? 0 : -1;
}
const Yn = (e) => e[0] === "_" || e === "$stable", Ha = (e) => D(e) ? e.map(je) : [je(e)], pl = (e, t, r) => {
  if (t._n)
    return t;
  const a = Cs((...o) => (Bt.NODE_ENV, Ha(t(...o))), r);
  return a._c = !1, a;
}, Xn = (e, t, r) => {
  const a = e._ctx;
  for (const o in e) {
    if (Yn(o))
      continue;
    const n = e[o];
    if (V(n))
      t[o] = pl(o, n, a);
    else if (n != null) {
      const i = Ha(n);
      t[o] = () => i;
    }
  }
}, Jn = (e, t) => {
  const r = Ha(t);
  e.slots.default = () => r;
}, ml = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (e.slots = G(t), yr(t, "_", r)) : Xn(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Jn(e, t);
  yr(e.slots, Vr, 1);
}, vl = (e, t, r) => {
  const { vnode: a, slots: o } = e;
  let n = !0, i = J;
  if (a.shapeFlag & 32) {
    const s = t._;
    s ? r && s === 1 ? n = !1 : (ne(o, t), !r && s === 1 && delete o._) : (n = !t.$stable, Xn(t, o)), i = t;
  } else
    t && (Jn(e, t), i = { default: 1 });
  if (n)
    for (const s in o)
      !Yn(s) && i[s] == null && delete o[s];
};
function ua(e, t, r, a, o = !1) {
  if (D(e)) {
    e.forEach(
      (g, x) => ua(
        g,
        t && (D(t) ? t[x] : t),
        r,
        a,
        o
      )
    );
    return;
  }
  if (Xt(a) && !o)
    return;
  const n = a.shapeFlag & 4 ? Ga(a.component) || a.component.proxy : a.el, i = o ? null : n, { i: s, r: l } = e, d = t && t.r, b = s.refs === J ? s.refs = {} : s.refs, p = s.setupState;
  if (d != null && d !== l && (ae(d) ? (b[d] = null, W(p, d) && (p[d] = null)) : me(d) && (d.value = null)), V(l))
    tt(l, s, 12, [i, b]);
  else {
    const g = ae(l), x = me(l);
    if (g || x) {
      const L = () => {
        if (e.f) {
          const S = g ? W(p, l) ? p[l] : b[l] : l.value;
          o ? D(S) && Na(S, n) : D(S) ? S.includes(n) || S.push(n) : g ? (b[l] = [n], W(p, l) && (p[l] = b[l])) : (l.value = [n], e.k && (b[e.k] = l.value));
        } else
          g ? (b[l] = i, W(p, l) && (p[l] = i)) : x && (l.value = i, e.k && (b[e.k] = i));
      };
      i ? (L.id = -1, _e(L, r)) : L();
    }
  }
}
const _e = Ds;
function gl(e) {
  return hl(e);
}
function hl(e, t) {
  const r = fn();
  r.__VUE__ = !0;
  const {
    insert: a,
    remove: o,
    patchProp: n,
    createElement: i,
    createText: s,
    createComment: l,
    setText: d,
    setElementText: b,
    parentNode: p,
    nextSibling: g,
    setScopeId: x = Te,
    insertStaticContent: L
  } = e, S = (c, f, v, h = null, w = null, E = null, O = void 0, y = null, k = !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !Wt(c, f) && (h = kt(c), Se(c, w, E, !0), c = null), f.patchFlag === -2 && (k = !1, f.dynamicChildren = null);
    const { type: _, ref: T, shapeFlag: N } = f;
    switch (_) {
      case sr:
        U(c, f, v, h);
        break;
      case dt:
        R(c, f, v, h);
        break;
      case Zr:
        c == null && j(f, v, h, O);
        break;
      case ye:
        fe(
          c,
          f,
          v,
          h,
          w,
          E,
          O,
          y,
          k
        );
        break;
      default:
        N & 1 ? H(
          c,
          f,
          v,
          h,
          w,
          E,
          O,
          y,
          k
        ) : N & 6 ? Je(
          c,
          f,
          v,
          h,
          w,
          E,
          O,
          y,
          k
        ) : (N & 64 || N & 128) && _.process(
          c,
          f,
          v,
          h,
          w,
          E,
          O,
          y,
          k,
          at
        );
    }
    T != null && w && ua(T, c && c.ref, E, f || c, !f);
  }, U = (c, f, v, h) => {
    if (c == null)
      a(
        f.el = s(f.children),
        v,
        h
      );
    else {
      const w = f.el = c.el;
      f.children !== c.children && d(w, f.children);
    }
  }, R = (c, f, v, h) => {
    c == null ? a(
      f.el = l(f.children || ""),
      v,
      h
    ) : f.el = c.el;
  }, j = (c, f, v, h) => {
    [c.el, c.anchor] = L(
      c.children,
      f,
      v,
      h,
      c.el,
      c.anchor
    );
  }, F = ({ el: c, anchor: f }, v, h) => {
    let w;
    for (; c && c !== f; )
      w = g(c), a(c, v, h), c = w;
    a(f, v, h);
  }, P = ({ el: c, anchor: f }) => {
    let v;
    for (; c && c !== f; )
      v = g(c), o(c), c = v;
    o(f);
  }, H = (c, f, v, h, w, E, O, y, k) => {
    f.type === "svg" ? O = "svg" : f.type === "math" && (O = "mathml"), c == null ? C(
      f,
      v,
      h,
      w,
      E,
      O,
      y,
      k
    ) : Xe(
      c,
      f,
      w,
      E,
      O,
      y,
      k
    );
  }, C = (c, f, v, h, w, E, O, y) => {
    let k, _;
    const { props: T, shapeFlag: N, transition: u, dirs: m } = c;
    if (k = c.el = i(
      c.type,
      E,
      T && T.is,
      T
    ), N & 8 ? b(k, c.children) : N & 16 && q(
      c.children,
      k,
      null,
      h,
      w,
      Qr(c, E),
      O,
      y
    ), m && vt(c, null, h, "created"), z(k, c, c.scopeId, O, h), T) {
      for (const M in T)
        M !== "value" && !hr(M) && n(
          k,
          M,
          null,
          T[M],
          E,
          c.children,
          h,
          w,
          Re
        );
      "value" in T && n(k, "value", null, T.value, E), (_ = T.onVnodeBeforeMount) && Ve(_, h, c);
    }
    m && vt(c, null, h, "beforeMount");
    const I = wl(w, u);
    I && u.beforeEnter(k), a(k, f, v), ((_ = T && T.onVnodeMounted) || I || m) && _e(() => {
      _ && Ve(_, h, c), I && u.enter(k), m && vt(c, null, h, "mounted");
    }, w);
  }, z = (c, f, v, h, w) => {
    if (v && x(c, v), h)
      for (let E = 0; E < h.length; E++)
        x(c, h[E]);
    if (w) {
      let E = w.subTree;
      if (f === E) {
        const O = w.vnode;
        z(
          c,
          O,
          O.scopeId,
          O.slotScopeIds,
          w.parent
        );
      }
    }
  }, q = (c, f, v, h, w, E, O, y, k = 0) => {
    for (let _ = k; _ < c.length; _++) {
      const T = c[_] = y ? st(c[_]) : je(c[_]);
      S(
        null,
        T,
        f,
        v,
        h,
        w,
        E,
        O,
        y
      );
    }
  }, Xe = (c, f, v, h, w, E, O) => {
    const y = f.el = c.el;
    let { patchFlag: k, dynamicChildren: _, dirs: T } = f;
    k |= c.patchFlag & 16;
    const N = c.props || J, u = f.props || J;
    let m;
    if (v && gt(v, !1), (m = u.onVnodeBeforeUpdate) && Ve(m, v, f, c), T && vt(f, c, v, "beforeUpdate"), v && gt(v, !0), _ ? Ee(
      c.dynamicChildren,
      _,
      y,
      v,
      h,
      Qr(f, w),
      E
    ) : O || Y(
      c,
      f,
      y,
      null,
      v,
      h,
      Qr(f, w),
      E,
      !1
    ), k > 0) {
      if (k & 16)
        ke(
          y,
          f,
          N,
          u,
          v,
          h,
          w
        );
      else if (k & 2 && N.class !== u.class && n(y, "class", null, u.class, w), k & 4 && n(y, "style", N.style, u.style, w), k & 8) {
        const I = f.dynamicProps;
        for (let M = 0; M < I.length; M++) {
          const K = I[M], Z = N[K], ie = u[K];
          (ie !== Z || K === "value") && n(
            y,
            K,
            Z,
            ie,
            w,
            c.children,
            v,
            h,
            Re
          );
        }
      }
      k & 1 && c.children !== f.children && b(y, f.children);
    } else
      !O && _ == null && ke(
        y,
        f,
        N,
        u,
        v,
        h,
        w
      );
    ((m = u.onVnodeUpdated) || T) && _e(() => {
      m && Ve(m, v, f, c), T && vt(f, c, v, "updated");
    }, h);
  }, Ee = (c, f, v, h, w, E, O) => {
    for (let y = 0; y < f.length; y++) {
      const k = c[y], _ = f[y], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        k.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (k.type === ye || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wt(k, _) || // - In the case of a component, it could contain anything.
        k.shapeFlag & 70) ? p(k.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      S(
        k,
        _,
        T,
        null,
        h,
        w,
        E,
        O,
        !0
      );
    }
  }, ke = (c, f, v, h, w, E, O) => {
    if (v !== h) {
      if (v !== J)
        for (const y in v)
          !hr(y) && !(y in h) && n(
            c,
            y,
            v[y],
            null,
            O,
            f.children,
            w,
            E,
            Re
          );
      for (const y in h) {
        if (hr(y))
          continue;
        const k = h[y], _ = v[y];
        k !== _ && y !== "value" && n(
          c,
          y,
          _,
          k,
          O,
          f.children,
          w,
          E,
          Re
        );
      }
      "value" in h && n(c, "value", v.value, h.value, O);
    }
  }, fe = (c, f, v, h, w, E, O, y, k) => {
    const _ = f.el = c ? c.el : s(""), T = f.anchor = c ? c.anchor : s("");
    let { patchFlag: N, dynamicChildren: u, slotScopeIds: m } = f;
    m && (y = y ? y.concat(m) : m), c == null ? (a(_, v, h), a(T, v, h), q(
      f.children,
      v,
      T,
      w,
      E,
      O,
      y,
      k
    )) : N > 0 && N & 64 && u && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (Ee(
      c.dynamicChildren,
      u,
      v,
      w,
      E,
      O,
      y
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || w && f === w.subTree) && qn(
      c,
      f,
      !0
      /* shallow */
    )) : Y(
      c,
      f,
      v,
      T,
      w,
      E,
      O,
      y,
      k
    );
  }, Je = (c, f, v, h, w, E, O, y, k) => {
    f.slotScopeIds = y, c == null ? f.shapeFlag & 512 ? w.ctx.activate(
      f,
      v,
      h,
      O,
      k
    ) : Ut(
      f,
      v,
      h,
      w,
      E,
      O,
      k
    ) : lr(c, f, k);
  }, Ut = (c, f, v, h, w, E, O) => {
    const y = c.component = Il(
      c,
      h,
      w
    );
    if (Un(c) && (y.ctx.renderer = at), Sl(y), y.asyncDep) {
      if (w && w.registerDep(y, le), !c.el) {
        const k = y.subTree = be(dt);
        R(null, k, f, v);
      }
    } else
      le(
        y,
        c,
        f,
        v,
        w,
        E,
        O
      );
  }, lr = (c, f, v) => {
    const h = f.component = c.component;
    if (Rs(c, f, v))
      if (h.asyncDep && !h.asyncResolved) {
        X(h, f, v);
        return;
      } else
        h.next = f, ks(h.update), h.effect.dirty = !0, h.update();
    else
      f.el = c.el, h.vnode = f;
  }, le = (c, f, v, h, w, E, O) => {
    const y = () => {
      if (c.isMounted) {
        let { next: T, bu: N, u, parent: m, vnode: I } = c;
        {
          const ot = Qn(c);
          if (ot) {
            T && (T.el = I.el, X(c, T, O)), ot.asyncDep.then(() => {
              c.isUnmounted || y();
            });
            return;
          }
        }
        let M = T, K;
        gt(c, !1), T ? (T.el = I.el, X(c, T, O)) : T = I, N && Yr(N), (K = T.props && T.props.onVnodeBeforeUpdate) && Ve(K, m, T, I), gt(c, !0);
        const Z = Jr(c), ie = c.subTree;
        c.subTree = Z, S(
          ie,
          Z,
          // parent may have changed if it's in a teleport
          p(ie.el),
          // anchor may have changed if it's in a fragment
          kt(ie),
          c,
          w,
          E
        ), T.el = Z.el, M === null && Ps(c, Z.el), u && _e(u, w), (K = T.props && T.props.onVnodeUpdated) && _e(
          () => Ve(K, m, T, I),
          w
        );
      } else {
        let T;
        const { el: N, props: u } = f, { bm: m, m: I, parent: M } = c, K = Xt(f);
        if (gt(c, !1), m && Yr(m), !K && (T = u && u.onVnodeBeforeMount) && Ve(T, M, f), gt(c, !0), N && jt) {
          const Z = () => {
            c.subTree = Jr(c), jt(
              N,
              c.subTree,
              c,
              w,
              null
            );
          };
          K ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && Z()
          ) : Z();
        } else {
          const Z = c.subTree = Jr(c);
          S(
            null,
            Z,
            v,
            h,
            c,
            w,
            E
          ), f.el = Z.el;
        }
        if (I && _e(I, w), !K && (T = u && u.onVnodeMounted)) {
          const Z = f;
          _e(
            () => Ve(T, M, Z),
            w
          );
        }
        (f.shapeFlag & 256 || M && Xt(M.vnode) && M.vnode.shapeFlag & 256) && c.a && _e(c.a, w), c.isMounted = !0, f = v = h = null;
      }
    }, k = c.effect = new Sa(
      y,
      Te,
      () => Ua(_),
      c.scope
      // track it in component's effect scope
    ), _ = c.update = () => {
      k.dirty && k.run();
    };
    _.id = c.uid, gt(c, !0), _();
  }, X = (c, f, v) => {
    f.component = c;
    const h = c.vnode.props;
    c.vnode = f, c.next = null, bl(c, f.props, h, v), vl(c, f.children, v), ft(), fo(c), ut();
  }, Y = (c, f, v, h, w, E, O, y, k = !1) => {
    const _ = c && c.children, T = c ? c.shapeFlag : 0, N = f.children, { patchFlag: u, shapeFlag: m } = f;
    if (u > 0) {
      if (u & 128) {
        mt(
          _,
          N,
          v,
          h,
          w,
          E,
          O,
          y,
          k
        );
        return;
      } else if (u & 256) {
        ve(
          _,
          N,
          v,
          h,
          w,
          E,
          O,
          y,
          k
        );
        return;
      }
    }
    m & 8 ? (T & 16 && Re(_, w, E), N !== _ && b(v, N)) : T & 16 ? m & 16 ? mt(
      _,
      N,
      v,
      h,
      w,
      E,
      O,
      y,
      k
    ) : Re(_, w, E, !0) : (T & 8 && b(v, ""), m & 16 && q(
      N,
      v,
      h,
      w,
      E,
      O,
      y,
      k
    ));
  }, ve = (c, f, v, h, w, E, O, y, k) => {
    c = c || Tt, f = f || Tt;
    const _ = c.length, T = f.length, N = Math.min(_, T);
    let u;
    for (u = 0; u < N; u++) {
      const m = f[u] = k ? st(f[u]) : je(f[u]);
      S(
        c[u],
        m,
        v,
        null,
        w,
        E,
        O,
        y,
        k
      );
    }
    _ > T ? Re(
      c,
      w,
      E,
      !0,
      !1,
      N
    ) : q(
      f,
      v,
      h,
      w,
      E,
      O,
      y,
      k,
      N
    );
  }, mt = (c, f, v, h, w, E, O, y, k) => {
    let _ = 0;
    const T = f.length;
    let N = c.length - 1, u = T - 1;
    for (; _ <= N && _ <= u; ) {
      const m = c[_], I = f[_] = k ? st(f[_]) : je(f[_]);
      if (Wt(m, I))
        S(
          m,
          I,
          v,
          null,
          w,
          E,
          O,
          y,
          k
        );
      else
        break;
      _++;
    }
    for (; _ <= N && _ <= u; ) {
      const m = c[N], I = f[u] = k ? st(f[u]) : je(f[u]);
      if (Wt(m, I))
        S(
          m,
          I,
          v,
          null,
          w,
          E,
          O,
          y,
          k
        );
      else
        break;
      N--, u--;
    }
    if (_ > N) {
      if (_ <= u) {
        const m = u + 1, I = m < T ? f[m].el : h;
        for (; _ <= u; )
          S(
            null,
            f[_] = k ? st(f[_]) : je(f[_]),
            v,
            I,
            w,
            E,
            O,
            y,
            k
          ), _++;
      }
    } else if (_ > u)
      for (; _ <= N; )
        Se(c[_], w, E, !0), _++;
    else {
      const m = _, I = _, M = /* @__PURE__ */ new Map();
      for (_ = I; _ <= u; _++) {
        const Oe = f[_] = k ? st(f[_]) : je(f[_]);
        Oe.key != null && M.set(Oe.key, _);
      }
      let K, Z = 0;
      const ie = u - I + 1;
      let ot = !1, Kr = 0;
      const Ht = new Array(ie);
      for (_ = 0; _ < ie; _++)
        Ht[_] = 0;
      for (_ = m; _ <= N; _++) {
        const Oe = c[_];
        if (Z >= ie) {
          Se(Oe, w, E, !0);
          continue;
        }
        let Ue;
        if (Oe.key != null)
          Ue = M.get(Oe.key);
        else
          for (K = I; K <= u; K++)
            if (Ht[K - I] === 0 && Wt(Oe, f[K])) {
              Ue = K;
              break;
            }
        Ue === void 0 ? Se(Oe, w, E, !0) : (Ht[Ue - I] = _ + 1, Ue >= Kr ? Kr = Ue : ot = !0, S(
          Oe,
          f[Ue],
          v,
          null,
          w,
          E,
          O,
          y,
          k
        ), Z++);
      }
      const Za = ot ? _l(Ht) : Tt;
      for (K = Za.length - 1, _ = ie - 1; _ >= 0; _--) {
        const Oe = I + _, Ue = f[Oe], eo = Oe + 1 < T ? f[Oe + 1].el : h;
        Ht[_] === 0 ? S(
          null,
          Ue,
          v,
          eo,
          w,
          E,
          O,
          y,
          k
        ) : ot && (K < 0 || _ !== Za[K] ? qe(Ue, v, eo, 2) : K--);
      }
    }
  }, qe = (c, f, v, h, w = null) => {
    const { el: E, type: O, transition: y, children: k, shapeFlag: _ } = c;
    if (_ & 6) {
      qe(c.component.subTree, f, v, h);
      return;
    }
    if (_ & 128) {
      c.suspense.move(f, v, h);
      return;
    }
    if (_ & 64) {
      O.move(c, f, v, at);
      return;
    }
    if (O === ye) {
      a(E, f, v);
      for (let N = 0; N < k.length; N++)
        qe(k[N], f, v, h);
      a(c.anchor, f, v);
      return;
    }
    if (O === Zr) {
      F(c, f, v);
      return;
    }
    if (h !== 2 && _ & 1 && y)
      if (h === 0)
        y.beforeEnter(E), a(E, f, v), _e(() => y.enter(E), w);
      else {
        const { leave: N, delayLeave: u, afterLeave: m } = y, I = () => a(E, f, v), M = () => {
          N(E, () => {
            I(), m && m();
          });
        };
        u ? u(E, I, M) : M();
      }
    else
      a(E, f, v);
  }, Se = (c, f, v, h = !1, w = !1) => {
    const {
      type: E,
      props: O,
      ref: y,
      children: k,
      dynamicChildren: _,
      shapeFlag: T,
      patchFlag: N,
      dirs: u
    } = c;
    if (y != null && ua(y, null, v, c, !0), T & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const m = T & 1 && u, I = !Xt(c);
    let M;
    if (I && (M = O && O.onVnodeBeforeUnmount) && Ve(M, f, c), T & 6)
      Qa(c.component, v, h);
    else {
      if (T & 128) {
        c.suspense.unmount(v, h);
        return;
      }
      m && vt(c, null, f, "beforeUnmount"), T & 64 ? c.type.remove(
        c,
        f,
        v,
        w,
        at,
        h
      ) : _ && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (E !== ye || N > 0 && N & 64) ? Re(
        _,
        f,
        v,
        !1,
        !0
      ) : (E === ye && N & 384 || !w && T & 16) && Re(k, f, v), h && cr(c);
    }
    (I && (M = O && O.onVnodeUnmounted) || m) && _e(() => {
      M && Ve(M, f, c), m && vt(c, null, f, "unmounted");
    }, v);
  }, cr = (c) => {
    const { type: f, el: v, anchor: h, transition: w } = c;
    if (f === ye) {
      Gr(v, h);
      return;
    }
    if (f === Zr) {
      P(c);
      return;
    }
    const E = () => {
      o(v), w && !w.persisted && w.afterLeave && w.afterLeave();
    };
    if (c.shapeFlag & 1 && w && !w.persisted) {
      const { leave: O, delayLeave: y } = w, k = () => O(v, E);
      y ? y(c.el, E, k) : k();
    } else
      E();
  }, Gr = (c, f) => {
    let v;
    for (; c !== f; )
      v = g(c), o(c), c = v;
    o(f);
  }, Qa = (c, f, v) => {
    const { bum: h, scope: w, update: E, subTree: O, um: y } = c;
    h && Yr(h), w.stop(), E && (E.active = !1, Se(O, c, f, v)), y && _e(y, f), _e(() => {
      c.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, Re = (c, f, v, h = !1, w = !1, E = 0) => {
    for (let O = E; O < c.length; O++)
      Se(c[O], f, v, h, w);
  }, kt = (c) => c.shapeFlag & 6 ? kt(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : g(c.anchor || c.el), dr = (c, f, v) => {
    c == null ? f._vnode && Se(f._vnode, null, null, !0) : S(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      v
    ), fo(), zn(), f._vnode = c;
  }, at = {
    p: S,
    um: Se,
    m: qe,
    r: cr,
    mt: Ut,
    mc: q,
    pc: Y,
    pbc: Ee,
    n: kt,
    o: e
  };
  let Vt, jt;
  return t && ([Vt, jt] = t(
    at
  )), {
    render: dr,
    hydrate: Vt,
    createApp: fl(dr, Vt)
  };
}
function Qr({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function gt({ effect: e, update: t }, r) {
  e.allowRecurse = t.allowRecurse = r;
}
function wl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function qn(e, t, r = !1) {
  const a = e.children, o = t.children;
  if (D(a) && D(o))
    for (let n = 0; n < a.length; n++) {
      const i = a[n];
      let s = o[n];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = o[n] = st(o[n]), s.el = i.el), r || qn(i, s)), s.type === sr && (s.el = i.el);
    }
}
function _l(e) {
  const t = e.slice(), r = [0];
  let a, o, n, i, s;
  const l = e.length;
  for (a = 0; a < l; a++) {
    const d = e[a];
    if (d !== 0) {
      if (o = r[r.length - 1], e[o] < d) {
        t[a] = o, r.push(a);
        continue;
      }
      for (n = 0, i = r.length - 1; n < i; )
        s = n + i >> 1, e[r[s]] < d ? n = s + 1 : i = s;
      d < e[r[n]] && (n > 0 && (t[a] = r[n - 1]), r[n] = a);
    }
  }
  for (n = r.length, i = r[n - 1]; n-- > 0; )
    r[n] = i, i = t[i];
  return r;
}
function Qn(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Qn(t);
}
const yl = (e) => e.__isTeleport, ye = Symbol.for("v-fgt"), sr = Symbol.for("v-txt"), dt = Symbol.for("v-cmt"), Zr = Symbol.for("v-stc"), Qt = [];
let ze = null;
function Ie(e = !1) {
  Qt.push(ze = e ? null : []);
}
function xl() {
  Qt.pop(), ze = Qt[Qt.length - 1] || null;
}
let ar = 1;
function _o(e) {
  ar += e;
}
function Zn(e) {
  return e.dynamicChildren = ar > 0 ? ze || Tt : null, xl(), ar > 0 && ze && ze.push(e), e;
}
function Me(e, t, r, a, o, n) {
  return Zn(
    re(
      e,
      t,
      r,
      a,
      o,
      n,
      !0
    )
  );
}
function ei(e, t, r, a, o) {
  return Zn(
    be(
      e,
      t,
      r,
      a,
      o,
      !0
    )
  );
}
function Ir(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Vr = "__vInternal", ti = ({ key: e }) => e ?? null, wr = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? ae(e) || me(e) || V(e) ? { i: he, r: e, k: t, f: !!r } : e : null);
function re(e, t = null, r = null, a = 0, o = null, n = e === ye ? 0 : 1, i = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ti(t),
    ref: t && wr(t),
    scopeId: Dr,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: n,
    patchFlag: a,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: he
  };
  return s ? ($a(l, r), n & 128 && e.normalize(l)) : r && (l.shapeFlag |= ae(r) ? 8 : 16), ar > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && ze.push(l), l;
}
const be = El;
function El(e, t = null, r = null, a = 0, o = null, n = !1) {
  if ((!e || e === zs) && (e = dt), Ir(e)) {
    const s = Rt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && $a(s, r), ar > 0 && !n && ze && (s.shapeFlag & 6 ? ze[ze.indexOf(e)] = s : ze.push(s)), s.patchFlag |= -2, s;
  }
  if (Ml(e) && (e = e.__vccOpts), t) {
    t = kl(t);
    let { class: s, style: l } = t;
    s && !ae(s) && (t.class = Ke(s)), Q(l) && (Tn(l) && !D(l) && (l = ne({}, l)), t.style = Ia(l));
  }
  const i = ae(e) ? 1 : Ms(e) ? 128 : yl(e) ? 64 : Q(e) ? 4 : V(e) ? 2 : 0;
  return re(
    e,
    t,
    r,
    a,
    o,
    i,
    n,
    !0
  );
}
function kl(e) {
  return e ? Tn(e) || Vr in e ? ne({}, e) : e : null;
}
function Rt(e, t, r = !1) {
  const { props: a, ref: o, patchFlag: n, children: i } = e, s = t ? Ol(a || {}, t) : a;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && ti(s),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && o ? D(o) ? o.concat(wr(t)) : [o, wr(t)] : wr(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ye ? n === -1 ? 16 : n | 16 : n,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Rt(e.ssContent),
    ssFallback: e.ssFallback && Rt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function ri(e = " ", t = 0) {
  return be(sr, null, e, t);
}
function _r(e = "", t = !1) {
  return t ? (Ie(), ei(dt, null, e)) : be(dt, null, e);
}
function je(e) {
  return e == null || typeof e == "boolean" ? be(dt) : D(e) ? be(
    ye,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? st(e) : be(sr, null, String(e));
}
function st(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Rt(e);
}
function $a(e, t) {
  let r = 0;
  const { shapeFlag: a } = e;
  if (t == null)
    t = null;
  else if (D(t))
    r = 16;
  else if (typeof t == "object")
    if (a & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), $a(e, o()), o._c && (o._d = !0));
      return;
    } else {
      r = 32;
      const o = t._;
      !o && !(Vr in t) ? t._ctx = he : o === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    V(t) ? (t = { default: t, _ctx: he }, r = 32) : (t = String(t), a & 64 ? (r = 16, t = [ri(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function Ol(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    for (const o in a)
      if (o === "class")
        t.class !== a.class && (t.class = Ke([t.class, a.class]));
      else if (o === "style")
        t.style = Ia([t.style, a.style]);
      else if (Ar(o)) {
        const n = t[o], i = a[o];
        i && n !== i && !(D(n) && n.includes(i)) && (t[o] = n ? [].concat(n, i) : i);
      } else
        o !== "" && (t[o] = a[o]);
  }
  return t;
}
function Ve(e, t, r, a = null) {
  De(e, t, 7, [
    r,
    a
  ]);
}
const Nl = Wn();
let Tl = 0;
function Il(e, t, r) {
  const a = e.type, o = (t ? t.appContext : e.appContext) || Nl, n = {
    uid: Tl++,
    vnode: e,
    type: a,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new pn(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Bn(a, o),
    emitsOptions: Dn(a, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: J,
    // inheritAttrs
    inheritAttrs: a.inheritAttrs,
    // state
    ctx: J,
    data: J,
    props: J,
    attrs: J,
    slots: J,
    refs: J,
    setupState: J,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return n.ctx = { _: n }, n.root = t ? t.root : n, n.emit = Ts.bind(null, n), e.ce && e.ce(n), n;
}
let de = null;
const jr = () => de || he;
let Wa, ba;
{
  const e = fn(), t = (r, a) => {
    let o;
    return (o = e[r]) || (o = e[r] = []), o.push(a), (n) => {
      o.length > 1 ? o.forEach((i) => i(n)) : o[0](n);
    };
  };
  Wa = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => de = r
  ), ba = t(
    "__VUE_SSR_SETTERS__",
    (r) => Hr = r
  );
}
const Pt = (e) => {
  Wa(e), e.scope.on();
}, xt = () => {
  de && de.scope.off(), Wa(null);
};
function ai(e) {
  return e.vnode.shapeFlag & 4;
}
let Hr = !1;
function Sl(e, t = !1) {
  t && ba(t);
  const { props: r, children: a } = e.vnode, o = ai(e);
  ul(e, r, o, t), ml(e, a);
  const n = o ? Cl(e, t) : void 0;
  return t && ba(!1), n;
}
function Cl(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = In(new Proxy(e.ctx, rl));
  const { setup: a } = r;
  if (a) {
    const o = e.setupContext = a.length > 1 ? Ll(e) : null;
    Pt(e), ft();
    const n = tt(
      a,
      e,
      0,
      [
        e.props,
        o
      ]
    );
    if (ut(), xt(), sn(n)) {
      if (n.then(xt, xt), t)
        return n.then((i) => {
          yo(e, i, t);
        }).catch((i) => {
          zr(i, e, 0);
        });
      e.asyncDep = n;
    } else
      yo(e, n, t);
  } else
    oi(e, t);
}
function yo(e, t, r) {
  V(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Q(t) && (e.setupState = Cn(t)), oi(e, r);
}
let xo;
function oi(e, t, r) {
  const a = e.type;
  if (!e.render) {
    if (!t && xo && !a.render) {
      const o = a.template || ja(e).template;
      if (o) {
        const { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: s, compilerOptions: l } = a, d = ne(
          ne(
            {
              isCustomElement: n,
              delimiters: s
            },
            i
          ),
          l
        );
        a.render = xo(o, d);
      }
    }
    e.render = a.render || Te;
  }
  {
    Pt(e), ft();
    try {
      nl(e);
    } finally {
      ut(), xt();
    }
  }
}
function Al(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, r) {
        return xe(e, "get", "$attrs"), t[r];
      }
    }
  ));
}
function Ll(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    get attrs() {
      return Al(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ga(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Cn(In(e.exposed)), {
      get(t, r) {
        if (r in t)
          return t[r];
        if (r in Jt)
          return Jt[r](e);
      },
      has(t, r) {
        return r in t || r in Jt;
      }
    }));
}
const Rl = /(?:^|[-_])(\w)/g, Pl = (e) => e.replace(Rl, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function zl(e, t = !0) {
  return V(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function ni(e, t, r = !1) {
  let a = zl(t);
  if (!a && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (a = o[1]);
  }
  if (!a && e && e.parent) {
    const o = (n) => {
      for (const i in n)
        if (n[i] === t)
          return i;
    };
    a = o(
      e.components || e.parent.type.components
    ) || o(e.appContext.components);
  }
  return a ? Pl(a) : r ? "App" : "Anonymous";
}
function Ml(e) {
  return V(e) && "__vccOpts" in e;
}
const Ot = (e, t) => fs(e, t, Hr);
function ii(e, t, r) {
  const a = arguments.length;
  return a === 2 ? Q(t) && !D(t) ? Ir(t) ? be(e, null, [t]) : be(e, t) : be(e, null, t) : (a > 3 ? r = Array.prototype.slice.call(arguments, 2) : a === 3 && Ir(r) && (r = [r]), be(e, t, r));
}
const Dl = "3.4.5", Fl = "http://www.w3.org/2000/svg", Ul = "http://www.w3.org/1998/Math/MathML", lt = typeof document < "u" ? document : null, Eo = lt && /* @__PURE__ */ lt.createElement("template"), Vl = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, a) => {
    const o = t === "svg" ? lt.createElementNS(Fl, e) : t === "mathml" ? lt.createElementNS(Ul, e) : lt.createElement(e, r ? { is: r } : void 0);
    return e === "select" && a && a.multiple != null && o.setAttribute("multiple", a.multiple), o;
  },
  createText: (e) => lt.createTextNode(e),
  createComment: (e) => lt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => lt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, r, a, o, n) {
    const i = r ? r.previousSibling : t.lastChild;
    if (o && (o === n || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), r), !(o === n || !(o = o.nextSibling)); )
        ;
    else {
      Eo.innerHTML = a === "svg" ? `<svg>${e}</svg>` : a === "mathml" ? `<math>${e}</math>` : e;
      const s = Eo.content;
      if (a === "svg" || a === "mathml") {
        const l = s.firstChild;
        for (; l.firstChild; )
          s.appendChild(l.firstChild);
        s.removeChild(l);
      }
      t.insertBefore(s, r);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      r ? r.previousSibling : t.lastChild
    ];
  }
}, jl = Symbol("_vtc");
function Hl(e, t, r) {
  const a = e[jl];
  a && (t = (t ? [t, ...a] : [...a]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const $l = Symbol("_vod"), Wl = Symbol("");
function Gl(e, t, r) {
  const a = e.style, o = ae(r);
  if (r && !o) {
    if (t && !ae(t))
      for (const n in t)
        r[n] == null && pa(a, n, "");
    for (const n in r)
      pa(a, n, r[n]);
  } else {
    const n = a.display;
    if (o) {
      if (t !== r) {
        const i = a[Wl];
        i && (r += ";" + i), a.cssText = r;
      }
    } else
      t && e.removeAttribute("style");
    $l in e && (a.display = n);
  }
}
const ko = /\s*!important$/;
function pa(e, t, r) {
  if (D(r))
    r.forEach((a) => pa(e, t, a));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const a = Kl(e, t);
    ko.test(r) ? e.setProperty(
      Ae(a),
      r.replace(ko, ""),
      "important"
    ) : e[a] = r;
  }
}
const Oo = ["Webkit", "Moz", "ms"], ea = {};
function Kl(e, t) {
  const r = ea[t];
  if (r)
    return r;
  let a = Ge(t);
  if (a !== "filter" && a in e)
    return ea[t] = a;
  a = dn(a);
  for (let o = 0; o < Oo.length; o++) {
    const n = Oo[o] + a;
    if (n in e)
      return ea[t] = n;
  }
  return t;
}
const No = "http://www.w3.org/1999/xlink";
function Bl(e, t, r, a, o) {
  if (a && t.startsWith("xlink:"))
    r == null ? e.removeAttributeNS(No, t.slice(6, t.length)) : e.setAttributeNS(No, t, r);
  else {
    const n = ji(t);
    r == null || n && !un(r) ? e.removeAttribute(t) : e.setAttribute(t, n ? "" : r);
  }
}
function Yl(e, t, r, a, o, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    a && i(a, o, n), e[t] = r ?? "";
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    e._value = r;
    const d = s === "OPTION" ? e.getAttribute("value") : e.value, b = r ?? "";
    d !== b && (e.value = b), r == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (r === "" || r == null) {
    const d = typeof e[t];
    d === "boolean" ? r = un(r) : r == null && d === "string" ? (r = "", l = !0) : d === "number" && (r = 0, l = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  l && e.removeAttribute(t);
}
function Xl(e, t, r, a) {
  e.addEventListener(t, r, a);
}
function Jl(e, t, r, a) {
  e.removeEventListener(t, r, a);
}
const To = Symbol("_vei");
function ql(e, t, r, a, o = null) {
  const n = e[To] || (e[To] = {}), i = n[t];
  if (a && i)
    i.value = a;
  else {
    const [s, l] = Ql(t);
    if (a) {
      const d = n[t] = tc(a, o);
      Xl(e, s, d, l);
    } else
      i && (Jl(e, s, i, l), n[t] = void 0);
  }
}
const Io = /(?:Once|Passive|Capture)$/;
function Ql(e) {
  let t;
  if (Io.test(e)) {
    t = {};
    let a;
    for (; a = e.match(Io); )
      e = e.slice(0, e.length - a[0].length), t[a[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ae(e.slice(2)), t];
}
let ta = 0;
const Zl = /* @__PURE__ */ Promise.resolve(), ec = () => ta || (Zl.then(() => ta = 0), ta = Date.now());
function tc(e, t) {
  const r = (a) => {
    if (!a._vts)
      a._vts = Date.now();
    else if (a._vts <= r.attached)
      return;
    De(
      rc(a, r.value),
      t,
      5,
      [a]
    );
  };
  return r.value = e, r.attached = ec(), r;
}
function rc(e, t) {
  if (D(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = !0;
    }, t.map((a) => (o) => !o._stopped && a && a(o));
  } else
    return t;
}
const So = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ac = (e, t, r, a, o, n, i, s, l) => {
  const d = o === "svg";
  t === "class" ? Hl(e, a, d) : t === "style" ? Gl(e, r, a) : Ar(t) ? Oa(t) || ql(e, t, r, a, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : oc(e, t, a, d)) ? Yl(
    e,
    t,
    a,
    n,
    i,
    s,
    l
  ) : (t === "true-value" ? e._trueValue = a : t === "false-value" && (e._falseValue = a), Bl(e, t, a, d));
};
function oc(e, t, r, a) {
  if (a)
    return !!(t === "innerHTML" || t === "textContent" || t in e && So(t) && V(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return So(t) && ae(r) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Dt(e, t) {
  const r = /* @__PURE__ */ Ye(e);
  class a extends Ka {
    constructor(n) {
      super(r, n, t);
    }
  }
  return a.def = r, a;
}
const nc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Ka extends nc {
  constructor(t, r = {}, a) {
    super(), this._def = t, this._props = r, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && a ? a(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Rn(() => {
      this._connected || (Ao(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let a = 0; a < this.attributes.length; a++)
      this._setAttr(this.attributes[a].name);
    this._ob = new MutationObserver((a) => {
      for (const o of a)
        this._setAttr(o.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (a, o = !1) => {
      const { props: n, styles: i } = a;
      let s;
      if (n && !D(n))
        for (const l in n) {
          const d = n[l];
          (d === Number || d && d.type === Number) && (l in this._props && (this._props[l] = to(this._props[l])), (s || (s = /* @__PURE__ */ Object.create(null)))[Ge(l)] = !0);
        }
      this._numberProps = s, o && this._resolveProps(a), this._applyStyles(i), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((a) => t(a, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: r } = t, a = D(r) ? r : Object.keys(r || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && a.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of a.map(Ge))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(n) {
          this._setProp(o, n);
        }
      });
  }
  _setAttr(t) {
    let r = this.getAttribute(t);
    const a = Ge(t);
    this._numberProps && this._numberProps[a] && (r = to(r)), this._setProp(a, r, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, r, a = !0, o = !0) {
    r !== this._props[t] && (this._props[t] = r, o && this._instance && this._update(), a && (r === !0 ? this.setAttribute(Ae(t), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(Ae(t), r + "") : r || this.removeAttribute(Ae(t))));
  }
  _update() {
    Ao(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = be(this._def, ne({}, this._props));
    return this._instance || (t.ce = (r) => {
      this._instance = r, r.isCE = !0;
      const a = (n, i) => {
        this.dispatchEvent(
          new CustomEvent(n, {
            detail: i
          })
        );
      };
      r.emit = (n, ...i) => {
        a(n, i), Ae(n) !== n && a(Ae(n), i);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Ka) {
          r.parent = o._instance, r.provides = o._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((r) => {
      const a = document.createElement("style");
      a.textContent = r, this.shadowRoot.appendChild(a);
    });
  }
}
const ic = /* @__PURE__ */ ne({ patchProp: ac }, Vl);
let Co;
function sc() {
  return Co || (Co = gl(ic));
}
const Ao = (...e) => {
  sc().render(...e);
};
/*!
  * shared v9.8.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const ma = typeof window < "u", bt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), lc = (e, t, r) => cc({ l: e, k: t, s: r }), cc = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), se = (e) => typeof e == "number" && isFinite(e), dc = (e) => li(e) === "[object Date]", Sr = (e) => li(e) === "[object RegExp]", $r = (e) => $(e) && Object.keys(e).length === 0, pe = Object.assign;
let Lo;
const Ba = () => Lo || (Lo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ro(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const fc = Object.prototype.hasOwnProperty;
function or(e, t) {
  return fc.call(e, t);
}
const oe = Array.isArray, ee = (e) => typeof e == "function", A = (e) => typeof e == "string", te = (e) => typeof e == "boolean", B = (e) => e !== null && typeof e == "object", uc = (e) => B(e) && ee(e.then) && ee(e.catch), si = Object.prototype.toString, li = (e) => si.call(e), $ = (e) => {
  if (!B(e))
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t.constructor === Object;
}, bc = (e) => e == null ? "" : oe(e) || $(e) && e.toString === si ? JSON.stringify(e, null, 2) : String(e);
function pc(e, t = "") {
  return e.reduce((r, a, o) => o === 0 ? r + a : r + t + a, "");
}
function Ya(e) {
  let t = e;
  return () => ++t;
}
function mc(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const gr = (e) => !B(e) || oe(e);
function Zt(e, t) {
  if (gr(e) || gr(t))
    throw new Error("Invalid value");
  for (const r in e)
    or(e, r) && (gr(e[r]) || gr(t[r]) ? t[r] = e[r] : Zt(e[r], t[r]));
}
/*!
  * message-compiler v9.8.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const vc = /\{([0-9a-zA-Z]+)\}/g;
function gc(e, ...t) {
  return t.length === 1 && hc(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(vc, (r, a) => t.hasOwnProperty(a) ? t[a] : "");
}
const hc = (e) => e !== null && typeof e == "object", ce = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
}, wc = {
  // tokenizer error messages
  [ce.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [ce.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [ce.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [ce.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [ce.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [ce.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [ce.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [ce.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [ce.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [ce.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [ce.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [ce.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [ce.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [ce.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [ce.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [ce.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function ci(e, t, r = {}) {
  const { domain: a, messages: o, args: n } = r, i = gc((o || wc)[e] || "", ...n || []), s = new SyntaxError(String(i));
  return s.code = e, t && (s.location = t), s.domain = a, s;
}
function _c() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Ba().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const pt = [];
pt[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
pt[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
pt[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pt[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pt[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pt[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pt[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const yc = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function xc(e) {
  return yc.test(e);
}
function Ec(e) {
  const t = e.charCodeAt(0), r = e.charCodeAt(e.length - 1);
  return t === r && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function kc(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function Oc(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : xc(t) ? Ec(t) : "*" + t;
}
function Nc(e) {
  const t = [];
  let r = -1, a = 0, o = 0, n, i, s, l, d, b, p;
  const g = [];
  g[
    0
    /* Actions.APPEND */
  ] = () => {
    i === void 0 ? i = s : i += s;
  }, g[
    1
    /* Actions.PUSH */
  ] = () => {
    i !== void 0 && (t.push(i), i = void 0);
  }, g[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    g[
      0
      /* Actions.APPEND */
    ](), o++;
  }, g[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (o > 0)
      o--, a = 4, g[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (o = 0, i === void 0 || (i = Oc(i), i === !1))
        return !1;
      g[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function x() {
    const L = e[r + 1];
    if (a === 5 && L === "'" || a === 6 && L === '"')
      return r++, s = "\\" + L, g[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; a !== null; )
    if (r++, n = e[r], !(n === "\\" && x())) {
      if (l = kc(n), p = pt[a], d = p[l] || p.l || 8, d === 8 || (a = d[0], d[1] !== void 0 && (b = g[d[1]], b && (s = n, b() === !1))))
        return;
      if (a === 7)
        return t;
    }
}
const Po = /* @__PURE__ */ new Map();
function Tc(e, t) {
  return B(e) ? e[t] : null;
}
function Ic(e, t) {
  if (!B(e))
    return null;
  let r = Po.get(t);
  if (r || (r = Nc(t), r && Po.set(t, r)), !r)
    return null;
  const a = r.length;
  let o = e, n = 0;
  for (; n < a; ) {
    const i = o[r[n]];
    if (i === void 0 || ee(o))
      return null;
    o = i, n++;
  }
  return o;
}
const Sc = (e) => e, Cc = (e) => "", Ac = "text", Lc = (e) => e.length === 0 ? "" : pc(e), Rc = bc;
function zo(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Pc(e) {
  const t = se(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (se(e.named.count) || se(e.named.n)) ? se(e.named.count) ? e.named.count : se(e.named.n) ? e.named.n : t : t;
}
function zc(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Mc(e = {}) {
  const t = e.locale, r = Pc(e), a = B(e.pluralRules) && A(t) && ee(e.pluralRules[t]) ? e.pluralRules[t] : zo, o = B(e.pluralRules) && A(t) && ee(e.pluralRules[t]) ? zo : void 0, n = (R) => R[a(r, R.length, o)], i = e.list || [], s = (R) => i[R], l = e.named || {};
  se(e.pluralIndex) && zc(r, l);
  const d = (R) => l[R];
  function b(R) {
    const j = ee(e.messages) ? e.messages(R) : B(e.messages) ? e.messages[R] : !1;
    return j || (e.parent ? e.parent.message(R) : Cc);
  }
  const p = (R) => e.modifiers ? e.modifiers[R] : Sc, g = $(e.processor) && ee(e.processor.normalize) ? e.processor.normalize : Lc, x = $(e.processor) && ee(e.processor.interpolate) ? e.processor.interpolate : Rc, L = $(e.processor) && A(e.processor.type) ? e.processor.type : Ac, U = {
    list: s,
    named: d,
    plural: n,
    linked: (R, ...j) => {
      const [F, P] = j;
      let H = "text", C = "";
      j.length === 1 ? B(F) ? (C = F.modifier || C, H = F.type || H) : A(F) && (C = F || C) : j.length === 2 && (A(F) && (C = F || C), A(P) && (H = P || H));
      const z = b(R)(U), q = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        H === "vnode" && oe(z) && C ? z[0] : z
      );
      return C ? p(C)(q, H) : q;
    },
    message: b,
    type: L,
    interpolate: x,
    normalize: g,
    values: pe({}, i, l)
  };
  return U;
}
let nr = null;
function Dc(e) {
  nr = e;
}
function Fc(e, t, r) {
  nr && nr.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: r
  });
}
const Uc = /* @__PURE__ */ Vc(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function Vc(e) {
  return (t) => nr && nr.emit(e, t);
}
const jc = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  __EXTEND_POINT__: 8
}, di = ce.__EXTEND_POINT__, ht = Ya(di), We = {
  INVALID_ARGUMENT: di,
  INVALID_DATE_ARGUMENT: ht(),
  INVALID_ISO_DATE_ARGUMENT: ht(),
  NOT_SUPPORT_NON_STRING_MESSAGE: ht(),
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: ht(),
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: ht(),
  NOT_SUPPORT_LOCALE_TYPE: ht(),
  __EXTEND_POINT__: ht()
  // 25
};
function Ze(e) {
  return ci(e, null, void 0);
}
function Xa(e, t) {
  return t.locale != null ? Mo(t.locale) : Mo(e.locale);
}
let ra;
function Mo(e) {
  if (A(e))
    return e;
  if (ee(e)) {
    if (e.resolvedOnce && ra != null)
      return ra;
    if (e.constructor.name === "Function") {
      const t = e();
      if (uc(t))
        throw Ze(We.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return ra = t;
    } else
      throw Ze(We.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Ze(We.NOT_SUPPORT_LOCALE_TYPE);
}
function Hc(e, t, r) {
  return [.../* @__PURE__ */ new Set([
    r,
    ...oe(t) ? t : B(t) ? Object.keys(t) : A(t) ? [t] : [r]
  ])];
}
function fi(e, t, r) {
  const a = A(r) ? r : Cr, o = e;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let n = o.__localeChainCache.get(a);
  if (!n) {
    n = [];
    let i = [r];
    for (; oe(i); )
      i = Do(n, i, t);
    const s = oe(t) || !$(t) ? t : t.default ? t.default : null;
    i = A(s) ? [s] : s, oe(i) && Do(n, i, !1), o.__localeChainCache.set(a, n);
  }
  return n;
}
function Do(e, t, r) {
  let a = !0;
  for (let o = 0; o < t.length && te(a); o++) {
    const n = t[o];
    A(n) && (a = $c(e, t[o], r));
  }
  return a;
}
function $c(e, t, r) {
  let a;
  const o = t.split("-");
  do {
    const n = o.join("-");
    a = Wc(e, n, r), o.splice(-1, 1);
  } while (o.length && a === !0);
  return a;
}
function Wc(e, t, r) {
  let a = !1;
  if (!e.includes(t) && (a = !0, t)) {
    a = t[t.length - 1] !== "!";
    const o = t.replace(/!/g, "");
    e.push(o), (oe(r) || $(r)) && r[o] && (a = r[o]);
  }
  return a;
}
const Gc = "9.8.0", Wr = -1, Cr = "en-US", Fo = "", Uo = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Kc() {
  return {
    upper: (e, t) => t === "text" && A(e) ? e.toUpperCase() : t === "vnode" && B(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && A(e) ? e.toLowerCase() : t === "vnode" && B(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && A(e) ? Uo(e) : t === "vnode" && B(e) && "__v_isVNode" in e ? Uo(e.children) : e
  };
}
let Bc, ui;
function Yc(e) {
  ui = e;
}
let bi;
function Xc(e) {
  bi = e;
}
let pi = null;
const Jc = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  pi = e;
}, qc = /* @__NO_SIDE_EFFECTS__ */ () => pi;
let mi = null;
const Vo = (e) => {
  mi = e;
}, Qc = () => mi;
let jo = 0;
function Zc(e = {}) {
  const t = ee(e.onWarn) ? e.onWarn : mc, r = A(e.version) ? e.version : Gc, a = A(e.locale) || ee(e.locale) ? e.locale : Cr, o = ee(a) ? Cr : a, n = oe(e.fallbackLocale) || $(e.fallbackLocale) || A(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : o, i = $(e.messages) ? e.messages : { [o]: {} }, s = $(e.datetimeFormats) ? e.datetimeFormats : { [o]: {} }, l = $(e.numberFormats) ? e.numberFormats : { [o]: {} }, d = pe({}, e.modifiers || {}, Kc()), b = e.pluralRules || {}, p = ee(e.missing) ? e.missing : null, g = te(e.missingWarn) || Sr(e.missingWarn) ? e.missingWarn : !0, x = te(e.fallbackWarn) || Sr(e.fallbackWarn) ? e.fallbackWarn : !0, L = !!e.fallbackFormat, S = !!e.unresolving, U = ee(e.postTranslation) ? e.postTranslation : null, R = $(e.processor) ? e.processor : null, j = te(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, F = !!e.escapeParameter, P = ee(e.messageCompiler) ? e.messageCompiler : Bc, H = ee(e.messageResolver) ? e.messageResolver : ui || Tc, C = ee(e.localeFallbacker) ? e.localeFallbacker : bi || Hc, z = B(e.fallbackContext) ? e.fallbackContext : void 0, q = e, Xe = B(q.__datetimeFormatters) ? q.__datetimeFormatters : /* @__PURE__ */ new Map(), Ee = B(q.__numberFormatters) ? q.__numberFormatters : /* @__PURE__ */ new Map(), ke = B(q.__meta) ? q.__meta : {};
  jo++;
  const fe = {
    version: r,
    cid: jo,
    locale: a,
    fallbackLocale: n,
    messages: i,
    modifiers: d,
    pluralRules: b,
    missing: p,
    missingWarn: g,
    fallbackWarn: x,
    fallbackFormat: L,
    unresolving: S,
    postTranslation: U,
    processor: R,
    warnHtmlMessage: j,
    escapeParameter: F,
    messageCompiler: P,
    messageResolver: H,
    localeFallbacker: C,
    fallbackContext: z,
    onWarn: t,
    __meta: ke
  };
  return fe.datetimeFormats = s, fe.numberFormats = l, fe.__datetimeFormatters = Xe, fe.__numberFormatters = Ee, __INTLIFY_PROD_DEVTOOLS__ && Fc(fe, r, ke), fe;
}
function Ja(e, t, r, a, o) {
  const { missing: n, onWarn: i } = e;
  if (n !== null) {
    const s = n(e, r, t, o);
    return A(s) ? s : t;
  } else
    return t;
}
function Gt(e, t, r) {
  const a = e;
  a.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, r, t);
}
const zt = (e) => B(e) && (e.t === 0 || e.type === 0) && ("b" in e || "body" in e), Ho = () => "", Ce = (e) => ee(e);
function $o(e, ...t) {
  const { fallbackFormat: r, postTranslation: a, unresolving: o, messageCompiler: n, fallbackLocale: i, messages: s } = e, [l, d] = va(...t), b = te(d.missingWarn) ? d.missingWarn : e.missingWarn, p = te(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, g = te(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, x = !!d.resolvedMessage, L = A(d.default) || te(d.default) ? te(d.default) ? n ? l : () => l : d.default : r ? n ? l : () => l : "", S = r || L !== "", U = Xa(e, d);
  g && ed(d);
  let [R, j, F] = x ? [
    l,
    U,
    s[U] || {}
  ] : vi(e, l, U, i, p, b), P = R, H = l;
  if (!x && !(A(P) || zt(P) || Ce(P)) && S && (P = L, H = P), !x && (!(A(P) || zt(P) || Ce(P)) || !A(j)))
    return o ? Wr : l;
  let C = !1;
  const z = () => {
    C = !0;
  }, q = Ce(P) ? P : gi(e, l, j, P, H, z);
  if (C)
    return P;
  const Xe = ad(e, j, F, d), Ee = Mc(Xe), ke = td(e, q, Ee), fe = a ? a(ke, l) : ke;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const Je = {
      timestamp: Date.now(),
      key: A(l) ? l : Ce(P) ? P.key : "",
      locale: j || (Ce(P) ? P.locale : ""),
      format: A(P) ? P : Ce(P) ? P.source : "",
      message: fe
    };
    Je.meta = pe({}, e.__meta, /* @__PURE__ */ qc() || {}), Uc(Je);
  }
  return fe;
}
function ed(e) {
  oe(e.list) ? e.list = e.list.map((t) => A(t) ? Ro(t) : t) : B(e.named) && Object.keys(e.named).forEach((t) => {
    A(e.named[t]) && (e.named[t] = Ro(e.named[t]));
  });
}
function vi(e, t, r, a, o, n) {
  const { messages: i, onWarn: s, messageResolver: l, localeFallbacker: d } = e, b = d(e, a, r);
  let p = {}, g, x = null;
  const L = "translate";
  for (let S = 0; S < b.length && (g = b[S], p = i[g] || {}, (x = l(p, t)) === null && (x = p[t]), !(A(x) || zt(x) || Ce(x))); S++) {
    const U = Ja(
      e,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      t,
      g,
      n,
      L
    );
    U !== t && (x = U);
  }
  return [x, g, p];
}
function gi(e, t, r, a, o, n) {
  const { messageCompiler: i, warnHtmlMessage: s } = e;
  if (Ce(a)) {
    const d = a;
    return d.locale = d.locale || r, d.key = d.key || t, d;
  }
  if (i == null) {
    const d = () => a;
    return d.locale = r, d.key = t, d;
  }
  const l = i(a, rd(e, r, o, a, s, n));
  return l.locale = r, l.key = t, l.source = a, l;
}
function td(e, t, r) {
  return t(r);
}
function va(...e) {
  const [t, r, a] = e, o = {};
  if (!A(t) && !se(t) && !Ce(t) && !zt(t))
    throw Ze(We.INVALID_ARGUMENT);
  const n = se(t) ? String(t) : (Ce(t), t);
  return se(r) ? o.plural = r : A(r) ? o.default = r : $(r) && !$r(r) ? o.named = r : oe(r) && (o.list = r), se(a) ? o.plural = a : A(a) ? o.default = a : $(a) && pe(o, a), [n, o];
}
function rd(e, t, r, a, o, n) {
  return {
    locale: t,
    key: r,
    warnHtmlMessage: o,
    onError: (i) => {
      throw n && n(i), i;
    },
    onCacheKey: (i) => lc(t, r, i)
  };
}
function ad(e, t, r, a) {
  const { modifiers: o, pluralRules: n, messageResolver: i, fallbackLocale: s, fallbackWarn: l, missingWarn: d, fallbackContext: b } = e, g = {
    locale: t,
    modifiers: o,
    pluralRules: n,
    messages: (x) => {
      let L = i(r, x);
      if (L == null && b) {
        const [, , S] = vi(b, x, t, s, l, d);
        L = i(S, x);
      }
      if (A(L) || zt(L)) {
        let S = !1;
        const R = gi(e, x, t, L, x, () => {
          S = !0;
        });
        return S ? Ho : R;
      } else
        return Ce(L) ? L : Ho;
    }
  };
  return e.processor && (g.processor = e.processor), a.list && (g.list = a.list), a.named && (g.named = a.named), se(a.plural) && (g.pluralIndex = a.plural), g;
}
function Wo(e, ...t) {
  const { datetimeFormats: r, unresolving: a, fallbackLocale: o, onWarn: n, localeFallbacker: i } = e, { __datetimeFormatters: s } = e, [l, d, b, p] = ga(...t), g = te(b.missingWarn) ? b.missingWarn : e.missingWarn;
  te(b.fallbackWarn) ? b.fallbackWarn : e.fallbackWarn;
  const x = !!b.part, L = Xa(e, b), S = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    L
  );
  if (!A(l) || l === "")
    return new Intl.DateTimeFormat(L, p).format(d);
  let U = {}, R, j = null;
  const F = "datetime format";
  for (let C = 0; C < S.length && (R = S[C], U = r[R] || {}, j = U[l], !$(j)); C++)
    Ja(e, l, R, g, F);
  if (!$(j) || !A(R))
    return a ? Wr : l;
  let P = `${R}__${l}`;
  $r(p) || (P = `${P}__${JSON.stringify(p)}`);
  let H = s.get(P);
  return H || (H = new Intl.DateTimeFormat(R, pe({}, j, p)), s.set(P, H)), x ? H.formatToParts(d) : H.format(d);
}
const hi = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function ga(...e) {
  const [t, r, a, o] = e, n = {};
  let i = {}, s;
  if (A(t)) {
    const l = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!l)
      throw Ze(We.INVALID_ISO_DATE_ARGUMENT);
    const d = l[3] ? l[3].trim().startsWith("T") ? `${l[1].trim()}${l[3].trim()}` : `${l[1].trim()}T${l[3].trim()}` : l[1].trim();
    s = new Date(d);
    try {
      s.toISOString();
    } catch {
      throw Ze(We.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (dc(t)) {
    if (isNaN(t.getTime()))
      throw Ze(We.INVALID_DATE_ARGUMENT);
    s = t;
  } else if (se(t))
    s = t;
  else
    throw Ze(We.INVALID_ARGUMENT);
  return A(r) ? n.key = r : $(r) && Object.keys(r).forEach((l) => {
    hi.includes(l) ? i[l] = r[l] : n[l] = r[l];
  }), A(a) ? n.locale = a : $(a) && (i = a), $(o) && (i = o), [n.key || "", s, n, i];
}
function Go(e, t, r) {
  const a = e;
  for (const o in r) {
    const n = `${t}__${o}`;
    a.__datetimeFormatters.has(n) && a.__datetimeFormatters.delete(n);
  }
}
function Ko(e, ...t) {
  const { numberFormats: r, unresolving: a, fallbackLocale: o, onWarn: n, localeFallbacker: i } = e, { __numberFormatters: s } = e, [l, d, b, p] = ha(...t), g = te(b.missingWarn) ? b.missingWarn : e.missingWarn;
  te(b.fallbackWarn) ? b.fallbackWarn : e.fallbackWarn;
  const x = !!b.part, L = Xa(e, b), S = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    L
  );
  if (!A(l) || l === "")
    return new Intl.NumberFormat(L, p).format(d);
  let U = {}, R, j = null;
  const F = "number format";
  for (let C = 0; C < S.length && (R = S[C], U = r[R] || {}, j = U[l], !$(j)); C++)
    Ja(e, l, R, g, F);
  if (!$(j) || !A(R))
    return a ? Wr : l;
  let P = `${R}__${l}`;
  $r(p) || (P = `${P}__${JSON.stringify(p)}`);
  let H = s.get(P);
  return H || (H = new Intl.NumberFormat(R, pe({}, j, p)), s.set(P, H)), x ? H.formatToParts(d) : H.format(d);
}
const wi = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function ha(...e) {
  const [t, r, a, o] = e, n = {};
  let i = {};
  if (!se(t))
    throw Ze(We.INVALID_ARGUMENT);
  const s = t;
  return A(r) ? n.key = r : $(r) && Object.keys(r).forEach((l) => {
    wi.includes(l) ? i[l] = r[l] : n[l] = r[l];
  }), A(a) ? n.locale = a : $(a) && (i = a), $(o) && (i = o), [n.key || "", s, n, i];
}
function Bo(e, t, r) {
  const a = e;
  for (const o in r) {
    const n = `${t}__${o}`;
    a.__numberFormatters.has(n) && a.__numberFormatters.delete(n);
  }
}
_c();
var od = { NVM_INC: "/Users/nicoinch/.nvm/versions/node/v18.17.0/include/node", STARSHIP_SHELL: "zsh", TERM_PROGRAM: "vscode", NODE: "/Users/nicoinch/.nvm/versions/node/v18.17.0/bin/node", INIT_CWD: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components", PYENV_ROOT: "/Users/nicoinch/.pyenv", NVM_CD_FLAGS: "-q", TERM: "xterm-256color", SHELL: "/bin/zsh", npm_config_metrics_registry: "https://registry.npmjs.org/", TMPDIR: "/var/folders/gl/zwpzw6rj0p7g0fz29sd453vw0000gn/T/", npm_config_global_prefix: "/Users/nicoinch/.nvm/versions/node/v18.17.0", TERM_PROGRAM_VERSION: "1.86.0-insider", ORIGINAL_XDG_CURRENT_DESKTOP: "undefined", MallocNanoZone: "0", COLOR: "1", npm_config_noproxy: "", npm_config_local_prefix: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components", ZSH: "/Users/nicoinch/.oh-my-zsh", NVM_DIR: "/Users/nicoinch/.nvm", USER: "nicoinch", LS_COLORS: "di=1;36:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43", COMMAND_MODE: "unix2003", npm_config_globalconfig: "/Users/nicoinch/.nvm/versions/node/v18.17.0/etc/npmrc", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.uGpAUI27at/Listeners", __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x0", npm_execpath: "/Users/nicoinch/.nvm/versions/node/v18.17.0/lib/node_modules/npm/bin/npm-cli.js", PYENV_VIRTUALENV_INIT: "1", PAGER: "less", LSCOLORS: "Gxfxcxdxbxegedabagacad", PATH: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components/node_modules/.bin:/Users/nicoinch/Workspace/JobHunt/Diabolocom/node_modules/.bin:/Users/nicoinch/Workspace/JobHunt/node_modules/.bin:/Users/nicoinch/Workspace/node_modules/.bin:/Users/nicoinch/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/nicoinch/.nvm/versions/node/v18.17.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/opt/homebrew/Cellar/pyenv-virtualenv/1.2.1/shims:/Users/nicoinch/.pyenv/shims:/opt/homebrew/opt/openjdk/bin:/Users/nicoinch/.nvm/versions/node/v18.17.0/bin:/opt/homebrew/bin", npm_package_json: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components/package.json", npm_config_userconfig: "/Users/nicoinch/.npmrc", npm_config_init_module: "/Users/nicoinch/.npm-init.js", CLOUDSDK_DEVAPPSERVER_PYTHON: "/Users/nicoinch/Workspace/Heycook/code/heycook/venv/bin/python2", __CFBundleIdentifier: "com.microsoft.VSCodeInsiders", npm_command: "run-script", PWD: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components", npm_lifecycle_event: "build", EDITOR: "vi", npm_package_name: "metrics-web-components", LANG: "en_US.UTF-8", CLOUDSDK_PYTHON: "python3", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "--ms-enable-electron-run-as-node", XPC_FLAGS: "0x0", npm_config_node_gyp: "/Users/nicoinch/.nvm/versions/node/v18.17.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", npm_package_version: "0.0.0", XPC_SERVICE_NAME: "0", PYENV_SHELL: "zsh", SHLVL: "1", HOME: "/Users/nicoinch", VSCODE_GIT_ASKPASS_MAIN: "/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/extensions/git/dist/askpass-main.js", npm_config_cache: "/Users/nicoinch/.npm", STARSHIP_SESSION_KEY: "3152613789192622", LESS: "-R", LOGNAME: "nicoinch", npm_lifecycle_script: "npm run build-tailwind && vue-tsc && vite build -c vite.lib.config.ts && vite build", VSCODE_GIT_IPC_HANDLE: "/var/folders/gl/zwpzw6rj0p7g0fz29sd453vw0000gn/T/vscode-git-fcfdeff721.sock", NVM_BIN: "/Users/nicoinch/.nvm/versions/node/v18.17.0/bin", npm_config_user_agent: "npm/9.6.7 node/v18.17.0 darwin arm64 workspaces/false", VSCODE_GIT_ASKPASS_NODE: "/Applications/Visual Studio Code - Insiders.app/Contents/Frameworks/Code - Insiders Helper (Plugin).app/Contents/MacOS/Code - Insiders Helper (Plugin)", GIT_ASKPASS: "/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/extensions/git/dist/askpass.sh", npm_node_execpath: "/Users/nicoinch/.nvm/versions/node/v18.17.0/bin/node", npm_config_prefix: "/Users/nicoinch/.nvm/versions/node/v18.17.0", COLORTERM: "truecolor", _: "/Users/nicoinch/Workspace/JobHunt/Diabolocom/metrics-web-components/node_modules/.bin/vite", NODE_ENV: "production" };
const nd = "9.8.0";
function id() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Ba().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const _i = jc.__EXTEND_POINT__, it = Ya(_i);
it(), it(), it(), it(), it(), it(), it(), it();
const yi = We.__EXTEND_POINT__, we = Ya(yi), Le = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: yi,
  // legacy module errors
  INVALID_ARGUMENT: we(),
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: we(),
  NOT_INSTALLED: we(),
  NOT_AVAILABLE_IN_LEGACY_MODE: we(),
  // directive module errors
  REQUIRED_VALUE: we(),
  INVALID_VALUE: we(),
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: we(),
  NOT_INSTALLED_WITH_PROVIDE: we(),
  // unexpected error
  UNEXPECTED_ERROR: we(),
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: we(),
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: we(),
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: we(),
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: we(),
  // for enhancement
  __EXTEND_POINT__: we()
  // 40
};
function Fe(e, ...t) {
  return ci(e, null, void 0);
}
const wa = /* @__PURE__ */ bt("__translateVNode"), _a = /* @__PURE__ */ bt("__datetimeParts"), ya = /* @__PURE__ */ bt("__numberParts"), sd = bt("__setPluralRules"), ld = /* @__PURE__ */ bt("__injectWithOption"), xa = /* @__PURE__ */ bt("__dispose");
function ir(e) {
  if (!B(e))
    return e;
  for (const t in e)
    if (or(e, t))
      if (!t.includes("."))
        B(e[t]) && ir(e[t]);
      else {
        const r = t.split("."), a = r.length - 1;
        let o = e, n = !1;
        for (let i = 0; i < a; i++) {
          if (r[i] in o || (o[r[i]] = {}), !B(o[r[i]])) {
            n = !0;
            break;
          }
          o = o[r[i]];
        }
        n || (o[r[a]] = e[t], delete e[t]), B(o[r[a]]) && ir(o[r[a]]);
      }
  return e;
}
function xi(e, t) {
  const { messages: r, __i18n: a, messageResolver: o, flatJson: n } = t, i = $(r) ? r : oe(a) ? {} : { [e]: {} };
  if (oe(a) && a.forEach((s) => {
    if ("locale" in s && "resource" in s) {
      const { locale: l, resource: d } = s;
      l ? (i[l] = i[l] || {}, Zt(d, i[l])) : Zt(d, i);
    } else
      A(s) && Zt(JSON.parse(s), i);
  }), o == null && n)
    for (const s in i)
      or(i, s) && ir(i[s]);
  return i;
}
function Ei(e) {
  return e.type;
}
function cd(e, t, r) {
  let a = B(t.messages) ? t.messages : {};
  "__i18nGlobal" in r && (a = xi(e.locale.value, {
    messages: a,
    __i18n: r.__i18nGlobal
  }));
  const o = Object.keys(a);
  o.length && o.forEach((n) => {
    e.mergeLocaleMessage(n, a[n]);
  });
  {
    if (B(t.datetimeFormats)) {
      const n = Object.keys(t.datetimeFormats);
      n.length && n.forEach((i) => {
        e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
      });
    }
    if (B(t.numberFormats)) {
      const n = Object.keys(t.numberFormats);
      n.length && n.forEach((i) => {
        e.mergeNumberFormat(i, t.numberFormats[i]);
      });
    }
  }
}
function Yo(e) {
  return be(sr, null, e, 0);
}
const Xo = "__INTLIFY_META__", Jo = () => [], dd = () => !1;
let qo = 0;
function Qo(e) {
  return (t, r, a, o) => e(r, a, jr() || void 0, o);
}
const fd = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = jr();
  let t = null;
  return e && (t = Ei(e)[Xo]) ? { [Xo]: t } : null;
};
function ki(e = {}, t) {
  const { __root: r, __injectWithOption: a } = e, o = r === void 0, n = e.flatJson;
  let i = te(e.inheritLocale) ? e.inheritLocale : !0;
  const s = $t(
    // prettier-ignore
    r && i ? r.locale.value : A(e.locale) ? e.locale : Cr
  ), l = $t(
    // prettier-ignore
    r && i ? r.fallbackLocale.value : A(e.fallbackLocale) || oe(e.fallbackLocale) || $(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s.value
  ), d = $t(xi(s.value, e)), b = $t($(e.datetimeFormats) ? e.datetimeFormats : { [s.value]: {} }), p = $t($(e.numberFormats) ? e.numberFormats : { [s.value]: {} });
  let g = r ? r.missingWarn : te(e.missingWarn) || Sr(e.missingWarn) ? e.missingWarn : !0, x = r ? r.fallbackWarn : te(e.fallbackWarn) || Sr(e.fallbackWarn) ? e.fallbackWarn : !0, L = r ? r.fallbackRoot : te(e.fallbackRoot) ? e.fallbackRoot : !0, S = !!e.fallbackFormat, U = ee(e.missing) ? e.missing : null, R = ee(e.missing) ? Qo(e.missing) : null, j = ee(e.postTranslation) ? e.postTranslation : null, F = r ? r.warnHtmlMessage : te(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, P = !!e.escapeParameter;
  const H = r ? r.modifiers : $(e.modifiers) ? e.modifiers : {};
  let C = e.pluralRules || r && r.pluralRules, z;
  z = (() => {
    o && Vo(null);
    const u = {
      version: nd,
      locale: s.value,
      fallbackLocale: l.value,
      messages: d.value,
      modifiers: H,
      pluralRules: C,
      missing: R === null ? void 0 : R,
      missingWarn: g,
      fallbackWarn: x,
      fallbackFormat: S,
      unresolving: !0,
      postTranslation: j === null ? void 0 : j,
      warnHtmlMessage: F,
      escapeParameter: P,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    u.datetimeFormats = b.value, u.numberFormats = p.value, u.__datetimeFormatters = $(z) ? z.__datetimeFormatters : void 0, u.__numberFormatters = $(z) ? z.__numberFormatters : void 0;
    const m = Zc(u);
    return o && Vo(m), m;
  })(), Gt(z, s.value, l.value);
  function Xe() {
    return [
      s.value,
      l.value,
      d.value,
      b.value,
      p.value
    ];
  }
  const Ee = Ot({
    get: () => s.value,
    set: (u) => {
      s.value = u, z.locale = s.value;
    }
  }), ke = Ot({
    get: () => l.value,
    set: (u) => {
      l.value = u, z.fallbackLocale = l.value, Gt(z, s.value, u);
    }
  }), fe = Ot(() => d.value), Je = /* @__PURE__ */ Ot(() => b.value), Ut = /* @__PURE__ */ Ot(() => p.value);
  function lr() {
    return ee(j) ? j : null;
  }
  function le(u) {
    j = u, z.postTranslation = u;
  }
  function X() {
    return U;
  }
  function Y(u) {
    u !== null && (R = Qo(u)), U = u, z.missing = R;
  }
  const ve = (u, m, I, M, K, Z) => {
    Xe();
    let ie;
    try {
      od.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (z.fallbackContext = r ? Qc() : void 0), ie = u(z);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || (z.fallbackContext = void 0);
    }
    if (I !== "translate exists" && // for not `te` (e.g `t`)
    se(ie) && ie === Wr || I === "translate exists" && !ie) {
      const [ot, Kr] = m();
      return r && L ? M(r) : K(ot);
    } else {
      if (Z(ie))
        return ie;
      throw Fe(Le.UNEXPECTED_RETURN_TYPE);
    }
  };
  function mt(...u) {
    return ve((m) => Reflect.apply($o, null, [m, ...u]), () => va(...u), "translate", (m) => Reflect.apply(m.t, m, [...u]), (m) => m, (m) => A(m));
  }
  function qe(...u) {
    const [m, I, M] = u;
    if (M && !B(M))
      throw Fe(Le.INVALID_ARGUMENT);
    return mt(m, I, pe({ resolvedMessage: !0 }, M || {}));
  }
  function Se(...u) {
    return ve((m) => Reflect.apply(Wo, null, [m, ...u]), () => ga(...u), "datetime format", (m) => Reflect.apply(m.d, m, [...u]), () => Fo, (m) => A(m));
  }
  function cr(...u) {
    return ve((m) => Reflect.apply(Ko, null, [m, ...u]), () => ha(...u), "number format", (m) => Reflect.apply(m.n, m, [...u]), () => Fo, (m) => A(m));
  }
  function Gr(u) {
    return u.map((m) => A(m) || se(m) || te(m) ? Yo(String(m)) : m);
  }
  const Re = {
    normalize: Gr,
    interpolate: (u) => u,
    type: "vnode"
  };
  function kt(...u) {
    return ve(
      (m) => {
        let I;
        const M = m;
        try {
          M.processor = Re, I = Reflect.apply($o, null, [M, ...u]);
        } finally {
          M.processor = null;
        }
        return I;
      },
      () => va(...u),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (m) => m[wa](...u),
      (m) => [Yo(m)],
      (m) => oe(m)
    );
  }
  function dr(...u) {
    return ve(
      (m) => Reflect.apply(Ko, null, [m, ...u]),
      () => ha(...u),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (m) => m[ya](...u),
      Jo,
      (m) => A(m) || oe(m)
    );
  }
  function at(...u) {
    return ve(
      (m) => Reflect.apply(Wo, null, [m, ...u]),
      () => ga(...u),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (m) => m[_a](...u),
      Jo,
      (m) => A(m) || oe(m)
    );
  }
  function Vt(u) {
    C = u, z.pluralRules = C;
  }
  function jt(u, m) {
    return ve(() => {
      if (!u)
        return !1;
      const I = A(m) ? m : s.value, M = v(I), K = z.messageResolver(M, u);
      return zt(K) || Ce(K) || A(K);
    }, () => [u], "translate exists", (I) => Reflect.apply(I.te, I, [u, m]), dd, (I) => te(I));
  }
  function c(u) {
    let m = null;
    const I = fi(z, l.value, s.value);
    for (let M = 0; M < I.length; M++) {
      const K = d.value[I[M]] || {}, Z = z.messageResolver(K, u);
      if (Z != null) {
        m = Z;
        break;
      }
    }
    return m;
  }
  function f(u) {
    const m = c(u);
    return m ?? (r ? r.tm(u) || {} : {});
  }
  function v(u) {
    return d.value[u] || {};
  }
  function h(u, m) {
    if (n) {
      const I = { [u]: m };
      for (const M in I)
        or(I, M) && ir(I[M]);
      m = I[u];
    }
    d.value[u] = m, z.messages = d.value;
  }
  function w(u, m) {
    d.value[u] = d.value[u] || {};
    const I = { [u]: m };
    for (const M in I)
      or(I, M) && ir(I[M]);
    m = I[u], Zt(m, d.value[u]), z.messages = d.value;
  }
  function E(u) {
    return b.value[u] || {};
  }
  function O(u, m) {
    b.value[u] = m, z.datetimeFormats = b.value, Go(z, u, m);
  }
  function y(u, m) {
    b.value[u] = pe(b.value[u] || {}, m), z.datetimeFormats = b.value, Go(z, u, m);
  }
  function k(u) {
    return p.value[u] || {};
  }
  function _(u, m) {
    p.value[u] = m, z.numberFormats = p.value, Bo(z, u, m);
  }
  function T(u, m) {
    p.value[u] = pe(p.value[u] || {}, m), z.numberFormats = p.value, Bo(z, u, m);
  }
  qo++, r && ma && (At(r.locale, (u) => {
    i && (s.value = u, z.locale = u, Gt(z, s.value, l.value));
  }), At(r.fallbackLocale, (u) => {
    i && (l.value = u, z.fallbackLocale = u, Gt(z, s.value, l.value));
  }));
  const N = {
    id: qo,
    locale: Ee,
    fallbackLocale: ke,
    get inheritLocale() {
      return i;
    },
    set inheritLocale(u) {
      i = u, u && r && (s.value = r.locale.value, l.value = r.fallbackLocale.value, Gt(z, s.value, l.value));
    },
    get availableLocales() {
      return Object.keys(d.value).sort();
    },
    messages: fe,
    get modifiers() {
      return H;
    },
    get pluralRules() {
      return C || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return g;
    },
    set missingWarn(u) {
      g = u, z.missingWarn = g;
    },
    get fallbackWarn() {
      return x;
    },
    set fallbackWarn(u) {
      x = u, z.fallbackWarn = x;
    },
    get fallbackRoot() {
      return L;
    },
    set fallbackRoot(u) {
      L = u;
    },
    get fallbackFormat() {
      return S;
    },
    set fallbackFormat(u) {
      S = u, z.fallbackFormat = S;
    },
    get warnHtmlMessage() {
      return F;
    },
    set warnHtmlMessage(u) {
      F = u, z.warnHtmlMessage = u;
    },
    get escapeParameter() {
      return P;
    },
    set escapeParameter(u) {
      P = u, z.escapeParameter = u;
    },
    t: mt,
    getLocaleMessage: v,
    setLocaleMessage: h,
    mergeLocaleMessage: w,
    getPostTranslationHandler: lr,
    setPostTranslationHandler: le,
    getMissingHandler: X,
    setMissingHandler: Y,
    [sd]: Vt
  };
  return N.datetimeFormats = Je, N.numberFormats = Ut, N.rt = qe, N.te = jt, N.tm = f, N.d = Se, N.n = cr, N.getDateTimeFormat = E, N.setDateTimeFormat = O, N.mergeDateTimeFormat = y, N.getNumberFormat = k, N.setNumberFormat = _, N.mergeNumberFormat = T, N[ld] = a, N[wa] = kt, N[_a] = at, N[ya] = dr, N;
}
const qa = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function ud({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((a, o) => [
    ...a,
    // prettier-ignore
    ...o.type === ye ? o.children : [o]
  ], []) : t.reduce((r, a) => {
    const o = e[a];
    return o && (r[a] = o()), r;
  }, {});
}
function Oi(e) {
  return ye;
}
const bd = /* @__PURE__ */ Ye({
  /* eslint-disable */
  name: "i18n-t",
  props: pe({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => se(e) || !isNaN(e)
    }
  }, qa),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: r, attrs: a } = t, o = e.i18n || Et({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const n = Object.keys(r).filter((p) => p !== "_"), i = {};
      e.locale && (i.locale = e.locale), e.plural !== void 0 && (i.plural = A(e.plural) ? +e.plural : e.plural);
      const s = ud(t, n), l = o[wa](e.keypath, s, i), d = pe({}, a), b = A(e.tag) || B(e.tag) ? e.tag : Oi();
      return ii(b, d, l);
    };
  }
}), Zo = bd;
function pd(e) {
  return oe(e) && !A(e[0]);
}
function Ni(e, t, r, a) {
  const { slots: o, attrs: n } = t;
  return () => {
    const i = { part: !0 };
    let s = {};
    e.locale && (i.locale = e.locale), A(e.format) ? i.key = e.format : B(e.format) && (A(e.format.key) && (i.key = e.format.key), s = Object.keys(e.format).reduce((g, x) => r.includes(x) ? pe({}, g, { [x]: e.format[x] }) : g, {}));
    const l = a(e.value, i, s);
    let d = [i.key];
    oe(l) ? d = l.map((g, x) => {
      const L = o[g.type], S = L ? L({ [g.type]: g.value, index: x, parts: l }) : [g.value];
      return pd(S) && (S[0].key = `${g.type}-${x}`), S;
    }) : A(l) && (d = [l]);
    const b = pe({}, n), p = A(e.tag) || B(e.tag) ? e.tag : Oi();
    return ii(p, b, d);
  };
}
const md = /* @__PURE__ */ Ye({
  /* eslint-disable */
  name: "i18n-n",
  props: pe({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, qa),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const r = e.i18n || Et({
      useScope: "parent",
      __useComponent: !0
    });
    return Ni(e, t, wi, (...a) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r[ya](...a)
    ));
  }
}), en = md, vd = /* @__PURE__ */ Ye({
  /* eslint-disable */
  name: "i18n-d",
  props: pe({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, qa),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const r = e.i18n || Et({
      useScope: "parent",
      __useComponent: !0
    });
    return Ni(e, t, hi, (...a) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r[_a](...a)
    ));
  }
}), tn = vd;
function gd(e, t) {
  const r = e;
  if (e.mode === "composition")
    return r.__getInstance(t) || e.global;
  {
    const a = r.__getInstance(t);
    return a != null ? a.__composer : e.global.__composer;
  }
}
function hd(e) {
  const t = (i) => {
    const { instance: s, modifiers: l, value: d } = i;
    if (!s || !s.$)
      throw Fe(Le.UNEXPECTED_ERROR);
    const b = gd(e, s.$), p = rn(d);
    return [
      Reflect.apply(b.t, b, [...an(p)]),
      b
    ];
  };
  return {
    created: (i, s) => {
      const [l, d] = t(s);
      ma && e.global === d && (i.__i18nWatcher = At(d.locale, () => {
        s.instance && s.instance.$forceUpdate();
      })), i.__composer = d, i.textContent = l;
    },
    unmounted: (i) => {
      ma && i.__i18nWatcher && (i.__i18nWatcher(), i.__i18nWatcher = void 0, delete i.__i18nWatcher), i.__composer && (i.__composer = void 0, delete i.__composer);
    },
    beforeUpdate: (i, { value: s }) => {
      if (i.__composer) {
        const l = i.__composer, d = rn(s);
        i.textContent = Reflect.apply(l.t, l, [
          ...an(d)
        ]);
      }
    },
    getSSRProps: (i) => {
      const [s] = t(i);
      return { textContent: s };
    }
  };
}
function rn(e) {
  if (A(e))
    return { path: e };
  if ($(e)) {
    if (!("path" in e))
      throw Fe(Le.REQUIRED_VALUE, "path");
    return e;
  } else
    throw Fe(Le.INVALID_VALUE);
}
function an(e) {
  const { path: t, locale: r, args: a, choice: o, plural: n } = e, i = {}, s = a || {};
  return A(r) && (i.locale = r), se(o) && (i.plural = o), se(n) && (i.plural = n), [t, s, i];
}
function wd(e, t, ...r) {
  const a = $(r[0]) ? r[0] : {}, o = !!a.useI18nComponentName;
  (te(a.globalInstall) ? a.globalInstall : !0) && ([o ? "i18n" : Zo.name, "I18nT"].forEach((i) => e.component(i, Zo)), [en.name, "I18nN"].forEach((i) => e.component(i, en)), [tn.name, "I18nD"].forEach((i) => e.component(i, tn))), e.directive("t", hd(t));
}
const Ti = /* @__PURE__ */ bt("global-vue-i18n");
function _d(e = {}, t) {
  const r = te(e.globalInjection) ? e.globalInjection : !0, a = !0, o = /* @__PURE__ */ new Map(), [n, i] = yd(e), s = /* @__PURE__ */ bt("");
  function l(p) {
    return o.get(p) || null;
  }
  function d(p, g) {
    o.set(p, g);
  }
  function b(p) {
    o.delete(p);
  }
  {
    const p = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return a;
      },
      // install plugin
      async install(g, ...x) {
        if (g.__VUE_I18N_SYMBOL__ = s, g.provide(g.__VUE_I18N_SYMBOL__, p), $(x[0])) {
          const U = x[0];
          p.__composerExtend = U.__composerExtend, p.__vueI18nExtend = U.__vueI18nExtend;
        }
        let L = null;
        r && (L = Sd(g, p.global)), wd(g, p, ...x);
        const S = g.unmount;
        g.unmount = () => {
          L && L(), p.dispose(), S();
        };
      },
      // global accessor
      get global() {
        return i;
      },
      dispose() {
        n.stop();
      },
      // @internal
      __instances: o,
      // @internal
      __getInstance: l,
      // @internal
      __setInstance: d,
      // @internal
      __deleteInstance: b
    };
    return p;
  }
}
function Et(e = {}) {
  const t = jr();
  if (t == null)
    throw Fe(Le.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw Fe(Le.NOT_INSTALLED);
  const r = xd(t), a = kd(r), o = Ei(t), n = Ed(e, o);
  if (n === "global")
    return cd(a, e, o), a;
  if (n === "parent") {
    let l = Od(r, t, e.__useComponent);
    return l == null && (l = a), l;
  }
  const i = r;
  let s = i.__getInstance(t);
  if (s == null) {
    const l = pe({}, e);
    "__i18n" in o && (l.__i18n = o.__i18n), a && (l.__root = a), s = ki(l), i.__composerExtend && (s[xa] = i.__composerExtend(s)), Td(i, t, s), i.__setInstance(t, s);
  }
  return s;
}
function yd(e, t, r) {
  const a = Hi();
  {
    const o = a.run(() => ki(e));
    if (o == null)
      throw Fe(Le.UNEXPECTED_ERROR);
    return [a, o];
  }
}
function xd(e) {
  {
    const t = qt(e.isCE ? Ti : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw Fe(e.isCE ? Le.NOT_INSTALLED_WITH_PROVIDE : Le.UNEXPECTED_ERROR);
    return t;
  }
}
function Ed(e, t) {
  return $r(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function kd(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Od(e, t, r = !1) {
  let a = null;
  const o = t.root;
  let n = Nd(t, r);
  for (; n != null; ) {
    const i = e;
    if (e.mode === "composition" && (a = i.__getInstance(n)), a != null || o === n)
      break;
    n = n.parent;
  }
  return a;
}
function Nd(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Td(e, t, r) {
  jn(() => {
  }, t), Va(() => {
    const a = r;
    e.__deleteInstance(t);
    const o = a[xa];
    o && (o(), delete a[xa]);
  }, t);
}
const Id = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], on = ["t", "rt", "d", "n", "tm", "te"];
function Sd(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return Id.forEach((o) => {
    const n = Object.getOwnPropertyDescriptor(t, o);
    if (!n)
      throw Fe(Le.UNEXPECTED_ERROR);
    const i = me(n.value) ? {
      get() {
        return n.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(s) {
        n.value.value = s;
      }
    } : {
      get() {
        return n.get && n.get();
      }
    };
    Object.defineProperty(r, o, i);
  }), e.config.globalProperties.$i18n = r, on.forEach((o) => {
    const n = Object.getOwnPropertyDescriptor(t, o);
    if (!n || !n.value)
      throw Fe(Le.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${o}`, n);
  }), () => {
    delete e.config.globalProperties.$i18n, on.forEach((o) => {
      delete e.config.globalProperties[`$${o}`];
    });
  };
}
id();
Yc(Ic);
Xc(fi);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = Ba();
  e.__INTLIFY__ = !0, Dc(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const Cd = {
  flag: "🇬🇧",
  label: "English",
  switchTo: "Switch to",
  counter: "Counter",
  plus: "+",
  minus: "-",
  step: "Step",
  reset: "Reset"
}, Ad = {
  flag: "🇫🇷",
  label: "Français",
  switchTo: "Basculer en",
  counter: "Compteur",
  plus: "+",
  minus: "-",
  step: "Pas",
  reset: "Réinitialiser"
}, Ii = {
  en: Cd,
  fr: Ad
}, Ea = _d({
  legacy: !1,
  locale: "en",
  messages: Ii
}), Ld = /* @__PURE__ */ Ye({
  props: {
    locale: {
      type: String,
      default: "en"
    }
  },
  setup(e) {
    return Gn(Ti, Ea), Vs(() => {
      Ea.global.locale.value = e.locale;
    }), {};
  }
}), Ft = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [a, o] of t)
    r[a] = o;
  return r;
};
function Rd(e, t, r, a, o, n) {
  return tl(e.$slots, "default");
}
const Pd = /* @__PURE__ */ Ft(Ld, [["render", Rd]]), zd = { class: "flex flex-col gap-2 text-primary-text" }, Md = { class: "flex flex-row items-stretch gap-0.5" }, Dd = ["disabled"], Fd = { class: "text-2xl uppercase font-semibold" }, Ud = {
  key: 0,
  class: "text-xs"
}, Vd = ["disabled"], jd = { class: "text-2xl uppercase font-semibold" }, Hd = {
  key: 0,
  class: "text-xs"
}, $d = /* @__PURE__ */ Ye({
  __name: "MetricsCounter.ce",
  props: /* @__PURE__ */ ol({
    min: { default: 0, type: Number },
    max: { default: 1e6, type: Number },
    step: { default: 1, type: Number },
    hideValue: { type: Boolean, default: !1 },
    showStep: { type: Boolean, default: !1 },
    fullWidth: { type: Boolean, default: !1 }
  }, {
    modelValue: { default: 0, required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = al(e, "modelValue", { get: (s) => Number(s), set: (s) => Number(s) }), r = e, a = (r.fullWidth ? "flex-1 " : "") + "flex flex-col items-center bg-primary-content-bg hover:bg-primary-content-bg-hover hover:border-primary-focus focus-visible:border-primary-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-focus focus:border-primary-focus focus:outline focus:outline-1 focus:outline-primary-focus", o = () => {
      const s = t.value + r.step;
      s <= r.max && (t.value = s);
    }, n = () => {
      const s = t.value - r.step;
      s >= r.min && (t.value = s);
    }, { t: i } = Et({
      inheritLocale: !0,
      useScope: "local"
    });
    return (s, l) => (Ie(), Me("div", zd, [
      re("div", Md, [
        re("button", {
          type: "button",
          class: Ke(
            a + " rounded-r-none" + (t.value <= r.min ? " opacity-50 pointer-events-none" : "")
          ),
          disabled: t.value <= r.min,
          "data-testid": "counter-decrease-button",
          onClick: n
        }, [
          re("span", Fd, Ne($e(i)("minus")), 1),
          r.showStep ? (Ie(), Me("span", Ud, Ne($e(i)("step")) + " " + Ne(r.step), 1)) : _r("", !0)
        ], 10, Dd),
        r.hideValue === !1 ? (Ie(), Me("span", {
          key: 0,
          class: Ke(
            (r.fullWidth ? "flex-[2_1_0%]" : "") + " bg-primary-content-bg font-semibold text-xl min-w-16 px-2 flex items-center justify-center"
          ),
          "data-testid": "counter-value"
        }, Ne(t.value), 3)) : _r("", !0),
        re("button", {
          class: Ke(
            a + " rounded-l-none" + (t.value >= r.max ? " opacity-50 pointer-events-none" : "")
          ),
          type: "button",
          disabled: t.value >= r.max,
          "data-testid": "counter-increase-button",
          onClick: o
        }, [
          re("span", jd, Ne($e(i)("plus")), 1),
          r.showStep ? (Ie(), Me("span", Hd, Ne($e(i)("step")) + " " + Ne(r.step), 1)) : _r("", !0)
        ], 10, Vd)
      ])
    ]));
  }
}), Wd = '*[data-v-359b9b54],[data-v-359b9b54]:before,[data-v-359b9b54]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-359b9b54]:before,[data-v-359b9b54]:after{--tw-content: ""}html[data-v-359b9b54],[data-v-359b9b54]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-359b9b54]{margin:0;line-height:inherit}hr[data-v-359b9b54]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-359b9b54]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-359b9b54],h2[data-v-359b9b54],h3[data-v-359b9b54],h4[data-v-359b9b54],h5[data-v-359b9b54],h6[data-v-359b9b54]{font-size:inherit;font-weight:inherit}a[data-v-359b9b54]{color:inherit;text-decoration:inherit}b[data-v-359b9b54],strong[data-v-359b9b54]{font-weight:bolder}code[data-v-359b9b54],kbd[data-v-359b9b54],samp[data-v-359b9b54],pre[data-v-359b9b54]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-359b9b54]{font-size:80%}sub[data-v-359b9b54],sup[data-v-359b9b54]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-359b9b54]{bottom:-.25em}sup[data-v-359b9b54]{top:-.5em}table[data-v-359b9b54]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-359b9b54],input[data-v-359b9b54],optgroup[data-v-359b9b54],select[data-v-359b9b54],textarea[data-v-359b9b54]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-359b9b54],select[data-v-359b9b54]{text-transform:none}button[data-v-359b9b54],[type=button][data-v-359b9b54],[type=reset][data-v-359b9b54],[type=submit][data-v-359b9b54]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-359b9b54]:-moz-focusring{outline:auto}[data-v-359b9b54]:-moz-ui-invalid{box-shadow:none}progress[data-v-359b9b54]{vertical-align:baseline}[data-v-359b9b54]::-webkit-inner-spin-button,[data-v-359b9b54]::-webkit-outer-spin-button{height:auto}[type=search][data-v-359b9b54]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-359b9b54]::-webkit-search-decoration{-webkit-appearance:none}[data-v-359b9b54]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-359b9b54]{display:list-item}blockquote[data-v-359b9b54],dl[data-v-359b9b54],dd[data-v-359b9b54],h1[data-v-359b9b54],h2[data-v-359b9b54],h3[data-v-359b9b54],h4[data-v-359b9b54],h5[data-v-359b9b54],h6[data-v-359b9b54],hr[data-v-359b9b54],figure[data-v-359b9b54],p[data-v-359b9b54],pre[data-v-359b9b54]{margin:0}fieldset[data-v-359b9b54]{margin:0;padding:0}legend[data-v-359b9b54]{padding:0}ol[data-v-359b9b54],ul[data-v-359b9b54],menu[data-v-359b9b54]{list-style:none;margin:0;padding:0}dialog[data-v-359b9b54]{padding:0}textarea[data-v-359b9b54]{resize:vertical}input[data-v-359b9b54]::-moz-placeholder,textarea[data-v-359b9b54]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-359b9b54]::placeholder,textarea[data-v-359b9b54]::placeholder{opacity:1;color:#9ca3af}button[data-v-359b9b54],[role=button][data-v-359b9b54]{cursor:pointer}[data-v-359b9b54]:disabled{cursor:default}img[data-v-359b9b54],svg[data-v-359b9b54],video[data-v-359b9b54],canvas[data-v-359b9b54],audio[data-v-359b9b54],iframe[data-v-359b9b54],embed[data-v-359b9b54],object[data-v-359b9b54]{display:block;vertical-align:middle}img[data-v-359b9b54],video[data-v-359b9b54]{max-width:100%;height:auto}[hidden][data-v-359b9b54]{display:none}[data-v-359b9b54]:root{--display-in-light-mode: block;--display-in-dark-mode: none;--white: 255 255 255;--black: 0 0 0;--electric-violet-50: 245 240 255;--electric-violet-100: 237 228 255;--electric-violet-200: 221 205 255;--electric-violet-300: 197 166 255;--electric-violet-400: 171 115 255;--electric-violet-500: 148 59 255;--electric-violet-600: 140 20 255;--electric-violet-700: 128 0 255;--electric-violet-800: 108 1 214;--electric-violet-900: 89 3 175;--electric-violet-950: 54 0 119;--azure-radiance-50: 237 251 255;--azure-radiance-100: 214 243 255;--azure-radiance-200: 181 237 255;--azure-radiance-300: 131 228 255;--azure-radiance-400: 72 210 255;--azure-radiance-500: 30 181 255;--azure-radiance-600: 6 152 255;--azure-radiance-700: 0 132 255;--azure-radiance-800: 8 100 197;--azure-radiance-900: 13 86 155;--azure-radiance-950: 14 52 93;--snow-flurry-50: 237 255 230;--snow-flurry-100: 224 255 214;--snow-flurry-200: 174 255 151;--snow-flurry-300: 123 251 91;--snow-flurry-400: 81 241 42;--snow-flurry-500: 46 215 11;--snow-flurry-600: 31 172 4;--snow-flurry-700: 25 131 8;--snow-flurry-800: 25 103 13;--snow-flurry-900: 24 87 16;--snow-flurry-950: 6 49 2;--neutral-50: 246 246 246;--neutral-100: 231 231 231;--neutral-200: 209 209 209;--neutral-300: 176 176 176;--neutral-400: 136 136 136;--neutral-500: 109 109 109;--neutral-600: 93 93 93;--neutral-700: 79 79 79;--neutral-800: 69 69 69;--neutral-900: 61 61 61;--neutral-950: 28 28 28;--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--electric-violet-950);--color-primary-content-bg: var(--electric-violet-200);--color-primary-content-bg-hover: var(--electric-violet-300);--color-primary-focus: var(--electric-violet-600)}.theme-1[data-v-359b9b54]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--azure-radiance-950);--color-primary-content-bg: var(--azure-radiance-200);--color-primary-content-bg-hover: var(--azure-radiance-300);--color-primary-focus: var(--azure-radiance-600)}.theme-2[data-v-359b9b54]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--snow-flurry-950);--color-primary-content-bg: var(--snow-flurry-300);--color-primary-content-bg-hover: var(--snow-flurry-400);--color-primary-focus: var(--snow-flurry-500)}.theme-muted[data-v-359b9b54]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--neutral-950);--color-primary-content-bg: var(--neutral-100);--color-primary-content-bg-hover: var(--neutral-200);--color-primary-focus: var(--neutral-600)}.dark[data-v-359b9b54]{--display-in-light-mode: none;--display-in-dark-mode: block;--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--electric-violet-50);--color-primary-content-bg: var(--electric-violet-800);--color-primary-content-bg-hover: var(--electric-violet-900);--color-primary-focus: var(--electric-violet-400)}.dark .theme-1[data-v-359b9b54]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--azure-radiance-50);--color-primary-content-bg: var(--azure-radiance-800);--color-primary-content-bg-hover: var(--azure-radiance-900);--color-primary-focus: var(--azure-radiance-400)}.dark .theme-2[data-v-359b9b54]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--snow-flurry-50);--color-primary-content-bg: var(--snow-flurry-800);--color-primary-content-bg-hover: var(--snow-flurry-900);--color-primary-focus: var(--snow-flurry-400)}.dark .theme-muted[data-v-359b9b54]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--neutral-50);--color-primary-content-bg: var(--neutral-900);--color-primary-content-bg-hover: var(--neutral-800);--color-primary-focus: var(--neutral-400)}*[data-v-359b9b54],[data-v-359b9b54]:before,[data-v-359b9b54]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-359b9b54]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none[data-v-359b9b54]{pointer-events:none}.order-first[data-v-359b9b54]{order:-9999}.m-4[data-v-359b9b54]{margin:1rem}.mx-auto[data-v-359b9b54]{margin-left:auto;margin-right:auto}.flex[data-v-359b9b54]{display:flex}.h-5[data-v-359b9b54]{height:1.25rem}.min-h-\\[calc\\(100vh_-_2rem\\)\\][data-v-359b9b54]{min-height:calc(100vh - 2rem)}.w-1\\/2[data-v-359b9b54]{width:50%}.w-5[data-v-359b9b54]{width:1.25rem}.w-fit[data-v-359b9b54]{width:-moz-fit-content;width:fit-content}.w-full[data-v-359b9b54]{width:100%}.min-w-16[data-v-359b9b54]{min-width:4rem}.max-w-5xl[data-v-359b9b54]{max-width:64rem}.max-w-fit[data-v-359b9b54]{max-width:-moz-fit-content;max-width:fit-content}.flex-1[data-v-359b9b54]{flex:1 1 0%}.flex-\\[2_1_0\\%\\][data-v-359b9b54]{flex:2 1 0%}.flex-grow[data-v-359b9b54]{flex-grow:1}.flex-row[data-v-359b9b54]{flex-direction:row}.flex-col[data-v-359b9b54]{flex-direction:column}.items-center[data-v-359b9b54]{align-items:center}.items-stretch[data-v-359b9b54]{align-items:stretch}.justify-start[data-v-359b9b54]{justify-content:flex-start}.justify-end[data-v-359b9b54]{justify-content:flex-end}.justify-center[data-v-359b9b54]{justify-content:center}.gap-0[data-v-359b9b54]{gap:0px}.gap-0\\.5[data-v-359b9b54]{gap:.125rem}.gap-2[data-v-359b9b54]{gap:.5rem}.gap-3[data-v-359b9b54]{gap:.75rem}.gap-4[data-v-359b9b54]{gap:1rem}.gap-6[data-v-359b9b54]{gap:1.5rem}.self-start[data-v-359b9b54]{align-self:flex-start}.self-end[data-v-359b9b54]{align-self:flex-end}.self-center[data-v-359b9b54]{align-self:center}.whitespace-nowrap[data-v-359b9b54]{white-space:nowrap}.rounded-2xl[data-v-359b9b54]{border-radius:1rem}.rounded-xl[data-v-359b9b54]{border-radius:.75rem}.rounded-l-none[data-v-359b9b54]{border-top-left-radius:0;border-bottom-left-radius:0}.rounded-r-none[data-v-359b9b54]{border-top-right-radius:0;border-bottom-right-radius:0}.border[data-v-359b9b54]{border-width:1px}.border-primary-focus[data-v-359b9b54]{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.bg-default-bg[data-v-359b9b54]{--tw-bg-opacity: 1;background-color:rgb(var(--color-default-bg) / var(--tw-bg-opacity))}.bg-neutral-950[data-v-359b9b54]{--tw-bg-opacity: 1;background-color:rgb(10 10 10 / var(--tw-bg-opacity))}.bg-primary-content-bg[data-v-359b9b54]{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg) / var(--tw-bg-opacity))}.bg-white[data-v-359b9b54]{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.p-2[data-v-359b9b54]{padding:.5rem}.p-4[data-v-359b9b54]{padding:1rem}.px-2[data-v-359b9b54]{padding-left:.5rem;padding-right:.5rem}.py-0[data-v-359b9b54]{padding-top:0;padding-bottom:0}.py-0\\.5[data-v-359b9b54]{padding-top:.125rem;padding-bottom:.125rem}.text-left[data-v-359b9b54]{text-align:left}.text-2xl[data-v-359b9b54]{font-size:1.5rem;line-height:2rem}.text-4xl[data-v-359b9b54]{font-size:2.25rem;line-height:2.5rem}.text-6xl[data-v-359b9b54]{font-size:3.75rem;line-height:1}.text-lg[data-v-359b9b54]{font-size:1.125rem;line-height:1.75rem}.text-sm[data-v-359b9b54]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-359b9b54]{font-size:1.25rem;line-height:1.75rem}.text-xs[data-v-359b9b54]{font-size:.75rem;line-height:1rem}.font-semibold[data-v-359b9b54]{font-weight:600}.uppercase[data-v-359b9b54]{text-transform:uppercase}.text-default-text[data-v-359b9b54]{--tw-text-opacity: 1;color:rgb(var(--color-default-text) / var(--tw-text-opacity))}.text-primary-text[data-v-359b9b54]{--tw-text-opacity: 1;color:rgb(var(--color-primary-text) / var(--tw-text-opacity))}.opacity-50[data-v-359b9b54]{opacity:.5}[data-v-359b9b54]:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a[data-v-359b9b54]{font-weight:500;color:#646cff;text-decoration:inherit}a[data-v-359b9b54]:hover{color:#535bf2}body[data-v-359b9b54]{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1[data-v-359b9b54]{font-size:3.2em;line-height:1.1}button[data-v-359b9b54]{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button[data-v-359b9b54]:hover{border-color:#646cff}button[data-v-359b9b54]:focus,button[data-v-359b9b54]:focus-visible{outline:4px auto -webkit-focus-ring-color}.card[data-v-359b9b54]{padding:2em}#app[data-v-359b9b54]{width:100%}@media (prefers-color-scheme: light){[data-v-359b9b54]:root{color:#213547;background-color:#fff}a[data-v-359b9b54]:hover{color:#747bff}button[data-v-359b9b54]{background-color:#f9f9f9}}.hover\\:border-primary-focus[data-v-359b9b54]:hover{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.hover\\:bg-primary-content-bg-hover[data-v-359b9b54]:hover{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg-hover) / var(--tw-bg-opacity))}.focus\\:border-primary-focus[data-v-359b9b54]:focus{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus\\:outline[data-v-359b9b54]:focus{outline-style:solid}.focus\\:outline-1[data-v-359b9b54]:focus{outline-width:1px}.focus\\:outline-primary-focus[data-v-359b9b54]:focus{outline-color:rgb(var(--color-primary-focus) / 1)}.focus-visible\\:border-primary-focus[data-v-359b9b54]:focus-visible{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus-visible\\:outline[data-v-359b9b54]:focus-visible{outline-style:solid}.focus-visible\\:outline-1[data-v-359b9b54]:focus-visible{outline-width:1px}.focus-visible\\:outline-primary-focus[data-v-359b9b54]:focus-visible{outline-color:rgb(var(--color-primary-focus) / 1)}@media (min-width: 640px){.sm\\:flex-row[data-v-359b9b54]{flex-direction:row}}@media (min-width: 768px){.md\\:order-last[data-v-359b9b54]{order:9999}.md\\:flex-row[data-v-359b9b54]{flex-direction:row}}:is(:where(.dark) .dark\\:text-white[data-v-359b9b54]){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}', Gd = /* @__PURE__ */ Ft($d, [["styles", [Wd]], ["__scopeId", "data-v-359b9b54"]]), Kd = { class: "flex flex-col gap-2 p-4 bg-primary-content-bg rounded-2xl" }, Bd = {
  class: "font-semibold text-lg self-start px-2 text-primary-text",
  "data-testid": "display-label"
}, Yd = {
  class: "font-semibold text-6xl self-center text-primary-text dark:text-white",
  "data-testid": "display-value"
}, Xd = /* @__PURE__ */ Ye({
  __name: "MetricsDisplay.ce",
  props: {
    value: { type: Number },
    labelKey: { type: String }
  },
  setup(e) {
    const { t } = Et({
      inheritLocale: !0,
      useScope: "local"
    }), r = e;
    return (a, o) => (Ie(), Me("div", Kd, [
      re("span", Bd, Ne(r.labelKey ? $e(t)(r.labelKey) : r.labelKey), 1),
      re("span", Yd, Ne(r.value), 1)
    ]));
  }
}), Jd = '*[data-v-b886466f],[data-v-b886466f]:before,[data-v-b886466f]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-b886466f]:before,[data-v-b886466f]:after{--tw-content: ""}html[data-v-b886466f],[data-v-b886466f]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-b886466f]{margin:0;line-height:inherit}hr[data-v-b886466f]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-b886466f]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-b886466f],h2[data-v-b886466f],h3[data-v-b886466f],h4[data-v-b886466f],h5[data-v-b886466f],h6[data-v-b886466f]{font-size:inherit;font-weight:inherit}a[data-v-b886466f]{color:inherit;text-decoration:inherit}b[data-v-b886466f],strong[data-v-b886466f]{font-weight:bolder}code[data-v-b886466f],kbd[data-v-b886466f],samp[data-v-b886466f],pre[data-v-b886466f]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-b886466f]{font-size:80%}sub[data-v-b886466f],sup[data-v-b886466f]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-b886466f]{bottom:-.25em}sup[data-v-b886466f]{top:-.5em}table[data-v-b886466f]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-b886466f],input[data-v-b886466f],optgroup[data-v-b886466f],select[data-v-b886466f],textarea[data-v-b886466f]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-b886466f],select[data-v-b886466f]{text-transform:none}button[data-v-b886466f],[type=button][data-v-b886466f],[type=reset][data-v-b886466f],[type=submit][data-v-b886466f]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-b886466f]:-moz-focusring{outline:auto}[data-v-b886466f]:-moz-ui-invalid{box-shadow:none}progress[data-v-b886466f]{vertical-align:baseline}[data-v-b886466f]::-webkit-inner-spin-button,[data-v-b886466f]::-webkit-outer-spin-button{height:auto}[type=search][data-v-b886466f]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-b886466f]::-webkit-search-decoration{-webkit-appearance:none}[data-v-b886466f]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-b886466f]{display:list-item}blockquote[data-v-b886466f],dl[data-v-b886466f],dd[data-v-b886466f],h1[data-v-b886466f],h2[data-v-b886466f],h3[data-v-b886466f],h4[data-v-b886466f],h5[data-v-b886466f],h6[data-v-b886466f],hr[data-v-b886466f],figure[data-v-b886466f],p[data-v-b886466f],pre[data-v-b886466f]{margin:0}fieldset[data-v-b886466f]{margin:0;padding:0}legend[data-v-b886466f]{padding:0}ol[data-v-b886466f],ul[data-v-b886466f],menu[data-v-b886466f]{list-style:none;margin:0;padding:0}dialog[data-v-b886466f]{padding:0}textarea[data-v-b886466f]{resize:vertical}input[data-v-b886466f]::-moz-placeholder,textarea[data-v-b886466f]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-b886466f]::placeholder,textarea[data-v-b886466f]::placeholder{opacity:1;color:#9ca3af}button[data-v-b886466f],[role=button][data-v-b886466f]{cursor:pointer}[data-v-b886466f]:disabled{cursor:default}img[data-v-b886466f],svg[data-v-b886466f],video[data-v-b886466f],canvas[data-v-b886466f],audio[data-v-b886466f],iframe[data-v-b886466f],embed[data-v-b886466f],object[data-v-b886466f]{display:block;vertical-align:middle}img[data-v-b886466f],video[data-v-b886466f]{max-width:100%;height:auto}[hidden][data-v-b886466f]{display:none}[data-v-b886466f]:root{--display-in-light-mode: block;--display-in-dark-mode: none;--white: 255 255 255;--black: 0 0 0;--electric-violet-50: 245 240 255;--electric-violet-100: 237 228 255;--electric-violet-200: 221 205 255;--electric-violet-300: 197 166 255;--electric-violet-400: 171 115 255;--electric-violet-500: 148 59 255;--electric-violet-600: 140 20 255;--electric-violet-700: 128 0 255;--electric-violet-800: 108 1 214;--electric-violet-900: 89 3 175;--electric-violet-950: 54 0 119;--azure-radiance-50: 237 251 255;--azure-radiance-100: 214 243 255;--azure-radiance-200: 181 237 255;--azure-radiance-300: 131 228 255;--azure-radiance-400: 72 210 255;--azure-radiance-500: 30 181 255;--azure-radiance-600: 6 152 255;--azure-radiance-700: 0 132 255;--azure-radiance-800: 8 100 197;--azure-radiance-900: 13 86 155;--azure-radiance-950: 14 52 93;--snow-flurry-50: 237 255 230;--snow-flurry-100: 224 255 214;--snow-flurry-200: 174 255 151;--snow-flurry-300: 123 251 91;--snow-flurry-400: 81 241 42;--snow-flurry-500: 46 215 11;--snow-flurry-600: 31 172 4;--snow-flurry-700: 25 131 8;--snow-flurry-800: 25 103 13;--snow-flurry-900: 24 87 16;--snow-flurry-950: 6 49 2;--neutral-50: 246 246 246;--neutral-100: 231 231 231;--neutral-200: 209 209 209;--neutral-300: 176 176 176;--neutral-400: 136 136 136;--neutral-500: 109 109 109;--neutral-600: 93 93 93;--neutral-700: 79 79 79;--neutral-800: 69 69 69;--neutral-900: 61 61 61;--neutral-950: 28 28 28;--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--electric-violet-950);--color-primary-content-bg: var(--electric-violet-200);--color-primary-content-bg-hover: var(--electric-violet-300);--color-primary-focus: var(--electric-violet-600)}.theme-1[data-v-b886466f]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--azure-radiance-950);--color-primary-content-bg: var(--azure-radiance-200);--color-primary-content-bg-hover: var(--azure-radiance-300);--color-primary-focus: var(--azure-radiance-600)}.theme-2[data-v-b886466f]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--snow-flurry-950);--color-primary-content-bg: var(--snow-flurry-300);--color-primary-content-bg-hover: var(--snow-flurry-400);--color-primary-focus: var(--snow-flurry-500)}.theme-muted[data-v-b886466f]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--neutral-950);--color-primary-content-bg: var(--neutral-100);--color-primary-content-bg-hover: var(--neutral-200);--color-primary-focus: var(--neutral-600)}.dark[data-v-b886466f]{--display-in-light-mode: none;--display-in-dark-mode: block;--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--electric-violet-50);--color-primary-content-bg: var(--electric-violet-800);--color-primary-content-bg-hover: var(--electric-violet-900);--color-primary-focus: var(--electric-violet-400)}.dark .theme-1[data-v-b886466f]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--azure-radiance-50);--color-primary-content-bg: var(--azure-radiance-800);--color-primary-content-bg-hover: var(--azure-radiance-900);--color-primary-focus: var(--azure-radiance-400)}.dark .theme-2[data-v-b886466f]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--snow-flurry-50);--color-primary-content-bg: var(--snow-flurry-800);--color-primary-content-bg-hover: var(--snow-flurry-900);--color-primary-focus: var(--snow-flurry-400)}.dark .theme-muted[data-v-b886466f]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--neutral-50);--color-primary-content-bg: var(--neutral-900);--color-primary-content-bg-hover: var(--neutral-800);--color-primary-focus: var(--neutral-400)}*[data-v-b886466f],[data-v-b886466f]:before,[data-v-b886466f]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-b886466f]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none[data-v-b886466f]{pointer-events:none}.order-first[data-v-b886466f]{order:-9999}.m-4[data-v-b886466f]{margin:1rem}.mx-auto[data-v-b886466f]{margin-left:auto;margin-right:auto}.flex[data-v-b886466f]{display:flex}.h-5[data-v-b886466f]{height:1.25rem}.min-h-\\[calc\\(100vh_-_2rem\\)\\][data-v-b886466f]{min-height:calc(100vh - 2rem)}.w-1\\/2[data-v-b886466f]{width:50%}.w-5[data-v-b886466f]{width:1.25rem}.w-fit[data-v-b886466f]{width:-moz-fit-content;width:fit-content}.w-full[data-v-b886466f]{width:100%}.min-w-16[data-v-b886466f]{min-width:4rem}.max-w-5xl[data-v-b886466f]{max-width:64rem}.max-w-fit[data-v-b886466f]{max-width:-moz-fit-content;max-width:fit-content}.flex-1[data-v-b886466f]{flex:1 1 0%}.flex-\\[2_1_0\\%\\][data-v-b886466f]{flex:2 1 0%}.flex-grow[data-v-b886466f]{flex-grow:1}.flex-row[data-v-b886466f]{flex-direction:row}.flex-col[data-v-b886466f]{flex-direction:column}.items-center[data-v-b886466f]{align-items:center}.items-stretch[data-v-b886466f]{align-items:stretch}.justify-start[data-v-b886466f]{justify-content:flex-start}.justify-end[data-v-b886466f]{justify-content:flex-end}.justify-center[data-v-b886466f]{justify-content:center}.gap-0[data-v-b886466f]{gap:0px}.gap-0\\.5[data-v-b886466f]{gap:.125rem}.gap-2[data-v-b886466f]{gap:.5rem}.gap-3[data-v-b886466f]{gap:.75rem}.gap-4[data-v-b886466f]{gap:1rem}.gap-6[data-v-b886466f]{gap:1.5rem}.self-start[data-v-b886466f]{align-self:flex-start}.self-end[data-v-b886466f]{align-self:flex-end}.self-center[data-v-b886466f]{align-self:center}.whitespace-nowrap[data-v-b886466f]{white-space:nowrap}.rounded-2xl[data-v-b886466f]{border-radius:1rem}.rounded-xl[data-v-b886466f]{border-radius:.75rem}.rounded-l-none[data-v-b886466f]{border-top-left-radius:0;border-bottom-left-radius:0}.rounded-r-none[data-v-b886466f]{border-top-right-radius:0;border-bottom-right-radius:0}.border[data-v-b886466f]{border-width:1px}.border-primary-focus[data-v-b886466f]{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.bg-default-bg[data-v-b886466f]{--tw-bg-opacity: 1;background-color:rgb(var(--color-default-bg) / var(--tw-bg-opacity))}.bg-neutral-950[data-v-b886466f]{--tw-bg-opacity: 1;background-color:rgb(10 10 10 / var(--tw-bg-opacity))}.bg-primary-content-bg[data-v-b886466f]{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg) / var(--tw-bg-opacity))}.bg-white[data-v-b886466f]{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.p-2[data-v-b886466f]{padding:.5rem}.p-4[data-v-b886466f]{padding:1rem}.px-2[data-v-b886466f]{padding-left:.5rem;padding-right:.5rem}.py-0[data-v-b886466f]{padding-top:0;padding-bottom:0}.py-0\\.5[data-v-b886466f]{padding-top:.125rem;padding-bottom:.125rem}.text-left[data-v-b886466f]{text-align:left}.text-2xl[data-v-b886466f]{font-size:1.5rem;line-height:2rem}.text-4xl[data-v-b886466f]{font-size:2.25rem;line-height:2.5rem}.text-6xl[data-v-b886466f]{font-size:3.75rem;line-height:1}.text-lg[data-v-b886466f]{font-size:1.125rem;line-height:1.75rem}.text-sm[data-v-b886466f]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-b886466f]{font-size:1.25rem;line-height:1.75rem}.text-xs[data-v-b886466f]{font-size:.75rem;line-height:1rem}.font-semibold[data-v-b886466f]{font-weight:600}.uppercase[data-v-b886466f]{text-transform:uppercase}.text-default-text[data-v-b886466f]{--tw-text-opacity: 1;color:rgb(var(--color-default-text) / var(--tw-text-opacity))}.text-primary-text[data-v-b886466f]{--tw-text-opacity: 1;color:rgb(var(--color-primary-text) / var(--tw-text-opacity))}.opacity-50[data-v-b886466f]{opacity:.5}[data-v-b886466f]:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a[data-v-b886466f]{font-weight:500;color:#646cff;text-decoration:inherit}a[data-v-b886466f]:hover{color:#535bf2}body[data-v-b886466f]{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1[data-v-b886466f]{font-size:3.2em;line-height:1.1}button[data-v-b886466f]{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button[data-v-b886466f]:hover{border-color:#646cff}button[data-v-b886466f]:focus,button[data-v-b886466f]:focus-visible{outline:4px auto -webkit-focus-ring-color}.card[data-v-b886466f]{padding:2em}#app[data-v-b886466f]{width:100%}@media (prefers-color-scheme: light){[data-v-b886466f]:root{color:#213547;background-color:#fff}a[data-v-b886466f]:hover{color:#747bff}button[data-v-b886466f]{background-color:#f9f9f9}}.hover\\:border-primary-focus[data-v-b886466f]:hover{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.hover\\:bg-primary-content-bg-hover[data-v-b886466f]:hover{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg-hover) / var(--tw-bg-opacity))}.focus\\:border-primary-focus[data-v-b886466f]:focus{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus\\:outline[data-v-b886466f]:focus{outline-style:solid}.focus\\:outline-1[data-v-b886466f]:focus{outline-width:1px}.focus\\:outline-primary-focus[data-v-b886466f]:focus{outline-color:rgb(var(--color-primary-focus) / 1)}.focus-visible\\:border-primary-focus[data-v-b886466f]:focus-visible{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus-visible\\:outline[data-v-b886466f]:focus-visible{outline-style:solid}.focus-visible\\:outline-1[data-v-b886466f]:focus-visible{outline-width:1px}.focus-visible\\:outline-primary-focus[data-v-b886466f]:focus-visible{outline-color:rgb(var(--color-primary-focus) / 1)}@media (min-width: 640px){.sm\\:flex-row[data-v-b886466f]{flex-direction:row}}@media (min-width: 768px){.md\\:order-last[data-v-b886466f]{order:9999}.md\\:flex-row[data-v-b886466f]{flex-direction:row}}:is(:where(.dark) .dark\\:text-white[data-v-b886466f]){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}', qd = /* @__PURE__ */ Ft(Xd, [["styles", [Jd]], ["__scopeId", "data-v-b886466f"]]), Qd = { class: "flex" }, Zd = { class: "text-md uppercase font-semibold" }, ef = /* @__PURE__ */ Ye({
  __name: "ControlPane.ce",
  props: {
    fullWidth: { type: Boolean, default: !1 }
  },
  emits: ["onResetCounter"],
  setup(e, { emit: t }) {
    const a = (e.fullWidth ? "flex-1 " : "") + "text-primary-text flex flex-col items-center bg-primary-content-bg hover:bg-primary-content-bg-hover hover:border-primary-focus focus-visible:border-primary-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-focus focus:border-primary-focus focus:outline focus:outline-1 focus:outline-primary-focus", o = t, n = () => {
      o("onResetCounter");
    }, { t: i } = Et({
      inheritLocale: !0,
      useScope: "local"
    });
    return (s, l) => (Ie(), Me("div", Qd, [
      re("button", {
        type: "button",
        class: Ke(a),
        "data-testid": "control-pane-button",
        onClick: n
      }, [
        re("span", Zd, Ne($e(i)("reset")), 1)
      ])
    ]));
  }
}), tf = '*[data-v-8ce7ab85],[data-v-8ce7ab85]:before,[data-v-8ce7ab85]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-8ce7ab85]:before,[data-v-8ce7ab85]:after{--tw-content: ""}html[data-v-8ce7ab85],[data-v-8ce7ab85]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-8ce7ab85]{margin:0;line-height:inherit}hr[data-v-8ce7ab85]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-8ce7ab85]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-8ce7ab85],h2[data-v-8ce7ab85],h3[data-v-8ce7ab85],h4[data-v-8ce7ab85],h5[data-v-8ce7ab85],h6[data-v-8ce7ab85]{font-size:inherit;font-weight:inherit}a[data-v-8ce7ab85]{color:inherit;text-decoration:inherit}b[data-v-8ce7ab85],strong[data-v-8ce7ab85]{font-weight:bolder}code[data-v-8ce7ab85],kbd[data-v-8ce7ab85],samp[data-v-8ce7ab85],pre[data-v-8ce7ab85]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-8ce7ab85]{font-size:80%}sub[data-v-8ce7ab85],sup[data-v-8ce7ab85]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-8ce7ab85]{bottom:-.25em}sup[data-v-8ce7ab85]{top:-.5em}table[data-v-8ce7ab85]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-8ce7ab85],input[data-v-8ce7ab85],optgroup[data-v-8ce7ab85],select[data-v-8ce7ab85],textarea[data-v-8ce7ab85]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-8ce7ab85],select[data-v-8ce7ab85]{text-transform:none}button[data-v-8ce7ab85],[type=button][data-v-8ce7ab85],[type=reset][data-v-8ce7ab85],[type=submit][data-v-8ce7ab85]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-8ce7ab85]:-moz-focusring{outline:auto}[data-v-8ce7ab85]:-moz-ui-invalid{box-shadow:none}progress[data-v-8ce7ab85]{vertical-align:baseline}[data-v-8ce7ab85]::-webkit-inner-spin-button,[data-v-8ce7ab85]::-webkit-outer-spin-button{height:auto}[type=search][data-v-8ce7ab85]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-8ce7ab85]::-webkit-search-decoration{-webkit-appearance:none}[data-v-8ce7ab85]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-8ce7ab85]{display:list-item}blockquote[data-v-8ce7ab85],dl[data-v-8ce7ab85],dd[data-v-8ce7ab85],h1[data-v-8ce7ab85],h2[data-v-8ce7ab85],h3[data-v-8ce7ab85],h4[data-v-8ce7ab85],h5[data-v-8ce7ab85],h6[data-v-8ce7ab85],hr[data-v-8ce7ab85],figure[data-v-8ce7ab85],p[data-v-8ce7ab85],pre[data-v-8ce7ab85]{margin:0}fieldset[data-v-8ce7ab85]{margin:0;padding:0}legend[data-v-8ce7ab85]{padding:0}ol[data-v-8ce7ab85],ul[data-v-8ce7ab85],menu[data-v-8ce7ab85]{list-style:none;margin:0;padding:0}dialog[data-v-8ce7ab85]{padding:0}textarea[data-v-8ce7ab85]{resize:vertical}input[data-v-8ce7ab85]::-moz-placeholder,textarea[data-v-8ce7ab85]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-8ce7ab85]::placeholder,textarea[data-v-8ce7ab85]::placeholder{opacity:1;color:#9ca3af}button[data-v-8ce7ab85],[role=button][data-v-8ce7ab85]{cursor:pointer}[data-v-8ce7ab85]:disabled{cursor:default}img[data-v-8ce7ab85],svg[data-v-8ce7ab85],video[data-v-8ce7ab85],canvas[data-v-8ce7ab85],audio[data-v-8ce7ab85],iframe[data-v-8ce7ab85],embed[data-v-8ce7ab85],object[data-v-8ce7ab85]{display:block;vertical-align:middle}img[data-v-8ce7ab85],video[data-v-8ce7ab85]{max-width:100%;height:auto}[hidden][data-v-8ce7ab85]{display:none}[data-v-8ce7ab85]:root{--display-in-light-mode: block;--display-in-dark-mode: none;--white: 255 255 255;--black: 0 0 0;--electric-violet-50: 245 240 255;--electric-violet-100: 237 228 255;--electric-violet-200: 221 205 255;--electric-violet-300: 197 166 255;--electric-violet-400: 171 115 255;--electric-violet-500: 148 59 255;--electric-violet-600: 140 20 255;--electric-violet-700: 128 0 255;--electric-violet-800: 108 1 214;--electric-violet-900: 89 3 175;--electric-violet-950: 54 0 119;--azure-radiance-50: 237 251 255;--azure-radiance-100: 214 243 255;--azure-radiance-200: 181 237 255;--azure-radiance-300: 131 228 255;--azure-radiance-400: 72 210 255;--azure-radiance-500: 30 181 255;--azure-radiance-600: 6 152 255;--azure-radiance-700: 0 132 255;--azure-radiance-800: 8 100 197;--azure-radiance-900: 13 86 155;--azure-radiance-950: 14 52 93;--snow-flurry-50: 237 255 230;--snow-flurry-100: 224 255 214;--snow-flurry-200: 174 255 151;--snow-flurry-300: 123 251 91;--snow-flurry-400: 81 241 42;--snow-flurry-500: 46 215 11;--snow-flurry-600: 31 172 4;--snow-flurry-700: 25 131 8;--snow-flurry-800: 25 103 13;--snow-flurry-900: 24 87 16;--snow-flurry-950: 6 49 2;--neutral-50: 246 246 246;--neutral-100: 231 231 231;--neutral-200: 209 209 209;--neutral-300: 176 176 176;--neutral-400: 136 136 136;--neutral-500: 109 109 109;--neutral-600: 93 93 93;--neutral-700: 79 79 79;--neutral-800: 69 69 69;--neutral-900: 61 61 61;--neutral-950: 28 28 28;--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--electric-violet-950);--color-primary-content-bg: var(--electric-violet-200);--color-primary-content-bg-hover: var(--electric-violet-300);--color-primary-focus: var(--electric-violet-600)}.theme-1[data-v-8ce7ab85]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--azure-radiance-950);--color-primary-content-bg: var(--azure-radiance-200);--color-primary-content-bg-hover: var(--azure-radiance-300);--color-primary-focus: var(--azure-radiance-600)}.theme-2[data-v-8ce7ab85]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--snow-flurry-950);--color-primary-content-bg: var(--snow-flurry-300);--color-primary-content-bg-hover: var(--snow-flurry-400);--color-primary-focus: var(--snow-flurry-500)}.theme-muted[data-v-8ce7ab85]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--neutral-950);--color-primary-content-bg: var(--neutral-100);--color-primary-content-bg-hover: var(--neutral-200);--color-primary-focus: var(--neutral-600)}.dark[data-v-8ce7ab85]{--display-in-light-mode: none;--display-in-dark-mode: block;--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--electric-violet-50);--color-primary-content-bg: var(--electric-violet-800);--color-primary-content-bg-hover: var(--electric-violet-900);--color-primary-focus: var(--electric-violet-400)}.dark .theme-1[data-v-8ce7ab85]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--azure-radiance-50);--color-primary-content-bg: var(--azure-radiance-800);--color-primary-content-bg-hover: var(--azure-radiance-900);--color-primary-focus: var(--azure-radiance-400)}.dark .theme-2[data-v-8ce7ab85]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--snow-flurry-50);--color-primary-content-bg: var(--snow-flurry-800);--color-primary-content-bg-hover: var(--snow-flurry-900);--color-primary-focus: var(--snow-flurry-400)}.dark .theme-muted[data-v-8ce7ab85]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--neutral-50);--color-primary-content-bg: var(--neutral-900);--color-primary-content-bg-hover: var(--neutral-800);--color-primary-focus: var(--neutral-400)}*[data-v-8ce7ab85],[data-v-8ce7ab85]:before,[data-v-8ce7ab85]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-8ce7ab85]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none[data-v-8ce7ab85]{pointer-events:none}.order-first[data-v-8ce7ab85]{order:-9999}.m-4[data-v-8ce7ab85]{margin:1rem}.mx-auto[data-v-8ce7ab85]{margin-left:auto;margin-right:auto}.flex[data-v-8ce7ab85]{display:flex}.h-5[data-v-8ce7ab85]{height:1.25rem}.min-h-\\[calc\\(100vh_-_2rem\\)\\][data-v-8ce7ab85]{min-height:calc(100vh - 2rem)}.w-1\\/2[data-v-8ce7ab85]{width:50%}.w-5[data-v-8ce7ab85]{width:1.25rem}.w-fit[data-v-8ce7ab85]{width:-moz-fit-content;width:fit-content}.w-full[data-v-8ce7ab85]{width:100%}.min-w-16[data-v-8ce7ab85]{min-width:4rem}.max-w-5xl[data-v-8ce7ab85]{max-width:64rem}.max-w-fit[data-v-8ce7ab85]{max-width:-moz-fit-content;max-width:fit-content}.flex-1[data-v-8ce7ab85]{flex:1 1 0%}.flex-\\[2_1_0\\%\\][data-v-8ce7ab85]{flex:2 1 0%}.flex-grow[data-v-8ce7ab85]{flex-grow:1}.flex-row[data-v-8ce7ab85]{flex-direction:row}.flex-col[data-v-8ce7ab85]{flex-direction:column}.items-center[data-v-8ce7ab85]{align-items:center}.items-stretch[data-v-8ce7ab85]{align-items:stretch}.justify-start[data-v-8ce7ab85]{justify-content:flex-start}.justify-end[data-v-8ce7ab85]{justify-content:flex-end}.justify-center[data-v-8ce7ab85]{justify-content:center}.gap-0[data-v-8ce7ab85]{gap:0px}.gap-0\\.5[data-v-8ce7ab85]{gap:.125rem}.gap-2[data-v-8ce7ab85]{gap:.5rem}.gap-3[data-v-8ce7ab85]{gap:.75rem}.gap-4[data-v-8ce7ab85]{gap:1rem}.gap-6[data-v-8ce7ab85]{gap:1.5rem}.self-start[data-v-8ce7ab85]{align-self:flex-start}.self-end[data-v-8ce7ab85]{align-self:flex-end}.self-center[data-v-8ce7ab85]{align-self:center}.whitespace-nowrap[data-v-8ce7ab85]{white-space:nowrap}.rounded-2xl[data-v-8ce7ab85]{border-radius:1rem}.rounded-xl[data-v-8ce7ab85]{border-radius:.75rem}.rounded-l-none[data-v-8ce7ab85]{border-top-left-radius:0;border-bottom-left-radius:0}.rounded-r-none[data-v-8ce7ab85]{border-top-right-radius:0;border-bottom-right-radius:0}.border[data-v-8ce7ab85]{border-width:1px}.border-primary-focus[data-v-8ce7ab85]{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.bg-default-bg[data-v-8ce7ab85]{--tw-bg-opacity: 1;background-color:rgb(var(--color-default-bg) / var(--tw-bg-opacity))}.bg-neutral-950[data-v-8ce7ab85]{--tw-bg-opacity: 1;background-color:rgb(10 10 10 / var(--tw-bg-opacity))}.bg-primary-content-bg[data-v-8ce7ab85]{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg) / var(--tw-bg-opacity))}.bg-white[data-v-8ce7ab85]{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.p-2[data-v-8ce7ab85]{padding:.5rem}.p-4[data-v-8ce7ab85]{padding:1rem}.px-2[data-v-8ce7ab85]{padding-left:.5rem;padding-right:.5rem}.py-0[data-v-8ce7ab85]{padding-top:0;padding-bottom:0}.py-0\\.5[data-v-8ce7ab85]{padding-top:.125rem;padding-bottom:.125rem}.text-left[data-v-8ce7ab85]{text-align:left}.text-2xl[data-v-8ce7ab85]{font-size:1.5rem;line-height:2rem}.text-4xl[data-v-8ce7ab85]{font-size:2.25rem;line-height:2.5rem}.text-6xl[data-v-8ce7ab85]{font-size:3.75rem;line-height:1}.text-lg[data-v-8ce7ab85]{font-size:1.125rem;line-height:1.75rem}.text-sm[data-v-8ce7ab85]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-8ce7ab85]{font-size:1.25rem;line-height:1.75rem}.text-xs[data-v-8ce7ab85]{font-size:.75rem;line-height:1rem}.font-semibold[data-v-8ce7ab85]{font-weight:600}.uppercase[data-v-8ce7ab85]{text-transform:uppercase}.text-default-text[data-v-8ce7ab85]{--tw-text-opacity: 1;color:rgb(var(--color-default-text) / var(--tw-text-opacity))}.text-primary-text[data-v-8ce7ab85]{--tw-text-opacity: 1;color:rgb(var(--color-primary-text) / var(--tw-text-opacity))}.opacity-50[data-v-8ce7ab85]{opacity:.5}[data-v-8ce7ab85]:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a[data-v-8ce7ab85]{font-weight:500;color:#646cff;text-decoration:inherit}a[data-v-8ce7ab85]:hover{color:#535bf2}body[data-v-8ce7ab85]{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1[data-v-8ce7ab85]{font-size:3.2em;line-height:1.1}button[data-v-8ce7ab85]{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button[data-v-8ce7ab85]:hover{border-color:#646cff}button[data-v-8ce7ab85]:focus,button[data-v-8ce7ab85]:focus-visible{outline:4px auto -webkit-focus-ring-color}.card[data-v-8ce7ab85]{padding:2em}#app[data-v-8ce7ab85]{width:100%}@media (prefers-color-scheme: light){[data-v-8ce7ab85]:root{color:#213547;background-color:#fff}a[data-v-8ce7ab85]:hover{color:#747bff}button[data-v-8ce7ab85]{background-color:#f9f9f9}}.hover\\:border-primary-focus[data-v-8ce7ab85]:hover{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.hover\\:bg-primary-content-bg-hover[data-v-8ce7ab85]:hover{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg-hover) / var(--tw-bg-opacity))}.focus\\:border-primary-focus[data-v-8ce7ab85]:focus{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus\\:outline[data-v-8ce7ab85]:focus{outline-style:solid}.focus\\:outline-1[data-v-8ce7ab85]:focus{outline-width:1px}.focus\\:outline-primary-focus[data-v-8ce7ab85]:focus{outline-color:rgb(var(--color-primary-focus) / 1)}.focus-visible\\:border-primary-focus[data-v-8ce7ab85]:focus-visible{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus-visible\\:outline[data-v-8ce7ab85]:focus-visible{outline-style:solid}.focus-visible\\:outline-1[data-v-8ce7ab85]:focus-visible{outline-width:1px}.focus-visible\\:outline-primary-focus[data-v-8ce7ab85]:focus-visible{outline-color:rgb(var(--color-primary-focus) / 1)}@media (min-width: 640px){.sm\\:flex-row[data-v-8ce7ab85]{flex-direction:row}}@media (min-width: 768px){.md\\:order-last[data-v-8ce7ab85]{order:9999}.md\\:flex-row[data-v-8ce7ab85]{flex-direction:row}}:is(:where(.dark) .dark\\:text-white[data-v-8ce7ab85]){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}', rf = /* @__PURE__ */ Ft(ef, [["styles", [tf]], ["__scopeId", "data-v-8ce7ab85"]]), af = { class: "flex flex-col items-stretch" }, of = ["onClick"], nf = { class: "text-2xl" }, sf = /* @__PURE__ */ Ye({
  __name: "LocalePicker.ce",
  emits: ["onLocaleChange"],
  setup(e, { emit: t }) {
    const { locale: r } = Et({
      inheritLocale: !0,
      useScope: "local"
    }), a = (n) => {
      Ea.global.locale.value = n, o("onLocaleChange", n);
    }, o = t;
    return (n, i) => (Ie(), Me("div", af, [
      (Ie(!0), Me(ye, null, el($e(Ii), (s, l) => (Ie(), Me("div", {
        key: l,
        class: "flex-grow"
      }, [
        l !== $e(r) ? (Ie(), Me("button", {
          key: 0,
          class: Ke(
            "flex items-center gap-2 px-2 py-0.5 text-sm text-left w-fit bg-primary-content-bg hover:bg-primary-content-bg-hover text-primary-text hover:bg-primary-content-bg-hover hover:border-primary-focus focus-visible:border-primary-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-focus focus:border-primary-focus focus:outline focus:outline-1 focus:outline-primary-focus" + (l === $e(r) ? " opacity-50 pointer-events-none" : "")
          ),
          "data-testid": "language-picker",
          onClick: (d) => a(l)
        }, [
          re("span", nf, Ne(s.flag), 1),
          re("span", null, [
            ri(Ne(s.switchTo) + " ", 1),
            re("strong", null, Ne(s.label), 1)
          ])
        ], 10, of)) : _r("", !0)
      ]))), 128))
    ]));
  }
}), lf = '*[data-v-8d12c5e2],[data-v-8d12c5e2]:before,[data-v-8d12c5e2]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-8d12c5e2]:before,[data-v-8d12c5e2]:after{--tw-content: ""}html[data-v-8d12c5e2],[data-v-8d12c5e2]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-8d12c5e2]{margin:0;line-height:inherit}hr[data-v-8d12c5e2]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-8d12c5e2]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-8d12c5e2],h2[data-v-8d12c5e2],h3[data-v-8d12c5e2],h4[data-v-8d12c5e2],h5[data-v-8d12c5e2],h6[data-v-8d12c5e2]{font-size:inherit;font-weight:inherit}a[data-v-8d12c5e2]{color:inherit;text-decoration:inherit}b[data-v-8d12c5e2],strong[data-v-8d12c5e2]{font-weight:bolder}code[data-v-8d12c5e2],kbd[data-v-8d12c5e2],samp[data-v-8d12c5e2],pre[data-v-8d12c5e2]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-8d12c5e2]{font-size:80%}sub[data-v-8d12c5e2],sup[data-v-8d12c5e2]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-8d12c5e2]{bottom:-.25em}sup[data-v-8d12c5e2]{top:-.5em}table[data-v-8d12c5e2]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-8d12c5e2],input[data-v-8d12c5e2],optgroup[data-v-8d12c5e2],select[data-v-8d12c5e2],textarea[data-v-8d12c5e2]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-8d12c5e2],select[data-v-8d12c5e2]{text-transform:none}button[data-v-8d12c5e2],[type=button][data-v-8d12c5e2],[type=reset][data-v-8d12c5e2],[type=submit][data-v-8d12c5e2]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-8d12c5e2]:-moz-focusring{outline:auto}[data-v-8d12c5e2]:-moz-ui-invalid{box-shadow:none}progress[data-v-8d12c5e2]{vertical-align:baseline}[data-v-8d12c5e2]::-webkit-inner-spin-button,[data-v-8d12c5e2]::-webkit-outer-spin-button{height:auto}[type=search][data-v-8d12c5e2]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-8d12c5e2]::-webkit-search-decoration{-webkit-appearance:none}[data-v-8d12c5e2]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-8d12c5e2]{display:list-item}blockquote[data-v-8d12c5e2],dl[data-v-8d12c5e2],dd[data-v-8d12c5e2],h1[data-v-8d12c5e2],h2[data-v-8d12c5e2],h3[data-v-8d12c5e2],h4[data-v-8d12c5e2],h5[data-v-8d12c5e2],h6[data-v-8d12c5e2],hr[data-v-8d12c5e2],figure[data-v-8d12c5e2],p[data-v-8d12c5e2],pre[data-v-8d12c5e2]{margin:0}fieldset[data-v-8d12c5e2]{margin:0;padding:0}legend[data-v-8d12c5e2]{padding:0}ol[data-v-8d12c5e2],ul[data-v-8d12c5e2],menu[data-v-8d12c5e2]{list-style:none;margin:0;padding:0}dialog[data-v-8d12c5e2]{padding:0}textarea[data-v-8d12c5e2]{resize:vertical}input[data-v-8d12c5e2]::-moz-placeholder,textarea[data-v-8d12c5e2]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-8d12c5e2]::placeholder,textarea[data-v-8d12c5e2]::placeholder{opacity:1;color:#9ca3af}button[data-v-8d12c5e2],[role=button][data-v-8d12c5e2]{cursor:pointer}[data-v-8d12c5e2]:disabled{cursor:default}img[data-v-8d12c5e2],svg[data-v-8d12c5e2],video[data-v-8d12c5e2],canvas[data-v-8d12c5e2],audio[data-v-8d12c5e2],iframe[data-v-8d12c5e2],embed[data-v-8d12c5e2],object[data-v-8d12c5e2]{display:block;vertical-align:middle}img[data-v-8d12c5e2],video[data-v-8d12c5e2]{max-width:100%;height:auto}[hidden][data-v-8d12c5e2]{display:none}[data-v-8d12c5e2]:root{--display-in-light-mode: block;--display-in-dark-mode: none;--white: 255 255 255;--black: 0 0 0;--electric-violet-50: 245 240 255;--electric-violet-100: 237 228 255;--electric-violet-200: 221 205 255;--electric-violet-300: 197 166 255;--electric-violet-400: 171 115 255;--electric-violet-500: 148 59 255;--electric-violet-600: 140 20 255;--electric-violet-700: 128 0 255;--electric-violet-800: 108 1 214;--electric-violet-900: 89 3 175;--electric-violet-950: 54 0 119;--azure-radiance-50: 237 251 255;--azure-radiance-100: 214 243 255;--azure-radiance-200: 181 237 255;--azure-radiance-300: 131 228 255;--azure-radiance-400: 72 210 255;--azure-radiance-500: 30 181 255;--azure-radiance-600: 6 152 255;--azure-radiance-700: 0 132 255;--azure-radiance-800: 8 100 197;--azure-radiance-900: 13 86 155;--azure-radiance-950: 14 52 93;--snow-flurry-50: 237 255 230;--snow-flurry-100: 224 255 214;--snow-flurry-200: 174 255 151;--snow-flurry-300: 123 251 91;--snow-flurry-400: 81 241 42;--snow-flurry-500: 46 215 11;--snow-flurry-600: 31 172 4;--snow-flurry-700: 25 131 8;--snow-flurry-800: 25 103 13;--snow-flurry-900: 24 87 16;--snow-flurry-950: 6 49 2;--neutral-50: 246 246 246;--neutral-100: 231 231 231;--neutral-200: 209 209 209;--neutral-300: 176 176 176;--neutral-400: 136 136 136;--neutral-500: 109 109 109;--neutral-600: 93 93 93;--neutral-700: 79 79 79;--neutral-800: 69 69 69;--neutral-900: 61 61 61;--neutral-950: 28 28 28;--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--electric-violet-950);--color-primary-content-bg: var(--electric-violet-200);--color-primary-content-bg-hover: var(--electric-violet-300);--color-primary-focus: var(--electric-violet-600)}.theme-1[data-v-8d12c5e2]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--azure-radiance-950);--color-primary-content-bg: var(--azure-radiance-200);--color-primary-content-bg-hover: var(--azure-radiance-300);--color-primary-focus: var(--azure-radiance-600)}.theme-2[data-v-8d12c5e2]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--snow-flurry-950);--color-primary-content-bg: var(--snow-flurry-300);--color-primary-content-bg-hover: var(--snow-flurry-400);--color-primary-focus: var(--snow-flurry-500)}.theme-muted[data-v-8d12c5e2]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--neutral-950);--color-primary-content-bg: var(--neutral-100);--color-primary-content-bg-hover: var(--neutral-200);--color-primary-focus: var(--neutral-600)}.dark[data-v-8d12c5e2]{--display-in-light-mode: none;--display-in-dark-mode: block;--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--electric-violet-50);--color-primary-content-bg: var(--electric-violet-800);--color-primary-content-bg-hover: var(--electric-violet-900);--color-primary-focus: var(--electric-violet-400)}.dark .theme-1[data-v-8d12c5e2]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--azure-radiance-50);--color-primary-content-bg: var(--azure-radiance-800);--color-primary-content-bg-hover: var(--azure-radiance-900);--color-primary-focus: var(--azure-radiance-400)}.dark .theme-2[data-v-8d12c5e2]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--snow-flurry-50);--color-primary-content-bg: var(--snow-flurry-800);--color-primary-content-bg-hover: var(--snow-flurry-900);--color-primary-focus: var(--snow-flurry-400)}.dark .theme-muted[data-v-8d12c5e2]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--neutral-50);--color-primary-content-bg: var(--neutral-900);--color-primary-content-bg-hover: var(--neutral-800);--color-primary-focus: var(--neutral-400)}*[data-v-8d12c5e2],[data-v-8d12c5e2]:before,[data-v-8d12c5e2]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-8d12c5e2]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none[data-v-8d12c5e2]{pointer-events:none}.order-first[data-v-8d12c5e2]{order:-9999}.m-4[data-v-8d12c5e2]{margin:1rem}.mx-auto[data-v-8d12c5e2]{margin-left:auto;margin-right:auto}.flex[data-v-8d12c5e2]{display:flex}.h-5[data-v-8d12c5e2]{height:1.25rem}.min-h-\\[calc\\(100vh_-_2rem\\)\\][data-v-8d12c5e2]{min-height:calc(100vh - 2rem)}.w-1\\/2[data-v-8d12c5e2]{width:50%}.w-5[data-v-8d12c5e2]{width:1.25rem}.w-fit[data-v-8d12c5e2]{width:-moz-fit-content;width:fit-content}.w-full[data-v-8d12c5e2]{width:100%}.min-w-16[data-v-8d12c5e2]{min-width:4rem}.max-w-5xl[data-v-8d12c5e2]{max-width:64rem}.max-w-fit[data-v-8d12c5e2]{max-width:-moz-fit-content;max-width:fit-content}.flex-1[data-v-8d12c5e2]{flex:1 1 0%}.flex-\\[2_1_0\\%\\][data-v-8d12c5e2]{flex:2 1 0%}.flex-grow[data-v-8d12c5e2]{flex-grow:1}.flex-row[data-v-8d12c5e2]{flex-direction:row}.flex-col[data-v-8d12c5e2]{flex-direction:column}.items-center[data-v-8d12c5e2]{align-items:center}.items-stretch[data-v-8d12c5e2]{align-items:stretch}.justify-start[data-v-8d12c5e2]{justify-content:flex-start}.justify-end[data-v-8d12c5e2]{justify-content:flex-end}.justify-center[data-v-8d12c5e2]{justify-content:center}.gap-0[data-v-8d12c5e2]{gap:0px}.gap-0\\.5[data-v-8d12c5e2]{gap:.125rem}.gap-2[data-v-8d12c5e2]{gap:.5rem}.gap-3[data-v-8d12c5e2]{gap:.75rem}.gap-4[data-v-8d12c5e2]{gap:1rem}.gap-6[data-v-8d12c5e2]{gap:1.5rem}.self-start[data-v-8d12c5e2]{align-self:flex-start}.self-end[data-v-8d12c5e2]{align-self:flex-end}.self-center[data-v-8d12c5e2]{align-self:center}.whitespace-nowrap[data-v-8d12c5e2]{white-space:nowrap}.rounded-2xl[data-v-8d12c5e2]{border-radius:1rem}.rounded-xl[data-v-8d12c5e2]{border-radius:.75rem}.rounded-l-none[data-v-8d12c5e2]{border-top-left-radius:0;border-bottom-left-radius:0}.rounded-r-none[data-v-8d12c5e2]{border-top-right-radius:0;border-bottom-right-radius:0}.border[data-v-8d12c5e2]{border-width:1px}.border-primary-focus[data-v-8d12c5e2]{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.bg-default-bg[data-v-8d12c5e2]{--tw-bg-opacity: 1;background-color:rgb(var(--color-default-bg) / var(--tw-bg-opacity))}.bg-neutral-950[data-v-8d12c5e2]{--tw-bg-opacity: 1;background-color:rgb(10 10 10 / var(--tw-bg-opacity))}.bg-primary-content-bg[data-v-8d12c5e2]{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg) / var(--tw-bg-opacity))}.bg-white[data-v-8d12c5e2]{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.p-2[data-v-8d12c5e2]{padding:.5rem}.p-4[data-v-8d12c5e2]{padding:1rem}.px-2[data-v-8d12c5e2]{padding-left:.5rem;padding-right:.5rem}.py-0[data-v-8d12c5e2]{padding-top:0;padding-bottom:0}.py-0\\.5[data-v-8d12c5e2]{padding-top:.125rem;padding-bottom:.125rem}.text-left[data-v-8d12c5e2]{text-align:left}.text-2xl[data-v-8d12c5e2]{font-size:1.5rem;line-height:2rem}.text-4xl[data-v-8d12c5e2]{font-size:2.25rem;line-height:2.5rem}.text-6xl[data-v-8d12c5e2]{font-size:3.75rem;line-height:1}.text-lg[data-v-8d12c5e2]{font-size:1.125rem;line-height:1.75rem}.text-sm[data-v-8d12c5e2]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-8d12c5e2]{font-size:1.25rem;line-height:1.75rem}.text-xs[data-v-8d12c5e2]{font-size:.75rem;line-height:1rem}.font-semibold[data-v-8d12c5e2]{font-weight:600}.uppercase[data-v-8d12c5e2]{text-transform:uppercase}.text-default-text[data-v-8d12c5e2]{--tw-text-opacity: 1;color:rgb(var(--color-default-text) / var(--tw-text-opacity))}.text-primary-text[data-v-8d12c5e2]{--tw-text-opacity: 1;color:rgb(var(--color-primary-text) / var(--tw-text-opacity))}.opacity-50[data-v-8d12c5e2]{opacity:.5}[data-v-8d12c5e2]:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a[data-v-8d12c5e2]{font-weight:500;color:#646cff;text-decoration:inherit}a[data-v-8d12c5e2]:hover{color:#535bf2}body[data-v-8d12c5e2]{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1[data-v-8d12c5e2]{font-size:3.2em;line-height:1.1}button[data-v-8d12c5e2]{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button[data-v-8d12c5e2]:hover{border-color:#646cff}button[data-v-8d12c5e2]:focus,button[data-v-8d12c5e2]:focus-visible{outline:4px auto -webkit-focus-ring-color}.card[data-v-8d12c5e2]{padding:2em}#app[data-v-8d12c5e2]{width:100%}@media (prefers-color-scheme: light){[data-v-8d12c5e2]:root{color:#213547;background-color:#fff}a[data-v-8d12c5e2]:hover{color:#747bff}button[data-v-8d12c5e2]{background-color:#f9f9f9}}.hover\\:border-primary-focus[data-v-8d12c5e2]:hover{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.hover\\:bg-primary-content-bg-hover[data-v-8d12c5e2]:hover{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg-hover) / var(--tw-bg-opacity))}.focus\\:border-primary-focus[data-v-8d12c5e2]:focus{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus\\:outline[data-v-8d12c5e2]:focus{outline-style:solid}.focus\\:outline-1[data-v-8d12c5e2]:focus{outline-width:1px}.focus\\:outline-primary-focus[data-v-8d12c5e2]:focus{outline-color:rgb(var(--color-primary-focus) / 1)}.focus-visible\\:border-primary-focus[data-v-8d12c5e2]:focus-visible{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus-visible\\:outline[data-v-8d12c5e2]:focus-visible{outline-style:solid}.focus-visible\\:outline-1[data-v-8d12c5e2]:focus-visible{outline-width:1px}.focus-visible\\:outline-primary-focus[data-v-8d12c5e2]:focus-visible{outline-color:rgb(var(--color-primary-focus) / 1)}@media (min-width: 640px){.sm\\:flex-row[data-v-8d12c5e2]{flex-direction:row}}@media (min-width: 768px){.md\\:order-last[data-v-8d12c5e2]{order:9999}.md\\:flex-row[data-v-8d12c5e2]{flex-direction:row}}:is(:where(.dark) .dark\\:text-white[data-v-8d12c5e2]){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}', cf = /* @__PURE__ */ Ft(sf, [["styles", [lf]], ["__scopeId", "data-v-8d12c5e2"]]), Si = (e) => (Is("data-v-080bf485"), e = e(), Ss(), e), df = { class: "text-default-text flex flex-col gap-2 w-fit" }, ff = /* @__PURE__ */ Si(() => /* @__PURE__ */ re("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ re("path", { d: "M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" })
], -1)), uf = [
  ff
], bf = /* @__PURE__ */ Si(() => /* @__PURE__ */ re("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ re("path", {
    "fill-rule": "evenodd",
    d: "M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z",
    "clip-rule": "evenodd"
  })
], -1)), pf = [
  bf
], mf = /* @__PURE__ */ Ye({
  __name: "DarkModeSwitcher.ce",
  setup(e) {
    const t = () => {
      document.documentElement.classList.contains("dark") ? (document.documentElement.style.colorScheme = "light", document.documentElement.setAttribute("data-mode", "light"), document.documentElement.classList.remove("dark"), localStorage.theme = "light") : (document.documentElement.style.colorScheme = "dark", document.documentElement.setAttribute("data-mode", "dark"), document.documentElement.classList.add("dark"), localStorage.theme = "dark");
    };
    return (r, a) => (Ie(), Me("div", df, [
      re("button", {
        class: Ke("p-2 text-sm text-left w-full bg-primary-content-bg hover:bg-primary-content-bg-hover text-primary-text hover:bg-primary-content-bg-hover hover:border-primary-focus focus-visible:border-primary-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-focus focus:border-primary-focus focus:outline focus:outline-1 focus:outline-primary-focus"),
        "data-testid": "dark-mode-switcher-to-light",
        style: { display: "var(--display-in-dark-mode)" },
        onClick: t
      }, uf),
      re("button", {
        class: Ke("p-2 text-sm text-left w-full bg-primary-content-bg hover:bg-primary-content-bg-hover text-primary-text hover:bg-primary-content-bg-hover hover:border-primary-focus focus-visible:border-primary-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-focus focus:border-primary-focus focus:outline focus:outline-1 focus:outline-primary-focus"),
        "data-testid": "dark-mode-switcher-to-dark",
        style: { display: "var(--display-in-light-mode)" },
        onClick: t
      }, pf)
    ]));
  }
}), vf = '*[data-v-080bf485],[data-v-080bf485]:before,[data-v-080bf485]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-080bf485]:before,[data-v-080bf485]:after{--tw-content: ""}html[data-v-080bf485],[data-v-080bf485]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-080bf485]{margin:0;line-height:inherit}hr[data-v-080bf485]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-080bf485]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-080bf485],h2[data-v-080bf485],h3[data-v-080bf485],h4[data-v-080bf485],h5[data-v-080bf485],h6[data-v-080bf485]{font-size:inherit;font-weight:inherit}a[data-v-080bf485]{color:inherit;text-decoration:inherit}b[data-v-080bf485],strong[data-v-080bf485]{font-weight:bolder}code[data-v-080bf485],kbd[data-v-080bf485],samp[data-v-080bf485],pre[data-v-080bf485]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-080bf485]{font-size:80%}sub[data-v-080bf485],sup[data-v-080bf485]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-080bf485]{bottom:-.25em}sup[data-v-080bf485]{top:-.5em}table[data-v-080bf485]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-080bf485],input[data-v-080bf485],optgroup[data-v-080bf485],select[data-v-080bf485],textarea[data-v-080bf485]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-080bf485],select[data-v-080bf485]{text-transform:none}button[data-v-080bf485],[type=button][data-v-080bf485],[type=reset][data-v-080bf485],[type=submit][data-v-080bf485]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-080bf485]:-moz-focusring{outline:auto}[data-v-080bf485]:-moz-ui-invalid{box-shadow:none}progress[data-v-080bf485]{vertical-align:baseline}[data-v-080bf485]::-webkit-inner-spin-button,[data-v-080bf485]::-webkit-outer-spin-button{height:auto}[type=search][data-v-080bf485]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-080bf485]::-webkit-search-decoration{-webkit-appearance:none}[data-v-080bf485]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-080bf485]{display:list-item}blockquote[data-v-080bf485],dl[data-v-080bf485],dd[data-v-080bf485],h1[data-v-080bf485],h2[data-v-080bf485],h3[data-v-080bf485],h4[data-v-080bf485],h5[data-v-080bf485],h6[data-v-080bf485],hr[data-v-080bf485],figure[data-v-080bf485],p[data-v-080bf485],pre[data-v-080bf485]{margin:0}fieldset[data-v-080bf485]{margin:0;padding:0}legend[data-v-080bf485]{padding:0}ol[data-v-080bf485],ul[data-v-080bf485],menu[data-v-080bf485]{list-style:none;margin:0;padding:0}dialog[data-v-080bf485]{padding:0}textarea[data-v-080bf485]{resize:vertical}input[data-v-080bf485]::-moz-placeholder,textarea[data-v-080bf485]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-080bf485]::placeholder,textarea[data-v-080bf485]::placeholder{opacity:1;color:#9ca3af}button[data-v-080bf485],[role=button][data-v-080bf485]{cursor:pointer}[data-v-080bf485]:disabled{cursor:default}img[data-v-080bf485],svg[data-v-080bf485],video[data-v-080bf485],canvas[data-v-080bf485],audio[data-v-080bf485],iframe[data-v-080bf485],embed[data-v-080bf485],object[data-v-080bf485]{display:block;vertical-align:middle}img[data-v-080bf485],video[data-v-080bf485]{max-width:100%;height:auto}[hidden][data-v-080bf485]{display:none}[data-v-080bf485]:root{--display-in-light-mode: block;--display-in-dark-mode: none;--white: 255 255 255;--black: 0 0 0;--electric-violet-50: 245 240 255;--electric-violet-100: 237 228 255;--electric-violet-200: 221 205 255;--electric-violet-300: 197 166 255;--electric-violet-400: 171 115 255;--electric-violet-500: 148 59 255;--electric-violet-600: 140 20 255;--electric-violet-700: 128 0 255;--electric-violet-800: 108 1 214;--electric-violet-900: 89 3 175;--electric-violet-950: 54 0 119;--azure-radiance-50: 237 251 255;--azure-radiance-100: 214 243 255;--azure-radiance-200: 181 237 255;--azure-radiance-300: 131 228 255;--azure-radiance-400: 72 210 255;--azure-radiance-500: 30 181 255;--azure-radiance-600: 6 152 255;--azure-radiance-700: 0 132 255;--azure-radiance-800: 8 100 197;--azure-radiance-900: 13 86 155;--azure-radiance-950: 14 52 93;--snow-flurry-50: 237 255 230;--snow-flurry-100: 224 255 214;--snow-flurry-200: 174 255 151;--snow-flurry-300: 123 251 91;--snow-flurry-400: 81 241 42;--snow-flurry-500: 46 215 11;--snow-flurry-600: 31 172 4;--snow-flurry-700: 25 131 8;--snow-flurry-800: 25 103 13;--snow-flurry-900: 24 87 16;--snow-flurry-950: 6 49 2;--neutral-50: 246 246 246;--neutral-100: 231 231 231;--neutral-200: 209 209 209;--neutral-300: 176 176 176;--neutral-400: 136 136 136;--neutral-500: 109 109 109;--neutral-600: 93 93 93;--neutral-700: 79 79 79;--neutral-800: 69 69 69;--neutral-900: 61 61 61;--neutral-950: 28 28 28;--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--electric-violet-950);--color-primary-content-bg: var(--electric-violet-200);--color-primary-content-bg-hover: var(--electric-violet-300);--color-primary-focus: var(--electric-violet-600)}.theme-1[data-v-080bf485]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--azure-radiance-950);--color-primary-content-bg: var(--azure-radiance-200);--color-primary-content-bg-hover: var(--azure-radiance-300);--color-primary-focus: var(--azure-radiance-600)}.theme-2[data-v-080bf485]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--snow-flurry-950);--color-primary-content-bg: var(--snow-flurry-300);--color-primary-content-bg-hover: var(--snow-flurry-400);--color-primary-focus: var(--snow-flurry-500)}.theme-muted[data-v-080bf485]{--color-default-text: var(--neutral-900);--color-default-bg: var(--white);--color-primary-text: var(--neutral-950);--color-primary-content-bg: var(--neutral-100);--color-primary-content-bg-hover: var(--neutral-200);--color-primary-focus: var(--neutral-600)}.dark[data-v-080bf485]{--display-in-light-mode: none;--display-in-dark-mode: block;--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--electric-violet-50);--color-primary-content-bg: var(--electric-violet-800);--color-primary-content-bg-hover: var(--electric-violet-900);--color-primary-focus: var(--electric-violet-400)}.dark .theme-1[data-v-080bf485]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--azure-radiance-50);--color-primary-content-bg: var(--azure-radiance-800);--color-primary-content-bg-hover: var(--azure-radiance-900);--color-primary-focus: var(--azure-radiance-400)}.dark .theme-2[data-v-080bf485]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--snow-flurry-50);--color-primary-content-bg: var(--snow-flurry-800);--color-primary-content-bg-hover: var(--snow-flurry-900);--color-primary-focus: var(--snow-flurry-400)}.dark .theme-muted[data-v-080bf485]{--color-default-text: var(--neutral-50);--color-default-bg: var(--black);--color-primary-text: var(--neutral-50);--color-primary-content-bg: var(--neutral-900);--color-primary-content-bg-hover: var(--neutral-800);--color-primary-focus: var(--neutral-400)}*[data-v-080bf485],[data-v-080bf485]:before,[data-v-080bf485]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-080bf485]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none[data-v-080bf485]{pointer-events:none}.order-first[data-v-080bf485]{order:-9999}.m-4[data-v-080bf485]{margin:1rem}.mx-auto[data-v-080bf485]{margin-left:auto;margin-right:auto}.flex[data-v-080bf485]{display:flex}.h-5[data-v-080bf485]{height:1.25rem}.min-h-\\[calc\\(100vh_-_2rem\\)\\][data-v-080bf485]{min-height:calc(100vh - 2rem)}.w-1\\/2[data-v-080bf485]{width:50%}.w-5[data-v-080bf485]{width:1.25rem}.w-fit[data-v-080bf485]{width:-moz-fit-content;width:fit-content}.w-full[data-v-080bf485]{width:100%}.min-w-16[data-v-080bf485]{min-width:4rem}.max-w-5xl[data-v-080bf485]{max-width:64rem}.max-w-fit[data-v-080bf485]{max-width:-moz-fit-content;max-width:fit-content}.flex-1[data-v-080bf485]{flex:1 1 0%}.flex-\\[2_1_0\\%\\][data-v-080bf485]{flex:2 1 0%}.flex-grow[data-v-080bf485]{flex-grow:1}.flex-row[data-v-080bf485]{flex-direction:row}.flex-col[data-v-080bf485]{flex-direction:column}.items-center[data-v-080bf485]{align-items:center}.items-stretch[data-v-080bf485]{align-items:stretch}.justify-start[data-v-080bf485]{justify-content:flex-start}.justify-end[data-v-080bf485]{justify-content:flex-end}.justify-center[data-v-080bf485]{justify-content:center}.gap-0[data-v-080bf485]{gap:0px}.gap-0\\.5[data-v-080bf485]{gap:.125rem}.gap-2[data-v-080bf485]{gap:.5rem}.gap-3[data-v-080bf485]{gap:.75rem}.gap-4[data-v-080bf485]{gap:1rem}.gap-6[data-v-080bf485]{gap:1.5rem}.self-start[data-v-080bf485]{align-self:flex-start}.self-end[data-v-080bf485]{align-self:flex-end}.self-center[data-v-080bf485]{align-self:center}.whitespace-nowrap[data-v-080bf485]{white-space:nowrap}.rounded-2xl[data-v-080bf485]{border-radius:1rem}.rounded-xl[data-v-080bf485]{border-radius:.75rem}.rounded-l-none[data-v-080bf485]{border-top-left-radius:0;border-bottom-left-radius:0}.rounded-r-none[data-v-080bf485]{border-top-right-radius:0;border-bottom-right-radius:0}.border[data-v-080bf485]{border-width:1px}.border-primary-focus[data-v-080bf485]{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.bg-default-bg[data-v-080bf485]{--tw-bg-opacity: 1;background-color:rgb(var(--color-default-bg) / var(--tw-bg-opacity))}.bg-neutral-950[data-v-080bf485]{--tw-bg-opacity: 1;background-color:rgb(10 10 10 / var(--tw-bg-opacity))}.bg-primary-content-bg[data-v-080bf485]{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg) / var(--tw-bg-opacity))}.bg-white[data-v-080bf485]{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.p-2[data-v-080bf485]{padding:.5rem}.p-4[data-v-080bf485]{padding:1rem}.px-2[data-v-080bf485]{padding-left:.5rem;padding-right:.5rem}.py-0[data-v-080bf485]{padding-top:0;padding-bottom:0}.py-0\\.5[data-v-080bf485]{padding-top:.125rem;padding-bottom:.125rem}.text-left[data-v-080bf485]{text-align:left}.text-2xl[data-v-080bf485]{font-size:1.5rem;line-height:2rem}.text-4xl[data-v-080bf485]{font-size:2.25rem;line-height:2.5rem}.text-6xl[data-v-080bf485]{font-size:3.75rem;line-height:1}.text-lg[data-v-080bf485]{font-size:1.125rem;line-height:1.75rem}.text-sm[data-v-080bf485]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-080bf485]{font-size:1.25rem;line-height:1.75rem}.text-xs[data-v-080bf485]{font-size:.75rem;line-height:1rem}.font-semibold[data-v-080bf485]{font-weight:600}.uppercase[data-v-080bf485]{text-transform:uppercase}.text-default-text[data-v-080bf485]{--tw-text-opacity: 1;color:rgb(var(--color-default-text) / var(--tw-text-opacity))}.text-primary-text[data-v-080bf485]{--tw-text-opacity: 1;color:rgb(var(--color-primary-text) / var(--tw-text-opacity))}.opacity-50[data-v-080bf485]{opacity:.5}[data-v-080bf485]:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a[data-v-080bf485]{font-weight:500;color:#646cff;text-decoration:inherit}a[data-v-080bf485]:hover{color:#535bf2}body[data-v-080bf485]{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1[data-v-080bf485]{font-size:3.2em;line-height:1.1}button[data-v-080bf485]{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button[data-v-080bf485]:hover{border-color:#646cff}button[data-v-080bf485]:focus,button[data-v-080bf485]:focus-visible{outline:4px auto -webkit-focus-ring-color}.card[data-v-080bf485]{padding:2em}#app[data-v-080bf485]{width:100%}@media (prefers-color-scheme: light){[data-v-080bf485]:root{color:#213547;background-color:#fff}a[data-v-080bf485]:hover{color:#747bff}button[data-v-080bf485]{background-color:#f9f9f9}}.hover\\:border-primary-focus[data-v-080bf485]:hover{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.hover\\:bg-primary-content-bg-hover[data-v-080bf485]:hover{--tw-bg-opacity: 1;background-color:rgb(var(--color-primary-content-bg-hover) / var(--tw-bg-opacity))}.focus\\:border-primary-focus[data-v-080bf485]:focus{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus\\:outline[data-v-080bf485]:focus{outline-style:solid}.focus\\:outline-1[data-v-080bf485]:focus{outline-width:1px}.focus\\:outline-primary-focus[data-v-080bf485]:focus{outline-color:rgb(var(--color-primary-focus) / 1)}.focus-visible\\:border-primary-focus[data-v-080bf485]:focus-visible{--tw-border-opacity: 1;border-color:rgb(var(--color-primary-focus) / var(--tw-border-opacity))}.focus-visible\\:outline[data-v-080bf485]:focus-visible{outline-style:solid}.focus-visible\\:outline-1[data-v-080bf485]:focus-visible{outline-width:1px}.focus-visible\\:outline-primary-focus[data-v-080bf485]:focus-visible{outline-color:rgb(var(--color-primary-focus) / 1)}@media (min-width: 640px){.sm\\:flex-row[data-v-080bf485]{flex-direction:row}}@media (min-width: 768px){.md\\:order-last[data-v-080bf485]{order:9999}.md\\:flex-row[data-v-080bf485]{flex-direction:row}}:is(:where(.dark) .dark\\:text-white[data-v-080bf485]){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}', gf = /* @__PURE__ */ Ft(mf, [["styles", [vf]], ["__scopeId", "data-v-080bf485"]]), hf = /* @__PURE__ */ Dt(Pd);
customElements.define("wc-i18n-host", hf);
const wf = /* @__PURE__ */ Dt(Gd);
customElements.define("wc-metrics-counter", wf);
const _f = /* @__PURE__ */ Dt(qd);
customElements.define("wc-display-metrics", _f);
const yf = /* @__PURE__ */ Dt(rf);
customElements.define("wc-control-pane", yf);
const xf = /* @__PURE__ */ Dt(cf);
customElements.define("wc-locale-picker", xf);
const Ef = /* @__PURE__ */ Dt(gf);
customElements.define("wc-dark-mode-switcher", Ef);
