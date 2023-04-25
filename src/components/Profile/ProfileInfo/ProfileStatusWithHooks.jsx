import React, {Component, useEffect, useState} from 'react';

export const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)             // это делается из-за того что после отрисовки статус не всегда успевает подтягиваться и инпут со статусом может быть пустым
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = e => {
    const value = e.target.value
    setStatus(value)
  }



    return (
      <div>
        {!editMode &&
          <div>
            <b>Status </b><span onClick={activateEditMode}>{props.status || 'no status'}</span>
          </div>
        }
        {editMode &&
          <div>
            <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
          </div>
        }
      </div>
    );
}


