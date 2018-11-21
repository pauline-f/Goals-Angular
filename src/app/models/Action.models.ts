export class Action {
    constructor (public id: string, 
                 public action: string,
                 public mon: boolean, 
                 public tue: boolean,
                 public wed: boolean, 
                 public thu: boolean,
                 public fri: boolean, 
                 public sat: boolean,
                 public sun: boolean) {
    }
}