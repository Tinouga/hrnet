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
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            queryFn: async() => {
                const employees = getEmployeesFromLocalStorage();
                return { data: employees };
            },
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({id}) => ({type: 'Employees', id})),
                        {type: 'Employees', id: 'LIST'}
                    ] :
                    [{type: 'Employees', id: 'LIST'}]
        }),
        addEmployee: builder.mutation({
            queryFn: async(newEmployee) => {
                const employees = getEmployeesFromLocalStorage();
                const id = crypto.randomUUID();
                const employeeWithId = {id, ...newEmployee};
                const updatedEmployees = [...employees, employeeWithId];
                saveEmployeesToLocalStorage(updatedEmployees);
                return { data: employeeWithId };
            },
            invalidatesTags: [{type: 'Employees', id: 'LIST'}]
        })
    })
})

export const {useGetEmployeesQuery, useAddEmployeeMutation} = employeeApi;
