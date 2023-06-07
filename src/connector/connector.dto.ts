export type DefaultParamsType = { [key: string]: string | number | boolean | undefined }
export type DefaultBodyType = object | object[]

export interface GetUrl<PARAMS = DefaultParamsType> {
  path?: string
  basePath?: string
  params?: PARAMS
}

export interface SdkRequest<PARAMS = DefaultParamsType, BODY = DefaultBodyType> extends GetUrl<PARAMS> {
  body?: BODY
  method?: string
}
