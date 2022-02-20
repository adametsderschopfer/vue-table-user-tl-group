import UserEntity from '@/entity/UserEntity';
import Helper from '@/classes/Helper';

export type TUserStatus = {
  name: string;
  id: number;
};

export default class MockUsersData
{
  public static statusList: TUserStatus[] = [
    {
      name: 'Поставщик аксессуаров',
      id: 1
    },
    {
      name: 'Конкурент минздрава',
      id: 2
    },
    {
      name: 'рыбак',
      id: 3
    },
    {
      name: 'охотник',
      id: 4
    },
    {
      name: 'Ценитель красоты',
      id: 5
    },
  ];

  public static names: string[] = [
    'abandoned',
    'able',
    'aggressive',
    'agile',
    'agitated',
    'agonizing',
    'agreeable',
    'ajar',
    'infamous',
    'infantile',
    'infatuated',
    'inferior',
    'infinite',
    'informal',
    'innocent',
  ];

  public static getStatus(idx: number): TUserStatus
  {
    return MockUsersData.statusList[idx];
  }

  static generateName()
  {
    return MockUsersData.names[Helper.getRandomNumberByRange(MockUsersData.names.length)];
  }

  public static create(length: number): Array<UserEntity>
  {
    const users: Array<UserEntity> = Array(length);

    for (let userIndex = 0; userIndex < users.length; userIndex++) {
      const newEntity = new UserEntity();

      newEntity.placeNumber = userIndex + 1;
      newEntity.login = `${MockUsersData.generateName()}@gmail.com`;
      newEntity.confirmedOrders = Helper.getRandomNumberByRange(1000);
      newEntity.status = MockUsersData.getStatus(
        Helper.getRandomNumberByRange(MockUsersData.statusList.length),
      );

      users[userIndex] = newEntity;
    }

    return users;
  }
}
