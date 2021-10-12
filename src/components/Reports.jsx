import React, { useState, useEffect } from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
   chakra, Box, Flex, useColorModeValue, Link
} from "@chakra-ui/react"
import { TriangleUpIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getToken from '../utils/getToken';
import {  calculateDelivered, deliveredAvg, calculateNotAsign, notAsignAvg, calculateOnItsWay, onItsWayAvg, calculatePendings, pendingsAvg, calculateReturned,returnedAvg }from "../utils/metrics"


const Reports = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  console.log("ORDERS --> ", orders)
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser._id;


  useEffect(() => {
    if (loggedUser.role === "ecommerce") { 
    axios
      .get('http://localhost:3001/api/order', getToken())
      .then((res) => setOrders(res.data))
  } else if(loggedUser.role === "messenger") {
    axios
    .post(
      `http://localhost:3001/api/order/myorders/${userId}`,
      {}, getToken())
      .then((res) => setOrders(res.data));
    } else if (loggedUser.role === "courier"){
      axios.post(
        "http://localhost:3001/api/order/",
        {}, getToken())
        .then((res) => setOrders(res.data));
  }
  }, []);
 
  
  return (

    <><h1>Acá van los reportes</h1>

        <h1>Total de pedidos: {orders.length}</h1>

    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
      >
      <Box
          maxW="sm"
          borderWidth="1px"
          px={4}
          py={4}
          bg={useColorModeValue("white", "gray.800")}
          shadow="md"
          rounded="md"
          m={1}
      >
        <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
            
            fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue("gray.800", "gray.400")}
          >
              Sin asignar
            </chakra.span>
   
        </Flex>

        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue("gray.800", "white")}
          >
    <Stat>
        {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculateNotAsign(orders)}</StatNumber>
        <StatHelpText            fontSize="sm"
            fontWeight="regular" color="gray.500">
                  <TriangleUpIcon boxSize={4} />          {notAsignAvg(orders).toFixed(2)}%
        </StatHelpText>
     </Stat>
            </chakra.h1>
        </Box>
      </Box>

      <Box
     maxW="sm"
     borderWidth="1px"
     px={4}
     py={4}
     bg={useColorModeValue("white", "gray.800")}
     shadow="md"
     rounded="md"
     m={1}
      >
        <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
            
            fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue("gray.800", "gray.400")}
          >
              Para retirar
            </chakra.span>
        </Flex>

        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue("gray.800", "white")}
          >
            <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculatePendings(orders)}</StatNumber>
                <StatHelpText            fontSize="sm"
            fontWeight="regular" color="gray.500">
                  <TriangleUpIcon boxSize={4} />
                  {pendingsAvg(orders).toFixed(2)}%
                </StatHelpText>
            </Stat>
            </chakra.h1>
        </Box>
      </Box>
        
      <Box
        maxW="sm"
        borderWidth="1px"
        px={4}
        py={4}
        bg={useColorModeValue("white", "gray.800")}
        shadow="md"
        rounded="md"
        m={1}
      >
        <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
            
            fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue("gray.800", "gray.400")}
          >
              En camino
            </chakra.span>
        </Flex>

        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue("gray.800", "white")}
          >
            <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculateOnItsWay(orders)}</StatNumber>
                <StatHelpText            fontSize="sm"
            fontWeight="regular" color="gray.500">
                  <TriangleUpIcon boxSize={4} />
                  {onItsWayAvg(orders).toFixed(2)}%
                </StatHelpText>
            </Stat>
            </chakra.h1>
        </Box>
      </Box>

      <Box
      maxW="sm"
      borderWidth="1px"
      px={4}
      py={4}
      bg={useColorModeValue("white", "gray.800")}
      shadow="md"
      rounded="md"
      m={1}
      >
        <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
            
            fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue("gray.800", "gray.400")}
          >
              Entregados
            </chakra.span>
        </Flex>

        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue("gray.800", "white")}
          >
            <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculateDelivered(orders)}</StatNumber>
                <StatHelpText            fontSize="sm"
            fontWeight="regular" color="gray.500">
                  <TriangleUpIcon boxSize={4} />
                  {deliveredAvg(orders).toFixed(2)}%
                </StatHelpText>
            </Stat>
            </chakra.h1>
        </Box>
        </Box>
        
        <Box
     maxW="sm"
     borderWidth="1px"
     px={4}
     py={4}
     bg={useColorModeValue("white", "gray.800")}
     shadow="md"
     rounded="md"
     m={1}      >
        <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
            
            fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue("gray.800", "gray.400")}
          >
              Devueltos
            </chakra.span>
        </Flex>

        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue("gray.800", "white")}
          >
            <Stat>
                {/* <StatLabel>Pedidos sin asignar</StatLabel> */}
                <StatNumber>{calculateReturned(orders)}</StatNumber>
                <StatHelpText            fontSize="sm"
            fontWeight="regular" color="gray.500">
                  <TriangleUpIcon boxSize={4} />
                  {returnedAvg(orders).toFixed(2)}%
                </StatHelpText>
            </Stat>
            </chakra.h1>
        </Box>
      </Box>
      
    </Flex>




      
    
    </>
  )
 
};

export default Reports