interface BlogCardProps{
    authorName: string;
    title: string,
    content: string,
    publishedDate: string;
}

interface AvatarProps {
    name: string;
    size?: number; 
  }

export const Blogcard = ({authorName,title,content,publishedDate }: BlogCardProps) =>{
    return <div className="p-4 border-b border-slate-200 pb-2 w-screen max-w-screen-md ">
        <div className="flex ">
            <Avatar name={authorName}/>
           <div className="font-extralight pl-2 text-sm justify-center flex-col">
           {authorName} </div> 
           <div className="flex justify-center flex-col pl-2 ">
                <Circle/>
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm justify-center flex-col">
            {publishedDate}
            </div> 
        </div>
        <div className="text-xl font-bold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+ "..."}
        </div>
        <div className=" text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    
    </div>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}

export function Avatar( {name , size = 6 } : AvatarProps){
    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-600 rounded-full "`}>
    <span className="text-s  text-white">
            {name[0]}
    </span>
</div>
    
}