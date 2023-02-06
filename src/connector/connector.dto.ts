export interface GetUrl {
  path: string,
  params?: { [key: string]: string }
}

export interface Post extends GetUrl {
  body: object
}
