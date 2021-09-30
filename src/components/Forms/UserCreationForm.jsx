import React, { useState } from 'react';
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



function UserCreationForm() {
  // const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const history = useHistory()
  const token = localStorage.getItem("token")
  console.log(token)
  const formik = useFormik({
    initialValues: {
      userEmail: '',
      userPassword: '',
      userName: '',
      userDniCuil: '',
      userAddress: '',
      userCourierId: '',
    },
    validationSchema: Yup.object({
      userEmail: Yup.string()
        .email('Email invalido')
        .required('El email es requerido'),
      userPassword: Yup.string()
        .required('El password es requerido')
        .min(6, 'Requiere minimo 6 caracteres'),
      userName: Yup.string()
        .required('Es un campo obligatorio')
        .min(3, 'Requiere minimo 3 caracteres'),
      userDniCuil: Yup.number()
        .required('Es un campo obligatorio')
        .positive()
        .integer()
        .min(8, 'Requiere minimo 8 caracteres'),
    }),

  
    onSubmit: (values, { setSubmitting }) => {

      axios.post("http://localhost:3001/api/user/messenger/add", values, 
      {headers: {
        Authorization: "Bearer " + token,
      }})
      .then(res => {
        alert(`usuario ${values.userName} creado`)
        setSubmitting(false)
        history.push("/dashboard/messengers")
      })
      .catch(err => console.log(err))
    },
  });

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
                      htmlFor="userEmail"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Email:
                    </FormLabel>
                    <Input
                      type="email"
                      name="userEmail"
                      id="userEmail"
                      autoComplete="email"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userEmail}
                    />
                    {formik.touched.userEmail && formik.errors.userEmail ? (
                      <div>
                        <Text color="tomato">{formik.errors.userEmail}</Text>
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6]}>
                    <FormLabel
                      htmlFor="userPassword"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Password:
                    </FormLabel>
                    <Input
                      type="text"
                      name="userPassword"
                      id="userPassword"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userPassword}
                    />
                    {formik.touched.userPassword &&
                    formik.errors.userPassword ? (
                      <div>
                        <Text color="tomato">{formik.errors.userPassword}</Text>
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6]}>
                    <FormLabel
                      htmlFor="userName"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Nombre:
                    </FormLabel>
                    <Input
                      type="text"
                      name="userName"
                      id="userName"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userName}
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                      <div>
                        <Text color="tomato">{formik.errors.userName}</Text>
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="userDniCuil"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      DNI/CUIL:
                    </FormLabel>
                    <Input
                      type="number"
                      name="userDniCuil"
                      id="userDniCuil"
                      autoComplete="userDniCuil"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userDniCuil}
                    />
                    {formik.touched.userDniCuil && formik.errors.userDniCuil ? (
                      <div>
                        <Text color="tomato">{formik.errors.userDniCuil}</Text>
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="userAddress"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Dirección:
                    </FormLabel>
                    <Input
                      type="text"
                      name="userAddress"
                      id="userAddress"
                      autoComplete="userAddress"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userAddress}
                    />
                    {formik.touched.userAddress && formik.errors.userAddress ? (
                      <div>
                        <Text color="tomato">{formik.errors.userAddress}</Text>
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
