import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  flexbox,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  Alert,
  Badge,
} from '@chakra-ui/react';
import {
  MdHome,
  MdKeyboardArrowRight,
  MdLocalShipping,
  MdStore,
  MdLocationOn,
  MdPerson,
  MdSettings,
  MdEqualizer,
  MdMotorcycle,
} from 'react-icons/md';

import { BiLogOut } from 'react-icons/bi';

import React from 'react';
import LoginForm from './Forms/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, Switch } from 'react-router-dom';
import OrdersList from '../components/Tables/OrdersList';
import Messengers from '../components/Tables/Messengers';
import UserCreationForm from '../components/Forms/UserCreationForm';
import Couriers from '../components/Tables/Couriers';
import Branches from '../components/Tables/Branches';
import CourierCreationForm from '../components/Forms/CourierCreationForm';
import MessengerEditUser from '../components/Forms/MessengerEditUser';
import { logoutUser } from '../store/reducers/usersReducer';
import CourierEdit from './Forms/CourierEdit';
import OrdersNotAssigned from "../components/Tables/OrdersNotAssigned"

const itemsSidebar = {
  courier: [
    { name: 'Home', url: '', icon: MdHome },
    { name: 'Pedidos', url: '/courier/orders', icon: MdMotorcycle },
    { name: 'Cadetes', url: '/messengers', icon: MdPerson },
    { name: 'Reportes', url: '/reports', icon: MdEqualizer },
  ],
  messenger: [
    { name: 'Home', url: '', icon: MdHome },
    { name: 'Mis Pedidos', url: '/messenger/orders', icon: MdMotorcycle },
    { name: 'Pedidos Sin Asignar', url: '/notassigned', icon: MdLocationOn },
  ],

  ecommerce: [
    { name: 'Home', url: '', icon: MdHome },
    { name: 'Pedidos', url: '/orders', icon: MdMotorcycle },
    { name: 'Sucursales', url: '/branches', icon: MdStore },
    { name: 'Mensajerías', url: '/couriers', icon: MdLocalShipping },
    { name: 'Reportes', url: '/reports', icon: MdEqualizer },
  ],
};

export default function Sidebar() {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedUser } = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };

  const NavItem = ({ icon, children, url, ...rest }) => {
    // const { icon, children, ...rest,url } = props;
    return (
      <Flex
        onClick={() => history.push(url)}
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue('inherit', 'gray.400')}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.900'),
          color: useColorModeValue('gray.900', 'gray.200'),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            //   _groupHover={{
            //     color: useColorModeValue("gray.600", "gray.300"),
            //   }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <>
      <Box
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
        ml={2}
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue('brand.500', 'white')}
            fontWeight="semibold"
          >
            CRUCE
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          {/* <NavItem icon={MdHome}>Home</NavItem>

        <NavItem icon={MdLocationOn}>Pedidos</NavItem>
        <NavItem icon={MdStore}>Sucursales</NavItem>
        <NavItem icon={MdLocalShipping}>Mensajerias</NavItem> */}

          {itemsSidebar[loggedUser.role].map((item) => (
            <NavItem
              url={`/dashboard${item.url}`}
              key={item.name}
              icon={item.icon}
            >
              {item.name}
            </NavItem>
          ))}

          <Box pos="absolute" pb="10" bottom="0" w="full" textAlign="center">
            <ButtonGroup variant="outline" spacing="6">
              <Button colorScheme="blue" onClick={logout}>
                <BiLogOut size="20px" />
                {'Logout'}
              </Button>
            </ButtonGroup>
          </Box>
        </Flex>
      </Box>
    </>
  );
  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH="100vh"
    >
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Box as="main" p="4">
          <Switch>
            <Route exact path="/dashboard">
              <h1>
                Nombre: {loggedUser.fullName.toUpperCase()} - Rol:{' '}
                {loggedUser.role}
              </h1>
            </Route>
            <Route
              exact
              path="/dashboard/messenger"
              render={() => <UserCreationForm />}
            />
            <Route
              exact
              path="/dashboard/orders"
              render={() => <OrdersList />}
            />
            <Route
              exact
              path="/dashboard/messengers"
              render={() => <Messengers />}
            />
            <Route
              exact
              path="/dashboard/courier"
              render={() => <CourierCreationForm />}
            />
            <Route
              exact
              path="/dashboard/couriers"
              render={() => <Couriers />}
            />
            <Route
              path="/dashboard/messenger/:id"
              render={() => <MessengerEditUser />}
            />
            <Route
              path="/dashboard/courier/:id"
              render={() => <CourierEdit />}
            />
            <Route exact path="/dashboard/branches" render={() => <Branches />} />
            <Route exact path="/dashboard/notassigned" render={() => <OrdersNotAssigned />} />

          </Switch>
        </Box>
      </Box>
    </Box>
  );
}
