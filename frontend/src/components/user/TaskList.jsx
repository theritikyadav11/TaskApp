import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onTaskClick }) {
  console.log(tasks);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onTaskClick={onTaskClick} />
      ))}
    </div>
  );
}
