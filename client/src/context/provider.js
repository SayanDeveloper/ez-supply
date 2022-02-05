import React, {useState, createContext} from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [softLoading, setSoftLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [designation, setDesignation] = useState("");
    const [toastAppear, setToastAppear] = useState(false);

    return (
        <GlobalContext.Provider value={{
            solid: [loading, setLoading], 
            soft: [softLoading, setSoftLoading],
            modal: [modalOpen, setModalOpen],
            desig: [designation, setDesignation],
            toast: [toastAppear, setToastAppear]
        }}>
            {children}
        </GlobalContext.Provider>
    )
};
