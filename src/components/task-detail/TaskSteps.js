import { React, useEffect, useState } from 'react';

import Nbsp from '../Nbsp.js';

export const TaskSteps = ({ task,onSetTask, getAuth, disableDiv, enableDiv, getServiceURI }) => {

    const [showAddNxtFld, setShowAddNxtFld] = useState(false);

    const onSetShowAddNxtFld = (event,value) => {
        setShowAddNxtFld(value);
    }

    useEffect(()=>{
        if(document.getElementById('add-nxt-fld-')!==null){
            document.getElementById('add-nxt-fld-').focus();
            if(showAddNxtFld){
                showRenameFld('','show');
            }
        }
    },[showAddNxtFld]);

    const addNextStep = async(taskId) => {
        const stepName = document.getElementById('add-nxt-fld-');
        if(stepName.value===''){
            setShowAddNxtFld(false);
            return false;
        }
        const addNxtStepPayload = {
            stepName:stepName.value
        }
        disableDiv();
        const settigs = {
            method:'POST',
            headers:{
                'Authorization': getAuth(),
                'Content-Type':'application/json; charset=UTF-8'
            },
            body:JSON.stringify(addNxtStepPayload)
        }
        const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/taskStep/`,settigs);
        const data = await response.json();
        if(data.status==='success'){
            onSetTask(data.todoTask);
            setShowAddNxtFld(false);
        }
        enableDiv();
    }

    const updateStep = async (event,stepId,action) => {
        const updateStepPayLoad = {
            stepId
        }
        if(action==='complete'){
            updateStepPayLoad.completed = event.target.checked;
        }else if(action==='stepName'){
            const txtArea = document.getElementById('add-nxt-fld-'+stepId);
            const stepIndex = txtArea.getAttribute('stepIndex');
            const currStepName = task.taskSteps[stepIndex].stepName;
            if(currStepName!==txtArea.value){
                updateStepPayLoad.stepName = txtArea.value;
            }else{
                showRenameFld(stepId,'hide');
                return false;
            }
        }
        const settigs = {
            method:'PUT',
            headers:{
                'Authorization':getAuth(),
                'Content-Type':'application/json; charset=UTF-8'
            },
            body:JSON.stringify(updateStepPayLoad)
        }
        disableDiv();
        const response = await fetch(`${getServiceURI()}/todo/task/taskStep/${action}/`,settigs);
        const data = await response.json();
        if(data.status==='success'){
            showRenameFld(stepId,'hide');
            onSetTask(data.todoTask);
        }
        enableDiv();
    }

    const deleteStep = async (stepId) => {
        const settigs = {
            method:'DELETE',
            headers:{
                'Authorization':getAuth(),
                'Content-Type':'application/json; charset=UTF-8'
            }
        }
        disableDiv();
        const response = await fetch(`${getServiceURI()}/todo/task/taskStep/${stepId}`,settigs);
        const data = await response.json();
        if(data.status==='success'){
            onSetTask(data.todoTask);
        }
        enableDiv();
    }

    const showRenameFld = (stepId,action) => {
        if(action==='show'){
            document.getElementById('add-nxt-arr-'+stepId).style.display='inline';
            document.getElementById('add-nxt-cnl-'+stepId).style.display='inline';
            document.getElementById('add-nxt-fld-'+stepId).focus();
            if(document.getElementById('add-nxt-label-'+stepId)!==null){
                document.getElementById('add-nxt-label-'+stepId).style.display='none';
                document.getElementById('add-nxt-fld-'+stepId).innerHTML
                    = document.getElementById('add-nxt-label-'+stepId).innerHTML;
                document.getElementById('add-nxt-fld-'+stepId).style.display='inline';
                document.getElementById('step-rmv-label-'+stepId).style.display='none';
            }
        }else{
            document.getElementById('add-nxt-arr-'+stepId).style.display='none';
            document.getElementById('add-nxt-cnl-'+stepId).style.display='none';
            document.getElementById('add-nxt-fld-'+stepId).style.display='none';
            setShowAddNxtFld(false);
            document.getElementById('add-nxt-label-'+stepId).style.display='';
            document.getElementById('step-rmv-label-'+stepId).style.display='inline-block';
        }
        
    }

    return (
        <div style={{ fontSize: 13 }}>
                <div style={{marginTop:10}}>
                    {task.taskSteps!==null && task.taskSteps.length !== 0 && task.taskSteps.map((step,index) => 
                            <div className='task-step-elem'>
                                <label style={{width:10+'%'}}>
                                    <input type='checkbox' className='task-step-chkbx' checked={step.completed} onChange={(event)=>updateStep(event,step.stepId,'complete')}  />
                                </label>
                                <label className={step.completed ? 'strike-line' : ''} id={'add-nxt-label-'+step.stepId} style={{color:'#b9b4b4',cursor:'text', width:80+'%' }} key={index} onClick={()=>showRenameFld(step.stepId,'show')}>{step.stepName}</label>
                                <textarea stepIndex={index} id={'add-nxt-fld-'+step.stepId} className='c-ta-stps' placeholder='Add step'  style={{display:'none',width:72+'%'}}></textarea>
                                <label id={'add-nxt-arr-'+step.stepId} style={{display:'none',cursor:'pointer',fontSize:23}} onClick={(event)=>updateStep(event,step.stepId,'stepName')}>&rarr;</label>
                                <span id={'add-nxt-cnl-'+step.stepId} style={{display:'none',cursor:'pointer',fontSize:15}} onClick={()=>showRenameFld(step.stepId,'hide')}><Nbsp/><Nbsp/>&#x2715;</span>
                                <label id={'step-rmv-label-'+step.stepId} className='step-rmv-label' style={{width:10+'%'}} onClick={()=>deleteStep(step.stepId)}>X</label>
                            </div>
                    )}
                    {!showAddNxtFld && <div className='task-step-elem' style={{borderBottom:'none'}} onClick={(event)=>onSetShowAddNxtFld(event,true)}>
                        <span className='link-look' style={{textDecoration: 'none',color:'#577db5'}} >+ Next Step</span>
                    </div>}
                </div>
            <div>
                {showAddNxtFld && 
                <div style={{borderBottom:'1px solid grey'}}>
                    <textarea id='add-nxt-fld-' className='c-ta' placeholder='Add step'></textarea>
                    <label id={'add-nxt-arr-'} style={{display:'none',cursor:'pointer',fontSize:23}} onClick={(event)=>addNextStep(task.taskId)}>&rarr;</label>
                    <span id={'add-nxt-cnl-'} style={{display:'none',cursor:'pointer',fontSize:15}} onClick={()=>showRenameFld('','hide')}><Nbsp/><Nbsp/>&#x2715;</span>
                </div> 
                }
            </div>
        </div>
    );
}