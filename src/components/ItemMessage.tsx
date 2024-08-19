import { Message } from '../store/message'
import { user_store } from '../store/user'
import { motion } from "framer-motion"

function ItemMessage({ message }: { message: Message }) {

  const me = user_store(u => u.data)

  return (
    <div className={`flex w-full ${me?.id === message.user.id ? 'justify-end' : 'justify-start'}`}>
      {
        me?.id === message.user.id ?
          <div className='flex flex-col gap-1 items-end w-full'>
            {message.photo ? <img src={message.photo} alt="" className='w-[40%] h-auto rounded-md' /> : null}
            {message.text ? <motion.div drag dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }} className='bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-700 text-white px-2 py-1 rounded-lg max-w-[50%] text-wrap'>
              {message.text}
            </motion.div> : null}
          </div>
          :
          <div className='flex gap-3 items-end w-full'>
            <img src={message.user.photo || '/nest.jpg'} alt="" className='w-7 h-7 rounded-full' />
            <div className='flex flex-col items-start gap-1 w-full'>
              <div className='text-xs font-mono'>{message.user.name}</div>
              {message.photo ? <img src={message.photo} alt="" className='w-[40%] h-auto rounded-md shadow' /> : null}
              <div className='bg-white px-2 py-1 rounded-lg shadow max-w-[50%] text-wrap'>
                {message.text}
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default ItemMessage
