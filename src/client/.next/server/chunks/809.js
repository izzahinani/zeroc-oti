exports.id = 809;
exports.ids = [809];
exports.modules = {

/***/ 436:
/***/ ((module) => {

// Exports
module.exports = {
	"ldsspinner": "loader_ldsspinner__EfvyH"
};


/***/ }),

/***/ 809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Datapoints)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./components/UI/Loader/loader.module.css
var loader_module = __webpack_require__(436);
var loader_module_default = /*#__PURE__*/__webpack_require__.n(loader_module);
;// CONCATENATED MODULE: ./components/UI/Loader/index.js


function Loader() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (loader_module_default()).ldsspinner,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {})
        ]
    });
}
/* harmony default export */ const UI_Loader = (Loader);

;// CONCATENATED MODULE: ./components/Datapoints/TableResults.js


const TABLE_HEADERS = [
    "name",
    "source",
    "year",
    "scope",
    "unit_type",
    "sector",
    "category",
    "checkbox"
];
function TableResults({ results , checkedResults , confirmedResults , setCheckedResults , setConfirmedResults  }) {
    // ========================= RENDERED TABLE FN =================================//
    const handleCheck = (result)=>{
        const { uuid  } = result;
        setCheckedResults(({ [uuid]: value , ...others })=>{
            if (value) {
                //to uncheck
                return others;
            } else {
                //to check
                return {
                    ...others,
                    [uuid]: result
                };
            }
        });
    };
    const handleConfirmSubmit = (e)=>{
        e.preventDefault();
        setConfirmedResults((prev)=>({
                ...prev,
                ...checkedResults
            }));
    };
    // ========================= CONFIRMED TABLE FN =================================//
    const handleSaveSubmit = (e)=>{
        e.preventDefault();
    //.... api call
    };
    const handleRemove = (uuid)=>{
        setConfirmedResults(({ [uuid]: value , ...others })=>{
            return others;
        });
        setCheckedResults(({ [uuid]: value , ...others })=>{
            return others;
        });
    };
    // ==============================================ISCHECKED & isDisabled========================================//
    const isChecked = (uuid)=>Object.keys(checkedResults).some((eachKey)=>eachKey === uuid);
    const isDisabled = (uuid)=>Object.keys(confirmedResults).some((eachKey)=>eachKey === uuid);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                children: "==================== RENDERED RESULTS=========================="
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                onSubmit: handleConfirmSubmit,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("table", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("thead", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                    children: TABLE_HEADERS.map((header)=>/*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            children: header
                                        }, header))
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("tbody", {
                                children: results.map((result)=>{
                                    const { uuid , name , scope ="" , source , year , unit_type , sector , category  } = result;
                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: source
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: year
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: scope
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: unit_type
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: sector
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: category
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    type: "checkbox",
                                                    checked: isChecked(uuid),
                                                    onChange: ()=>handleCheck(result),
                                                    disabled: isDisabled(uuid)
                                                })
                                            })
                                        ]
                                    }, uuid);
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "submit",
                        children: "Confirm"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                children: "==================== RENDERED CONFIRMED TABLE=========================="
            }),
            Object.keys(confirmedResults).length === 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                children: "No confirmed table"
            }) : /*#__PURE__*/ jsx_runtime_.jsx("form", {
                onSubmit: handleSaveSubmit,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("table", {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("thead", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                children: TABLE_HEADERS.map((header)=>/*#__PURE__*/ jsx_runtime_.jsx("th", {
                                        children: header
                                    }, header))
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("tbody", {
                            children: Object.keys(confirmedResults).map((key)=>{
                                const { uuid , name , scope ="" , source , year , unit_type , sector , category  } = confirmedResults[key];
                                return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: name
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: source
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: year
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: scope
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: unit_type
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: sector
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: category
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                type: "button",
                                                onClick: ()=>handleRemove(uuid),
                                                children: "X"
                                            })
                                        })
                                    ]
                                }, uuid);
                            })
                        })
                    ]
                })
            })
        ]
    });
}
/* harmony default export */ const Datapoints_TableResults = (TableResults);

;// CONCATENATED MODULE: ./helper/index.js
// ================================== SUPPORTING FUNCTIONS ===============================================//
const isObject = (yourVariable)=>{
    return typeof yourVariable === "object" && !Array.isArray(yourVariable) && yourVariable !== null;
};
const isString = (yourVariable)=>{
    return typeof yourVariable === "string";
}; // export const isArray = (yourVariable) => {
 //   return Array.isArray(yourVariable);
 // };

;// CONCATENATED MODULE: ./components/Datapoints/Query.js



function Query({ state , query , setQuery , getQueryAPI  }) {
    const textRef = (0,external_react_.useRef)(null);
    // =======================(C) TO handle multiselect +query  text search ===================================//
    const handleChange = (e)=>{
        const { name , value  } = e.target;
        console.log(name, value);
        if (name === "query") {
            setQuery((prev)=>({
                    ...prev,
                    [name]: value
                }));
            return;
        }
        //else
        setQuery((prev)=>{
            const found = prev[name].find((each)=>each === value);
            if (found) {
                return {
                    ...prev,
                    [name]: [
                        ...prev[name].filter((each)=>each !== value)
                    ]
                };
            } else {
                return {
                    ...prev,
                    [name]: [
                        ...prev[name],
                        value
                    ]
                };
            }
        });
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        const text = textRef.current.value;
        if (text.trim() !== "") {
            setQuery((prev)=>({
                    ...prev,
                    query: text
                }));
        }
    };
    // ==========================================================//
    const handlePagination = (type)=>{
        if (type === "prev" && +state.current_page !== 1) {
            setQuery((prev)=>({
                    ...prev,
                    page: (+state.current_page - 1).toString()
                }));
        } else if (type === "next" && +state.current_page + 1 !== state.last_page) {
            setQuery((prev)=>({
                    ...prev,
                    page: (+state.current_page + 1).toString()
                }));
        }
    };
    // =========================ISCHECKED=================================//
    const isChecked = (category, value)=>query[category].includes(value);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "QUERIES: ",
                    JSON.stringify(query)
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                        children: "====================MULTI SELECT DROPDOWN===================="
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
                            width: "100%"
                        },
                        children: Object.keys(state["possible_filters"]).map((filterCategory)=>{
                            const filterValues = state["possible_filters"][filterCategory];
                            return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                        children: filterCategory
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        style: {
                                            maxHeight: "150px",
                                            overflowY: "auto"
                                        },
                                        children: filterValues.map((option)=>{
                                            if (isObject(option)) {
                                                const { id , name  } = option;
                                                return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "checkbox",
                                                            defaultChecked: isChecked(filterCategory, id),
                                                            id: id,
                                                            value: id,
                                                            name: filterCategory,
                                                            onChange: handleChange
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                            htmlFor: id,
                                                            children: name
                                                        })
                                                    ]
                                                });
                                            } else {
                                                return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "checkbox",
                                                            defaultChecked: isChecked(filterCategory, option),
                                                            id: option,
                                                            value: option,
                                                            name: filterCategory,
                                                            onChange: handleChange
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                            htmlFor: option,
                                                            children: option
                                                        })
                                                    ]
                                                });
                                            }
                                        })
                                    })
                                ]
                            }, filterCategory);
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                        children: "====================SEARCH BY TEXT===================="
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        style: {
                            width: "100%"
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "text",
                                placeholder: "search...",
                                style: {
                                    width: "80%"
                                },
                                ref: textRef
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "submit",
                                children: "Search"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                        children: "====================PAGINATION===================="
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                onClick: ()=>handlePagination("prev"),
                                children: "Prev"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                children: [
                                    "Current: ",
                                    state["current_page"]
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                onClick: ()=>handlePagination("next"),
                                children: "Next"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                children: [
                                    "Last Page: ",
                                    state["last_page"]
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                children: [
                                    "Total Results: ",
                                    state["total_results"]
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const Datapoints_Query = (Query);

;// CONCATENATED MODULE: ./components/Datapoints/index.js






const INITIAL_STATE = {
    current_page: 1,
    last_page: 753,
    total_results: 15051,
    results: [
        {
            access_type: "public",
            activity_id: "accommodation_type_holiday",
            category: "Accommodation",
            constituent_gases: {
                co2e_total: 0.425,
                co2e_other: null,
                co2: null
            },
            data_quality_flags: [],
            description: "Emission intensity of supply chain in GBP spend on: holiday in the uk/ holiday abroad/ room hire. In actual prices in \xa3s and including VAT. Provided by BEIS/DEFRA in the official report on GHG Emissions of the UK between 1996-2018. Where source emission factors are identical across a variety of activities they have been grouped to avoid confusion - details are documented in the OEFDB data guidance.",
            factor: 0.425,
            factor_calculation_method: "ar4",
            factor_calculation_origin: "source",
            id: "accommodation_type_holiday",
            lca_activity: "unknown",
            name: "Holiday (travel/accommodation)",
            region: "GB",
            region_name: "United Kingdom",
            sector: "Restaurants and Accommodation",
            source: "BEIS",
            source_link: "https://www.gov.uk/government/statistics/uks-carbon-footprint",
            supported_calculation_methods: [
                "ar4"
            ],
            uncertainty: null,
            unit: "kg/GBP",
            unit_type: [
                "Money"
            ],
            uuid: "5c37ee77-488d-4a21-83d7-7c06656eb0ff",
            year: "2018"
        }, 
    ],
    possible_filters: {
        category: [
            ""
        ],
        region: [
            {
                id: "",
                name: ""
            }
        ],
        sector: [
            ""
        ],
        source: [
            ""
        ],
        unit_type: [
            ""
        ],
        year: [
            ""
        ]
    }
};
const INITIAL_QUERY_STATE = {
    category: [],
    region: [],
    sector: [],
    source: [],
    unit_type: [],
    year: [],
    query: "",
    page: "1"
};
function Datapoints() {
    const { 0: state , 1: setState  } = (0,external_react_.useState)(INITIAL_STATE);
    const { 0: checkedResults , 1: setCheckedResults  } = (0,external_react_.useState)({}); //{uuid: {...}, {uuid2: {...}, }}
    const { 0: confirmedResults , 1: setConfirmedResults  } = (0,external_react_.useState)({});
    const { 0: query , 1: setQuery  } = (0,external_react_.useState)(INITIAL_QUERY_STATE);
    const { 0: firstRender , 1: setFirstRender  } = (0,external_react_.useState)(true);
    const { 0: ui , 1: setUi  } = (0,external_react_.useState)({
        isLoading: false,
        message: {
            type: "",
            message: ""
        }
    });
    // =========================(A) FETCH API ON FIRST LOAD=================================//
    (0,external_react_.useEffect)(()=>{
        if (!firstRender) {
            return;
        }
        (async ()=>{
            try {
                setUi((prev)=>({
                        ...prev,
                        isLoading: true
                    }));
                const { data  } = await external_axios_default().get("/api/climatiq/orgadmin/getSearch");
                console.log("data", data);
                setState(data); //to set initial render state
                setUi((prev)=>({
                        ...prev,
                        isLoading: false,
                        message: {
                            type: "success",
                            message: "Successfully fetched"
                        }
                    }));
            } catch (err) {
                setUi((prev)=>({
                        ...prev,
                        isLoading: false,
                        message: {
                            type: "error",
                            message: err.message
                        }
                    }));
            }
        })();
    }, []);
    // =========================(B) TO SET TIMEOUT FOR SUCCESS MESSAGE=================================//
    const { message: { type  } ,  } = ui;
    (0,external_react_.useEffect)(()=>{
        if (type) {
            const timerPointer = setTimeout(()=>{
                setUi((prev)=>({
                        ...prev,
                        message: {
                            type: "",
                            message: ""
                        }
                    }));
            }, 1000);
            return ()=>clearTimeout(timerPointer);
        }
    }, [
        type
    ]);
    // ========================(C) TO handle submit query to backend ==================================//
    const getQueryAPI = (0,external_react_.useCallback)(async ()=>{
        try {
            setUi((prev)=>({
                    ...prev,
                    isLoading: true
                }));
            console.log("query", query);
            const { data  } = await external_axios_default().post("/api/climatiq/orgadmin/getSearch", {
                body: JSON.stringify(query)
            });
            console.log("data", data);
            setState((prev)=>({
                    ...data,
                    possible_filters: {
                        ...prev.possible_filters
                    }
                }));
            setUi((prev)=>({
                    ...prev,
                    isLoading: false,
                    message: {
                        type: "success",
                        message: "Successfully queried"
                    }
                }));
        } catch (err) {
            setUi((prev)=>({
                    ...prev,
                    isLoading: false,
                    message: {
                        type: "error",
                        message: err.message
                    }
                }));
        }
    }, [
        query,
        setState,
        setUi
    ]);
    // =========================USEEFFECT: if detects query, change, call getQueryAPI=================================//
    (0,external_react_.useEffect)(()=>{
        if (firstRender) {
            setFirstRender(false);
            return;
        }
        const timerPointer = setTimeout(()=>getQueryAPI(), [
            1000
        ]);
        ()=>clearTimeout(timerPointer);
    }, [
        query,
        getQueryAPI
    ]);
    // =========================UI LOADER=================================//
    if (ui.isLoading) {
        return /*#__PURE__*/ jsx_runtime_.jsx(UI_Loader, {});
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            ui.message.type && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                style: {
                    backgroundColor: ui.message.type === "success" ? "green" : "red"
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: ui.message.message
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                children: "Datapoints"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Datapoints_Query, {
                setState: setState,
                setUi: setUi,
                state: state,
                query: query,
                setQuery: setQuery,
                getQueryAPI: getQueryAPI
            }),
            state.results.length === 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                children: " NO RESULTS"
            }) : /*#__PURE__*/ jsx_runtime_.jsx(Datapoints_TableResults, {
                results: state.results,
                checkedResults: checkedResults,
                confirmedResults: confirmedResults,
                setCheckedResults: setCheckedResults,
                setConfirmedResults: setConfirmedResults
            })
        ]
    });
}
/* harmony default export */ const components_Datapoints = (Datapoints);


/***/ })

};
;