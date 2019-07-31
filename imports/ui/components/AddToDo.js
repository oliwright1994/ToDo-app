import React from "react";

const AddToDo = ({ focusTarget, addToDo }) => {
  return (
    <div className="add-todo">
      <form name="addTodo" onSubmit={addToDo}>
        <input type="text" ref={focusTarget} />
        <span>(press enter to add)</span>
      </form>
    </div>
  );
};

export default AddToDo;
