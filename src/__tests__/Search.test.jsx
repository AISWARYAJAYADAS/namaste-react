import { render, screen } from "@testing-library/react";
import { Header } from "../components/Header";
import { AppContext } from "../App";
import { Provider } from "react-redux";
import { appStore } from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";


describe("Search component test case", () => {
    it("should render search component", () => {
       // Step 1: Render the Headercomponent
        render(
            <Provider store={appStore}>
                <AppContext.Provider value={{
                    searchText: "",
                    setSearchText: () => {},
                    showTopRated: false,
                    setShowTopRated: () => {},
                }}>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </AppContext.Provider>
            </Provider>
        );

           // Step 2: Find the search input by its placeholder text
        const searchInput = screen.getByPlaceholderText(
        /Search for food, restaurants, or cuisines/i
    );

        // Step 3: Verify the search input is in the document
        expect(searchInput).toBeInTheDocument();
    });
});