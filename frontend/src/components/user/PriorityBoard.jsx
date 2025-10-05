import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const priorities = [
  {
    key: "urgent",
    label: "Urgent",
    bg: "bg-green-100",
    color: "bg-red-400 text-white",
  },
  {
    key: "high",
    label: "Important",
    bg: "bg-blue-100",
    color: "bg-blue-400 text-white",
  },
  {
    key: "medium",
    label: "Less Important",
    bg: "bg-yellow-100",
    color: "bg-yellow-400 text-black",
  },
  {
    key: "low",
    label: "Not Important",
    bg: "bg-red-100",
    color: "bg-red-400 text-white",
  },
];

export default function PriorityBoard({ tasks, onPriorityChange }) {
  // Group tasks by priority for each quadrant
  const grouped = { urgent: [], high: [], medium: [], low: [] };
  tasks.forEach((t) => {
    grouped[t.priority]?.push(t);
  });

  // Drag-and-drop handler
  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;
    await onPriorityChange(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        className="grid grid-cols-2 grid-rows-2 gap-6"
        style={{ minHeight: "60vh" }}
      >
        {priorities.map((p) => (
          <Droppable droppableId={p.key} key={p.key}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${p.bg} p-5 rounded shadow flex flex-col`}
                style={{ minHeight: "250px" }}
              >
                <h3 className="font-bold mb-1 text-center">{p.label}</h3>
                <div className="flex flex-col space-y-3">
                  {grouped[p.key].length === 0 && (
                    <div className="text-gray-500 text-center">No tasks</div>
                  )}
                  {grouped[p.key].map((task, idx) => (
                    <Draggable key={task.id} draggableId={task.id} index={idx}>
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className={`border rounded-lg p-2 flex flex-col items-center justify-center ${p.color}`}
                          style={{ marginBottom: "10px" }}
                        >
                          <span className="font-semibold text-center">
                            {task.title}
                          </span>
                          <span className="text-xs text-center mt-1">
                            {task.description}
                          </span>
                          {/* Add extra info as needed */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
