import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useHrEmployeesByUUID } from '@/pages/hr/_config/query';
import { navigationItems } from '@/pages/profile/_components/navigation-items';
import { IEmployeeDetails } from '@/pages/profile/config/types';
import { IResponse, IUser } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

type INavigationItem = (typeof navigationItems)[number];

type INavigationTabTitle = INavigationItem['title'];

interface IProfileContext {
	user: IUser | null;
	readonly navigationItems: INavigationItem[];
	profileData: IEmployeeDetails | null;
	updateProfileData: UseMutationResult<
		IResponse<IEmployeeDetails>,
		AxiosError<IResponse<IEmployeeDetails>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	deleteProfileData: UseMutationResult<
		IResponse<IEmployeeDetails>,
		AxiosError<IResponse<IEmployeeDetails>, any>,
		{
			url: string;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	isLoading: boolean;
	currentTab: INavigationTabTitle;
	handleTabClick: (title: INavigationTabTitle) => void;
	refetch: () => Promise<unknown>;
}

export const ProfileContext = createContext<IProfileContext>({} as IProfileContext);

interface ProfileProviderProps {
	children: ({
		navigationItems,
		currentTab,
		handleTabClick,
	}: {
		navigationItems: readonly INavigationItem[];
		currentTab: INavigationTabTitle;
		handleTabClick: (title: INavigationTabTitle) => void;
	}) => React.ReactNode;
}

const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
	const { user } = useAuth();
	const { uuid } = useParams();
	const navigate = useNavigate();

	const { data, updateData, deleteData, isLoading, refetch } = useHrEmployeesByUUID<IEmployeeDetails>(
		uuid ? uuid : (user?.employee_uuid as string)
	);

	useEffect(() => {
		if (!uuid) {
			navigate(`/profile/${user?.employee_uuid}`);
		}
	}, [uuid, user, navigate]);

	const [currentTab, setCurrentTab] = useState<INavigationTabTitle>(navigationItems[0].title);

	const handleTabClick = useCallback((title: INavigationTabTitle) => {
		setCurrentTab(title);
	}, []);

	const value = useMemo(
		(): IProfileContext => ({
			user: user || null,
			isLoading,
			navigationItems: navigationItems as any,
			profileData: data || null,
			updateProfileData: updateData,
			deleteProfileData: deleteData,
			currentTab,
			handleTabClick,
			refetch,
		}),
		[data, isLoading, updateData, deleteData, user, currentTab, handleTabClick, refetch]
	);
	return (
		<ProfileContext.Provider value={value}>
			{children({ navigationItems, currentTab, handleTabClick })}
		</ProfileContext.Provider>
	);
};

export default ProfileProvider;
