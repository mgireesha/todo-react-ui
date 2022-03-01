import { React, useEffect, useState } from 'react';

export const TaskSteps = ({ task,onSetTask, getAuth, disableDiv, enableDiv, getServiceURI }) => {

    const [showAddNxtFld, setShowAddNxtFld] = useState(false);

    const onSetShowAddNxtFld = (event,value) => {
        setShowAddNxtFld(value);
    }

    useEffect(()=>{
        if(document.getElementById('add-nxt-fld')!==null)
            document.getElementById('add-nxt-fld').focus();
    },[showAddNxtFld]);

    const addNextStep = async(event,taskId) => {
        const stepName = event.target.value;
        if(stepName===''){
            setShowAddNxtFld(false);
            return false;
        }
        const addNxtStepPayload = {
            stepName
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
            updateStepPayLoad.stepName = event.target.value;
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

    const showRenameFld = (event,stepId) => {
        event.target.style.display='none';
        document.getElementById('add-nxt-fld-'+stepId).innerHTML=event.target.innerHTML;
        document.getElementById('add-nxt-fld-'+stepId).style.display='inline';
        document.getElementById('add-nxt-fld-'+stepId).focus();
    }

    return (
        <div style={{ fontSize: 13 }}>
                <div style={{marginTop:10}}>
                    {task.taskSteps!==null && task.taskSteps.length !== 0 && task.taskSteps.map((step,index) => 
                            <div className='task-step-elem'>
                                <label style={{width:10+'%'}}>
                                    <input type='checkbox' className='task-step-chkbx' checked={step.completed} onChange={(event)=>updateStep(event,step.stepId,'complete')}  />
                                </label>
                                <label className={step.completed ? 'strike-line' : ''} style={{color:'#b9b4b4',cursor:'text', width:80+'%' }} key={index} onClick={(event)=>showRenameFld(event,step.stepId)}>{step.stepName}</label>
                                <textarea id={'add-nxt-fld-'+step.stepId} className='c-ta-stps' placeholder='Add step' onBlur={(event)=>updateStep(event,step.stepId,'stepName')} style={{display:'none',width:80+'%'}}></textarea>
                                <label className='step-rmv-label' style={{width:10+'%'}} onClick={()=>deleteStep(step.stepId)}>X</label>
                            </div>
                    )}
                    {!showAddNxtFld && <div className='task-step-elem' style={{borderBottom:'none'}}>
                        <span className='link-look' style={{textDecoration: 'none',color:'#b9b4b4'}} onClick={(event)=>onSetShowAddNxtFld(event,true)}>+ Next Step</span>
                    </div>}
                </div>
            <div>
                {showAddNxtFld && <textarea id='add-nxt-fld' className='c-ta' placeholder='Add step' onBlur={(event)=>addNextStep(event,task.taskId)}></textarea>}
            </div>
        </div>
    );
}