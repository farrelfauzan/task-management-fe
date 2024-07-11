import { useSelector } from "react-redux";
import { sessionData } from "../../lib/features/session/session";
import SettingsForm from "../../components/settings/form";

const Settings = () => {
  const session = useSelector(sessionData);

  console.log(session);

  return (
    <div>
      <div className="bg-white h-full p-8 m-8 rounded-lg">
        <SettingsForm />
      </div>
    </div>
  );
};

export default Settings;
