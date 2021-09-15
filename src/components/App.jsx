import {
    Switch,
    Route, Redirect
} from "react-router-dom";


import LayoutCustom from "./Layout";

import { Tasks, Staff } from "../pages";
import { STAFF, TASKS } from "../configs/routerConfig";



const App = () => {
  return (
    <LayoutCustom>
      <Switch>
        <Route path={TASKS} component={Tasks} exact/>
        <Route path={STAFF} component={Staff} exact/>

        <Redirect to={TASKS}/>
      </Switch>
    </LayoutCustom>
  );
}

export default App;
