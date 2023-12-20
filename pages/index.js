import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import useAuth from './useAuth';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import SpotifyWebApi from 'spotify-web-api-node';
import { useSearchParams } from 'next/navigation';
import cookie from 'js-cookie';

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
});

import App from './_app';
import Link from 'next/link';
import Image from 'next/image';

import Newsfeed from '../components/newsfeed';

export default function Home() {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	const accessToken = useAuth(code);
	cookie.set('accessToken', accessToken);

	// const [accessToken, setAccessToken] = useState();
	// console.log(accessToken);
	// const [search, setSearch] = useState('');

	// useEffect(() => {
	// 	const token = useAuth(code);
	// 	setAccessToken(token);
	// }, [accessToken]);

	const searchTerm = 'dandelion';
	axios
		.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => {
			console.log(res.data);
		})
		.catch((error) => {
			console.error(error);
		});

	// axios
	// 	.get('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl', {
	// 		headers: {
	// 			Authorization: `Bearer ${accessToken}`,
	// 		},
	// 	})
	// 	.then((res) => {
	// 		console.log(res.data);
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});

	// exporting the function Home
	return (
		<div className={styles.container}>
			<Head>
				<title>Spoti-Chat</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Newsfeed code={code} />
		</div>
	);
}

export const getServerSideProprs = async () => {
	// get list of shared posts from database, limit to latest 20
	// create array of shared posts objects sorted by time created
	// get data from api
	// return array to be used by newsfeed
};