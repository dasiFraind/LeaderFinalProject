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
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(function Register(props) {
    const { user, setId, history } = props;
    const submitFunction = async () => {
        let data = { name: user.name, password: user.password };
        fetch("http://localhost:3001/addUser", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((user) => {
                setId(user.user._id);
                console.log(user);
                history.push('/tasks');
            })
            .catch(err => console.log(err))
    }
    return (
        <Form textButton="register" submitFunction={() => submitFunction()}></Form>
    )
})
