import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { CONFIG, ErrorUtils, ResponseDto } from '../../util'
import { TatumConfig } from '../tatum'
import { UploadFile } from './ipfs.dto'

@Service({
  factory: (data: { id: string }) => {
    return new Ipfs(data.id)
  },
  transient: true,
})
export class Ipfs {
  protected readonly connector: TatumConnector
  protected readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.config = Container.of(this.id).get(CONFIG)
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  /**
   * Upload file to the IPFS storage.
   * @param body Body of the request with file to be uploaded.
   * @returns ResponseDto<{txId: string}> IPFS hash id of the uploaded file.
   */
  async uploadFile(body: UploadFile): Promise<ResponseDto<{ ipfsHash: string }>> {
    return ErrorUtils.tryFail(() =>
      this.connector.uploadFile<{ ipfsHash: string }>({
        path: `ipfs`,
        body: body.file,
      }),
    )
  }
}
