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
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CourierCreationForm() {
  // const [loginInput, setLoginInput] = useState({ email: '', password: '' });

  const formik = useFormik({
    initialValues: {
      courierName: '',
      courierAddress: '',
      courierManager: '',
      courierPhone: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalido')
        .required('El email es requerido'),
      courierName: Yup.string()
        .required('Es un campo obligatorio')
        .min(3, 'Requiere minimo 3 caracteres'),
      courierAddress: Yup.string()
        .required('Es un campo obligatorio')
        .min(3, 'Requiere minimo 3 caracteres'),
      courierManager: Yup.string()
        .required('Es un campo obligatorio')
        .min(3, 'Requiere minimo 3 caracteres'),
      courierPhone: Yup.number()
        .required('Es un campo obligatorio')
        .positive()
        .integer()
        .min(3, 'Requiere minimo 3 caracteres'),
    }),

    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        console.log('%c Alta Mensajeria -->', 'color: #FFEE57', values);
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
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
                Alta de Nueva Mensajeria
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Complete la información con los datos de la nueva empresa de
                Mensajeria.
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
                      htmlFor="courierName"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Nombre:
                    </FormLabel>
                    <Input
                      type="text"
                      name="courierName"
                      id="courierName"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courierName}
                    />
                    {formik.touched.courierName && formik.errors.courierName ? (
                      <div>
                        <Text color="tomato">{formik.errors.courierName}</Text>
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6]}>
                    <FormLabel
                      htmlFor="courierManager"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Responsable:
                    </FormLabel>
                    <Input
                      type="text"
                      name="courierManager"
                      id="courierManager"
                      autoComplete="courierManager"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courierManager}
                    />
                    {formik.touched.courierManager &&
                    formik.errors.courierManager ? (
                      <div>
                        <Text color="tomato">
                          {formik.errors.courierManager}
                        </Text>
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="courierAddress"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Dirección:
                    </FormLabel>
                    <Input
                      type="text"
                      name="courierAddress"
                      id="courierAddress"
                      autoComplete="courierAddress"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courierAddress}
                    />
                    {formik.touched.courierAddress &&
                    formik.errors.courierAddress ? (
                      <div>
                        <Text color="tomato">
                          {formik.errors.courierAddress}
                        </Text>
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="courierPhone"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Telefono:
                    </FormLabel>
                    <Input
                      type="number"
                      name="courierPhone"
                      id="courierPhone"
                      autoComplete="courierPhone"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courierPhone}
                    />
                    {formik.touched.courierPhone &&
                    formik.errors.courierPhone ? (
                      <div>
                        <Text color="tomato">{formik.errors.courierPhone}</Text>
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
                  {!formik.isSubmitting && 'Crear Mensajeria'}
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

export default CourierCreationForm;
