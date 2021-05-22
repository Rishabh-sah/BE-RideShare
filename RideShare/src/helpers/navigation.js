import { StackActions, NavigationActions } from 'react-navigation'; //StackActions

// reset navigation to welcomepage
const resetToWelcomePage = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'WelcomePage' })],
});

const resetToDrawer = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Drawers' })],
});

export default {
  resetToWelcomePage,
  resetToDrawer
};