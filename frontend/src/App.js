import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gridview from './components/Gridview';
import Header from './components/Header';
import Home from './components/Home';
import Dropzone from './components/Dropzone';
import Allfiles from './components/Allfiles';
import Login from './components/Login';
import Toaster from './components/Toaster';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from './Redux/Action/userAction';
import { useEffect } from 'react';
import RequireAuth from './components/RequireAuth';

function App() {
	const { user,isAuntenticated } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			dispatch(LoadUser());
		}
	}, [user]);
	
	return (
		<div className="App">
			<Router>
				<Toaster />
				<Header />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route element={<RequireAuth/>}>
					<Route path="/" element={<Home />}>
						<Route index element={<Dropzone />} />
						<Route path="user/files" element={<Allfiles />} />
						<Route path="grid/:id" element={<Gridview />} />
						<Route path="grid" element={<Gridview />} />
					</Route>
					</Route>
				
				</Routes>
			</Router>
		</div>
	);
}

export default App;
