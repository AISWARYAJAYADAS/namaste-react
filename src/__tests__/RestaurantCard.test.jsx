import { render, screen } from "@testing-library/react";
import { RestaurantCard } from "../components/RestaurantCard";
import { BrowserRouter } from "react-router-dom";
import { RestaurantCardMock } from "../mocks/RestaurantCardMock";
import { withPromotionalLabel } from "../components/withPromotionalLabel";


describe("RestaurantCard component test case", () => {
    it("should render restaurant component with props data", () => {
        render(
            <BrowserRouter>
                <RestaurantCard restaurant={RestaurantCardMock} />
            </BrowserRouter>
        );
        
         const restaurantName = screen.getByRole("heading", { name: /Hotel Maheswari/i });
        
         expect(restaurantName).toBeInTheDocument();
    })

   it("should render restaurant component with promotional label", () => {
        // Step 1: Create the new component by wrapping the original component with the HOC.
        const PromotionalRestaurantCard = withPromotionalLabel(RestaurantCard);

        // Step 2: Render the new component.
        render(
            <BrowserRouter>
                <PromotionalRestaurantCard restaurant={RestaurantCardMock} />
            </BrowserRouter>
        );

        // Step 3: Find the promotional label text and assert that it is in the document.
        // The text comes from the mock data's header and subHeader.
        const promotionalLabel = screen.getByText("20% OFF UPTO ₹50");
        expect(promotionalLabel).toBeInTheDocument();
    })
})
