import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TopBor from "../../layout-components/TopBar"
import Snackbar from '@material-ui/core/Snackbar';
import { ALERT_DETAIL } from '../../actions/actionTypes'
import Alert from '@material-ui/lab/Alert';
import { compose } from "redux";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    paddingTop: 56,
    [MyComponent()]: {
      paddingTop: 56,
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  },

}));

function MyComponent() {
  const theme = useTheme();
  const matches = theme.breakpoints.up('sm');
  return matches;
}

const Main = props => {

  const { children, openAlert, alertSeverity, alertMessage, } = props;
  const classes = useStyles();
  return (
    <div>
      <TopBor  />

      <div
        className={clsx({
          [classes.root]: true,
         
        })}
      >
        {/* <Snackbar
          open={openAlert}
          onClose={() => props.dispatch({ type: ALERT_DETAIL, data: false, message: "", severity: "" })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000} >
          <Alert icon={false} variant="filled" severity={alertSeverity} >{alertMessage}</Alert>
        </Snackbar> */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
     openAlert: state.userReducer.openAlert,
    alertSeverity: state.userReducer.alertSeverity,
    alertMessage: state.userReducer.alertMessage
  };
};

Main.propTypes = {
  children: PropTypes.node,
};

export default compose(connect(mapStateToProps))(Main);