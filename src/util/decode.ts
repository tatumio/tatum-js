export function decodeUInt256(hex: string): number {
  const formattedHex = hex.replace(/^0x/, '') // Remove 0x
  return Number('0x' + formattedHex)
}

export function decodeHexString(hex: string): string {
  const formattedHex = hex.replace(/^(0x)?0+/, '') // Remove 0x and leading zeros
  const byteLength = formattedHex.length / 2
  const bytes = []

  for (let i = 0; i < byteLength; i++) {
    const byte = parseInt(formattedHex.substr(i * 2, 2), 16) // Get the current byte
    bytes.push(byte)
  }

  return bytes
    .map((byte) => String.fromCharCode(byte))
    .filter((char) => /[a-zA-Z0-9]/.test(char))
    .join('')
}
