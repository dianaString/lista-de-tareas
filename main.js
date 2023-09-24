'use strict'

// VARIABLES

// Objeto
const tasks = [
    { name: 'Recoger setas en el campo', completed: true},
    { name: 'Comprar pilas', completed: true},
    { name: 'Poner una lavadora de blancos', completed: true},
    { name: 'Aprender cómo se realizan las peticiones al servidor en JavaScript', completed: false},
  ];

// Html variables  
const list = document.querySelector('.js-list');
const total = document.querySelector('.js-count');

let taskCompleted = 0;
let taskNotCompleted = 0;

// FUNCIONES

// Pintar número de tareas
function renderCountTasks() {
    total.innerHTML = `Tiene ${tasks.length} tareas, completadas: ${taskCompleted}, por hacer: ${taskNotCompleted}`;
}

// Pintar tasks en list
function renderList() {
    list.innerHTML = ''; // esto evita que se duplique la lista al hacer click
    taskCompleted = 0;
    taskNotCompleted = 0;  // Se ponen los contadores cada vez que se pinta

    for( let i=0; i<tasks.length; i++){ // Si está completado
        if(tasks[i].completed){
            taskCompleted++;
            list.innerHTML += `<li class="crossed"> 
                <input type="checkbox" id=${i} checked /> ${tasks[i].name}
            </li>`
        } else if(!tasks[i].completed){ // Si NO está completado
            taskNotCompleted++;
            list.innerHTML += `<li class=""> 
                <input type="checkbox" id=${i} /> ${tasks[i].name}
            </li>`
        }    
    }
    /* taskCompleted++ y taskNotCompleted++ no son acumulativas: se hace una primera ronda ¿cuántas hay de cada?
       3 completadas y 1 hecha, siguiente click ¿cuántas hay? se hace recuento, 2 completadas y 2 hechas, y así */

    renderCountTasks(); // Se pintan las tareas y luego el número (si no se coloca, no aparece ni el texto)
}
renderList();

// Handles
function handleClick(event) { 
    let index = event.target.id;
    const liElement = event.target.parentElement;

    /*  event.target = <input> + nombre de la tarea
        event.target.parentElement = <li>
        event.currentTarget = list = <ul>   */
    
    if(event.target.tagName === 'INPUT'){   // <- Esto selecciona solo al input, sin el nombre de la tarea
        if(tasks[index].completed === true){                
            tasks[index].completed = false;              // Completado
            console.log('true');
            liElement.classList.add('crossed');
        } else if (tasks[index].completed === false){   
            tasks[index].completed = true;               // NO Completado
            liElement.classList.remove('crossed');
            console.log('false');
        }
        
    }
    renderList(); // Para actualizar cuando se pinten las tareas (si no se coloca, no actualiza)
}

// EVENT/LISTENERS
list.addEventListener('click', handleClick); 


