import React from 'react'

const CommentCard = ({comment}) => {
  return (
    <div className='card border-0 border-bottom rounded-0 pb-2'>
        <div className="card-body">
            <h5>{comment.user_name}</h5>
            <small className='text-secondary'>{new Date(comment.$createdAt).toLocaleString()}</small>
            <p className="lead my-1">{comment.comment}</p>
        </div>
    </div>
  )
}

export default CommentCard