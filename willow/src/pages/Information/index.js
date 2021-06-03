import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import ContributorsList from "../../components/ContributorsList";
import Header from "../../components/Header";
import Info from "../../components/Info";
import Instructions from "../../components/Instructions";
import useStyles from "../../assets/mainStyles"

// landing page for the application 
export function InfoPage() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Stack direction="row" ml={4}>
            <Box w="75%">
              {/* Information about the Automated system */}
              <Info />
              <Instructions />
            </Box>
            <Box w="25%">
              {/* Information about the Developers */}
              <ContributorsList />
            </Box>
          </Stack>
      </main>
    </div>
  );
}
export default InfoPage;
