export type DefaultParamsType = { [key: string]: string | number | boolean | undefined }
export type DefaultBodyType = object | object[] | FormData

export interface GetUrl<PARAMS = DefaultParamsType> {
  path?: string
  basePath?: string
  params?: PARAMS
  isDownload?: boolean
}

export interface SdkRequest<PARAMS = DefaultParamsType, BODY = DefaultBodyType> extends GetUrl<PARAMS> {
  body?: BODY
  method?: string
}

export interface FileUploadRequest<PARAMS = DefaultParamsType> extends SdkRequest<PARAMS, BlobPart> {
  body: BlobPart
}
