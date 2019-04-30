import { observable, action, computed } from 'mobx';

class StoreTest{
  @observable user = ['user-a', 'user-b'];
  
  @action addUser = name => {
    this.user.push(name);
  }
  @action delLastUser = () => {
    this.user.pop();
  }
}

const storeTest = new StoreTest();

export default storeTest;