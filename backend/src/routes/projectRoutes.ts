import {Router} from 'express';
import {body, param} from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

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

export default router;