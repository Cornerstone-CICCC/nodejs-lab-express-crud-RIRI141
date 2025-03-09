"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const employeeRouter = (0, express_1.Router)();
const employees = [
    {
        id: (0, uuid_1.v4)(),
        firstname: "John",
        lastname: "Doe",
        age: 30,
        isMarried: true
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: "Jane",
        lastname: "Doe",
        age: 50,
        isMarried: false
    },
];
// Get employee list
employeeRouter.get("/", (req, res) => {
    res.status(200).json(employees);
});
// Search employees by firstname using query parameter
employeeRouter.get("/search", (req, res) => {
    const { firstname } = req.query;
    const foundEmployee = employees.filter(employee => employee.firstname.toLowerCase().includes(firstname.toLowerCase()));
    res.status(200).json(foundEmployee);
});
// Get one employee by ID
employeeRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const employee = employees.find(employee => employee.id === id);
    if (!employee) {
        res.status(404).send("Employee is not found");
        return;
    }
    res.status(200).json(employee);
});
// Add employee
employeeRouter.post("/", (req, res) => {
    const newEmployee = {
        id: (0, uuid_1.v4)(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});
// Update employee by ID
employeeRouter.put("/:id", (req, res) => {
    var _a, _b, _c, _d;
    const { id } = req.params;
    const foundIndex = employees.findIndex((employee) => employee.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Employee is not found");
        return;
    }
    const updatedEmployee = Object.assign(Object.assign({}, employees[foundIndex]), { firstname: (_a = req.body.firstname) !== null && _a !== void 0 ? _a : employees[foundIndex], lastname: (_b = req.body.lastname) !== null && _b !== void 0 ? _b : employees[foundIndex], age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employees[foundIndex], isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employees[foundIndex] });
    employees[foundIndex] = updatedEmployee;
    res.status(200).json(updatedEmployee);
});
// Delete employee by ID
employeeRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const foundIndex = employees.findIndex((employee) => employee.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Employee is not found");
        return;
    }
    employees.splice(foundIndex, 1);
    res.status(200).send("Employee is deleted");
});
exports.default = employeeRouter;
