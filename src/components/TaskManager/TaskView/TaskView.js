import React, { useRef } from "react"
import { Accordion } from "react-bootstrap"
import PropTypes from "prop-types"

import TaskHeader from "../TaskHeader/TaskHeader"
import TaskDescription from "../TaskDescription/TaskDescription"

import "../TaskManager.css"

const TaskView = props => {
  const { tasksList, query, setTasksList, getTasks } = props

  //Save reference for dragItem and dragOverItem
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  //Handle drag sorting
  const handleSort = () => {
    let taskItems = [...tasksList]
    const draggedItemContent = taskItems.splice(dragItem.current, 1)[0]
    taskItems.splice(dragOverItem.current, 0, draggedItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setTasksList(taskItems)
  }

  return (
    <Accordion defaultActiveKey={"0"}>
      {tasksList &&
        tasksList
          .filter(
            task =>
              task?.title?.toLowerCase().includes(query) ||
              task?.status?.toLowerCase().includes(query) ||
              task?.description?.toLowerCase().includes(query)
          )
          .sort((a, b) => b.priority - a.priority)
          .map((item, index) => (
            <Accordion.Item
              eventKey={index === 0 ? "0" : index}
              key={index}
              draggable
              onDragStart={e => (dragItem.current = index)}
              onDragEnter={e => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={e => e.preventDefault()}
              className="mb-2 taskItem"
            >
              <TaskHeader item={item} getTasks={getTasks} />
              <TaskDescription item={item} />
            </Accordion.Item>
          ))}
    </Accordion>
  )
}

TaskView.propTypes = {
  tasksList: PropTypes.array,
  query: PropTypes.string,
  setTasksList: PropTypes.func,
  getTasks: PropTypes.func
}

export default TaskView
