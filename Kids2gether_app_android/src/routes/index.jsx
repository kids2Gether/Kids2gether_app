import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabRoutes from "./tab.routes";
import { AppContext } from "../contexts/AppContext";
import Modal from "../components/Modal";
import OffCanvas from "../components/OffCanvas";
import {
  InsertPin,
  EditPin,
} from "../screens/Map/components/InsertPin/index.jsx";
import Loader from "../components/Loader";
import InitialModal from "../components/InitialModal";
import { UserContext } from "../contexts/UserContext";
import ErrorModal from "../components/ErrorModal";

export default function Routes() {
  const {
    mapController,
    pinController,
    //offersController,
    loaderController,
    recoveryErrorController,
    recoveryOkController,
    firstTimeController,
    setFirstTimeController,
    pinData,
    offCanvasVariant,
    offCanvasController,
    kErrorController,
    cardController,
    cardConfirmController,
    mapFilterController,
    popUpController,
  } = useContext(AppContext);
  const {
    deleteAccountController,
    cancelSubcriptionController,
    paymentConfirmController,
  } = useContext(UserContext);

  const hasMapModalOpen = mapController || mapFilterController || pinController;

  useEffect(() => {
    const testFirst = async () => {
      try {
        const first = await AsyncStorage.getItem("TOUR_OPENED");
        if (first) {
          setFirstTimeController(false);
        }
      } catch (error) {
        // Fail open to avoid blocking interactions if local storage is unavailable.
        setFirstTimeController(false);
      }
    };
    testFirst();
  }, [setFirstTimeController]);

  return (
    <>
      <TabRoutes />
      {mapController && <Modal variant={"map"} />}
      {mapFilterController && <Modal variant={"map-filter"} />}
      {/* {offersController && <Modal variant={"offers"} /> */}
      {pinController && <Modal variant={"pin"} />}
      {recoveryErrorController && <Modal variant={"recovery_error"} />}
      {recoveryOkController && <Modal variant={"recovery_ok"} />}
      {firstTimeController && <InitialModal />}
      {loaderController && <Loader />}
      {offCanvasController && !popUpController && !hasMapModalOpen && (
        <OffCanvas
          variant={"map"}
          children={
            offCanvasVariant === "create-pin" ? (
              <InsertPin location={pinData} />
            ) : (
              <EditPin data={pinData} />
            )
          }
        />
      )}
      {popUpController && !hasMapModalOpen && <OffCanvas variant={'popup'}/>}
      {deleteAccountController && <Modal variant={"delete_account"} />}
      {cancelSubcriptionController && <Modal variant={"cancel_subcription"} />}
      {cardController && <Modal variant={"credit_card"} />}
      {cardConfirmController && <Modal variant={"confirm_card"} />}
      {paymentConfirmController && <Modal variant={"payment_confirm"} />}
      {kErrorController && <ErrorModal />}
    </>
  );
}