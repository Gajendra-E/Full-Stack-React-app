import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
	Typography, Button, Grid, TextField, InputAdornment, IconButton
} from "@material-ui/core";
import { connect } from 'react-redux';
import { compose } from "redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
 import { postLogin } from "../../src/actions/userAction";

const styles = theme => ({
	container: {
		minHeight: "80vh",
		backgroundColor: "#eaeaea",
		backgroundRepeat: "no-repeat",

	},
	card: {
		border: "1px solid #E1E7ED",
		backgroundColor: "#FFFFFF",
		boxShadow: "inset 0px 4px 0px #2FB0D5",
		borderRadius: 4,
		padding: 40,
		marginBottom: 90
	},
	inputRoot: {
		backgroundColor: "#FFFFFF",
		border: "1px solid #E1E7ED",
		borderRadius: "4px",
		fontSize: "13x !important",
		"&:hover": {
			border: "1px solid #2FB0D5",
			backgroundColor: "#FFFFFF"
		}
	},
	inputStyle: {
		fontFamily: "MaisonNeue-Book !important",
		fontSize: "13x !important",
		padding: "10px !important",
		color: "#6E8CA8",
		opacity: 1,
		"&&:after": {
			color: "#2FB0D5",
		}
	},
	underline: {
		"&&&:before": {
			borderBottom: "none"
		},
		"&&:after": {
			borderBottom: "none"
		}
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 50
	},
	textFieldContainer: {
		padding: "10px 0px"
	},
	textContainer: {
		borderRadius: 4,
		border: "1px solid #E1E7ED",
		backgroundColor: "#F7F8FA, 100%",
		padding: "5px 10px",
		margin: "15px 0px"
	},
	textStyle: {
		fontFamily: "MaisonNeue-Book",
		fontSize: "14px !important",
		padding: "3px 0px",
		color: "#6E8CA8"
	},
	buttonVariant: {
		boxShadow: "0px 0px 0px 0px #E1E7ED",
		backgroundColor: "#2FB0D5",
		margin: "15px 0px",
		fontFamily: "MaisonNeue-Book",
		color: "#fff",
		borderRadius: 3,
		padding: "8px 20px",
		height: "fit-content",
		'&:hover': {
			backgroundColor: "#2FB0D5",
		},
	},
	linkText: {
		fontFamily: "MaisonNeue-Book",
		fontSize: "14px !important",
		padding: "3px 5px",
		color: "#1844D6",
		cursor: "pointer"
	},
	errorText: {
		padding: 10,
		fontSize: 12,
		color: "#f44336",
		fontFamily: "MaisonNeue-Book"
	},
	cardTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "#2FB0D5",
		fontWeight: "bold",
		fontSize: 20,
		padding: "10px 0px"
	}
});




class Login extends Component {
	constructor() {
		super();
		this.state = {
			passwordVisible: false,
			email: "",
			password: "",
			email_error: false,
			password_error: false,
			invalid_email_error: false,
			invalid_password_error: false,
			error_text: null
		}
	}


	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	passwordValidation = (params) => {
		var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(\S){8,}$/
		return re.test(params)
	}

	submit = () => {
		let isError = false;
		let { email, password } = this.state;

		if (email === "" || email === null || email === undefined) {
			this.setState({ email_error: true })
			isError = true
		} else {
			if (!this.validateEmail(email)) {
				this.setState({ invalid_email_error: true })
				isError = true
			}
		}

		if (password === "" || password === null || password === undefined) {
			this.setState({ password_error: true })
			isError = true
		} else {
			if (!this.passwordValidation(password)) {
				this.setState({ invalid_password_error: true })
				isError = true
			}
		}
		if (isError === false) {
			let data = {}
			data.email = email;
			data.password = password;
		}

	}


	submitLogin = () => {

		this.props.dispatch(postLogin(this))
	}

	render() {
		let { classes } = this.props;
		return (
			<div className={classes.container}>
				<div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Grid container justify="center" alignItems="center">
						<Grid item xs={11} sm={7} md={3}>
							<div className={classes.imageContainer}>
							</div>
							<div className={classes.card}>
								<Typography className={classes.cardTitle}>Login</Typography>
								<div className={classes.textFieldContainer}>
									<TextField
										placeholder="Email"
										variant="filled"
										type={'email'}
										onChange={(event) => this.setState({ email: event.target.value, email_error: false, invalid_email_error: false, error_text: null })}
										InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
										fullWidth
										autoComplete="off"
										error={this.state.email_error ? true : this.state.invalid_email_error ? true : false}
										helperText={this.state.email_error ? "Please enter email address" : this.state.invalid_email_error ? "Invalid Email" : false}
									/>
								</div>
								<div className={classes.textFieldContainer}>
									<TextField
										placeholder="Password"
										variant="filled"
										type={this.state.passwordVisible ? 'text' : 'password'}
										onChange={(event) => this.setState({ password: event.target.value, password_error: false, invalid_password_error: false, error_text: null })}
										InputProps={{
											classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot },
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={() => this.setState({ passwordVisible: !this.state.passwordVisible })}
													>
														{this.state.passwordVisible ? <FiEye size={20} color="#6E8CA8" /> : <FiEyeOff size={20} color="#6E8CA8" />}
													</IconButton>
												</InputAdornment>
											)
										}}
										fullWidth
										autoComplete="off"
										error={this.state.password_error ? true : this.state.invalid_password_error ? true : false}
										helperText={this.state.password_error ? "Please enter password" : this.state.invalid_password_error ? "Invalid Password" : false} />
									<Typography className={classes.errorText}>{this.state.error_text}</Typography>
								</div>
								{/* <div className={classes.textContainer}>
									<div>
										<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: 15 }}>
											<Typography className={classes.textStyle}>At least 8 characters</Typography>
											<div className={classes.textStyle} ><FiXCircle size={16} color="#6E8CA8" /></div>
										</div>
										<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: 15 }}>
											<Typography className={classes.textStyle}>Contains a number</Typography>
											<div className={classes.textStyle}><FiXCircle size={16} color="#6E8CA8" /></div>
										</div>
										<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: 15 }}>
											<Typography className={classes.textStyle}>Uses upper and lowercase letters</Typography>
											<div className={classes.textStyle}><FiXCircle size={16} color="#6E8CA8" /></div>
										</div>
									</div>
								</div> */}
								{/* <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
									<Checkbox
										checked={this.state.remember_me}
										onChange={() => this.setState({ remember_me: !this.state.remember_me })}
										size="small" />
									<Typography className={classes.textStyle} style={{ color: "#1F4160", fontWeight: 500 }}>Remember Me</Typography>
								</div> */}
								<Button fullWidth variant="contained" className={classes.buttonVariant} onClick={() => this.submitLogin()}>Log in</Button>
								{/* <div style={{ display: "flex", justifyContent: "center" }}>
									<Typography className={classes.textStyle} style={{ color: "#1F4160" }}>Don't have an account ?</Typography>
									<Typography onClick={() => this.props.history.push("/register")} className={classes.linkText}>Register</Typography>
								</div> */}
							</div>
						</Grid>
					</Grid>
				</div>
			</div >
		)
	}
}
const mapStateToProps = (state) => {
	return {

	}
}
Login.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default compose(withStyles(styles), connect(mapStateToProps))(Login);