import { useEffect, useRef } from "react";
import useQuery from "../hook/useQuery";
import { Button, Input, Option, Select } from "@mui/joy";
import { createUser } from "../api/user";
import toast from "react-hot-toast";


function AddProfile() {

  const add = useQuery("add");
  const password = useRef(Date.now().toString())

  useEffect(() => {
    sessionStorage.setItem("pass", password.current)
  }, [])

  if (!add || add !== "true") {
    return <></>;
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const data = {
      name: String(form.get("name")).trim(),
      role: String(form.get("role")).trim(),
      password: password.current
    }

    await createUser(data)
    .then(() => {
      toast.success("created !")
    })
    .catch((err) => {
      toast.error(err.response?.message)
    })
  }

  return (
    <div className="absolute z-50 flex items-center justify-center w-screen h-screen inset-0 backdrop-blur-[2px] bg-black/50">
      <div className="flex flex-col items-center px-4 py-7 gap-8 w-[25rem] bg-white rounded-xl">
        <img
          src={`/nest.jpg`}
          alt=""
          className="bg-white w-20 h-20 rounded-full shadow border border-neutral-300"
        />
        <form onSubmit={submit} action="" className="flex flex-col gap-3 w-full">
          <Input placeholder="Name" name="name" required/>
          <Select defaultValue="editeur" name="role" required>
            <Option value="admin">Admin</Option>
            <Option value="editeur">Editeur</Option>
            <Option value="observateur">Observateur</Option>
          </Select>
          <Button type="submit" variant="soft" className="p-2">Create</Button>
        </form>
      </div>
    </div>
  );
}

export default AddProfile;
