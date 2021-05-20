import dayjs from 'dayjs';


/*
 * *** Util function to generate a random number from a range
 * *** Source: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 */
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


// *** Function for getting a list of random values as a string. ***
export const getRandomValuesList = (valuesArray, minValueCount, maxValueCount) => {
  // --- Glossary for some special array properties ---
  const SpecialArrayProperty = {
    FIRST_ELEMENT_INDEX: 0,
    LENGTH_SHIFT: 1,
  };

  /*
   * --- Based on the existing array of stars (filmStars),
   * --- create a new one using the «Set» object
   */
  const newValuesArray = new Set();
  const randomValuesListCount = getRandomInteger(minValueCount, maxValueCount);

  /*
   * --- Using the add-method of the "Set" object, we generate an array of random stars.
   * --- Due to the peculiarity of the add-method, only unique values appear inside the array.
   */
  for (let i = 0; i < randomValuesListCount; i++) {
    const randomValue = valuesArray[getRandomInteger(SpecialArrayProperty.FIRST_ELEMENT_INDEX, valuesArray.length - SpecialArrayProperty.LENGTH_SHIFT)];
    newValuesArray.add(randomValue);
  }

  /*
   * --- The function returns a string,
   * --- into which a new array of random values is converted.
   */
  return Array.from(newValuesArray).join(', ');
};


// *** Function for humanization date ***
export const humanizeDate = (dateValue, dateFormat) => {
  return dayjs(dateValue).format(dateFormat);
};
