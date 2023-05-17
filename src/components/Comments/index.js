import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], userNameInput: '', commentInput: ''}

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onChangeUserName = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComments = event => {
    event.preventDefault()
    const {userNameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComments = {
      id: uuidv4(),
      name: userNameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComments],
      userNameInput: '',
      commentInput: '',
    }))
  }

  render() {
    const {commentsList, userNameInput, commentInput} = this.state
    return (
      <div className="app-container">
        <div className="bg-container">
          <h1 className="heading">Comments</h1>
          <div className="forms-and-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />

            <form onSubmit={this.onAddComments} className="form">
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>

              <input
                type="text"
                className="name"
                placeholder="Your Name"
                value={userNameInput}
                onChange={this.onChangeUserName}
              />
              <textarea
                className="comment"
                placeholder="Your Comment"
                onChange={this.onChangeComment}
                rows="5"
                value={commentInput}
              />
              <button type="submit" value={commentInput} className="add-button">
                Add Comment
              </button>
            </form>
          </div>

          <hr className="line" />
          <div className="comments-count-container">
            <span className="comments-count">{commentsList.length}</span>
            <p className="paragraph">Comments</p>
          </div>
          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentsDetails={eachComment}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
