import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import useAuth from '@/hooks/useAuth';



import User from '@/components/others/user';





const Logout = () => {
	const { logout } = useAuth();

	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			className='flex  items-center gap-3 rounded-md bg-primary px-5 py-2 text-left text-sm font-normal text-primary-foreground'
			onClick={() => {
                logout()
                window.location.href = '/login'
            }}
		>
			<LogOut className='size-6 text-primary-foreground' />
			<User />
		</motion.button>
	);
};

export default Logout;