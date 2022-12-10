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
import getToken from '../../utils/getToken';

function BranchEdit() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const location = useLocation();

  const user = useSelector((state) => state.user);

  const pathName = location.pathname;
  const branchId = pathName.slice(18);

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/branch/${branchId}`, getToken())
      .then((res) => setBranch(res.data))
      .catch((e) => console.log(e));
  }, []);

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const formik = useFormik({
    initialValues: {
      name: branch.name,
      address: branch.address,
      manager: branch.manager,
      phone: branch.phone,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Es un campo obligatorio')
        .min(3, 'Requiere minimo 3 caracteres'),
      address: Yup.string()
        .required('Es un campo obligatorio')
        .min(3, 'Requiere minimo 3 caracteres'),
      manager: Yup.string()
        .required('Es un campo obligatorio')
        .min(3, 'Requiere minimo 3 caracteres'),
      phone: Yup.string().matches(
        phoneRegExp,
        'El numero de telefono no es valido'
      ),
    }),
    onSubmit: (values, { setSubmitting }) => {
      axios
        .put(`/api/branch/${branchId}`, values, getToken())
        .then((res) => {
          setSubmitting(false);
          history.push('/dashboard/branches');
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
                  Editar info de Sucursal
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Actualice los campos que quiera cambiar
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
                        htmlFor="name"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Nombre de la Sucursal:
                      </FormLabel>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div>
                          <Text color="tomato">{formik.errors.name}</Text>
                        </div>
                      ) : null}
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6]}>
                      <FormLabel
                        htmlFor="manager"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Responsable:
                      </FormLabel>
                      <Input
                        type="text"
                        name="manager"
                        id="manager"
                        autoComplete="manager"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.manager}
                      />
                      {formik.touched.manager && formik.errors.manager ? (
                        <div>
                          <Text color="tomato">{formik.errors.manager}</Text>
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

                    <FormControl as={GridItem} colSpan={6}>
                      <FormLabel
                        htmlFor="phone"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Telefono:
                      </FormLabel>
                      <Input
                        type="number"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div>
                          <Text color="tomato">{formik.errors.phone}</Text>
                        </div>
                      ) : null}{' '}
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
                    {!formik.isSubmitting && 'Modificar Sucursal'}
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

export default BranchEdit;
