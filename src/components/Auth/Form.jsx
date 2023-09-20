import * as Yup from "yup";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  FormErrorMessage,
  Select, // Import Select component from Chakra UI
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/form";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialForm = {
  firstname: "",
  lastname: "",
  email: "",
  mobileNumber: "",
  difficulty: "",
};

export default function Form() {
  const toast = useToast();
  const { login, user } = UserAuth();
  const navigate = useNavigate();

  /*********************** formik and yup validation to handle Form **********************************/

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialForm,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        const { firstname, lastname, email, mobileNumber, difficulty } = values;

        const user_data = {
          firstname,
          lastname,
          email,
          mobileNumber,
          difficulty,
        };

        login(user_data);

        localStorage.setItem("user_data", JSON.stringify(user_data));

        toast({
          title: "Account created successfully",
          status: "success",
          duration: 1000,
          position: "top",
          isClosable: true,
        });

        navigate("/game");

        action.resetForm();
      },
    });

  useEffect(() => {
    if (user) {
      navigate("/game");
    }
  }, [user]);

  return (
    <Box minH={"100vh"} bg="green.500">
      <Flex align={"center"} justify={"center"} color="black">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading
              fontSize={"32px"}
              fontWeight={400}
              color="white"
              textAlign={"center"}
            >
              Sign up
            </Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} bgColor="white">
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl
                      height="90px"
                      isInvalid={
                        touched.firstname && errors.firstname ? true : undefined
                      }
                    >
                      <FormLabel>First Name</FormLabel>
                      <Input
                        border="2px solid"
                        borderColor={"green.500"}
                        _focus={
                          touched.firstname && errors.firstname
                            ? {
                                boxShadow: "none",
                                border: "2px solid",
                                borderColor: "red.500",
                              }
                            : {
                                boxShadow: "none",
                                border: "2px solid",
                                borderColor: "green.500",
                              }
                        }
                        _hover={
                          touched.firstname && errors.firstname
                            ? {
                                border: "2px solid",
                                borderColor: "red.500",
                              }
                            : {
                                border: "2px solid",
                                borderColor: "green.500",
                              }
                        }
                        type="text"
                        name="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.firstname && touched.firstname ? (
                        <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                      ) : null}
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl
                      height="90px"
                      isInvalid={
                        touched.lastname && errors.lastname ? true : undefined
                      }
                    >
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        border="2px solid"
                        borderColor={"green.500"}
                        _focus={
                          touched.lastname && errors.lastname
                            ? {
                                boxShadow: "none",
                                border: "2px solid",
                                borderColor: "red.500",
                              }
                            : {
                                boxShadow: "none",
                                border: "2px solid",
                                borderColor: "green.500",
                              }
                        }
                        _hover={
                          touched.lastname && errors.lastname
                            ? {
                                border: "2px solid",
                                borderColor: "red.500",
                              }
                            : {
                                border: "2px solid",
                                borderColor: "green.500",
                              }
                        }
                        type="text"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.lastname && touched.lastname ? (
                        <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                      ) : null}
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl
                  height="90px"
                  isInvalid={touched.email && errors.email ? true : undefined}
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    border="2px solid"
                    borderColor={"green.500"}
                    _focus={
                      touched.email && errors.email
                        ? {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "green.500",
                          }
                    }
                    _hover={
                      touched.email && errors.email
                        ? {
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            border: "2px solid",
                            borderColor: "green.500",
                          }
                    }
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  height="90px"
                  isInvalid={
                    touched.mobileNumber && errors.mobileNumber
                      ? true
                      : undefined
                  }
                >
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    border="2px solid"
                    borderColor={"green.500"}
                    _focus={
                      touched.mobileNumber && errors.mobileNumber
                        ? {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "green.500",
                          }
                    }
                    _hover={
                      touched.mobileNumber && errors.mobileNumber
                        ? {
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            border: "2px solid",
                            borderColor: "green.500",
                          }
                    }
                    type="text"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.mobileNumber && touched.mobileNumber ? (
                    <FormErrorMessage>{errors.mobileNumber}</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  height="90px"
                  isInvalid={
                    touched.difficulty && errors.difficulty ? true : undefined
                  }
                >
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    border="2px solid"
                    borderColor={"green.500"}
                    _focus={
                      touched.difficulty && errors.difficulty
                        ? {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            boxShadow: "none",
                            border: "2px solid",
                            borderColor: "green.500",
                          }
                    }
                    _hover={
                      touched.difficulty && errors.difficulty
                        ? {
                            border: "2px solid",
                            borderColor: "red.500",
                          }
                        : {
                            border: "2px solid",
                            borderColor: "green.500",
                          }
                    }
                    name="difficulty"
                    value={values.difficulty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </Select>
                  {errors.difficulty && touched.difficulty ? (
                    <FormErrorMessage>{errors.difficulty}</FormErrorMessage>
                  ) : null}
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Checking"
                    size="lg"
                    bg="black"
                    color="green.500"
                    textTransform={"uppercase"}
                    _hover={{
                      color: "black",
                      bg: "green.500",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
