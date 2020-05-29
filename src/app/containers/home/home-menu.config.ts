import {MenuItems} from "@global/entities";

export const menuItems: Array<MenuItems> = [
  {
    label: 'LBL_MENU.VOTES',
    route: '/votes',
    icon: 'how_to_vote'
  },
  {
    label: 'LBL_MENU.GROUPS',
    route: '/groups',
    icon: 'group'
  },
  {
    label: 'LBL_MENU.PROFILE',
    route: '/profile',
    icon: 'person'
  },
  {
    label: 'LBL_MENU.SIGN_OUT',
    action: 'sign_out',
    icon: 'exit_to_app'
  }
];
