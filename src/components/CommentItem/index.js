import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommmentItem = props => {
  const {commentsDetails} = props
  const {id, name, comment, date, isLiked} = commentsDetails
  const initial = name ? name[0].toUpperCase : ''
  const postedTime = formatDistanceToNow(date)
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }
  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }
  return (
    <li className="comment-item">
      <div className="comment-container">
        <p className="initial">{initial}</p>

        <div className="username-time-container">
          <p className="username">{name}</p>
          <span className="time">{postedTime} ago</span>

          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-like-container">
        <img src={likeImageUrl} alt="like" className="like-image" />
        <button
          className={likeTextClassName}
          type="button"
          onClick={onClickLike}
        >
          Like
        </button>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onDeleteComment}
        data-testid="delete"
      >
        <img
          className="delete"
          src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          alt="delete"
        />
      </button>

      <hr className="comment-line" />
    </li>
  )
}
export default CommmentItem
