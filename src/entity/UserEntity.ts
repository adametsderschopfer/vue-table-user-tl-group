import {TUserStatus} from "@/classes/MockUsersData";

export default class UserEntity
{
  public placeNumber: number;

  public login: string;

  public confirmedOrders: number;

  public status: TUserStatus;
}
