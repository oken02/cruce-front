import React, { useState, useEffect, useCallback } from 'react';
import {
  Stat,
  StatNumber,
  StatHelpText,
  Heading,
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  StatArrow,
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
  averageToDelivery,
  efectivity,
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
  const [metrics, setMetrics] = useState([]);
  const [otrasMetrics, setOtrasMetrics] = useState([])

  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser._id;

  // trae metricas generales
  useEffect(() => {
    if (loggedUser.role === 'ecommerce') {
      axios
        .get('http://localhost:3001/api/order', getToken())
        .then((res) => setOrders(res.data))
        .catch((e) => console.log(e));
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

  // trae metricas ultimas
  useEffect(() => {
    if (loggedUser.role === 'ecommerce') {
      axios
        .post(
          'http://localhost:3001/api/metric/allordersinonemonth',
          { mes: '9' },
          getToken()
        )
        .then((res) => setOtrasMetrics(res.data))
        .catch((e) => console.log(e));
    } else if (loggedUser.role === 'messenger') {
      axios
        .post(
          'http://localhost:3001/api/metric/messengermonth',
          { mes: '9' },
          getToken()
        )
        .then((res) => setOtrasMetrics(res.data))
        .catch((e) => console.log(e));
      // } else  (loggedUser.role === 'courier') {
      //   axios
      //     .post('http://localhost:3001/api/order/', {}, getToken())
      //     .then((res) => setOrders(res.data))
      //     .catch((e) => console.log(e));
    }
    else{
      axios.post('http://localhost:3001/api/metric/couriermonth', { mes: '9' }, getToken())
      .then(res => setOtrasMetrics(res.data))
      .catch(e => console.log(e))
    }
  }, []);

  console.log('METRICS --> ', metrics);

  const orderForMetrics = ordersFilter ? ordersFilter : orders;

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
  const today = new Date();
  const tomorrow = new Date(today);
  const tomorrow2 = new Date(fechaHasta);

  const a = fechaDesde ? convertDate(fechaDesde) : '2021-01-01';
  const b = fechaHasta
    ? convertDate(tomorrow2.setDate(tomorrow2.getDate() + 1))
    : convertDate(tomorrow.setDate(tomorrow.getDate() + 1));

  // console.log('fecha a: ', a);
  // console.log('fecha b: ', b);

  useEffect(() => {
    if (loggedUser.role === 'ecommerce') {
      axios
        .post(
          'http://localhost:3001/api/order/filterecommerce',
          { fechaDesde: a, fechaHasta: b, courierName: '' },
          getToken()
        )
        .then((res) => setOrdersFilter(res.data))
        .catch((e) => console.log(e));
    } else if (loggedUser.role === 'courier') {
      axios
        .post(
          'http://localhost:3001/api/order/filtercourier',
          { fechaDesde: a, fechaHasta: b, courierName: '' },
          getToken()
        )
        .then((res) => setOrdersFilter(res.data))
        .catch((e) => console.log(e));
    } else if (loggedUser.role === 'messenger') {
      axios
        .post(
          'http://localhost:3001/api/order/filtermessenger',
          { fechaDesde: a, fechaHasta: b, courierName: '' },
          getToken()
        )
        .then((res) => setOrdersFilter(res.data))
        .catch((e) => console.log(e));
    }
  }, [fechaDesde, fechaHasta]);

  return (
    <>
      <Heading as="h4" size="md">
        Seleccione el periodo para el cual quiere ver las metricas:
      </Heading>
      <Flex
        bg={useColorModeValue('#F9FAFB', 'gray.600')}
        mt={3}
        mb={3}
        direction={['column', 'column', 'row', 'row']}
        w={['90vw', '90vw', '90vw', 'full']}
        alignItems="baseline"
        // justifyContent="center"
      >
        <Button
          mt={4}
          onClick={onOpen}
          m={1}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
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

      <Text size="lg" fontWeight="semibold">
        Para el periodo que va desde{' '}
        <chakra.span fontWeight="bold">{a} </chakra.span>
        hasta{' '}
        <chakra.span fontWeight="bold">
          {' '}
          {fechaHasta ? convertDate(fechaHasta) : convertDate(today)}{' '}
        </chakra.span>
        , hay{' '}
        <chakra.span fontWeight="bold">
          {ordersFilter ? ordersFilter.length : orders.length}
        </chakra.span>{' '}
        pedidos.
      </Text>
      <Text size="lg" mt={1}>
        Los mismos se distribuyen de la siguiente manera:
      </Text>

      <Flex
        bg={useColorModeValue('#F9FAFB', 'gray.600')}
        p={50}
        direction={['column', 'column', 'row', 'row']}
        w={['90vw', '90vw', '90vw', 'full']}
        alignItems="center"
        justifyContent="center"
      >
        {loggedUser.role === 'messenger' ? (
          ''
        ) : (
          <Box
            width="90vw"
            height="auto"
            borderWidth="1px"
            px={4}
            py={4}
            bg="white"
            shadow="md"
            rounded="md"
            m={1}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <chakra.span fontSize="md" fontWeight="semibold" color="gray.800">
                Sin asignar
              </chakra.span>
            </Flex>

            <Box>
              <chakra.h1
                fontSize="lg"
                fontWeight="bold"
                mt={2}
                color="gray.800"
                align="baseline"
              >
                <Stat>
                  <StatNumber>{calculateNotAsign(orderForMetrics)}</StatNumber>
                  <StatHelpText
                    fontSize="sm"
                    fontWeight="regular"
                    color="gray.500"
                  >
                    <StatArrow
                      boxSize={4}
                      type={
                        notAsignAvg(orderForMetrics) < 50
                          ? 'increase'
                          : 'decrease'
                      }
                    />
                    {notAsignAvg(orderForMetrics).toFixed(2)}%
                  </StatHelpText>
                </Stat>
              </chakra.h1>
            </Box>
          </Box>
        )}

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
                <StatNumber>{calculatePendings(orderForMetrics)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <StatArrow
                    boxSize={4}
                    type={
                      pendingsAvg(orderForMetrics) < 50
                        ? 'increase'
                        : 'decrease'
                    }
                  />
                  {pendingsAvg(orderForMetrics).toFixed(2)}%
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
                <StatNumber>{calculateOnItsWay(orderForMetrics)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <StatArrow
                    boxSize={4}
                    type={
                      onItsWayAvg(orderForMetrics) < 50
                        ? 'increase'
                        : 'decrease'
                    }
                  />{' '}
                  {onItsWayAvg(orderForMetrics).toFixed(2)}%
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
                <StatNumber>{calculateDelivered(orderForMetrics)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <StatArrow
                    boxSize={4}
                    type={
                      deliveredAvg(orderForMetrics) > 50
                        ? 'increase'
                        : 'decrease'
                    }
                  />{' '}
                  {deliveredAvg(orderForMetrics).toFixed(2)}%
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
                <StatNumber>{calculateReturned(orderForMetrics)}</StatNumber>
                <StatHelpText
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.500"
                >
                  <StatArrow
                    boxSize={4}
                    type={
                      returnedAvg(orderForMetrics) < 50
                        ? 'increase'
                        : 'decrease'
                    }
                  />{' '}
                  {returnedAvg(orderForMetrics).toFixed(2)}%
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
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="90vw"
          height="auto"
          borderWidth="1px"
          px={4}
          py={4}
          bg="white"
          shadow="md"
          rounded="md"
          m={1}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span fontSize="md" fontWeight="semibold" color="gray.800">
              Tiempo promedio del mes actual
            </chakra.span>
          </Flex>

          <Box>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              mt={2}
              color="gray.800"
              align="baseline"
            >
              <Stat>
                <StatNumber>
                  {otrasMetrics.length ? averageToDelivery(otrasMetrics).toFixed(0) : "0"} min
                  
                </StatNumber>
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
          bg="white"
          shadow="md"
          rounded="md"
          m={1}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span fontSize="md" fontWeight="semibold" color="gray.800">
              Efectividad del mes actual
            </chakra.span>
          </Flex>

          <Box>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              mt={2}
              color="gray.800"
              align="baseline"
            >
              <Stat>
                <StatNumber>
                  {console.log(otrasMetrics)}
                  {otrasMetrics.length ? efectivity(otrasMetrics) * 100 : 0} %
                </StatNumber>
              </Stat>
            </chakra.h1>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Reports;