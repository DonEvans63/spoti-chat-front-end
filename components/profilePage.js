// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Profile.module.css';

// Profile functional component
const ProfilePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});
	const userId = cookie.get('userId');

	if (userId) {
		useEffect(() => {
			console.log('userId', userId);
			axios
				.get(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/${userId}/id}`)
				.then((response) => {
					console.log(response.data);
					// setIsLoading(false);
				})
				.catch((error) => console.error('error fetching user data', error));
		}, []);
	}

	// const getUserData = async (userId) => {
	// 	await axios
	// 		.get(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/id/${userId}}`)
	// 		.then((response) => {
	// 			setUser(response.data);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((error) => console.error('error fetching user data', error));
	// };

	// console.log(user);

	return (
		<div className={styles.profileContainer}>
			<div>
				<img
					src="/images/SlackProfile.png"
					alt="Profile Picture"
					className={styles.profilePicture}
				/>
				<h1 className={styles.profileName}>
					{user?.firstName} {user?.lastName}
				</h1>
				<p className={styles.profileBio}>Web Developer</p>
			</div>
		</div>
	);
};

// Exporting the Profile component as the default export
export default ProfilePage;
