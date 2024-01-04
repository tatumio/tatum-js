export const EnvUtils = {
  isBrowser: () => typeof window !== 'undefined',
  isProcessAvailable: () => typeof process !== 'undefined',
  isDevelopment: () => EnvUtils.isProcessAvailable() && process?.env?.NODE_ENV === 'development',
}
