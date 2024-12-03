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
  const readTime = Math.ceil(plainTextContent.length / 200);

  return (
    <Link to={`/blog/${id}`} className="block">
      <div className="p-4  rounded-lg shadow-sm w-full max-w-screen-md cursor-pointer overflow-hidden">
        <div className="flex items-center mb-3">
          <Avatar name={displayAuthorName} />
          <div className="flex flex-col pl-2">
            <div className="font-extralight text-sm">{displayAuthorName}</div>
            <div className="flex items-center space-x-1 text-slate-500 text-xs">
              <Circle />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        <div className="text-xl font-bold mb-2">
          {title}
        </div>
        <div className="text-md font-thin mb-2">
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{
              __html: sanitizedContent.length > 250 ? sanitizedContent.slice(0, 250) + "..." : sanitizedContent
            }}
          />
        </div>
        <div className="text-slate-500 text-sm font-thin pt-2">
          {`${readTime} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: { name?: string | null; size?: "small" | "big" }) {
  const displayName = name || "Anonymous";
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
      <span className={`${size === "small" ? "text-xs" : "text-xl"} font-extralight text-white`}>
        {displayName[0]}
      </span>
    </div>
  );
}
