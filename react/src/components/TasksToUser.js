import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/actions';
import { Link,withRouter } from 'react-router-dom';
import Task from './Task'
function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        task: state.taskReducer.task
    }
}
const mapDispatchToProps = (dispatch) => ({
    addTask: (task) => dispatch(actions.addTask(task)),
    setTask: (task) => dispatch(actions.setTask(task)),
    deleteTask: (id) => dispatch(actions.deleteTask(id)),
    setTasks: (tasks) => dispatch(actions.setTasks(tasks)),
    setTaskInArr: (task) => dispatch(actions.setTaskInArr(task))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Tasks(props) {
    const { user, task, addTask, setTask, deleteTask, setTasks, setTaskInArr,history } = props;
    useEffect(() => {
        let token = localStorage.getItem('user');
        console.log("token: ", token)
        fetch(`http://localhost:3001/getTasksToUser/${user.id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization":token
            },
        })
            .then((res) => {
                console.log(res.status);
                if (res.status === 401)
                history.push('/error');
                res.json()
            })
            .then((data) => {
                setTasks(data.user.tasks);
            })
            .catch(err => {
                console.log("Error");
            }
            )
    }, [])
    const addTaskFunc = (task) => {
        let data = { userId: user.id, task: task };
        fetch(`http://localhost:3001/addTask`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((res) => {
                addTask(task);
                alert("The task was successfully added");
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }
    function deleteTaskFunc(x) {
        fetch(`http://localhost:3001/deleteTask/${x._id}/${user.id}`, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then((res) => {
                deleteTask(x._id);
                alert("The task was successfully deleted");
                console.log(res);
            })
            .catch(err => console.log(err))
    }
    function updateTaskFunc() {
        fetch(`http://localhost:3001/updateTask/${task._id}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then((res) => {
                setTaskInArr(task);
                alert("The task was successfully setted");
                console.log(res.task);
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Link to='/tasks' style={{ margin: '1vw' }}>Back to the tasks list</Link>
            <button type="button" className="btn btn-info" data-toggle="modal" data-target=".add-task">Add a task alone</button>
            <div className="modal fade add-task" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <Task textButton="Add task" func={addTaskFunc}></Task>
                    </div>
                </div>
            </div>
            <br></br>
            {user.tasks.length > 0 ? user.tasks.map((x, k) => (
                <div className="card" style={{ width: '18rem', display: "inline-block", margin: '2vw' }} key={k} data-toggle="tooltip" data-placement="right">
                    <div className="card-body" data-toggle="modal" data-target=".bd-example-modal-sm">
                        <h5 className="card-title"><b>Number of task: {k + 1}</b></h5>
                        <p className="card-text" style={{ height: '4rem' }}><b>title:</b> {x.title}</p>
                        <p className="card-text"><b>completed:</b> {x.completed ? "true" : "false"}</p>
                    </div>
                    <button style={{ margin: '1vh' }} type="button" className="btn btn-info" data-toggle="modal"
                        data-target=".set-task" onClick={() => setTask(x)}>Set task</button>
                    <div className="modal fade set-task" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <Task textButton="Set task" func={updateTaskFunc}></Task>
                            </div>
                        </div>
                    </div>
                    <button style={{ margin: '1vh' }} className="btn btn-info" onClick={(e) => deleteTaskFunc(x)}>Delete task</button>
                </div>
            )) :
                <p>there are no tasks to user: {user.name}</p>}
        </>
    )
}))