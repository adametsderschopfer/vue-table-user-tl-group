import {createStore} from 'vuex';
import MockUsersData from '@/classes/MockUsersData';
import {InitialStateImpl, THeadField} from "@/store/types";
import UserEntity from "@/entity/UserEntity";
import DashboardFilter from "@/classes/DashboardFilter";

function getInitialState(): InitialStateImpl
{
  const users = MockUsersData.create(25);

  return {
    initialUsers: users,
    users: MockUsersData.create(25),

    dashboardHeadFields: [
      {
        title: 'Место',
      },
      {
        title: 'Логин',
      },
      {
        title: 'Подтвержденные заказы',
      },
      {
        title: 'Статус',
      },
    ],

    activeFilterStatus: false,
  };
}

export default createStore<InitialStateImpl>({
  state: getInitialState(),

  getters: {
    getUsers({users}): Array<UserEntity>
    {
      return users;
    },
    getDashboardHeadFields({dashboardHeadFields}): Array<THeadField>
    {
      return dashboardHeadFields;
    },
    getActiveFilterStatus({activeFilterStatus}): boolean
    {
      return activeFilterStatus;
    },
    getInitialUsers({initialUsers}): Array<UserEntity>
    {
      return initialUsers;
    },
  },

  mutations: {
    setActiveFilterStatus(state: InitialStateImpl, payload: boolean)
    {
      state.activeFilterStatus = payload;
    },
    setUsers(state: InitialStateImpl, payload: Array<UserEntity>)
    {
      state.users = payload;
    }
  },

  actions: {
    setDashboardFilter: DashboardFilter.action,
  },
});
