import { Container, Service } from 'typedi'
import { Nft } from './service/nft/nft'
import { API_KEY } from './utils/di.tokens'
import { Notification } from './service/notification/notification'
// Question: Validation?

@Service()
export class Tatum {
  nft: Nft = Container.get(Nft);
  notification: Notification = Container.get(Notification);

  constructor(apiKey: string) {
    Container.set(API_KEY, apiKey);
  }
}
