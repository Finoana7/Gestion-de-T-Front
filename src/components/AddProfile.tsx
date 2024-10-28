import { useRef, useState } from "react";
import useQuery from "../hook/useQuery";
import { Button, Input, Option, Select } from "@mui/joy";
import { createUser } from "../api/user";
import toast from "react-hot-toast";
import {AiFillCloseCircle} from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { image } from "../utils/image";

function AddProfile() {

  const nav = useNavigate()
  const [img, setImg] = useState<string>("/nest.jpg")

  const [resp, setRes] = useState<{
    name: string;
    role: string;
    password: string;
  }>();
  const add = useQuery("add");
  const password = useRef(Date.now().toString());

  if (!add || add !== "true") {
    return <></>;
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name")).trim(),
      role: String(form.get("role")).trim(),
      password: password.current,
    };

    await createUser(data)
      .then(() => {
        toast.success("created !");
        setRes(() => data);
      })
      .catch((err) => {
        toast.error(err.response?.message);
      });
  };

  if (!resp) {
    return (
      <div className="absolute z-50 flex items-center justify-center w-screen h-screen inset-0 backdrop-blur-[2px] bg-black/70">
        <div className="flex flex-col items-center px-4 py-7 gap-8 w-[25rem] bg-white rounded-xl">
          <img
            src={img === "/nest.jpg" ? img : image(img)}
            alt=""
            className="bg-white w-20 h-20 rounded-full shadow border border-neutral-300"
          />
          <form
            onSubmit={submit}
            action=""
            className="flex flex-col gap-3 w-full"
          >
            <Input placeholder="Name" name="name" required onChange={(e) => setImg(e.currentTarget.value)}/>
            <Select defaultValue="editeur" name="role" required>
              <Option value="admin">Admin</Option>
              <Option value="editeur">Editeur</Option>
              <Option value="observateur">Observateur</Option>
            </Select>
            <Button type="submit" variant="soft" className="p-2">
              Create
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute z-50 flex items-center justify-center w-screen h-screen inset-0 backdrop-blur-[2px] bg-black/50">
      <div className="flex flex-col items-center px-4 py-3 gap-8 w-[25rem] bg-white rounded-xl">
        <button className="w-max" title="fermer" onClick={() => nav("/")}>
          <AiFillCloseCircle className="w-5 h-5"/>
        </button>
        <p className="text-center text-lg text-emerald-600 font-">
          pass: <span className="ml-3 font-bold font-mono">{password.current}</span>
        </p>
        <div className="flex justify-start items-start gap-4 w-full border p-2 rounded-xl shadow">
          <img
            src={`/nest.jpg`}
            alt=""
            className="bg-white w-14 h-14 rounded-full shadow border border-neutral-300"
          />
          <div className="flex flex-col gap-2 justify-between">
            <h1 className="text-xl text-center">{resp?.role.toUpperCase()}</h1>
            <h2>{resp?.name}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full"></div>
      </div>
    </div>
  );
}

export default AddProfile;
