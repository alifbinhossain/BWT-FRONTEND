import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ClassValue = string | number | boolean | null | undefined | Record<string, any>;

const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export default cn;
