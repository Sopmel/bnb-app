"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/profile/[userId]/page",{

/***/ "(app-pages-browser)/./src/app/components/PropertyPage.tsx":
/*!*********************************************!*\
  !*** ./src/app/components/PropertyPage.tsx ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PropertyPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\nfunction PropertyPage() {\n    _s();\n    const [properties, setProperties] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Typ: Array av Property\n    const [newProperty, setNewProperty] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        name: \"\",\n        description: \"\",\n        location: \"\",\n        pricePerNight: 0,\n        availability: true\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetch(\"/api/property\").then((res)=>res.json()).then((data)=>{\n            console.log(\"Fetched properties:\", data); // Kolla vad som hämtas från API\n            setProperties(data);\n        }).catch((error)=>console.error(\"Error fetching properties:\", error));\n    }, []);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        await fetch(\"/api/property\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify(newProperty)\n        });\n        // Fetch properties again after creating new property\n        fetch(\"/api/property\").then((res)=>res.json()).then((data)=>setProperties(data));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            padding: \"20px\",\n            maxWidth: \"800px\",\n            margin: \"auto\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Properties\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                lineNumber: 50,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                style: {\n                    listStyle: \"none\",\n                    padding: 0\n                },\n                children: properties.map((property)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        style: {\n                            border: \"1px solid #ccc\",\n                            padding: \"15px\",\n                            marginBottom: \"10px\",\n                            borderRadius: \"5px\",\n                            backgroundColor: \"#f9f9f9\"\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                children: property.name\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                                lineNumber: 62,\n                                columnNumber: 25\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                                lineNumber: 62,\n                                columnNumber: 57\n                            }, this),\n                            \"Location: \",\n                            property.location,\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                                lineNumber: 63,\n                                columnNumber: 54\n                            }, this),\n                            \"Price: $\",\n                            property.pricePerNight,\n                            \" / night\",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                                lineNumber: 64,\n                                columnNumber: 65\n                            }, this),\n                            property.description && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Description: \",\n                                    property.description\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                                lineNumber: 65,\n                                columnNumber: 50\n                            }, this)\n                        ]\n                    }, property.id, true, {\n                        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                        lineNumber: 55,\n                        columnNumber: 21\n                    }, this))\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                lineNumber: 53,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: \"Create New Property\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                lineNumber: 70,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSubmit,\n                style: {\n                    display: \"flex\",\n                    flexDirection: \"column\",\n                    gap: \"10px\"\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        placeholder: \"Name\",\n                        value: newProperty.name,\n                        onChange: (e)=>setNewProperty({\n                                ...newProperty,\n                                name: e.target.value\n                            }),\n                        style: {\n                            padding: \"8px\",\n                            fontSize: \"16px\",\n                            borderRadius: \"4px\",\n                            border: \"1px solid #ccc\"\n                        }\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        placeholder: \"Description\",\n                        value: newProperty.description,\n                        onChange: (e)=>setNewProperty({\n                                ...newProperty,\n                                description: e.target.value\n                            }),\n                        style: {\n                            padding: \"8px\",\n                            fontSize: \"16px\",\n                            borderRadius: \"4px\",\n                            border: \"1px solid #ccc\"\n                        }\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                        lineNumber: 81,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        placeholder: \"Location\",\n                        value: newProperty.location,\n                        onChange: (e)=>setNewProperty({\n                                ...newProperty,\n                                location: e.target.value\n                            }),\n                        style: {\n                            padding: \"8px\",\n                            fontSize: \"16px\",\n                            borderRadius: \"4px\",\n                            border: \"1px solid #ccc\"\n                        }\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                        lineNumber: 88,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"number\",\n                        placeholder: \"Price per Night\",\n                        value: newProperty.pricePerNight,\n                        onChange: (e)=>setNewProperty({\n                                ...newProperty,\n                                pricePerNight: parseFloat(e.target.value)\n                            }),\n                        style: {\n                            padding: \"8px\",\n                            fontSize: \"16px\",\n                            borderRadius: \"4px\",\n                            border: \"1px solid #ccc\"\n                        }\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                        lineNumber: 95,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        style: {\n                            padding: \"10px\",\n                            fontSize: \"16px\",\n                            backgroundColor: \"#007bff\",\n                            color: \"white\",\n                            border: \"none\",\n                            borderRadius: \"4px\",\n                            cursor: \"pointer\"\n                        },\n                        children: \"Create Property\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                        lineNumber: 102,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n                lineNumber: 73,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\components\\\\PropertyPage.tsx\",\n        lineNumber: 49,\n        columnNumber: 9\n    }, this);\n}\n_s(PropertyPage, \"wt5TCEh1Rgja6B+CJ4AE9t2x0WA=\");\n_c = PropertyPage;\nvar _c;\n$RefreshReg$(_c, \"PropertyPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9Qcm9wZXJ0eVBhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUU0QztBQVc3QixTQUFTRTs7SUFDcEIsTUFBTSxDQUFDQyxZQUFZQyxjQUFjLEdBQUdKLCtDQUFRQSxDQUFhLEVBQUUsR0FBRyx5QkFBeUI7SUFDdkYsTUFBTSxDQUFDSyxhQUFhQyxlQUFlLEdBQUdOLCtDQUFRQSxDQUF1QjtRQUNqRU8sTUFBTTtRQUNOQyxhQUFhO1FBQ2JDLFVBQVU7UUFDVkMsZUFBZTtRQUNmQyxjQUFjO0lBQ2xCO0lBRUFWLGdEQUFTQSxDQUFDO1FBQ05XLE1BQU0saUJBQ0RDLElBQUksQ0FBQyxDQUFDQyxNQUFRQSxJQUFJQyxJQUFJLElBQ3RCRixJQUFJLENBQUMsQ0FBQ0c7WUFDSEMsUUFBUUMsR0FBRyxDQUFDLHVCQUF1QkYsT0FBTyxnQ0FBZ0M7WUFDMUVaLGNBQWNZO1FBQ2xCLEdBQ0NHLEtBQUssQ0FBQyxDQUFDQyxRQUFVSCxRQUFRRyxLQUFLLENBQUMsOEJBQThCQTtJQUN0RSxHQUFHLEVBQUU7SUFFTCxNQUFNQyxlQUFlLE9BQU9DO1FBQ3hCQSxFQUFFQyxjQUFjO1FBQ2hCLE1BQU1YLE1BQU0saUJBQWlCO1lBQ3pCWSxRQUFRO1lBQ1JDLFNBQVM7Z0JBQUUsZ0JBQWdCO1lBQW1CO1lBQzlDQyxNQUFNQyxLQUFLQyxTQUFTLENBQUN2QjtRQUN6QjtRQUVBLHFEQUFxRDtRQUNyRE8sTUFBTSxpQkFDREMsSUFBSSxDQUFDLENBQUNDLE1BQVFBLElBQUlDLElBQUksSUFDdEJGLElBQUksQ0FBQyxDQUFDRyxPQUFTWixjQUFjWTtJQUN0QztJQUVBLHFCQUNJLDhEQUFDYTtRQUFJQyxPQUFPO1lBQUVDLFNBQVM7WUFBUUMsVUFBVTtZQUFTQyxRQUFRO1FBQU87OzBCQUM3RCw4REFBQ0M7MEJBQUc7Ozs7OzswQkFHSiw4REFBQ0M7Z0JBQUdMLE9BQU87b0JBQUVNLFdBQVc7b0JBQVFMLFNBQVM7Z0JBQUU7MEJBQ3RDNUIsV0FBV2tDLEdBQUcsQ0FBQyxDQUFDQyx5QkFDYiw4REFBQ0M7d0JBQXFCVCxPQUFPOzRCQUN6QlUsUUFBUTs0QkFDUlQsU0FBUzs0QkFDVFUsY0FBYzs0QkFDZEMsY0FBYzs0QkFDZEMsaUJBQWlCO3dCQUNyQjs7MENBQ0ksOERBQUNDOzBDQUFRTixTQUFTL0IsSUFBSTs7Ozs7OzBDQUFVLDhEQUFDc0M7Ozs7OzRCQUFLOzRCQUMzQlAsU0FBUzdCLFFBQVE7MENBQUMsOERBQUNvQzs7Ozs7NEJBQUs7NEJBQzFCUCxTQUFTNUIsYUFBYTs0QkFBQzswQ0FBUSw4REFBQ21DOzs7Ozs0QkFDeENQLFNBQVM5QixXQUFXLGtCQUFJLDhEQUFDc0M7O29DQUFFO29DQUFjUixTQUFTOUIsV0FBVzs7Ozs7Ozs7dUJBVnpEOEIsU0FBU1MsRUFBRTs7Ozs7Ozs7OzswQkFlNUIsOERBQUNDOzBCQUFHOzs7Ozs7MEJBR0osOERBQUNDO2dCQUFLQyxVQUFVN0I7Z0JBQWNTLE9BQU87b0JBQUVxQixTQUFTO29CQUFRQyxlQUFlO29CQUFVQyxLQUFLO2dCQUFPOztrQ0FDekYsOERBQUNDO3dCQUNHQyxNQUFLO3dCQUNMQyxhQUFZO3dCQUNaQyxPQUFPcEQsWUFBWUUsSUFBSTt3QkFDdkJtRCxVQUFVLENBQUNwQyxJQUFNaEIsZUFBZTtnQ0FBRSxHQUFHRCxXQUFXO2dDQUFFRSxNQUFNZSxFQUFFcUMsTUFBTSxDQUFDRixLQUFLOzRCQUFDO3dCQUN2RTNCLE9BQU87NEJBQUVDLFNBQVM7NEJBQU82QixVQUFVOzRCQUFRbEIsY0FBYzs0QkFBT0YsUUFBUTt3QkFBaUI7Ozs7OztrQ0FFN0YsOERBQUNjO3dCQUNHQyxNQUFLO3dCQUNMQyxhQUFZO3dCQUNaQyxPQUFPcEQsWUFBWUcsV0FBVzt3QkFDOUJrRCxVQUFVLENBQUNwQyxJQUFNaEIsZUFBZTtnQ0FBRSxHQUFHRCxXQUFXO2dDQUFFRyxhQUFhYyxFQUFFcUMsTUFBTSxDQUFDRixLQUFLOzRCQUFDO3dCQUM5RTNCLE9BQU87NEJBQUVDLFNBQVM7NEJBQU82QixVQUFVOzRCQUFRbEIsY0FBYzs0QkFBT0YsUUFBUTt3QkFBaUI7Ozs7OztrQ0FFN0YsOERBQUNjO3dCQUNHQyxNQUFLO3dCQUNMQyxhQUFZO3dCQUNaQyxPQUFPcEQsWUFBWUksUUFBUTt3QkFDM0JpRCxVQUFVLENBQUNwQyxJQUFNaEIsZUFBZTtnQ0FBRSxHQUFHRCxXQUFXO2dDQUFFSSxVQUFVYSxFQUFFcUMsTUFBTSxDQUFDRixLQUFLOzRCQUFDO3dCQUMzRTNCLE9BQU87NEJBQUVDLFNBQVM7NEJBQU82QixVQUFVOzRCQUFRbEIsY0FBYzs0QkFBT0YsUUFBUTt3QkFBaUI7Ozs7OztrQ0FFN0YsOERBQUNjO3dCQUNHQyxNQUFLO3dCQUNMQyxhQUFZO3dCQUNaQyxPQUFPcEQsWUFBWUssYUFBYTt3QkFDaENnRCxVQUFVLENBQUNwQyxJQUFNaEIsZUFBZTtnQ0FBRSxHQUFHRCxXQUFXO2dDQUFFSyxlQUFlbUQsV0FBV3ZDLEVBQUVxQyxNQUFNLENBQUNGLEtBQUs7NEJBQUU7d0JBQzVGM0IsT0FBTzs0QkFBRUMsU0FBUzs0QkFBTzZCLFVBQVU7NEJBQVFsQixjQUFjOzRCQUFPRixRQUFRO3dCQUFpQjs7Ozs7O2tDQUU3Riw4REFBQ3NCO3dCQUFPUCxNQUFLO3dCQUFTekIsT0FBTzs0QkFDekJDLFNBQVM7NEJBQ1Q2QixVQUFVOzRCQUNWakIsaUJBQWlCOzRCQUNqQm9CLE9BQU87NEJBQ1B2QixRQUFROzRCQUNSRSxjQUFjOzRCQUNkc0IsUUFBUTt3QkFDWjtrQ0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSW5CO0dBcEd3QjlEO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvY29tcG9uZW50cy9Qcm9wZXJ0eVBhZ2UudHN4Pzc4ZWMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xyXG5cclxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbnR5cGUgUHJvcGVydHkgPSB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIGxvY2F0aW9uOiBzdHJpbmc7XHJcbiAgICBwcmljZVBlck5pZ2h0OiBudW1iZXI7XHJcbiAgICBhdmFpbGFiaWxpdHk6IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9wZXJ0eVBhZ2UoKSB7XHJcbiAgICBjb25zdCBbcHJvcGVydGllcywgc2V0UHJvcGVydGllc10gPSB1c2VTdGF0ZTxQcm9wZXJ0eVtdPihbXSk7IC8vIFR5cDogQXJyYXkgYXYgUHJvcGVydHlcclxuICAgIGNvbnN0IFtuZXdQcm9wZXJ0eSwgc2V0TmV3UHJvcGVydHldID0gdXNlU3RhdGU8T21pdDxQcm9wZXJ0eSwgJ2lkJz4+KHtcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJycsXHJcbiAgICAgICAgbG9jYXRpb246ICcnLFxyXG4gICAgICAgIHByaWNlUGVyTmlnaHQ6IDAsXHJcbiAgICAgICAgYXZhaWxhYmlsaXR5OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBmZXRjaCgnL2FwaS9wcm9wZXJ0eScpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRmV0Y2hlZCBwcm9wZXJ0aWVzOicsIGRhdGEpOyAvLyBLb2xsYSB2YWQgc29tIGjDpG10YXMgZnLDpW4gQVBJXHJcbiAgICAgICAgICAgICAgICBzZXRQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwcm9wZXJ0aWVzOicsIGVycm9yKSk7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBhd2FpdCBmZXRjaCgnL2FwaS9wcm9wZXJ0eScsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdQcm9wZXJ0eSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZldGNoIHByb3BlcnRpZXMgYWdhaW4gYWZ0ZXIgY3JlYXRpbmcgbmV3IHByb3BlcnR5XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvcGVydHknKVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gc2V0UHJvcGVydGllcyhkYXRhKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCcsIG1heFdpZHRoOiAnODAwcHgnLCBtYXJnaW46ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgPGgxPlByb3BlcnRpZXM8L2gxPlxyXG5cclxuICAgICAgICAgICAgey8qIFByb3BlcnR5IExpc3QgKi99XHJcbiAgICAgICAgICAgIDx1bCBzdHlsZT17eyBsaXN0U3R5bGU6ICdub25lJywgcGFkZGluZzogMCB9fT5cclxuICAgICAgICAgICAgICAgIHtwcm9wZXJ0aWVzLm1hcCgocHJvcGVydHkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtwcm9wZXJ0eS5pZH0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTVweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjlmOWY5J1xyXG4gICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPntwcm9wZXJ0eS5uYW1lfTwvc3Ryb25nPjxiciAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbjoge3Byb3BlcnR5LmxvY2F0aW9ufTxiciAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmljZTogJHtwcm9wZXJ0eS5wcmljZVBlck5pZ2h0fSAvIG5pZ2h0PGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wZXJ0eS5kZXNjcmlwdGlvbiAmJiA8cD5EZXNjcmlwdGlvbjoge3Byb3BlcnR5LmRlc2NyaXB0aW9ufTwvcD59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG5cclxuICAgICAgICAgICAgPGgyPkNyZWF0ZSBOZXcgUHJvcGVydHk8L2gyPlxyXG5cclxuICAgICAgICAgICAgey8qIENyZWF0ZSBQcm9wZXJ0eSBGb3JtICovfVxyXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdQcm9wZXJ0eS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3UHJvcGVydHkoeyAuLi5uZXdQcm9wZXJ0eSwgbmFtZTogZS50YXJnZXQudmFsdWUgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGZvbnRTaXplOiAnMTZweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJvcGVydHkuZGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQcm9wZXJ0eSh7IC4uLm5ld1Byb3BlcnR5LCBkZXNjcmlwdGlvbjogZS50YXJnZXQudmFsdWUgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGZvbnRTaXplOiAnMTZweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkxvY2F0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJvcGVydHkubG9jYXRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQcm9wZXJ0eSh7IC4uLm5ld1Byb3BlcnR5LCBsb2NhdGlvbjogZS50YXJnZXQudmFsdWUgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGZvbnRTaXplOiAnMTZweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGJvcmRlcjogJzFweCBzb2xpZCAjY2NjJyB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUHJpY2UgcGVyIE5pZ2h0XCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJvcGVydHkucHJpY2VQZXJOaWdodH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld1Byb3BlcnR5KHsgLi4ubmV3UHJvcGVydHksIHByaWNlUGVyTmlnaHQ6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICc4cHgnLCBmb250U2l6ZTogJzE2cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBib3JkZXI6ICcxcHggc29saWQgI2NjYycgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDdiZmYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICB9fT5DcmVhdGUgUHJvcGVydHk8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJQcm9wZXJ0eVBhZ2UiLCJwcm9wZXJ0aWVzIiwic2V0UHJvcGVydGllcyIsIm5ld1Byb3BlcnR5Iiwic2V0TmV3UHJvcGVydHkiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJsb2NhdGlvbiIsInByaWNlUGVyTmlnaHQiLCJhdmFpbGFiaWxpdHkiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVycm9yIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZGl2Iiwic3R5bGUiLCJwYWRkaW5nIiwibWF4V2lkdGgiLCJtYXJnaW4iLCJoMSIsInVsIiwibGlzdFN0eWxlIiwibWFwIiwicHJvcGVydHkiLCJsaSIsImJvcmRlciIsIm1hcmdpbkJvdHRvbSIsImJvcmRlclJhZGl1cyIsImJhY2tncm91bmRDb2xvciIsInN0cm9uZyIsImJyIiwicCIsImlkIiwiaDIiLCJmb3JtIiwib25TdWJtaXQiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImdhcCIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsImZvbnRTaXplIiwicGFyc2VGbG9hdCIsImJ1dHRvbiIsImNvbG9yIiwiY3Vyc29yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/PropertyPage.tsx\n"));

/***/ })

});