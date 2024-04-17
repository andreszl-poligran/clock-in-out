const awsConfig = {
	Auth: {
        // The region where your AWS resources are located.
		region: import.meta.env.AWS_REGION,
        // The region where your identity pool is located.
		identityPoolRegion: import.meta.env.VITE_IDENTITY_POOL_REGION,
        // The ID of the user pool you have created in Amazon Cognito.
		userPoolId: import.meta.env.VITE_USER_POOL_ID,
        // The client ID of the user pool app client you have created in Amazon Cognito.
		userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
	},
};

export default awsConfig;
