import './translation/i18n';
import { GlobalOSStyle } from './os/GlobalOSStyle';
import { OSProvider } from './os/osStore';
import { useIsMobile } from './os/useBreakpoint';
import Desktop from './os/components/Desktop';
import MobilePortfolio from './mobile/MobilePortfolio';

const App = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <GlobalOSStyle />
      {isMobile ? (
        <MobilePortfolio />
      ) : (
        <OSProvider>
          <Desktop />
        </OSProvider>
      )}
    </>
  );
};

export default App;
