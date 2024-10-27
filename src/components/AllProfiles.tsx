import { useProfiles } from "../hook/data";

function AllProfiles() {
  const { data: users } = useProfiles();

  return (
    <div className="flex flex-col gap-3 w-full h-max mt-3">
      <h1>All profiles</h1>
      <div className="flex flex-col gap-3">
        {users?.map((user) => (
          <div>{user.Name}</div>
        ))}
      </div>
    </div>
  );
}

export default AllProfiles;
