/**
 *  Sort an array of objects by object order.
 * @param {Array.<Object>} data - Array of objects.
 * @param {String} columnName - Object name to sort by.
 * @param {String} order - Ascending or Descending.
 * @returns {Array.<Object>} Sorted array of objcts.
 */
export const sortByObject = (data, columnName, order) => {
  let columnElements = [];
  let sortedData = [];

  for (let i = 0; i < data.length; i++) {
    columnElements.push(data[i][columnName]);
  }
  // Sort the elements in ascending or descending order
  columnElements.sort();
  if (order === "descending") {
    columnElements.reverse();
  }

  for (let element of columnElements) {
    let obj = data.find((ob) => ob[columnName] === element);
    sortedData.push(obj);
  }
  return sortedData;
};
