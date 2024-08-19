import { PiHeartFill } from "react-icons/pi";
import { Posts, PostType } from "../store/post"
import { user_store } from "../store/user";
import { motion } from "framer-motion"
import { reactPost } from "../api/post";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket.io";

export default function ListPost() {

    const { data } = Posts()
    const [postIds, mutate] = useState(data)

    useEffect(() => mutate(data), [data])

    const onPost = (post: PostType) => {
        mutate(prev => [post, ...prev]);
    };

    useEffect(() => {
        socket.connect();
        socket.on('post', onPost);
        return () => {
            socket.off('post', onPost);
            socket.disconnect();
        };
    }, []);

    return (
        <div className="flex flex-col gap-3 feeds">
            {
                postIds?.map(post => <ItemPost data={post} key={post?.id} />)
            }
        </div>
    )
}


function ItemPost({ data }: { data: PostType }) {

    const me = user_store(u => u.data)
    const [post, setP] = useState(data)

    const react = async (type: string) => {
        await reactPost({ postId: post?.id, type })
            .then((res: PostType) => {
                setP(res)
            })
    }

    const onReact = (post: PostType) => {
        if (post.id === data.id) {
            return setP(post);
        }
    };

    useEffect(() => {
        socket.connect();
        socket.on('react', onReact);
        return () => {
            socket.off('react', onReact);
            socket.disconnect();
        };
    }, []);

    return (
        <div className="relative feed">
            <div className="head"></div>
            <div className="user">
                <div className="profile-pic">
                    <img src={post?.user.photo || '/nest.jpg'} alt="" />
                </div>
                <div className="info">
                    <h3 className="font-bold text-[1.03rem]">{post?.user.id !== me?.id ? post?.user.name : 'you'}</h3>
                    <small>{post?.createdAt.slice(0, 10)}</small>
                </div>
                <span className="edit"><i className="uil uil-ellipsis-h"></i></span>
            </div>


            <div className="flex flex-col gap-1 caption my-2">
                <p className="text-lg">{post?.text}</p>
                {post?.reaction.length !== 0 ? <p><span className="font-bold">- {post?.reaction[0].user.id !== me?.id ? post?.reaction[0].user.name : 'You'}</span> {post?.reaction.length !== 1 ? <span>and <strong>{post?.reaction.length - 1} more</strong></span> : null} like it</p> : null}
            </div>

            <div className={`flex flex-col gap-2 w-full h-max ${!post?.photo ? 'pb-10' : ''}`}>
                <img src={post?.photo} alt="" className="w-full h-auto rounded-[1rem]" />
                <div className={`absolute left-[50%] ${!post?.photo ? 'bottom-2' : 'bottom-5'} -translate-x-[50%] flex gap-7 w-max py-[0.3rem] px-2 rounded-xl`}>
                    <motion.button whileTap={{ scale: 0.7 }} onClick={() => react('cool')} className={`flex flex-col justify-center items-center gap-1 react py-1 bg-white rounded-full w-7 h-7 ${post?.reaction.find(r => (r.user.id === me?.id && r.type === "cool")) ? 'active shadow-lg' : ''}`}>
                        <div className="text-xl">🔥</div>
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.7 }} onClick={() => react('like')} className={`flex justify-center items-center react p-1 bg-white rounded-full w-7 h-7 ${post?.reaction.find(r => (r.user.id === me?.id && r.type === "like")) ? 'active shadow-lg' : ''}`}>
                        <PiHeartFill className="text-cyan-700 text-xl" />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.7 }} onClick={() => react('nocare')} className={`flex flex-col justify-center items-center gap-1 react p-1 bg-white rounded-full w-7 h-7 ${post?.reaction.find(r => (r.user.id === me?.id && r.type === "nocare")) ? 'active shadow-lg' : ''}`}>
                        <div className="text-lg">🙄</div>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}