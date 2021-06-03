import { Stack, Text } from "@chakra-ui/react";
import React from "react";

//  Information about the Automated system 
const Info = () => {
  return (
    <Stack p={5} shadow="md" borderWidth="1px" m={12} textAlign="center">
      <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
        Willow is an automated stock portfolio system allowing users to view
        and manage stocks bought and how much dividend they will acquire 
        and compare their history to help increase dividend investing success.
      </Text>
      <Text
        opacity={0.8}
        fontSize={{ base: "lg", lg: "xl" }}
        mt="6"
        textAlign="center"
      >
        The automated portfolio system will automatically check stock prices and dividend values 
        for the day, month, and year. 
      </Text>
      <Text
        opacity={0.8}
        fontSize={{ base: "lg", lg: "xl" }}
        mt="6"
        textAlign="center"
      >
        This project was developed to help poor customers like me attain financial freedom. 
      </Text>
    </Stack>
  );
};

export default Info;
