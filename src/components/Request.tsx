import { acceptFamily, declineFm } from "../api/family"
import { TheirRequest } from "../store/family"

function Request({ id, reFetch }: { id: string, reFetch: () => void }) {

    const { data: request, mutate } = TheirRequest(id)

    const accept = async (idRq: string) => {
        await acceptFamily(id, idRq)
        .then(() => {
            mutate(prev => prev.filter(p => p.id !== idRq))
            reFetch()
        })
    }

    const decline = async (idRq: string) => {
        await declineFm(id, idRq)
        .then(() => {
            mutate(prev => prev.filter(p => p.id !== idRq))
        })
    }

    if(request?.length === 0) return

    return (
        <div className="friend-requests">
            <h4>Requests</h4>
            {
                request?.map(rq => (
                    <div className="request" key={rq.id}>
                        <div className="info">
                            <div className="profile-pic">
                                <img src={rq.user.photo || '/nest.png'} />
                            </div>
                            <div>
                                <h5>{rq.user.name}</h5>
                                <p className="text-muted">{rq.about}</p>
                            </div>
                        </div>
                        <div className="invite">
                            <button onClick={() => accept(rq.id)} className="btn btn-primary">Accept</button>
                            <button onClick={() => decline(rq.id)} className="btn">Decline</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Request
