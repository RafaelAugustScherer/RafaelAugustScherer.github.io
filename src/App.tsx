import './translation/i18n';
import { GlobalOSStyle } from './os/GlobalOSStyle';
import { OSProvider } from './os/osStore';
import Desktop from './os/components/Desktop';

const App = () => (
  <>
    <GlobalOSStyle />
    <OSProvider>
      <Desktop />
    </OSProvider>
  </>
);

export default App;
