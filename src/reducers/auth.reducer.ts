import actions from '../actions';

// Custom hook for authentication functionality
export const useAuth = () => {
    // Return functional actions related to authentication
	return { ...actions.auth.functionalsActions };
};
