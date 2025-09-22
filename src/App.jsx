import React, {useState, createContext} from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from './utils/appStore';

// Create Context
export const AppContext = createContext();

export const App = () => {
    const [searchText, setSearchText] = useState("");
    const [showTopRated, setShowTopRated] = useState(false);

    return (
            <Provider store={appStore}>
            <AppContext.Provider value={{ searchText, setSearchText, showTopRated, setShowTopRated }}>
            <div className='app'>
                <Header />
                <Outlet />
                <Footer />
            </div>
            </AppContext.Provider>
            </Provider>
        );
}; 