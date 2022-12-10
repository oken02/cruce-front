import React, { useState , useEffect} from 'react';
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
import { useHistory } from 'react-router';
import getToken from '../../utils/getToken';
import { useSelector } from 'react-redux';


function UserCreationForm() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const { loggedUser } = useSelector((state) => state.user);

// console.log(loggedUser)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
      dniCuil: '',
      address: '',
      role: loggedUser.role === 'courier'? 'messenger' : '',
      courierId:loggedUser.role === 'courier' ? loggedUser.courierId : ''  ,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalido')
        .required('El email es requerido'),
      password: Yup.string()
        .required('El password es requerido')
        .min(6, 'Requiere minimo 6 caracteres'),
      fullName: Yup.string()
        .required('Es un campo obligatorio')
        .min(3, 'Requiere minimo 3 caracteres'),
      dniCuil: Yup.number()
        .required('Es un campo obligatorio')
        .positive()
        .integer()
        .min(8, 'Requiere minimo 8 caracteres'),
    }),

    onSubmit: (values, { setSubmitting }) => {
      loggedUser.role === 'courier' ? (axios
        .post(
          '/api/user/messenger/add',
          values,
          getToken()
        )
        .then((res) => {
          // alert(`usuario ${values.fullName} creado`);
          setSubmitting(false);
          history.push('/dashboard/messengers');
        })
        .catch((err) => console.log(err))) : ( axios
          .post(
            '/api/usercourier/add',
            values,
            getToken()
          )
          .then((res) => {
            // alert(`usuario ${values.fullName} creado`);
            setSubmitting(false);
            history.push('/dashboard/couriers');
          })
          .catch((err) => console.log(err)))
    },
  });

  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
        axios
      .get('/api/courier/', getToken())
      .then((res) => setCouriers(res.data))
  } , []) 
  console.log(couriers)
  return (
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
                Alta de Nuevo Usuario
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Completa la información con los datos del nuevo Usuario.
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
                      htmlFor="password"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Password:
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
                      htmlFor="address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Dirección:
                    </FormLabel>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div>
                        <Text color="tomato">{formik.errors.address}</Text>
                      </div>
                    ) : null}
                  </FormControl>


                  {loggedUser.role === 'ecommerce' ? (
                    <>
                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="role"
                      fontSize="sm"
                      fontWeight="md"
                      color='gray.700'
                    >
                      Rol del nuevo usuario:
                    </FormLabel>


                    <Select
                      id="role"
                      name="role"
                      autoComplete="role"
                      // placeholder="Seleccione el rol del usuario"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                    >
                      {/* <option>ecommerce</option> */}
                      <option value="courier" selected>courier</option>
                      {/* <option>messenger</option> */}
                    </Select>

                    {formik.touched.role && formik.errors.role ? (
                      <div>
                        <Text color="tomato">{formik.errors.role}</Text>
                      </div>
                    ) : null}
                  </FormControl>
                  
                <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="courierId"
                      fontSize="sm"
                      fontWeight="md"
                      color={'gray.700'}
                    >
                      MENSAJERIA ASOCIADA:
                    </FormLabel>
                    <Select
                      type="text"
                      name="courierId"
                      id="courierId"
                      autoComplete="courierId"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courierId}
                        >
                          {couriers.map((element, index)=> {
                            return (
                              <option  key={index} value={element._id}>{element.name}</option>
                            )
                          })}
                    </Select>

                        
                    {formik.touched.courierId && formik.errors.courierId ? (
                      <div>
                        <Text color="tomato">{formik.errors.courierId}</Text>
                      </div>
                    ) : null}
                </FormControl>
                </>)
  
 : "" }

                 
                  
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
                  {!formik.isSubmitting && 'Crear Usuario'}
                  {formik.isSubmitting && <Spinner color="white" />}{' '}
                </Button>
              </Box>
            </form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default UserCreationForm;
