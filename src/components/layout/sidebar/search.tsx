import { sidebarRoutes } from '@/routes';
import { IRoute } from '@/types';
import { Search as SearchIcon } from 'lucide-react';
import useSidebar from '@/hooks/useSidebar';

import DebouncedInput from '@/components/ui/debounce-input';

const Search = () => {
	const { setRoutes, setOpenRoutes } = useSidebar();

	const handleSearch = (searchTerm: string, routes: IRoute[] = []): IRoute[] => {
		const lowerCaseTerm = searchTerm.toLowerCase().trim();

		// If there's no search term, return the original array.
		if (!lowerCaseTerm) {
			return routes;
		}

		return routes.reduce<IRoute[]>((accumulator, route) => {
			// Check if the current parent route matches the search term.
			const isParentMatch =
				route.name?.toLowerCase().includes(lowerCaseTerm) ||
				route.page_name?.toLowerCase().includes(lowerCaseTerm);

			// 1. If the parent route matches, add the original route with all its
			// children to the results and stop searching deeper in this branch.
			if (isParentMatch) {
				accumulator.push(route);
				setOpenRoutes([route]);
				return accumulator;
			}

			// 2. If the parent does NOT match, proceed to check its children.
			if (route.children) {
				// Recursively call the search function on the children.
				const matchingChildren = handleSearch(searchTerm, route.children);

				// If the recursive search found any matching children...
				if (matchingChildren.length > 0) {
					// ...add a clone of the parent route but with only the filtered, matching children.
					setOpenRoutes((prev) => [...prev, route]);
					accumulator.push({ ...route, children: matchingChildren });
				}
			}

			// Return the accumulator for the next iteration.
			return accumulator;
		}, []);
	};
	return (
		<DebouncedInput
			type='search'
			value={''}
			onChange={(value) => {
				const filteredRoutes = handleSearch(value as string, sidebarRoutes);
				setRoutes(filteredRoutes);
			}}
			icon={<SearchIcon className='size-4 text-base-150' />}
			iconPosition={'left'}
			placeholder='Search...'
			className='h-fit rounded-none border-none bg-transparent text-base-150'
		/>
	);
};

export default Search;
