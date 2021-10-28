import React, { Component } from 'react';

import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Grid, Button, Dialog, DialogActions, Toolbar,
    DialogContent, DialogTitle, TextField, IconButton, TablePagination, TableContainer, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText
    ,Badge,Chip,
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
import { updateUserVistRequest ,fetchAllSiteVisitRequest } from '../../actions/userAction'
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
    chipBadge: {
        backgroundColor: 'red',
        color: "#FFFFFF"
    },
    activeChip: {
        margin: theme.spacing(1),
        backgroundColor: '#3f51b5',
        color: "#FFFFFF",
        padding: "3px 3px",
        fontWeight: 'bold'
    },
    inActiveChip: {
        padding: "3px 3px",
        margin: theme.spacing(1),
        fontWeight: 'bold',
        backgroundColor: 'gray',
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: 'rgba(39,44,15, 0.8)',
        }
    },
    rejectButton: {
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        backgroundColor: "#B22222",
        color: "#fff",
        fontSize: 13,
        padding: "5px 15px",
        '&:hover': {
            backgroundColor: "#B22222",
        },
        marginRight: 20
    },
    acceptButton: {
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        backgroundColor: "#32CD32",
        color: "#fff",
        fontSize: 13,
        padding: "5px 15px",
        '&:hover': {
            backgroundColor: "#32CD32",
        },
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
            value:0,
            filterStatus: "PENDING",
            statusDialog:false,

        }
    }

    componentDidMount() {
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
   

    handleChange = (event, value) => {
        this.setState({ value: value,  filterStatus: "PENDING", });
    };

    
     requestsCount = (value) => {
        return (this.props.user_site_visit_requests!==null)?(this.props.user_site_visit_requests.filter(item => item.status === value).length):0
    }

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
               // this.props.dispatch(createUserVistRequest(this, userRequestObj))
            }
            else {
               // this.props.dispatch(updateInvoice(this, userRequestObj, id))
            }
        }
    }
    closeDialog = () => {
        this.setState({
            statusDialog: false,
            selectedStatus: "",

        })
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

    openStatusDialog = (status,item) => {
        this.setState({
            statusDialog: true,
            selectedStatus: status,
            selectedUser:item
           
        })
    }

    updateUserRequest = () => {
        let data = {}
        data.name=this.state.selectedUser.name
        data.status = this.state.selectedStatus;

        this.props.dispatch(updateUserVistRequest(this,data , this.state.selectedUser.id,))
        this.closeDialog()
    }
    render() {
        const { classes } = this.props;
        let {filterStatus}=this.state
        let resultRequests =  (this.props.user_site_visit_requests!==null)&&this.props.user_site_visit_requests.length > 0 ?  this.props.user_site_visit_requests.filter(item => item.status === filterStatus ) : []

        return (
            <div style={{ margin: 20 }}>
                <Grid item xs={12} sm={12} style={{ backgroundColor: "#fff", borderRadius: 5, boxShadow: "0ppx 0px rgba(0, 0, 0, 0.2)" }}>
                <Grid item xs={12} sm={12}>
                        <Toolbar style={{ justifyContent: "space-between", padding: 0 }}>
                            <div>
                                <Typography className={classes.textStyle} style={{ fontSize: "16", color: "#20478E", fontWeight: "bold" }}>{"Site Visit Requests"}</Typography>
                            </div>
                            <Chip
                                size="small"
                                label={`PENDING `}
                                color={"primary"}
                                onClick={() => this.setState({ filterStatus: 'PENDING'})}
                                className={filterStatus === 'PENDING' ? classes.activeChip : classes.inActiveChip}
                                clickable
                                onDelete={() => null}
                                deleteIcon={<Badge classes={{ badge: classes.chipBadge }} badgeContent={ this.requestsCount('PENDING') } max={999}></Badge>}
                                style={{ padding: "5px 15px", margin: "0px 10px" }}
                            />
                            <Chip
                                size="small"
                                label={`REJECTED`}
                                color={"primary"}
                                onClick={() => this.setState({ filterStatus: 'REJECTED', })}
                                className={filterStatus === 'REJECTED' ? classes.activeChip : classes.inActiveChip}
                                clickable
                                onDelete={() => null}
                                deleteIcon={<Badge classes={{ badge: classes.chipBadge }} badgeContent={this.requestsCount('REJECTED') } max={999}></Badge>}
                                style={{ padding: "5px 15px", margin: "0px 10px" }}
                            />
                            <Chip
                                size="small"
                                label={`APPROVED`}
                                color={"primary"}
                                onClick={() => this.setState({ filterStatus: 'APPROVED' })}
                                className={filterStatus === 'APPROVED' ? classes.activeChip : classes.inActiveChip}
                                clickable
                                onDelete={() => null}
                                deleteIcon={<Badge classes={{ badge: classes.chipBadge }} badgeContent={ this.requestsCount('APPROVED') } max={999}></Badge>}
                                style={{ padding: "5px 15px", margin: "0px 10px" }}
                            />
                           
                            <div style={{ display: "flex", padding: 10 }}>
                            </div>
                        </Toolbar>
                    </Grid>

                    <TableContainer style={{ backgroundColor: '#f2f2f2' }}>
                        <Table>
                            <TableHead style={{ background: "linear-gradient(to right, #2687C4, #2A98CA, #2EAAD4, #32BCD9)" }}>
                                <TableRow>
                                    <TableCell align="left" className={classes.fontCellHeader}>Name</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Company Name</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Visit Date</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Visit Time</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Status</TableCell>
                                    {filterStatus==="PENDING"&& <TableCell align="left" className={classes.fontCellHeader}>Actions</TableCell>}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    resultRequests.length > 0 ? (_.sortBy(resultRequests, 'id').map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.name}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.company_name}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{moment(item.date).format("DD-MM-YYYY")}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{ moment(item.time, "hh:mm").format('LT')}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.status}</TableCell>
                                           {filterStatus==="PENDING"&& <TableCell align="left" className={classes.fontTableCellBody}>
                                            
                                    <Button
                                        onClick={() => this.openStatusDialog("REJECTED",item)}
                                        type="Button"
                                        variant="contained"
                                        className={classes.rejectButton}
                                    >
                                        Reject
                                </Button>
                                <Button
                                    onClick={() => this.openStatusDialog("APPROVED",item)}
                                    type="Button"
                                    variant="contained"
                                    className={classes.acceptButton}
                                >
                                    Approve
                              </Button>
                                            </TableCell>}
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
                        <Typography style={{ padding: "2% 5% 0 5%", fontFamily: "Futura-Heavy" }}>{this.state.mode === "ADD" ? "Create Invoice" : "Update Invoice"}</Typography>
                    </DialogTitle>
                    <DialogContent style={{ overflowY: "hidden" }}>
                        <Grid container justify="space-between" style={{ marginTop: -20, padding: "2% 5% 0 5%" }}>

                          
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={() => this.handleSubmit(this.state.mode)} variant="contained" color="primary" className={classes.addButton}>Submit</Button>
                        <Button size="small" onClick={() => this.handleClose()} variant="contained" color="secondary" className={classes.cancelButton}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    onClose={() => this.closeDialog()}
                    aria-labelledby="simple-dialog-title"
                    maxWidth="xs"
                    open={this.state.statusDialog}>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to {this.state.selectedStatus === "REJECTED" ? "reject" : "approve"} this user?
                            </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => this.closeDialog()}
                            type="Button"
                            variant="contained"
                            className={classes.rejectButton}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => this.updateUserRequest()}
                            type="Button"
                            variant="contained"
                            className={classes.acceptButton}
                        >
                            Yes
                        </Button>
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

