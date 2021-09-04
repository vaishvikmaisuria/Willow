import { Heading, Stack, Link, List, ListItem, Center } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import React from "react";

// Instruction on how to load the Task information to start bot
const Instructions = () => {
  return (
    <Stack p={5} shadow="md" borderWidth="1px" m={12}>
      <Heading as="h3" size="lg">
        How to use the Willow
      </Heading>
      <Center>
        <List as="ol" mt={2} styleType="decimal">
          <ListItem>
            Go to the{" "}
            <Link as={RouterLink} to="/">
              home
            </Link>{" "}
            page
          </ListItem>
          <ListItem>Click Add Item</ListItem>
          <ListItem>
            Fill out the form for your stock and watch as your portfolio is
            updated with prices.
          </ListItem>
        </List>
      </Center>
    </Stack>
  );
};

export default Instructions;
