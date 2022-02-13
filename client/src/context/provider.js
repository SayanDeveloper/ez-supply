import React, {useState, createContext} from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({children}) => {

    const [userData, setUserData] = useState("");
    const [loading, setLoading] = useState(false);
    const [softLoading, setSoftLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [designation, setDesignation] = useState("");
    const [toastAppear, setToastAppear] = useState(false);
    const [transferMod, setTransferMod] = useState(false);
    const [modalId, setModalId] = useState({});
    const [sideNavOpen, setSideNavOpen] = useState(false);
    // web3 stuffs
    const [acct, setAcct] = useState(null);

    return (
        <GlobalContext.Provider value={{
            solid: [loading, setLoading], 
            soft: [softLoading, setSoftLoading],
            modal: [modalOpen, setModalOpen],
            desig: [designation, setDesignation],
            toast: [toastAppear, setToastAppear],
            transfer: [transferMod, setTransferMod],
            modalID: [modalId, setModalId],
            web3Ac: [acct, setAcct],
            UserData: [userData, setUserData],
            sideNav: [sideNavOpen, setSideNavOpen]
        }}>
            {children}
        </GlobalContext.Provider>
    )
};
