const awsConfig = {
	Auth: {
		region: import.meta.env.AWS_REGION,
		identityPoolRegion: import.meta.env.VITE_IDENTITY_POOL_REGION,
		userPoolId: import.meta.env.VITE_USER_POOL_ID,
		userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
	},
};

export default awsConfig;