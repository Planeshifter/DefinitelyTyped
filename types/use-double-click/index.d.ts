// Type definitions for use-double-click 1.0
// Project: https://github.com/tim-soft/use-double-click
// Definitions by: Matthew Peveler <https://github.com/MasterOdin>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { MouseEvent, MutableRefObject, RefObject } from "react";

declare function useDoubleClick<T = unknown>(options: {
    /** Dom node to watch for double clicks */
    ref: RefObject<T> | MutableRefObject<T>;
    /** The amount of time (in milliseconds) to wait before differentiating a single from a double click. Defaults to 300. */
    latency?: number | undefined;
    /** A callback function for single click events */
    onSingleClick?: ((e: MouseEvent) => void) | undefined;
    /** A callback function for double click events */
    onDoubleClick?: ((e: MouseEvent) => void) | undefined;
}): void;

export = useDoubleClick;
