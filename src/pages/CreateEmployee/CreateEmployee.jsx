import {useState} from "react";
import styles from "./CreateEmployee.module.scss";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import states from "../../data/states";
import {useAddEmployeeMutation} from "../../services/employeeApi.js";
import {Link} from "react-router-dom";
import Modal from '@angeldevvvv/react-modal';

const stateOptions = states.map(state => ({
    value: state.abbreviation,
    label: state.name
}));

const departmentOptions = [
    {value: 'sales', label: 'Sales'},
    {value: 'marketing', label: 'Marketing'},
    {value: 'engineering', label: 'Engineering'},
    {value: 'human resources', label: 'Human Resources'},
    {value: 'legal', label: 'Legal'},
];

const CreateEmployee = () => {
    const [addEmployee, { isLoading, error}] = useAddEmployeeMutation();

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        startDate: null,
        street: "",
        city: "",
        state: stateOptions[0],
        zipCode: "",
        department: departmentOptions[0],
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (date, name) => {
        setFormData({
            ...formData,
            [name]: date
        });
    };

    const handleSelectChange = (selectedOption, name) => {
        setFormData({
            ...formData,
            [name]: selectedOption
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeData = {
            ...formData,
            dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString().split('T')[0] : "",
            startDate: formData.startDate ? formData.startDate.toISOString().split('T')[0] : "",
            state: formData.state.value,
            department: formData.department.value
        }
        try {
            await addEmployee(employeeData).unwrap();
            openModal();
            // reinitalise the form
            setFormData({
                firstName: "",
                lastName: "",
                dateOfBirth: null,
                startDate: null,
                street: "",
                city: "",
                state: stateOptions[0],
                zipCode: "",
                department: departmentOptions[0],
            });
        } catch (err) {
            console.error("Error adding employee", err);
        }
    }

    return (
        <>
            <div className={styles.title}>
                <h1>HRnet</h1>
            </div>
            <div className={styles.container}>
                <Link to={'employees-list'}>View Current Employees</Link>
                <h2>Create Employee</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName}
                           onChange={handleInputChange}/>

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange}/>

                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <DatePicker
                        id="dateOfBirth"
                        selected={formData.dateOfBirth}
                        onChange={(date) => handleDateChange(date, 'dateOfBirth')}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/MM/yyyy"
                        maxDate={new Date()}
                        required
                    />

                    <label htmlFor="startDate">Start Date</label>
                    <DatePicker
                        id="startDate"
                        selected={formData.startDate}
                        onChange={(date) => handleDateChange(date, 'startDate')}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/MM/yyyy"
                        required
                    />

                    <fieldset className={styles.address}>
                        <legend>Address</legend>
                        <label htmlFor="street">Street</label>
                        <input type="text" name="street" id="street" value={formData.street} onChange={handleInputChange}/>

                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange}/>

                        <label htmlFor="state">State</label>
                        <Select
                            id="state"
                            options={stateOptions}
                            value={formData.state}
                            onChange={(option) => handleSelectChange(option, 'state')}
                            />

                        <label htmlFor="zipCode">Zip Code</label>
                        <input type="number" name="zipCode" id="zipCode" value={formData.zipCode}
                               onChange={handleInputChange}/>
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <Select
                        id="department"
                        options={departmentOptions}
                        value={formData.department}
                        onChange={(option) => handleSelectChange(option, 'department')}
                    />

                    <button type="submit">Save</button>
                </form>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                fadeDuration={2000}
            >
                <h2 id="modal-title">Employee created</h2>
                <p id="modal-description">The employee has been successfully created.</p>
            </Modal>
        </>
    )
};

export default CreateEmployee;
