import React, { useState } from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Icon,
  Button,
  VisuallyHidden,
} from '@chakra-ui/react';
import handleFile from '../utils/handleFile';
import axios from 'axios';
import { useHistory } from 'react-router';

const NewOrder = () => {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState();

  const handleSubmit = (e) => {
    console.log('DATA ->', fileData);
    e.preventDefault();
    axios
      .post('http://localhost:3001/api/order/post', fileData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log(res);
        history.push('/dashboard/orders');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 3 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="semibold" lineHeight="6">
                Cargar Nuevos Pedidos:
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Desde aquí puede cargar el archivo Excel con todos los pedidos
                para darlos de alta en el sistema.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 3 }}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Stack
                px={4}
                py={5}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}
                p={{ sm: 6 }}
              >
                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Cargar achivo de Pedidos:
                  </FormLabel>

                  <Flex
                    mt={1}
                    justify="center"
                    px={6}
                    pt={5}
                    pb={6}
                    borderWidth={2}
                    borderColor={useColorModeValue('gray.300', 'gray.500')}
                    borderStyle="dashed"
                    rounded="md"
                  >
                    <Stack spacing={1} textAlign="center">
                      <Icon
                        mx="auto"
                        boxSize={12}
                        color={useColorModeValue('gray.400', 'gray.500')}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Icon>
                      <Flex
                        fontSize="sm"
                        color={useColorModeValue('gray.600', 'gray.400')}
                        alignItems="baseline"
                      >
                        <chakra.label
                          htmlFor="fileSelect"
                          cursor="pointer"
                          rounded="md"
                          fontSize="md"
                          color={useColorModeValue('blue.600', 'blue.200')}
                          pos="relative"
                          _hover={{
                            color: useColorModeValue('blue.400', 'blue.300'),
                          }}
                          type="file"
                        >
                          <span>
                            Hacé click aquí para subir un archivo desde tu PC
                          </span>

                          <VisuallyHidden>
                            <input
                              id="fileSelect"
                              name="file"
                              type="file"
                              accept=".xlsx, .xls, .csv"
                              onChange={(e) => {
                                setFileName(e.target.files[0].name);
                                handleFile(e.target.files[0]).then((res) =>
                                  setFileData(res)
                                );
                              }}
                            />
                          </VisuallyHidden>
                        </chakra.label>
                      </Flex>
                      <Text pl={1}>o arrastre y suelte el archivo</Text>

                      <Text
                        fontSize="xs"
                        color={useColorModeValue('gray.500', 'gray.50')}
                      >
                        Excel hasta 10 mb
                      </Text>
                      {fileName ? (
                        <Flex>
                          <Text
                            pl={1}
                            id="file-upload-filename"
                            rounded="md"
                            fontSize="md"
                            fontWeight="semibold"
                            color="green.600"
                            pos="relative"
                            _hover={{
                              color: 'green.400',
                            }}
                          >
                            {fileName}
                          </Text>
                          <Text
                            pl={1}
                            id="file-upload-filename"
                            rounded="md"
                            fontSize="md"
                            color="green.600"
                            pos="relative"
                            _hover={{
                              color: 'green.400',
                            }}
                          >
                            cargado con exito. Haga click cn "Subir" para
                            continuar.
                          </Text>
                        </Flex>
                      ) : null}
                    </Stack>
                  </Flex>
                </FormControl>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue('gray.50', 'gray.900')}
                textAlign="right"
              >
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  _focus={{ shadow: '' }}
                  fontWeight="md"
                >
                  Subir
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default NewOrder;
