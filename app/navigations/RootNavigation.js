import * as React from 'react';
import {DrawerActions, StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function reset(name, params) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name, params}],
  });
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
}
