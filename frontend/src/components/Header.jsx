import React, { useEffect } from 'react';
import './style.css';
import {useSelector,useDispatch} from "react-redux"
import { userLogout } from '../Redux/Action/userAction';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch=useDispatch()
	const navigate=useNavigate()
	

	const handleLogout=()=>{
	  dispatch(userLogout())
	}

	// useEffect(()=>{
	// 	if(!user)navigate("/login")  
	// },[dispatch])

	return (
		<div className="hearde_box">
			 {user&&<h1 >Hello {user.name}</h1>}
       {!user&&<h1 >Welcome</h1>}
       {user&&<button className='logout_btn' onClick={handleLogout}>Logout</button>}  
			
		</div>
	);
};

export default Header;
