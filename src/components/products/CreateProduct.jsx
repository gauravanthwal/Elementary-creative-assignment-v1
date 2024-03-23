import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateProductForm = ({ onClose, setIsEdited }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    qty: "",
    product_category: "",
  });

  const onHandleChange = (e) => {
    let value = e.target.value;
    let id = e.target.id;
    setFormData({ ...formData, [id]: value });
  };

  const createNewProduct = async (e) => {
    e.preventDefault();
    const { product_name, product_category, price, qty } = formData;
    if (!price || !product_category || !product_name || !qty) {
      toast({
        title: "Validation failed!",
        description: "Please fill all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
    const { data } = await axios.post(BASE_URL + "/product/new", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (data?.success) {
      setIsEdited(true);
      toast({
        title: "Product created!",
        description: "Product has been created successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };
  return (
    <>
      <div className="max-w-[500px] mx-auto  px-8 py-6 rounded-lg mt-12 shadow-xl">
        <h1 className="mb-6 text-xl text-gray-600 font-bold">
          Create new product
        </h1>
        <form onSubmit={createNewProduct}>
          <div className="my-3">
            <label htmlFor="product_name">Product Name</label>
            <Input
              onChange={onHandleChange}
              variant="outline"
              type="text"
              value={formData.product_name}
              id="product_name"
              placeholder="xyz"
            />
          </div>
          <div className="my-3">
            <label htmlFor="product_category">Product Category</label>
            <Input
              onChange={onHandleChange}
              variant="outline"
              type="text"
              value={formData.product_category}
              id="product_category"
              placeholder="paint, tools etc"
            />
          </div>
          <div className="my-3">
            <label htmlFor="qty">Quantity</label>
            <Input
              onChange={onHandleChange}
              variant="outline"
              type="number"
              value={formData.qty}
              id="qty"
              placeholder="paint, tools etc"
            />
          </div>
          <div className="my-3">
            <label htmlFor="price">Price</label>
            <Input
              onChange={onHandleChange}
              variant="outline"
              type="number"
              value={formData.price}
              id="price"
              placeholder="paint, tools etc"
            />
          </div>
          <div className="mt-8">
            <Button type="submit" colorScheme="green" className="w-full">
              Create
            </Button>
          </div>
          <div></div>
        </form>
      </div>
    </>
  );
};

const CreateProduct = ({setIsEdited}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="green">Create new product</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <CreateProductForm onClose={onClose} setIsEdited={setIsEdited}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProduct;
