import {
    Switch,
    Route, Redirect
} from "react-router-dom";


import LayoutCustom from "./Layout";

import Staff from "../pages/Staff";

import { STAFF } from "../configs/routerConfig";



const App = () => {
  return (
    <LayoutCustom>
      <Switch>
        <Route path={STAFF} component={Staff} exact/>

        <Redirect to={STAFF}/>
      </Switch>
    </LayoutCustom>
  );
}

export default App;
