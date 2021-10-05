import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  SimpleGrid,
  GridItem,
  Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function MessengerEditUser() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const location = useLocation();

  const user = useSelector((state) => state.user);
  // console.log('USER --> ', user);

  const pathName = location.pathname;
  const messengerId = pathName.slice(21);

  const [messenger, setMessenger] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/user/messenger/${messengerId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setMessenger(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const formik = useFormik({
    initialValues: {
      email: messenger.email,
      //   userPassword: messenger.password,
      password: '',
      confirmUserPassword: '',
      fullName: messenger.fullName,
      dniCuil: messenger.dniCuil,
      direction: messenger.direction,
      courierId: messenger.courierId,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalido')
        .required('El email es requerido'),
      password: Yup.string()
        .min(6, 'Requiere minimo 6 caracteres')
        .required('Debe confirmar su password'),
      confirmUserPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'El pasword no coincide')
        .required('El password debe coincidir'),
      fullName: Yup.string()
        .min(3, 'Requiere minimo 3 caracteres')
        .required('Es un campo obligatorio'),
      dniCuil: Yup.number()
        .min(8, 'Requiere minimo 8 caracteres')
        .positive()
        .integer()
        .required('Es un campo obligatorio'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      axios
        .put(
          `http://localhost:3001/api/user/courier/update/${messengerId}`,
          values,
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then((res) => {
          setSubmitting(false);
          history.push('/dashboard/messengers');
        })
        .catch((err) => console.log(err));
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
        <Box mt={[10, 0]}>
          <SimpleGrid
            display={{ base: 'initial', md: 'grid' }}
            columns={1}
            spacing={10}
          >
            <GridItem colSpan={{ md: 1 }}>
              <Box px={[4, 0]}>
                <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                  Editar info de Cadete
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Actualice los campos que quiera cambiar.
                </Text>
              </Box>
            </GridItem>
            <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
              <form
                method="POST"
                shadow="base"
                rounded={[null, 'md']}
                overflow={{ sm: 'hidden' }}
                onSubmit={formik.handleSubmit}
              >
                <Stack
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg={useColorModeValue('white', 'gray.700')}
                  spacing={6}
                >
                  <SimpleGrid columns={6} spacing={6}>
                    <FormControl as={GridItem} colSpan={[6]}>
                      <FormLabel
                        htmlFor="email"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Email:
                      </FormLabel>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div>
                          <Text color="tomato">{formik.errors.email}</Text>
                        </div>
                      ) : null}
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6]}>
                      <FormLabel
                        htmlFor="fullName"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Nombre:
                      </FormLabel>
                      <Input
                        type="text"
                        name="fullName"
                        id="fullName"
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                      />
                      {formik.touched.fullName && formik.errors.fullName ? (
                        <div>
                          <Text color="tomato">{formik.errors.fullName}</Text>
                        </div>
                      ) : null}
                    </FormControl>

                    <FormControl as={GridItem} colSpan={6}>
                      <FormLabel
                        htmlFor="dniCuil"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        DNI/CUIL:
                      </FormLabel>
                      <Input
                        type="number"
                        name="dniCuil"
                        id="dniCuil"
                        autoComplete="dniCuil"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dniCuil}
                      />
                      {formik.touched.dniCuil && formik.errors.dniCuil ? (
                        <div>
                          <Text color="tomato">{formik.errors.dniCuil}</Text>
                        </div>
                      ) : null}
                    </FormControl>

                    <FormControl as={GridItem} colSpan={6}>
                      <FormLabel
                        htmlFor="direction"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Dirección:
                      </FormLabel>
                      <Input
                        type="text"
                        name="direction"
                        id="direction"
                        autoComplete="direction"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.direction}
                      />
                      {formik.touched.direction && formik.errors.direction ? (
                        <div>
                          <Text color="tomato">{formik.errors.direction}</Text>
                        </div>
                      ) : null}
                    </FormControl>
                  </SimpleGrid>
                </Stack>

                <Stack
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg={useColorModeValue('white', 'gray.700')}
                  spacing={6}
                >
                  <SimpleGrid columns={6} spacing={6}>
                    <FormControl as={GridItem} colSpan={[6]}>
                      <FormLabel
                        fontSize="md"
                        fontWeight="medium"
                        lineHeight="5"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        No es necesario, pero si lo desea, puede cambiar su
                        clave desde aqui:
                      </FormLabel>
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6]}>
                      <FormLabel
                        htmlFor="password"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Nuevo Password:
                      </FormLabel>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div>
                          <Text color="tomato">{formik.errors.password}</Text>
                        </div>
                      ) : null}
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6]}>
                      <FormLabel
                        htmlFor="confirmUserPassword"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Confirme la nueva password:
                      </FormLabel>
                      <Input
                        type="password"
                        name="confirmUserPassword"
                        id="confirmUserPassword"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmUserPassword}
                      />
                      {formik.touched.confirmUserPassword &&
                      formik.errors.confirmUserPassword ? (
                        <div>
                          <Text color="tomato">
                            {formik.errors.confirmUserPassword}
                          </Text>
                        </div>
                      ) : null}
                    </FormControl>
                  </SimpleGrid>
                </Stack>
                <Box
                  px={{ base: 4, sm: 6 }}
                  py={3}
                  bg={useColorModeValue('gray.50', 'gray.900')}
                  textAlign="right"
                >
                  <Button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                  >
                    {!formik.isSubmitting && 'Modificar Usuario'}
                    {formik.isSubmitting && <Spinner color="white" />}{' '}
                  </Button>
                </Box>
              </form>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}

export default MessengerEditUser;
