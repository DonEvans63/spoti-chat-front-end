// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Profile.module.css';

// Profile functional component
const EditProfilePage = ({ user, setIsEditing }) => {
	const [isLoading, setIsLoading] = useState(true);
	const userId = cookie.get('userId');
	const [userInput, setUserInput] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
		password: user.password,
		confirmPassword: user.password,
		bio: user.bio || '',
		dateOfBirth: user.dateOfBirth || 'N/A',
	});

	const handleChange = (e) => {
		// e.preventDefault();
		setUserInput((prevValue) => {
			return {
				...prevValue,
				[e.target.name]: e.target.value,
			};
		});
	};

	const onSubmit = async (e) => {
		const {
			firstName,
			lastName,
			email,
			username,
			password,
			confirmPassword,
			bio,
			dateOfBirth,
		} = user;
		e.preventDefault();

		// if any are empty, return error
		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			username === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			setError('Missing a value');
		} else if (password !== confirmPassword) {
			setError("Passwords don't match");
		} else {
			setError(''); // clear the error message
			handleSignup(e);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.profileTop}>
				<img
					src="/images/SlackProfile.png"
					alt="Profile Picture"
					className={styles.profilePicture}
				/>
			</div>
			<form action="/" className={styles.profileInputForm}>
				<div className={styles.profileDetail}>
					<div className={styles.profileInputContainer}>
						<p className={styles.profileData}>First name: </p>
						<input
							className={styles.input}
							type="text"
							value={userInput.firstName}
							name="firstName"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<p className={styles.profileData}>Last name: </p>
						<input
							className={styles.input}
							type="text"
							value={userInput.lastName}
							name="lastName"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<p className={styles.profileData}>Email address: </p>
						<input
							className={styles.input}
							type="text"
							value={userInput.email}
							name="email"
							onChange={handleChange}
							required
						/>
					</div>

					<p className={styles.profileData}>Username: </p>
					<input
						className={styles.input}
						type="text"
						value={userInput.username}
						name="username"
						onChange={handleChange}
						required
					/>

					<div className={styles.profileInputContainer}>
						<p className={styles.profileData}>Password: </p>
						<input
							className={styles.input}
							type="password"
							value={userInput.password}
							name="password"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<p className={styles.profileData}>Confirm password: </p>
						<input
							className={styles.input}
							type="password"
							value={userInput.confirmPassword}
							name="confirmPassword"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<p className={styles.profileData}>Date of Birth: </p>
						<input
							className={styles.input}
							type="text"
							value={userInput.dateOfBirth}
							name="dateOfBirth"
							onChange={handleChange}
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<p className={styles.profileData}>Bio: </p>
						<textarea
							className={styles.input}
							type="textArea"
							value={userInput.bio}
							name="bio"
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className={styles.btnContainer}>
					<div class={styles.saveEditBtn} onClick={() => setIsEditing(true)}>
						Save Profile
					</div>
					<div class={styles.cancelEditBtn} onClick={() => setIsEditing(false)}>
						Cancel
					</div>
				</div>
			</form>
		</div>
	);
};

// Exporting the Profile component as the default export
export default EditProfilePage;
