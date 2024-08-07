import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  published_date: string;
}

const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, '');
};

export const Blogcard = ({ id, authorName, title, content, published_date }: BlogCardProps) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const plainTextContent = stripHtmlTags(sanitizedContent);
  const formattedDate = format(new Date(published_date), 'd MMMM yyyy');
  const displayAuthorName = authorName || "Anonymous";
  const readTime = Math.ceil(plainTextContent.length / 100);

  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={displayAuthorName} />
          <div className="font-extralight pl-2 text-sm justify-center flex-col">
            {displayAuthorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm justify-center flex-col">
          {formattedDate}
                    </div>
        </div>
        <div className="text-xl font-bold pt-2">
          {title}
        </div>
        <div className="text-md font-thin">
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent.length > 250 ? sanitizedContent.slice(0, 250) + "..." : sanitizedContent }}
          />
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          {`${readTime} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: { name?: string | null ; size?: "small" | "big" }) {
  const displayName = name || "Anonymous"; 
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
      <span className={`${size === "small" ? "text-xs" : "text-xl"} font-extralight text-white`}>
        {displayName[0]}
      </span>
    </div>
  );
}
