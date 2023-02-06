import { Container, Service } from 'typedi'
import { Nft } from './service/nft/nft'
import { API_KEY } from './utils/di.tokens'

// Question: Validation?

@Service()
export class Tatum {
  nft: Nft = Container.get(Nft);

  constructor(apiKey: string) {
    Container.set(API_KEY, apiKey);
  }

}
