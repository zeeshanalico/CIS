import React from 'react';

const Table = ({ children }: { children: React.ReactNode }) => {
    return (
        <table className="p-2 min-w-full bg-white border border-gray-200" style={{ boxShadow: 'inset 1px 1px 4px 4px #F9FAFB' }}>
            {children}
        </table>
    );
};

export const Th = ({ heading }: { heading: string }) => {
    return (
        <th className='px-4 py-2 text-sm border-b'>{heading}</th>
    );
};

interface TdProps extends React.HTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
}

export const Td: React.FC<TdProps> = ({ children, className = '', ...props }) => {
    return (
        <td className={`text-center px-4 py-2 border-b ${className}`} {...props}>
            {children}
        </td>
    );
};
export const Tr = ({ children }: { children: React.ReactNode }) => {
    return (
        <tr className="hover:bg-gray-100">
            {children}
        </tr>
    );
};

export default Table;
