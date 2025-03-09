import { Request, Response, Router } from "express";
import { Employee } from "../types/employee";
import { v4 as uuidv4 } from "uuid";

const employeeRouter = Router();

const employees: Employee[] = [
    {
        id: uuidv4(),
        firstname: "John",
        lastname: "Doe",
        age: 30,
        isMarried: true
    },
    {
        id: uuidv4(),
        firstname: "Jane",
        lastname: "Doe",
        age: 50,
        isMarried: false
    },
]
// Get employee list
employeeRouter.get("/", (req: Request, res: Response): void => {
    res.status(200).json(employees);
});

// Search employees by firstname using query parameter
employeeRouter.get("/search", (req: Request<{}, {}, {}, { firstname: string }>, res: Response) => {
    const { firstname } = req.query
    const foundEmployee: Employee[] = employees.filter(employee => employee.firstname.toLowerCase().includes(firstname.toLowerCase()))
    res.status(200).json(foundEmployee)
})

// Get one employee by ID
employeeRouter.get("/:id", (req: Request<{ id: string}>, res: Response) => {
    const { id } = req.params;
    const employee = employees.find(employee => employee.id === id)
    if(!employee) {
        res.status(404).send("Employee is not found");
        return;
    }
    res.status(200).json(employee)
})

// Add employee
employeeRouter.post("/", (req: Request, res: Response) => {
    const newEmployee: Employee = {
        id: uuidv4(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried
    }
    employees.push(newEmployee);
    res.status(201).json(newEmployee)
})

// Update employee by ID
employeeRouter.put("/:id", (req: Request<{ id: string}>, res: Response) => {
    const { id } = req.params
    const foundIndex = employees.findIndex((employee) => employee.id === id)
    if(foundIndex === -1) {
    res.status(404).send("Employee is not found");
    return;
    }
    const updatedEmployee: Employee = {
        ...employees[foundIndex],
        firstname: req.body.firstname ?? employees[foundIndex],
        lastname: req.body.lastname ?? employees[foundIndex],
        age: req.body.age ?? employees[foundIndex],
        isMarried: req.body.isMarried ?? employees[foundIndex]
    }
    employees[foundIndex] = updatedEmployee
    res.status(200).json(updatedEmployee)
})

// Delete employee by ID
employeeRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundIndex = employees.findIndex((employee) => employee.id === id)
    if(foundIndex === -1) {
    res.status(404).send("Employee is not found");
    return;
    }
    employees.splice(foundIndex, 1)
    res.status(200).send("Employee is deleted")
})

export default employeeRouter


