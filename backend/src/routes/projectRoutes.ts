import {Router} from 'express';
import {body, param} from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { ProjectExists } from '../middleware/project';
import { taskBelongsToProject, taskExists } from '../middleware/task';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es requerido'),
    
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es requerido'),

    body('description')
        .notEmpty().withMessage('La descripcion del proyecto es requerido'),
    handleInputErrors,
    ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);

router.get('/:id', 
    param('id').isMongoId().withMessage('El id del proyecto no es válido'),
    handleInputErrors,
    ProjectController.getProjectById
);

router.put('/:id', 
    param('id').isMongoId().withMessage('El id del proyecto no es válido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es requerido'),
    
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es requerido'),

    body('description')
        .notEmpty().withMessage('La descripcion del proyecto es requerido'),
    handleInputErrors,
    ProjectController.updateProject
);

router.delete('/:id', 
    param('id').isMongoId().withMessage('El id del proyecto no es válido'),
    handleInputErrors,
    ProjectController.deleteProject
);

//Routes for tasks
router.param('projectId', ProjectExists);
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es requerido'),

    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es requerido'),

    handleInputErrors,
    TaskController.createTask
)


router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('El id del proyecto no es válido'),
    handleInputErrors,
    TaskController.getTaskById
)


router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('El id del proyecto no es válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es requerido'),

    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es requerido'),
    handleInputErrors,
    TaskController.updateTask
)


router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('El id del proyecto no es válido'),
    handleInputErrors,
    TaskController.deleteTask
)


router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('status')
        .notEmpty().withMessage('El estado es obligatio'),
        handleInputErrors,
        TaskController.updateStatus
)

export default router;