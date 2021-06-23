import { Center, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import useStyles from "../../assets/mainStyles";
import { withSnackbar } from "notistack";

// landing page for the application 
export function Assistant() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Center mt={2}>
            <Text>
              This Page will contain information on the best type of stocks to pick
            </Text>
          </Center>
      </main>
    </div>
  );
}

export default withSnackbar(Assistant);