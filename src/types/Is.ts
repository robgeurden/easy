import { isInstance as asInstance, isObject as asObject } from "class-validator";
import { Constructor } from "./Constructor";

export const isDefined = (o?: unknown): boolean => o !== undefined && o !== null;

export const isEmpty = (o?: unknown): boolean => o === "" || o === null || o === undefined;

export const isIn = (o: unknown, values: unknown[]): boolean => isArray(values) && values.some(v => v === o);

export const isString = (o?: unknown): o is string => o instanceof String || typeof o === "string";

export const isObject = (o?: unknown): o is Object => asObject(o);

export const isArray = <T = any>(o?: unknown): o is Array<T> => isDefined(o) && o instanceof Array;

export const isInstance = <T>(o: unknown, ctor: Constructor<T>): o is T => asInstance(o, ctor);
