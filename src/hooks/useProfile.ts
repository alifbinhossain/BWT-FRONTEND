import { useContext } from 'react';
import { ProfileContext } from '@/context/ProfileContext';

const useProfile = () => {
	const context = useContext(ProfileContext);

	if (!context) {
		throw new Error('useProfile must be used within an ProfileProvider');
	}

	return context;
};

export default useProfile;
