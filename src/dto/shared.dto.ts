export interface IdDto {
  id: string
}

export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ResponseDto<T> {
  data: T
  status: Status,
  error?: string
}
