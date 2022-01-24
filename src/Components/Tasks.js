import Task from './Task'
const Tasks = ({tasks, onDelete, onSwitch}) => {
    return (
        <>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onSwitch={onSwitch}
                />))}
        </>
    )
}
export default Tasks
