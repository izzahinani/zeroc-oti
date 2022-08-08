"use strict";
(() => {
var exports = {};
exports.id = 47;
exports.ids = [47];
exports.modules = {

/***/ 167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 63:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const BASE_URL = "https://beta3.api.climatiq.io/emission-factors/";
const ENDPOINTS = {
    categories: "categories",
    years: "years",
    sectors: "sectors",
    unitTypes: "unit-types",
    sources: "sources",
    regions: "regions"
};
async function handler(req, res) {
    if (req.method === "GET") {
        try {
            //! TODO To get from DB + check last entry data
            //!...
            //To get dropdown questions from climatiq
            const keys = Object.keys(ENDPOINTS);
            const promisesArray = keys.map(async (key)=>await getDropdownDataFromClimatiq(ENDPOINTS[key]));
            let data = {};
            await Promise.all(promisesArray).then(function(results) {
                results.forEach((each, index)=>{
                    data[keys[index]] = [
                        ...Object.keys(each.data.results).map((key)=>each.data.results[key])
                    ];
                });
            });
            res.status(200).json(data);
            return;
        } catch (err) {
            res.status(500).json({
                message: err.message || "Something went wrong"
            });
        } finally{
            return;
        }
    } else {
        res.status(405).json({
            message: "Invalid request method"
        });
        return;
    }
};
// ======================================================================//
async function getDropdownDataFromClimatiq(endpoint) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default().get(BASE_URL + endpoint, {
        headers: {
            Authorization: `Bearer ${"Y87QZFEYBM480ZG03EP57P4J340N"}`
        }
    });
}
function saveDropdownDataToDB() {}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(63));
module.exports = __webpack_exports__;

})();