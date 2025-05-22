import { CellContext } from '@tanstack/react-table';
import { SquarePen, Trash2 } from 'lucide-react';
import usePage from '@/hooks/usePage';
import useTable from '@/hooks/useTable';
import useTableSSR from '@/hooks/useTableSSR';

import { Button } from '@/components/ui/button';

interface ITableCellActionProps<TData, TValue> {
    info: CellContext<TData, TValue>;
    isSSR?: boolean;
}

function TableCellAction<TData, TValue>({ info, isSSR }: ITableCellActionProps<TData, TValue>) {
    const row = info.row;
    const { updateAccess, deleteAccess } = usePage();
    const { handleUpdate, handleDelete } = useTable();
    const { handleUpdate: handleUpdateSSR, handleDelete: handleDeleteSSR } = useTableSSR();

    return (
        <div className='flex w-full items-center justify-center gap-1'>
            {updateAccess && (isSSR ? handleUpdateSSR : handleUpdate) && (
                <Button
                    aria-label='Edit Row'
                    onClick={() => (isSSR ? handleUpdateSSR?.(row) : handleUpdate?.(row))}
                    size={'icon'}
                    variant={'ghost'}
                    className='rounded-full'
                >
                    <SquarePen className='size-4' />
                </Button>
            )}
            {deleteAccess && (isSSR ? handleDeleteSSR : handleDelete) && (
                <Button
                    aria-label='Delete Row'
                    onClick={() => (isSSR ? handleDeleteSSR?.(row) : handleDelete?.(row))}
                    size={'icon'}
                    variant={'ghost-destructive'}
                    className='rounded-full'
                >
                    <Trash2 className='size-4' />
                </Button>
            )}
        </div>
    );
}

export default TableCellAction;