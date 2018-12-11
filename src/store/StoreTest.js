import { observable, action, computed } from 'mobx';

class StoreTest{
  @observable name = 'jay';

  @action reName = () => {
    this.name = 'newName';
  }
}

const storeTest = new StoreTest();

export default storeTest;