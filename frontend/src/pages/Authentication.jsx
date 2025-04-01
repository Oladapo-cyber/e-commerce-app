/* eslint-disable react/prop-types */
import { IconButton, Modal } from "@mui/material";
import womanportrait from "../assets/woman-portrait.jpg";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Left = () => (
  <div className="hidden sm:block sm:flex-1 h-full bg-blue-100">
    <div className="relative h-full flex flex-col justify-center items-center">
      <h1 className="text-blue-100 absolute z-20 top-15 right-10 font-bold font-[cursive] text-4xl mb-6 shadow-lg">
        Dapstore
      </h1>
      <div className="w-full relative">
        <img
          src={womanportrait}
          alt="woman Portrait"
          className="h-fit w-full relative object-cover rounded-sm"
        />
        <div className="absolute inset-0 bg-black opacity-20 pointer-events-none z-10"></div>
      </div>
    </div>
  </div>
);

const Right = ({ setOpenAuth, login, setLogin }) => (
  <div className="w-full h-full sm:flex-1 bg-white">
    <IconButton onClick={() => setOpenAuth(false)}>
      <Close className="border-2 h-10 w-10 rounded-2xl top-3 left-[24.5rem] absolute md:top-5 sm:left-85 lg:top-7 lg:left-[45rem] -translate-x-1/2 transform" />
    </IconButton>
    {login ? (
      <>
        <SignIn setOpenAuth={setOpenAuth} login={login} setLogin={setLogin} />
      </>
    ) : (
      <>
        <SignUp onClick={() => setLogin(false)} />
      </>
    )}
  </div>
);

const Authentication = ({ openAuth, setOpenAuth }) => {
  const [login, setLogin] = useState(true);
  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <div className="bg-yellow-100 h-full w-full flex">
        <Left />
        <Right setOpenAuth={setOpenAuth} login={login} setLogin={setLogin} />
      </div>
    </Modal>
  );
};

export default Authentication;
