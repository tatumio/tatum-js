import { Method } from 'axios'

export interface GetUrl {
  path: string
  params?: { [key: string]: string | undefined }
}

export interface Request extends GetUrl {
  body?: object
  method?: Method
}
