import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from './Blogcard';
import { BACKEND_URL } from '../config';

interface CommentProps {
  id: string;
  content: string;
  user: {
    name: string;
  };
  parentId: string | null;
  replies: CommentProps[];
}

interface CommentComponentProps {
  comment: CommentProps;
  onReply: (commentId: string) => void;
}

export function Comment({ comment, onReply }: CommentComponentProps) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg">
      <div className="flex items-start">
        <Avatar />
        <div className="flex-1 ml-5">
          <strong className="block text-lg font-semibold">{comment.user.name}</strong>
          <p className="mt-1 text-gray-700">{comment.content}</p>
          <div className="mt-2">
            {comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-blue-500 hover:underline mr-5"
              >
                {showReplies ? 'Hide Replies' : 'Show Replies'}
              </button>
            )}

            {showReplies && (
              <div className="ml-4 mt-2">
                {comment.replies.map(reply => (
                  <Comment key={reply.id} comment={reply} onReply={onReply} />
                ))}
              </div>
            )}
            <button
              onClick={() => onReply(comment.id)}
              className="text-blue-500 hover:underline"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/comment/bulk/${postId}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleReply = (commentId: string) => {
    console.log('Reply to comment ID:', commentId);
  };

  const handlePostComment = async () => {
    try {
      const userId = localStorage.getItem("uid");
      const response = await axios.post(`${BACKEND_URL}/api/v1/comment`, {
        content,
        postId,
        userId
      },{
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      
      if (response.status === 200) {
        fetchComments();
        setContent("");
      } else {
        console.error("Error posting comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Comments Section</h2>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
        <textarea
          id="content"
          //@ts-ignore
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2"
          onClick={handlePostComment}
        >
          Post Comment
        </button>
      </div>
      {Array.isArray(comments) ? (
        comments.map(comment => (
          <Comment key={comment.id} comment={comment} onReply={handleReply} />
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}