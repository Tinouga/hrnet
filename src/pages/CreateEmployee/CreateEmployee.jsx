import {useDispatch} from "react-redux";
import {useState} from "react";
import {addEmployee} from "../../features/employeeSlice.js";
import styles from "./CreateEmployee.module.scss";

const CreateEmployee = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        department: "Sales",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addEmployee(formData));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange}/>

            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange}/>

            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}/>

            <label htmlFor="startDate">Start Date</label>
            <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange}/>

            <fieldset className={styles.address}>
                <legend>Address</legend>
                <label htmlFor="street">Street</label>
                <input type="text" name="street" id="street" value={formData.street} onChange={handleChange}/>

                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" value={formData.city} onChange={handleChange}/>

                <label htmlFor="state">State</label>
                <select name="state" id="state" value={formData.state} onChange={handleChange}>
                    <option value="">Select a state</option>
                </select>

                <label htmlFor="zipCode">Zip Code</label>
                <input type="number" name="zipCode" id="zipCode" value={formData.zipCode} onChange={handleChange}/>
            </fieldset>

            <label htmlFor="department">Department</label>
            <select name="department" id="department" value={formData.department} onChange={handleChange}>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="engineering">Engineering</option>
                <option value="human resources">Human Resources</option>
                <option value="legal">Legal</option>
            </select>

            <button type="submit">Save</button>
        </form>
    )
};

export default CreateEmployee;
