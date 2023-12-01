import React, { useState } from "react";
import { Menu } from 'antd';
import {
  SettingOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
//import firebase from 'firebase';


const items = [
  {
    label: 'Home',
    key: '',
    icon: <AppstoreAddOutlined />,

  },
  {
    label: 'Username',
    key: 'username',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        //  label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
          {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />

          },
        ],
      },

    ],
  },
  {
    label: 'Login',
    key: 'login',
    icon: <UserOutlined />,

  },
  {
    label: 'Register',
    key: 'register',
    icon: <UserAddOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));
  console.log('state: ', user);

  //const allItems = [...items];

  const loggedInItems = [...items.slice(0, -2)]
  loggedInItems[1].label = user ? user.email.split('@')[0] : 'Username';

  const loggedOutItems = [...items.filter(item => item.key !== 'username')]

  const logOut = () => {
    console.log('in click logout function');
    signOut(auth).then(() => {
      dispatch({
        type: 'LOGOUT',
        payload: null
      });

      navigate('/login');
    }).catch((error) => {
      // An error happened.
    });
  }

  const onClick = (e) => {
    console.log('click ', `/${e.key}`);
    setCurrent(e.key);
    if (e.key === 'logout') {
      logOut();
      return;

    }
    navigate(`/${e.key}`);
  };

  return <Menu
    style={{ justifyContent: 'right' }}
    onClick={onClick}
    selectedKeys={[current]}
    mode="horizontal"
    items={user ? loggedInItems : loggedOutItems}
  />;

}

export default Header;