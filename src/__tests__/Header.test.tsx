import { it, expect, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("next/font/google", () => ({
  Roboto: () => ({ className: "mock-roboto" }),
  Inter: () => ({ className: "mock-inter" }),
}));

describe("Header component", () => {
  it("show auth buttons", () => {
    render(<Header showLogo={true} />);
    expect(screen.getByText("Sign in")).toBeDefined();
    expect(screen.getByText("Sign Up")).toBeDefined();
  });

  it("shows Logo", () => {
    render(<Header showLogo={true} />);
    expect(screen.getAllByText("Nebuna")).toBeDefined();
  });
});
