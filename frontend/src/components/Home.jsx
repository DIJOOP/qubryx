import React from 'react';

import {NavLink,Outlet} from "react-router-dom"

const Home = () => {
	

	
	  


	return (
		<div className='home_container'>
			<div className='Link_container'>
			<NavLink className="inactive" to="/">
						Home
					</NavLink>
					<NavLink className="inactive" to="/user/files">
						MyFiles
					</NavLink>
				
			</div>
			
			<Outlet/>
			
			
		</div>
	);
};

export default Home;
