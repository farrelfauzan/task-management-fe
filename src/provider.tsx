import { Provider } from "react-redux";
import { store } from "./lib/store";
import { CookiesProvider } from "react-cookie";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <CookiesProvider>
      <Provider store={store}>{children}</Provider>
    </CookiesProvider>
  );
};
