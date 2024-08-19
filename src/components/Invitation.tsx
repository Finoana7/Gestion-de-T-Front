import { acceptFamily, declineFm } from "../api/family"
import { MyInviation } from "../store/family"
import { user_store } from "../store/user"

function Invitation() {

    const addFamily = user_store(u => u.addFamily)
    const { data: invitation, mutate } = MyInviation()

    const accept = async (id: string, idInv: string) => {
        await acceptFamily(id, idInv)
            .then((res) => {
                mutate(prev => prev.filter(p => p.id !== idInv))
                addFamily(res)
            })
    }

    const decline = async (id: string, idInv: string) => {
        await declineFm(id, idInv)
            .then(() => {
                mutate(prev => prev.filter(p => p.id !== idInv))
            })
    }

    if (invitation?.length === 0) return

    return (
        <div className="friend-requests">
            <h4>Invitation</h4>
            {
                invitation?.map(inv => (
                    <div className="request" key={inv.id}>
                        <div className="info">
                            <div className="profile-pic">
                                <img src={inv.family.photo} />
                            </div>
                            <div>
                                <h5>{inv.family.name}</h5>
                                <p className="text-muted">{inv.about}</p>
                            </div>
                        </div>
                        <div className="action">
                            <button onClick={() => accept(inv.family.id, inv.id)} className="btn btn-primary">Accept</button>
                            <button onClick={() => decline(inv.family.id, inv.id)} className="btn">Decline</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Invitation
