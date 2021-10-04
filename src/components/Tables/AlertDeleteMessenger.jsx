import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    ButtonGroup,
    IconButton
  } from "@chakra-ui/react";
  import { DeleteIcon } from "@chakra-ui/icons";

  import React from "react";
  import axios from "axios";
  import { useHistory } from "react-router";
  
  function AlertDeleteMessenger({ messID, name }) {
    const history = useHistory();
    const token = localStorage.getItem("token");

  
    const onDelete = (id) => {
        axios.delete(`http://localhost:3001/api/user/messenger/delete/${id}`,{
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((data) => {
          console.log("Llega esto??");
          console.log("DATA", data);
          history.go(0);
        });
      };

    return (
      <Popover placement="bottom" closeOnBlur={false}>
        <PopoverTrigger>
          <IconButton variant="ghost"
                        colorScheme="teal"
                        fontSize="20px"
                        size="xs"
                        icon={<DeleteIcon />}
                        mr={2} />
        </PopoverTrigger>
        <PopoverContent bg="gray.100" borderColor="teal.500">
          <PopoverHeader pt={4} fontWeight="bold" border="0" color="black">
            Confirmar eliminación
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody color="black">
            ¿Estás seguro que deseas eliminar el cadete {name}?
            
          </PopoverBody>
          <PopoverFooter
            border="0"
            d="flex"
            alignItems="center"
            justifyContent="space-between"
            pb={4}
          >
            <ButtonGroup size="sm">
              <Button bg="teal" color="gray.50" onClick={() => history.go(0)}>
                Pensándolo mejor, no
              </Button>
              <Button
                bg="red.600"
                color="gray.50"
                onClick={() => onDelete(messID)}
              >
                Sí, eliminar
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );
  }
  
  export default AlertDeleteMessenger;
  