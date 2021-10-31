import { SmartContractMethodInvocation } from '../model'

export const buildSmartContractMethodInvocation = (
  body: any,
  params: any[],
  methodName: string,
  abi: any[],
  clazz: SmartContractMethodInvocation = new SmartContractMethodInvocation()
) => {
  const r = clazz
  r.fee = body.fee
  r.nonce = body.nonce
  r.fromPrivateKey = body.fromPrivateKey
  r.signatureId = body.signatureId
  r.index = body.index
  r.amount = body.amount
  r.contractAddress = body.contractAddress
  r.methodName = methodName
  r.params = params
  r.methodABI = abi.find((a) => a.name === r.methodName)

  return r
}
