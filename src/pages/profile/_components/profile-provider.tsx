import { createContext } from 'react';
import { IUser } from '@/types';

export interface INavigationTabsProps {
	title: string;
	content: React.ReactNode;
}

interface IProfileContext {
	user: IUser | null;
	navigationItems: INavigationTabsProps[];
}

const ProfileContext = createContext;

interface ProfileProviderProps {
	navigationItems: INavigationTabsProps;
	children: React.ReactNode;
}

const ProfileProvider: React.FC<ProfileProviderProps> = () => {
	return <div>Hello</div>;
};

export default ProfileProvider;
