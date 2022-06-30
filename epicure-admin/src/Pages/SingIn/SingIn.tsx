import BasicCard from "../../Components/Card/Card";
import "../SingIn/SingIn.scss";

const SingIn = () => {
  const inputs = ["Email", "Password"];
  const title = "Sing In";
  return (
    <div className="sing-in-body">
      <BasicCard InputsArray={inputs} Title={title} />
    </div>
  );
};

export default SingIn;
