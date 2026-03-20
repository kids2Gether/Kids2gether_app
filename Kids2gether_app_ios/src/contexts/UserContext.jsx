import { createContext, useState } from "react";

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [awaitLoading, setAwaitLoading] = useState(false);
  const [onMap, setOnMap] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  // const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [user, setUser] = useState(false);
  const [deleteAccountController, setDeleteAccountController] = useState(false);
  const [cancelSubcriptionController, setCancelSubcriptionController] =
    useState(false);
  const [paymentInfo, setPaymentInfo] = useState(false);
  const [paymentConfirmController, setPaymentConfirmController] =
    useState(false);

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        awaitLoading,
        setAwaitLoading,
        showInfoModal,
        setShowInfoModal,
        showModal,
        setShowModal,
        // showPremiumModal,
        // setShowPremiumModal,
        onMap,
        setOnMap,
        user,
        setUser,
        deleteAccountController,
        setDeleteAccountController,
        cancelSubcriptionController,
        setCancelSubcriptionController,
        paymentInfo,
        setPaymentInfo,
        paymentConfirmController,
        setPaymentConfirmController,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
