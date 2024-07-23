import { useState } from "react";
import { Avatar } from "./Blogcard";

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
  onReply: (commentId: string, content: string) => void;
}

export function Comment({ comment, onReply }: CommentComponentProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = () => {
    if (replyContent.trim() === "") return;
    onReply(comment.id, replyContent);
    setReplyContent("");
    setShowReplyForm(false);
  };

  const handleReplyClick = () => {
    setShowReplyForm((prev) => !prev);
    setShowReplies(false); // Hide replies when the reply form is shown
  };

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg">
      <div className="flex items-start">
        <Avatar name={comment.user.name}/>
        <div className="flex-1 ml-5">
          <strong className="block text-lg font-semibold">
            {comment.user.name}
          </strong>
          <p className="mt-1 text-gray-700">{comment.content}</p>
          <div className="mt-2">
            {comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies((prev) => !prev)}
                className="text-blue-500 hover:underline mr-5"
              >
                {showReplies ? "Hide Replies" : "Show Replies"}
              </button>
            )}
            <button
              onClick={handleReplyClick}
              className="text-blue-500 hover:underline"
            >
              Reply
            </button>
            {showReplies && (
              <div className="ml-4 mt-2">
                {comment.replies.map((reply) => (
                  <Comment key={reply.id} comment={reply} onReply={onReply} />
                ))}
              </div>
            )}

            {showReplyForm && (
              <div className="mt-2">
                <textarea
                  rows={2}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
                  onClick={handleReplySubmit}
                >
                  Post Reply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
