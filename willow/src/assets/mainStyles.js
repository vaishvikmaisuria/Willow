import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingTop: 0,
    padding: theme.spacing(4),
  },
  toolbar: theme.mixins.toolbar,
}));

export default useStyles;
