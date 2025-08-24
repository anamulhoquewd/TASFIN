(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Tooltip": ()=>Tooltip,
    "TooltipContent": ()=>TooltipContent,
    "TooltipTrigger": ()=>TooltipTrigger
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+react@0.27.16__3cce26878682b817f9bbf0f1c7174449/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+dom@1.7.4/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$_1deb9f017982eca36e7d9387cb29beb0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+react-dom@2.1._1deb9f017982eca36e7d9387cb29beb0/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
function useTooltip() {
    let { initialOpen = false, placement = "top", open: controlledOpen, onOpenChange: setControlledOpen, delay = 600, closeDelay = 0 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    const [uncontrolledOpen, setUncontrolledOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialOpen);
    const open = controlledOpen !== null && controlledOpen !== void 0 ? controlledOpen : uncontrolledOpen;
    const setOpen = setControlledOpen !== null && setControlledOpen !== void 0 ? setControlledOpen : setUncontrolledOpen;
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloating"])({
        placement,
        open,
        onOpenChange: setOpen,
        whileElementsMounted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"],
        middleware: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$_1deb9f017982eca36e7d9387cb29beb0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"])(4),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$_1deb9f017982eca36e7d9387cb29beb0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flip"])({
                crossAxis: placement.includes("-"),
                fallbackAxisSideDirection: "start",
                padding: 4
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$_1deb9f017982eca36e7d9387cb29beb0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shift"])({
                padding: 4
            })
        ]
    });
    const context = data.context;
    const hover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useHover"])(context, {
        mouseOnly: true,
        move: false,
        restMs: delay,
        enabled: controlledOpen == null,
        delay: {
            close: closeDelay
        }
    });
    const focus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFocus"])(context, {
        enabled: controlledOpen == null
    });
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDismiss"])(context);
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useRole"])(context, {
        role: "tooltip"
    });
    const interactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useInteractions"])([
        hover,
        focus,
        dismiss,
        role
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useTooltip.useMemo": ()=>({
                open,
                setOpen,
                ...interactions,
                ...data
            })
    }["useTooltip.useMemo"], [
        open,
        setOpen,
        interactions,
        data
    ]);
}
_s(useTooltip, "XT+QlQxBg7Xcmr39VtUYvuDiPbk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloating"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useHover"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFocus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDismiss"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useRole"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useInteractions"]
    ];
});
const TooltipContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
function useTooltipContext() {
    _s1();
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](TooltipContext);
    if (context == null) {
        throw new Error("Tooltip components must be wrapped in <TooltipProvider />");
    }
    return context;
}
_s1(useTooltipContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function Tooltip(param) {
    let { children, ...props } = param;
    _s2();
    const tooltip = useTooltip(props);
    if (!props.useDelayGroup) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipContext.Provider, {
            value: tooltip,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx",
            lineNumber: 137,
            columnNumber: 7
        }, this);
    }
    var _props_delay, _props_closeDelay;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FloatingDelayGroup"], {
        delay: {
            open: (_props_delay = props.delay) !== null && _props_delay !== void 0 ? _props_delay : 0,
            close: (_props_closeDelay = props.closeDelay) !== null && _props_closeDelay !== void 0 ? _props_closeDelay : 0
        },
        timeoutMs: props.timeout,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipContext.Provider, {
            value: tooltip,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx",
            lineNumber: 148,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s2(Tooltip, "eFhfeaR9hoz0slKmGpbw1QeBuQU=", false, function() {
    return [
        useTooltip
    ];
});
_c = Tooltip;
const TooltipTrigger = /*#__PURE__*/ _s3(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s3(function TooltipTrigger(param, propRef) {
    let { children, asChild = false, ...props } = param;
    _s3();
    const context = useTooltipContext();
    const childrenRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"](children) ? parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"], 10) >= 19 ? children.props.ref : children.ref : undefined;
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useMergeRefs"])([
        context.refs.setReference,
        propRef,
        childrenRef
    ]);
    if (asChild && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"](children)) {
        const dataAttributes = {
            "data-tooltip-state": context.open ? "open" : "closed"
        };
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"](children, context.getReferenceProps({
            ref,
            ...props,
            ...typeof children.props === "object" ? children.props : {},
            ...dataAttributes
        }));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        "data-tooltip-state": context.open ? "open" : "closed",
        ...context.getReferenceProps(props),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}, "njFPhEpEBxjS0o2fPZf36tLrlQk=", false, function() {
    return [
        useTooltipContext,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useMergeRefs"]
    ];
})), "njFPhEpEBxjS0o2fPZf36tLrlQk=", false, function() {
    return [
        useTooltipContext,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useMergeRefs"]
    ];
});
_c2 = TooltipTrigger;
const TooltipContent = /*#__PURE__*/ _s4(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c3 = _s4(function TooltipContent(param, propRef) {
    let { style, children, portal = true, portalProps = {}, ...props } = param;
    _s4();
    const context = useTooltipContext();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useMergeRefs"])([
        context.refs.setFloating,
        propRef
    ]);
    if (!context.open) return null;
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        style: {
            ...context.floatingStyles,
            ...style
        },
        ...context.getFloatingProps(props),
        className: "tiptap-tooltip",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
    if (portal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FloatingPortal"], {
            ...portalProps,
            children: content
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx",
            lineNumber: 223,
            columnNumber: 12
        }, this);
    }
    return content;
}, "njFPhEpEBxjS0o2fPZf36tLrlQk=", false, function() {
    return [
        useTooltipContext,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useMergeRefs"]
    ];
})), "njFPhEpEBxjS0o2fPZf36tLrlQk=", false, function() {
    return [
        useTooltipContext,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$16_$5f$3cce26878682b817f9bbf0f1c7174449$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useMergeRefs"]
    ];
});
_c4 = TooltipContent;
Tooltip.displayName = "Tooltip";
TooltipTrigger.displayName = "TooltipTrigger";
TooltipContent.displayName = "TooltipContent";
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Tooltip");
__turbopack_context__.k.register(_c1, "TooltipTrigger$React.forwardRef");
__turbopack_context__.k.register(_c2, "TooltipTrigger");
__turbopack_context__.k.register(_c3, "TooltipContent$React.forwardRef");
__turbopack_context__.k.register(_c4, "TooltipContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/tooltip/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/tooltip/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$tooltip$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/tooltip/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/lib/tiptap-utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MAC_SYMBOLS": ()=>MAC_SYMBOLS,
    "MAX_FILE_SIZE": ()=>MAX_FILE_SIZE,
    "cn": ()=>cn,
    "findNodeAtPosition": ()=>findNodeAtPosition,
    "findNodePosition": ()=>findNodePosition,
    "focusNextNode": ()=>focusNextNode,
    "formatShortcutKey": ()=>formatShortcutKey,
    "handleImageUpload": ()=>handleImageUpload,
    "isAllowedUri": ()=>isAllowedUri,
    "isExtensionAvailable": ()=>isExtensionAvailable,
    "isMac": ()=>isMac,
    "isMarkInSchema": ()=>isMarkInSchema,
    "isNodeInSchema": ()=>isNodeInSchema,
    "isNodeTypeSelected": ()=>isNodeTypeSelected,
    "isValidPosition": ()=>isValidPosition,
    "parseShortcutKeys": ()=>parseShortcutKeys,
    "sanitizeUrl": ()=>sanitizeUrl
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$state$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+pm@3.3.0/node_modules/@tiptap/pm/dist/state/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js [app-client] (ecmascript)");
;
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
;
const MAC_SYMBOLS = {
    mod: "⌘",
    command: "⌘",
    meta: "⌘",
    ctrl: "⌃",
    control: "⌃",
    alt: "⌥",
    option: "⌥",
    shift: "⇧",
    backspace: "Del",
    delete: "⌦",
    enter: "⏎",
    escape: "⎋",
    capslock: "⇪"
};
function cn() {
    for(var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++){
        classes[_key] = arguments[_key];
    }
    return classes.filter(Boolean).join(" ");
}
function isMac() {
    return typeof navigator !== "undefined" && navigator.platform.toLowerCase().includes("mac");
}
const formatShortcutKey = function(key, isMac) {
    let capitalize = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (isMac) {
        const lowerKey = key.toLowerCase();
        return MAC_SYMBOLS[lowerKey] || (capitalize ? key.toUpperCase() : key);
    }
    return capitalize ? key.charAt(0).toUpperCase() + key.slice(1) : key;
};
const parseShortcutKeys = (props)=>{
    const { shortcutKeys, delimiter = "+", capitalize = true } = props;
    if (!shortcutKeys) return [];
    return shortcutKeys.split(delimiter).map((key)=>key.trim()).map((key)=>formatShortcutKey(key, isMac(), capitalize));
};
const isMarkInSchema = (markName, editor)=>{
    if (!(editor === null || editor === void 0 ? void 0 : editor.schema)) return false;
    return editor.schema.spec.marks.get(markName) !== undefined;
};
const isNodeInSchema = (nodeName, editor)=>{
    if (!(editor === null || editor === void 0 ? void 0 : editor.schema)) return false;
    return editor.schema.spec.nodes.get(nodeName) !== undefined;
};
function focusNextNode(editor) {
    const { state, view } = editor;
    const { doc, selection } = state;
    const nextSel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selection"].findFrom(selection.$to, 1, true);
    if (nextSel) {
        view.dispatch(state.tr.setSelection(nextSel).scrollIntoView());
        return true;
    }
    const paragraphType = state.schema.nodes.paragraph;
    if (!paragraphType) {
        console.warn("No paragraph node type found in schema.");
        return false;
    }
    const end = doc.content.size;
    const para = paragraphType.create();
    let tr = state.tr.insert(end, para);
    // Place the selection inside the new paragraph
    const $inside = tr.doc.resolve(end + 1);
    tr = tr.setSelection(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"].near($inside)).scrollIntoView();
    view.dispatch(tr);
    return true;
}
function isValidPosition(pos) {
    return typeof pos === "number" && pos >= 0;
}
function isExtensionAvailable(editor, extensionNames) {
    if (!editor) return false;
    const names = Array.isArray(extensionNames) ? extensionNames : [
        extensionNames
    ];
    const found = names.some((name)=>editor.extensionManager.extensions.some((ext)=>ext.name === name));
    if (!found) {
        console.warn("None of the extensions [".concat(names.join(", "), "] were found in the editor schema. Ensure they are included in the editor configuration."));
    }
    return found;
}
function findNodeAtPosition(editor, position) {
    try {
        const node = editor.state.doc.nodeAt(position);
        if (!node) {
            console.warn("No node found at position ".concat(position));
            return null;
        }
        return node;
    } catch (error) {
        console.error("Error getting node at position ".concat(position, ":"), error);
        return null;
    }
}
function findNodePosition(props) {
    var _editor_state;
    const { editor, node, nodePos } = props;
    if (!editor || !((_editor_state = editor.state) === null || _editor_state === void 0 ? void 0 : _editor_state.doc)) return null;
    // Zero is valid position
    const hasValidNode = node !== undefined && node !== null;
    const hasValidPos = isValidPosition(nodePos);
    if (!hasValidNode && !hasValidPos) {
        return null;
    }
    // First search for the node in the document if we have a node
    if (hasValidNode) {
        let foundPos = -1;
        let foundNode = null;
        editor.state.doc.descendants((currentNode, pos)=>{
            // TODO: Needed?
            // if (currentNode.type && currentNode.type.name === node!.type.name) {
            if (currentNode === node) {
                foundPos = pos;
                foundNode = currentNode;
                return false;
            }
            return true;
        });
        if (foundPos !== -1 && foundNode !== null) {
            return {
                pos: foundPos,
                node: foundNode
            };
        }
    }
    // If we have a valid position, use findNodeAtPosition
    if (hasValidPos) {
        const nodeAtPos = findNodeAtPosition(editor, nodePos);
        if (nodeAtPos) {
            return {
                pos: nodePos,
                node: nodeAtPos
            };
        }
    }
    return null;
}
function isNodeTypeSelected(editor) {
    let types = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    if (!editor || !editor.state.selection) return false;
    const { state } = editor;
    const { selection } = state;
    if (selection.empty) return false;
    if (selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"]) {
        const node = selection.node;
        return node ? types.includes(node.type.name) : false;
    }
    return false;
}
const handleImageUpload = async (file, onProgress, abortSignal)=>{
    // Validate file
    if (!file) {
        throw new Error("No file provided");
    }
    if (file.size > MAX_FILE_SIZE) {
        throw new Error("File size exceeds maximum allowed (".concat(MAX_FILE_SIZE / (1024 * 1024), "MB)"));
    }
    // For demo/testing: Simulate upload progress. In production, replace the following code
    // with your own upload implementation.
    for(let progress = 0; progress <= 100; progress += 10){
        if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
            throw new Error("Upload cancelled");
        }
        await new Promise((resolve)=>setTimeout(resolve, 500));
        onProgress === null || onProgress === void 0 ? void 0 : onProgress({
            progress
        });
    }
    return "/images/tiptap-ui-placeholder-image.jpg";
};
const ATTR_WHITESPACE = // eslint-disable-next-line no-control-regex
/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;
function isAllowedUri(uri, protocols) {
    const allowedProtocols = [
        "http",
        "https",
        "ftp",
        "ftps",
        "mailto",
        "tel",
        "callto",
        "sms",
        "cid",
        "xmpp"
    ];
    if (protocols) {
        protocols.forEach((protocol)=>{
            const nextProtocol = typeof protocol === "string" ? protocol : protocol.scheme;
            if (nextProtocol) {
                allowedProtocols.push(nextProtocol);
            }
        });
    }
    return !uri || uri.replace(ATTR_WHITESPACE, "").match(new RegExp(// eslint-disable-next-line no-useless-escape
    "^(?:(?:".concat(allowedProtocols.join("|"), "):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))"), "i"));
}
function sanitizeUrl(inputUrl, baseUrl, protocols) {
    try {
        const url = new URL(inputUrl, baseUrl);
        if (isAllowedUri(url.href, protocols)) {
            return url.href;
        }
    } catch (e) {
    // If URL creation fails, it's considered invalid
    }
    return "#";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": ()=>Button,
    "ButtonGroup": ()=>ButtonGroup,
    "ShortcutDisplay": ()=>ShortcutDisplay,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Tiptap UI Primitive ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$tooltip$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/tooltip/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/tooltip/tooltip.tsx [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const ShortcutDisplay = (param)=>{
    let { shortcuts } = param;
    if (shortcuts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: shortcuts.map((key, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
                        lineNumber: 36,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        children: key
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, index, true, {
                fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ShortcutDisplay;
const Button = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { className, children, tooltip, showTooltip = true, shortcutKeys, "aria-label": ariaLabel, ...props } = param;
    _s();
    const shortcuts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Button.useMemo[shortcuts]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
                shortcutKeys
            })
    }["Button.useMemo[shortcuts]"], [
        shortcutKeys
    ]);
    if (!tooltip || !showTooltip) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-button", className),
            ref: ref,
            "aria-label": ariaLabel,
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
            lineNumber: 64,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
        delay: 200,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-button", className),
                ref: ref,
                "aria-label": ariaLabel,
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$tooltip$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                children: [
                    tooltip,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShortcutDisplay, {
                        shortcuts: shortcuts
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
        lineNumber: 76,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "TnEnlJPbSit2jsPfIrUeifMyQ58=")), "TnEnlJPbSit2jsPfIrUeifMyQ58=");
_c2 = Button;
Button.displayName = "Button";
const ButtonGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c3 = (param, ref)=>{
    let { className, children, orientation = "vertical", ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-button-group", className),
        "data-orientation": orientation,
        role: "group",
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/button/button.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c4 = ButtonGroup;
ButtonGroup.displayName = "ButtonGroup";
const __TURBOPACK__default__export__ = Button;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ShortcutDisplay");
__turbopack_context__.k.register(_c1, "Button$React.forwardRef");
__turbopack_context__.k.register(_c2, "Button");
__turbopack_context__.k.register(_c3, "ButtonGroup$React.forwardRef");
__turbopack_context__.k.register(_c4, "ButtonGroup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui-primitive/spacer/spacer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Spacer": ()=>Spacer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Spacer(param) {
    let { orientation = "horizontal", size, style = {}, ...props } = param;
    const computedStyle = {
        ...style,
        ...orientation === "horizontal" && !size && {
            flex: 1
        },
        ...size && {
            width: orientation === "vertical" ? "1px" : size,
            height: orientation === "horizontal" ? "1px" : size
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...props,
        style: computedStyle
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/spacer/spacer.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, this);
}
_c = Spacer;
var _c;
__turbopack_context__.k.register(_c, "Spacer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/spacer/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$spacer$2f$spacer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/spacer/spacer.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/spacer/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$spacer$2f$spacer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/spacer/spacer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$spacer$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/spacer/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui-primitive/separator/separator.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Separator": ()=>Separator
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Separator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { decorative, orientation = "vertical", className, ...divProps } = param;
    const ariaOrientation = orientation === "vertical" ? orientation : undefined;
    const semanticProps = decorative ? {
        role: "none"
    } : {
        "aria-orientation": ariaOrientation,
        role: "separator"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-separator", className),
        "data-orientation": orientation,
        ...semanticProps,
        ...divProps,
        ref: ref
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/separator/separator.tsx",
        lineNumber: 22,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Separator;
Separator.displayName = "Separator";
var _c, _c1;
__turbopack_context__.k.register(_c, "Separator$React.forwardRef");
__turbopack_context__.k.register(_c1, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/separator/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/separator.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/separator/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/hooks/use-menu-navigation.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useMenuNavigation": ()=>useMenuNavigation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useMenuNavigation(param) {
    let { editor, containerRef, query, items, onSelect, onClose, orientation = "vertical", autoSelectFirstItem = true } = param;
    _s();
    const [selectedIndex, setSelectedIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](autoSelectFirstItem ? 0 : -1);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useMenuNavigation.useEffect": ()=>{
            const handleKeyboardNavigation = {
                "useMenuNavigation.useEffect.handleKeyboardNavigation": (event)=>{
                    if (!items.length) return false;
                    const moveNext = {
                        "useMenuNavigation.useEffect.handleKeyboardNavigation.moveNext": ()=>setSelectedIndex({
                                "useMenuNavigation.useEffect.handleKeyboardNavigation.moveNext": (currentIndex)=>{
                                    if (currentIndex === -1) return 0;
                                    return (currentIndex + 1) % items.length;
                                }
                            }["useMenuNavigation.useEffect.handleKeyboardNavigation.moveNext"])
                    }["useMenuNavigation.useEffect.handleKeyboardNavigation.moveNext"];
                    const movePrev = {
                        "useMenuNavigation.useEffect.handleKeyboardNavigation.movePrev": ()=>setSelectedIndex({
                                "useMenuNavigation.useEffect.handleKeyboardNavigation.movePrev": (currentIndex)=>{
                                    if (currentIndex === -1) return items.length - 1;
                                    return (currentIndex - 1 + items.length) % items.length;
                                }
                            }["useMenuNavigation.useEffect.handleKeyboardNavigation.movePrev"])
                    }["useMenuNavigation.useEffect.handleKeyboardNavigation.movePrev"];
                    switch(event.key){
                        case "ArrowUp":
                            {
                                if (orientation === "horizontal") return false;
                                event.preventDefault();
                                movePrev();
                                return true;
                            }
                        case "ArrowDown":
                            {
                                if (orientation === "horizontal") return false;
                                event.preventDefault();
                                moveNext();
                                return true;
                            }
                        case "ArrowLeft":
                            {
                                if (orientation === "vertical") return false;
                                event.preventDefault();
                                movePrev();
                                return true;
                            }
                        case "ArrowRight":
                            {
                                if (orientation === "vertical") return false;
                                event.preventDefault();
                                moveNext();
                                return true;
                            }
                        case "Tab":
                            {
                                event.preventDefault();
                                if (event.shiftKey) {
                                    movePrev();
                                } else {
                                    moveNext();
                                }
                                return true;
                            }
                        case "Home":
                            {
                                event.preventDefault();
                                setSelectedIndex(0);
                                return true;
                            }
                        case "End":
                            {
                                event.preventDefault();
                                setSelectedIndex(items.length - 1);
                                return true;
                            }
                        case "Enter":
                            {
                                if (event.isComposing) return false;
                                event.preventDefault();
                                if (selectedIndex !== -1 && items[selectedIndex]) {
                                    onSelect === null || onSelect === void 0 ? void 0 : onSelect(items[selectedIndex]);
                                }
                                return true;
                            }
                        case "Escape":
                            {
                                event.preventDefault();
                                onClose === null || onClose === void 0 ? void 0 : onClose();
                                return true;
                            }
                        default:
                            return false;
                    }
                }
            }["useMenuNavigation.useEffect.handleKeyboardNavigation"];
            let targetElement = null;
            if (editor) {
                targetElement = editor.view.dom;
            } else if (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) {
                targetElement = containerRef.current;
            }
            if (targetElement) {
                targetElement.addEventListener("keydown", handleKeyboardNavigation, true);
                return ({
                    "useMenuNavigation.useEffect": ()=>{
                        targetElement === null || targetElement === void 0 ? void 0 : targetElement.removeEventListener("keydown", handleKeyboardNavigation, true);
                    }
                })["useMenuNavigation.useEffect"];
            }
            return undefined;
        }
    }["useMenuNavigation.useEffect"], [
        editor,
        containerRef,
        items,
        selectedIndex,
        onSelect,
        onClose,
        orientation
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useMenuNavigation.useEffect": ()=>{
            if (query) {
                setSelectedIndex(autoSelectFirstItem ? 0 : -1);
            }
        }
    }["useMenuNavigation.useEffect"], [
        query,
        autoSelectFirstItem
    ]);
    return {
        selectedIndex: items.length ? selectedIndex : undefined,
        setSelectedIndex
    };
}
_s(useMenuNavigation, "kqnKbEf7Umgyz5QxHia3g4d7648=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/use-composed-ref.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__,
    "useComposedRef": ()=>useComposedRef
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const updateRef = (ref, value)=>{
    if (typeof ref === "function") {
        ref(value);
    } else if (ref && typeof ref === "object" && "current" in ref) {
        // Safe assignment without MutableRefObject
        ;
        ref.current = value;
    }
};
const useComposedRef = (libRef, userRef)=>{
    _s();
    const prevUserRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useComposedRef.useCallback": (instance)=>{
            if (libRef && "current" in libRef) {
                ;
                libRef.current = instance;
            }
            if (prevUserRef.current) {
                updateRef(prevUserRef.current, null);
            }
            prevUserRef.current = userRef;
            if (userRef) {
                updateRef(userRef, instance);
            }
        }
    }["useComposedRef.useCallback"], [
        libRef,
        userRef
    ]);
};
_s(useComposedRef, "Bh+s+duKOdGpvGN6x9GuV83KVrY=");
const __TURBOPACK__default__export__ = useComposedRef;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/toolbar/toolbar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toolbar": ()=>Toolbar,
    "ToolbarGroup": ()=>ToolbarGroup,
    "ToolbarSeparator": ()=>ToolbarSeparator
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$menu$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-menu-navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$composed$2d$ref$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-composed-ref.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const useToolbarNavigation = (toolbarRef)=>{
    _s();
    const [items, setItems] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const collectItems = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useToolbarNavigation.useCallback[collectItems]": ()=>{
            if (!toolbarRef.current) return [];
            return Array.from(toolbarRef.current.querySelectorAll('button:not([disabled]), [role="button"]:not([disabled]), [tabindex="0"]:not([disabled])'));
        }
    }["useToolbarNavigation.useCallback[collectItems]"], [
        toolbarRef
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useToolbarNavigation.useEffect": ()=>{
            const toolbar = toolbarRef.current;
            if (!toolbar) return;
            const updateItems = {
                "useToolbarNavigation.useEffect.updateItems": ()=>setItems(collectItems())
            }["useToolbarNavigation.useEffect.updateItems"];
            updateItems();
            const observer = new MutationObserver(updateItems);
            observer.observe(toolbar, {
                childList: true,
                subtree: true
            });
            return ({
                "useToolbarNavigation.useEffect": ()=>observer.disconnect()
            })["useToolbarNavigation.useEffect"];
        }
    }["useToolbarNavigation.useEffect"], [
        collectItems,
        toolbarRef
    ]);
    const { selectedIndex } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$menu$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuNavigation"])({
        containerRef: toolbarRef,
        items,
        orientation: "horizontal",
        onSelect: {
            "useToolbarNavigation.useMenuNavigation": (el)=>el.click()
        }["useToolbarNavigation.useMenuNavigation"],
        autoSelectFirstItem: false
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useToolbarNavigation.useEffect": ()=>{
            const toolbar = toolbarRef.current;
            if (!toolbar) return;
            const handleFocus = {
                "useToolbarNavigation.useEffect.handleFocus": (e)=>{
                    const target = e.target;
                    if (toolbar.contains(target)) target.setAttribute("data-focus-visible", "true");
                }
            }["useToolbarNavigation.useEffect.handleFocus"];
            const handleBlur = {
                "useToolbarNavigation.useEffect.handleBlur": (e)=>{
                    const target = e.target;
                    if (toolbar.contains(target)) target.removeAttribute("data-focus-visible");
                }
            }["useToolbarNavigation.useEffect.handleBlur"];
            toolbar.addEventListener("focus", handleFocus, true);
            toolbar.addEventListener("blur", handleBlur, true);
            return ({
                "useToolbarNavigation.useEffect": ()=>{
                    toolbar.removeEventListener("focus", handleFocus, true);
                    toolbar.removeEventListener("blur", handleBlur, true);
                }
            })["useToolbarNavigation.useEffect"];
        }
    }["useToolbarNavigation.useEffect"], [
        toolbarRef
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useToolbarNavigation.useEffect": ()=>{
            if (selectedIndex !== undefined && items[selectedIndex]) {
                items[selectedIndex].focus();
            }
        }
    }["useToolbarNavigation.useEffect"], [
        selectedIndex,
        items
    ]);
};
_s(useToolbarNavigation, "h74DHM0DTcgzDtsPI02rLrU+Ixc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$menu$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuNavigation"]
    ];
});
const Toolbar = /*#__PURE__*/ _s1(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = _s1((param, ref)=>{
    let { children, className, variant = "fixed", ...props } = param;
    _s1();
    const toolbarRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const composedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$composed$2d$ref$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComposedRef"])(toolbarRef, ref);
    useToolbarNavigation(toolbarRef);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: composedRef,
        role: "toolbar",
        "aria-label": "toolbar",
        "data-variant": variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-toolbar", className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/toolbar/toolbar.tsx",
        lineNumber: 89,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "C/c60PITRaMQSmSwPvXoNfgrg5g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$composed$2d$ref$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComposedRef"],
        useToolbarNavigation
    ];
})), "C/c60PITRaMQSmSwPvXoNfgrg5g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$composed$2d$ref$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComposedRef"],
        useToolbarNavigation
    ];
});
_c1 = Toolbar;
Toolbar.displayName = "Toolbar";
const ToolbarGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = (param, ref)=>{
    let { children, className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: "group",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-toolbar-group", className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/toolbar/toolbar.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = ToolbarGroup;
ToolbarGroup.displayName = "ToolbarGroup";
const ToolbarSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = (param, ref)=>{
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        orientation: "vertical",
        decorative: true,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/toolbar/toolbar.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c5 = ToolbarSeparator;
ToolbarSeparator.displayName = "ToolbarSeparator";
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Toolbar$React.forwardRef");
__turbopack_context__.k.register(_c1, "Toolbar");
__turbopack_context__.k.register(_c2, "ToolbarGroup$React.forwardRef");
__turbopack_context__.k.register(_c3, "ToolbarGroup");
__turbopack_context__.k.register(_c4, "ToolbarSeparator$React.forwardRef");
__turbopack_context__.k.register(_c5, "ToolbarSeparator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/toolbar/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/toolbar/toolbar.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/toolbar/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/toolbar/toolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/toolbar/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/close-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CloseIcon": ()=>CloseIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const CloseIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/close-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/close-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = CloseIcon;
CloseIcon.displayName = "CloseIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "CloseIcon$React.memo");
__turbopack_context__.k.register(_c1, "CloseIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ImageUploadNode": ()=>ImageUploadNode
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+react@3.3.0_@floati_0f113c0788e141f44a684f6cc1ff509b/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$close$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/close-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
/**
 * Custom hook for managing multiple file uploads with progress tracking and cancellation
 */ function useFileUpload(options) {
    _s();
    const [fileItems, setFileItems] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const uploadFile = async (file)=>{
        if (file.size > options.maxSize) {
            var _options_onError;
            const error = new Error("File size exceeds maximum allowed (".concat(options.maxSize / 1024 / 1024, "MB)"));
            (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, error);
            return null;
        }
        const abortController = new AbortController();
        const fileId = crypto.randomUUID();
        const newFileItem = {
            id: fileId,
            file,
            progress: 0,
            status: "uploading",
            abortController
        };
        setFileItems((prev)=>[
                ...prev,
                newFileItem
            ]);
        try {
            if (!options.upload) {
                throw new Error("Upload function is not defined");
            }
            const url = await options.upload(file, (event)=>{
                setFileItems((prev)=>prev.map((item)=>item.id === fileId ? {
                            ...item,
                            progress: event.progress
                        } : item));
            }, abortController.signal);
            if (!url) throw new Error("Upload failed: No URL returned");
            if (!abortController.signal.aborted) {
                var _options_onSuccess;
                setFileItems((prev)=>prev.map((item)=>item.id === fileId ? {
                            ...item,
                            status: "success",
                            url,
                            progress: 100
                        } : item));
                (_options_onSuccess = options.onSuccess) === null || _options_onSuccess === void 0 ? void 0 : _options_onSuccess.call(options, url);
                return url;
            }
            return null;
        } catch (error) {
            if (!abortController.signal.aborted) {
                var _options_onError1;
                setFileItems((prev)=>prev.map((item)=>item.id === fileId ? {
                            ...item,
                            status: "error",
                            progress: 0
                        } : item));
                (_options_onError1 = options.onError) === null || _options_onError1 === void 0 ? void 0 : _options_onError1.call(options, error instanceof Error ? error : new Error("Upload failed"));
            }
            return null;
        }
    };
    const uploadFiles = async (files)=>{
        if (!files || files.length === 0) {
            var _options_onError;
            (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, new Error("No files to upload"));
            return [];
        }
        if (options.limit && files.length > options.limit) {
            var _options_onError1;
            (_options_onError1 = options.onError) === null || _options_onError1 === void 0 ? void 0 : _options_onError1.call(options, new Error("Maximum ".concat(options.limit, " file").concat(options.limit === 1 ? "" : "s", " allowed")));
            return [];
        }
        // Upload all files concurrently
        const uploadPromises = files.map((file)=>uploadFile(file));
        const results = await Promise.all(uploadPromises);
        // Filter out null results (failed uploads)
        return results.filter((url)=>url !== null);
    };
    const removeFileItem = (fileId)=>{
        setFileItems((prev)=>{
            const fileToRemove = prev.find((item)=>item.id === fileId);
            if (fileToRemove === null || fileToRemove === void 0 ? void 0 : fileToRemove.abortController) {
                fileToRemove.abortController.abort();
            }
            if (fileToRemove === null || fileToRemove === void 0 ? void 0 : fileToRemove.url) {
                URL.revokeObjectURL(fileToRemove.url);
            }
            return prev.filter((item)=>item.id !== fileId);
        });
    };
    const clearAllFiles = ()=>{
        fileItems.forEach((item)=>{
            if (item.abortController) {
                item.abortController.abort();
            }
            if (item.url) {
                URL.revokeObjectURL(item.url);
            }
        });
        setFileItems([]);
    };
    return {
        fileItems,
        uploadFiles,
        removeFileItem,
        clearAllFiles
    };
}
_s(useFileUpload, "HGBiWLr58pFCFT0poorwEFAZlws=");
const CloudUploadIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        className: "tiptap-image-upload-icon",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M11.1953 4.41771C10.3478 4.08499 9.43578 3.94949 8.5282 4.02147C7.62062 4.09345 6.74133 4.37102 5.95691 4.83316C5.1725 5.2953 4.50354 5.92989 4.00071 6.68886C3.49788 7.44783 3.17436 8.31128 3.05465 9.2138C2.93495 10.1163 3.0222 11.0343 3.3098 11.8981C3.5974 12.7619 4.07781 13.5489 4.71463 14.1995C5.10094 14.5942 5.09414 15.2274 4.69945 15.6137C4.30476 16 3.67163 15.9932 3.28532 15.5985C2.43622 14.731 1.79568 13.6816 1.41221 12.5299C1.02875 11.3781 0.91241 10.1542 1.07201 8.95084C1.23162 7.74748 1.66298 6.59621 2.33343 5.58425C3.00387 4.57229 3.89581 3.72617 4.9417 3.10998C5.98758 2.4938 7.15998 2.1237 8.37008 2.02773C9.58018 1.93176 10.7963 2.11243 11.9262 2.55605C13.0561 2.99968 14.0703 3.69462 14.8919 4.58825C15.5423 5.29573 16.0585 6.11304 16.4177 7.00002H17.4999C18.6799 6.99991 19.8288 7.37933 20.7766 8.08222C21.7245 8.78515 22.4212 9.7743 22.7637 10.9036C23.1062 12.0328 23.0765 13.2423 22.6788 14.3534C22.2812 15.4644 21.5367 16.4181 20.5554 17.0736C20.0962 17.3803 19.4752 17.2567 19.1684 16.7975C18.8617 16.3382 18.9853 15.7172 19.4445 15.4105C20.069 14.9934 20.5427 14.3865 20.7958 13.6794C21.0488 12.9724 21.0678 12.2027 20.8498 11.4841C20.6318 10.7655 20.1885 10.136 19.5853 9.6887C18.9821 9.24138 18.251 8.99993 17.5001 9.00002H15.71C15.2679 9.00002 14.8783 8.70973 14.7518 8.28611C14.4913 7.41374 14.0357 6.61208 13.4195 5.94186C12.8034 5.27164 12.0427 4.75043 11.1953 4.41771Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 224,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M11 14.4142V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V14.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L12.7078 11.2936C12.7054 11.2912 12.703 11.2888 12.7005 11.2864C12.5208 11.1099 12.2746 11.0008 12.003 11L12 11L11.997 11C11.8625 11.0004 11.7343 11.0273 11.6172 11.0759C11.502 11.1236 11.3938 11.1937 11.2995 11.2864C11.297 11.2888 11.2946 11.2912 11.2922 11.2936L7.29289 15.2929C6.90237 15.6834 6.90237 16.3166 7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L11 14.4142Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 228,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
        lineNumber: 216,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = CloudUploadIcon;
const FileIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "43",
        height: "57",
        viewBox: "0 0 43 57",
        fill: "currentColor",
        className: "tiptap-image-upload-dropzone-rect-primary",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M0.75 10.75C0.75 5.64137 4.89137 1.5 10 1.5H32.3431C33.2051 1.5 34.0317 1.84241 34.6412 2.4519L40.2981 8.10876C40.9076 8.71825 41.25 9.5449 41.25 10.4069V46.75C41.25 51.8586 37.1086 56 32 56H10C4.89137 56 0.75 51.8586 0.75 46.75V10.75Z",
            fill: "currentColor",
            fillOpacity: "0.11",
            stroke: "currentColor",
            strokeWidth: "1.5"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
            lineNumber: 244,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
        lineNumber: 236,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = FileIcon;
const FileCornerIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "10",
        height: "10",
        className: "tiptap-image-upload-dropzone-rect-secondary",
        viewBox: "0 0 10 10",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M0 0.75H0.343146C1.40401 0.75 2.42143 1.17143 3.17157 1.92157L8.82843 7.57843C9.57857 8.32857 10 9.34599 10 10.4069V10.75H4C1.79086 10.75 0 8.95914 0 6.75V0.75Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
            lineNumber: 263,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
        lineNumber: 255,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = FileCornerIcon;
/**
 * A component that creates a drag-and-drop area for image uploads
 */ const ImageUploadDragArea = (param)=>{
    let { onFile, children } = param;
    _s1();
    const [isDragOver, setIsDragOver] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [isDragActive, setIsDragActive] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const handleDragEnter = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragActive(false);
            setIsDragOver(false);
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            onFile(files);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tiptap-image-upload-drag-area ".concat(isDragActive ? "drag-active" : "", " ").concat(isDragOver ? "drag-over" : ""),
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
        lineNumber: 328,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(ImageUploadDragArea, "K3Zo0+pDoYIGAwrdGs/Cq4V53ns=");
_c3 = ImageUploadDragArea;
/**
 * Component that displays a preview of an uploading file with progress
 */ const ImageUploadPreview = (param)=>{
    let { fileItem, onRemove } = param;
    const formatFileSize = (bytes)=>{
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = [
            "Bytes",
            "KB",
            "MB",
            "GB"
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(2)), " ").concat(sizes[i]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tiptap-image-upload-preview",
        children: [
            fileItem.status === "uploading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tiptap-image-upload-progress",
                style: {
                    width: "".concat(fileItem.progress, "%")
                }
            }, void 0, false, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 369,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tiptap-image-upload-preview-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tiptap-image-upload-file-info",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tiptap-image-upload-file-icon",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloudUploadIcon, {}, void 0, false, {
                                    fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tiptap-image-upload-details",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "tiptap-image-upload-text",
                                        children: fileItem.file.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                        lineNumber: 381,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "tiptap-image-upload-subtext",
                                        children: formatFileSize(fileItem.file.size)
                                    }, void 0, false, {
                                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                        lineNumber: 384,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tiptap-image-upload-actions",
                        children: [
                            fileItem.status === "uploading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tiptap-image-upload-progress-text",
                                children: [
                                    fileItem.progress,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                lineNumber: 391,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                "data-style": "ghost",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    onRemove();
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$close$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloseIcon"], {
                                    className: "tiptap-button-icon"
                                }, void 0, false, {
                                    fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                    lineNumber: 403,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                lineNumber: 395,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
        lineNumber: 367,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = ImageUploadPreview;
const DropZoneContent = (param)=>{
    let { maxSize, limit } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tiptap-image-upload-dropzone",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileIcon, {}, void 0, false, {
                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                        lineNumber: 417,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileCornerIcon, {}, void 0, false, {
                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                        lineNumber: 418,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tiptap-image-upload-icon-container",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloudUploadIcon, {}, void 0, false, {
                            fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                            lineNumber: 420,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                        lineNumber: 419,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 416,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tiptap-image-upload-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tiptap-image-upload-text",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                children: "Click to upload"
                            }, void 0, false, {
                                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                lineNumber: 426,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            " or drag and drop"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                        lineNumber: 425,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tiptap-image-upload-subtext",
                        children: [
                            "Maximum ",
                            limit,
                            " file",
                            limit === 1 ? "" : "s",
                            ", ",
                            maxSize / 1024 / 1024,
                            "MB each."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                        lineNumber: 428,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 424,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_c5 = DropZoneContent;
const ImageUploadNode = (props)=>{
    _s2();
    const { accept, limit, maxSize } = props.node.attrs;
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const extension = props.extension;
    const uploadOptions = {
        maxSize,
        limit,
        accept,
        upload: extension.options.upload,
        onSuccess: extension.options.onSuccess,
        onError: extension.options.onError
    };
    const { fileItems, uploadFiles, removeFileItem, clearAllFiles } = useFileUpload(uploadOptions);
    const handleUpload = async (files)=>{
        const urls = await uploadFiles(files);
        if (urls.length > 0) {
            const pos = props.getPos();
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) {
                const imageNodes = urls.map((url, index)=>{
                    var _files_index;
                    const filename = ((_files_index = files[index]) === null || _files_index === void 0 ? void 0 : _files_index.name.replace(/\.[^/.]+$/, "")) || "unknown";
                    return {
                        type: extension.options.type,
                        attrs: {
                            ...extension.options,
                            src: url,
                            alt: filename,
                            title: filename
                        }
                    };
                });
                props.editor.chain().focus().deleteRange({
                    from: pos,
                    to: pos + props.node.nodeSize
                }).insertContentAt(pos, imageNodes).run();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusNextNode"])(props.editor);
            }
        }
    };
    const handleChange = (e)=>{
        const files = e.target.files;
        if (!files || files.length === 0) {
            var _extension_options_onError, _extension_options;
            (_extension_options_onError = (_extension_options = extension.options).onError) === null || _extension_options_onError === void 0 ? void 0 : _extension_options_onError.call(_extension_options, new Error("No file selected"));
            return;
        }
        handleUpload(Array.from(files));
    };
    const handleClick = ()=>{
        if (inputRef.current && fileItems.length === 0) {
            inputRef.current.value = "";
            inputRef.current.click();
        }
    };
    const hasFiles = fileItems.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NodeViewWrapper"], {
        className: "tiptap-image-upload",
        tabIndex: 0,
        onClick: handleClick,
        children: [
            !hasFiles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageUploadDragArea, {
                onFile: handleUpload,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DropZoneContent, {
                    maxSize: maxSize,
                    limit: limit
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                    lineNumber: 512,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 511,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            hasFiles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tiptap-image-upload-previews",
                children: [
                    fileItems.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tiptap-image-upload-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Uploading ",
                                    fileItems.length,
                                    " files"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                lineNumber: 520,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                "data-style": "ghost",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    clearAllFiles();
                                },
                                children: "Clear All"
                            }, void 0, false, {
                                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                                lineNumber: 521,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                        lineNumber: 519,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    fileItems.map((fileItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageUploadPreview, {
                            fileItem: fileItem,
                            onRemove: ()=>removeFileItem(fileItem.id)
                        }, fileItem.id, false, {
                            fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                            lineNumber: 534,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 517,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                name: "file",
                accept: accept,
                type: "file",
                multiple: limit > 1,
                onChange: handleChange,
                onClick: (e)=>e.stopPropagation()
            }, void 0, false, {
                fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx",
        lineNumber: 505,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(ImageUploadNode, "4+deBCGC4wR0ZtW/2O5xJo1oayA=", false, function() {
    return [
        useFileUpload
    ];
});
_c6 = ImageUploadNode;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "CloudUploadIcon");
__turbopack_context__.k.register(_c1, "FileIcon");
__turbopack_context__.k.register(_c2, "FileCornerIcon");
__turbopack_context__.k.register(_c3, "ImageUploadDragArea");
__turbopack_context__.k.register(_c4, "ImageUploadPreview");
__turbopack_context__.k.register(_c5, "DropZoneContent");
__turbopack_context__.k.register(_c6, "ImageUploadNode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-node/image-upload-node/image-upload-node-extension.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ImageUploadNode": ()=>ImageUploadNode,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$3$2e$0_$40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+core@3.3.0_@tiptap+pm@3.3.0/node_modules/@tiptap/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+react@3.3.0_@floati_0f113c0788e141f44a684f6cc1ff509b/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$node$2f$image$2d$upload$2d$node$2f$image$2d$upload$2d$node$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-node/image-upload-node/image-upload-node.tsx [app-client] (ecmascript)");
;
;
;
const ImageUploadNode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$3$2e$0_$40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"].create({
    name: "imageUpload",
    group: "block",
    draggable: true,
    atom: true,
    addOptions () {
        return {
            type: "image",
            accept: "image/*",
            limit: 1,
            maxSize: 0,
            upload: undefined,
            onError: undefined,
            onSuccess: undefined,
            HTMLAttributes: {}
        };
    },
    addAttributes () {
        return {
            accept: {
                default: this.options.accept
            },
            limit: {
                default: this.options.limit
            },
            maxSize: {
                default: this.options.maxSize
            }
        };
    },
    parseHTML () {
        return [
            {
                tag: 'div[data-type="image-upload"]'
            }
        ];
    },
    renderHTML (param) {
        let { HTMLAttributes } = param;
        return [
            "div",
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$3$2e$0_$40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeAttributes"])({
                "data-type": "image-upload"
            }, HTMLAttributes)
        ];
    },
    addNodeView () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactNodeViewRenderer"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$node$2f$image$2d$upload$2d$node$2f$image$2d$upload$2d$node$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageUploadNode"]);
    },
    addCommands () {
        return {
            setImageUploadNode: (options)=>(param)=>{
                    let { commands } = param;
                    return commands.insertContent({
                        type: this.name,
                        attrs: options
                    });
                }
        };
    },
    /**
   * Adds Enter key handler to trigger the upload component when it's selected.
   */ addKeyboardShortcuts () {
        return {
            Enter: (param)=>{
                let { editor } = param;
                const { selection } = editor.state;
                const { nodeAfter } = selection.$from;
                if (nodeAfter && nodeAfter.type.name === "imageUpload" && editor.isActive("imageUpload")) {
                    const nodeEl = editor.view.nodeDOM(selection.$from.pos);
                    if (nodeEl && nodeEl instanceof HTMLElement) {
                        // Since NodeViewWrapper is wrapped with a div, we need to click the first child
                        const firstChild = nodeEl.firstChild;
                        if (firstChild && firstChild instanceof HTMLElement) {
                            firstChild.click();
                            return true;
                        }
                    }
                }
                return false;
            }
        };
    }
});
const __TURBOPACK__default__export__ = ImageUploadNode;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HorizontalRule": ()=>HorizontalRule,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$3$2e$0_$40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+core@3.3.0_@tiptap+pm@3.3.0/node_modules/@tiptap/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$horizonta_792ec47365da2dc8d5fd440e360510eb$2f$node_modules$2f40$tiptap$2f$extension$2d$horizontal$2d$rule$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extension-horizonta_792ec47365da2dc8d5fd440e360510eb/node_modules/@tiptap/extension-horizontal-rule/dist/index.js [app-client] (ecmascript)");
;
;
const HorizontalRule = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$horizonta_792ec47365da2dc8d5fd440e360510eb$2f$node_modules$2f40$tiptap$2f$extension$2d$horizontal$2d$rule$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend({
    renderHTML () {
        return [
            "div",
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$core$40$3$2e$3$2e$0_$40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeAttributes"])(this.options.HTMLAttributes, {
                "data-type": this.name
            }),
            [
                "hr"
            ]
        ];
    }
});
const __TURBOPACK__default__export__ = HorizontalRule;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/chevron-down-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ChevronDownIcon": ()=>ChevronDownIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ChevronDownIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/chevron-down-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/chevron-down-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ChevronDownIcon;
ChevronDownIcon.displayName = "ChevronDownIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "ChevronDownIcon$React.memo");
__turbopack_context__.k.register(_c1, "ChevronDownIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTiptapEditor": ()=>useTiptapEditor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+react@3.3.0_@floati_0f113c0788e141f44a684f6cc1ff509b/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useTiptapEditor(providedEditor) {
    _s();
    const { editor: coreEditor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useCurrentEditor"])();
    const mainEditor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useTiptapEditor.useMemo[mainEditor]": ()=>providedEditor || coreEditor
    }["useTiptapEditor.useMemo[mainEditor]"], [
        providedEditor,
        coreEditor
    ]);
    const editorState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditorState"])({
        editor: mainEditor,
        selector (context) {
            if (!context.editor) {
                return {
                    editor: null,
                    editorState: undefined,
                    canCommand: undefined
                };
            }
            return {
                editor: context.editor,
                editorState: context.editor.state,
                canCommand: context.editor.can
            };
        }
    });
    return editorState || {
        editor: null
    };
}
_s(useTiptapEditor, "IYksMVb+A97TXNiYBm/P1jEhbw8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useCurrentEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditorState"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/heading-one-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingOneIcon": ()=>HeadingOneIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const HeadingOneIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-one-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21.0001 10C21.0001 9.63121 20.7971 9.29235 20.472 9.11833C20.1468 8.94431 19.7523 8.96338 19.4454 9.16795L16.4454 11.168C15.9859 11.4743 15.8617 12.0952 16.1681 12.5547C16.4744 13.0142 17.0953 13.1384 17.5548 12.8321L19.0001 11.8685V18C19.0001 18.5523 19.4478 19 20.0001 19C20.5524 19 21.0001 18.5523 21.0001 18V10Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-one-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/heading-one-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = HeadingOneIcon;
HeadingOneIcon.displayName = "HeadingOneIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "HeadingOneIcon$React.memo");
__turbopack_context__.k.register(_c1, "HeadingOneIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/heading-two-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingTwoIcon": ()=>HeadingTwoIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const HeadingTwoIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-two-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M22.0001 12C22.0001 10.7611 21.1663 9.79297 20.0663 9.42632C18.9547 9.05578 17.6171 9.28724 16.4001 10.2C15.9582 10.5314 15.8687 11.1582 16.2001 11.6C16.5314 12.0418 17.1582 12.1314 17.6001 11.8C18.383 11.2128 19.0455 11.1942 19.4338 11.3237C19.8339 11.457 20.0001 11.7389 20.0001 12C20.0001 12.4839 19.8554 12.7379 19.6537 12.9481C19.4275 13.1837 19.1378 13.363 18.7055 13.6307C18.6313 13.6767 18.553 13.7252 18.4701 13.777C17.9572 14.0975 17.3128 14.5261 16.8163 15.2087C16.3007 15.9177 16.0001 16.8183 16.0001 18C16.0001 18.5523 16.4478 19 17.0001 19H21.0001C21.5523 19 22.0001 18.5523 22.0001 18C22.0001 17.4477 21.5523 17 21.0001 17H18.131C18.21 16.742 18.3176 16.5448 18.4338 16.385C18.6873 16.0364 19.0429 15.7775 19.5301 15.473C19.5898 15.4357 19.6536 15.3966 19.7205 15.3556C20.139 15.0992 20.6783 14.7687 21.0964 14.3332C21.6447 13.7621 22.0001 13.0161 22.0001 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-two-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/heading-two-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = HeadingTwoIcon;
HeadingTwoIcon.displayName = "HeadingTwoIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "HeadingTwoIcon$React.memo");
__turbopack_context__.k.register(_c1, "HeadingTwoIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/heading-three-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingThreeIcon": ()=>HeadingThreeIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const HeadingThreeIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 5C4.55228 5 5 5.44772 5 6V11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H5V18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18V6C3 5.44772 3.44772 5 4 5Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-three-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M19.4608 11.2169C19.1135 11.0531 18.5876 11.0204 18.0069 11.3619C17.5309 11.642 16.918 11.4831 16.638 11.007C16.358 10.531 16.5169 9.91809 16.9929 9.63807C18.1123 8.97962 19.3364 8.94691 20.314 9.40808C21.2839 9.86558 21.9999 10.818 21.9999 12C21.9999 12.7957 21.6838 13.5587 21.1212 14.1213C20.5586 14.6839 19.7956 15 18.9999 15C18.4476 15 17.9999 14.5523 17.9999 14C17.9999 13.4477 18.4476 13 18.9999 13C19.2651 13 19.5195 12.8947 19.707 12.7071C19.8946 12.5196 19.9999 12.2652 19.9999 12C19.9999 11.6821 19.8159 11.3844 19.4608 11.2169Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-three-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M18.0001 14C18.0001 13.4477 18.4478 13 19.0001 13C19.7957 13 20.5588 13.3161 21.1214 13.8787C21.684 14.4413 22.0001 15.2043 22.0001 16C22.0001 17.2853 21.2767 18.3971 20.1604 18.8994C19.0257 19.41 17.642 19.2315 16.4001 18.3C15.9582 17.9686 15.8687 17.3418 16.2001 16.9C16.5314 16.4582 17.1582 16.3686 17.6001 16.7C18.3581 17.2685 18.9744 17.24 19.3397 17.0756C19.7234 16.9029 20.0001 16.5147 20.0001 16C20.0001 15.7348 19.8947 15.4804 19.7072 15.2929C19.5196 15.1054 19.2653 15 19.0001 15C18.4478 15 18.0001 14.5523 18.0001 14Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-three-icon.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/heading-three-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = HeadingThreeIcon;
HeadingThreeIcon.displayName = "HeadingThreeIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "HeadingThreeIcon$React.memo");
__turbopack_context__.k.register(_c1, "HeadingThreeIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/heading-four-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingFourIcon": ()=>HeadingFourIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const HeadingFourIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 5C4.55228 5 5 5.44772 5 6V11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H5V18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18V6C3 5.44772 3.44772 5 4 5Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-four-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M17 9C17.5523 9 18 9.44772 18 10V13H20V10C20 9.44772 20.4477 9 21 9C21.5523 9 22 9.44772 22 10V18C22 18.5523 21.5523 19 21 19C20.4477 19 20 18.5523 20 18V15H17C16.4477 15 16 14.5523 16 14V10C16 9.44772 16.4477 9 17 9Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-four-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/heading-four-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = HeadingFourIcon;
HeadingFourIcon.displayName = "HeadingFourIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "HeadingFourIcon$React.memo");
__turbopack_context__.k.register(_c1, "HeadingFourIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/heading-five-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingFiveIcon": ()=>HeadingFiveIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const HeadingFiveIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-five-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 10C16 9.44772 16.4477 9 17 9H21C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11H18V12H18.3C20.2754 12 22 13.4739 22 15.5C22 17.5261 20.2754 19 18.3 19C17.6457 19 17.0925 18.8643 16.5528 18.5944C16.0588 18.3474 15.8586 17.7468 16.1055 17.2528C16.3525 16.7588 16.9532 16.5586 17.4472 16.8056C17.7074 16.9357 17.9542 17 18.3 17C19.3246 17 20 16.2739 20 15.5C20 14.7261 19.3246 14 18.3 14H17C16.4477 14 16 13.5523 16 13L16 12.9928V10Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-five-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/heading-five-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = HeadingFiveIcon;
HeadingFiveIcon.displayName = "HeadingFiveIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "HeadingFiveIcon$React.memo");
__turbopack_context__.k.register(_c1, "HeadingFiveIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/heading-six-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingSixIcon": ()=>HeadingSixIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const HeadingSixIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-six-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M20.7071 9.29289C21.0976 9.68342 21.0976 10.3166 20.7071 10.7071C19.8392 11.575 19.2179 12.2949 18.7889 13.0073C18.8587 13.0025 18.929 13 19 13C20.6569 13 22 14.3431 22 16C22 17.6569 20.6569 19 19 19C17.3431 19 16 17.6569 16 16C16 14.6007 16.2837 13.4368 16.8676 12.3419C17.4384 11.2717 18.2728 10.3129 19.2929 9.29289C19.6834 8.90237 20.3166 8.90237 20.7071 9.29289ZM19 17C18.4477 17 18 16.5523 18 16C18 15.4477 18.4477 15 19 15C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/heading-six-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/heading-six-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = HeadingSixIcon;
HeadingSixIcon.displayName = "HeadingSixIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "HeadingSixIcon$React.memo");
__turbopack_context__.k.register(_c1, "HeadingSixIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/heading-button/use-heading.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HEADING_SHORTCUT_KEYS": ()=>HEADING_SHORTCUT_KEYS,
    "canToggle": ()=>canToggle,
    "headingIcons": ()=>headingIcons,
    "isHeadingActive": ()=>isHeadingActive,
    "shouldShowButton": ()=>shouldShowButton,
    "toggleHeading": ()=>toggleHeading,
    "useHeading": ()=>useHeading
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$state$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+pm@3.3.0/node_modules/@tiptap/pm/dist/state/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$one$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/heading-one-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$two$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/heading-two-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$three$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/heading-three-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$four$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/heading-four-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$five$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/heading-five-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$six$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/heading-six-icon.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const headingIcons = {
    1: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$one$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingOneIcon"],
    2: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$two$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingTwoIcon"],
    3: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$three$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingThreeIcon"],
    4: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$four$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingFourIcon"],
    5: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$five$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingFiveIcon"],
    6: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$six$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingSixIcon"]
};
const HEADING_SHORTCUT_KEYS = {
    1: "ctrl+alt+1",
    2: "ctrl+alt+2",
    3: "ctrl+alt+3",
    4: "ctrl+alt+4",
    5: "ctrl+alt+5",
    6: "ctrl+alt+6"
};
function canToggle(editor, level) {
    let turnInto = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])("heading", editor) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    if (!turnInto) {
        return level ? editor.can().setNode("heading", {
            level
        }) : editor.can().setNode("heading");
    }
    try {
        const view = editor.view;
        const state = view.state;
        const selection = state.selection;
        if (selection.empty || selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"]) {
            var _findNodePosition;
            const pos = (_findNodePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNodePosition"])({
                editor,
                node: state.selection.$anchor.node(1)
            })) === null || _findNodePosition === void 0 ? void 0 : _findNodePosition.pos;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}
function isHeadingActive(editor, level) {
    if (!editor || !editor.isEditable) return false;
    if (Array.isArray(level)) {
        return level.some((l)=>editor.isActive("heading", {
                level: l
            }));
    }
    return level ? editor.isActive("heading", {
        level
    }) : editor.isActive("heading");
}
function toggleHeading(editor, level) {
    if (!editor || !editor.isEditable) return false;
    const levels = Array.isArray(level) ? level : [
        level
    ];
    const toggleLevel = levels.find((l)=>canToggle(editor, l));
    if (!toggleLevel) return false;
    try {
        const view = editor.view;
        let state = view.state;
        let tr = state.tr;
        // No selection, find the cursor position
        if (state.selection.empty || state.selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"]) {
            var _findNodePosition;
            const pos = (_findNodePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNodePosition"])({
                editor,
                node: state.selection.$anchor.node(1)
            })) === null || _findNodePosition === void 0 ? void 0 : _findNodePosition.pos;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) return false;
            tr = tr.setSelection(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"].create(state.doc, pos));
            view.dispatch(tr);
            state = view.state;
        }
        const selection = state.selection;
        let chain = editor.chain().focus();
        // Handle NodeSelection
        if (selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"]) {
            var _selection_node_firstChild, _selection_node_lastChild;
            const firstChild = (_selection_node_firstChild = selection.node.firstChild) === null || _selection_node_firstChild === void 0 ? void 0 : _selection_node_firstChild.firstChild;
            const lastChild = (_selection_node_lastChild = selection.node.lastChild) === null || _selection_node_lastChild === void 0 ? void 0 : _selection_node_lastChild.lastChild;
            const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
            const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;
            chain = chain.setTextSelection({
                from,
                to
            }).clearNodes();
        }
        const isActive = levels.some((l)=>editor.isActive("heading", {
                level: l
            }));
        const toggle = isActive ? chain.setNode("paragraph") : chain.setNode("heading", {
            level: toggleLevel
        });
        toggle.run();
        editor.chain().focus().selectTextblockEnd().run();
        return true;
    } catch (e) {
        return false;
    }
}
function shouldShowButton(props) {
    const { editor, level, hideWhenUnavailable } = props;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])("heading", editor)) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        if (Array.isArray(level)) {
            return level.some((l)=>canToggle(editor, l));
        }
        return canToggle(editor, level);
    }
    return true;
}
function useHeading(config) {
    _s();
    const { editor: providedEditor, level, hideWhenUnavailable = false, onToggled } = config;
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canToggleState = canToggle(editor, level);
    const isActive = isHeadingActive(editor, level);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHeading.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useHeading.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        level,
                        hideWhenUnavailable
                    }));
                }
            }["useHeading.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useHeading.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useHeading.useEffect"];
        }
    }["useHeading.useEffect"], [
        editor,
        level,
        hideWhenUnavailable
    ]);
    const handleToggle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useHeading.useCallback[handleToggle]": ()=>{
            if (!editor) return false;
            const success = toggleHeading(editor, level);
            if (success) {
                onToggled === null || onToggled === void 0 ? void 0 : onToggled();
            }
            return success;
        }
    }["useHeading.useCallback[handleToggle]"], [
        editor,
        level,
        onToggled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(HEADING_SHORTCUT_KEYS[level], {
        "useHeading.useHotkeys": (event)=>{
            event.preventDefault();
            handleToggle();
        }
    }["useHeading.useHotkeys"], {
        enabled: isVisible && canToggleState,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        isActive,
        handleToggle,
        canToggle: canToggleState,
        label: "Heading ".concat(level),
        shortcutKeys: HEADING_SHORTCUT_KEYS[level],
        Icon: headingIcons[level]
    };
}
_s(useHeading, "zNanQZuMkxIRlgYUeJ62mY1GmM8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Badge": ()=>Badge,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Badge = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { variant, size = "default", appearance = "default", trimText = false, className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "tiptap-badge ".concat(className || ""),
        "data-style": variant,
        "data-size": size,
        "data-appearance": appearance,
        "data-text-trim": trimText ? "on" : "off",
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/badge/badge.tsx",
        lineNumber: 29,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Badge;
Badge.displayName = "Badge";
const __TURBOPACK__default__export__ = Badge;
var _c, _c1;
__turbopack_context__.k.register(_c, "Badge$React.forwardRef");
__turbopack_context__.k.register(_c1, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui/heading-button/heading-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingButton": ()=>HeadingButton,
    "HeadingShortcutBadge": ()=>HeadingShortcutBadge
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/use-heading.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function HeadingShortcutBadge(param) {
    let { level, shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEADING_SHORTCUT_KEYS"][level] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/heading-button/heading-button.tsx",
        lineNumber: 45,
        columnNumber: 10
    }, this);
}
_c = HeadingShortcutBadge;
const HeadingButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, level, text, hideWhenUnavailable = false, onToggled, showShortcut = false, onClick, children, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, canToggle, isActive, handleToggle, label, Icon, shortcutKeys } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHeading"])({
        editor,
        level,
        hideWhenUnavailable,
        onToggled
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "HeadingButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleToggle();
        }
    }["HeadingButton.useCallback[handleClick]"], [
        handleToggle,
        onClick
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canToggle,
        "data-disabled": !canToggle,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "tiptap-button-icon"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/heading-button/heading-button.tsx",
                    lineNumber: 118,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/heading-button/heading-button.tsx",
                    lineNumber: 119,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingShortcutBadge, {
                    level: level,
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/heading-button/heading-button.tsx",
                    lineNumber: 121,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/heading-button/heading-button.tsx",
        lineNumber: 101,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "sY58mA1kdoCHvALRS4cnviP+Rtc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHeading"]
    ];
})), "sY58mA1kdoCHvALRS4cnviP+Rtc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHeading"]
    ];
});
_c2 = HeadingButton;
HeadingButton.displayName = "HeadingButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HeadingShortcutBadge");
__turbopack_context__.k.register(_c1, "HeadingButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "HeadingButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/heading-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$heading$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/heading-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/use-heading.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/heading-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$heading$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/heading-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/use-heading.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/heading-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingIcon": ()=>HeadingIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const HeadingIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M6 3C6.55228 3 7 3.44772 7 4V11H17V4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V13H7V20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/heading-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/heading-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = HeadingIcon;
HeadingIcon.displayName = "HeadingIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "HeadingIcon$React.memo");
__turbopack_context__.k.register(_c1, "HeadingIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/heading-dropdown-menu/use-heading-dropdown-menu.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getActiveHeadingLevel": ()=>getActiveHeadingLevel,
    "useHeadingDropdownMenu": ()=>useHeadingDropdownMenu
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/heading-icon.tsx [app-client] (ecmascript)");
// --- Tiptap UI ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/use-heading.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function getActiveHeadingLevel(editor) {
    let levels = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [
        1,
        2,
        3,
        4,
        5,
        6
    ];
    if (!editor || !editor.isEditable) return undefined;
    return levels.find((level)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHeadingActive"])(editor, level));
}
function useHeadingDropdownMenu(config) {
    _s();
    const { editor: providedEditor, levels = [
        1,
        2,
        3,
        4,
        5,
        6
    ], hideWhenUnavailable = false } = config || {};
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const activeLevel = getActiveHeadingLevel(editor, levels);
    const isActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHeadingActive"])(editor);
    const canToggleState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canToggle"])(editor);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useHeadingDropdownMenu.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useHeadingDropdownMenu.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldShowButton"])({
                        editor,
                        hideWhenUnavailable,
                        level: levels
                    }));
                }
            }["useHeadingDropdownMenu.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useHeadingDropdownMenu.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useHeadingDropdownMenu.useEffect"];
        }
    }["useHeadingDropdownMenu.useEffect"], [
        editor,
        hideWhenUnavailable,
        levels
    ]);
    return {
        isVisible,
        activeLevel,
        isActive,
        canToggle: canToggleState,
        levels,
        label: "Heading",
        Icon: activeLevel ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$use$2d$heading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headingIcons"][activeLevel] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$heading$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingIcon"]
    };
}
_s(useHeadingDropdownMenu, "KvRlD1rZDl0As7cCBIxTrj0PQ7Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DropdownMenu": ()=>DropdownMenu,
    "DropdownMenuContent": ()=>DropdownMenuContent,
    "DropdownMenuGroup": ()=>DropdownMenuGroup,
    "DropdownMenuItem": ()=>DropdownMenuItem,
    "DropdownMenuPortal": ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup": ()=>DropdownMenuRadioGroup,
    "DropdownMenuSub": ()=>DropdownMenuSub,
    "DropdownMenuSubContent": ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger": ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger": ()=>DropdownMenuTrigger
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@radix-ui+react-dropdown-me_17d9eb7b10fc1061a903a24d110a1c22/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DropdownMenu(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        modal: false,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
_c = DropdownMenu;
function DropdownMenuPortal(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, this);
}
_c1 = DropdownMenuPortal;
const DropdownMenuTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = (param, ref)=>{
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx",
        lineNumber: 23,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = DropdownMenuTrigger;
DropdownMenuTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const DropdownMenuGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"];
const DropdownMenuSub = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sub"];
const DropdownMenuRadioGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"];
const DropdownMenuItem = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"];
const DropdownMenuSubTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"];
const DropdownMenuSubContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = (param, ref)=>{
    let { className, portal = true, ...props } = param;
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-dropdown-menu", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    return portal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DropdownMenuPortal, {
        ...typeof portal === "object" ? portal : {},
        children: content
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)) : content;
});
_c5 = DropdownMenuSubContent;
DropdownMenuSubContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"].displayName;
const DropdownMenuContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = (param, ref)=>{
    let { className, sideOffset = 4, portal = false, ...props } = param;
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        ref: ref,
        sideOffset: sideOffset,
        onCloseAutoFocus: (e)=>e.preventDefault(),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-dropdown-menu", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    return portal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DropdownMenuPortal, {
        ...typeof portal === "object" ? portal : {},
        children: content
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)) : content;
});
_c7 = DropdownMenuContent;
DropdownMenuContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dropdown$2d$me_17d9eb7b10fc1061a903a24d110a1c22$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "DropdownMenu");
__turbopack_context__.k.register(_c1, "DropdownMenuPortal");
__turbopack_context__.k.register(_c2, "DropdownMenuTrigger$React.forwardRef");
__turbopack_context__.k.register(_c3, "DropdownMenuTrigger");
__turbopack_context__.k.register(_c4, "DropdownMenuSubContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "DropdownMenuSubContent");
__turbopack_context__.k.register(_c6, "DropdownMenuContent$React.forwardRef");
__turbopack_context__.k.register(_c7, "DropdownMenuContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/dropdown-menu/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/dropdown-menu/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/dropdown-menu/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui-primitive/card/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": ()=>Card,
    "CardBody": ()=>CardBody,
    "CardFooter": ()=>CardFooter,
    "CardGroupLabel": ()=>CardGroupLabel,
    "CardHeader": ()=>CardHeader,
    "CardItemGroup": ()=>CardItemGroup
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-card", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/card/card.tsx",
        lineNumber: 9,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-card-header", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/card/card.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardBody = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-card-body", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/card/card.tsx",
        lineNumber: 27,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c5 = CardBody;
CardBody.displayName = "CardBody";
const CardItemGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = (param, ref)=>{
    let { className, orientation = "vertical", ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        "data-orientation": orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-card-item-group", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/card/card.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c7 = CardItemGroup;
CardItemGroup.displayName = "CardItemGroup";
const CardGroupLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-card-group-label", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/card/card.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c9 = CardGroupLabel;
CardGroupLabel.displayName = "CardGroupLabel";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-card-footer", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/card/card.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardBody$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardBody");
__turbopack_context__.k.register(_c6, "CardItemGroup$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardItemGroup");
__turbopack_context__.k.register(_c8, "CardGroupLabel$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardGroupLabel");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/card/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/card.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/card/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadingDropdownMenu": ()=>HeadingDropdownMenu,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$chevron$2d$down$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/chevron-down-icon.tsx [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Tiptap UI ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$heading$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-button/heading-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$use$2d$heading$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/use-heading-dropdown-menu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/dropdown-menu/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const HeadingDropdownMenu = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = _s((param, ref)=>{
    let { editor: providedEditor, levels = [
        1,
        2,
        3,
        4,
        5,
        6
    ], hideWhenUnavailable = false, portal = false, onOpenChange, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const { isVisible, isActive, canToggle, Icon } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$use$2d$heading$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHeadingDropdownMenu"])({
        editor,
        levels,
        hideWhenUnavailable
    });
    const handleOpenChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "HeadingDropdownMenu.useCallback[handleOpenChange]": (open)=>{
            if (!editor || !canToggle) return;
            setIsOpen(open);
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(open);
        }
    }["HeadingDropdownMenu.useCallback[handleOpenChange]"], [
        canToggle,
        editor,
        onOpenChange
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        modal: true,
        open: isOpen,
        onOpenChange: handleOpenChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    type: "button",
                    "data-style": "ghost",
                    "data-active-state": isActive ? "on" : "off",
                    role: "button",
                    tabIndex: -1,
                    disabled: !canToggle,
                    "data-disabled": !canToggle,
                    "aria-label": "Format text as heading",
                    "aria-pressed": isActive,
                    tooltip: "Heading",
                    ...buttonProps,
                    ref: ref,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "tiptap-button-icon"
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$chevron$2d$down$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChevronDownIcon"], {
                            className: "tiptap-button-dropdown-small"
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "start",
                portal: portal,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                            children: levels.map((level)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$button$2f$heading$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingButton"], {
                                        editor: editor,
                                        level: level,
                                        text: "Heading ".concat(level),
                                        showTooltip: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                                        lineNumber: 110,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, "heading-".concat(level), false, {
                                    fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                                    lineNumber: 109,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                            lineNumber: 107,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                        lineNumber: 106,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                    lineNumber: 105,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx",
        lineNumber: 83,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "WB2o7Z5yeMWEEY/j0eCdTErsMlc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$use$2d$heading$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHeadingDropdownMenu"]
    ];
})), "WB2o7Z5yeMWEEY/j0eCdTErsMlc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$use$2d$heading$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHeadingDropdownMenu"]
    ];
});
_c1 = HeadingDropdownMenu;
HeadingDropdownMenu.displayName = "HeadingDropdownMenu";
const __TURBOPACK__default__export__ = HeadingDropdownMenu;
var _c, _c1;
__turbopack_context__.k.register(_c, "HeadingDropdownMenu$React.forwardRef");
__turbopack_context__.k.register(_c1, "HeadingDropdownMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/heading-dropdown-menu/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$heading$2d$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$use$2d$heading$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/use-heading-dropdown-menu.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/heading-dropdown-menu/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$heading$2d$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$use$2d$heading$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/use-heading-dropdown-menu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/image-plus-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ImagePlusIcon": ()=>ImagePlusIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ImagePlusIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M20 2C20 1.44772 19.5523 1 19 1C18.4477 1 18 1.44772 18 2V4H16C15.4477 4 15 4.44772 15 5C15 5.55228 15.4477 6 16 6H18V8C18 8.55228 18.4477 9 19 9C19.5523 9 20 8.55228 20 8V6H22C22.5523 6 23 5.55228 23 5C23 4.44772 22.5523 4 22 4H20V2ZM5 4C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H5.58579L14.379 11.2068C14.9416 10.6444 15.7045 10.3284 16.5 10.3284C17.2955 10.3284 18.0584 10.6444 18.621 11.2068L20 12.5858V12C20 11.4477 20.4477 11 21 11C21.5523 11 22 11.4477 22 12V14.998C22 14.9994 22 15.0007 22 15.002V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H6.00219C6.00073 22 5.99927 22 5.99781 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H12C12.5523 2 13 2.44772 13 3C13 3.55228 12.5523 4 12 4H5ZM8.41422 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V15.4142L17.207 12.6212C17.0195 12.4338 16.7651 12.3284 16.5 12.3284C16.2349 12.3284 15.9806 12.4337 15.7931 12.6211L8.41422 20ZM6.87868 6.87868C7.44129 6.31607 8.20435 6 9 6C9.79565 6 10.5587 6.31607 11.1213 6.87868C11.6839 7.44129 12 8.20435 12 9C12 9.79565 11.6839 10.5587 11.1213 11.1213C10.5587 11.6839 9.79565 12 9 12C8.20435 12 7.44129 11.6839 6.87868 11.1213C6.31607 10.5587 6 9.79565 6 9C6 8.20435 6.31607 7.44129 6.87868 6.87868ZM9 8C8.73478 8 8.48043 8.10536 8.29289 8.29289C8.10536 8.48043 8 8.73478 8 9C8 9.26522 8.10536 9.51957 8.29289 9.70711C8.48043 9.89464 8.73478 10 9 10C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/image-plus-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/image-plus-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ImagePlusIcon;
ImagePlusIcon.displayName = "ImagePlusIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "ImagePlusIcon$React.memo");
__turbopack_context__.k.register(_c1, "ImagePlusIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/image-upload-button/use-image-upload.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "IMAGE_UPLOAD_SHORTCUT_KEY": ()=>IMAGE_UPLOAD_SHORTCUT_KEY,
    "canInsertImage": ()=>canInsertImage,
    "insertImage": ()=>insertImage,
    "isImageActive": ()=>isImageActive,
    "shouldShowButton": ()=>shouldShowButton,
    "useImageUpload": ()=>useImageUpload
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$image$2d$plus$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/image-plus-icon.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const IMAGE_UPLOAD_SHORTCUT_KEY = "mod+shift+i";
function canInsertImage(editor) {
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExtensionAvailable"])(editor, "imageUpload") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    return editor.can().insertContent({
        type: "imageUpload"
    });
}
function isImageActive(editor) {
    if (!editor || !editor.isEditable) return false;
    return editor.isActive("imageUpload");
}
function insertImage(editor) {
    if (!editor || !editor.isEditable) return false;
    if (!canInsertImage(editor)) return false;
    try {
        return editor.chain().focus().insertContent({
            type: "imageUpload"
        }).run();
    } catch (e) {
        return false;
    }
}
function shouldShowButton(props) {
    const { editor, hideWhenUnavailable } = props;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExtensionAvailable"])(editor, "imageUpload")) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canInsertImage(editor);
    }
    return true;
}
function useImageUpload(config) {
    _s();
    const { editor: providedEditor, hideWhenUnavailable = false, onInserted } = config || {};
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canInsert = canInsertImage(editor);
    const isActive = isImageActive(editor);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useImageUpload.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useImageUpload.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        hideWhenUnavailable
                    }));
                }
            }["useImageUpload.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useImageUpload.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useImageUpload.useEffect"];
        }
    }["useImageUpload.useEffect"], [
        editor,
        hideWhenUnavailable
    ]);
    const handleImage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useImageUpload.useCallback[handleImage]": ()=>{
            if (!editor) return false;
            const success = insertImage(editor);
            if (success) {
                onInserted === null || onInserted === void 0 ? void 0 : onInserted();
            }
            return success;
        }
    }["useImageUpload.useCallback[handleImage]"], [
        editor,
        onInserted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(IMAGE_UPLOAD_SHORTCUT_KEY, {
        "useImageUpload.useHotkeys": (event)=>{
            event.preventDefault();
            handleImage();
        }
    }["useImageUpload.useHotkeys"], {
        enabled: isVisible && canInsert,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        isActive,
        handleImage,
        canInsert,
        label: "Add image",
        shortcutKeys: IMAGE_UPLOAD_SHORTCUT_KEY,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$image$2d$plus$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePlusIcon"]
    };
}
_s(useImageUpload, "REnKMD+2CGuoFTdooUFDMWfC5Pg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ImageShortcutBadge": ()=>ImageShortcutBadge,
    "ImageUploadButton": ()=>ImageUploadButton
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$use$2d$image$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/use-image-upload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ImageShortcutBadge(param) {
    let { shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$use$2d$image$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGE_UPLOAD_SHORTCUT_KEY"] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, this);
}
_c = ImageShortcutBadge;
const ImageUploadButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, text, hideWhenUnavailable = false, onInserted, showShortcut = false, onClick, children, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, canInsert, handleImage, label, isActive, shortcutKeys, Icon } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$use$2d$image$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImageUpload"])({
        editor,
        hideWhenUnavailable,
        onInserted
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ImageUploadButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleImage();
        }
    }["ImageUploadButton.useCallback[handleClick]"], [
        handleImage,
        onClick
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canInsert,
        "data-disabled": !canInsert,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "tiptap-button-icon"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx",
                    lineNumber: 113,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx",
                    lineNumber: 114,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageShortcutBadge, {
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx",
                    lineNumber: 115,
                    columnNumber: 30
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx",
        lineNumber: 96,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "omPX6nsRfRIDpF8N4GAK/FNszjU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$use$2d$image$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImageUpload"]
    ];
})), "omPX6nsRfRIDpF8N4GAK/FNszjU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$use$2d$image$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImageUpload"]
    ];
});
_c2 = ImageUploadButton;
ImageUploadButton.displayName = "ImageUploadButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ImageShortcutBadge");
__turbopack_context__.k.register(_c1, "ImageUploadButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "ImageUploadButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/image-upload-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$image$2d$upload$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$use$2d$image$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/use-image-upload.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/image-upload-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$image$2d$upload$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$use$2d$image$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/use-image-upload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/list-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ListIcon": ()=>ListIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ListIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M7 6C7 5.44772 7.44772 5 8 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H8C7.44772 7 7 6.55228 7 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M7 12C7 11.4477 7.44772 11 8 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H8C7.44772 13 7 12.5523 7 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M7 18C7 17.4477 7.44772 17 8 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H8C7.44772 19 7 18.5523 7 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 6C2 5.44772 2.44772 5 3 5H3.01C3.56228 5 4.01 5.44772 4.01 6C4.01 6.55228 3.56228 7 3.01 7H3C2.44772 7 2 6.55228 2 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-icon.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 12C2 11.4477 2.44772 11 3 11H3.01C3.56228 11 4.01 11.4477 4.01 12C4.01 12.5523 3.56228 13 3.01 13H3C2.44772 13 2 12.5523 2 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-icon.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 18C2 17.4477 2.44772 17 3 17H3.01C3.56228 17 4.01 17.4477 4.01 18C4.01 18.5523 3.56228 19 3.01 19H3C2.44772 19 2 18.5523 2 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-icon.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/list-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ListIcon;
ListIcon.displayName = "ListIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "ListIcon$React.memo");
__turbopack_context__.k.register(_c1, "ListIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/list-ordered-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ListOrderedIcon": ()=>ListOrderedIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ListOrderedIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M9 6C9 5.44772 9.44772 5 10 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H10C9.44772 7 9 6.55228 9 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-ordered-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M9 12C9 11.4477 9.44772 11 10 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H10C9.44772 13 9 12.5523 9 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-ordered-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M9 18C9 17.4477 9.44772 17 10 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H10C9.44772 19 9 18.5523 9 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-ordered-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M3 6C3 5.44772 3.44772 5 4 5H5C5.55228 5 6 5.44772 6 6V10C6 10.5523 5.55228 11 5 11C4.44772 11 4 10.5523 4 10V7C3.44772 7 3 6.55228 3 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-ordered-icon.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M3 10C3 9.44772 3.44772 9 4 9H6C6.55228 9 7 9.44772 7 10C7 10.5523 6.55228 11 6 11H4C3.44772 11 3 10.5523 3 10Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-ordered-icon.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M5.82219 13.0431C6.54543 13.4047 6.99997 14.1319 6.99997 15C6.99997 15.5763 6.71806 16.0426 6.48747 16.35C6.31395 16.5814 6.1052 16.8044 5.91309 17H5.99997C6.55226 17 6.99997 17.4477 6.99997 18C6.99997 18.5523 6.55226 19 5.99997 19H3.99997C3.44769 19 2.99997 18.5523 2.99997 18C2.99997 17.4237 3.28189 16.9575 3.51247 16.65C3.74323 16.3424 4.03626 16.0494 4.26965 15.8161C4.27745 15.8083 4.2852 15.8006 4.29287 15.7929C4.55594 15.5298 4.75095 15.3321 4.88748 15.15C4.96287 15.0495 4.99021 14.9922 4.99911 14.9714C4.99535 14.9112 4.9803 14.882 4.9739 14.8715C4.96613 14.8588 4.95382 14.845 4.92776 14.8319C4.87723 14.8067 4.71156 14.7623 4.44719 14.8944C3.95321 15.1414 3.35254 14.9412 3.10555 14.4472C2.85856 13.9533 3.05878 13.3526 3.55276 13.1056C4.28839 12.7378 5.12272 12.6934 5.82219 13.0431Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-ordered-icon.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/list-ordered-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ListOrderedIcon;
ListOrderedIcon.displayName = "ListOrderedIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "ListOrderedIcon$React.memo");
__turbopack_context__.k.register(_c1, "ListOrderedIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/list-todo-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ListTodoIcon": ()=>ListTodoIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ListTodoIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 6C2 4.89543 2.89543 4 4 4H8C9.10457 4 10 4.89543 10 6V10C10 11.1046 9.10457 12 8 12H4C2.89543 12 2 11.1046 2 10V6ZM8 6H4V10H8V6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-todo-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M9.70711 14.2929C10.0976 14.6834 10.0976 15.3166 9.70711 15.7071L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071L2.29289 17.7071C1.90237 17.3166 1.90237 16.6834 2.29289 16.2929C2.68342 15.9024 3.31658 15.9024 3.70711 16.2929L5 17.5858L8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-todo-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M12 6C12 5.44772 12.4477 5 13 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H13C12.4477 7 12 6.55228 12 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-todo-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M12 12C12 11.4477 12.4477 11 13 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13C12.4477 13 12 12.5523 12 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-todo-icon.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M12 18C12 17.4477 12.4477 17 13 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H13C12.4477 19 12 18.5523 12 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/list-todo-icon.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/list-todo-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ListTodoIcon;
ListTodoIcon.displayName = "ListTodoIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "ListTodoIcon$React.memo");
__turbopack_context__.k.register(_c1, "ListTodoIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/list-button/use-list.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LIST_SHORTCUT_KEYS": ()=>LIST_SHORTCUT_KEYS,
    "canToggleList": ()=>canToggleList,
    "isListActive": ()=>isListActive,
    "listIcons": ()=>listIcons,
    "listLabels": ()=>listLabels,
    "shouldShowButton": ()=>shouldShowButton,
    "toggleList": ()=>toggleList,
    "useList": ()=>useList
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$state$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+pm@3.3.0/node_modules/@tiptap/pm/dist/state/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/list-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$ordered$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/list-ordered-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$todo$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/list-todo-icon.tsx [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const listIcons = {
    bulletList: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListIcon"],
    orderedList: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$ordered$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListOrderedIcon"],
    taskList: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$todo$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListTodoIcon"]
};
const listLabels = {
    bulletList: "Bullet List",
    orderedList: "Ordered List",
    taskList: "Task List"
};
const LIST_SHORTCUT_KEYS = {
    bulletList: "mod+shift+8",
    orderedList: "mod+shift+7",
    taskList: "mod+shift+9"
};
function canToggleList(editor, type) {
    let turnInto = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])(type, editor) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    if (!turnInto) {
        switch(type){
            case "bulletList":
                return editor.can().toggleBulletList();
            case "orderedList":
                return editor.can().toggleOrderedList();
            case "taskList":
                return editor.can().toggleList("taskList", "taskItem");
            default:
                return false;
        }
    }
    try {
        const view = editor.view;
        const state = view.state;
        const selection = state.selection;
        if (selection.empty || selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"]) {
            var _findNodePosition;
            const pos = (_findNodePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNodePosition"])({
                editor,
                node: state.selection.$anchor.node(1)
            })) === null || _findNodePosition === void 0 ? void 0 : _findNodePosition.pos;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}
function isListActive(editor, type) {
    if (!editor || !editor.isEditable) return false;
    switch(type){
        case "bulletList":
            return editor.isActive("bulletList");
        case "orderedList":
            return editor.isActive("orderedList");
        case "taskList":
            return editor.isActive("taskList");
        default:
            return false;
    }
}
function toggleList(editor, type) {
    if (!editor || !editor.isEditable) return false;
    if (!canToggleList(editor, type)) return false;
    try {
        const view = editor.view;
        let state = view.state;
        let tr = state.tr;
        // No selection, find the the cursor position
        if (state.selection.empty || state.selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"]) {
            var _findNodePosition;
            const pos = (_findNodePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNodePosition"])({
                editor,
                node: state.selection.$anchor.node(1)
            })) === null || _findNodePosition === void 0 ? void 0 : _findNodePosition.pos;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) return false;
            tr = tr.setSelection(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"].create(state.doc, pos));
            view.dispatch(tr);
            state = view.state;
        }
        const selection = state.selection;
        let chain = editor.chain().focus();
        // Handle NodeSelection
        if (selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"]) {
            var _selection_node_firstChild, _selection_node_lastChild;
            const firstChild = (_selection_node_firstChild = selection.node.firstChild) === null || _selection_node_firstChild === void 0 ? void 0 : _selection_node_firstChild.firstChild;
            const lastChild = (_selection_node_lastChild = selection.node.lastChild) === null || _selection_node_lastChild === void 0 ? void 0 : _selection_node_lastChild.lastChild;
            const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
            const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;
            chain = chain.setTextSelection({
                from,
                to
            }).clearNodes();
        }
        if (editor.isActive(type)) {
            // Unwrap list
            chain.liftListItem("listItem").lift("bulletList").lift("orderedList").lift("taskList").run();
        } else {
            // Wrap in specific list type
            const toggleMap = {
                bulletList: ()=>chain.toggleBulletList(),
                orderedList: ()=>chain.toggleOrderedList(),
                taskList: ()=>chain.toggleList("taskList", "taskItem")
            };
            const toggle = toggleMap[type];
            if (!toggle) return false;
            toggle().run();
        }
        editor.chain().focus().selectTextblockEnd().run();
        return true;
    } catch (e) {
        return false;
    }
}
function shouldShowButton(props) {
    const { editor, type, hideWhenUnavailable } = props;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])(type, editor)) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggleList(editor, type);
    }
    return true;
}
function useList(config) {
    _s();
    const { editor: providedEditor, type, hideWhenUnavailable = false, onToggled } = config;
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canToggle = canToggleList(editor, type);
    const isActive = isListActive(editor, type);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useList.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useList.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        type,
                        hideWhenUnavailable
                    }));
                }
            }["useList.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useList.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useList.useEffect"];
        }
    }["useList.useEffect"], [
        editor,
        type,
        hideWhenUnavailable
    ]);
    const handleToggle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useList.useCallback[handleToggle]": ()=>{
            if (!editor) return false;
            const success = toggleList(editor, type);
            if (success) {
                onToggled === null || onToggled === void 0 ? void 0 : onToggled();
            }
            return success;
        }
    }["useList.useCallback[handleToggle]"], [
        editor,
        type,
        onToggled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(LIST_SHORTCUT_KEYS[type], {
        "useList.useHotkeys": (event)=>{
            event.preventDefault();
            handleToggle();
        }
    }["useList.useHotkeys"], {
        enabled: isVisible && canToggle,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        isActive,
        handleToggle,
        canToggle,
        label: listLabels[type],
        shortcutKeys: LIST_SHORTCUT_KEYS[type],
        Icon: listIcons[type]
    };
}
_s(useList, "zNanQZuMkxIRlgYUeJ62mY1GmM8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/list-button/list-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ListButton": ()=>ListButton,
    "ListShortcutBadge": ()=>ListShortcutBadge
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/use-list.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ListShortcutBadge(param) {
    let { type, shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LIST_SHORTCUT_KEYS"][type] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/list-button/list-button.tsx",
        lineNumber: 41,
        columnNumber: 10
    }, this);
}
_c = ListShortcutBadge;
const ListButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, type, text, hideWhenUnavailable = false, onToggled, showShortcut = false, onClick, children, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, canToggle, isActive, handleToggle, label, shortcutKeys, Icon } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useList"])({
        editor,
        type,
        hideWhenUnavailable,
        onToggled
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ListButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleToggle();
        }
    }["ListButton.useCallback[handleClick]"], [
        handleToggle,
        onClick
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canToggle,
        "data-disabled": !canToggle,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "tiptap-button-icon"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/list-button/list-button.tsx",
                    lineNumber: 111,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/list-button/list-button.tsx",
                    lineNumber: 112,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ListShortcutBadge, {
                    type: type,
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/list-button/list-button.tsx",
                    lineNumber: 114,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/list-button/list-button.tsx",
        lineNumber: 94,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "6OyD/I85G1bQ4W7p1aaVtFH00uw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useList"]
    ];
})), "6OyD/I85G1bQ4W7p1aaVtFH00uw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useList"]
    ];
});
_c2 = ListButton;
ListButton.displayName = "ListButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ListShortcutBadge");
__turbopack_context__.k.register(_c1, "ListButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "ListButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/list-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$list$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/list-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/use-list.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/list-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$list$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/list-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/use-list.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui/list-dropdown-menu/use-list-dropdown-menu.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "canToggleAnyList": ()=>canToggleAnyList,
    "getActiveListType": ()=>getActiveListType,
    "getFilteredListOptions": ()=>getFilteredListOptions,
    "isAnyListActive": ()=>isAnyListActive,
    "listOptions": ()=>listOptions,
    "shouldShowListDropdown": ()=>shouldShowListDropdown,
    "useListDropdownMenu": ()=>useListDropdownMenu
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/list-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$ordered$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/list-ordered-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$todo$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/list-todo-icon.tsx [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Tiptap UI ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/use-list.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const listOptions = [
    {
        label: "Bullet List",
        type: "bulletList",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListIcon"]
    },
    {
        label: "Ordered List",
        type: "orderedList",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$ordered$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListOrderedIcon"]
    },
    {
        label: "Task List",
        type: "taskList",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$todo$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListTodoIcon"]
    }
];
function canToggleAnyList(editor, listTypes) {
    if (!editor || !editor.isEditable) return false;
    return listTypes.some((type)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canToggleList"])(editor, type));
}
function isAnyListActive(editor, listTypes) {
    if (!editor || !editor.isEditable) return false;
    return listTypes.some((type)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListActive"])(editor, type));
}
function getFilteredListOptions(availableTypes) {
    return listOptions.filter((option)=>!option.type || availableTypes.includes(option.type));
}
function shouldShowListDropdown(params) {
    const { editor, hideWhenUnavailable, listInSchema, canToggleAny } = params;
    if (!listInSchema || !editor) {
        return false;
    }
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggleAny;
    }
    return true;
}
function getActiveListType(editor, availableTypes) {
    if (!editor || !editor.isEditable) return undefined;
    return availableTypes.find((type)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListActive"])(editor, type));
}
function useListDropdownMenu(config) {
    _s();
    const { editor: providedEditor, types = [
        "bulletList",
        "orderedList",
        "taskList"
    ], hideWhenUnavailable = false } = config || {};
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const listInSchema = types.some((type)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])(type, editor));
    const filteredLists = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useListDropdownMenu.useMemo[filteredLists]": ()=>getFilteredListOptions(types)
    }["useListDropdownMenu.useMemo[filteredLists]"], [
        types
    ]);
    const canToggleAny = canToggleAnyList(editor, types);
    const isAnyActive = isAnyListActive(editor, types);
    const activeType = getActiveListType(editor, types);
    const activeList = filteredLists.find((option)=>option.type === activeType);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useListDropdownMenu.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useListDropdownMenu.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowListDropdown({
                        editor,
                        listTypes: types,
                        hideWhenUnavailable,
                        listInSchema,
                        canToggleAny
                    }));
                }
            }["useListDropdownMenu.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useListDropdownMenu.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useListDropdownMenu.useEffect"];
        }
    }["useListDropdownMenu.useEffect"], [
        canToggleAny,
        editor,
        hideWhenUnavailable,
        listInSchema,
        types
    ]);
    return {
        isVisible,
        activeType,
        isActive: isAnyActive,
        canToggle: canToggleAny,
        types,
        filteredLists,
        label: "List",
        Icon: activeList ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$use$2d$list$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listIcons"][activeList.type] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$list$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListIcon"]
    };
}
_s(useListDropdownMenu, "Uz8HrwmTx8c3jZ/5XcEQ65aZqW0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ListDropdownMenu": ()=>ListDropdownMenu,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$chevron$2d$down$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/chevron-down-icon.tsx [app-client] (ecmascript)");
// --- Tiptap UI ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$list$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-button/list-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$use$2d$list$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-dropdown-menu/use-list-dropdown-menu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/dropdown-menu/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function ListDropdownMenu(param) {
    let { editor: providedEditor, types = [
        "bulletList",
        "orderedList",
        "taskList"
    ], hideWhenUnavailable = false, onOpenChange, portal = false, ...props } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const { filteredLists, canToggle, isActive, isVisible, Icon } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$use$2d$list$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useListDropdownMenu"])({
        editor,
        types,
        hideWhenUnavailable
    });
    const handleOnOpenChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ListDropdownMenu.useCallback[handleOnOpenChange]": (open)=>{
            setIsOpen(open);
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(open);
        }
    }["ListDropdownMenu.useCallback[handleOnOpenChange]"], [
        onOpenChange
    ]);
    if (!isVisible || !editor || !editor.isEditable) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        open: isOpen,
        onOpenChange: handleOnOpenChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    type: "button",
                    "data-style": "ghost",
                    "data-active-state": isActive ? "on" : "off",
                    role: "button",
                    tabIndex: -1,
                    disabled: !canToggle,
                    "data-disabled": !canToggle,
                    "aria-label": "List options",
                    tooltip: "List",
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "tiptap-button-icon"
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$chevron$2d$down$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChevronDownIcon"], {
                            className: "tiptap-button-dropdown-small"
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "start",
                portal: portal,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                            children: filteredLists.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$dropdown$2d$menu$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$button$2f$list$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListButton"], {
                                        editor: editor,
                                        type: option.type,
                                        text: option.label,
                                        showTooltip: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                                        lineNumber: 109,
                                        columnNumber: 19
                                    }, this)
                                }, option.type, false, {
                                    fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                                    lineNumber: 108,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(ListDropdownMenu, "FlR+LSdAHzi2xmvMFJtk/kAddww=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$use$2d$list$2d$dropdown$2d$menu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useListDropdownMenu"]
    ];
});
_c = ListDropdownMenu;
const __TURBOPACK__default__export__ = ListDropdownMenu;
var _c;
__turbopack_context__.k.register(_c, "ListDropdownMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/list-dropdown-menu/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$list$2d$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/list-dropdown-menu/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$list$2d$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-dropdown-menu/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/blockquote-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BlockquoteIcon": ()=>BlockquoteIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const BlockquoteIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8 6C8 5.44772 8.44772 5 9 5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H9C8.44772 7 8 6.55228 8 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/blockquote-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M4 3C4.55228 3 5 3.44772 5 4L5 20C5 20.5523 4.55229 21 4 21C3.44772 21 3 20.5523 3 20L3 4C3 3.44772 3.44772 3 4 3Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/blockquote-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8 12C8 11.4477 8.44772 11 9 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H9C8.44772 13 8 12.5523 8 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/blockquote-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8 18C8 17.4477 8.44772 17 9 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H9C8.44772 19 8 18.5523 8 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/blockquote-icon.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/blockquote-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = BlockquoteIcon;
BlockquoteIcon.displayName = "BlockquoteIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "BlockquoteIcon$React.memo");
__turbopack_context__.k.register(_c1, "BlockquoteIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/blockquote-button/use-blockquote.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BLOCKQUOTE_SHORTCUT_KEY": ()=>BLOCKQUOTE_SHORTCUT_KEY,
    "canToggleBlockquote": ()=>canToggleBlockquote,
    "shouldShowButton": ()=>shouldShowButton,
    "toggleBlockquote": ()=>toggleBlockquote,
    "useBlockquote": ()=>useBlockquote
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$state$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+pm@3.3.0/node_modules/@tiptap/pm/dist/state/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$blockquote$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/blockquote-icon.tsx [app-client] (ecmascript)");
// --- UI Utils ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const BLOCKQUOTE_SHORTCUT_KEY = "mod+shift+b";
function canToggleBlockquote(editor) {
    let turnInto = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])("blockquote", editor) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    if (!turnInto) {
        return editor.can().toggleWrap("blockquote");
    }
    try {
        const view = editor.view;
        const state = view.state;
        const selection = state.selection;
        if (selection.empty || selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"]) {
            var _findNodePosition;
            const pos = (_findNodePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNodePosition"])({
                editor,
                node: state.selection.$anchor.node(1)
            })) === null || _findNodePosition === void 0 ? void 0 : _findNodePosition.pos;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}
function toggleBlockquote(editor) {
    if (!editor || !editor.isEditable) return false;
    if (!canToggleBlockquote(editor)) return false;
    try {
        const view = editor.view;
        let state = view.state;
        let tr = state.tr;
        // No selection, find the the cursor position
        if (state.selection.empty || state.selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"]) {
            var _findNodePosition;
            const pos = (_findNodePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNodePosition"])({
                editor,
                node: state.selection.$anchor.node(1)
            })) === null || _findNodePosition === void 0 ? void 0 : _findNodePosition.pos;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) return false;
            tr = tr.setSelection(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"].create(state.doc, pos));
            view.dispatch(tr);
            state = view.state;
        }
        const selection = state.selection;
        let chain = editor.chain().focus();
        // Handle NodeSelection
        if (selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"]) {
            var _selection_node_firstChild, _selection_node_lastChild;
            const firstChild = (_selection_node_firstChild = selection.node.firstChild) === null || _selection_node_firstChild === void 0 ? void 0 : _selection_node_firstChild.firstChild;
            const lastChild = (_selection_node_lastChild = selection.node.lastChild) === null || _selection_node_lastChild === void 0 ? void 0 : _selection_node_lastChild.lastChild;
            const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
            const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;
            chain = chain.setTextSelection({
                from,
                to
            }).clearNodes();
        }
        const toggle = editor.isActive("blockquote") ? chain.lift("blockquote") : chain.wrapIn("blockquote");
        toggle.run();
        editor.chain().focus().selectTextblockEnd().run();
        return true;
    } catch (e) {
        return false;
    }
}
function shouldShowButton(props) {
    const { editor, hideWhenUnavailable } = props;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])("blockquote", editor)) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggleBlockquote(editor);
    }
    return true;
}
function useBlockquote(config) {
    _s();
    const { editor: providedEditor, hideWhenUnavailable = false, onToggled } = config || {};
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canToggle = canToggleBlockquote(editor);
    const isActive = (editor === null || editor === void 0 ? void 0 : editor.isActive("blockquote")) || false;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useBlockquote.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useBlockquote.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        hideWhenUnavailable
                    }));
                }
            }["useBlockquote.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useBlockquote.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useBlockquote.useEffect"];
        }
    }["useBlockquote.useEffect"], [
        editor,
        hideWhenUnavailable
    ]);
    const handleToggle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useBlockquote.useCallback[handleToggle]": ()=>{
            if (!editor) return false;
            const success = toggleBlockquote(editor);
            if (success) {
                onToggled === null || onToggled === void 0 ? void 0 : onToggled();
            }
            return success;
        }
    }["useBlockquote.useCallback[handleToggle]"], [
        editor,
        onToggled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(BLOCKQUOTE_SHORTCUT_KEY, {
        "useBlockquote.useHotkeys": (event)=>{
            event.preventDefault();
            handleToggle();
        }
    }["useBlockquote.useHotkeys"], {
        enabled: isVisible && canToggle,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        isActive,
        handleToggle,
        canToggle,
        label: "Blockquote",
        shortcutKeys: BLOCKQUOTE_SHORTCUT_KEY,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$blockquote$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockquoteIcon"]
    };
}
_s(useBlockquote, "zNanQZuMkxIRlgYUeJ62mY1GmM8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BlockquoteButton": ()=>BlockquoteButton,
    "BlockquoteShortcutBadge": ()=>BlockquoteShortcutBadge
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$use$2d$blockquote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/use-blockquote.ts [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function BlockquoteShortcutBadge(param) {
    let { shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$use$2d$blockquote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKQUOTE_SHORTCUT_KEY"] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, this);
}
_c = BlockquoteShortcutBadge;
const BlockquoteButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, text, hideWhenUnavailable = false, onToggled, showShortcut = false, onClick, children, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, canToggle, isActive, handleToggle, label, shortcutKeys, Icon } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$use$2d$blockquote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlockquote"])({
        editor,
        hideWhenUnavailable,
        onToggled
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "BlockquoteButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleToggle();
        }
    }["BlockquoteButton.useCallback[handleClick]"], [
        handleToggle,
        onClick
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canToggle,
        "data-disabled": !canToggle,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: "Blockquote",
        onClick: handleClick,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "tiptap-button-icon"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx",
                    lineNumber: 113,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx",
                    lineNumber: 114,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlockquoteShortcutBadge, {
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx",
                    lineNumber: 116,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx",
        lineNumber: 96,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "diHJG2fYqKhkAm2UM8e4DIZEKSE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$use$2d$blockquote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlockquote"]
    ];
})), "diHJG2fYqKhkAm2UM8e4DIZEKSE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$use$2d$blockquote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBlockquote"]
    ];
});
_c2 = BlockquoteButton;
BlockquoteButton.displayName = "BlockquoteButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "BlockquoteShortcutBadge");
__turbopack_context__.k.register(_c1, "BlockquoteButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "BlockquoteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/blockquote-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$blockquote$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$use$2d$blockquote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/use-blockquote.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/blockquote-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$blockquote$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$use$2d$blockquote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/use-blockquote.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/code-block-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CodeBlockIcon": ()=>CodeBlockIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const CodeBlockIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M6.70711 2.29289C7.09763 2.68342 7.09763 3.31658 6.70711 3.70711L4.41421 6L6.70711 8.29289C7.09763 8.68342 7.09763 9.31658 6.70711 9.70711C6.31658 10.0976 5.68342 10.0976 5.29289 9.70711L2.29289 6.70711C1.90237 6.31658 1.90237 5.68342 2.29289 5.29289L5.29289 2.29289C5.68342 1.90237 6.31658 1.90237 6.70711 2.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/code-block-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M10.2929 2.29289C10.6834 1.90237 11.3166 1.90237 11.7071 2.29289L14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L11.7071 9.70711C11.3166 10.0976 10.6834 10.0976 10.2929 9.70711C9.90237 9.31658 9.90237 8.68342 10.2929 8.29289L12.5858 6L10.2929 3.70711C9.90237 3.31658 9.90237 2.68342 10.2929 2.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/code-block-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M17 4C17 3.44772 17.4477 3 18 3H19C20.6569 3 22 4.34315 22 6V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V6C20 5.44772 19.5523 5 19 5H18C17.4477 5 17 4.55228 17 4Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/code-block-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/code-block-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = CodeBlockIcon;
CodeBlockIcon.displayName = "CodeBlockIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "CodeBlockIcon$React.memo");
__turbopack_context__.k.register(_c1, "CodeBlockIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/code-block-button/use-code-block.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CODE_BLOCK_SHORTCUT_KEY": ()=>CODE_BLOCK_SHORTCUT_KEY,
    "canToggle": ()=>canToggle,
    "shouldShowButton": ()=>shouldShowButton,
    "toggleCodeBlock": ()=>toggleCodeBlock,
    "useCodeBlock": ()=>useCodeBlock
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$pm$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$state$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+pm@3.3.0/node_modules/@tiptap/pm/dist/state/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prosemirror-state@1.4.3/node_modules/prosemirror-state/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$code$2d$block$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/code-block-icon.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const CODE_BLOCK_SHORTCUT_KEY = "mod+alt+c";
function canToggle(editor) {
    let turnInto = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])("codeBlock", editor) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    if (!turnInto) {
        return editor.can().toggleNode("codeBlock", "paragraph");
    }
    try {
        const view = editor.view;
        const state = view.state;
        const selection = state.selection;
        if (selection.empty || selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"]) {
            var _findNodePosition;
            const pos = (_findNodePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNodePosition"])({
                editor,
                node: state.selection.$anchor.node(1)
            })) === null || _findNodePosition === void 0 ? void 0 : _findNodePosition.pos;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}
function toggleCodeBlock(editor) {
    if (!editor || !editor.isEditable) return false;
    if (!canToggle(editor)) return false;
    try {
        const view = editor.view;
        let state = view.state;
        let tr = state.tr;
        // No selection, find the the cursor position
        if (state.selection.empty || state.selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSelection"]) {
            var _findNodePosition;
            const pos = (_findNodePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNodePosition"])({
                editor,
                node: state.selection.$anchor.node(1)
            })) === null || _findNodePosition === void 0 ? void 0 : _findNodePosition.pos;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidPosition"])(pos)) return false;
            tr = tr.setSelection(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"].create(state.doc, pos));
            view.dispatch(tr);
            state = view.state;
        }
        const selection = state.selection;
        let chain = editor.chain().focus();
        // Handle NodeSelection
        if (selection instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prosemirror$2d$state$40$1$2e$4$2e$3$2f$node_modules$2f$prosemirror$2d$state$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeSelection"]) {
            var _selection_node_firstChild, _selection_node_lastChild;
            const firstChild = (_selection_node_firstChild = selection.node.firstChild) === null || _selection_node_firstChild === void 0 ? void 0 : _selection_node_firstChild.firstChild;
            const lastChild = (_selection_node_lastChild = selection.node.lastChild) === null || _selection_node_lastChild === void 0 ? void 0 : _selection_node_lastChild.lastChild;
            const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
            const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;
            chain = chain.setTextSelection({
                from,
                to
            }).clearNodes();
        }
        const toggle = editor.isActive("codeBlock") ? chain.setNode("paragraph") : chain.toggleNode("codeBlock", "paragraph");
        toggle.run();
        editor.chain().focus().selectTextblockEnd().run();
        return true;
    } catch (e) {
        return false;
    }
}
function shouldShowButton(props) {
    const { editor, hideWhenUnavailable } = props;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeInSchema"])("codeBlock", editor)) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggle(editor);
    }
    return true;
}
function useCodeBlock(config) {
    _s();
    const { editor: providedEditor, hideWhenUnavailable = false, onToggled } = config || {};
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canToggleState = canToggle(editor);
    const isActive = (editor === null || editor === void 0 ? void 0 : editor.isActive("codeBlock")) || false;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useCodeBlock.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useCodeBlock.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        hideWhenUnavailable
                    }));
                }
            }["useCodeBlock.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useCodeBlock.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useCodeBlock.useEffect"];
        }
    }["useCodeBlock.useEffect"], [
        editor,
        hideWhenUnavailable
    ]);
    const handleToggle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useCodeBlock.useCallback[handleToggle]": ()=>{
            if (!editor) return false;
            const success = toggleCodeBlock(editor);
            if (success) {
                onToggled === null || onToggled === void 0 ? void 0 : onToggled();
            }
            return success;
        }
    }["useCodeBlock.useCallback[handleToggle]"], [
        editor,
        onToggled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(CODE_BLOCK_SHORTCUT_KEY, {
        "useCodeBlock.useHotkeys": (event)=>{
            event.preventDefault();
            handleToggle();
        }
    }["useCodeBlock.useHotkeys"], {
        enabled: isVisible && canToggleState,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        isActive,
        handleToggle,
        canToggle: canToggleState,
        label: "Code Block",
        shortcutKeys: CODE_BLOCK_SHORTCUT_KEY,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$code$2d$block$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeBlockIcon"]
    };
}
_s(useCodeBlock, "zNanQZuMkxIRlgYUeJ62mY1GmM8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/code-block-button/code-block-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CodeBlockButton": ()=>CodeBlockButton,
    "CodeBlockShortcutBadge": ()=>CodeBlockShortcutBadge
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$use$2d$code$2d$block$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/use-code-block.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function CodeBlockShortcutBadge(param) {
    let { shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$use$2d$code$2d$block$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_BLOCK_SHORTCUT_KEY"] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/code-block-button/code-block-button.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, this);
}
_c = CodeBlockShortcutBadge;
const CodeBlockButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, text, hideWhenUnavailable = false, onToggled, showShortcut = false, onClick, children, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, canToggle, isActive, handleToggle, label, shortcutKeys, Icon } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$use$2d$code$2d$block$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCodeBlock"])({
        editor,
        hideWhenUnavailable,
        onToggled
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "CodeBlockButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleToggle();
        }
    }["CodeBlockButton.useCallback[handleClick]"], [
        handleToggle,
        onClick
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        disabled: !canToggle,
        "data-disabled": !canToggle,
        tabIndex: -1,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: "Code Block",
        onClick: handleClick,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "tiptap-button-icon"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/code-block-button/code-block-button.tsx",
                    lineNumber: 113,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/code-block-button/code-block-button.tsx",
                    lineNumber: 114,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeBlockShortcutBadge, {
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/code-block-button/code-block-button.tsx",
                    lineNumber: 116,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/code-block-button/code-block-button.tsx",
        lineNumber: 96,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "Oc6/YhJmQgSpxm1xt6KpVx6DDKA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$use$2d$code$2d$block$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCodeBlock"]
    ];
})), "Oc6/YhJmQgSpxm1xt6KpVx6DDKA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$use$2d$code$2d$block$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCodeBlock"]
    ];
});
_c2 = CodeBlockButton;
CodeBlockButton.displayName = "CodeBlockButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "CodeBlockShortcutBadge");
__turbopack_context__.k.register(_c1, "CodeBlockButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "CodeBlockButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/code-block-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$code$2d$block$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/code-block-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$use$2d$code$2d$block$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/use-code-block.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/code-block-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$code$2d$block$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/code-block-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$use$2d$code$2d$block$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/use-code-block.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/ban-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BanIcon": ()=>BanIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const BanIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.43471 4.01458C4.34773 4.06032 4.26607 4.11977 4.19292 4.19292C4.11977 4.26607 4.06032 4.34773 4.01458 4.43471C2.14611 6.40628 1 9.0693 1 12C1 18.0751 5.92487 23 12 23C14.9306 23 17.5936 21.854 19.5651 19.9856C19.6522 19.9398 19.7339 19.8803 19.8071 19.8071C19.8803 19.7339 19.9398 19.6522 19.9856 19.5651C21.854 17.5936 23 14.9306 23 12C23 5.92487 18.0751 1 12 1C9.0693 1 6.40628 2.14611 4.43471 4.01458ZM6.38231 4.9681C7.92199 3.73647 9.87499 3 12 3C16.9706 3 21 7.02944 21 12C21 14.125 20.2635 16.078 19.0319 17.6177L6.38231 4.9681ZM17.6177 19.0319C16.078 20.2635 14.125 21 12 21C7.02944 21 3 16.9706 3 12C3 9.87499 3.73647 7.92199 4.9681 6.38231L17.6177 19.0319Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/ban-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/ban-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = BanIcon;
BanIcon.displayName = "BanIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "BanIcon$React.memo");
__turbopack_context__.k.register(_c1, "BanIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/highlighter-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HighlighterIcon": ()=>HighlighterIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const HighlighterIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M14.7072 4.70711C15.0977 4.31658 15.0977 3.68342 14.7072 3.29289C14.3167 2.90237 13.6835 2.90237 13.293 3.29289L8.69294 7.89286L8.68594 7.9C8.13626 8.46079 7.82837 9.21474 7.82837 10C7.82837 10.2306 7.85491 10.4584 7.90631 10.6795L2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17V20C2 20.5523 2.44772 21 3 21H12C12.2652 21 12.5196 20.8946 12.7071 20.7071L15.3205 18.0937C15.5416 18.1452 15.7695 18.1717 16.0001 18.1717C16.7853 18.1717 17.5393 17.8639 18.1001 17.3142L22.7072 12.7071C23.0977 12.3166 23.0977 11.6834 22.7072 11.2929C22.3167 10.9024 21.6835 10.9024 21.293 11.2929L16.6971 15.8887C16.5105 16.0702 16.2605 16.1717 16.0001 16.1717C15.7397 16.1717 15.4897 16.0702 15.303 15.8887L10.1113 10.697C9.92992 10.5104 9.82837 10.2604 9.82837 10C9.82837 9.73963 9.92992 9.48958 10.1113 9.30297L14.7072 4.70711ZM13.5858 17L9.00004 12.4142L4 17.4142V19H11.5858L13.5858 17Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/highlighter-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/highlighter-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = HighlighterIcon;
HighlighterIcon.displayName = "HighlighterIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "HighlighterIcon$React.memo");
__turbopack_context__.k.register(_c1, "HighlighterIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/popover/popover.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Popover": ()=>Popover,
    "PopoverContent": ()=>PopoverContent,
    "PopoverTrigger": ()=>PopoverTrigger
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$popover$40$1$2e$1_d9f326a23716d2e541d52f8eb0155669$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@radix-ui+react-popover@1.1_d9f326a23716d2e541d52f8eb0155669/node_modules/@radix-ui/react-popover/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Popover(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$popover$40$1$2e$1_d9f326a23716d2e541d52f8eb0155669$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/popover/popover.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
_c = Popover;
function PopoverTrigger(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$popover$40$1$2e$1_d9f326a23716d2e541d52f8eb0155669$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/popover/popover.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, this);
}
_c1 = PopoverTrigger;
function PopoverContent(param) {
    let { className, align = "center", sideOffset = 4, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$popover$40$1$2e$1_d9f326a23716d2e541d52f8eb0155669$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$popover$40$1$2e$1_d9f326a23716d2e541d52f8eb0155669$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            align: align,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-popover", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui-primitive/popover/popover.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/popover/popover.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c2 = PopoverContent;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Popover");
__turbopack_context__.k.register(_c1, "PopoverTrigger");
__turbopack_context__.k.register(_c2, "PopoverContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/popover/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/popover/popover.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/popover/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/popover/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/popover/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui/color-highlight-button/use-color-highlight.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "COLOR_HIGHLIGHT_SHORTCUT_KEY": ()=>COLOR_HIGHLIGHT_SHORTCUT_KEY,
    "HIGHLIGHT_COLORS": ()=>HIGHLIGHT_COLORS,
    "canColorHighlight": ()=>canColorHighlight,
    "isColorHighlightActive": ()=>isColorHighlightActive,
    "pickHighlightColorsByValue": ()=>pickHighlightColorsByValue,
    "removeHighlight": ()=>removeHighlight,
    "shouldShowButton": ()=>shouldShowButton,
    "useColorHighlight": ()=>useColorHighlight
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$highlighter$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/highlighter-icon.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const COLOR_HIGHLIGHT_SHORTCUT_KEY = "mod+shift+h";
const HIGHLIGHT_COLORS = [
    {
        label: "Default background",
        value: "var(--tt-bg-color)",
        border: "var(--tt-bg-color-contrast)"
    },
    {
        label: "Gray background",
        value: "var(--tt-color-highlight-gray)",
        border: "var(--tt-color-highlight-gray-contrast)"
    },
    {
        label: "Brown background",
        value: "var(--tt-color-highlight-brown)",
        border: "var(--tt-color-highlight-brown-contrast)"
    },
    {
        label: "Orange background",
        value: "var(--tt-color-highlight-orange)",
        border: "var(--tt-color-highlight-orange-contrast)"
    },
    {
        label: "Yellow background",
        value: "var(--tt-color-highlight-yellow)",
        border: "var(--tt-color-highlight-yellow-contrast)"
    },
    {
        label: "Green background",
        value: "var(--tt-color-highlight-green)",
        border: "var(--tt-color-highlight-green-contrast)"
    },
    {
        label: "Blue background",
        value: "var(--tt-color-highlight-blue)",
        border: "var(--tt-color-highlight-blue-contrast)"
    },
    {
        label: "Purple background",
        value: "var(--tt-color-highlight-purple)",
        border: "var(--tt-color-highlight-purple-contrast)"
    },
    {
        label: "Pink background",
        value: "var(--tt-color-highlight-pink)",
        border: "var(--tt-color-highlight-pink-contrast)"
    },
    {
        label: "Red background",
        value: "var(--tt-color-highlight-red)",
        border: "var(--tt-color-highlight-red-contrast)"
    }
];
function pickHighlightColorsByValue(values) {
    const colorMap = new Map(HIGHLIGHT_COLORS.map((color)=>[
            color.value,
            color
        ]));
    return values.map((value)=>colorMap.get(value)).filter((color)=>!!color);
}
function canColorHighlight(editor) {
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMarkInSchema"])("highlight", editor) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    return editor.can().setMark("highlight");
}
function isColorHighlightActive(editor, highlightColor) {
    if (!editor || !editor.isEditable) return false;
    return highlightColor ? editor.isActive("highlight", {
        color: highlightColor
    }) : editor.isActive("highlight");
}
function removeHighlight(editor) {
    if (!editor || !editor.isEditable) return false;
    if (!canColorHighlight(editor)) return false;
    return editor.chain().focus().unsetMark("highlight").run();
}
function shouldShowButton(props) {
    const { editor, hideWhenUnavailable } = props;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMarkInSchema"])("highlight", editor)) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canColorHighlight(editor);
    }
    return true;
}
function useColorHighlight(config) {
    _s();
    const { editor: providedEditor, label, highlightColor, hideWhenUnavailable = false, onApplied } = config;
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canColorHighlightState = canColorHighlight(editor);
    const isActive = isColorHighlightActive(editor, highlightColor);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useColorHighlight.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useColorHighlight.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        hideWhenUnavailable
                    }));
                }
            }["useColorHighlight.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useColorHighlight.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useColorHighlight.useEffect"];
        }
    }["useColorHighlight.useEffect"], [
        editor,
        hideWhenUnavailable
    ]);
    const handleColorHighlight = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useColorHighlight.useCallback[handleColorHighlight]": ()=>{
            if (!editor || !canColorHighlightState || !highlightColor || !label) return false;
            if (editor.state.storedMarks) {
                const highlightMarkType = editor.schema.marks.highlight;
                if (highlightMarkType) {
                    editor.view.dispatch(editor.state.tr.removeStoredMark(highlightMarkType));
                }
            }
            setTimeout({
                "useColorHighlight.useCallback[handleColorHighlight]": ()=>{
                    const success = editor.chain().focus().toggleMark("highlight", {
                        color: highlightColor
                    }).run();
                    if (success) {
                        onApplied === null || onApplied === void 0 ? void 0 : onApplied({
                            color: highlightColor,
                            label
                        });
                    }
                    return success;
                }
            }["useColorHighlight.useCallback[handleColorHighlight]"], 0);
        }
    }["useColorHighlight.useCallback[handleColorHighlight]"], [
        canColorHighlightState,
        highlightColor,
        editor,
        label,
        onApplied
    ]);
    const handleRemoveHighlight = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useColorHighlight.useCallback[handleRemoveHighlight]": ()=>{
            const success = removeHighlight(editor);
            if (success) {
                onApplied === null || onApplied === void 0 ? void 0 : onApplied({
                    color: "",
                    label: "Remove highlight"
                });
            }
            return success;
        }
    }["useColorHighlight.useCallback[handleRemoveHighlight]"], [
        editor,
        onApplied
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(COLOR_HIGHLIGHT_SHORTCUT_KEY, {
        "useColorHighlight.useHotkeys": (event)=>{
            event.preventDefault();
            handleColorHighlight();
        }
    }["useColorHighlight.useHotkeys"], {
        enabled: isVisible && canColorHighlightState,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        isActive,
        handleColorHighlight,
        handleRemoveHighlight,
        canColorHighlight: canColorHighlightState,
        label: label || "Highlight",
        shortcutKeys: COLOR_HIGHLIGHT_SHORTCUT_KEY,
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$highlighter$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HighlighterIcon"]
    };
}
_s(useColorHighlight, "W59dITIdZ1e9ckt+2f1stbg0fC0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ColorHighlightButton": ()=>ColorHighlightButton,
    "ColorHighlightShortcutBadge": ()=>ColorHighlightShortcutBadge
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/use-color-highlight.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ColorHighlightShortcutBadge(param) {
    let { shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_HIGHLIGHT_SHORTCUT_KEY"] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx",
        lineNumber: 45,
        columnNumber: 10
    }, this);
}
_c = ColorHighlightShortcutBadge;
const ColorHighlightButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, highlightColor, text, hideWhenUnavailable = false, onApplied, showShortcut = false, onClick, children, style, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, canColorHighlight, isActive, handleColorHighlight, label, shortcutKeys } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useColorHighlight"])({
        editor,
        highlightColor,
        label: text || "Toggle highlight (".concat(highlightColor, ")"),
        hideWhenUnavailable,
        onApplied
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ColorHighlightButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleColorHighlight();
        }
    }["ColorHighlightButton.useCallback[handleClick]"], [
        handleColorHighlight,
        onClick
    ]);
    const buttonStyle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ColorHighlightButton.useMemo[buttonStyle]": ()=>({
                ...style,
                "--highlight-color": highlightColor
            })
    }["ColorHighlightButton.useMemo[buttonStyle]"], [
        highlightColor,
        style
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        role: "button",
        tabIndex: -1,
        disabled: !canColorHighlight,
        "data-disabled": !canColorHighlight,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        style: buttonStyle,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-highlight",
                    style: {
                        "--highlight-color": highlightColor
                    }
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx",
                    lineNumber: 129,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx",
                    lineNumber: 135,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ColorHighlightShortcutBadge, {
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx",
                    lineNumber: 137,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx",
        lineNumber: 111,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "n41D8Yx0esxez/HiAyFWyiHP0qE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useColorHighlight"]
    ];
})), "n41D8Yx0esxez/HiAyFWyiHP0qE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useColorHighlight"]
    ];
});
_c2 = ColorHighlightButton;
ColorHighlightButton.displayName = "ColorHighlightButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ColorHighlightShortcutBadge");
__turbopack_context__.k.register(_c1, "ColorHighlightButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "ColorHighlightButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/color-highlight-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$color$2d$highlight$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/use-color-highlight.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/color-highlight-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$color$2d$highlight$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/use-color-highlight.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ColorHighlightPopover": ()=>ColorHighlightPopover,
    "ColorHighlightPopoverButton": ()=>ColorHighlightPopoverButton,
    "ColorHighlightPopoverContent": ()=>ColorHighlightPopoverContent,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$menu$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-menu-navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$ban$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/ban-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$highlighter$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/highlighter-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/popover/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/popover/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$color$2d$highlight$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-button/use-color-highlight.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
const ColorHighlightPopoverButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        className: className,
        "data-style": "ghost",
        "data-appearance": "default",
        role: "button",
        tabIndex: -1,
        "aria-label": "Highlight text",
        tooltip: "Highlight",
        ref: ref,
        ...props,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$highlighter$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HighlighterIcon"], {
            className: "tiptap-button-icon"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
            lineNumber: 82,
            columnNumber: 18
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
        lineNumber: 70,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c = ColorHighlightPopoverButton;
ColorHighlightPopoverButton.displayName = "ColorHighlightPopoverButton";
function ColorHighlightPopoverContent(param) {
    let { editor, colors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickHighlightColorsByValue"])([
        "var(--tt-color-highlight-green)",
        "var(--tt-color-highlight-blue)",
        "var(--tt-color-highlight-red)",
        "var(--tt-color-highlight-purple)",
        "var(--tt-color-highlight-yellow)"
    ]) } = param;
    _s();
    const { handleRemoveHighlight } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useColorHighlight"])({
        editor
    });
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const containerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const menuItems = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ColorHighlightPopoverContent.useMemo[menuItems]": ()=>[
                ...colors,
                {
                    label: "Remove highlight",
                    value: "none"
                }
            ]
    }["ColorHighlightPopoverContent.useMemo[menuItems]"], [
        colors
    ]);
    const { selectedIndex } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$menu$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuNavigation"])({
        containerRef,
        items: menuItems,
        orientation: "both",
        onSelect: {
            "ColorHighlightPopoverContent.useMenuNavigation": (item)=>{
                if (!containerRef.current) return false;
                const highlightedElement = containerRef.current.querySelector('[data-highlighted="true"]');
                if (highlightedElement) highlightedElement.click();
                if (item.value === "none") handleRemoveHighlight();
            }
        }["ColorHighlightPopoverContent.useMenuNavigation"],
        autoSelectFirstItem: false
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        ref: containerRef,
        tabIndex: 0,
        style: isMobile ? {
            boxShadow: "none",
            border: 0
        } : {},
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
            style: isMobile ? {
                padding: 0
            } : {},
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardItemGroup"], {
                orientation: "horizontal",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                        orientation: "horizontal",
                        children: colors.map((color, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$color$2d$highlight$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorHighlightButton"], {
                                editor: editor,
                                highlightColor: color.value,
                                tooltip: color.label,
                                "aria-label": "".concat(color.label, " highlight color"),
                                tabIndex: index === selectedIndex ? 0 : -1,
                                "data-highlighted": selectedIndex === index
                            }, color.value, false, {
                                fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                        orientation: "horizontal",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleRemoveHighlight,
                            "aria-label": "Remove highlight",
                            tooltip: "Remove highlight",
                            tabIndex: selectedIndex === colors.length ? 0 : -1,
                            type: "button",
                            role: "menuitem",
                            "data-style": "ghost",
                            "data-highlighted": selectedIndex === colors.length,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$ban$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BanIcon"], {
                                className: "tiptap-button-icon"
                            }, void 0, false, {
                                fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_s(ColorHighlightPopoverContent, "lLh0dfKh0pLoXd2L7j/UPQ1RD28=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useColorHighlight"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$menu$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuNavigation"]
    ];
});
_c1 = ColorHighlightPopoverContent;
function ColorHighlightPopover(param) {
    let { editor: providedEditor, colors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickHighlightColorsByValue"])([
        "var(--tt-color-highlight-green)",
        "var(--tt-color-highlight-blue)",
        "var(--tt-color-highlight-red)",
        "var(--tt-color-highlight-purple)",
        "var(--tt-color-highlight-yellow)"
    ]), hideWhenUnavailable = false, onApplied, ...props } = param;
    _s1();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const { isVisible, canColorHighlight, isActive, label, Icon } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useColorHighlight"])({
        editor,
        hideWhenUnavailable,
        onApplied
    });
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
        open: isOpen,
        onOpenChange: setIsOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ColorHighlightPopoverButton, {
                    disabled: !canColorHighlight,
                    "data-active-state": isActive ? "on" : "off",
                    "data-disabled": !canColorHighlight,
                    "aria-pressed": isActive,
                    "aria-label": label,
                    tooltip: label,
                    ...props,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "tiptap-button-icon"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                "aria-label": "Highlight colors",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ColorHighlightPopoverContent, {
                    editor: editor,
                    colors: colors
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
_s1(ColorHighlightPopover, "IauIUL331PH2bNH2a3D92hBNrU0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$button$2f$use$2d$color$2d$highlight$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useColorHighlight"]
    ];
});
_c2 = ColorHighlightPopover;
const __TURBOPACK__default__export__ = ColorHighlightPopover;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ColorHighlightPopoverButton");
__turbopack_context__.k.register(_c1, "ColorHighlightPopoverContent");
__turbopack_context__.k.register(_c2, "ColorHighlightPopover");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/color-highlight-popover/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$popover$2f$color$2d$highlight$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/color-highlight-popover/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$popover$2f$color$2d$highlight$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$popover$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-popover/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/corner-down-left-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CornerDownLeftIcon": ()=>CornerDownLeftIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const CornerDownLeftIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M21 4C21 3.44772 20.5523 3 20 3C19.4477 3 19 3.44772 19 4V11C19 11.7956 18.6839 12.5587 18.1213 13.1213C17.5587 13.6839 16.7956 14 16 14H6.41421L9.70711 10.7071C10.0976 10.3166 10.0976 9.68342 9.70711 9.29289C9.31658 8.90237 8.68342 8.90237 8.29289 9.29289L3.29289 14.2929C2.90237 14.6834 2.90237 15.3166 3.29289 15.7071L8.29289 20.7071C8.68342 21.0976 9.31658 21.0976 9.70711 20.7071C10.0976 20.3166 10.0976 19.6834 9.70711 19.2929L6.41421 16H16C17.3261 16 18.5979 15.4732 19.5355 14.5355C20.4732 13.5979 21 12.3261 21 11V4Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/corner-down-left-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/corner-down-left-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = CornerDownLeftIcon;
CornerDownLeftIcon.displayName = "CornerDownLeftIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "CornerDownLeftIcon$React.memo");
__turbopack_context__.k.register(_c1, "CornerDownLeftIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/external-link-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ExternalLinkIcon": ()=>ExternalLinkIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ExternalLinkIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 3C14 2.44772 14.4477 2 15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55228 20 9V5.41421L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L18.5858 4H15C14.4477 4 14 3.55228 14 3Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/external-link-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H16C16.7957 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7957 19 19V13C19 12.4477 18.5523 12 18 12C17.4477 12 17 12.4477 17 13V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V8C4 7.73478 4.10536 7.48043 4.29289 7.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/external-link-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/external-link-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ExternalLinkIcon;
ExternalLinkIcon.displayName = "ExternalLinkIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "ExternalLinkIcon$React.memo");
__turbopack_context__.k.register(_c1, "ExternalLinkIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/link-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LinkIcon": ()=>LinkIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const LinkIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16.9958 1.06669C15.4226 1.05302 13.907 1.65779 12.7753 2.75074L12.765 2.76086L11.045 4.47086C10.6534 4.86024 10.6515 5.49341 11.0409 5.88507C11.4303 6.27673 12.0634 6.27858 12.4551 5.88919L14.1697 4.18456C14.9236 3.45893 15.9319 3.05752 16.9784 3.06662C18.0272 3.07573 19.0304 3.49641 19.772 4.23804C20.5137 4.97967 20.9344 5.98292 20.9435 7.03171C20.9526 8.07776 20.5515 9.08563 19.8265 9.83941L16.833 12.8329C16.4274 13.2386 15.9393 13.5524 15.4019 13.7529C14.8645 13.9533 14.2903 14.0359 13.7181 13.9949C13.146 13.9539 12.5894 13.7904 12.0861 13.5154C11.5827 13.2404 11.1444 12.8604 10.8008 12.401C10.47 11.9588 9.84333 11.8685 9.40108 12.1993C8.95883 12.5301 8.86849 13.1568 9.1993 13.599C9.71464 14.288 10.3721 14.858 11.1272 15.2705C11.8822 15.683 12.7171 15.9283 13.5753 15.9898C14.4334 16.0513 15.2948 15.9274 16.1009 15.6267C16.907 15.326 17.639 14.8555 18.2473 14.247L21.2472 11.2471L21.2593 11.2347C22.3523 10.1031 22.9571 8.58751 22.9434 7.01433C22.9297 5.44115 22.2987 3.93628 21.1863 2.82383C20.0738 1.71138 18.5689 1.08036 16.9958 1.06669Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/link-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.4247 8.0102C9.56657 7.94874 8.70522 8.07256 7.89911 8.37326C7.09305 8.67395 6.36096 9.14458 5.75272 9.753L2.75285 12.7529L2.74067 12.7653C1.64772 13.8969 1.04295 15.4125 1.05662 16.9857C1.07029 18.5589 1.70131 20.0637 2.81376 21.1762C3.9262 22.2886 5.43108 22.9196 7.00426 22.9333C8.57744 22.947 10.0931 22.3422 11.2247 21.2493L11.2371 21.2371L12.9471 19.5271C13.3376 19.1366 13.3376 18.5034 12.9471 18.1129C12.5565 17.7223 11.9234 17.7223 11.5328 18.1129L9.82932 19.8164C9.07555 20.5414 8.06768 20.9425 7.02164 20.9334C5.97285 20.9243 4.9696 20.5036 4.22797 19.762C3.48634 19.0203 3.06566 18.0171 3.05655 16.9683C3.04746 15.9222 3.44851 14.9144 4.17355 14.1606L7.16719 11.167C7.5727 10.7613 8.06071 10.4476 8.59811 10.2471C9.13552 10.0467 9.70976 9.96412 10.2819 10.0051C10.854 10.0461 11.4106 10.2096 11.9139 10.4846C12.4173 10.7596 12.8556 11.1397 13.1992 11.599C13.53 12.0412 14.1567 12.1316 14.5989 11.8007C15.0412 11.4699 15.1315 10.8433 14.8007 10.401C14.2854 9.71205 13.6279 9.14198 12.8729 8.72948C12.1178 8.31697 11.2829 8.07166 10.4247 8.0102Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/link-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/link-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = LinkIcon;
LinkIcon.displayName = "LinkIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "LinkIcon$React.memo");
__turbopack_context__.k.register(_c1, "LinkIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/trash-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TrashIcon": ()=>TrashIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const TrashIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7 5V4C7 3.17477 7.40255 2.43324 7.91789 1.91789C8.43324 1.40255 9.17477 1 10 1H14C14.8252 1 15.5668 1.40255 16.0821 1.91789C16.5975 2.43324 17 3.17477 17 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H20V20C20 20.8252 19.5975 21.5668 19.0821 22.0821C18.5668 22.5975 17.8252 23 17 23H7C6.17477 23 5.43324 22.5975 4.91789 22.0821C4.40255 21.5668 4 20.8252 4 20V7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H7ZM9 4C9 3.82523 9.09745 3.56676 9.33211 3.33211C9.56676 3.09745 9.82523 3 10 3H14C14.1748 3 14.4332 3.09745 14.6679 3.33211C14.9025 3.56676 15 3.82523 15 4V5H9V4ZM6 7V20C6 20.1748 6.09745 20.4332 6.33211 20.6679C6.56676 20.9025 6.82523 21 7 21H17C17.1748 21 17.4332 20.9025 17.6679 20.6679C17.9025 20.4332 18 20.1748 18 20V7H6Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/trash-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/trash-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = TrashIcon;
TrashIcon.displayName = "TrashIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "TrashIcon$React.memo");
__turbopack_context__.k.register(_c1, "TrashIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/link-popover/use-link-popover.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "canSetLink": ()=>canSetLink,
    "isLinkActive": ()=>isLinkActive,
    "shouldShowLinkButton": ()=>shouldShowLinkButton,
    "useLinkHandler": ()=>useLinkHandler,
    "useLinkPopover": ()=>useLinkPopover,
    "useLinkState": ()=>useLinkState
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$link$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/link-icon.tsx [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function canSetLink(editor) {
    if (!editor || !editor.isEditable) return false;
    return editor.can().setMark("link");
}
function isLinkActive(editor) {
    if (!editor || !editor.isEditable) return false;
    return editor.isActive("link");
}
function shouldShowLinkButton(props) {
    const { editor, hideWhenUnavailable } = props;
    const linkInSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMarkInSchema"])("link", editor);
    if (!linkInSchema || !editor) {
        return false;
    }
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canSetLink(editor);
    }
    return true;
}
function useLinkHandler(props) {
    _s();
    const { editor, onSetLink } = props;
    const [url, setUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useLinkHandler.useEffect": ()=>{
            if (!editor) return;
            // Get URL immediately on mount
            const { href } = editor.getAttributes("link");
            if (isLinkActive(editor) && url === null) {
                setUrl(href || "");
            }
        }
    }["useLinkHandler.useEffect"], [
        editor,
        url
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useLinkHandler.useEffect": ()=>{
            if (!editor) return;
            const updateLinkState = {
                "useLinkHandler.useEffect.updateLinkState": ()=>{
                    const { href } = editor.getAttributes("link");
                    setUrl(href || "");
                }
            }["useLinkHandler.useEffect.updateLinkState"];
            editor.on("selectionUpdate", updateLinkState);
            return ({
                "useLinkHandler.useEffect": ()=>{
                    editor.off("selectionUpdate", updateLinkState);
                }
            })["useLinkHandler.useEffect"];
        }
    }["useLinkHandler.useEffect"], [
        editor
    ]);
    const setLink = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useLinkHandler.useCallback[setLink]": ()=>{
            if (!url || !editor) return;
            const { selection } = editor.state;
            const isEmpty = selection.empty;
            let chain = editor.chain().focus();
            chain = chain.extendMarkRange("link").setLink({
                href: url
            });
            if (isEmpty) {
                chain = chain.insertContent({
                    type: "text",
                    text: url
                });
            }
            chain.run();
            setUrl(null);
            onSetLink === null || onSetLink === void 0 ? void 0 : onSetLink();
        }
    }["useLinkHandler.useCallback[setLink]"], [
        editor,
        onSetLink,
        url
    ]);
    const removeLink = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useLinkHandler.useCallback[removeLink]": ()=>{
            if (!editor) return;
            editor.chain().focus().extendMarkRange("link").unsetLink().setMeta("preventAutolink", true).run();
            setUrl("");
        }
    }["useLinkHandler.useCallback[removeLink]"], [
        editor
    ]);
    const openLink = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useLinkHandler.useCallback[openLink]": function() {
            let target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "_blank", features = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "noopener,noreferrer";
            if (!url) return;
            const safeUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizeUrl"])(url, window.location.href);
            if (safeUrl !== "#") {
                window.open(safeUrl, target, features);
            }
        }
    }["useLinkHandler.useCallback[openLink]"], [
        url
    ]);
    return {
        url: url || "",
        setUrl,
        setLink,
        removeLink,
        openLink
    };
}
_s(useLinkHandler, "6Zh2ESZOtqN6ek//gMFJuu3MxlQ=");
function useLinkState(props) {
    _s1();
    const { editor, hideWhenUnavailable = false } = props;
    const canSet = canSetLink(editor);
    const isActive = isLinkActive(editor);
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useLinkState.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useLinkState.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowLinkButton({
                        editor,
                        hideWhenUnavailable
                    }));
                }
            }["useLinkState.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useLinkState.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useLinkState.useEffect"];
        }
    }["useLinkState.useEffect"], [
        editor,
        hideWhenUnavailable
    ]);
    return {
        isVisible,
        canSet,
        isActive
    };
}
_s1(useLinkState, "J3yJOyGdBT4L7hs1p1XQYVGMdrY=");
function useLinkPopover(config) {
    _s2();
    const { editor: providedEditor, hideWhenUnavailable = false, onSetLink } = config || {};
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, canSet, isActive } = useLinkState({
        editor,
        hideWhenUnavailable
    });
    const linkHandler = useLinkHandler({
        editor,
        onSetLink
    });
    return {
        isVisible,
        canSet,
        isActive,
        label: "Link",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$link$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkIcon"],
        ...linkHandler
    };
}
_s2(useLinkPopover, "OK1Kv5/4G/YmQxeqzJ4DHVkt8/s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        useLinkState,
        useLinkHandler
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/input/input.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Input": ()=>Input,
    "InputGroup": ()=>InputGroup
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Input(param) {
    let { className, type, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-input", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/input/input.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Input;
function InputGroup(param) {
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("tiptap-input-group", className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui-primitive/input/input.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c1 = InputGroup;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input");
__turbopack_context__.k.register(_c1, "InputGroup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/input/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$input$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/input/input.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui-primitive/input/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$input$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/input/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$input$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/input/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-ui/link-popover/link-popover.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LinkButton": ()=>LinkButton,
    "LinkContent": ()=>LinkContent,
    "LinkPopover": ()=>LinkPopover,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$corner$2d$down$2d$left$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/corner-down-left-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$external$2d$link$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/external-link-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$link$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/link-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$trash$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/trash-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$use$2d$link$2d$popover$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/use-link-popover.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/popover/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/popover/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/separator/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/card/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$input$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/input/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$input$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/input/input.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
const LinkButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        className: className,
        "data-style": "ghost",
        role: "button",
        tabIndex: -1,
        "aria-label": "Link",
        tooltip: "Link",
        ref: ref,
        ...props,
        children: children || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$link$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkIcon"], {
            className: "tiptap-button-icon"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
            lineNumber: 94,
            columnNumber: 22
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
        lineNumber: 83,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c = LinkButton;
LinkButton.displayName = "LinkButton";
/**
 * Main content component for the link popover
 */ const LinkMain = (param)=>{
    let { url, setUrl, setLink, removeLink, openLink, isActive } = param;
    _s();
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const handleKeyDown = (event)=>{
        if (event.key === "Enter") {
            event.preventDefault();
            setLink();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        style: {
            ...isMobile ? {
                boxShadow: "none",
                border: 0
            } : {}
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
            style: {
                ...isMobile ? {
                    padding: 0
                } : {}
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$card$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardItemGroup"], {
                orientation: "horizontal",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$input$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputGroup"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$input$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            type: "url",
                            placeholder: "Paste a link...",
                            value: url,
                            onChange: (e)=>setUrl(e.target.value),
                            onKeyDown: handleKeyDown,
                            autoFocus: true,
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "off"
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                        orientation: "horizontal",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            onClick: setLink,
                            title: "Apply link",
                            disabled: !url && !isActive,
                            "data-style": "ghost",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$corner$2d$down$2d$left$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CornerDownLeftIcon"], {
                                className: "tiptap-button-icon"
                            }, void 0, false, {
                                fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$separator$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                        orientation: "horizontal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: openLink,
                                title: "Open in new window",
                                disabled: !url && !isActive,
                                "data-style": "ghost",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$external$2d$link$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExternalLinkIcon"], {
                                    className: "tiptap-button-icon"
                                }, void 0, false, {
                                    fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: removeLink,
                                title: "Remove link",
                                disabled: !url && !isActive,
                                "data-style": "ghost",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$trash$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrashIcon"], {
                                    className: "tiptap-button-icon"
                                }, void 0, false, {
                                    fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LinkMain, "zdJ8C3X+YlDYVai5EPOd8CzoqSU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"]
    ];
});
_c1 = LinkMain;
const LinkContent = (param)=>{
    let { editor } = param;
    _s1();
    const linkPopover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$use$2d$link$2d$popover$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLinkPopover"])({
        editor
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkMain, {
        ...linkPopover
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
        lineNumber: 199,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(LinkContent, "8x1oYBISrVaOnrivaD6t8Nve6oo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$use$2d$link$2d$popover$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLinkPopover"]
    ];
});
_c2 = LinkContent;
const LinkPopover = /*#__PURE__*/ _s2(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c3 = _s2((param, ref)=>{
    let { editor: providedEditor, hideWhenUnavailable = false, onSetLink, onOpenChange, autoOpenOnLinkActive = true, onClick, children, ...buttonProps } = param;
    _s2();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const { isVisible, canSet, isActive, url, setUrl, setLink, removeLink, openLink, label, Icon } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$use$2d$link$2d$popover$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLinkPopover"])({
        editor,
        hideWhenUnavailable,
        onSetLink
    });
    const handleOnOpenChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "LinkPopover.useCallback[handleOnOpenChange]": (nextIsOpen)=>{
            setIsOpen(nextIsOpen);
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextIsOpen);
        }
    }["LinkPopover.useCallback[handleOnOpenChange]"], [
        onOpenChange
    ]);
    const handleSetLink = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "LinkPopover.useCallback[handleSetLink]": ()=>{
            setLink();
            setIsOpen(false);
        }
    }["LinkPopover.useCallback[handleSetLink]"], [
        setLink
    ]);
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "LinkPopover.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            setIsOpen(!isOpen);
        }
    }["LinkPopover.useCallback[handleClick]"], [
        onClick,
        isOpen
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "LinkPopover.useEffect": ()=>{
            if (autoOpenOnLinkActive && isActive) {
                setIsOpen(true);
            }
        }
    }["LinkPopover.useEffect"], [
        autoOpenOnLinkActive,
        isActive
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
        open: isOpen,
        onOpenChange: handleOnOpenChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkButton, {
                    disabled: !canSet,
                    "data-active-state": isActive ? "on" : "off",
                    "data-disabled": !canSet,
                    "aria-label": label,
                    "aria-pressed": isActive,
                    onClick: handleClick,
                    ...buttonProps,
                    ref: ref,
                    children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "tiptap-button-icon"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                        lineNumber: 289,
                        columnNumber: 26
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                    lineNumber: 279,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                lineNumber: 278,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$popover$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkMain, {
                    url: url,
                    setUrl: setUrl,
                    setLink: handleSetLink,
                    removeLink: removeLink,
                    openLink: openLink,
                    isActive: isActive
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                    lineNumber: 294,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
                lineNumber: 293,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-ui/link-popover/link-popover.tsx",
        lineNumber: 277,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "ubjIqq2JjTiI6m+mXSQEjl6wAFY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$use$2d$link$2d$popover$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLinkPopover"]
    ];
})), "ubjIqq2JjTiI6m+mXSQEjl6wAFY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$use$2d$link$2d$popover$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLinkPopover"]
    ];
});
_c4 = LinkPopover;
LinkPopover.displayName = "LinkPopover";
const __TURBOPACK__default__export__ = LinkPopover;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "LinkButton");
__turbopack_context__.k.register(_c1, "LinkMain");
__turbopack_context__.k.register(_c2, "LinkContent");
__turbopack_context__.k.register(_c3, "LinkPopover$React.forwardRef");
__turbopack_context__.k.register(_c4, "LinkPopover");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/link-popover/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$link$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/link-popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$use$2d$link$2d$popover$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/use-link-popover.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/link-popover/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$link$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/link-popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$use$2d$link$2d$popover$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/use-link-popover.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/bold-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BoldIcon": ()=>BoldIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const BoldIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M6 2.5C5.17157 2.5 4.5 3.17157 4.5 4V20C4.5 20.8284 5.17157 21.5 6 21.5H15C16.4587 21.5 17.8576 20.9205 18.8891 19.8891C19.9205 18.8576 20.5 17.4587 20.5 16C20.5 14.5413 19.9205 13.1424 18.8891 12.1109C18.6781 11.9 18.4518 11.7079 18.2128 11.5359C19.041 10.5492 19.5 9.29829 19.5 8C19.5 6.54131 18.9205 5.14236 17.8891 4.11091C16.8576 3.07946 15.4587 2.5 14 2.5H6ZM14 10.5C14.663 10.5 15.2989 10.2366 15.7678 9.76777C16.2366 9.29893 16.5 8.66304 16.5 8C16.5 7.33696 16.2366 6.70107 15.7678 6.23223C15.2989 5.76339 14.663 5.5 14 5.5H7.5V10.5H14ZM7.5 18.5V13.5H15C15.663 13.5 16.2989 13.7634 16.7678 14.2322C17.2366 14.7011 17.5 15.337 17.5 16C17.5 16.663 17.2366 17.2989 16.7678 17.7678C16.2989 18.2366 15.663 18.5 15 18.5H7.5Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/bold-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/bold-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = BoldIcon;
BoldIcon.displayName = "BoldIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "BoldIcon$React.memo");
__turbopack_context__.k.register(_c1, "BoldIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/code2-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Code2Icon": ()=>Code2Icon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const Code2Icon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M15.4545 4.2983C15.6192 3.77115 15.3254 3.21028 14.7983 3.04554C14.2712 2.88081 13.7103 3.1746 13.5455 3.70175L8.54554 19.7017C8.38081 20.2289 8.6746 20.7898 9.20175 20.9545C9.72889 21.1192 10.2898 20.8254 10.4545 20.2983L15.4545 4.2983Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/code2-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.70711 7.29289C7.09763 7.68342 7.09763 8.31658 6.70711 8.70711L3.41421 12L6.70711 15.2929C7.09763 15.6834 7.09763 16.3166 6.70711 16.7071C6.31658 17.0976 5.68342 17.0976 5.29289 16.7071L1.29289 12.7071C0.902369 12.3166 0.902369 11.6834 1.29289 11.2929L5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/code2-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M17.2929 7.29289C17.6834 6.90237 18.3166 6.90237 18.7071 7.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L18.7071 16.7071C18.3166 17.0976 17.6834 17.0976 17.2929 16.7071C16.9024 16.3166 16.9024 15.6834 17.2929 15.2929L20.5858 12L17.2929 8.70711C16.9024 8.31658 16.9024 7.68342 17.2929 7.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/code2-icon.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/code2-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Code2Icon;
Code2Icon.displayName = "Code2Icon";
var _c, _c1;
__turbopack_context__.k.register(_c, "Code2Icon$React.memo");
__turbopack_context__.k.register(_c1, "Code2Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/italic-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ItalicIcon": ()=>ItalicIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ItalicIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M15.0222 3H19C19.5523 3 20 3.44772 20 4C20 4.55228 19.5523 5 19 5H15.693L10.443 19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H9.02418C9.00802 21.0004 8.99181 21.0004 8.97557 21H5C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19H8.30704L13.557 5H10C9.44772 5 9 4.55228 9 4C9 3.44772 9.44772 3 10 3H14.9782C14.9928 2.99968 15.0075 2.99967 15.0222 3Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/italic-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/italic-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ItalicIcon;
ItalicIcon.displayName = "ItalicIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "ItalicIcon$React.memo");
__turbopack_context__.k.register(_c1, "ItalicIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/strike-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StrikeIcon": ()=>StrikeIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const StrikeIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9.00039 3H16.0001C16.5524 3 17.0001 3.44772 17.0001 4C17.0001 4.55229 16.5524 5 16.0001 5H9.00011C8.68006 4.99983 8.36412 5.07648 8.07983 5.22349C7.79555 5.37051 7.55069 5.5836 7.36585 5.84487C7.181 6.10614 7.06155 6.40796 7.01754 6.72497C6.97352 7.04198 7.00623 7.36492 7.11292 7.66667C7.29701 8.18737 7.02414 8.75872 6.50344 8.94281C5.98274 9.1269 5.4114 8.85403 5.2273 8.33333C5.01393 7.72984 4.94851 7.08396 5.03654 6.44994C5.12456 5.81592 5.36346 5.21229 5.73316 4.68974C6.10285 4.1672 6.59256 3.74101 7.16113 3.44698C7.72955 3.15303 8.36047 2.99975 9.00039 3Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/strike-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H14C14.7956 13 15.5587 13.3161 16.1213 13.8787C16.6839 14.4413 17 15.2044 17 16C17 16.7956 16.6839 17.5587 16.1213 18.1213C15.5587 18.6839 14.7956 19 14 19H6C5.44772 19 5 19.4477 5 20C5 20.5523 5.44772 21 6 21H14C15.3261 21 16.5979 20.4732 17.5355 19.5355C18.4732 18.5979 19 17.3261 19 16C19 14.9119 18.6453 13.8604 18 13Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/strike-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/strike-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = StrikeIcon;
StrikeIcon.displayName = "StrikeIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "StrikeIcon$React.memo");
__turbopack_context__.k.register(_c1, "StrikeIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/subscript-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SubscriptIcon": ()=>SubscriptIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const SubscriptIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/subscript-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L4.70711 16.7071C4.31658 17.0976 3.68342 17.0976 3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/subscript-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M17.4079 14.3995C18.0284 14.0487 18.7506 13.9217 19.4536 14.0397C20.1566 14.1578 20.7977 14.5138 21.2696 15.0481L21.2779 15.0574L21.2778 15.0575C21.7439 15.5988 22 16.2903 22 17C22 18.0823 21.3962 18.8401 20.7744 19.3404C20.194 19.8073 19.4858 20.141 18.9828 20.378C18.9638 20.387 18.9451 20.3958 18.9266 20.4045C18.4473 20.6306 18.2804 20.7817 18.1922 20.918C18.1773 20.9412 18.1619 20.9681 18.1467 21H21C21.5523 21 22 21.4477 22 22C22 22.5523 21.5523 23 21 23H17C16.4477 23 16 22.5523 16 22C16 21.1708 16.1176 20.4431 16.5128 19.832C16.9096 19.2184 17.4928 18.8695 18.0734 18.5956C18.6279 18.334 19.138 18.0901 19.5207 17.7821C19.8838 17.49 20 17.2477 20 17C20 16.7718 19.9176 16.5452 19.7663 16.3672C19.5983 16.1792 19.3712 16.0539 19.1224 16.0121C18.8722 15.9701 18.6152 16.015 18.3942 16.1394C18.1794 16.2628 18.0205 16.4549 17.9422 16.675C17.7572 17.1954 17.1854 17.4673 16.665 17.2822C16.1446 17.0972 15.8728 16.5254 16.0578 16.005C16.2993 15.3259 16.7797 14.7584 17.4039 14.4018L17.4079 14.3995L17.4079 14.3995Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/subscript-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/subscript-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = SubscriptIcon;
SubscriptIcon.displayName = "SubscriptIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "SubscriptIcon$React.memo");
__turbopack_context__.k.register(_c1, "SubscriptIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/superscript-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SuperscriptIcon": ()=>SuperscriptIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const SuperscriptIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L4.70711 16.7071C4.31658 17.0976 3.68342 17.0976 3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/superscript-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/superscript-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M17.405 1.40657C18.0246 1.05456 18.7463 0.92634 19.4492 1.04344C20.1521 1.16054 20.7933 1.51583 21.2652 2.0497L21.2697 2.05469L21.2696 2.05471C21.7431 2.5975 22 3.28922 22 4.00203C22 5.08579 21.3952 5.84326 20.7727 6.34289C20.1966 6.80531 19.4941 7.13675 18.9941 7.37261C18.9714 7.38332 18.9491 7.39383 18.9273 7.40415C18.4487 7.63034 18.2814 7.78152 18.1927 7.91844C18.1778 7.94155 18.1625 7.96834 18.1473 8.00003H21C21.5523 8.00003 22 8.44774 22 9.00003C22 9.55231 21.5523 10 21 10H17C16.4477 10 16 9.55231 16 9.00003C16 8.17007 16.1183 7.44255 16.5138 6.83161C16.9107 6.21854 17.4934 5.86971 18.0728 5.59591C18.6281 5.33347 19.1376 5.09075 19.5208 4.78316C19.8838 4.49179 20 4.25026 20 4.00203C20 3.77192 19.9178 3.54865 19.7646 3.37182C19.5968 3.18324 19.3696 3.05774 19.1205 3.01625C18.8705 2.97459 18.6137 3.02017 18.3933 3.14533C18.1762 3.26898 18.0191 3.45826 17.9406 3.67557C17.7531 4.19504 17.18 4.46414 16.6605 4.27662C16.141 4.0891 15.8719 3.51596 16.0594 2.99649C16.303 2.3219 16.7817 1.76125 17.4045 1.40689L17.405 1.40657Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/superscript-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/superscript-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = SuperscriptIcon;
SuperscriptIcon.displayName = "SuperscriptIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "SuperscriptIcon$React.memo");
__turbopack_context__.k.register(_c1, "SuperscriptIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/underline-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "UnderlineIcon": ()=>UnderlineIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const UnderlineIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7 4C7 3.44772 6.55228 3 6 3C5.44772 3 5 3.44772 5 4V10C5 11.8565 5.7375 13.637 7.05025 14.9497C8.36301 16.2625 10.1435 17 12 17C13.8565 17 15.637 16.2625 16.9497 14.9497C18.2625 13.637 19 11.8565 19 10V4C19 3.44772 18.5523 3 18 3C17.4477 3 17 3.44772 17 4V10C17 11.3261 16.4732 12.5979 15.5355 13.5355C14.5979 14.4732 13.3261 15 12 15C10.6739 15 9.40215 14.4732 8.46447 13.5355C7.52678 12.5979 7 11.3261 7 10V4ZM4 19C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19H4Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/underline-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/underline-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = UnderlineIcon;
UnderlineIcon.displayName = "UnderlineIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "UnderlineIcon$React.memo");
__turbopack_context__.k.register(_c1, "UnderlineIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/mark-button/use-mark.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MARK_SHORTCUT_KEYS": ()=>MARK_SHORTCUT_KEYS,
    "canToggleMark": ()=>canToggleMark,
    "getFormattedMarkName": ()=>getFormattedMarkName,
    "isMarkActive": ()=>isMarkActive,
    "markIcons": ()=>markIcons,
    "shouldShowButton": ()=>shouldShowButton,
    "toggleMark": ()=>toggleMark,
    "useMark": ()=>useMark
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$bold$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/bold-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$code2$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/code2-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$italic$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/italic-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$strike$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/strike-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$subscript$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/subscript-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$superscript$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/superscript-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$underline$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/underline-icon.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const markIcons = {
    bold: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$bold$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoldIcon"],
    italic: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$italic$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItalicIcon"],
    underline: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$underline$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnderlineIcon"],
    strike: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$strike$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StrikeIcon"],
    code: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$code2$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Code2Icon"],
    superscript: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$superscript$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuperscriptIcon"],
    subscript: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$subscript$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubscriptIcon"]
};
const MARK_SHORTCUT_KEYS = {
    bold: "mod+b",
    italic: "mod+i",
    underline: "mod+u",
    strike: "mod+shift+s",
    code: "mod+e",
    superscript: "mod+.",
    subscript: "mod+,"
};
function canToggleMark(editor, type) {
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMarkInSchema"])(type, editor) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    return editor.can().toggleMark(type);
}
function isMarkActive(editor, type) {
    if (!editor || !editor.isEditable) return false;
    return editor.isActive(type);
}
function toggleMark(editor, type) {
    if (!editor || !editor.isEditable) return false;
    if (!canToggleMark(editor, type)) return false;
    return editor.chain().focus().toggleMark(type).run();
}
function shouldShowButton(props) {
    const { editor, type, hideWhenUnavailable } = props;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMarkInSchema"])(type, editor)) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggleMark(editor, type);
    }
    return true;
}
function getFormattedMarkName(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}
function useMark(config) {
    _s();
    const { editor: providedEditor, type, hideWhenUnavailable = false, onToggled } = config;
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canToggle = canToggleMark(editor, type);
    const isActive = isMarkActive(editor, type);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useMark.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useMark.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        type,
                        hideWhenUnavailable
                    }));
                }
            }["useMark.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useMark.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useMark.useEffect"];
        }
    }["useMark.useEffect"], [
        editor,
        type,
        hideWhenUnavailable
    ]);
    const handleMark = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useMark.useCallback[handleMark]": ()=>{
            if (!editor) return false;
            const success = toggleMark(editor, type);
            if (success) {
                onToggled === null || onToggled === void 0 ? void 0 : onToggled();
            }
            return success;
        }
    }["useMark.useCallback[handleMark]"], [
        editor,
        type,
        onToggled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(MARK_SHORTCUT_KEYS[type], {
        "useMark.useHotkeys": (event)=>{
            event.preventDefault();
            handleMark();
        }
    }["useMark.useHotkeys"], {
        enabled: isVisible && canToggle,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        isActive,
        handleMark,
        canToggle,
        label: getFormattedMarkName(type),
        shortcutKeys: MARK_SHORTCUT_KEYS[type],
        Icon: markIcons[type]
    };
}
_s(useMark, "RhyaN75RedL+tACtmvWl7RPMtCg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/mark-button/mark-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MarkButton": ()=>MarkButton,
    "MarkShortcutBadge": ()=>MarkShortcutBadge
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$use$2d$mark$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/use-mark.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function MarkShortcutBadge(param) {
    let { type, shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$use$2d$mark$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MARK_SHORTCUT_KEYS"][type] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/mark-button/mark-button.tsx",
        lineNumber: 41,
        columnNumber: 10
    }, this);
}
_c = MarkShortcutBadge;
const MarkButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, type, text, hideWhenUnavailable = false, onToggled, showShortcut = false, onClick, children, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, handleMark, label, canToggle, isActive, Icon, shortcutKeys } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$use$2d$mark$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMark"])({
        editor,
        type,
        hideWhenUnavailable,
        onToggled
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "MarkButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleMark();
        }
    }["MarkButton.useCallback[handleClick]"], [
        handleMark,
        onClick
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        disabled: !canToggle,
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        "data-disabled": !canToggle,
        role: "button",
        tabIndex: -1,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "tiptap-button-icon"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/mark-button/mark-button.tsx",
                    lineNumber: 111,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/mark-button/mark-button.tsx",
                    lineNumber: 112,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarkShortcutBadge, {
                    type: type,
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/mark-button/mark-button.tsx",
                    lineNumber: 114,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/mark-button/mark-button.tsx",
        lineNumber: 94,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "UP/QykSC/4ZyWyocHiUgPG0xVAk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$use$2d$mark$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMark"]
    ];
})), "UP/QykSC/4ZyWyocHiUgPG0xVAk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$use$2d$mark$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMark"]
    ];
});
_c2 = MarkButton;
MarkButton.displayName = "MarkButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MarkShortcutBadge");
__turbopack_context__.k.register(_c1, "MarkButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "MarkButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/mark-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/mark-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$use$2d$mark$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/use-mark.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/mark-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/mark-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$use$2d$mark$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/use-mark.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/align-center-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AlignCenterIcon": ()=>AlignCenterIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const AlignCenterIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-center-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-center-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-center-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/align-center-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = AlignCenterIcon;
AlignCenterIcon.displayName = "AlignCenterIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "AlignCenterIcon$React.memo");
__turbopack_context__.k.register(_c1, "AlignCenterIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/align-justify-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AlignJustifyIcon": ()=>AlignJustifyIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const AlignJustifyIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-justify-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-justify-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-justify-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/align-justify-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = AlignJustifyIcon;
AlignJustifyIcon.displayName = "AlignJustifyIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "AlignJustifyIcon$React.memo");
__turbopack_context__.k.register(_c1, "AlignJustifyIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/align-left-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AlignLeftIcon": ()=>AlignLeftIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const AlignLeftIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-left-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 12C2 11.4477 2.44772 11 3 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H3C2.44772 13 2 12.5523 2 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-left-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 18C2 17.4477 2.44772 17 3 17H17C17.5523 17 18 17.4477 18 18C18 18.5523 17.5523 19 17 19H3C2.44772 19 2 18.5523 2 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-left-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/align-left-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = AlignLeftIcon;
AlignLeftIcon.displayName = "AlignLeftIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "AlignLeftIcon$React.memo");
__turbopack_context__.k.register(_c1, "AlignLeftIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/align-right-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AlignRightIcon": ()=>AlignRightIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const AlignRightIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-right-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8 12C8 11.4477 8.44772 11 9 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H9C8.44772 13 8 12.5523 8 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-right-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M6 18C6 17.4477 6.44772 17 7 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H7C6.44772 19 6 18.5523 6 18Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/align-right-icon.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/align-right-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = AlignRightIcon;
AlignRightIcon.displayName = "AlignRightIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "AlignRightIcon$React.memo");
__turbopack_context__.k.register(_c1, "AlignRightIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/text-align-button/use-text-align.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TEXT_ALIGN_SHORTCUT_KEYS": ()=>TEXT_ALIGN_SHORTCUT_KEYS,
    "canSetTextAlign": ()=>canSetTextAlign,
    "hasSetTextAlign": ()=>hasSetTextAlign,
    "isTextAlignActive": ()=>isTextAlignActive,
    "setTextAlign": ()=>setTextAlign,
    "shouldShowButton": ()=>shouldShowButton,
    "textAlignIcons": ()=>textAlignIcons,
    "textAlignLabels": ()=>textAlignLabels,
    "useTextAlign": ()=>useTextAlign
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$align$2d$center$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/align-center-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$align$2d$justify$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/align-justify-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$align$2d$left$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/align-left-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$align$2d$right$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/align-right-icon.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const TEXT_ALIGN_SHORTCUT_KEYS = {
    left: "mod+shift+l",
    center: "mod+shift+e",
    right: "mod+shift+r",
    justify: "mod+shift+j"
};
const textAlignIcons = {
    left: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$align$2d$left$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlignLeftIcon"],
    center: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$align$2d$center$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlignCenterIcon"],
    right: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$align$2d$right$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlignRightIcon"],
    justify: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$align$2d$justify$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlignJustifyIcon"]
};
const textAlignLabels = {
    left: "Align left",
    center: "Align center",
    right: "Align right",
    justify: "Align justify"
};
function canSetTextAlign(editor, align) {
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExtensionAvailable"])(editor, "textAlign") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    return editor.can().setTextAlign(align);
}
function hasSetTextAlign(commands) {
    return "setTextAlign" in commands;
}
function isTextAlignActive(editor, align) {
    if (!editor || !editor.isEditable) return false;
    return editor.isActive({
        textAlign: align
    });
}
function setTextAlign(editor, align) {
    if (!editor || !editor.isEditable) return false;
    if (!canSetTextAlign(editor, align)) return false;
    const chain = editor.chain().focus();
    if (hasSetTextAlign(chain)) {
        return chain.setTextAlign(align).run();
    }
    return false;
}
function shouldShowButton(props) {
    const { editor, hideWhenUnavailable, align } = props;
    if (!editor || !editor.isEditable) return false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExtensionAvailable"])(editor, "textAlign")) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canSetTextAlign(editor, align);
    }
    return true;
}
function useTextAlign(config) {
    _s();
    const { editor: providedEditor, align, hideWhenUnavailable = false, onAligned } = config;
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canAlign = canSetTextAlign(editor, align);
    const isActive = isTextAlignActive(editor, align);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useTextAlign.useEffect": ()=>{
            if (!editor) return;
            const handleSelectionUpdate = {
                "useTextAlign.useEffect.handleSelectionUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        align,
                        hideWhenUnavailable
                    }));
                }
            }["useTextAlign.useEffect.handleSelectionUpdate"];
            handleSelectionUpdate();
            editor.on("selectionUpdate", handleSelectionUpdate);
            return ({
                "useTextAlign.useEffect": ()=>{
                    editor.off("selectionUpdate", handleSelectionUpdate);
                }
            })["useTextAlign.useEffect"];
        }
    }["useTextAlign.useEffect"], [
        editor,
        hideWhenUnavailable,
        align
    ]);
    const handleTextAlign = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useTextAlign.useCallback[handleTextAlign]": ()=>{
            if (!editor) return false;
            const success = setTextAlign(editor, align);
            if (success) {
                onAligned === null || onAligned === void 0 ? void 0 : onAligned();
            }
            return success;
        }
    }["useTextAlign.useCallback[handleTextAlign]"], [
        editor,
        align,
        onAligned
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(TEXT_ALIGN_SHORTCUT_KEYS[align], {
        "useTextAlign.useHotkeys": (event)=>{
            event.preventDefault();
            handleTextAlign();
        }
    }["useTextAlign.useHotkeys"], {
        enabled: isVisible && canAlign,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        isActive,
        handleTextAlign,
        canAlign,
        label: textAlignLabels[align],
        shortcutKeys: TEXT_ALIGN_SHORTCUT_KEYS[align],
        Icon: textAlignIcons[align]
    };
}
_s(useTextAlign, "RQ4lCTmd0D3tahUkIfOzqaYtL3c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/text-align-button/text-align-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TextAlignButton": ()=>TextAlignButton,
    "TextAlignShortcutBadge": ()=>TextAlignShortcutBadge
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$use$2d$text$2d$align$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/use-text-align.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function TextAlignShortcutBadge(param) {
    let { align, shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$use$2d$text$2d$align$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_ALIGN_SHORTCUT_KEYS"][align] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/text-align-button/text-align-button.tsx",
        lineNumber: 54,
        columnNumber: 10
    }, this);
}
_c = TextAlignShortcutBadge;
const TextAlignButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, align, text, hideWhenUnavailable = false, onAligned, showShortcut = false, onClick, icon: CustomIcon, children, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, handleTextAlign, label, canAlign, isActive, Icon, shortcutKeys } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$use$2d$text$2d$align$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTextAlign"])({
        editor,
        align,
        hideWhenUnavailable,
        onAligned
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "TextAlignButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleTextAlign();
        }
    }["TextAlignButton.useCallback[handleClick]"], [
        handleTextAlign,
        onClick
    ]);
    if (!isVisible) {
        return null;
    }
    const RenderIcon = CustomIcon !== null && CustomIcon !== void 0 ? CustomIcon : Icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        disabled: !canAlign,
        "data-style": "ghost",
        "data-active-state": isActive ? "on" : "off",
        "data-disabled": !canAlign,
        role: "button",
        tabIndex: -1,
        "aria-label": label,
        "aria-pressed": isActive,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RenderIcon, {
                    className: "tiptap-button-icon"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/text-align-button/text-align-button.tsx",
                    lineNumber: 130,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/text-align-button/text-align-button.tsx",
                    lineNumber: 131,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextAlignShortcutBadge, {
                    align: align,
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/text-align-button/text-align-button.tsx",
                    lineNumber: 133,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/text-align-button/text-align-button.tsx",
        lineNumber: 113,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "0p+2b6wxwBG4GoYdgYNSbguPl7A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$use$2d$text$2d$align$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTextAlign"]
    ];
})), "0p+2b6wxwBG4GoYdgYNSbguPl7A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$use$2d$text$2d$align$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTextAlign"]
    ];
});
_c2 = TextAlignButton;
TextAlignButton.displayName = "TextAlignButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TextAlignShortcutBadge");
__turbopack_context__.k.register(_c1, "TextAlignButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "TextAlignButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/text-align-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$text$2d$align$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/text-align-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$use$2d$text$2d$align$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/use-text-align.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/text-align-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$text$2d$align$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/text-align-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$use$2d$text$2d$align$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/use-text-align.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/redo2-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Redo2Icon": ()=>Redo2Icon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const Redo2Icon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M15.7071 2.29289C15.3166 1.90237 14.6834 1.90237 14.2929 2.29289C13.9024 2.68342 13.9024 3.31658 14.2929 3.70711L17.5858 7H9.5C7.77609 7 6.12279 7.68482 4.90381 8.90381C3.68482 10.1228 3 11.7761 3 13.5C3 14.3536 3.16813 15.1988 3.49478 15.9874C3.82144 16.7761 4.30023 17.4926 4.90381 18.0962C6.12279 19.3152 7.77609 20 9.5 20H13C13.5523 20 14 19.5523 14 19C14 18.4477 13.5523 18 13 18H9.5C8.30653 18 7.16193 17.5259 6.31802 16.682C5.90016 16.2641 5.56869 15.768 5.34254 15.2221C5.1164 14.6761 5 14.0909 5 13.5C5 12.3065 5.47411 11.1619 6.31802 10.318C7.16193 9.47411 8.30653 9 9.5 9H17.5858L14.2929 12.2929C13.9024 12.6834 13.9024 13.3166 14.2929 13.7071C14.6834 14.0976 15.3166 14.0976 15.7071 13.7071L20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L15.7071 2.29289Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/redo2-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/redo2-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Redo2Icon;
Redo2Icon.displayName = "Redo2Icon";
var _c, _c1;
__turbopack_context__.k.register(_c, "Redo2Icon$React.memo");
__turbopack_context__.k.register(_c1, "Redo2Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/undo2-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Undo2Icon": ()=>Undo2Icon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const Undo2Icon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M9.70711 3.70711C10.0976 3.31658 10.0976 2.68342 9.70711 2.29289C9.31658 1.90237 8.68342 1.90237 8.29289 2.29289L3.29289 7.29289C2.90237 7.68342 2.90237 8.31658 3.29289 8.70711L8.29289 13.7071C8.68342 14.0976 9.31658 14.0976 9.70711 13.7071C10.0976 13.3166 10.0976 12.6834 9.70711 12.2929L6.41421 9H14.5C15.0909 9 15.6761 9.1164 16.2221 9.34254C16.768 9.56869 17.2641 9.90016 17.682 10.318C18.0998 10.7359 18.4313 11.232 18.6575 11.7779C18.8836 12.3239 19 12.9091 19 13.5C19 14.0909 18.8836 14.6761 18.6575 15.2221C18.4313 15.768 18.0998 16.2641 17.682 16.682C17.2641 17.0998 16.768 17.4313 16.2221 17.6575C15.6761 17.8836 15.0909 18 14.5 18H11C10.4477 18 10 18.4477 10 19C10 19.5523 10.4477 20 11 20H14.5C15.3536 20 16.1988 19.8319 16.9874 19.5052C17.7761 19.1786 18.4926 18.6998 19.0962 18.0962C19.6998 17.4926 20.1786 16.7761 20.5052 15.9874C20.8319 15.1988 21 14.3536 21 13.5C21 12.6464 20.8319 11.8012 20.5052 11.0126C20.1786 10.2239 19.6998 9.50739 19.0962 8.90381C18.4926 8.30022 17.7761 7.82144 16.9874 7.49478C16.1988 7.16813 15.3536 7 14.5 7H6.41421L9.70711 3.70711Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/undo2-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/undo2-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Undo2Icon;
Undo2Icon.displayName = "Undo2Icon";
var _c, _c1;
__turbopack_context__.k.register(_c, "Undo2Icon$React.memo");
__turbopack_context__.k.register(_c1, "Undo2Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/undo-redo-button/use-undo-redo.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "UNDO_REDO_SHORTCUT_KEYS": ()=>UNDO_REDO_SHORTCUT_KEYS,
    "canExecuteUndoRedoAction": ()=>canExecuteUndoRedoAction,
    "executeUndoRedoAction": ()=>executeUndoRedoAction,
    "historyActionLabels": ()=>historyActionLabels,
    "historyIcons": ()=>historyIcons,
    "shouldShowButton": ()=>shouldShowButton,
    "useUndoRedo": ()=>useUndoRedo
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hotkeys-hook@5.1.0_re_d2e2023267f8f6620f838295159c9996/node_modules/react-hotkeys-hook/packages/react-hotkeys-hook/dist/index.js [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$redo2$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/redo2-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$undo2$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/undo2-icon.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const UNDO_REDO_SHORTCUT_KEYS = {
    undo: "mod+z",
    redo: "mod+shift+z"
};
const historyActionLabels = {
    undo: "Undo",
    redo: "Redo"
};
const historyIcons = {
    undo: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$undo2$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Undo2Icon"],
    redo: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$redo2$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Redo2Icon"]
};
function canExecuteUndoRedoAction(editor, action) {
    if (!editor || !editor.isEditable) return false;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeTypeSelected"])(editor, [
        "image"
    ])) return false;
    return action === "undo" ? editor.can().undo() : editor.can().redo();
}
function executeUndoRedoAction(editor, action) {
    if (!editor || !editor.isEditable) return false;
    if (!canExecuteUndoRedoAction(editor, action)) return false;
    const chain = editor.chain().focus();
    return action === "undo" ? chain.undo().run() : chain.redo().run();
}
function shouldShowButton(props) {
    const { editor, hideWhenUnavailable, action } = props;
    if (!editor || !editor.isEditable) return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canExecuteUndoRedoAction(editor, action);
    }
    return true;
}
function useUndoRedo(config) {
    _s();
    const { editor: providedEditor, action, hideWhenUnavailable = false, onExecuted } = config;
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const canExecute = canExecuteUndoRedoAction(editor, action);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useUndoRedo.useEffect": ()=>{
            if (!editor) return;
            const handleUpdate = {
                "useUndoRedo.useEffect.handleUpdate": ()=>{
                    setIsVisible(shouldShowButton({
                        editor,
                        hideWhenUnavailable,
                        action
                    }));
                }
            }["useUndoRedo.useEffect.handleUpdate"];
            handleUpdate();
            editor.on("transaction", handleUpdate);
            return ({
                "useUndoRedo.useEffect": ()=>{
                    editor.off("transaction", handleUpdate);
                }
            })["useUndoRedo.useEffect"];
        }
    }["useUndoRedo.useEffect"], [
        editor,
        hideWhenUnavailable,
        action
    ]);
    const handleAction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useUndoRedo.useCallback[handleAction]": ()=>{
            if (!editor) return false;
            const success = executeUndoRedoAction(editor, action);
            if (success) {
                onExecuted === null || onExecuted === void 0 ? void 0 : onExecuted();
            }
            return success;
        }
    }["useUndoRedo.useCallback[handleAction]"], [
        editor,
        action,
        onExecuted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"])(UNDO_REDO_SHORTCUT_KEYS[action], {
        "useUndoRedo.useHotkeys": (event)=>{
            event.preventDefault();
            handleAction();
        }
    }["useUndoRedo.useHotkeys"], {
        enabled: isVisible && canExecute,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true
    });
    return {
        isVisible,
        handleAction,
        canExecute,
        label: historyActionLabels[action],
        shortcutKeys: UNDO_REDO_SHORTCUT_KEYS[action],
        Icon: historyIcons[action]
    };
}
_s(useUndoRedo, "8mGNB/Vxv1Xm29RZaaiGeOD3KZg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hotkeys$2d$hook$40$5$2e$1$2e$0_re_d2e2023267f8f6620f838295159c9996$2f$node_modules$2f$react$2d$hotkeys$2d$hook$2f$packages$2f$react$2d$hotkeys$2d$hook$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHotkeys"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HistoryShortcutBadge": ()=>HistoryShortcutBadge,
    "UndoRedoButton": ()=>UndoRedoButton
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-tiptap-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$use$2d$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/use-undo-redo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/badge/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function HistoryShortcutBadge(param) {
    let { action, shortcutKeys = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$use$2d$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNDO_REDO_SHORTCUT_KEYS"][action] } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$badge$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseShortcutKeys"])({
            shortcutKeys
        })
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_c = HistoryShortcutBadge;
const UndoRedoButton = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s((param, ref)=>{
    let { editor: providedEditor, action, text, hideWhenUnavailable = false, onExecuted, showShortcut = false, onClick, children, ...buttonProps } = param;
    _s();
    const { editor } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"])(providedEditor);
    const { isVisible, handleAction, label, canExecute, Icon, shortcutKeys } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$use$2d$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUndoRedo"])({
        editor,
        action,
        hideWhenUnavailable,
        onExecuted
    });
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "UndoRedoButton.useCallback[handleClick]": (event)=>{
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            if (event.defaultPrevented) return;
            handleAction();
        }
    }["UndoRedoButton.useCallback[handleClick]"], [
        handleAction,
        onClick
    ]);
    if (!isVisible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        type: "button",
        disabled: !canExecute,
        "data-style": "ghost",
        "data-disabled": !canExecute,
        role: "button",
        tabIndex: -1,
        "aria-label": label,
        tooltip: label,
        onClick: handleClick,
        ...buttonProps,
        ref: ref,
        children: children !== null && children !== void 0 ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "tiptap-button-icon"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx",
                    lineNumber: 111,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tiptap-button-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx",
                    lineNumber: 112,
                    columnNumber: 22
                }, ("TURBOPACK compile-time value", void 0)),
                showShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HistoryShortcutBadge, {
                    action: action,
                    shortcutKeys: shortcutKeys
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx",
                    lineNumber: 114,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx",
        lineNumber: 96,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "jwI5YpFTz1+VyJ2krTz1knsr71A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$use$2d$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUndoRedo"]
    ];
})), "jwI5YpFTz1+VyJ2krTz1knsr71A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$tiptap$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTiptapEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$use$2d$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUndoRedo"]
    ];
});
_c2 = UndoRedoButton;
UndoRedoButton.displayName = "UndoRedoButton";
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HistoryShortcutBadge");
__turbopack_context__.k.register(_c1, "UndoRedoButton$React.forwardRef");
__turbopack_context__.k.register(_c2, "UndoRedoButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/undo-redo-button/index.tsx [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$undo$2d$redo$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$use$2d$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/use-undo-redo.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-ui/undo-redo-button/index.tsx [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$undo$2d$redo$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$use$2d$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/use-undo-redo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/index.tsx [app-client] (ecmascript) <locals>");
}),
"[project]/components/tiptap-icons/arrow-left-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ArrowLeftIcon": ()=>ArrowLeftIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const ArrowLeftIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12.7071 5.70711C13.0976 5.31658 13.0976 4.68342 12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289L4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071C13.0976 19.3166 13.0976 18.6834 12.7071 18.2929L7.41421 13L19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L7.41421 11L12.7071 5.70711Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-icons/arrow-left-icon.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tiptap-icons/arrow-left-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ArrowLeftIcon;
ArrowLeftIcon.displayName = "ArrowLeftIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "ArrowLeftIcon$React.memo");
__turbopack_context__.k.register(_c1, "ArrowLeftIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/use-unmount.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__,
    "useUnmount": ()=>useUnmount
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useUnmount = (callback)=>{
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(callback);
    ref.current = callback;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUnmount.useEffect": ()=>({
                "useUnmount.useEffect": ()=>{
                    ref.current();
                }
            })["useUnmount.useEffect"]
    }["useUnmount.useEffect"], []);
};
_s(useUnmount, "8uVE59eA/r6b92xF80p7sH8rXLk=");
const __TURBOPACK__default__export__ = useUnmount;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/use-throttled-callback.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__,
    "useThrottledCallback": ()=>useThrottledCallback
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lodash$2e$throttle$40$4$2e$1$2e$1$2f$node_modules$2f$lodash$2e$throttle$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lodash.throttle@4.1.1/node_modules/lodash.throttle/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$unmount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-unmount.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const defaultOptions = {
    leading: false,
    trailing: true
};
function useThrottledCallback(fn) {
    let wait = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 250, dependencies = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : defaultOptions;
    _s();
    const handler = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useThrottledCallback.useMemo[handler]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lodash$2e$throttle$40$4$2e$1$2e$1$2f$node_modules$2f$lodash$2e$throttle$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(fn, wait, options)
    }["useThrottledCallback.useMemo[handler]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$unmount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUnmount"])({
        "useThrottledCallback.useUnmount": ()=>{
            handler.cancel();
        }
    }["useThrottledCallback.useUnmount"]);
    return handler;
}
_s(useThrottledCallback, "4bYVtkWkFdj902WT5OQb8wiaL3o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$unmount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUnmount"]
    ];
});
const __TURBOPACK__default__export__ = useThrottledCallback;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/use-window-size.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useWindowSize": ()=>useWindowSize
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$throttled$2d$callback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-throttled-callback.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useWindowSize() {
    _s();
    const [windowSize, setWindowSize] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        width: 0,
        height: 0,
        offsetTop: 0,
        offsetLeft: 0,
        scale: 0
    });
    const handleViewportChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$throttled$2d$callback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThrottledCallback"])({
        "useWindowSize.useThrottledCallback[handleViewportChange]": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const vp = window.visualViewport;
            if (!vp) return;
            const { width = 0, height = 0, offsetTop = 0, offsetLeft = 0, scale = 0 } = vp;
            setWindowSize({
                "useWindowSize.useThrottledCallback[handleViewportChange]": (prevState)=>{
                    if (width === prevState.width && height === prevState.height && offsetTop === prevState.offsetTop && offsetLeft === prevState.offsetLeft && scale === prevState.scale) {
                        return prevState;
                    }
                    return {
                        width,
                        height,
                        offsetTop,
                        offsetLeft,
                        scale
                    };
                }
            }["useWindowSize.useThrottledCallback[handleViewportChange]"]);
        }
    }["useWindowSize.useThrottledCallback[handleViewportChange]"], 200);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useWindowSize.useEffect": ()=>{
            const visualViewport = window.visualViewport;
            if (!visualViewport) return;
            visualViewport.addEventListener("resize", handleViewportChange);
            handleViewportChange();
            return ({
                "useWindowSize.useEffect": ()=>{
                    visualViewport.removeEventListener("resize", handleViewportChange);
                }
            })["useWindowSize.useEffect"];
        }
    }["useWindowSize.useEffect"], [
        handleViewportChange
    ]);
    return windowSize;
}
_s(useWindowSize, "9Wc1a/bV6qzTeGt5mO+0eEQGhhg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$throttled$2d$callback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThrottledCallback"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/use-element-rect.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useBodyRect": ()=>useBodyRect,
    "useElementRect": ()=>useElementRect,
    "useRefRect": ()=>useRefRect
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$throttled$2d$callback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-throttled-callback.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
const initialRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};
const isSSR = "object" === "undefined";
const hasResizeObserver = !isSSR && typeof ResizeObserver !== "undefined";
/**
 * Helper function to check if code is running on client side
 */ const isClientSide = ()=>!isSSR;
function useElementRect() {
    let { element, enabled = true, throttleMs = 100, useResizeObserver = true } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    const [rect, setRect] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialRect);
    const getTargetElement = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useElementRect.useCallback[getTargetElement]": ()=>{
            if (!enabled || !isClientSide()) return null;
            if (!element) {
                return document.body;
            }
            if (typeof element === "string") {
                return document.querySelector(element);
            }
            if ("current" in element) {
                return element.current;
            }
            return element;
        }
    }["useElementRect.useCallback[getTargetElement]"], [
        element,
        enabled
    ]);
    const updateRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$throttled$2d$callback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThrottledCallback"])({
        "useElementRect.useThrottledCallback[updateRect]": ()=>{
            if (!enabled || !isClientSide()) return;
            const targetElement = getTargetElement();
            if (!targetElement) {
                setRect(initialRect);
                return;
            }
            const newRect = targetElement.getBoundingClientRect();
            setRect({
                x: newRect.x,
                y: newRect.y,
                width: newRect.width,
                height: newRect.height,
                top: newRect.top,
                right: newRect.right,
                bottom: newRect.bottom,
                left: newRect.left
            });
        }
    }["useElementRect.useThrottledCallback[updateRect]"], throttleMs, [
        enabled,
        getTargetElement
    ], {
        leading: true,
        trailing: true
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useElementRect.useEffect": ()=>{
            if (!enabled || !isClientSide()) {
                setRect(initialRect);
                return;
            }
            const targetElement = getTargetElement();
            if (!targetElement) return;
            updateRect();
            const cleanup = [];
            if (useResizeObserver && hasResizeObserver) {
                const resizeObserver = new ResizeObserver({
                    "useElementRect.useEffect": ()=>{
                        window.requestAnimationFrame(updateRect);
                    }
                }["useElementRect.useEffect"]);
                resizeObserver.observe(targetElement);
                cleanup.push({
                    "useElementRect.useEffect": ()=>resizeObserver.disconnect()
                }["useElementRect.useEffect"]);
            }
            const handleUpdate = {
                "useElementRect.useEffect.handleUpdate": ()=>updateRect()
            }["useElementRect.useEffect.handleUpdate"];
            window.addEventListener("scroll", handleUpdate, {
                passive: true
            });
            window.addEventListener("resize", handleUpdate, {
                passive: true
            });
            cleanup.push({
                "useElementRect.useEffect": ()=>{
                    window.removeEventListener("scroll", handleUpdate);
                    window.removeEventListener("resize", handleUpdate);
                }
            }["useElementRect.useEffect"]);
            return ({
                "useElementRect.useEffect": ()=>{
                    cleanup.forEach({
                        "useElementRect.useEffect": (fn)=>fn()
                    }["useElementRect.useEffect"]);
                    setRect(initialRect);
                }
            })["useElementRect.useEffect"];
        }
    }["useElementRect.useEffect"], [
        enabled,
        getTargetElement,
        updateRect,
        useResizeObserver
    ]);
    return rect;
}
_s(useElementRect, "86C8DFQd+AsZWnl/FAZ3iJlVk60=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$throttled$2d$callback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThrottledCallback"]
    ];
});
function useBodyRect() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s1();
    return useElementRect({
        ...options,
        element: isClientSide() ? document.body : "TURBOPACK unreachable"
    });
}
_s1(useBodyRect, "ll6uiggEhLzhJ4ZhKQ3+TerLc5o=", false, function() {
    return [
        useElementRect
    ];
});
function useRefRect(ref) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _s2();
    return useElementRect({
        ...options,
        element: ref
    });
}
_s2(useRefRect, "ll6uiggEhLzhJ4ZhKQ3+TerLc5o=", false, function() {
    return [
        useElementRect
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/use-cursor-visibility.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useCursorVisibility": ()=>useCursorVisibility
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$window$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-window-size.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$element$2d$rect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-element-rect.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useCursorVisibility(param) {
    let { editor, overlayHeight = 0 } = param;
    _s();
    const { height: windowHeight } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$window$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"])();
    const rect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$element$2d$rect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyRect"])({
        enabled: true,
        throttleMs: 100,
        useResizeObserver: true
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useCursorVisibility.useEffect": ()=>{
            const ensureCursorVisibility = {
                "useCursorVisibility.useEffect.ensureCursorVisibility": ()=>{
                    if (!editor) return;
                    const { state, view } = editor;
                    if (!view.hasFocus()) return;
                    // Get current cursor position coordinates
                    const { from } = state.selection;
                    const cursorCoords = view.coordsAtPos(from);
                    if (windowHeight < rect.height && cursorCoords) {
                        const availableSpace = windowHeight - cursorCoords.top;
                        // If the cursor is hidden behind the overlay or offscreen, scroll it into view
                        if (availableSpace < overlayHeight) {
                            const targetCursorY = Math.max(windowHeight / 2, overlayHeight);
                            const currentScrollY = window.scrollY;
                            const cursorAbsoluteY = cursorCoords.top + currentScrollY;
                            const newScrollY = cursorAbsoluteY - targetCursorY;
                            window.scrollTo({
                                top: Math.max(0, newScrollY),
                                behavior: "smooth"
                            });
                        }
                    }
                }
            }["useCursorVisibility.useEffect.ensureCursorVisibility"];
            ensureCursorVisibility();
        }
    }["useCursorVisibility.useEffect"], [
        editor,
        overlayHeight,
        windowHeight,
        rect.height
    ]);
    return rect;
}
_s(useCursorVisibility, "VTg/rwUHWgQrn9fZ2uOOKqOZ81g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$window$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$element$2d$rect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyRect"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/moon-star-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MoonStarIcon": ()=>MoonStarIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const MoonStarIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 11.5955 21.7564 11.2309 21.3827 11.0761C21.009 10.9213 20.5789 11.0069 20.2929 11.2929C19.287 12.2988 17.9226 12.864 16.5 12.864C15.0774 12.864 13.713 12.2988 12.7071 11.2929C11.7012 10.287 11.136 8.92261 11.136 7.5C11.136 6.07739 11.7012 4.71304 12.7071 3.70711C12.9931 3.42111 13.0787 2.99099 12.9239 2.61732C12.7691 2.24364 12.4045 2 12 2ZM7.55544 5.34824C8.27036 4.87055 9.05353 4.51389 9.87357 4.28778C9.39271 5.27979 9.13604 6.37666 9.13604 7.5C9.13604 9.45304 9.91189 11.3261 11.2929 12.7071C12.6739 14.0881 14.547 14.864 16.5 14.864C17.6233 14.864 18.7202 14.6073 19.7122 14.1264C19.4861 14.9465 19.1295 15.7296 18.6518 16.4446C17.7727 17.7602 16.5233 18.7855 15.0615 19.391C13.5997 19.9965 11.9911 20.155 10.4393 19.8463C8.88743 19.5376 7.46197 18.7757 6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00347 10.4003 4.60897 8.93853C5.21447 7.47672 6.23985 6.22729 7.55544 5.34824Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/moon-star-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M19 2C19.5523 2 20 2.44772 20 3V4H21C21.5523 4 22 4.44772 22 5C22 5.55228 21.5523 6 21 6H20V7C20 7.55228 19.5523 8 19 8C18.4477 8 18 7.55228 18 7V6H17C16.4477 6 16 5.55228 16 5C16 4.44772 16.4477 4 17 4H18V3C18 2.44772 18.4477 2 19 2Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/moon-star-icon.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/moon-star-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = MoonStarIcon;
MoonStarIcon.displayName = "MoonStarIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "MoonStarIcon$React.memo");
__turbopack_context__.k.register(_c1, "MoonStarIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-icons/sun-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SunIcon": ()=>SunIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const SunIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 1C12.5523 1 13 1.44772 13 2V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V2C11 1.44772 11.4477 1 12 1Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V20Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4.22282 4.22289C4.61335 3.83236 5.24651 3.83236 5.63704 4.22289L7.04704 5.63289C7.43756 6.02341 7.43756 6.65658 7.04704 7.0471C6.65651 7.43762 6.02335 7.43762 5.63283 7.0471L4.22282 5.6371C3.8323 5.24658 3.8323 4.61341 4.22282 4.22289Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.367 16.9529C17.9765 16.5623 17.3433 16.5623 16.9528 16.9529C16.5623 17.3434 16.5623 17.9766 16.9528 18.3671L18.3628 19.7771C18.7533 20.1676 19.3865 20.1676 19.777 19.7771C20.1675 19.3866 20.1675 18.7534 19.777 18.3629L18.367 16.9529Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M1 12C1 11.4477 1.44772 11 2 11H4C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13H2C1.44772 13 1 12.5523 1 12Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M20 11C19.4477 11 19 11.4477 19 12C19 12.5523 19.4477 13 20 13H22C22.5523 13 23 12.5523 23 12C23 11.4477 22.5523 11 22 11H20Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7.04704 16.9529C7.43756 17.3434 7.43756 17.9766 7.04704 18.3671L5.63704 19.7771C5.24651 20.1676 4.61335 20.1676 4.22282 19.7771C3.8323 19.3866 3.8323 18.7534 4.22283 18.3629L5.63283 16.9529C6.02335 16.5623 6.65651 16.5623 7.04704 16.9529Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M19.777 5.6371C20.1675 5.24657 20.1675 4.61341 19.777 4.22289C19.3865 3.83236 18.7533 3.83236 18.3628 4.22289L16.9528 5.63289C16.5623 6.02341 16.5623 6.65658 16.9528 7.0471C17.3433 7.43762 17.9765 7.43762 18.367 7.0471L19.777 5.6371Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tiptap-icons/sun-icon.tsx",
        lineNumber: 6,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = SunIcon;
SunIcon.displayName = "SunIcon";
var _c, _c1;
__turbopack_context__.k.register(_c, "SunIcon$React.memo");
__turbopack_context__.k.register(_c1, "SunIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-templates/simple/theme-toggle.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeToggle": ()=>ThemeToggle
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// --- UI Primitives ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$moon$2d$star$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/moon-star-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$sun$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/sun-icon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ThemeToggle() {
    _s();
    const [isDarkMode, setIsDarkMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ThemeToggle.useEffect": ()=>{
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = {
                "ThemeToggle.useEffect.handleChange": ()=>setIsDarkMode(mediaQuery.matches)
            }["ThemeToggle.useEffect.handleChange"];
            mediaQuery.addEventListener("change", handleChange);
            return ({
                "ThemeToggle.useEffect": ()=>mediaQuery.removeEventListener("change", handleChange)
            })["ThemeToggle.useEffect"];
        }
    }["ThemeToggle.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ThemeToggle.useEffect": ()=>{
            const initialDarkMode = !!document.querySelector('meta[name="color-scheme"][content="dark"]') || window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(initialDarkMode);
        }
    }["ThemeToggle.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ThemeToggle.useEffect": ()=>{
            document.documentElement.classList.toggle("dark", isDarkMode);
        }
    }["ThemeToggle.useEffect"], [
        isDarkMode
    ]);
    const toggleDarkMode = ()=>setIsDarkMode((isDark)=>!isDark);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        onClick: toggleDarkMode,
        "aria-label": "Switch to ".concat(isDarkMode ? "light" : "dark", " mode"),
        "data-style": "ghost",
        children: isDarkMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$moon$2d$star$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoonStarIcon"], {
            className: "tiptap-button-icon"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-templates/simple/theme-toggle.tsx",
            lineNumber: 42,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$sun$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SunIcon"], {
            className: "tiptap-button-icon"
        }, void 0, false, {
            fileName: "[project]/components/tiptap-templates/simple/theme-toggle.tsx",
            lineNumber: 44,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-templates/simple/theme-toggle.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(ThemeToggle, "ZabpATy7BGxY7Tz/IMMsMjxqg1I=");
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/tiptap-templates/simple/data/content.json (json)": ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"type\":\"doc\",\"content\":[{\"type\":\"heading\",\"attrs\":{\"textAlign\":null,\"level\":1},\"content\":[{\"type\":\"text\",\"text\":\"Getting started\"}]},{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"text\":\"Welcome to the \"},{\"type\":\"text\",\"marks\":[{\"type\":\"italic\"},{\"type\":\"highlight\",\"attrs\":{\"color\":\"var(--tt-color-highlight-yellow)\"}}],\"text\":\"Simple Editor\"},{\"type\":\"text\",\"text\":\" template! This template integrates \"},{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"open source\"},{\"type\":\"text\",\"text\":\" UI components and Tiptap extensions licensed under \"},{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"MIT\"},{\"type\":\"text\",\"text\":\".\"}]},{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"text\":\"Integrate it by following the \"},{\"type\":\"text\",\"marks\":[{\"type\":\"link\",\"attrs\":{\"href\":\"https://tiptap.dev/docs/ui-components/templates/simple-editor\",\"target\":\"_blank\",\"rel\":\"noopener noreferrer nofollow\",\"class\":null}}],\"text\":\"Tiptap UI Components docs\"},{\"type\":\"text\",\"text\":\" or using our CLI tool.\"}]},{\"type\":\"codeBlock\",\"attrs\":{\"language\":null},\"content\":[{\"type\":\"text\",\"text\":\"npx @tiptap/cli init\"}]},{\"type\":\"heading\",\"attrs\":{\"textAlign\":null,\"level\":2},\"content\":[{\"type\":\"text\",\"text\":\"Features\"}]},{\"type\":\"blockquote\",\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"italic\"}],\"text\":\"A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown \"},{\"type\":\"text\",\"marks\":[{\"type\":\"code\"}],\"text\":\"**\"},{\"type\":\"text\",\"marks\":[{\"type\":\"italic\"}],\"text\":\" or use keyboard shortcuts \"},{\"type\":\"text\",\"marks\":[{\"type\":\"code\"}],\"text\":\"⌘+B\"},{\"type\":\"text\",\"text\":\" for \"},{\"type\":\"text\",\"marks\":[{\"type\":\"strike\"}],\"text\":\"most\"},{\"type\":\"text\",\"text\":\" all common markdown marks. 🪄\"}]}]},{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"Add images, customize alignment, and apply \"},{\"type\":\"text\",\"marks\":[{\"type\":\"highlight\",\"attrs\":{\"color\":\"var(--tt-color-highlight-blue)\"}}],\"text\":\"advanced formatting\"},{\"type\":\"text\",\"text\":\" to make your writing more engaging and professional.\"}]},{\"type\":\"image\",\"attrs\":{\"src\":\"/images/tiptap-ui-placeholder-image.jpg\",\"alt\":\"placeholder-image\",\"title\":\"placeholder-image\"}},{\"type\":\"bulletList\",\"content\":[{\"type\":\"listItem\",\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Superscript\"},{\"type\":\"text\",\"text\":\" (x\"},{\"type\":\"text\",\"marks\":[{\"type\":\"superscript\"}],\"text\":\"2\"},{\"type\":\"text\",\"text\":\") and \"},{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Subscript\"},{\"type\":\"text\",\"text\":\" (H\"},{\"type\":\"text\",\"marks\":[{\"type\":\"subscript\"}],\"text\":\"2\"},{\"type\":\"text\",\"text\":\"O) for precision.\"}]}]},{\"type\":\"listItem\",\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"Typographic conversion\"},{\"type\":\"text\",\"text\":\": automatically convert to \"},{\"type\":\"text\",\"marks\":[{\"type\":\"code\"}],\"text\":\"->\"},{\"type\":\"text\",\"text\":\" an arrow \"},{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\"→\"},{\"type\":\"text\",\"text\":\".\"}]}]}]},{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"italic\"}],\"text\":\"→ \"},{\"type\":\"text\",\"marks\":[{\"type\":\"link\",\"attrs\":{\"href\":\"https://tiptap.dev/docs/ui-components/templates/simple-editor#features\",\"target\":\"_blank\",\"rel\":\"noopener noreferrer nofollow\",\"class\":null}}],\"text\":\"Learn more\"}]},{\"type\":\"horizontalRule\"},{\"type\":\"heading\",\"attrs\":{\"textAlign\":\"left\",\"level\":2},\"content\":[{\"type\":\"text\",\"text\":\"Make it your own\"}]},{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"Switch between light and dark modes, and tailor the editor's appearance with customizable CSS to match your style.\"}]},{\"type\":\"taskList\",\"content\":[{\"type\":\"taskItem\",\"attrs\":{\"checked\":true},\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"Test template\"}]}]},{\"type\":\"taskItem\",\"attrs\":{\"checked\":false},\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"},\"content\":[{\"type\":\"text\",\"marks\":[{\"type\":\"link\",\"attrs\":{\"href\":\"https://tiptap.dev/docs/ui-components/templates/simple-editor\",\"target\":\"_blank\",\"rel\":\"noopener noreferrer nofollow\",\"class\":null}}],\"text\":\"Integrate the free template\"}]}]}]},{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":\"left\"}}]}"));}),
"[project]/components/tiptap-templates/simple/simple-editor.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SimpleEditor": ()=>SimpleEditor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+react@3.3.0_@floati_0f113c0788e141f44a684f6cc1ff509b/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
// --- Tiptap Core Extensions ---
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$starter$2d$kit$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+starter-kit@3.3.0/node_modules/@tiptap/starter-kit/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$image$40$3$2e$3_23aa8bdb5928798c896b1131579beb39$2f$node_modules$2f40$tiptap$2f$extension$2d$image$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extension-image@3.3_23aa8bdb5928798c896b1131579beb39/node_modules/@tiptap/extension-image/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$list$40$3$2e$3$2e$_f448f949c49781e623657ed6a10643f6$2f$node_modules$2f40$tiptap$2f$extension$2d$list$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extension-list@3.3._f448f949c49781e623657ed6a10643f6/node_modules/@tiptap/extension-list/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$text$2d$alig_bf19fee74028c308ae80fedf6619f939$2f$node_modules$2f40$tiptap$2f$extension$2d$text$2d$align$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extension-text-alig_bf19fee74028c308ae80fedf6619f939/node_modules/@tiptap/extension-text-align/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$typograph_bd8fff8342e2720b633ef6c6fe9eff19$2f$node_modules$2f40$tiptap$2f$extension$2d$typography$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extension-typograph_bd8fff8342e2720b633ef6c6fe9eff19/node_modules/@tiptap/extension-typography/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$highlight_084c16243778dd6b109e4e75833f28b9$2f$node_modules$2f40$tiptap$2f$extension$2d$highlight$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extension-highlight_084c16243778dd6b109e4e75833f28b9/node_modules/@tiptap/extension-highlight/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$subscript_fb211fd905f21c2a3ce5fb4028475afc$2f$node_modules$2f40$tiptap$2f$extension$2d$subscript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extension-subscript_fb211fd905f21c2a3ce5fb4028475afc/node_modules/@tiptap/extension-subscript/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$superscri_045f366de87392c7ac6de54f4f03b060$2f$node_modules$2f40$tiptap$2f$extension$2d$superscript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extension-superscri_045f366de87392c7ac6de54f4f03b060/node_modules/@tiptap/extension-superscript/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extensions$40$3$2e$3$2e$0_$40$t_29619f188c11f5b55be11bd1f0ac53dd$2f$node_modules$2f40$tiptap$2f$extensions$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tiptap+extensions@3.3.0_@t_29619f188c11f5b55be11bd1f0ac53dd/node_modules/@tiptap/extensions/dist/index.js [app-client] (ecmascript)");
// --- UI Primitives ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/button/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$spacer$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/spacer/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$spacer$2f$spacer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/spacer/spacer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/toolbar/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui-primitive/toolbar/toolbar.tsx [app-client] (ecmascript)");
// --- Tiptap Node ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$node$2f$image$2d$upload$2d$node$2f$image$2d$upload$2d$node$2d$extension$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-node/image-upload-node/image-upload-node-extension.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$node$2f$horizontal$2d$rule$2d$node$2f$horizontal$2d$rule$2d$node$2d$extension$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension.ts [app-client] (ecmascript)");
// --- Tiptap UI ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$heading$2d$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$image$2d$upload$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/image-upload-button/image-upload-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-dropdown-menu/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$list$2d$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/list-dropdown-menu/list-dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$blockquote$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/blockquote-button/blockquote-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$code$2d$block$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/code-block-button/code-block-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$popover$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-popover/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$popover$2f$color$2d$highlight$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/color-highlight-popover/color-highlight-popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$link$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/link-popover/link-popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/mark-button/mark-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$text$2d$align$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/text-align-button/text-align-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/index.tsx [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$undo$2d$redo$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-ui/undo-redo-button/undo-redo-button.tsx [app-client] (ecmascript)");
// --- Icons ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$arrow$2d$left$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/arrow-left-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$highlighter$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/highlighter-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$link$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-icons/link-icon.tsx [app-client] (ecmascript)");
// --- Hooks ---
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mobile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$window$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-window-size.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$cursor$2d$visibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-cursor-visibility.ts [app-client] (ecmascript)");
// --- Components ---
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$templates$2f$simple$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tiptap-templates/simple/theme-toggle.tsx [app-client] (ecmascript)");
// --- Lib ---
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tiptap-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$templates$2f$simple$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/components/tiptap-templates/simple/data/content.json (json)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const MainToolbarContent = (param)=>{
    let { onHighlighterClick, onLinkClick, isMobile } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$spacer$2f$spacer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarGroup"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$undo$2d$redo$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UndoRedoButton"], {
                        action: "undo"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$undo$2d$redo$2d$button$2f$undo$2d$redo$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UndoRedoButton"], {
                        action: "redo"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarSeparator"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarGroup"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$heading$2d$dropdown$2d$menu$2f$heading$2d$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingDropdownMenu"], {
                        levels: [
                            1,
                            2,
                            3,
                            4
                        ],
                        portal: isMobile
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$list$2d$dropdown$2d$menu$2f$list$2d$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListDropdownMenu"], {
                        types: [
                            "bulletList",
                            "orderedList",
                            "taskList"
                        ],
                        portal: isMobile
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$blockquote$2d$button$2f$blockquote$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockquoteButton"], {}, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$code$2d$block$2d$button$2f$code$2d$block$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeBlockButton"], {}, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarSeparator"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarGroup"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkButton"], {
                        type: "bold"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkButton"], {
                        type: "italic"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkButton"], {
                        type: "strike"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkButton"], {
                        type: "code"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkButton"], {
                        type: "underline"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    !isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$popover$2f$color$2d$highlight$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorHighlightPopover"], {}, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$popover$2f$color$2d$highlight$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorHighlightPopoverButton"], {
                        onClick: onHighlighterClick
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    !isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$link$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkPopover"], {}, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 121,
                        columnNumber: 22
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$link$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkButton"], {
                        onClick: onLinkClick
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 121,
                        columnNumber: 40
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarSeparator"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarGroup"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkButton"], {
                        type: "superscript"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$mark$2d$button$2f$mark$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkButton"], {
                        type: "subscript"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarSeparator"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarGroup"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$text$2d$align$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextAlignButton"], {
                        align: "left"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$text$2d$align$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextAlignButton"], {
                        align: "center"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$text$2d$align$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextAlignButton"], {
                        align: "right"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$text$2d$align$2d$button$2f$text$2d$align$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextAlignButton"], {
                        align: "justify"
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarSeparator"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarGroup"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$image$2d$upload$2d$button$2f$image$2d$upload$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageUploadButton"], {
                    text: "Add"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$spacer$2f$spacer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarSeparator"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 148,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarGroup"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$templates$2f$simple$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                    fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_c = MainToolbarContent;
const MobileToolbarContent = (param)=>{
    let { type, onBack } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarGroup"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$button$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    "data-style": "ghost",
                    onClick: onBack,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$arrow$2d$left$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowLeftIcon"], {
                            className: "tiptap-button-icon"
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                            lineNumber: 167,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        type === "highlighter" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$highlighter$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HighlighterIcon"], {
                            className: "tiptap-button-icon"
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$icons$2f$link$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkIcon"], {
                            className: "tiptap-button-icon"
                        }, void 0, false, {
                            fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                    lineNumber: 166,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 165,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarSeparator"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 176,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            type === "highlighter" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$color$2d$highlight$2d$popover$2f$color$2d$highlight$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorHighlightPopoverContent"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2f$link$2d$popover$2f$link$2d$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkContent"], {}, void 0, false, {
                fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_c1 = MobileToolbarContent;
function SimpleEditor() {
    var _toolbarRef_current;
    _s();
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const { height } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$window$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"])();
    const [mobileView, setMobileView] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("main");
    const toolbarRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                "aria-label": "Main content area, start typing to enter text.",
                class: "simple-editor"
            }
        },
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$starter$2d$kit$40$3$2e$3$2e$0$2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarterKit"].configure({
                horizontalRule: false,
                link: {
                    openOnClick: false,
                    enableClickSelection: true
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$node$2f$horizontal$2d$rule$2d$node$2f$horizontal$2d$rule$2d$node$2d$extension$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HorizontalRule"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$text$2d$alig_bf19fee74028c308ae80fedf6619f939$2f$node_modules$2f40$tiptap$2f$extension$2d$text$2d$align$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextAlign"].configure({
                types: [
                    "heading",
                    "paragraph"
                ]
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$list$40$3$2e$3$2e$_f448f949c49781e623657ed6a10643f6$2f$node_modules$2f40$tiptap$2f$extension$2d$list$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskList"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$list$40$3$2e$3$2e$_f448f949c49781e623657ed6a10643f6$2f$node_modules$2f40$tiptap$2f$extension$2d$list$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskItem"].configure({
                nested: true
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$highlight_084c16243778dd6b109e4e75833f28b9$2f$node_modules$2f40$tiptap$2f$extension$2d$highlight$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Highlight"].configure({
                multicolor: true
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$image$40$3$2e$3_23aa8bdb5928798c896b1131579beb39$2f$node_modules$2f40$tiptap$2f$extension$2d$image$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$typograph_bd8fff8342e2720b633ef6c6fe9eff19$2f$node_modules$2f40$tiptap$2f$extension$2d$typography$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Typography"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$superscri_045f366de87392c7ac6de54f4f03b060$2f$node_modules$2f40$tiptap$2f$extension$2d$superscript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Superscript"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extension$2d$subscript_fb211fd905f21c2a3ce5fb4028475afc$2f$node_modules$2f40$tiptap$2f$extension$2d$subscript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subscript"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$extensions$40$3$2e$3$2e$0_$40$t_29619f188c11f5b55be11bd1f0ac53dd$2f$node_modules$2f40$tiptap$2f$extensions$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selection"],
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$node$2f$image$2d$upload$2d$node$2f$image$2d$upload$2d$node$2d$extension$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageUploadNode"].configure({
                accept: "image/*",
                maxSize: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_FILE_SIZE"],
                limit: 3,
                upload: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tiptap$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleImageUpload"],
                onError: {
                    "SimpleEditor.useEditor[editor]": (error)=>console.error("Upload failed:", error)
                }["SimpleEditor.useEditor[editor]"]
            })
        ],
        content: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$templates$2f$simple$2f$data$2f$content$2e$json__$28$json$29$__["default"]
    });
    var _toolbarRef_current_getBoundingClientRect_height;
    const rect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$cursor$2d$visibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCursorVisibility"])({
        editor,
        overlayHeight: (_toolbarRef_current_getBoundingClientRect_height = (_toolbarRef_current = toolbarRef.current) === null || _toolbarRef_current === void 0 ? void 0 : _toolbarRef_current.getBoundingClientRect().height) !== null && _toolbarRef_current_getBoundingClientRect_height !== void 0 ? _toolbarRef_current_getBoundingClientRect_height : 0
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "SimpleEditor.useEffect": ()=>{
            if (!isMobile && mobileView !== "main") {
                setMobileView("main");
            }
        }
    }["SimpleEditor.useEffect"], [
        isMobile,
        mobileView
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "simple-editor-wrapper",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContext"].Provider, {
            value: {
                editor
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tiptap$2d$ui$2d$primitive$2f$toolbar$2f$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toolbar"], {
                    ref: toolbarRef,
                    style: {
                        ...isMobile ? {
                            bottom: "calc(100% - ".concat(height - rect.y, "px)")
                        } : {}
                    },
                    children: mobileView === "main" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MainToolbarContent, {
                        onHighlighterClick: ()=>setMobileView("highlighter"),
                        onLinkClick: ()=>setMobileView("link"),
                        isMobile: isMobile
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 260,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileToolbarContent, {
                        type: mobileView === "highlighter" ? "highlighter" : "link",
                        onBack: ()=>setMobileView("main")
                    }, void 0, false, {
                        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                        lineNumber: 266,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                    lineNumber: 249,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_react$2d$dom$40$19$2e$1$2e$_ef4523c3cd30f1376607630843a96a70$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                    editor: editor,
                    role: "presentation",
                    className: "simple-editor-content"
                }, void 0, false, {
                    fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
            lineNumber: 248,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tiptap-templates/simple/simple-editor.tsx",
        lineNumber: 247,
        columnNumber: 5
    }, this);
}
_s(SimpleEditor, "6Av6CMESDclIG49a8aCQwUpoj7I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$window$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tiptap$2b$react$40$3$2e$3$2e$0_$40$floati_0f113c0788e141f44a684f6cc1ff509b$2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$cursor$2d$visibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCursorVisibility"]
    ];
});
_c2 = SimpleEditor;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MainToolbarContent");
__turbopack_context__.k.register(_c1, "MobileToolbarContent");
__turbopack_context__.k.register(_c2, "SimpleEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_03f3b359._.js.map