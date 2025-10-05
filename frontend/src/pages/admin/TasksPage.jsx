import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../services/tasks";
import AdminLayout from "../../components/admin/AdminLayout";
import TaskTable from "../../components/admin/TaskTable";
import Pagination from "../../components/shared/Pagination";
import DeleteTaskModal from "../../components/admin/DeleteTaskModal";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTasks({ page }).then((data) => {
      setTasks(data.tasks);
      setPages(data.pages);
      setLoading(false);
    });
  }, [page]);

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteTask(taskToDelete._id); // use _id here
    setTasks((prev) => prev.filter((t) => t._id !== taskToDelete._id));
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Tasks</h2>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <TaskTable tasks={tasks} onDelete={openDeleteModal} />
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}

      <DeleteTaskModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        task={taskToDelete}
      />
    </AdminLayout>
  );
}
