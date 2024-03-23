import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import UpdateProductForm from "./UpdateProductForm";
import CreateProduct from "./CreateProduct";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getProducts = async () => {
    const { data } = await axios.get(BASE_URL + "/product/all");
    if (data) {
      setProducts(data);
    }
  };

  const deleteProduct = async (id) => {
    const { data } = await axios.delete(
      BASE_URL + `/product/deleteProductById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (data?.success) {
      setIsEdited(true);
      toast({
        title: "Product Deleted!",
        description: "Product has been deleted successfully!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isEdited) {
      getProducts();
    }
    setIsEdited(false);
  }, [isEdited]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <CreateProduct setIsEdited={setIsEdited} />
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Sr no</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Qty</Th>
              <Th>Price</Th>
              <Th>Created by</Th>
              <Th>Date created</Th>
              {/* <Th isNumeric>multiply by</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {products &&
              products.length > 1 &&
              products.map((el, index) => (
                <Tr key={el?._id}>
                  <Td>{index + 1}</Td>
                  <Td>{el?.product_name}</Td>
                  <Td>{el?.product_category}</Td>
                  <Td>{el?.qty}</Td>
                  <Td>{el?.price}</Td>
                  <Td>{el?.createdby?.userName}</Td>
                  <Td>{moment(el?.createdAt).format("MMM DD, YYYY")}</Td>
                  <Td>
                    <button
                      onClick={() => {
                        setCurrentProducts(el);
                        onOpen();
                      }}
                      className="px-2 text-gray-500 hover:text-orange-400"
                    >
                      <PencilIcon />
                    </button>
                    <button
                      onClick={() => deleteProduct(el._id)}
                      className="px-2 text-gray-500 hover:text-red-500"
                    >
                      <TrashIcon />
                    </button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* update products */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <UpdateProductForm
              onClose={onClose}
              currentProducts={currentProducts}
              setIsEdited={setIsEdited}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

const TrashIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
};
const PencilIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
};

export default ProductTable;
