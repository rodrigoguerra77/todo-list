import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flex, Icon } from '@chakra-ui/react';
import { FiList } from 'react-icons/fi';
import { paths as pathsTodos } from '../../features/todos/paths';

const linkItems = [
  {
    key: 'menu_item_todos',
    to: `/${pathsTodos.TODOS.front}`,
    title: 'Todos',
    icon: FiList,
  },
];

const Menu = () => {
  const { pathname } = useLocation();
  return linkItems.map(item => (
    <Link key={item.key} to={item.to}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontWeight="bold"
        color={pathname === item.to ? 'white' : '#000'}
        bg={pathname === item.to ? 'cyan.400' : 'transparent'}
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        my={1}
      >
        {item.icon && (
          <Icon
            mr="4"
            fontSize="22"
            as={item.icon}
            color={pathname === item.to ? 'white' : '#000'}
            _groupHover={{
              color: 'white',
            }}
          />
        )}
        {item.title}
      </Flex>
    </Link>
  ));
};

export default Menu;
