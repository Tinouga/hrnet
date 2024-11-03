import sampleEmployees from '../data/sampleEmployees.json';

/**
 * Initialize local storage with sample employees data if it doesn't already exist
 */
export const initializeLocalStorage = (overwrite = false) => {
    const existingEmployees = localStorage.getItem('employees');
    if(!existingEmployees || overwrite) {
        localStorage.setItem('employees', JSON.stringify(sampleEmployees));
        console.log('Employees initialized in local storage with sample data');
    } else {
        console.log('Employees already exist in local storage');
    }
}
