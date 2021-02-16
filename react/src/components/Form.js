import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/actions';
function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    setName: (name) => dispatch(actions.toUpperCaseFirstLetter(name)),
    setPassword: (password) => dispatch(actions.setPassword(password))
})
export default connect(mapStateToProps, mapDispatchToProps)(function Form(props) {
     const { textButton, submitFunction, user, setName, setPassword } = props;
    return (
        <>
                <div className="mb-3">
                    <label htmlFor="nameinput" className="form-label">Name user</label>
                    <input type="text" className="form-control" id="nameinput" value={user.name}
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordinput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordinput" value={user.password}
                        onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    <div id="emailHelp" className="form-text">The password must be at least 6 characters long .</div>
                </div>
                <button type="button" className="btn btn-info" onClick={submitFunction}
                disabled={user.name===''||user.password.length<6}>{textButton}</button>
        </>
    )
})