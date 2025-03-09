import express, { Request, Response, NextFunction} from 'express'
// import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import employeeRouter from './routes/employee.routes'


const app = express()
app.use(express.json()) 
app.use(cors())

app.use("/employees", employeeRouter)
// app.get("/",(req: Request, res: Response) => {
//     res.status(404).send("Hi")
// })

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("Page not found!")
  })
  
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})