// Type definitions for JQuery Appear 1.0
// Project: https://github.com/bas2k/jquery.appear
// Definitions by: Anderson Friaça <https://github.com/AndersonFriaca>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/// <reference types="jquery" />

export interface Options<T> {
    /**
     * Data to pass into callback
     */
    data?: T | undefined;

    /**
     * Callback is called only in first appear
     */
    one?: boolean | undefined;

    /**
     * X accuracy
     */
    accX?: number | undefined;

    /**
     * Y accuracy
     */
    accY?: number | undefined;
}
declare global {
    interface JQuery {
        /**
         * Initialize appear plugin
         */
        appear<T>(callback: (element: HTMLElement, data: T) => void, options?: Options<T>): JQuery;
    }
}
