import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { AppLayout } from '~/layouts/AppLayout/AppLayout';
import { Home } from '~/pages/Home';
import { Superhero } from '~/pages/Superhero';

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />

      <Route path="superhero">
        <Route path=":id" element={<Superhero />} />
      </Route>
    </Route>,
  ),
);

export default AppRouter;
