import { createContext, useMemo, useState } from 'react';
import { sidebarRoutes } from '@/routes';
import { IRoute } from '@/types';
import { useLocation } from 'react-router-dom';

interface ISidebarContext {
	path: ReturnType<typeof useLocation>;
	isCloseAll: boolean;
	setIsCloseAll: React.Dispatch<React.SetStateAction<boolean>>;
	routes: IRoute[];
	setRoutes: React.Dispatch<React.SetStateAction<IRoute[]>>;
	openRoutes: IRoute[];
	setOpenRoutes: React.Dispatch<React.SetStateAction<IRoute[]>>;
}

export const SidebarContext = createContext({} as ISidebarContext);

interface ISidebarProviderProps {
	children: React.ReactNode;
}

const SidebarProvider: React.FC<ISidebarProviderProps> = ({ children }) => {
	const path = useLocation();
	const [isCloseAll, setIsCloseAll] = useState(false);
	const [openRoutes, setOpenRoutes] = useState<IRoute[]>([]);
	const [routes, setRoutes] = useState<IRoute[]>(sidebarRoutes);

	const value = useMemo((): ISidebarContext => {
		return {
			path,
			isCloseAll,
			setIsCloseAll,
			routes,
			setRoutes,
			openRoutes,
			setOpenRoutes,
		};
	}, [path, isCloseAll, routes, openRoutes]);

	return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
