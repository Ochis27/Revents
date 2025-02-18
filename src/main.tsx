import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import "./app/layout/styles.css";
import {router} from "./app/router/Routes.tsx";
import {store} from "./app/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
