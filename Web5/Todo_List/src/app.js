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
import { isRegExp } from 'util';

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
        // Show data in console browser
        console.log(factory.copyRight());
        // Get data of localStores for include into <ul>
        let storeListInitTask = factory.getTaskInitial();
        let storeListEjecutingTask = factory.getTaskRunning();
        // Contant for know what list load..
        const ID_INITIAL = 'listInitial';
        const ID_EXECUTE = 'listExecute';
        // Initialized all elements where load to list
        factory.init( $('#listStartTasks'), $('#listMiddlewareTasks'), $('#listEndTasks') );
        //
        // ¿ Do have list elements ?
        if(Object.keys(storeListInitTask).length > 0 ){
            // Exits item task initial !!
            factory.refreshTask( ID_INITIAL, storeListInitTask, $('#listStartTasks'), ()=>{
                console.log('Loaded init list finished..');
            });
        }else{
            // Not exits item task initial.

        }

        if(Object.keys(storeListEjecutingTask).length > 0 ){
            // Exits item task executing !!
            factory.refreshTask( ID_EXECUTE, storeListEjecutingTask, $('#listMiddlewareTasks'), ()=>{
                console.log('Loaded middleware list finished..');
            });
        }else{
            // Not exits item task executing.
            
        }
        // MANAGER EVENTS
        jq('#btnAddTaskToList').click(function(ev){
            ev.preventDefault();
            // Create item into <ul id="#listStartTasks">
            factory.createItemTask($('#titleTask'), $('#listStartTasks'));
        });

    })($, (function(){
        console.log('Esto es un factoria...');
        // Properties or variables
        let count = 0;
        const TASK_INITIAL = 'taskInitial';
        const TASK_RUNNING = 'taskRunning';
        // Store Temp initial process
        let storeInitialTask = {};
        // let arrAddInitial = [];
        // Store Temp middleware process
        let storeMiddleware = {};
        // let arrAddMiddleware = [];
        // Store Temp initial process
        // let storeEndTask = {};
        // let arrAddEnd = [];
        
        /**
         * FUNCTIONS OF MODULE FACTORY TASK
         */

         /**
          * @description "Save list initial into localStore"
          * @param {String} key 
          * @param {Object} objectList 
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
                console.log(`Don\'t saved object ${JSON.stringify(_objectList)} whit key ${_key}`);
            }
        }
        //End function saveTask(key, objetList)

        /**
         * @description "Get all list from localStore over key of localStored saved."
         * @param {String} key 
         */
        function getAllTask(key){
            let _key = key || '';
            // TASK_INITIAL or TASK_RUNNING only, another thing return object empty
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
         * @description "Create init list initial if localStore have data."
         * @param {Object} obListToLoad 
         * @param {Element} elementParentToInclude 
         * @param {Function} call 
         */
        function createInitialListFirstLoader(obListToLoad, elementParentToInclude, call){
            if(typeof obListToLoad === 'object' && Object.keys(obListToLoad).length > 0 ){
                storeInitialTask = {};
                // storeMiddleware = {};
                // Iterate object
                Object.entries(obListToLoad).forEach(([key, value]) => {

                    elementParentToInclude.append(`<li class="list-group-item d-flex justify-content-between align-items-center item-init">
                    ${value}`);
                    storeInitialTask[key] = value;    
                });
                // Save
                saveTask(TASK_INITIAL, obListToLoad )

            }
            // Possible termined with call function ???
            call();
        }
        // End createInitialListFirstLoader()
        //
        /**
         * @description "Create init list middleware if localStore have data."
         * @param {Object} obListToLoad 
         * @param {Element} elementParentToInclude 
         * @param {Function} call 
         */
        function createExecuteListFirstLoader(obListToLoad, elementParentToInclude, call){
            if(typeof obListToLoad === 'object' && Object.keys(obListToLoad).length > 0 ){
                // storeInitialTask = {};
                storeMiddleware = {};
                // Iterate object
                Object.entries(obListToLoad).forEach(([key, value]) => {

                    elementParentToInclude.append(`<li class="list-group-item d-flex justify-content-between align-items-center item-init">
                    ${value}`);
                    storeMiddleware[key] = value;    
                });
                // Save
                saveTask(TASK_RUNNING, obListToLoad )

            }
            // Possible termined with call function ???
            call();
        }
        // End createExecuteListFirstLoader()



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
                
                ///////////////////////////////////////////////////
                /* Added events sortable and cursor al elements */
                /* ******************************************** */
                // Initial list new Task create
                initElemntStart.css({"cursor":"move"}).sortable({
                    connectWith: initElementMiddlewareById, // "#listMiddlewareTasks"
                    //
                    receive:(event, ui)=>{
                        event.preventDefault();
                    },
                    stop:(event, ui)=>{
                        // Clear object
                        storeInitialTask = {};
                        //
                        // Load all item of list initial.
                        $('#listStartTasks li').each((index, element)=>{
                            storeInitialTask[index]= element.childNodes[0].data.trim();
                            console.log('Iterator 3:' + index, element.childNodes[0].data.trim());
                            console.log(JSON.stringify( storeInitialTask ) );
                        });
                        // Save object into localStorage
                        saveTask( TASK_INITIAL , storeInitialTask );
                        // Test don't show
                        // console.log('Store STOP Init -> ' + JSON.stringify( storeInitialTask ) );
                    },
                    remove:(event, ui)=>{

                        // Remove class item-init the item list <li>
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center';
                        // Clear object
                        storeInitialTask = {};
                        //
                        $('#listStartTasks li').each((index, element)=>{
                            storeInitialTask[index]= element.childNodes[0].data.trim();
                            console.log('Iterator 2:' + index, element.childNodes[0].data.trim());
                            console.log(JSON.stringify( storeInitialTask ) );
                        });
                        // Save object into localStorage
                        saveTask( TASK_INITIAL , storeInitialTask );
                        // Test don't show
                        // console.log('Store Remo Init -> ' + JSON.stringify( storeInitialTask ) );
                        
                    },
                    

                });
                // Initial list middleware or in ejecution
                initElementMiddleware.css({"cursor":"move"}).sortable({
                    connectWith: initElementEndById, // "#listEndTasks",
                    //
                    receive:(event, ui)=>{
                        //
                        storeMiddleware = {};
                        // Add class 'item-middleware' on item list
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center item-middleware';
                        // Add list of <li>
                        $('#listMiddlewareTasks li').each((index, element)=>{
                            storeMiddleware[index]= element.childNodes[0].data.trim();
                            console.log('Iterator 5:' + index, element.childNodes[0].data.trim());
                            console.log(JSON.stringify( storeMiddleware ) );
                        });
                        // Save object into localStorage
                        saveTask( TASK_RUNNING , storeMiddleware );
                        // Test don't show
                        console.log('Midd_Store recive :' + JSON.stringify(storeMiddleware));
                        
                    },
                    stop:(event, ui)=>{
                        // event.preventDefault();
                        // Add list of <li>
                        $('#listMiddlewareTasks li').each((index, element)=>{
                            storeMiddleware[index]= element.childNodes[0].data.trim();
                            console.log('Iterator 6:' + index, element.childNodes[0].data.trim());
                            console.log(JSON.stringify( storeMiddleware ) );
                        });
                        // Save object into localStorage
                        saveTask( TASK_RUNNING , storeMiddleware );
                        // Test don't show
                        console.log('Midd_Store Stop -> :' + JSON.stringify(storeMiddleware));
        
                    },
                    remove:(event, ui)=>{
                        // Clear class item-middleware
                        ui.item[0].classList = 'list-group-item d-flex justify-content-between align-items-center';
                        // Clear object
                        storeMiddleware = {};
                        // Add list of <li>
                        $('#listMiddlewareTasks li').each((index, element)=>{
                            storeMiddleware[index]= element.childNodes[0].data.trim();
                            console.log('Iterator 5:' + index, element.childNodes[0].data.trim());
                            console.log(JSON.stringify( storeMiddleware ) );
                        });
                        // Save object into localStorage
                        saveTask( TASK_RUNNING , storeMiddleware );
                        // Test don't show
                        // console.log('Store Remo Middl -> ' + JSON.stringify( storeMiddleware ) );
                    },
                });
                // Innitial list Task finished
                // codeFake.txt here..
            },
            // Load Task into <ul> element the start page
            // data return of localStored.. 
            refreshTask:(idOfStore, obListToLoad, elementParentToInclude, call )=>{

                // Two value possible for list, one init second middleware
                const ID_INITIAL = 'listInitial'; // Refresh init list
                const ID_EXECUTE = 'listExecute'; // Refresh middleware list
                //
                switch(idOfStore){
                    case ID_INITIAL: 
                        if(obListToLoad !== null || elementParentToInclude !== null ){
                            createInitialListFirstLoader(obListToLoad, elementParentToInclude, call);
                        }
                        break;
                    case ID_EXECUTE:
                            if(obListToLoad !== null || elementParentToInclude !== null ){
                                createExecuteListFirstLoader(obListToLoad, elementParentToInclude, call);
                            }
                        break;
                    default:
                        return;
                }
            },
            // Return data of person created..
            copyRight(){
                const data = {
                    createBy: 'Francisco Payán',
                    description: 'Example of <Todo>',
                    showPage: 'https://github.com/fpayan'
                }
                return data;
            },
            // Update Task initial
            getTaskInitial:()=>{
                return getAllTask(TASK_INITIAL);
            },
            // Update Task middleware
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
                //console.log(JSON.stringify(localStorage.getItem(TASK_INITIAL)));
                // Get input element value
                let textTaskNew = inputElement.val();
                // Template 'li' add of 'ul' dom
                targetElement.append(`<li class="list-group-item d-flex justify-content-between align-items-center item-init">
                ${textTaskNew}`);
                storeInitialTask = {};
                // 
                if( Object.keys( JSON.stringify(localStorage.getItem(TASK_INITIAL)) ).length <= 0 ){
                    localStorage.removeItem(TASK_INITIAL);
                    console.log('Clearing...');
                }else{

                }
                $('#listStartTasks li').each((index, element)=>{
                    storeInitialTask[index]= element.childNodes[0].data.trim();
                    //storeInitialTask[index]= element.textContent.toString().trim();
                    console.log('Iterator :' + index, element.childNodes[0].data.trim());
                    console.log(JSON.stringify( storeInitialTask ) );
                });
                saveTask( TASK_INITIAL , storeInitialTask );
                // Clear input element
                inputElement.val("");
            },
            // More element of Task object here..
            // End Task inner.
        }
        // Task with actions.
        return TaskFactory;
    })());
    // End Factory Task

}); // End $('document')