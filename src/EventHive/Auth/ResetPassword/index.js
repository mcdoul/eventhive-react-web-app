import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../config/axiosConfig';
import { showAlert } from '../../../utils/alertHelper';

const ResetPassword = () => {
    const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
        validationCode : '',
		password: '',
        password2: ''
	});

	const { email, validationCode, password, password2 } = formData;

	const onEmailChange = (e) =>
		setFormData({ ...formData, email: e.target.value });
    const onValidationCodeChange = (e) =>
		setFormData({ ...formData, validationCode: e.target.value });
	const onPasswordChange = (e) =>
		setFormData({ ...formData, password: e.target.value });
    const onPassword2Change = (e) =>
		setFormData({ ...formData, password2: e.target.value });


	const onSubmit = async (e) => {
		e.preventDefault();
        if (password !== password2) {
			showAlert('error', 'Oops...', 'Passwords do not match!');
			return;
		}

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        const body = JSON.stringify({email, validationCode, password});

        try {
            const res = await axios.post('/users/reset-password', body, config);
            showAlert('success', 'Success!', 'Reset Successfully, Jump into Login Page');
            navigate('/EventHive/login');

        } catch (err) {
            const errors = err.response.data.errors;
    
            if (errors) {
                showAlert(
                    'error',
                    'Oops...',
                    errors.map((error) => error.msg).join('<br/>')
                );
            }
        }
	};

    const onSendValidationCode = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        const body = JSON.stringify({email});

        try {
            const res = await axios.post('/users/forgot-password', body, config);
            showAlert('success', 'Success!', `Validation code sent to ${email}`);
        } catch (err) {
            const errors = err.response.data.errors;
    
            if (errors) {
                showAlert(
                    'error',
                    'Oops...',
                    errors.map((error) => error.msg).join('<br/>')
                );
            }
        }
	};



	// if (isAuthenticated) {
	// 	// return <Navigate to='/dashboard' />;
	// 	return <Navigate to='/EventHive' />;
	// }

	return (
		<Fragment>
			<div className='container'>
				<div className='card mt-5'>
					<div className='card-body'>
						<h3 className='card-title text-center mb-5'>Reset Your Password</h3>

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
                                <div className='input-group'>
									<input
										type='text'
										className='form-control'
										placeholder='Validate Code'
										name='validationCode'
										value={validationCode}
										onChange={(e) => onValidationCodeChange(e)}
										required
									/>
                                    {' '}
									<button
										type='button'
										// className='btn btn-outline-white border-width-2 d-lg-inline-block me-2'
                                        className='btn btn-outline-white border-width-2 border-blue d-lg-inline-block me-2'
										onClick={onSendValidationCode}>
										Send Code
									</button>
								</div>
							</div>


							<div className='mb-3'>
								<input
									type='password'
									className='form-control'
									placeholder='New Password'
									name='password'
									value={password}
									onChange={(e) => onPasswordChange(e)}
									required
								/>
							</div>

                            
							<div className='mb-3'>
								<input
									type='password'
									className='form-control'
									placeholder='New Password Confirmation'
									name='password2'
									value={password2}
									onChange={(e) => onPassword2Change(e)}
									required
								/>
							</div>



							<div className='mb-3 text-center'>
								<button
									type='submit'
									className='btn btn-lg btn-outline-white border-width-2 d-lg-inline-block me-2'>
									Reset
								</button>
							</div>
						</form>

						<h5 className='mt-5 text-center text-white'>
							Remember your Password?{'   '}
							<Link
								to='/EventHive/login'
								className='btn btn-outline-white border-width-2 d-lg-inline-block me-2'>
								Click here to Login
							</Link>
						</h5>


					</div>
				</div>
			</div>
		</Fragment>
	);
};

// Login.propTypes = {
// 	login: PropTypes.func.isRequired,
// 	isAuthenticated: PropTypes.bool,
// };

// const mapStateToProps = (state) => ({
// 	isAuthenticated: state.auth.isAuthenticated,
// });

export default ResetPassword;
