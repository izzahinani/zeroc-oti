"use strict";
(() => {
var exports = {};
exports.id = 177;
exports.ids = [177];
exports.modules = {

/***/ 167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 126:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const BASE_URL = "https://beta3.api.climatiq.io/search";
async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(BASE_URL, {
                headers: {
                    Authorization: `Bearer ${"Y87QZFEYBM480ZG03EP57P4J340N"}`
                }
            });
            res.status(200).json(data);
            return;
        } catch (err) {
            res.status(500).json({
                message: err.message || "OMOMOMO! Something went wrong"
            });
            return;
        }
    } else if (req.method === "POST") {
        try {
            const { body  } = req.body; //{"category":[],"region":[],"sector":[],"source":[],"unit_type":[],"year":[],"query":"meep","page":"1"}
            // https://beta3.api.climatiq.io/search?query=light+duty+trucks&year=2021
            const parsedBody = JSON.parse(body);
            const queryArray = Object.keys(parsedBody).reduce((prevArray, currCategory)=>{
                if (parsedBody[currCategory].length === 0) {
                    return prevArray;
                }
                if (Array.isArray(parsedBody[currCategory])) {
                    return [
                        ...prevArray,
                        `${currCategory}=${replaceSpaceWithPlus(parsedBody[currCategory].join(","))}`
                    ];
                } else {
                    return [
                        ...prevArray,
                        `${currCategory}=${replaceSpaceWithPlus(parsedBody[currCategory])}`
                    ];
                }
            }, []);
            console.log(`${BASE_URL}?${queryArray.join("&")}`);
            const { data: data1  } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${BASE_URL}?${queryArray.join("&")}`, {
                headers: {
                    Authorization: `Bearer ${"Y87QZFEYBM480ZG03EP57P4J340N"}`
                }
            });
            res.status(200).json(data1);
            return;
        } catch (err1) {
            res.status(500).json({
                message: err1.message || "OMOMOMO! Something went wrong"
            });
            return;
        }
    } else {
        res.status(405).json({
            message: "Method not allowed"
        });
        return;
    }
};
const replaceSpaceWithPlus = (string)=>{
    return string.replaceAll(" ", "+");
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(126));
module.exports = __webpack_exports__;

})();