export async function decodeUInt256(uint256Hex: string): Promise<string | number> {
  const hexString = uint256Hex.replace(/^0+/, '') // Remove leading zeros
  const byteLength = hexString.length / 2
  const bytes = []

  for (let i = 0; i < byteLength; i++) {
    const byte = parseInt(hexString.substr(i * 2, 2), 16) // Get the current byte
    bytes.push(byte)
  }

  const firstByte = BigInt(bytes[0]) // Convert the first byte to a BigInt
  let decodedData

  if (firstByte < BigInt(10)) {
    // If the first byte is in the range of ASCII digits (0-9), decode as number
    decodedData = Number('0x' + uint256Hex)
  } else {
    decodedData = bytes
      .map(byte => String.fromCharCode(byte))
      .filter(char => /[a-zA-Z0-9]/.test(char))
      .join('')
  }

  return decodedData
}
