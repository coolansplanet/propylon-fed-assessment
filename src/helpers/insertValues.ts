/**
 * ```typescript
 * //Example:
 * insertValues
 *     .from({tableId: 'weather', page: 4})
 *     .into("https://my-page.com/table/{{tableId}}/{{page}}")
 *
 * //output: https://my-page.com/table/weather/4
 * ```
 */

const insertValues = {
  from: (anObject = {}) => ({
    into: (aString = "") =>
      Object.entries(anObject).reduce((finalResult, [key, value]) => {
        return finalResult.replace(`{{${key}}}`, value as string);
      }, aString),
  }),
};

export default insertValues;
