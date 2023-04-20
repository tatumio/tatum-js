export interface GetUrl {
  path?: string
  basePath?: string
  params?: { [key: string]: string | number | boolean | undefined }
}

export interface SdkRequest extends GetUrl {
  body?: object | object[]
  method?: string
}
