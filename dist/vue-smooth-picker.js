import { defineComponent as J, ref as u, onMounted as K, nextTick as I, onBeforeUnmount as Q, openBlock as v, createElementBlock as f, Fragment as B, renderList as O, normalizeClass as M, createElementVNode as g, toDisplayString as X, normalizeStyle as W } from "vue";
const Z = { class: "smooth-picker flex-box" }, ee = { class: "smooth-list" }, te = /* @__PURE__ */ J({
  __name: "SmoothPicker",
  props: {
    data: { default: () => [] },
    onChange: { type: Function, default: () => {
    } }
  },
  emits: ["onChange"],
  setup(c, { expose: L, emit: y }) {
    const s = c, b = y, l = u(s.data.map((e) => {
      var a;
      const t = e.currentIndex;
      return typeof t == "number" && t >= 0 && ((a = e.list) != null && a.length) && t <= e.list.length - 1 ? Math.round(t) : 0;
    })), m = u([...l.value]), n = u({
      isTouchable: "ontouchstart" in window,
      isMouseDown: !1,
      isDragging: !1,
      groupIndex: null,
      startPageY: null
    }), w = u([]), T = u([]), d = u(), P = u(null), C = u(null), i = () => {
      T.value && (w.value = T.value.map((e) => e.getBoundingClientRect()));
    }, k = (e) => {
      e.cancelable && (e.preventDefault(), e.stopPropagation());
      const t = n.value.isTouchable ? e.touches[0] : e;
      n.value.startPageY = t.pageY, n.value.isTouchable || (n.value.isMouseDown = !0);
    }, _ = (e) => {
      if (e.cancelable && (e.preventDefault(), e.stopPropagation()), n.value.isTouchable || n.value.isMouseDown) {
        n.value.isDragging = !0;
        const t = E(e);
        n.value.groupIndex === null && (n.value.groupIndex = G(e));
        const a = n.value.groupIndex;
        if (typeof a != "number" || s.data[a].divider || !s.data[a].list || !n.value.startPageY || !("pageY" in t))
          return;
        const o = (n.value.startPageY - t.pageY) / 32, r = l.value[a] + o;
        l.value[a] = r, n.value.startPageY = t.pageY;
      }
    }, h = (e) => {
      e.cancelable && (e.preventDefault(), e.stopPropagation()), n.value.isDragging || F(e), n.value.isDragging = !1, n.value.isMouseDown = !1, R();
    }, x = h, F = (e) => {
      const t = G(e), a = e.target;
      if (typeof t == "number")
        switch (a.dataset.type) {
          case "top":
            j(e, t);
            break;
          case "middle":
            H(e, t);
            break;
          case "bottom":
            U(e, t);
            break;
        }
    }, E = (e) => n.value.isTouchable ? e.changedTouches[0] || e.touches[0] : e, G = (e) => {
      const t = E(e);
      if (!("pageX" in t))
        return null;
      for (let a = 0; a < w.value.length; a++) {
        const o = w.value[a];
        if (o.left < t.pageX && t.pageX < o.right)
          return a;
      }
      return null;
    }, R = () => {
      const e = n.value.groupIndex;
      if (typeof e == "number" && s.data[e].divider !== !0 && s.data[e].list && s.data[e].list.length > 0) {
        const t = l.value[e];
        let a = t;
        t > s.data[e].list.length - 1 ? a = s.data[e].list.length - 1 : t < 0 && (a = 0), a = Math.round(a), l.value[e] = a, a !== m.value[e] && b("onChange", e, a), m.value = [...l.value];
      }
      n.value.groupIndex = null, n.value.startPageY = null;
    }, z = (e, t) => {
      const a = l.value[e] - t;
      if (Math.abs(a) < 4) {
        let o = `transform: rotateX(${a * 23}deg) translate3d(0, 0, 5.625em);`;
        return n.value.isDragging || (o += " transition: transform 150ms ease-out;"), o;
      }
      return a > 0 ? "transform: rotateX(90deg) translate3d(0, 0, 5.625em)" : "transform: rotateX(-90deg) translate3d(0, 0, 5.625em)";
    }, A = (e) => {
      const t = s.data[e], o = ["flex-" + (t.flex || 1)];
      return t.className && o.push(t.className), o;
    }, S = (e, t, a = !1) => {
      const o = [], r = s.data[e];
      return r.textAlign && o.push("text-" + r.textAlign), !a && l.value[e] === t && o.push("smooth-item-selected"), o;
    }, N = (e) => {
      const t = s.data;
      typeof e == "number" && typeof t[e].onClick == "function" && t[e].onClick(e, l.value[e]);
    }, j = (e, t) => {
      const a = l.value[t] + 1;
      l.value[t] = a, Y(e, t);
    }, H = (e, t) => {
      N(t);
    }, U = (e, t) => {
      const a = l.value[t] - 1;
      l.value[t] = a, Y(e, t);
    }, Y = (e, t) => {
      setTimeout(() => {
        if (!(typeof t != "number" || !s.data[t] || !s.data[t].list) && s.data[t].divider !== !0 && s.data[t].list.length > 0) {
          const a = l.value[t];
          let o = a;
          a > s.data[t].list.length - 1 ? o = s.data[t].list.length - 1 : a < 0 && (o = 0), o = Math.round(o), l.value[t] = o, o !== m.value[t] && b("onChange", t, o), m.value = [...l.value];
        }
      }, 100);
    }, V = (e, t) => {
      const a = t.currentIndex;
      let o = 0;
      typeof a == "number" && a >= 0 && t.list && t.list.length && a <= t.list.length - 1 && (o = Math.round(a)), l.value[e] = o, m.value = [...l.value];
      const r = t.flex;
      r && s.data[e].flex !== r && $(), s.data[e] = t;
    }, $ = () => {
      p.value !== null && clearTimeout(p.value), p.value = setTimeout(() => {
        i();
      }, 200);
    }, p = u(null), q = () => new MutationObserver((e) => {
      e.forEach((t) => {
        if (t.type === "attributes") {
          const o = t.target.style.display;
          o !== "none" && P.value !== o && (P.value = o, I(i));
        }
      });
    });
    return L({
      setGroupData: V,
      getCurrentIndexList: () => l.value,
      getGroupsRectList: i
    }), K(() => {
      if (i(), I(i), C.value = q(), C.value.observe(d.value, { attributes: !0 }), window.addEventListener("resize", i), d.value) {
        const e = n.value.isTouchable ? {
          touchstart: k,
          touchmove: _,
          touchend: h,
          touchcancel: x
        } : {
          mousedown: k,
          mousemove: _,
          mouseup: h,
          mouseleave: x
        };
        Object.entries(e).forEach(([t, a]) => {
          var o;
          (o = d.value) == null || o.addEventListener(t, a);
        });
      }
    }), Q(() => {
      if (p.value !== null && clearTimeout(p.value), C.value && C.value.disconnect(), window.removeEventListener("resize", i), d.value) {
        const e = n.value.isTouchable ? {
          touchstart: k,
          touchmove: _,
          touchend: h,
          touchcancel: x
        } : {
          mousedown: k,
          mousemove: _,
          mouseup: h,
          mouseleave: x
        };
        Object.entries(e).forEach(([t, a]) => {
          var o;
          (o = d.value) == null || o.removeEventListener(t, a);
        });
      }
    }), (e, t) => (v(), f("div", Z, [
      (v(!0), f(B, null, O(e.data, (a, o) => (v(), f("div", {
        ref_for: !0,
        ref_key: "smoothGroup",
        ref: T,
        key: o,
        class: M(["smooth-group", A(o)])
      }, [
        g("div", ee, [
          a.divider ? (v(), f("div", {
            key: 0,
            class: M(["smooth-item divider", S(o, 0, !0)])
          }, X(a.text), 3)) : (v(!0), f(B, { key: 1 }, O(a.list, (r, D) => (v(), f("div", {
            key: D,
            class: M(["smooth-item", S(o, D)]),
            style: W(z(o, D))
          }, X(r.value || r), 7))), 128))
        ])
      ], 2))), 128)),
      g("div", {
        ref_key: "smoothHandleLayer",
        ref: d,
        class: "smooth-handle-layer flex-box direction-column"
      }, t[0] || (t[0] = [
        g("div", {
          "data-type": "top",
          class: "smooth-top flex-1"
        }, null, -1),
        g("div", {
          "data-type": "middle",
          class: "smooth-middle"
        }, null, -1),
        g("div", {
          "data-type": "bottom",
          class: "smooth-bottom flex-1"
        }, null, -1)
      ]), 512)
    ]));
  }
});
const ae = (c, L) => {
  const y = c.__vccOpts || c;
  for (const [s, b] of L)
    y[s] = b;
  return y;
}, oe = /* @__PURE__ */ ae(te, [["__scopeId", "data-v-1403f61c"]]), le = {
  install: (c) => {
    c.component("SmoothPicker", oe);
  }
};
export {
  oe as SmoothPicker,
  le as default
};
