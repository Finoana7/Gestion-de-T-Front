import { user_store } from "../store/user";

function Profile() {
  const { data: user } = user_store();

  return (
    <div className="flex flex-col items-center w-full h-max p-3 bg-white rounded-xl shadow-lg border">
      <div className="flex justify-start items-start gap-4 w-full">
        <img
          src={`/nest.jpg`}
          alt=""
          className="bg-white w-16 h-16 rounded-full shadow border border-neutral-300"
        />
        <div className="flex flex-col gap-2 justify-between">
          <h1 className="text-xl text-center">{user?.Role.toUpperCase()}</h1>
          <h2>{user?.Name}</h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
