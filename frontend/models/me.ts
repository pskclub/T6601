import { IUser } from '~/models/user'

export interface IMeItem extends IUser {
  access_token: string
}
