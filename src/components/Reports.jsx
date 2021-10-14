import React, { useState, useEffect, useCallback } from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { TriangleUpIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getToken from '../utils/getToken';
import {
  calculateDelivered,
  deliveredAvg,
  calculateNotAsign,
  notAsignAvg,
  calculateOnItsWay,
  onItsWayAvg,
  calculatePendings,
  pendingsAvg,
  calculateReturned,
  returnedAvg,
  countCouriers,
} from '../utils/metrics';
import { convertDate } from '../utils/convertDate';
import { Calendar } from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';

const Reports = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [ordersFilter, setOrdersFilter] = useState([]);

  console.log('ORDERS --> ', orders);
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser._id;

  // trae metricas generales
  useEffect(() => {
    if (loggedUser.role === 'ecommerce') {
      axios
        .get('http://localhost:3001/api/order', getToken())
        .then((res) => setOrders(res.data));
    } else if (loggedUser.role === 'messenger') {
      axios
        .post(
          `http://localhost:3001/api/order/myorders/${userId}`,
          {},
          getToken()
        )
        .then((res) => setOrders(res.data))
        .catch((e) => console.log(e));
    } else if (loggedUser.role === 'courier') {
      axios
        .post('http://localhost:3001/api/order/', {}, getToken())
        .then((res) => setOrders(res.data))
        .catch((e) => console.log(e));
    }
  }, []);

  // trae metricas por fechas
  const [fechaDesde, setFechaDesde] = useState();
  const [fechaHasta, setFechaHasta] = useState();

  const onChangeDesde = useCallback(
    (fechaDesde) => {
      setFechaDesde(fechaDesde);
    },
    [setFechaDesde]
  );
  const onChangeHasta = useCallback(
    (fechaHasta) => {
      setFechaHasta(fechaHasta);
    },
    [setFechaHasta]
  );

  // Modal para calendario
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const finalRef = React.useRef();
  const a = fechaDesde ? convertDate(fechaDesde) : '2021-01-01';
  const b = fechaHasta ? convertDate(fechaHasta) : convertDate(new Date());

  console.log('fecha a: ', a);
  console.log('fecha b: ', b);

  useEffect(() => {
    axios
      .post(
        'http://localhost:3001/api/order/filterecommerce',
        { fechaDesde: a ? a : '', fechaHasta: b ? b : '', courierName: '' },
        getToken()
      )
      .then((res) => setOrdersFilter(res.data))
      .catch((e) => console.log(e));
  }, [fechaDesde, fechaHasta]);

  console.log('ORDERS --> ', orders);
  console.log('ORDERS Filtro --> ', ordersFilter);

  return (
    <>
      <h1>Acá van los reportes</h1>
      <Flex
        bg={useColorModeValue('#F9FAFB', 'gray.600')}
        p={50}
        direction={['column', 'column', 'row', 'row']}
        w={['90vw', '90vw', '90vw', 'full']}
        alignItems="center"
        justifyContent="center"
      >
        <Button mt={4} onClick={onOpen} m={1}>
          Selecionar fechas
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Seleccione fecha de inicio y de fin:</ModalHeader>
            <ModalCloseButton />
            <ModalBody alignItems="center" justifyContent="center" p={50}>
              <Calendar value={fechaDesde} onChange={onChangeDesde} />
              <Calendar value={fechaHasta} onChange={onChangeHasta} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      <h1>Total de pedidos: {orders.length}</h1>

      <Flex
        bg={useColorModeValue('#F9FAFB', 'gray.600')}
        p={50}
        direction={['column', 'column', 'row', 'row']}
        w={['90vw', '90vw', '90vw', 'full']}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="90vw"
          height="auto"
          borderWidth="1px"
          px={4}
          py={4}
          bg={useColorModeValue('white', 'gray.800')}
          shadow="md"
          rounded="md"
          m={1}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue('gray.800', 'gray.400')}
            >
              Sin asignar
            </chakra.span>
          </Flex>

          <Box>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              mt={2}
              color={useColorModeValue('gray.800', 'white')}
              align="baseline"
            >
              <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculateNotAsign(orders)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <TriangleUpIcon boxSize={4} />{' '}
                  {notAsignAvg(orders).toFixed(2)}%
                </StatHelpText>
              </Stat>
            </chakra.h1>
          </Box>
        </Box>

        <Box
          width="90vw"
          height="auto"
          borderWidth="1px"
          px={4}
          py={4}
          bg={useColorModeValue('white', 'gray.800')}
          shadow="md"
          rounded="md"
          m={1}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue('gray.800', 'gray.400')}
            >
              Para retirar
            </chakra.span>
          </Flex>

          <Box>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              mt={2}
              color={useColorModeValue('gray.800', 'white')}
              align="baseline"
            >
              <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculatePendings(orders)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <TriangleUpIcon boxSize={4} />
                  {pendingsAvg(orders).toFixed(2)}%
                </StatHelpText>
              </Stat>
            </chakra.h1>
          </Box>
        </Box>

        <Box
          width="90vw"
          height="auto"
          borderWidth="1px"
          px={4}
          py={4}
          bg={useColorModeValue('white', 'gray.800')}
          shadow="md"
          rounded="md"
          m={1}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue('gray.800', 'gray.400')}
            >
              En camino
            </chakra.span>
          </Flex>

          <Box>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              mt={2}
              color={useColorModeValue('gray.800', 'white')}
              align="baseline"
            >
              <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculateOnItsWay(orders)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <TriangleUpIcon boxSize={4} />
                  {onItsWayAvg(orders).toFixed(2)}%
                </StatHelpText>
              </Stat>
            </chakra.h1>
          </Box>
        </Box>

        <Box
          width="90vw"
          height="auto"
          borderWidth="1px"
          px={4}
          py={4}
          bg={useColorModeValue('white', 'gray.800')}
          shadow="md"
          rounded="md"
          m={1}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue('gray.800', 'gray.400')}
            >
              Entregados
            </chakra.span>
          </Flex>

          <Box>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              mt={2}
              color={useColorModeValue('gray.800', 'white')}
              align="baseline"
            >
              <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculateDelivered(orders)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <TriangleUpIcon boxSize={4} />
                  {deliveredAvg(orders).toFixed(2)}%
                </StatHelpText>
              </Stat>
            </chakra.h1>
          </Box>
        </Box>

        <Box
          width="90vw"
          height="auto"
          borderWidth="1px"
          px={4}
          py={4}
          bg={useColorModeValue('white', 'gray.800')}
          shadow="md"
          rounded="md"
          m={1}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue('gray.800', 'gray.400')}
            >
              Devueltos
            </chakra.span>
          </Flex>

          <Box>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              mt={2}
              color={useColorModeValue('gray.800', 'white')}
              align="baseline"
            >
              <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculateReturned(orders)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <TriangleUpIcon boxSize={4} />
                  {returnedAvg(orders).toFixed(2)}%
                </StatHelpText>
              </Stat>
            </chakra.h1>
          </Box>
        </Box>
      </Flex>
      <Flex
        bg={useColorModeValue('#F9FAFB', 'gray.600')}
        p={50}
        direction={['column', 'column', 'row', 'row']}
        w={['90vw', '90vw', '90vw', 'full']}
        alignItems="left"
        justifyContent="center"
      >
        <h1>Hola</h1>
      </Flex>
    </>
  );
};

export default Reports;
