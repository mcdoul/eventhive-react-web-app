import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		isAdministrator: false, // New field for the Administrator checkbox
	});

	const { email, password, isAdministrator } = formData;

	const onEmailChange = (e) =>
		setFormData({ ...formData, email: e.target.value });
	const onPasswordChange = (e) =>
		setFormData({ ...formData, password: e.target.value });

	const onCheckboxChange = (e) =>
		setFormData({ ...formData, isAdministrator: e.target.checked });

	const onSubmit = async (e) => {
		e.preventDefault();
		// login(email, password);
		login(email, password, isAdministrator);
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
						<h3 className='card-title text-center mb-5'>Login Your Account</h3>

						<form onSubmit={(e) => onSubmit(e)}>
							<div className='mb-3'>
								<input
									type='email'
									className='form-control'
									placeholder='Email'
									name='email'
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
									name='password'
									value={password}
									onChange={(e) => onPasswordChange(e)}
									required
								/>
							</div>

							<div className='mb-3 form-check'>
								<input
									type='checkbox'
									className='form-check-input'
									id='adminCheckbox'
									checked={isAdministrator}
									onChange={(e) => onCheckboxChange(e)}
								/>
								<label className='form-check-label' htmlFor='adminCheckbox'>
									Are you an Administrator?
								</label>
							</div>

							<div className='mb-3 text-center'>
								<button
									type='submit'
									className='btn btn-lg btn-outline-white border-width-2 d-lg-inline-block me-2'>
									Login
								</button>
							</div>
						</form>

						<h5 className='mt-5 text-center text-white'>
							Don't have an account?{'   '}
							<Link
								to='/EventHive/signup'
								className='btn btn-outline-white border-width-2 d-lg-inline-block me-2'>
								Click here to Sign Up
							</Link>
						</h5>

						<h5 className='mt-5 text-center text-white'>
							Forget Password?{'   '}
							<Link
								to='/EventHive/resetpassword'
								className='btn btn-outline-white border-width-2 d-lg-inline-block me-2'>
								Click here to Reset
							</Link>
						</h5>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
