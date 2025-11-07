(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/split-main 2/apps/website/src/components/not-found-statuses.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotFoundStatuses",
    ()=>NotFoundStatuses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/split-main 2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/split-main 2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const data = [
    {
        name: "<Status Code>",
        description: "404 Not Found"
    },
    {
        name: "<Referrer Policy>",
        description: "strict-origin-when-cross-origin"
    },
    {
        name: "<Cache-Control>",
        description: "no-store, must-revalidate"
    },
    {
        name: "<Connection>",
        description: "keep-alive"
    },
    {
        name: "<Content-Type>",
        description: "text/html; charset=utf-8"
    },
    {
        name: "<Date>",
        description: new Date().toTimeString()
    },
    {
        name: "<X-Powered-By>",
        description: "Next.js"
    },
    {
        name: "<Project-Name>",
        description: "Midday"
    }
];
function NotFoundStatuses() {
    _s();
    const [statuses, setStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotFoundStatuses.useEffect": ()=>{
            setStatuses([
                {
                    name: "<Request URL>",
                    description: location.origin
                }
            ]);
        }
    }["NotFoundStatuses.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotFoundStatuses.useEffect": ()=>{
            let index = 1;
            function addItems() {
                const destinationArray = [];
                if (index < data.length - 1) {
                    destinationArray.push(data[index]);
                    setStatuses({
                        "NotFoundStatuses.useEffect.addItems": (prev)=>[
                                ...prev,
                                data[index]
                            ]
                    }["NotFoundStatuses.useEffect.addItems"]);
                    index++;
                    scrollRef.current?.scrollTo({
                        top: 10000000,
                        behavior: "smooth",
                        block: "end"
                    });
                    setTimeout(addItems, 500);
                }
            }
            if (!ref.current) {
                addItems();
                ref.current = true;
            }
        }
    }["NotFoundStatuses.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "overflow-auto p-4 flex flex-col space-y-4 h-[290px] text-xs",
        ref: scrollRef,
        children: statuses?.map((status)=>{
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[#707070] mb-1",
                        children: status.name
                    }, void 0, false, {
                        fileName: "[project]/Downloads/split-main 2/apps/website/src/components/not-found-statuses.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: status.description
                    }, void 0, false, {
                        fileName: "[project]/Downloads/split-main 2/apps/website/src/components/not-found-statuses.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, this)
                ]
            }, status.name, true, {
                fileName: "[project]/Downloads/split-main 2/apps/website/src/components/not-found-statuses.tsx",
                lineNumber: 90,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/Downloads/split-main 2/apps/website/src/components/not-found-statuses.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(NotFoundStatuses, "eqoPNw+jcBqpxKstjBljEywQOTs=");
_c = NotFoundStatuses;
var _c;
__turbopack_context__.k.register(_c, "NotFoundStatuses");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/split-main 2/apps/website/src/actions/data:748745 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"006d8a5469dda87dd64a2606c509054dc503bd963c":"fetchStatus"},"Downloads/split-main 2/apps/website/src/actions/fetch-status.ts",""] */ __turbopack_context__.s([
    "fetchStatus",
    ()=>fetchStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/split-main 2/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var fetchStatus = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("006d8a5469dda87dd64a2606c509054dc503bd963c", __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "fetchStatus"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZmV0Y2gtc3RhdHVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuXG5pbXBvcnQgeyBnZXRTdGF0dXMgfSBmcm9tIFwiQG9wZW5zdGF0dXMvcmVhY3RcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoU3RhdHVzKCkge1xuICBjb25zdCByZXMgPSBhd2FpdCBnZXRTdGF0dXMoXCJtaWRkYXlcIik7XG5cbiAgY29uc3QgeyBzdGF0dXMgfSA9IHJlcztcblxuICByZXR1cm4gc3RhdHVzO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJvVUFJc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/split-main 2/apps/website/src/components/status-widget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusWidget",
    ()=>StatusWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/split-main 2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$apps$2f$website$2f$src$2f$actions$2f$data$3a$748745__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/Downloads/split-main 2/apps/website/src/actions/data:748745 [app-client] (ecmascript) <text/javascript>");
(()=>{
    const e = new Error("Cannot find module '@midday/ui/cn'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/split-main 2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function StatusWidget() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("operational");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatusWidget.useEffect": ()=>{
            async function fetchData() {
                try {
                    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$apps$2f$website$2f$src$2f$actions$2f$data$3a$748745__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["fetchStatus"])();
                    if (response) {
                        setStatus(response);
                    }
                } catch  {}
            }
            fetchData();
        }
    }["StatusWidget.useEffect"], []);
    const getStatusLevel = (level)=>{
        return ({
            operational: {
                label: "Operational",
                color: "bg-green-500",
                color2: "bg-green-400"
            },
            degraded_performance: {
                label: "Degraded Performance",
                color: "bg-yellow-500",
                color2: "bg-yellow-400"
            },
            partial_outage: {
                label: "Partial Outage",
                color: "bg-yellow-500",
                color2: "bg-yellow-400"
            },
            major_outage: {
                label: "Major Outage",
                color: "bg-red-500",
                color2: "bg-red-400"
            },
            unknown: {
                label: "Unknown",
                color: "bg-gray-500",
                color2: "bg-gray-400"
            },
            incident: {
                label: "Incident",
                color: "bg-yellow-500",
                color2: "bg-yellow-400"
            },
            under_maintenance: {
                label: "Under Maintenance",
                color: "bg-gray-500",
                color2: "bg-gray-400"
            }
        })[level];
    };
    const level = getStatusLevel(status);
    if (!level) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        className: "flex justify-between space-x-2 items-center w-full border border-border rounded-full px-3 py-1.5",
        href: "https://midday.openstatus.dev",
        target: "_blank",
        rel: "noreferrer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs font-mono",
                    children: level.label
                }, void 0, false, {
                    fileName: "[project]/Downloads/split-main 2/apps/website/src/components/status-widget.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/split-main 2/apps/website/src/components/status-widget.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative ml-auto flex h-1.5 w-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", level.color2)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/split-main 2/apps/website/src/components/status-widget.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$split$2d$main__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: cn("relative inline-flex rounded-full h-1.5 w-1.5", level.color)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/split-main 2/apps/website/src/components/status-widget.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/split-main 2/apps/website/src/components/status-widget.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/split-main 2/apps/website/src/components/status-widget.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(StatusWidget, "lS8BCJGddy0NHQednSCH/g854YA=");
_c = StatusWidget;
var _c;
__turbopack_context__.k.register(_c, "StatusWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/split-main 2/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file must be bundled in the app's client layer, it shouldn't be directly
// imported by the server.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    callServer: null,
    createServerReference: null,
    findSourceMapURL: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    callServer: function() {
        return _appcallserver.callServer;
    },
    createServerReference: function() {
        return _client.createServerReference;
    },
    findSourceMapURL: function() {
        return _appfindsourcemapurl.findSourceMapURL;
    }
});
const _appcallserver = __turbopack_context__.r("[project]/Downloads/split-main 2/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)");
const _appfindsourcemapurl = __turbopack_context__.r("[project]/Downloads/split-main 2/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)");
const _client = __turbopack_context__.r("[project]/Downloads/split-main 2/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)"); //# sourceMappingURL=action-client-wrapper.js.map
}),
]);

//# sourceMappingURL=Downloads_split-main%202_77932b54._.js.map