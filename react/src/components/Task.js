import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/actions';
function mapStateToProps(state) {
    return {
        task: state.taskReducer.task,
        userId: state.userReducer.user.id
    }
}
const mapDispatchToProps = (dispatch) => ({
    setUserId: (userId) => dispatch(actions.setUserId(userId)),
    setTitle: (title) => dispatch(actions.setTitle(title)),
    setCompleted: (completed) => dispatch(actions.setCompleted(completed)),
    deleteTask: (idTask) => dispatch(actions.deleteTask(idTask))
})
export default connect(mapStateToProps, mapDispatchToProps)(function Task(props) {
    const { task, setTitle, setCompleted, deleteTask,textButton,func } = props;
    
    return (
        <>
                <div className="card" style={{ width: '18rem', display: "inline-block", margin: '2vw' }} data-toggle="tooltip" data-placement="right">
                    <div className="card-body" data-toggle="modal" data-target=".bd-example-modal-sm">
                        <label htmlFor="taskinput" className="form-label"><b>title: </b></label>
                        <input className="card-text" id="taskinput" value={task.title}
                            onChange={(e) => setTitle(e.target.value)}></input>
                        <label htmlFor="completedinput" className="form-label"><b>completed:</b></label>
                        <input type="checkbox" className="card-text" id="completedinput" checked={task.completed}
                            onChange={(e) => setCompleted(e.target.checked)}></input>
                    </div>
                    <button type="button" style={{ margin: '1vh' }} className="btn btn-info"
                        disabled={task.title === ''} onClick={(e) => func(task)}>{textButton}</button>
                </div>
        </>
    )
})