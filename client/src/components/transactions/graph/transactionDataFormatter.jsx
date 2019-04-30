import moment from 'moment';

const transactionDataFormatter = (initialChartData) => {

  let buildUniqueDateArray = (array) => {
    return [...new Set(array.map(obj => {
      let date = moment(obj.extra.created_on).format("MMM Do YY");
      return date
    }))];
  }

  let buildArrayOfDateObjects = (array) => {
    let newArray = [];
    for (let i=0; i<array.length; i++) {
      newArray.push({
        date: array[i],
        Entertainment: 0,
        HousingUtilities: 0,
        PersonalCare: 0,
        FoodGroceries: 0,
      });
    }
    return newArray
  }

  // Save values from the initialArray (big obj of resp.data).
  // Get index of the date from the simple date array.
  // Add the amount for each category key - (messy, ran into trouble updating dynamic property w/o overwriting obj (with date property))
  let addKeysToDateArray = (initialArray,dateArray,buildArray) => {
    for (let i=0; i<initialArray.length; i++) {
      let obj = initialArray[i];
      let fullDate = obj.extra.created_on;
      let date = moment(fullDate).format("MMM Do YY");
      let groupId = obj.extra.group_id;
      let amount = obj.amount.amount;

      let indexOfDate = dateArray.indexOf(date);

      buildArray[indexOfDate].fullDate = fullDate;

      if (groupId === 'Entertainment') {
        buildArray[indexOfDate].Entertainment += amount;
      } else if (groupId === 'Housing & Utilities') {
        buildArray[indexOfDate].HousingUtilities += amount;
      } else if (groupId === 'Personal Care') {
        buildArray[indexOfDate].PersonalCare += amount;
      } else if (groupId === 'Food & Groceries') {
        buildArray[indexOfDate].FoodGroceries += amount;
      } else {
        // this shouldn't hit
      }
    }
    return buildArray
  }

  let sortArray = (array) => {
    return array.sort(function(a, b) {
      let keyA = (a.fullDate);
      let keyB = (b.fullDate);
      return keyA - keyB;
    });
  }

  // Functions called here!!

  // Build simple array of date strings. Build array of objs with date property.
  // Add category properties and fullDate to dateObjectArray. Sort array and update state.
  let uniqueDateArray = buildUniqueDateArray(initialChartData);
  let dateObjectArray = buildArrayOfDateObjects(uniqueDateArray);
  let fullArray = addKeysToDateArray(initialChartData,uniqueDateArray,dateObjectArray);
  let sortedArray = sortArray(fullArray);
  return sortedArray
}

export default transactionDataFormatter;
