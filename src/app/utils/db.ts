import {User} from './user';
import {Treatment} from './treatment';

export class Db {
  constructor() {}

  employees = [
    new User('1', "Mo", "Mortada", "0700123123", ""),
    new User('2', "David", "Iliefski", "0700123423", ""),
    new User('3', "Simon", "Mare", "0700545543", ""),
    new User('4', "Carl", "Albertsson", "0700123759", ""),
    new User('5', "Joachim", "Von Anka", "0700543987", "")
  ]


  getEvents(){

  }
  getEmployees(){
    return this.employees;
  }
  getCustomers(){

  }
  getTreatments(){

  }
}
