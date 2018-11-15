import { Action } from '../models/Action.models';

export class Goal {
    constructor (public id: string, public goal: string, public actions: Action[]) {
    }
}