import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import  { store,persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
