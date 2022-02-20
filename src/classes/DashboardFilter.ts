import {ActionContext} from "vuex";
import {InitialStateImpl} from "@/store/types";
import {Router} from "@/router";
import {LocationQuery} from "vue-router";
import UserEntity from "@/entity/UserEntity";

const availableQueryList =
  {
    CONFIRMED_ORDERS_START: 'confirmedOrdersStart',
    CONFIRMED_ORDERS_END: 'confirmedOrdersEnd',
    LOGIN: 'login',
    STATUS_ID: 'statusId',
  }

export default class DashboardFilter
{
  public static getFilterQueryList(queryList: LocationQuery): Record<any, any>
  {
    let list = {};

    if (Object.keys(queryList).length) {
      for (const queryListKey in queryList) {
        if (!queryList.hasOwnProperty(queryListKey)) {
          continue;
        }

        const foundKey = Object.values(availableQueryList).findIndex((i: string) => i === queryListKey);

        if (foundKey !== -1) {
          list = {
            ...list,
            [queryListKey]: Object.keys(availableQueryList)[foundKey]
          }
        }
      }
    }

    return list;
  }

  public static async addQuery(key: string, value: string | number): Promise<void>
  {
    await Router.replace({
      name: "dashboard", query: {
        ...Router.currentRoute.value.query,
        [key]: value,
      }
    });
  }

  public static async removeQuery(key: string)
  {
    const query = Object.assign({}, Router.currentRoute.value.query);
    delete query[key];

    await Router.replace({
      name: "dashboard", query: query,
    });
  }

  public static async filterUsers(
    type: string,
    value: string,
    context: ActionContext<InitialStateImpl, InitialStateImpl>
  )
  {
    let result: UserEntity[] = context.getters.getUsers.filter(
      function (_user: UserEntity)
      {
        switch (type) {
          case 'CONFIRMED_ORDERS_START': {
            return _user.confirmedOrders >= parseInt(value, 10);
            break;
          }

          case 'CONFIRMED_ORDERS_END': {
            return _user.confirmedOrders <= parseInt(value, 10);
            break;
          }

          case 'LOGIN': {
            return _user.login.match(value);
            break;
          }

          case 'STATUS_ID': {
            if (value === 'all') {
              return true;
              break;
            }

            return _user.status.id.toString() === value;
            break;
          }

          default: {
            console.log('unknown type -> ', type)
          }
        }
      }
    );

    context.commit('setUsers', result);
  }

  public static async action(
    context: ActionContext<InitialStateImpl, InitialStateImpl>,
    props: TDashboardFilterActionProps,
  )
  {
    const query = Router.currentRoute.value.query;
    // @ts-ignore
    const filterType = availableQueryList[props.filterType];

    if (filterType) {
      if (props.value) {
        await DashboardFilter.addQuery(
          filterType,
          props.value
        );

        context.commit('setActiveFilterStatus', true);
      } else {
        await DashboardFilter.removeQuery(
          filterType,
        );
      }
    }

    const list = DashboardFilter.getFilterQueryList(Router.currentRoute.value.query);
    const _value = props.value ? props.value.toString() : '';

    async function filterFields()
    {
      for (const queryKey in list) {
        if (!list.hasOwnProperty(queryKey)) {
          continue;
        }

        await DashboardFilter.filterUsers(
          list[queryKey],
          // @ts-ignore
          Router.currentRoute.value.query[queryKey],
          context
        );
      }
    }

    switch (props.filterType) {
      case 'CHECK': {
        await filterFields();
        break;
      }

      case 'CLEAR': {
        for (const queryKey of Object.keys(list)) {
          await DashboardFilter.removeQuery(queryKey);
        }
        break;
      }

      default: {
        await context.commit('setUsers', context.getters.getInitialUsers);
        await filterFields();
      }
    }

    queueMicrotask(function ()
    {
      const updatedQueries = DashboardFilter.getFilterQueryList(Router.currentRoute.value.query);

      if (!Object.keys(updatedQueries).length) {
        context.commit('setActiveFilterStatus', false);
        context.commit('setUsers', context.getters.getInitialUsers);
      } else {
        context.commit('setActiveFilterStatus', true);
      }
    });
  }
}

type TDashboardFilterActionProps = {
  value: string | number;
  filterType: string;
}