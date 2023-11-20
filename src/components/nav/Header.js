import React, { useState } from "react";
import { Menu } from 'antd';
import { SettingOutlined, AppstoreAddOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";


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

  const onClick = (e) => {
    console.log('click ', `/${e.key}`);
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };
  
  return <Menu style={{ justifyContent: 'right' }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;

}

export default Header;