import { isDefined, result, Result } from "../types";
import { meta } from "../utils";
import { Constraint } from "./Contraints";

export type Validator = { property: string, constraint: Constraint, message: string };

const parse = (subject: unknown, v: Validator): Result => {
  const message = v.message
    .replace("$property", `property '${v.property}'`)
    .replace("$subject", subject.constructor.name)
    .replace("$actual", `'${(subject as any)[v.property]}'`);
  return result(message, subject.constructor.name, v.property);
};

export const validate = (subject?: unknown): Result[] => {
  return !isDefined(subject)
    ? [result("Object can not be validated", "easy")]
    : meta(subject).properties()
      .map(p => p.get<Validator>("constraint"))
      .filter(v => isDefined(v))
      .map(v => !v.constraint((subject as any)[v.property]) ? parse(subject, v) : undefined)
      .filter(r => isDefined(r));
};

export const validateReject = <T>(subject: T): Promise<T> => {
  const results = validate(subject);
  return results.length === 0 ? Promise.resolve(subject) : Promise.reject(results);
};
