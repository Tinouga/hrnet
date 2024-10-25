import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const getEmployeesFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('employees');
        if(serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch(err) {
        console.error("Error getting employees from local storage", err);
        return [];
    }
}

const saveEmployeesToLocalStorage = (employees) => {
    try {
        const serializedState = JSON.stringify(employees);
        localStorage.setItem('employees', serializedState);
    } catch(err) {
        console.error("Error saving employees to local storage", err);
    }
}

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    tagTypes: ['Employee'],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            queryFn: async() => {
                const employees = getEmployeesFromLocalStorage();
                return { data: employees };
            },
        }),
        addEmployees: builder.mutation({
            queryFn: async(newEmployee) => {
                const employees = getEmployeesFromLocalStorage();
            }
        })
    })
})
