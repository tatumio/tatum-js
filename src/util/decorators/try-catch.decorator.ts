// eslint-disable-next-line @typescript-eslint/ban-types
export function log(target: Function) {
  for (const propertyName in target.prototype) {
    const propertyValue = target.prototype[propertyName];
    const isMethod = propertyValue instanceof Function;
    if (!isMethod)
      continue;

    const descriptor = getMethodDescriptor(propertyName);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: object[]) {
      console.log("The method args are: " + JSON.stringify(args));
      const result = originalMethod.apply(this, args);
      console.log("The return value is: " + result);
      return result;
    };

    Object.defineProperty(target.prototype, propertyName, descriptor);
  }

  function getMethodDescriptor(propertyName: string): PropertyDescriptor {
    // eslint-disable-next-line no-prototype-builtins
    if (target.prototype.hasOwnProperty(propertyName))
      {
        return Object.getOwnPropertyDescriptor(target.prototype, propertyName) as PropertyDescriptor;
      }

    // create a new property descriptor for the base class' method
    return {
      configurable: true,
      enumerable: true,
      writable: true,
      value: target.prototype[propertyName]
    };
  }
}
