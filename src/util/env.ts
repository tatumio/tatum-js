export const EnvUtils = {
  isBrowser: () => typeof window !== 'undefined',
  isProcessAvailable: () => typeof process !== 'undefined',
  isDevelopment: () =>
    (EnvUtils.isProcessAvailable() && (!process.env?.NODE_ENV || process.env?.NODE_ENV === 'development')) ||
    (EnvUtils.isBrowser() && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)),
}
