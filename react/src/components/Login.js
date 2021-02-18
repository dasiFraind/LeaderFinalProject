import React from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/actions';
import { compose } from "redux";
import { withRouter } from 'react-router-dom';
function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    setId: (id) => dispatch(actions.setId(id)),
    setTasks: (tasks) => dispatch(actions.setTasks(tasks))
})
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(function Login(props) {
    const { user, setId, setTasks, history } = props;
    const submitFunction = async (e) => {
        e.preventDefault();
        let data = { name: user.name, password: user.password };
        fetch("http://localhost:3001/getUser", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 404)
                    alert("User not found :(")
                else return res.json()
            }
            )
            .then((user) => {
                setId(user.user._id);
                setTasks(user.user.tasks);
                localStorage.setItem('user', 'Bearer ' + user.token);
                history.push('/tasks');
            })
            .catch(err => {
                console.log("error: ", err)
            }
            )
    }
    return (
        <Form textButton="login" submitFunction={submitFunction}></Form>
    )
})
