import { Modal } from "@mui/material";

const Authentication = ({ openAuth, setOpenAuth }) => {
  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <Left></Left>
      <Right></Right>
    </Modal>
  );
};

export default Authentication;
