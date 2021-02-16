import produce from 'immer';
import createReducer from './ReducerUtil';
const initialState = {
    user: {
        id: '',
        name: '',
        password: '',
        tasks: [

        ]
    }
}
const users = {
    setId(state, action) {
        state.user.id = action.payload;
    },
    setName(state, action) {
        state.user.name = action.payload;
    },
    setPassword(state, action) {
        state.user.password = action.payload;
    },
    setTasks(state, action) {
        state.user.tasks = action.payload;
    },
    addTask(state, action) {
        state.user.tasks.push(action.payload);
    },
    deleteTask(state, action) {
        let tasksArr = [];
        for (let i = 0; i < state.user.tasks.length; i++) {
            if (state.user.tasks[i]._id!= action.payload)
                tasksArr.push(state.user.tasks[i]);
        }
        state.user.tasks = tasksArr;
    },
    setTaskInArr(state, action) {
        let tasksArr = state.user.tasks;
        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i]._id === action.payload._id) {
                state.user.tasks[i] = action.payload;
                break;
            }
        }
    }
}
export default produce((state, action) => createReducer(state, action, users), initialState);