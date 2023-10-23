export interface UploadFile {
  /**
   * Data to be uploaded
   */
  file: BlobPart
}

export interface GetFile {
  /**
   * File id to be retrieved
   */
  id: string
}
