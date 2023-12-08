import React, { Fragment, useState } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../client';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { showAlert } from '../../../utils/alertHelper'; // Adjust the path based on your project structure

const SignUp = ({ register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const onNameChange = (e) =>
		setFormData({ ...formData, name: e.target.value });
	const onEmailChange = (e) =>
		setFormData({ ...formData, email: e.target.value });
	const onPasswordChange = (e) =>
		setFormData({ ...formData, password: e.target.value });
	const onPassword2Change = (e) =>
		setFormData({ ...formData, password2: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			// Swal.fire({
			// 	icon: 'error',
			// 	title: 'Oops...',
			// 	text: 'Passwords do not match!',
			// });

			showAlert('error', 'Oops...', 'Passwords do not match!');

			return;
		}

		register({ name, email, password });
	};

	if (isAuthenticated) {
		// return <Navigate to='/dashboard' />;
		return <Navigate to='/EventHive' />;
	}

	return (
		<Fragment>
			<div className='container'>
				<div className='card mt-5'>
					<div className='card-body'>
						<h3 className='card-title text-center  mb-4'>
							Create a New Account
						</h3>

						<form onSubmit={(e) => onSubmit(e)}>
							<div className='mb-3'>
								<input
									type='text'
									className='form-control'
									placeholder='Name'
									value={name}
									onChange={(e) => onNameChange(e)}
									maxLength='20'
									required
								/>
							</div>
							<div className='mb-3'>
								<input
									type='email'
									className='form-control'
									placeholder='Email'
									value={email}
									onChange={(e) => onEmailChange(e)}
									required
								/>
							</div>
							<div className='mb-3'>
								<input
									type='password'
									className='form-control'
									placeholder='Password'
									value={password}
									onChange={(e) => onPasswordChange(e)}
									required
									minLength='8'
								/>
							</div>
							<div className='mb-3'>
								<input
									type='password'
									className='form-control'
									placeholder='Password'
									value={password2}
									onChange={(e) => onPassword2Change(e)}
									required
									minLength='8'
								/>
							</div>

							<div className='mb-3 text-center'>
								<button
									type='submit'
									className='btn btn-lg btn-outline-white border-width-2 d-lg-inline-block me-2'>
									Sign Up
								</button>
							</div>
						</form>

						<h4 className='mt-5 text-center text-white'>
							Already have an account?{'            '}
							<Link
								to='/EventHive/login'
								className='btn btn-outline-white border-width-2 d-lg-inline-block me-2'>
								Click here to Login
							</Link>
						</h4>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

SignUp.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(SignUp);
