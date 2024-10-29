import styles from "./EmployeeList.module.scss";
import {useGetEmployeesQuery} from "../../services/employeeApi.js";
import {useMemo, useState} from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {Link} from "react-router-dom";

const EmployeeList = () => {
    const {data: employees, error, isLoading} = useGetEmployeesQuery()

    const [globalFilter, setGlobalFilter] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
        columnHelper.accessor('firstName', {
            header: 'First Name',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('lastName', {
            header: 'Last Name',
            cell: info => <i>{info.getValue()}</i>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('startDate', {
            header: 'Start Date',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('department', {
            header: 'Department',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('dateOfBirth', {
            header: 'Date of Birth',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('street', {
            header: 'Street',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('city', {
            header: 'City',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('state', {
            header: 'State',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('zipCode', {
            header: 'Zip Code',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
    ], [columnHelper]);

    const data = useMemo(() => employees || [], [employees]);

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination
    });

    return (
        <div>
            {isLoading && <p>Chargement des données...</p>}
            {error && <p>Erreur lors du chargement des données.</p>}
            {!isLoading && !error && data.length > 0 && (
                <>
                    <input
                        type="search"
                        placeholder="Search all columns"
                        value={globalFilter ?? ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                    />
                    <table>
                        <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>

                    </table>
                    <div>
                        <button
                            onClick={() => table.firstPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<<'}
                        </button>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>'}
                        </button>
                        <button
                            onClick={() => table.lastPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>>'}
                        </button>
                        <span>
                            Page{' '}
                            <strong>
                                {`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount().toLocaleString()}`}
                            </strong>
                        </span>
                        <span>
                            | Go to page:
                            <input
                                type="number"
                                min="1"
                                max={table.getPageCount()}
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                                  table.setPageIndex(page)
                                }}
                            />
                        </span>
                        <span>
                            Show{' '}
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={e => table.setPageSize(Number(e.target.value))}
                            >
                            {[10, 20, 30, 40, 50].map(size => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>{' '}
                            entries
                        </span>
                    </div>
                </>
            )}
            {!isLoading && !error && data.length === 0 && <p>Aucune donnée disponible.</p>}
            <Link to="/">Home</Link>
        </div>
    )
};

export default EmployeeList;
