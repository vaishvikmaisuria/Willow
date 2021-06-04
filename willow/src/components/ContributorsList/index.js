import { Avatar, Heading, Stack, Text } from "@chakra-ui/react";
import vaishvik from "../../assets/img/vaishvik.png";

import React from "react";

// Component for individual contributor information
const Contributor = ({ name, team, duties, img }) => {
  return (
    <Stack paddingBottom={4} pt={4} textAlign="center" alignItems="center">
      <Avatar src={img ? img : ""} />
      <Text as="strong">{name}</Text>
      <Text as="i">{team}</Text>
      <Text>{duties}</Text>
    </Stack>
  );
};

// All contributor information
const contributors = [
  {
    name: "Vaishvik Maisuria",
    team: "Engineering Team",
    duties: "Architecture, Development, Deployment",
    img: vaishvik,
  },
];

// Component of all contributors
const ContributorsList = () => {
  return (
    <Stack p={5} shadow="md" borderWidth="1px" mt={12} mb={12} mr={12} textAlign="center">
      <Heading as="h3" size="lg">
        Contributors
      </Heading>
      {contributors &&
        contributors.map((contributor, index) => {
          return <Contributor {...contributor} key={`contributor-${index}`} />;
        })}
    </Stack>
  );
};

export default ContributorsList;
