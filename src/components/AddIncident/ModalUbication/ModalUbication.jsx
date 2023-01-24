import { Input, Modal } from "antd";
import { useState } from "react";
import LocationForm from "../LocationForm/LocationForm";
import "./ModalUbication.scss"


const ModalUbication = () => {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState("");

  const handleLocation = (loc) => {
    setLocation(loc);
    setVisible(false);
  };

  return (
    <>
      <input
        type="text"
        name="locationIncident"
        id="location"
        value={location}
        placeholder="Ubicación"
        onClick={() => setVisible(true)}
      />
      <Modal
        title="Ubicación"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}>
<LocationForm onLocation={handleLocation} closeModal={() => setVisible(false)} />
      </Modal>
    </>
  );
};

export default ModalUbication;
