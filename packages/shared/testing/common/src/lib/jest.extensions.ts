export const createResult = ({
  pass,
  message,
  notMessage,
}: {
  pass: () => boolean
  message: () => string
  notMessage: () => string
}): jest.CustomMatcherResult => ({
  message: () => (pass() ? notMessage() : message()).trim(),
  pass: pass(),
})

export const toThrowSdkErrorWithCode = (value: Error, code: string): jest.CustomMatcherResult =>
  createResult({
    message: () => `expected ${value} to have error code ${code}`,
    notMessage: () => `expected ${value} not to have error code ${code}`,
    pass: () => {
      let errorCode
      try {
        errorCode = JSON.parse(value.message).errorCode
      } catch (e) {
        return false
      }
      return errorCode === code
    },
  })
