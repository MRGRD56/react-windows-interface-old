export function vif<TResult>(expression: (() => boolean) | boolean, value: TResult): TResult | string {
    const exp = typeof expression === "function"
        ? expression()
        : expression;

    return exp ? value : "";
}

// type ClassesArray = (string | [string] | [boolean, string])[];

type BoolExp = boolean | (() => boolean);

export function classes(classesObj: Record<string, BoolExp>): string {
    return Object.keys(classesObj)
        .filter(key => Object.prototype.hasOwnProperty.call(classesObj, key))
        .map(key => {
            return {
                key: key,
                value: classesObj[key]
            };
        })
        .filter(kv => {
            return (typeof kv.value) === "function"
                ? (<() => boolean>kv.value)()
                : kv;
        })
        .map(kv => kv.key)
        .join(" ");
}
