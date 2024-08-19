import { Link } from "react-router-dom"
import { user_store } from "../store/user"

function Message() {

    const me = user_store(u => u.data)

    return (
        <div className="messages">
            <div className="heading">
                <h4 className="font-bold">Messages</h4>
                <span>🤪😆🥰</span>
            </div>
            {
                me?.family.map(fm => (
                    fm.message.length !== 0 ?
                        <Link to={`/family/${fm.message[0]?.family.id}`} className="message" key={fm.id} title={fm.message[0]?.family.name}>
                            <div className="profile-pic">
                                <img src={fm.message[0]?.user?.photo || '/nest.png'} />
                                {/* <div className="active"></div> */}
                            </div>
                            <div className="message-body">
                                <h5>{fm.message[0]?.user.name}</h5>
                                <p className="text-muted">{fm.message[0]?.text || <span className="italic">Send a pic</span>}</p>
                            </div>
                        </Link>
                        : null
                ))
            }
        </div>
    )
}

export default Message
