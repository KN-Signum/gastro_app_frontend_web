import { createContext, useContext } from 'react';
import { GastroappClient } from './gastroapp-client';

//Create context fo API
//Provide hook useAPI to use API in components

const ApiContext = createContext(new GastroappClient());

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiClient = new GastroappClient();

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext); 
}
