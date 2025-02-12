import { Modal } from "@mui/material";

const Left = () => <div className="flex-1 h-full bg-blue-500 sm:hidden"></div>;

const Right = () => <div className="w-full h-full bg-white sm:flex-1"></div>;

const Authentication = ({ openAuth, setOpenAuth }) => {
  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <div className="bg-yellow-100 h-full w-full flex">
        <Left />
        <Right />
      </div>
    </Modal>
  );
};

export default Authentication;
