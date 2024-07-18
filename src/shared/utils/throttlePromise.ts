export function throttlePromise<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let lastCall = 0;
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>): Promise<ReturnType<T>> {
    const now = new Date().getTime();

    return new Promise<ReturnType<T>>((resolve, reject) => {
      const later = () => {
        lastCall = now;
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        resolve(func(...args));
      };

      if (now - lastCall >= wait) {
        later();
      } else {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait - (now - lastCall));
      }
    });
  };
}
