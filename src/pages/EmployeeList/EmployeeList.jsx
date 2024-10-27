import styles from "./EmployeeList.module.scss";
import {useGetEmployeesQuery} from "../../services/employeeApi.js";
import {useMemo} from "react";
import {useReactTable} from "@tanstack/react-table";

const EmployeeList = () => {
    const {data: employees, error, isLoading} = useGetEmployeesQuery();

    const columns = useMemo(() => [
        {
            Header: 'First Name',
            accessor: 'firstName',
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
        },
        {
            Header: 'Start Date',
            accessor: 'startDate',
        },
        {
            Header: 'Department',
            accessor: 'department',
        },
        {
            Header: 'Date of Birth',
            accessor: 'dateOfBirth',
        },
        {
            Header: 'Street',
            accessor: 'street',
        },
        {
            Header: 'City',
            accessor: 'city',
        },
        {
            Header: 'State',
            accessor: 'state',
        },
        {
            Header: 'Zip Code',
            accessor: 'zipCode',
        },
    ], []);

    const data = useMemo(() => employees || [], [employees]);

    const table = useReactTable({
        data,
        columns
    })
};

export default EmployeeList;
