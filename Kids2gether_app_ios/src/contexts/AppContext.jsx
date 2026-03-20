import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export default function AppProvider({ children }) {
  // loadercontroller
  const [loading, setLoading] = useState(true);
  const [awaitLoading, setAwaitLoading] = useState(true);
  const [isStartupLoading, setIsStartupLoading] = useState(true);
  const [loaderController, setLoaderController] = useState(false);

  // map show pin (filteres)
  const [showContentMarker, setShowContentMarker] = useState(false);
  const [showWantMarker, setShowWantMarker] = useState(true);
  const [showVisitedMarker, setShowVisitedMarker] = useState(true);

  // modal content controllers
  // -- map
  const [mapController, setMapController] = useState(false);
  const [mapFilterController, setMapFilterController] = useState(false);
  const [pinController, setPinController] = useState(false);
  const [pinData, setPinData] = useState(null);

  // -- offers
  //const [offersController, setOffersController] = useState(false);

  const [recoveryErrorController, setRecoveryErrorController] = useState(false);
  const [recoveryOkController, setRecoveryOKController] = useState(false);
  const [firstTimeController, setFirstTimeController] = useState(false);
  const [kError, setKError] = useState("Ocorreu um error, intente novamente");
  const [kErrorController, setKErrorController] = useState(false);
  const [cardController, setCardController] = useState(false);
  const [cardConfirmController, setCardConfirmController] = useState(false);

  // insert pin off canvas controller
  const [offCanvasController, setOffCanvasController] = useState(false);
  const [offCanvasVariant, setOffCanvasVariant] = useState('create-pin');

  // pop up de marketing
  const [popUpController, setPopUpController] = useState(false);

  // auth flow intent (ex.: redirecionar para Maps após login/cadastro)
  const [authRedirectIntent, setAuthRedirectIntent] = useState(null);

  useEffect(() => {
    if (!loaderController) return;

    const timeoutId = setTimeout(() => {
      setLoaderController(false);
    }, 15000);

    return () => clearTimeout(timeoutId);
  }, [loaderController]);

  const onFirstModalClose = (controller) => {
    // for close first access modal
    setFirstTimeController(false);
  }

  const handleShowMembershipPopUp = (controller) => {
    // Popup desativado.
    // Mantemos a função para não quebrar imports/usos antigos.
    return;
  }

  const closeMapOverlays = () => {
    setMapController(false);
    setMapFilterController(false);
    setPinController(false);
    setOffCanvasController(false);
    setPopUpController(false);
    setLoaderController(false);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        awaitLoading,
        setAwaitLoading,
        isStartupLoading,
        setIsStartupLoading,
        setMapController,
        showContentMarker,
        setShowContentMarker,
        showWantMarker,
        setShowWantMarker,
        showVisitedMarker,
        setShowVisitedMarker,
        mapFilterController,
        setMapFilterController,
        //setOffersController,
        setPinController,
        mapController,
        pinController,
        pinData,
        setPinData,
        //offersController,
        offCanvasController,
        setOffCanvasController,
        offCanvasVariant,
        setOffCanvasVariant,
        loaderController,
        setLoaderController,
        recoveryErrorController,
        setRecoveryErrorController,
        recoveryOkController,
        setRecoveryOKController,
        firstTimeController,
        setFirstTimeController,
        kError,
        setKError,
        kErrorController,
        setKErrorController,
        cardController,
        setCardController,
        cardConfirmController,
        setCardConfirmController,
        popUpController,
        setPopUpController,
        authRedirectIntent,
        setAuthRedirectIntent,
        handleShowMembershipPopUp,
        onFirstModalClose,
        closeMapOverlays,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
