/** @deprecated use `TargetRef<T>` or `TargetRef` instead */
export declare type ElementOrRef<T extends EventTarget> = NonNullable<TargetRef<T>>;
/**
 * Implies the a reference type of a event target or event target it self
 */
export declare type TargetRef<T extends EventTarget = EventTarget> = T | null | {
    readonly current: T | null;
};
/**
 * Infer the event target type from a `TargetRef` or a selector string,
 * specifically the selector string will be targeted to `Element`
 */
export declare type InferTargetRef<T> = T extends string ? Element : T extends object & {
    current: infer R | null;
} ? R : NonNullable<T>;
export declare function getElement(ref: null): null;
/**
 * Get the html element from a html selector
 * @param selectors html tag selector
 */
export declare function getElement<K extends keyof HTMLElementTagNameMap>(selectors: K | null): HTMLElementTagNameMap[K] | null;
/**
 * Get the svg element from a svg selector
 * @param selectors svg tag selector
 */
export declare function getElement<K extends keyof SVGElementTagNameMap>(selectors: K | null): SVGElementTagNameMap[K] | null;
/**
 * Get the underneath event target object from a target ref or a selector string
 * @param ref a target ref or a selector string
 */
export declare function getElement<T extends TargetRef | string>(refOrElement: T): InferTargetRef<T> | null;
export declare function getWindow(): (Window & typeof globalThis) | null;
export declare function getDocument(): Document | null;
/**
 * Get the root html ref
 * @returns html element ref
 */
export declare function getDocumentElement(): HTMLElement | null;
export declare type Unsubscribe = () => void;
export declare type StateSetter<T> = (prev: T) => T;
export declare type InitSetter<T> = () => T;
export declare type HookState<T> = T | InitSetter<T> | StateSetter<T>;
export declare function resolveState<T>(state: InitSetter<T>): T;
export declare function resolveState<T, E extends T>(state: StateSetter<T>, current: E): T;
export declare function resolveState<T, E extends T>(state: HookState<T>, current?: E): T;
