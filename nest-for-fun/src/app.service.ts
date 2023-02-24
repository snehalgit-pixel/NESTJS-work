import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  store = 0;
  public stores: Store[] = [];

  // getHello(): string {
  //   return 'Hello World! %4*@#4!';
  // }

  // apiCallRec(obj: { count: number }) {
  //   this.store += obj.count;
  //   return 'Store incremented';
  // }

  // apiCallRes() {
  //   return this.store;
  // }

  public createNewStore(parametersForStore: Store): void {
    const data: Store = {
      name: parametersForStore.name,
    };
    if (!parametersForStore?.account) {
      data.account = 0;
    } else {
      data.account = parametersForStore.account;
    }
    this.stores.push(data);
  }

  public getAllStores(): Store[] {
    return this.stores;
  }

  public getStoreByName(name: string): Store {
    const storeFound: Store = this.stores.find((store: Store) => {
      return store.name === name;
    });
    return storeFound;
  }

  public deleteStore(name: string): boolean {
    const indexOfTarget = this.stores.findIndex((store: Store) => {
      return store.name === name;
    });
    this.stores.splice(indexOfTarget, 1);
    if (indexOfTarget !== -1) {
      return true;
    }
    return false;
  }

  public modifyStore(name: string, modifyParameters: Store): boolean {
    const indexOfTarget = this.stores.findIndex((store: Store) => {
      return store.name === name;
    });
    if (indexOfTarget != -1) {
      this.stores[indexOfTarget] = modifyParameters;
      return true;
    }
    return false;
  }
}

export interface Store {
  name: string;
  account?: number;
}
