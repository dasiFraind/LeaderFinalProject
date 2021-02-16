import produce from 'immer';
import createReducer from './ReducerUtil';
const initialState = {
    task: {
        _id: '',
        userId:'',
        title: "",
        completed: ''
    }
}
const tasks = {
    setId(state, action) {
        state.task._id = action.payload;
    },
    setUserId(state, action) {
        state.task.userId = action.payload;
    },
    setTitle(state, action) {
        state.task.title = action.payload;
    },
    setCompleted(state, action) {
        state.task.completed = action.payload;
    },
    setTask(state, action) {
        state.task = action.payload;
    }
}
export default produce((state, action) => createReducer(state, action, tasks), initialState);