export interface GetUrl {
  path: string
  params?: { [key: string]: string | undefined }
}

export interface SdkRequest extends GetUrl {
  body?: object | object[]
  method?: string
}
