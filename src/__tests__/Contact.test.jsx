import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Contact } from "../components/Contact";

describe("Contact Page Test case", () => {
    it("should load contact component", () => {
        render(<Contact />);
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });

    it("should load button inside contact component", () => {
        render(<Contact />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("should load input text inside contact component", () => {
        render(<Contact />);
        const inputTexts = screen.getAllByRole("textbox");
        expect(inputTexts.length).toBeGreaterThan(0);
    });

    it("should load 2 input text inside contact component", () => {
        render(<Contact />);
        const inputTexts = screen.getAllByRole("textbox");
        expect(inputTexts).toHaveLength(2);
    });
});