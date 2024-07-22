import React, { useState } from 'react';
import { Avatar } from './Blogcard';

interface CommentProps {
  userId: string;
  postId?: string;
  comId: string;
  name: string;
  content: string;
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
          <strong className="block text-lg font-semibold">{comment.name}</strong>
          <p className="mt-1 text-gray-700">{comment.content}</p>
          <div className="mt-2  ">
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
                  <Comment key={reply.comId} comment={reply} onReply={onReply} />
                ))}
              </div>
            )}
            <button
              onClick={() => onReply(comment.comId)}
              className="text-blue-500 hover:underline "
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
  initialComments: CommentProps[];
}

export function CommentsSection({ initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentProps[]>(initialComments);

  const handleReply = (commentId: string) => {
    console.log('Reply to comment ID:', commentId);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Comments Section</h2>
      <Input/>
      {comments.map(comment => (
        <Comment key={comment.comId} comment={comment} onReply={handleReply} />
      ))}
    </div>
   
  );
}

export const exampleComments: CommentProps[] = [
  {
    userId: '01a',
    comId: '012',
    name: 'ved69',
  content: 'Hey, Loved your blog!',
    replies: [
      {
        userId: '02a',
        comId: '013',
        name: 'Hitler',
      content: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰',
        replies: []
      },
      {
        userId: '01a',
        comId: '014',
        name: 'ved69',
      content: 'thanks!😊',
        replies: []
      }
    ]
  },
  {
    userId: '02b',
    comId: '017',
    name: 'Huehue',
  content: 'I have a doubt about the 4th point🤔',
    replies: []
  }
];


  const Input= () => {
        
    return  <div>
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
    <textarea id="content" 
        //@ts-ignore
    rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."/>

    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2">Post Comment</button>

    </div>

    
}