import BasicCard from "../../Components/Card/Card";
import "../SingUp/SingUp.scss";

const SingUp = () => {
  const inputs = ["User Name", "Email", "Password"];
  const title = "Sing Up";
  return (
    <div className="sing-up-body">
      <BasicCard InputsArray={inputs} Title={title} />
    </div>
  );
};

export default SingUp;
