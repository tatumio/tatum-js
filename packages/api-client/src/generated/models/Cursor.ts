/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Cursor pagination, used to get next page or previous page of results. The size of result is defined by the `pageSize` parameter.
 * The cursor is a base64 encoded string, user can get the value from a response in the `nextPage` or `prevPage` field.
 * If the nextPage or prevPage fields are not present in the response body, pagination is usually available with the `offset` and `pageSize` parameters.
 *
 */
export type Cursor = string;