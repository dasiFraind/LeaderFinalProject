import React from 'react';
import {
    Link,
    Switch,
    Route,
} from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Task from './Task';
import Tasks from './Tasks';
import TasksToUser from './TasksToUser';
export default function Menu() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav">
                        <Link to='/' className="nav-link active">Home</Link>
                        <Link to='/login' className="nav-link active">Login</Link>
                        <Link to='/register' className="nav-link active">Register</Link>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path='/login'><Login /></Route>
                <Route path='/register'><Register /></Route>
                <Route path='/task'><Task/></Route>
                <Route path='/tasks'><Tasks/></Route>
                <Route path='/tasksToUser'><TasksToUser /></Route>
                <Route path='/'><h1>Welcome</h1></Route>
            </Switch>
        </>
    )
}