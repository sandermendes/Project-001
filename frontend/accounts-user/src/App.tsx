import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import '@/App.css';
import BaseTemplate from '@/components/Template/BaseTemplate';
import BaseTemplateEdit from '@/components/Template/BaseTemplateEdit';
import { appInternalRoute } from '@/routes';
import { APP_TITLE } from '@/shared/constants/title';
import SessionContextProvider from '@/contexts/SessionContext';

function App() {
  return (
    <SessionContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/u" />} />
            <Route element={<BaseTemplate appTitle={APP_TITLE} />}>
              {appInternalRoute.map((route, index) => (
                <Route key={index} path={route.path} element={route.component} />
              ))}
            </Route>
            <Route path="/u/user-info/*" element={<BaseTemplateEdit appTitle={APP_TITLE} />} />
            {/* TODO: Implement Not found page */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </SessionContextProvider>
  );
}

export default App;
