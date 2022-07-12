import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../store';
import { getLocalStorage, removeAuthLocalStorage } from './localStorage';
import { checkUserRequest } from '../store/ducks/check-user/actions';
import { CheckUserState } from '../store/ducks/check-user/types';

const CheckLogedUser = (): JSX.Element => {
  const checkUser = useSelector<ApplicationState, CheckUserState>(store => store.checkUser);
  const dispatch = useDispatch();
  const logoutUser = (): void => {
    removeAuthLocalStorage();
    window.location.href = '/';
  };
  if (checkUser.call && !checkUser.loading && !checkUser.logged) {
    const keepConnected = getLocalStorage('keepConnected');
    if (keepConnected && keepConnected === 'true') {
      dispatch(checkUserRequest());
    } else {
      logoutUser();
    }
  }
  return <></>;
};

export default CheckLogedUser;
