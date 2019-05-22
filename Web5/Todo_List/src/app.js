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

/**
 * AUTHOR : Francisco Payán <fpayan.calero@gmail.com>
 * DESCRIPTION : This is an example of Todo for Master Full Java at Progrademia.com
 * 
 * DATE : 2019/05/22
 */
// Start my code javascript here..
$('document').ready(function(){
    console.log('Ready for example <Todo> \\O/ ');
    /**
     * AUTHOR : Francisco Payán <fpayan.calero@gmail.com>
     * DESCRIPTION : This is an example of Todo for Master Full Java at Progrademia.com
     * 
     * DATE : 2019/05/22
     */

    // Function anonimous.
    (function(jq, factory){

        
        factory.init( $('#listStartTasks'), $('#listMiddlewareTasks'), $('#listEndTasks') );
        
        //console.log(factory.ff);
        let storeListInitTask = factory.getTaskInitial();
        let storeListEjecutingTask = factory.getTaskRunning();

        console.log('>>> ' + Object.keys(storeListInitTask).length );
        console.log('>>> ' + Object.keys(storeListEjecutingTask).length );
        
        if(Object.keys(storeListInitTask).length > 0 ){
            // Exits item task initial !!

        }else{
            // Not exits item task initial.

        }

        if(Object.keys(storeListEjecutingTask).length > 0 ){
            // Exits item task executing !!

        }else{
            // Not exits item task executing.
            
        }


        //jq('.includeElement').append('<p>Esto se ha incluido</p>');
        jq('#btnAddTaskToList').click(function(ev){
            ev.preventDefault();
            factory.createItemTask($('#titleTask'), $('#listStartTasks'));
            
        });

    })($, (function(){
        console.log('Esto es un factoria...');
        // Properties or variables
        let count = 0;
        const TASK_INITIAL = 'taskInitial';
        const TASK_RUNNING = 'taskRunning';
        //
        let storeInitialTask = {};
        let arrAddInitial = [];
        //
        let storeMiddleware = {};
        let arrAddMiddleware = [];
        //
        let storeEndTask = {};
        let arrAddEnd = [];
        
        /**
         * FUNCTIONS
         * 
         */
        function saveTask(key, objectList){
            //
            let _key = key || '';
            let _objectList = objectList || {}

            if
            ( 
                ( _key !== '' && typeof _key === 'string' ) 
                &&
                ( typeof _objectList === 'object' && Object.keys(_objectList).length > 0 )
            )
            {
                localStorage.setItem(_key, JSON.stringify(_objectList));  
                console.log( `Saved object :  ${JSON.stringify(_objectList)}` );
            }else{
                console.log(`Don\'t saved object ${_objectList} whit key ${_key}`);
            }
        }
        //End function saveTask(key, objetList)
        function getAllTask(key){
            let _key = key || '';
            console.log('KEY : ' + _key);
            //
            switch(_key){
                case TASK_INITIAL:
                    storeInitialTask = JSON.parse(localStorage.getItem(TASK_INITIAL));
                    return storeInitialTask || {};
                case TASK_RUNNING:
                    storeMiddleware = JSON.parse(localStorage.getItem(TASK_RUNNING));
                    return storeMiddleware || {};
                case '':
                    console.log('Nothing what load..');
                    return {};
                default:
                    console.log('Nothing what load by default..');
                    return {};
            }
            // End switch(_key)
        }
        // End function getAllTask(key)
        
        /**
         * OBJECT TASK.
         */
        // Task object..
        let TaskFactory = {
            
            // Init three elements of 'ul' for insert Task to drag and drop event
            init:( initElemntStart, initElementMiddleware, initElementEnd )=>{
                // Get attribute 'id' of init elements 
                const initElementMiddlewareById = '#' + initElementMiddleware.attr('id');
                const initElementEndById = '#' + initElementEnd.attr('id');
                //console.log('ids', initElementMiddlewareById, initElementEndById);
                /* Added events sortable and cursor al elements */
                /* ******************************************** */
                // Initial list new Task create
                initElemntStart.css({"cursor":"move"}).sortable({
                    connectWith: initElementMiddlewareById, // "#listMiddlewareTasks"
                    
                    receive:(event, ui)=>{
                        event.preventDefault();
                    },
                    stop:(event, ui)=>{
                        // Load all item of list initial.
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-init').each((index, elem)=>{
                            storeInitialTask[index] = elem.textContent.toString().trim();
                        });
                        // Save object into localStorage
                        saveTask( TASK_INITIAL , storeInitialTask );
                        // Test don't show
                        console.log('Store Init -> ' + JSON.stringify( storeInitialTask ) );
                    },
                    remove:(event, ui)=>{
                        // Remove class item-init the item list <li>
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center';
                        // Clear object
                        storeInitialTask = {};
                        // Add list of <li>
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-init').each((index, elem)=>{
                            storeInitialTask[index] = elem.textContent.toString().trim();
                        });
                        // Save object into localStorage
                        saveTask( TASK_INITIAL , storeInitialTask );
                        // Test don't show
                        console.log('Store Remo Init -> ' + JSON.stringify( storeInitialTask ) );
                        
                    },
                    

                });
                // Initial list middleware or in ejecution
                initElementMiddleware.css({"cursor":"move"}).sortable({
                    connectWith: initElementEndById, // "#listEndTasks",
                    //
                    receive:(event, ui)=>{
                        // event.preventDefault();
                        // Add class 'item-middleware' on item list
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center item-middleware';
                        // Add list of <li>
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-middleware').each((index, elem)=>{
                            storeMiddleware[index] = elem.textContent.toString().trim();
                        });
                        // Save object into localStorage
                        saveTask( TASK_INITIAL , storeMiddleware );
                        // Test don't show
                        console.log('Midd_Store recive :' + JSON.stringify(storeMiddleware));
                        
                    },
                    stop:(event, ui)=>{
                        event.preventDefault();
                        // Add list of <li>
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-middleware').each((index, elem)=>{
                            storeMiddleware[index] = elem.textContent.toString().trim();
                        });
                        // Save object into localStorage
                        saveTask( TASK_INITIAL , storeMiddleware );
                        // Test don't show
                        console.log('Midd_Store Stop -> :' + JSON.stringify(storeMiddleware));
        
                    },
                    remove:(event, ui)=>{
                        // Clear class item-middleware
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center';
                        // Clear object
                        storeMiddleware = {};
                        // Add list of <li>
                        $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-middleware').each((index, elem)=>{
                            storeMiddleware[index] = elem.textContent.toString().trim();
                        });
                        // Save object into localStorage
                        saveTask( TASK_INITIAL , storeMiddleware );
                        // Test don't show
                        console.log('Store Remo Middl -> ' + JSON.stringify( storeMiddleware ) );
                    },
                });
                // Innitial list Task finished
                // initElementEnd.sortable({
                //     connectWith: initElementMiddlewareById, // "#listMiddlewareTasks",
                //     //scroll: false,
                //     //containment: "parent",
                //     //cancel:false,
                //     receive:(event, ui)=>{
                //         // event.preventDefault();
                        
                //         console.log('Me cago en to jquery junto....');
                //         ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center item-end';
                        
                //         $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-end').each((index, elem)=>{
                //             storeEndTask[index] = elem.textContent.toString().trim();
                //         });
                //         console.log('Store End recive :' + JSON.stringify(storeEndTask));
                //     },
                //     stop:(event, ui)=>{
                //         event.preventDefault();
                //         $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-end').each((index, elem)=>{
                //             storeEndTask[index] = elem.textContent.toString().trim();
                //         });
                //         console.log('Store End Stop -> :' + JSON.stringify(storeEndTask));
                //     },
                //     remove:(event, ui)=>{
                //         // event.preventDefault();
                //         console.log('Remo End -> ' + ui.item[0].classList);
                //         // ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center item-middleware';
                //         ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center';
                //         storeEndTask = {};
                //         $('li.list-group-item.d-flex.justify-content-between.align-items-center.item-end').each((index, elem)=>{
                //             storeEndTask[index] = elem.textContent.toString().trim();
                //         });
                //         console.log('Store Remo End -> ' + JSON.stringify( storeEndTask ) );
                //     },
                    // activate:(event, ui)=>{
                    //     ui.sender.draggable();
                    //     console.dir(ui.item[0]);
                    // }
                    
                // });
            },
            // Save Task into 
            saveTask:()=>{},
            // Update Task
            getTaskInitial:()=>{
                return getAllTask(TASK_INITIAL);
            },
            getTaskRunning:()=>{
                return getAllTask(TASK_RUNNING);
            },
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
                saveTask( TASK_INITIAL , storeInitialTask );

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
        return TaskFactory;
    })());
    // End Factory Task

}); // End $('document')