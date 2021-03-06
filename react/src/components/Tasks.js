import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/actions';
import { Link,withRouter } from 'react-router-dom';
function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    addTask: (task) => dispatch(actions.addTask(task)),
})
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(function Tasks(props) {
    const [tasksArr, setTasksArr] = useState([])
    const { user, addTask,history } = props;
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then((jsonData) => {
                setTasksArr(jsonData)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    function addTaskFunc(x) {
        const data = { userId: user.id, task: x }
        fetch("http://localhost:3001/addTask", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('user')
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 401)
                    history.push('/error');
                else
                    return res.json()
            }).then((res) => {
                addTask(res.task);
                alert("The task was successfully added");
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Link to='/tasksToUser'>Show all my tasks/ Add a new task</Link><br></br>
            {tasksArr.map((x, k) => (
                <div className="card" style={{ width: '18rem', display: "inline-block", margin: '2vw' }} key={k} data-toggle="tooltip" data-placement="right" title="click me for view product">
                    <div className="card-body" data-toggle="modal" data-target=".bd-example-modal-sm">
                        <h5 className="card-title"><b>Number of task: {k + 1}</b></h5>
                        <p className="card-text" style={{ height: '4rem' }}><b>title:</b> {x.title}</p>
                        <p className="card-text"><b>completed:</b> {x.completed.toString()}</p>
                    </div>
                    <button style={{ margin: '1vh' }} className="btn btn-info" onClick={(e) => addTaskFunc(x)}>Add task</button>
                </div>
            ))}
        </>
    )
}))