import React, { useEffect} from 'react';
import './login.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors,userRegister } from '../Redux/Action/userAction';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const { isAuthenticated, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = (data) => {
		dispatch(userRegister(data));
	};

	useEffect(
		() => {
			if (isAuthenticated) {
				 navigate('/');
			}
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}
		},
		[ isAuthenticated, error ]
	);

	return (
		<div className="login_box">
			<div className="logo_box">
				<div>
					<h2>Register</h2>
				</div>
			</div>

			<div className="loginform_box">
				<form
					style={{ gap: errors.email && errors.password ? '25px' : '30px' }}
					onSubmit={handleSubmit(onSubmit)}
				>
                    <input type="text" placeholder="Name" {...register('name', { required: true, maxLength: 20 })} />
					{errors.name && <span style={{ color: 'red', fontSize: 'x-small' }}>This field is required</span>}

					<input type="email" placeholder="Email" {...register('email', { required: true, maxLength: 20 })} />
					{errors.email && <span style={{ color: 'red', fontSize: 'x-small' }}>This field is required</span>}

					<input type="password" placeholder="Password" {...register('password', { required: true })} />
					{errors.password && (
						<span style={{ color: 'red', fontSize: 'x-small' }}>This field is required</span>
					)}
                    <input type="password" placeholder="Confirm password" {...register('confirmPassword', { required: true })} />
					{errors.confirmPassword && (
						<span style={{ color: 'red', fontSize: 'x-small' }}>This field is required</span>
					)}

					<div >
                    <p>Already Have Account? <Link to="/login">Login</Link></p>
						<button type="submit">Register</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
