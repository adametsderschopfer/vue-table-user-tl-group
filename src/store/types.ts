import UserEntity from "@/entity/UserEntity";

export type THeadField = {
  title: string;
};

export interface InitialStateImpl
{
  users: Array<UserEntity>;
  initialUsers: Array<UserEntity>;
  dashboardHeadFields: Array<THeadField>;
  activeFilterStatus: boolean;
}
