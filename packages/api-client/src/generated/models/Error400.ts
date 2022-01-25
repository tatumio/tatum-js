/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error400 = {
    /**
     * validation.failed
     */
    errorCode: string;
    /**
     * Request validation failed. Please see data for additional information.
     */
    message: string;
    /**
     * 400
     */
    statusCode: number;
    data: Array<{
        /**
         * Request object present in the body of the HTTP request
         */
        target: any;
        /**
         * Value of the target object which validation is wrong. Can be of any data type, example here is using type number.
         */
        value?: number;
        /**
         * Property name of the target object which validation is wrong
         */
        property?: string;
        /**
         * Object of failed constraints for the target object. Key is the constraint, value is detailed description of the failed constraint.
         */
        constraints?: any;
    }>;
}
