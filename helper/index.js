// ================================== SUPPORTING FUNCTIONS ===============================================//

export const isObject = (yourVariable) => {
  return typeof yourVariable === "object" && !Array.isArray(yourVariable) && yourVariable !== null;
};

export const isString = (yourVariable) => {
  return typeof yourVariable === "string";
};

// export const isArray = (yourVariable) => {
//   return Array.isArray(yourVariable);
// };
