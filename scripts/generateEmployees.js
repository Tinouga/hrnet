import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateEmployees = (num) => {
    const employees = [];

    for (let i = 0; i < num; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const dateOfBirth = faker.date.past(50, new Date(2002, 0, 1)).toISOString().split('T')[0]; // birthdays between 1970 and 2002
        const startDate = faker.date.past(10).toISOString().split('T')[0];
        const street = faker.location.street();
        const city = faker.location.city();
        const state = faker.location.state({ abbreviated: true })
        const zipCode = faker.location.zipCode('#####');
        const department = faker.helpers.arrayElement(['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']);

        employees.push({
            id: faker.string.uuid(),
            firstName,
            lastName,
            dateOfBirth,
            startDate,
            street,
            city,
            state,
            zipCode,
            department,
        });
    }

    return employees;
};

const employees = generateEmployees(100);

fs.writeFileSync(
    path.join(__dirname, '../src/data/sampleEmployees.json'),
    JSON.stringify(employees, null, 2),
    'utf-8'
);

console.log('Sample employees data generated successfully!');
