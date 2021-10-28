import React, { Component } from 'react';

import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Grid, Button, Dialog, DialogActions, Toolbar,
    DialogContent, DialogTitle, TextField, IconButton, TablePagination, TableContainer, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from "redux";
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import { createUserVistRequest ,fetchAllSiteVisitRequest } from '../../actions/userAction'
import _ from 'underscore';

const styles = theme => ({
    fontCellHeader: {
        fontFamily: "Futura-Book",
        color: "#fff",
        fontWeight: 900,
        padding: '14px 20px 14px 10px',

    },
    fontTableCellBody: {
        fontWeight: 700,
        fontFamily: "Futura-Medium-bt",
        color: "#37474f",
        padding: '14px 20px 14px 10px',
    },
    addButton: {
        backgroundColor: "#2B99CD",
        color: "white",
        fontFamily: "unicode.futurab",
        borderRadius: "10",
        textTransform: 'none',
    },
    cancelButton: {
        backgroundColor: "#8fa3ad",
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgba(143, 163, 173, 0.8)',
        }
    },
    editButton: {
        backgroundColor: "#8fa3ad",
        margin: 2,
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgba(143, 163, 173, 0.8)',
        }
    },
    viewButton: {
        backgroundColor: "red",
        margin: 2,
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'red',
        }
    },
    inputStyle: {
        fontFamily: "Futura-Book",
        fontSize: 14
    },
    labelStyle: {
        fontFamily: "Futura-Book",
        fontSize: 14
    },
    textStyle: {
        color: "#37474f",
        fontWeight: "bold",
        fontSize: 25,
        padding: 5
        //padding: 10   
    },
})

class UserRequests extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            name_error: false,
            company_name: null,
            company_name_error: false,
            visit_date: null,
            visit_date_error: false,
            invalid_date_error: false,
            visit_time: null,
            visit_time_error: false,
            invalid_time_error: false,
            status:"PENDING",
            dialogOpen: false,
            mode: "",
            id: null,

        }
    }

    componentDidMount() {
        // fetch('http://localhost:3005/user')
        //     .then(response => response.json())
        //     .then(data => console.log("------------------" + data));
        this.props.dispatch(fetchAllSiteVisitRequest())
    }
    handleClick = (item, mode) => {
        if (mode === "ADD") {
            this.setState({ mode: mode, dialogOpen: true })
        }
        else {
            // this.setState({
            //     id: item.id,
            //     dialogOpen: true,
            //     mode: mode,
            //     recipient: item.recipient,
            //     amount: item.amount,
            //     paymentDueDate: item.paymentDueDate,
            //     alreadyPaid: (item.alreadyPaid === true || item.alreadyPaid === "true") ? "true" : "false"
            // })
        }
    }
    // submitForDelete = (id) => {
    //     this.props.dispatch(deleteInvoice(this, id))
    // }

    handleSubmit = (mode) => {
        let user_id = JSON.parse(localStorage.getItem('user')).user_id
        let { id, name, company_name, visit_date, visit_time,status } = this.state
        let isError = false;
        if (name === "" || name === null) {
            this.setState({ name_error: true })
            isError = true;
        }
        if (company_name === "" || company_name === null) {
            this.setState({ company_name_error: true })
            isError = true;
        }
        if (visit_date === "" || visit_date === null) {
            this.setState({ visit_date_error: true })
            isError = true;
        }
        if (visit_time === "" || visit_time === null) {
            this.setState({ visit_time_error: true })
            isError = true;
        }

        if (isError === false) {
            let userRequestObj = {};
            userRequestObj.user_id = user_id
            userRequestObj.name = name;
            userRequestObj.company_name = company_name;
            userRequestObj.visit_date = moment(visit_date, 'MM-DD-YYYY').format('YYYY-MM-DD 00:00');
            userRequestObj.visit_time = moment(visit_time).format('HH:mm:00');
            userRequestObj.status = status;
            if (mode === "ADD") {
                this.props.dispatch(createUserVistRequest(this, userRequestObj))
            }
            else {
               // this.props.dispatch(updateInvoice(this, userRequestObj, id))
            }
        }
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false,
            name: "",
            name_error: false,
            company_name: "",
            company_name_error: false,
            visit_date: null,
            visit_date_error: false,
            invalid_date_error: false,
            visit_time: null,
            visit_date_error: false,
            dialogOpen: false,
            mode: "",
            id: null,
        })
    }
    handleDateChange = (visit_date) => {
        this.setState({ visit_date: visit_date, visit_date_error: false, invalid_date_error: false });
    }
    handleChangeTime = (time) => {
        this.setState({ visit_time: time, visit_time_error: false })

    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ margin: 20 }}>
                <Grid item xs={12} sm={12} style={{ backgroundColor: "#fff", borderRadius: 5, boxShadow: "0ppx 0px rgba(0, 0, 0, 0.2)" }}>
                    <Toolbar style={{ justifyContent: "space-between", padding: "5px 20px 0px 0px", marginBottom: 10 }}>
                        <div></div>
                        <Typography className={classes.textStyle} style={{fontSize: "16", color: "#20478E", fontWeight: "bold" }}>Site Visit Requests</Typography>

                        <Button size="small" variant="contained" color="primary" className={classes.addButton} onClick={() => this.handleClick(null, "ADD")} >
                            New Visit Request
                        </Button>
                    </Toolbar>

                    <TableContainer style={{ backgroundColor: '#f2f2f2' }}>
                        <Table>
                            <TableHead style={{ background: "linear-gradient(to right, #2687C4, #2A98CA, #2EAAD4, #32BCD9)" }}>
                                <TableRow>
                                    <TableCell align="left" className={classes.fontCellHeader}>Name</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Company Name</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Visit Date</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Visit Time</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Status</TableCell>
                                    {/* <TableCell align="left" className={classes.fontCellHeader}>Actions</TableCell> */}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    this.props.user_site_visit_requests !== null && this.props.user_site_visit_requests.length > 0 ? (_.sortBy(this.props.user_site_visit_requests, 'id').map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.name}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.company_name}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{moment(item.date).format("DD-MM-YYYY")}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{ moment(item.time, "hh:mm").format('LT')}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.status}</TableCell>
                                            {/* <TableCell align="left" className={classes.fontTableCellBody}>
                                                <Button size="small" className={classes.editButton} onClick={() => this.handleClick(item, "EDIT")}>Edit</Button>
                                                <Button size="small" className={classes.viewButton} onClick={() => this.submitForDelete(item.id)}>Delete</Button>
                                            </TableCell> */}
                                        </TableRow>)
                                    ))
                                        :
                                        <TableCell colspan={4} style={{ textAlign: "center" }}>There are no user site vist requests </TableCell>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Dialog
                    maxWidth={"sm"}
                    open={this.state.dialogOpen}>
                    <DialogTitle id="form-dialog-title">
                        <Typography style={{ padding: "2% 5% 0 5%", fontFamily: "Futura-Heavy" }}>{this.state.mode === "ADD" ? "Create New Request" : "Update Request"}</Typography>
                    </DialogTitle>
                    <DialogContent style={{ overflowY: "hidden" }}>
                        <Grid container justify="space-between" style={{ marginTop: -20, padding: "2% 5% 0 5%" }}>

                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    name="name"
                                    className={classes.margin}
                                    value={this.state.recipient}
                                    onChange={(event) => this.setState({ name: event.target.value, name_error: false })}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        classes: { input: classes.inputStyle }
                                    }}
                                    fullWidth
                                    error={this.state.name_error === true ? true : false}
                                    helperText={this.state.name_error === true ? "Please enter name" : false}
                                />
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <TextField
                                    id="company_name"
                                    label="Company Name"
                                    name="company_name"
                                    // disabled={this.state.mode === "EDIT" ? true : false}
                                    className={classes.margin}
                                    value={this.state.amount}
                                    onChange={(event) => this.setState({ company_name: event.target.value, company_name_error: false })}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        classes: { input: classes.inputStyle }
                                    }}
                                    fullWidth
                                    error={this.state.company_name_error === true ? true : false}
                                    helperText={this.state.company_name_error === true ? "Please enter company name" : false}
                                />
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }} >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Visit Date"
                                            format="MM/dd/yyyy"
                                            value={this.state.visit_date}
                                            required
                                            disableFuture={false}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            InputProps={{
                                                classes: { input: classes.inputStyle }
                                            }}
                                            fullWidth
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}

                                            error={this.state.visit_date_error === true ? true : this.state.invalid_date_error === true ? true : false}
                                            helperText={this.state.visit_date === true ? "Please enter date " : this.state.invalid_date_error === true ? "Please enter correct  date" : false}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }} >
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    mask="__:__ _M"
                                                    label={<span className={classes.inputStyle}>Visit Time</span>}
                                                    value={this.state.visit_time}
                                                    onChange={this.handleChangeTime}
                                                    KeyboardButtonProps={{ 'aria-label': 'change time' }}
                                                    error={this.state.visit_time_error === true ? true : false}
                                                    helperText={this.state.vist_time_error === true ? this.state.invalid_visit_time_error : false}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={() => this.handleSubmit(this.state.mode)} variant="contained" color="primary" className={classes.addButton}>Submit</Button>
                        <Button size="small" onClick={() => this.handleClose()} variant="contained" color="secondary" className={classes.cancelButton}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }
}
const mapStateToProps = (state) => {

    return {
        user_site_visit_requests: state.userReducer.user_site_visit_requests
    }
}
UserRequests.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default compose(withStyles(styles), connect(mapStateToProps))(UserRequests);

