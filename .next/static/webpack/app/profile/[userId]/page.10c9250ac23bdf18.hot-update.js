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

/***/ "(app-pages-browser)/./src/app/profile/[userId]/page.tsx":
/*!*******************************************!*\
  !*** ./src/app/profile/[userId]/page.tsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n // Använd useParams från 'next/navigation'\n\nconst Profile = ()=>{\n    _s();\n    const [isAdmin, setIsAdmin] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [userData, setUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [showSettings, setShowSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // Hanterar visningen av inställningarna\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { userId } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)(); // Använd useParams för att få userId\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        console.log(\"UserId fr\\xe5n URL:\", userId);\n        const token = localStorage.getItem(\"token\");\n        if (!token) {\n            router.push(\"/login\");\n        } else {\n            const userIsAdmin = localStorage.getItem(\"isAdmin\") === \"true\";\n            setIsAdmin(userIsAdmin);\n            const fetchUserData = async ()=>{\n                try {\n                    const response = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"/api/user/profile/\".concat(userId), {\n                        headers: {\n                            Authorization: \"Bearer \".concat(token)\n                        }\n                    });\n                    setUserData(response.data);\n                } catch (error) {\n                    console.error(\"Failed to fetch userData\", error);\n                }\n            };\n            if (userId) {\n                fetchUserData(); // Hämta endast data om userId finns\n            }\n        }\n    }, [\n        userId,\n        router\n    ]);\n    const handleDeleteAccount = async ()=>{\n        try {\n            const token = localStorage.getItem(\"token\");\n            if (!token) return;\n            await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].delete(\"/api/user/delete\", {\n                headers: {\n                    Authorization: \"Bearer \".concat(token)\n                }\n            });\n            localStorage.removeItem(\"token\");\n            localStorage.removeItem(\"isAdmin\");\n            router.push(\"/login\");\n        } catch (error) {\n            console.error(\"Failed to delete account\", error);\n        }\n    };\n    const handleUpgradeToAdmin = async ()=>{\n        try {\n            await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"/api/admin/upgrade/\".concat(userId));\n            alert(\"User upgraded to admin\");\n        } catch (error) {\n            console.error(\"Failed to upgrade user\", error);\n        }\n    };\n    const handleDeleteUser = async ()=>{\n        try {\n            await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].delete(\"/api//profile/\".concat(userId));\n            alert(\"User deleted\");\n        } catch (error) {\n            console.error(\"Failed to delete user\", error);\n        }\n    };\n    const toggleSettings = ()=>{\n        setShowSettings(!showSettings); // Växla visningen av inställningar\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Welcome to your profile!\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                lineNumber: 83,\n                columnNumber: 13\n            }, undefined),\n            userData && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Name: \",\n                            userData.name\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                        lineNumber: 86,\n                        columnNumber: 21\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Email: \",\n                            userData.email\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                        lineNumber: 87,\n                        columnNumber: 21\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                lineNumber: 85,\n                columnNumber: 17\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"settings-icon\",\n                onClick: toggleSettings,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"i\", {\n                    className: \"fas fa-cog text-2xl cursor-pointer\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                    lineNumber: 93,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                lineNumber: 92,\n                columnNumber: 13\n            }, undefined),\n            showSettings && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"options mt-4\",\n                children: !isAdmin ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            children: \"User Settings\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                            lineNumber: 101,\n                            columnNumber: 29\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: handleDeleteAccount,\n                            className: \"px-4 py-2\",\n                            children: \"Delete Account\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                            lineNumber: 102,\n                            columnNumber: 29\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                    lineNumber: 100,\n                    columnNumber: 25\n                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            children: \"Admin Settings\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                            lineNumber: 108,\n                            columnNumber: 29\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: handleUpgradeToAdmin,\n                            className: \"px-4 py-2\",\n                            children: \"Upgrade to Admin\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                            lineNumber: 109,\n                            columnNumber: 29\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: handleDeleteUser,\n                            className: \"px-4 py-2\",\n                            children: \"Delete User\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                            lineNumber: 112,\n                            columnNumber: 29\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                    lineNumber: 107,\n                    columnNumber: 25\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n                lineNumber: 98,\n                columnNumber: 17\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\sophm\\\\OneDrive\\\\Dokument\\\\typescript\\\\typescript-airbnb\\\\bnb-app\\\\src\\\\app\\\\profile\\\\[userId]\\\\page.tsx\",\n        lineNumber: 82,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Profile, \"5y2PuKymvGUH66DStOZy5z942EE=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams\n    ];\n});\n_c = Profile;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profile);\nvar _c;\n$RefreshReg$(_c, \"Profile\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcHJvZmlsZS9bdXNlcklkXS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUU0QztBQUNXLENBQUUsMENBQTBDO0FBQ3pFO0FBRTFCLE1BQU1LLFVBQVU7O0lBQ1osTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdOLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ08sVUFBVUMsWUFBWSxHQUFHUiwrQ0FBUUEsQ0FBTTtJQUM5QyxNQUFNLENBQUNTLGNBQWNDLGdCQUFnQixHQUFHViwrQ0FBUUEsQ0FBQyxRQUFTLHdDQUF3QztJQUNsRyxNQUFNVyxTQUFTViwwREFBU0E7SUFDeEIsTUFBTSxFQUFFVyxNQUFNLEVBQUUsR0FBR1YsMERBQVNBLElBQUsscUNBQXFDO0lBRXRFSCxnREFBU0EsQ0FBQztRQUNOYyxRQUFRQyxHQUFHLENBQUMsdUJBQW9CRjtRQUNoQyxNQUFNRyxRQUFRQyxhQUFhQyxPQUFPLENBQUM7UUFDbkMsSUFBSSxDQUFDRixPQUFPO1lBQ1JKLE9BQU9PLElBQUksQ0FBQztRQUNoQixPQUFPO1lBQ0gsTUFBTUMsY0FBY0gsYUFBYUMsT0FBTyxDQUFDLGVBQWU7WUFDeERYLFdBQVdhO1lBRVgsTUFBTUMsZ0JBQWdCO2dCQUNsQixJQUFJO29CQUNBLE1BQU1DLFdBQVcsTUFBTWxCLDZDQUFLQSxDQUFDbUIsR0FBRyxDQUFDLHFCQUE0QixPQUFQVixTQUFVO3dCQUM1RFcsU0FBUzs0QkFDTEMsZUFBZSxVQUFnQixPQUFOVDt3QkFDN0I7b0JBQ0o7b0JBQ0FQLFlBQVlhLFNBQVNJLElBQUk7Z0JBQzdCLEVBQUUsT0FBT0MsT0FBTztvQkFDWmIsUUFBUWEsS0FBSyxDQUFDLDRCQUE0QkE7Z0JBQzlDO1lBQ0o7WUFFQSxJQUFJZCxRQUFRO2dCQUNSUSxpQkFBa0Isb0NBQW9DO1lBQzFEO1FBQ0o7SUFDSixHQUFHO1FBQUNSO1FBQVFEO0tBQU87SUFFbkIsTUFBTWdCLHNCQUFzQjtRQUN4QixJQUFJO1lBQ0EsTUFBTVosUUFBUUMsYUFBYUMsT0FBTyxDQUFDO1lBQ25DLElBQUksQ0FBQ0YsT0FBTztZQUVaLE1BQU1aLDZDQUFLQSxDQUFDeUIsTUFBTSxDQUFDLG9CQUFvQjtnQkFDbkNMLFNBQVM7b0JBQUVDLGVBQWUsVUFBZ0IsT0FBTlQ7Z0JBQVE7WUFDaEQ7WUFFQUMsYUFBYWEsVUFBVSxDQUFDO1lBQ3hCYixhQUFhYSxVQUFVLENBQUM7WUFDeEJsQixPQUFPTyxJQUFJLENBQUM7UUFDaEIsRUFBRSxPQUFPUSxPQUFPO1lBQ1piLFFBQVFhLEtBQUssQ0FBQyw0QkFBNEJBO1FBQzlDO0lBQ0o7SUFFQSxNQUFNSSx1QkFBdUI7UUFDekIsSUFBSTtZQUNBLE1BQU0zQiw2Q0FBS0EsQ0FBQzRCLElBQUksQ0FBQyxzQkFBNkIsT0FBUG5CO1lBQ3ZDb0IsTUFBTTtRQUNWLEVBQUUsT0FBT04sT0FBTztZQUNaYixRQUFRYSxLQUFLLENBQUMsMEJBQTBCQTtRQUM1QztJQUNKO0lBRUEsTUFBTU8sbUJBQW1CO1FBQ3JCLElBQUk7WUFDQSxNQUFNOUIsNkNBQUtBLENBQUN5QixNQUFNLENBQUMsaUJBQXdCLE9BQVBoQjtZQUNwQ29CLE1BQU07UUFDVixFQUFFLE9BQU9OLE9BQU87WUFDWmIsUUFBUWEsS0FBSyxDQUFDLHlCQUF5QkE7UUFDM0M7SUFDSjtJQUVBLE1BQU1RLGlCQUFpQjtRQUNuQnhCLGdCQUFnQixDQUFDRCxlQUFnQixtQ0FBbUM7SUFDeEU7SUFFQSxxQkFDSSw4REFBQzBCO1FBQUlDLFdBQVU7OzBCQUNYLDhEQUFDQzswQkFBRzs7Ozs7O1lBQ0g5QiwwQkFDRyw4REFBQzRCOztrQ0FDRyw4REFBQ0c7OzRCQUFFOzRCQUFPL0IsU0FBU2dDLElBQUk7Ozs7Ozs7a0NBQ3ZCLDhEQUFDRDs7NEJBQUU7NEJBQVEvQixTQUFTaUMsS0FBSzs7Ozs7Ozs7Ozs7OzswQkFLakMsOERBQUNMO2dCQUFJQyxXQUFVO2dCQUFnQkssU0FBU1A7MEJBQ3BDLDRFQUFDUTtvQkFBRU4sV0FBVTs7Ozs7Ozs7Ozs7WUFJaEIzQiw4QkFDRyw4REFBQzBCO2dCQUFJQyxXQUFVOzBCQUNWLENBQUMvQix3QkFDRSw4REFBQzhCOztzQ0FDRyw4REFBQ1E7c0NBQUc7Ozs7OztzQ0FDSiw4REFBQ0M7NEJBQU9ILFNBQVNkOzRCQUFxQlMsV0FBVTtzQ0FBWTs7Ozs7Ozs7Ozs7OENBS2hFLDhEQUFDRDs7c0NBQ0csOERBQUNRO3NDQUFHOzs7Ozs7c0NBQ0osOERBQUNDOzRCQUFPSCxTQUFTWDs0QkFBc0JNLFdBQVU7c0NBQVk7Ozs7OztzQ0FHN0QsOERBQUNROzRCQUFPSCxTQUFTUjs0QkFBa0JHLFdBQVU7c0NBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU3JGO0dBbEhNaEM7O1FBSWFILHNEQUFTQTtRQUNMQyxzREFBU0E7OztLQUwxQkU7QUFvSE4sK0RBQWVBLE9BQU9BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9wcm9maWxlL1t1c2VySWRdL3BhZ2UudHN4PzJjYjYiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcblxyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIsIHVzZVBhcmFtcyB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7ICAvLyBBbnbDpG5kIHVzZVBhcmFtcyBmcsOlbiAnbmV4dC9uYXZpZ2F0aW9uJ1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5jb25zdCBQcm9maWxlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW2lzQWRtaW4sIHNldElzQWRtaW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gICAgY29uc3QgW3VzZXJEYXRhLCBzZXRVc2VyRGF0YV0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xyXG4gICAgY29uc3QgW3Nob3dTZXR0aW5ncywgc2V0U2hvd1NldHRpbmdzXSA9IHVzZVN0YXRlKGZhbHNlKTsgIC8vIEhhbnRlcmFyIHZpc25pbmdlbiBhdiBpbnN0w6RsbG5pbmdhcm5hXHJcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICAgIGNvbnN0IHsgdXNlcklkIH0gPSB1c2VQYXJhbXMoKTsgIC8vIEFudsOkbmQgdXNlUGFyYW1zIGbDtnIgYXR0IGbDpSB1c2VySWRcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlcklkIGZyw6VuIFVSTDpcIiwgdXNlcklkKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJc0FkbWluID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lzQWRtaW4nKSA9PT0gJ3RydWUnO1xyXG4gICAgICAgICAgICBzZXRJc0FkbWluKHVzZXJJc0FkbWluKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZldGNoVXNlckRhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAvYXBpL3VzZXIvcHJvZmlsZS8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VXNlckRhdGEocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCB1c2VyRGF0YScsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgIGZldGNoVXNlckRhdGEoKTsgIC8vIEjDpG10YSBlbmRhc3QgZGF0YSBvbSB1c2VySWQgZmlubnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFt1c2VySWQsIHJvdXRlcl0pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZURlbGV0ZUFjY291bnQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcclxuICAgICAgICAgICAgaWYgKCF0b2tlbikgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgYXhpb3MuZGVsZXRlKFwiL2FwaS91c2VyL2RlbGV0ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lzQWRtaW4nKTtcclxuICAgICAgICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBkZWxldGUgYWNjb3VudCcsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVVwZ3JhZGVUb0FkbWluID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoYC9hcGkvYWRtaW4vdXBncmFkZS8ke3VzZXJJZH1gKTtcclxuICAgICAgICAgICAgYWxlcnQoJ1VzZXIgdXBncmFkZWQgdG8gYWRtaW4nKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdXBncmFkZSB1c2VyJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRGVsZXRlVXNlciA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBheGlvcy5kZWxldGUoYC9hcGkvL3Byb2ZpbGUvJHt1c2VySWR9YCk7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdVc2VyIGRlbGV0ZWQnKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZGVsZXRlIHVzZXInLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCB0b2dnbGVTZXR0aW5ncyA9ICgpID0+IHtcclxuICAgICAgICBzZXRTaG93U2V0dGluZ3MoIXNob3dTZXR0aW5ncyk7ICAvLyBWw6R4bGEgdmlzbmluZ2VuIGF2IGluc3TDpGxsbmluZ2FyXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGgxPldlbGNvbWUgdG8geW91ciBwcm9maWxlITwvaDE+XHJcbiAgICAgICAgICAgIHt1c2VyRGF0YSAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPk5hbWU6IHt1c2VyRGF0YS5uYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD5FbWFpbDoge3VzZXJEYXRhLmVtYWlsfTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgey8qIEluc3TDpGxsbmluZ3Npa29uICovfVxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNldHRpbmdzLWljb25cIiBvbkNsaWNrPXt0b2dnbGVTZXR0aW5nc30+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYXMgZmEtY29nIHRleHQtMnhsIGN1cnNvci1wb2ludGVyXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIHsvKiBWaXNhIGVsbGVyIGTDtmxqIGluc3TDpGxsbmluZ3NhbHRlcm5hdGl2ICovfVxyXG4gICAgICAgICAgICB7c2hvd1NldHRpbmdzICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3B0aW9ucyBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyFpc0FkbWluID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPlVzZXIgU2V0dGluZ3M8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVEZWxldGVBY2NvdW50fSBjbGFzc05hbWU9XCJweC00IHB5LTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWxldGUgQWNjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+QWRtaW4gU2V0dGluZ3M8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVVcGdyYWRlVG9BZG1pbn0gY2xhc3NOYW1lPVwicHgtNCBweS0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXBncmFkZSB0byBBZG1pblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZVVzZXJ9IGNsYXNzTmFtZT1cInB4LTQgcHktMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlbGV0ZSBVc2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGU7XHJcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsInVzZVBhcmFtcyIsImF4aW9zIiwiUHJvZmlsZSIsImlzQWRtaW4iLCJzZXRJc0FkbWluIiwidXNlckRhdGEiLCJzZXRVc2VyRGF0YSIsInNob3dTZXR0aW5ncyIsInNldFNob3dTZXR0aW5ncyIsInJvdXRlciIsInVzZXJJZCIsImNvbnNvbGUiLCJsb2ciLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwdXNoIiwidXNlcklzQWRtaW4iLCJmZXRjaFVzZXJEYXRhIiwicmVzcG9uc2UiLCJnZXQiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImRhdGEiLCJlcnJvciIsImhhbmRsZURlbGV0ZUFjY291bnQiLCJkZWxldGUiLCJyZW1vdmVJdGVtIiwiaGFuZGxlVXBncmFkZVRvQWRtaW4iLCJwb3N0IiwiYWxlcnQiLCJoYW5kbGVEZWxldGVVc2VyIiwidG9nZ2xlU2V0dGluZ3MiLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsInAiLCJuYW1lIiwiZW1haWwiLCJvbkNsaWNrIiwiaSIsImgyIiwiYnV0dG9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/profile/[userId]/page.tsx\n"));

/***/ })

});