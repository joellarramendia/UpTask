import type { Request, Response } from 'express';
import Task from '../models/Task';




export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
           const task = new Task(req.body);
           task.project = req.project.id;
           req.project.tasks.push(task.id);// This is how we add a task to the project
           await Promise.allSettled([task.save(), req.project.save()]);// We save both the task and the project
           res.send('Tarea creada correctamente');
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'});
        }
    }


    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project');// We get all the tasks for the project
            res.json(tasks);
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'});
        }
    }


    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json(req.task);
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'});
        }
    }


    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description
            await req.task.save();
            res.json('Tarea actualizada correctamente');
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'});
        }
    }


    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter((task) => task.toString() !== req.task.id.toString());// We remove the task from the project

            await Promise.allSettled([req.task.deleteOne(), req.project.save()]);// We save both the task and the project

            res.json('Tarea eliminada correctamente');
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'});
        }
    }


    static updateStatus = async (req: Request, res: Response) => {
        try {
            const {status} = req.body
            req.task.status= status
            await req.task.save()
            res.send('Estado actualizado correctamente')
        } catch (error) {
            
        }
    }

    
}