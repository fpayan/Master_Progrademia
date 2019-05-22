// Bootstrap 4.0
import 'bootstrap';
// Font awesome icons.
import '@fortawesome/fontawesome-free/js/all';
// My customer scss file
import './scss/app.scss';
// jQuery-UI
import 'jquery-ui/ui/widgets/autocomplete';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/mouse';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/selectable';
// https://sweetalert2.github.io
import Swal from 'sweetalert2';
// Start my code javascript
$('document').ready(function(){
    console.log('Ready Hi.. Updating.. ;-) \\O/ ');

    // $('#listStartTasks').css({"cursor":"move"}).sortable({
    //     connectWith: "#listMiddlewareTasks"
    // });
    // $('#listMiddlewareTasks').css({"cursor":"move"}).sortable({
    //     connectWith: "#listEndTasks",
    // });
    // $('#listEndTasks').css({"cursor":"move"}).sortable({
    //     connectWith: "#listMiddlewareTasks",
    // });
    
    (function(jq, factory){
        
        factory.init( $('#listStartTasks'), $('#listMiddlewareTasks'), $('#listEndTasks') );
        
        console.log(factory.ff);

        //jq('.includeElement').append('<p>Esto se ha incluido</p>');
        jq('#btnAddTaskToList').click(function(ev){
            ev.preventDefault();
            factory.createItemTask($('#titleTask'), $('#listStartTasks'));
            
        });

    })($, (function(){
        console.log('Esto es un factoria...');
        let count = 0;
        let _mouseMoveItem = false;
        //
        let storeInitialTask = {};
        let arrAddInitial = [];
        //
        let storeMiddleware = {};
        let arrAddMiddleware = [];
        //
        let storeEndTask = {};
        let arrAddEnd = [];
        
        // Task object..
        let Task = {
            
            // Init three elements of 'ul' for insert Task to drag and drop event
            init:( initElemntStart, initElementMiddleware, initElementEnd )=>{
                // Get attribute 'id' of init elements 
                const initElementMiddlewareById = '#' + initElementMiddleware.attr('id');
                const initElementEndById = '#' + initElementEnd.attr('id');
                console.log('ids', initElementMiddlewareById, initElementEndById);
                /* Added events sortable and cursor al elements */
                /* ******************************************** */
                // Initial list new Task create
                initElemntStart.css({"cursor":"move"}).sortable({
                    connectWith: initElementMiddlewareById, // "#listMiddlewareTasks"
                    
                    receive:(event, ui)=>{
                        event.preventDefault();
                        console.log('Initial recieved...');
                    },
                    stop:(event, ui)=>{
                        _mouseMoveItem = true;
                       // console.log('Stop Init -> : ' + ui.item[0].textContent, ui.item[0]);
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-init').each((index, elem)=>{
                            storeInitialTask[index] = elem.textContent.toString().trim();
                        });
                        console.log('Store Init -> ' + JSON.stringify( storeInitialTask ) );
                    },
                    remove:(event, ui)=>{
                        //console.log('Remo Init -> ' + ui.item[0].classList);
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center';
                        storeInitialTask = {};
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-init').each((index, elem)=>{
                            storeInitialTask[index] = elem.textContent.toString().trim();
                        });
                        console.log('Store Remo Init -> ' + JSON.stringify( storeInitialTask ) );
                        
                    },
                    

                });
                // Initial list middleware or in ejecution
                initElementMiddleware.css({"cursor":"move"}).sortable({
                    connectWith: initElementEndById, // "#listEndTasks",
                    
                    receive:(event, ui)=>{
                        // event.preventDefault();
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center item-middleware';
                        
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-middleware').each((index, elem)=>{
                            storeMiddleware[index] = elem.textContent.toString().trim();
                        });
                        console.log('Midd_Store recive :' + JSON.stringify(storeMiddleware));
                        
                    },
                    stop:(event, ui)=>{
                        event.preventDefault();
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-middleware').each((index, elem)=>{
                            storeMiddleware[index] = elem.textContent.toString().trim();
                        });
                        console.log('Midd_Store Stop -> :' + JSON.stringify(storeMiddleware));
        
                    },
                    remove:(event, ui)=>{
                        console.log('Remo Midd -> ' + ui.item[0].classList);
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center';
                        storeMiddleware = {};
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-middleware').each((index, elem)=>{
                            storeMiddleware[index] = elem.textContent.toString().trim();
                        });
                        console.log('Store Remo Middl -> ' + JSON.stringify( storeMiddleware ) );
                    },
                });
                // Innitial list Task finished
                initElementEnd.css({"cursor":"move"}).sortable({
                    connectWith: initElementMiddlewareById, // "#listMiddlewareTasks",
                    scroll: false,
                    containment: "parent",
                    cancel:false,
                    receive:(event, ui)=>{
                        // event.preventDefault();
                        
                        console.log('Me cago en to jquery junto....');
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center item-end';
                        
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-end').each((index, elem)=>{
                            storeEndTask[index] = elem.textContent.toString().trim();
                        });
                        console.log('Store End recive :' + JSON.stringify(storeEndTask));
                    },
                    stop:(event, ui)=>{
                        event.preventDefault();
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-end').each((index, elem)=>{
                            storeEndTask[index] = elem.textContent.toString().trim();
                        });
                        console.log('Store End Stop -> :' + JSON.stringify(storeEndTask));
                    },
                    remove:(event, ui)=>{
                        // event.preventDefault();
                        console.log('Remo End -> ' + ui.item[0].classList);
                        // ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center item-middleware';
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center';
                        storeEndTask = {};
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-end').each((index, elem)=>{
                            storeEndTask[index] = elem.textContent.toString().trim();
                        });
                        console.log('Store Remo End -> ' + JSON.stringify( storeEndTask ) );
                    },
                    // activate:(event, ui)=>{
                    //     ui.sender.sortable("option", "zIndex", 9999 );
                    //     console.log('Event -> ' + ui.item[0]);
                    // }
                    
                });
            },
            // Save Task into 
            saveTask:()=>{},
            // Update Task
            updateTask:()=>{},
            ff: "Francisco",
            // Create new Task and insert into 'ul' element.
            createItemTask:(inputElement, targetElement)=>{
                
                // Testing element step one
                if(! inputElement ) {
                    return;
                }
                // Testing element step two
                if(inputElement.val().length <= 0 || inputElement.val() == "" || inputElement.val() == 'undefined'){
                    Swal.fire('Debe de añadir una tarea..');
                    return;
                }
                // Get input element value
                let textTaskNew = inputElement.val();
                // Template 'li' add of 'ul' dom
                targetElement.append(`<li class="list-group-item d-flex justify-content-between align-items-center item-init">
                ${textTaskNew}`);
                //
                $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-init').each((index, elem)=>{
                    storeInitialTask[index]= elem.textContent.toString().trim();
                    console.log('Initial : ' + JSON.stringify(storeInitialTask));
                });

                // Add to text of initial task
                // arrAddInitial.push(`${textTaskNew}`);
                // // Store into Object all text of the tasks
                // arrAddInitial.forEach((item, index)=>{
                //     storeInitialTask[index]= item.trim();
                // });
                // console.log('Initial : ' + JSON.stringify(storeInitialTask));

                // Add event 'click' every item Task created.
                // targetElement.on('click', function(ev){
                //     ev.preventDefault();
                //     // let itemRemove = ev.target.parentNode;
                //     // $(itemRemove).parent().remove();
                // });
                // Clear input text Task
                inputElement.val("");
            },
            // Remove 'li' of Task 'ul'
            removeItemTask:(element)=>{
                element.click(function(ev){
                    ev.preventDefault();
                    element.remove();
                });
            },
            // Marked item who to finalized..
            markItenTaskFinalized:(element)=>{},
            

        }
        // Task with actions.
        return Task;
    })());
    // End Factory Task

}); // End $('document')