const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')

const router = express.Router();

//router.get('/', todos);
//router.get('/:id', uno);
router.get('/', consulta);
router.post('/', agregar);
router.put('/', actualizar);
router.delete('/:id', eliminar);


// Ejemplo de datos de tareas
const tasks = [
    { id: 4, title: 'Task1', description: 'Description 1', status: true },
    { id: 6, title: 'Task2', description: 'Description 2', status: false }
];


async function consulta(req, res){
    try{
        res.render('index', { tasks });
    }catch(err){
        respuesta.error(req, res, err, 500);
        console.log(err);
    }
}

async function agregar(req, res){
    try{
        
        if(req.body.id == 0){
        console.log(tasks.length);
        // Verificar si tasks es null o está vacío
        if (!tasks || tasks.length === 0) {
            tasks = []; // Inicializar tasks como un arreglo vacío si es null o vacío
        }
        
        let newTask;
        if (tasks.length === 0) {
            // Si tasks está vacío, asignar ID 1 como el primero
            newTask = { id: 1, title: req.body.titulo, description: req.body.descripcion, status: req.body.estado };
        } else {
            // Obtener el último ID y asignar el siguiente
            const lastTaskId = tasks[tasks.length - 1].id;
            console.log(req.body.estado);
            
            newTask = { id: lastTaskId + 1, title: req.body.titulo, description: req.body.descripcion, status: req.body.estado > 0 ? true : false };
        }

        // Agregar el nuevo registro al arreglo
        tasks.push(newTask);

        // Renderizar la página de nuevo con el arreglo actualizado
        res.render('index', { tasks });
        }
        
    }catch(err){
        respuesta.error(req, res, err, 500);
        console.log(err);
    }

};

async function actualizar(req, res){
    
    try {
        if (req.body.id !== 0) {
            // Verificar si tasks es null o está vacío
            if (!tasks || tasks.length === 0) {
                tasks = []; // Inicializar tasks como un arreglo vacío si es null o vacío
            }
    
            let taskToUpdate = tasks.find(task => task.id === req.body.id);
            if (taskToUpdate) {
                // Actualizar los valores de la tarea encontrada
                taskToUpdate.title = req.body.titulo;
                taskToUpdate.description = req.body.descripcion;
                taskToUpdate.status = req.body.estado;
            } else {
                // Si no se encuentra la tarea, mostrar un mensaje de error o manejar según sea necesario
                throw new Error('Tarea no encontrada para actualizar');
            }
    
            // Renderizar la página de nuevo con el arreglo actualizado
            res.json({ tasks });
        }
    } catch (err) {
        respuesta.error(req, res, err, 500);
        console.error(err);
    }
    

};

//Router de Eliminar tarea
async function eliminar(req, res){
    try{
        
        const id = req.params.id; // Obtener el parámetro 'id' de la URL
        const indexToRemove = tasks.findIndex(task => task.id == id);
        if (indexToRemove !== -1) {
            tasks.splice(indexToRemove, 1);
        }   
        console.log(tasks);
        res.json({ tasks });

    }catch(err){
         respuesta.error(req, res, err, 500);
         console.log(err);
     }
    
};


/*async function todos(req, res){
    
    try{
        const items = await controlador.todos()
        
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }

};

async function uno(req, res){
    try{
        const item = await controlador.uno(req.params.id)
        respuesta.success(req, res, item, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }

};

async function eliminar(req, res){
    try{
        //const item = await controlador.eliminar(req.body)
       // respuesta.success(req, res, 'Tarea eliminada', 200);
       res.render('index', { tasks });
    }catch(err){
        respuesta.error(req, res, err, 500);
        console.log(err);
    }

};
*/


module.exports = router;