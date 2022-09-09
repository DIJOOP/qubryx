import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Outlet,  useNavigate } from 'react-router-dom';

const RequireAuth = () => {
	const location = useLocation();

	const navigate = useNavigate();

	const { user} = useSelector((state) => state.user);

	{
		if (user) {
			return <Outlet />;
		}
		

		// if (!user) {
		// 	console.log(location);
			navigate("/login",{state:location.pathname,replace:true})
		// 	// <Navigate to="/login" state={{ from: location }}  replace={true} />;
		// }
	}
};

export default RequireAuth;
