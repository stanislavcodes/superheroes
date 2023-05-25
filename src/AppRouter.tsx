import {
createBrowserRouter,
createRoutesFromElements,
Route,
} from 'react-router-dom';
import { AppLayout } from '~/layouts/AppLayout/AppLayout';
import { Auth } from '~/pages/Auth';
import { Home } from '~/pages/Home';
import { Superhero } from '~/pages/Superhero';
import { NotFound } from '~/pages/NotFound';

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />

      <Route path="auth" element={<Auth />} />

      <Route path="superhero">
        <Route path=":id" element={<Superhero />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default AppRouter;
