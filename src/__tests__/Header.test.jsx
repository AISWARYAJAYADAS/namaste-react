import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../components/Header";
import {useContext} from "react";
import { AppContext } from "../App";
import { Provider } from "react-redux";
import { appStore } from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";

describe("Header component test case",()=>{
    it("should render header component with cart items", () => {

         // Step 1: Render the component
        render(
            <Provider store={appStore}>
                <AppContext.Provider value={{ searchText: "", setSearchText: () => {}, showTopRated: false, setShowTopRated: () => {} }}>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </AppContext.Provider>
            </Provider>
            );
       

        const cartItems = screen.getByText(/Cart/i);
        expect(cartItems).toBeInTheDocument();
        expect(cartItems).toHaveTextContent("Cart 0");
    })

    // Test Case 1: Check if the logo is present
    it("should load the logo in the Header component", () => {
        // Step 1: Render the component
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

        // Step 2: Find the element. The logo is likely an image.
        const logo = screen.getByRole("img", { name: "FoodDelivery" }); // Assumes logo has alt text "Food Delivery"
        
        // Step 3: Make an assertion.
        expect(logo).toBeInTheDocument();
    });

        // Test Case 2: Check if the navigation menu is present
    it("should render the navigation links in the Header component", () => {
        // Step 1: Render the component
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

        // Step 2: Find the elements. We expect to find multiple links.
        // We use getAllByRole to get all elements with the role of "link".
        const links = screen.getAllByRole("link");

        // Step 3: Make an assertion. Check if we found any links.
        expect(links.length).toBeGreaterThan(0);
    });

        // Test Case 3: Check for a specific text, like "Cart"
    it("should have a Cart link in the Header component", () => {
        // Step 1: Render the component
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

        // Step 2: Find the "Cart" text.
        const cartLink = screen.getByText(/Cart/);

        // Step 3: Assert that the link is in the document.
        expect(cartLink).toBeInTheDocument();
    });

        // Test Case 4: An example of using fireEvent to simulate a click
    it("should add the 'active' class to the toggle button when clicked", () => {
        // This test simulates the click and checks for the class change.
        
        render(
            <Provider store={appStore}>
                <AppContext.Provider value={{
                    searchText: "",
                    setSearchText: () => {},
                    showTopRated: false, // Initial state
                    setShowTopRated: () => {}, 
                }}>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </AppContext.Provider>
            </Provider>
        );
        
        // Find the button to click.
        const toggleButton = screen.getByRole("button", { name: "" });

        // Assert that the button DOES NOT have the active class initially
        expect(toggleButton).not.toHaveClass('active');

        // Simulate a click event on the button
        fireEvent.click(toggleButton);

        // Assert that the button now HAS the active class
        expect(toggleButton).toHaveClass('toggle-switch');
    })
})

