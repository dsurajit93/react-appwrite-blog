import React, {useState, useEffect} from 'react'
import blogService from '../appwrite/blogService'
import {useAuth} from "../contexts/AuthContext"
import CommentCard from './CommentCard'

const Comment = ({blog}) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")

    const {user} = useAuth()

    useEffect(()=>{
        fetchComments()
    },[])

    const fetchComments = async() => {
        let fetchedComments = await blogService.getComment(blog.$id);
        console.log("Comments: ", fetchedComments);
        if(fetchComments){
            setComments(fetchedComments.documents)
        }
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("Comment Details: ",blog.$id, user.$id, user.name, comment);
        let res = await blogService.addComment(blog.$id, user.$id, user.name, comment)
        console.log(res);
        if(res){
            setComments(prevState => [res, ...prevState])
            setComment("")
        }
    }

  return (
    <div className="row">
        <div className="col-md-10 mx-auto py-5">
            <h2>Comments</h2>
            <div className='mb-5'>
                <form method="post" onSubmit={handleSubmit}>
                    <textarea 
                        cols="30" 
                        rows="3" 
                        className="form-control rounded-0 border-0 border-bottom mb-2" 
                        placeholder="Say something about the post"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                        required
                    ></textarea>
                    <input type="submit" value="Submit" className='btn btn-secondary rounded-0' />
                </form>
            </div>
            <div className="">
                { comments.length >0 &&
                    comments.map((comment) => <CommentCard key={comment.$id} comment={comment} />)
                }
            </div>

        </div>
    </div>
  )
}

export default Comment