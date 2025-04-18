import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "@/app/signup/page";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("next/font/google", () => ({
  Roboto: () => ({ className: "mock-roboto" }),
  Inter: () => ({ className: "mock-inter" }),
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as unknown as typeof fetch;

describe("Signup Page", () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    const mockRouter = useRouter as unknown as ReturnType<typeof vi.fn>;
    mockRouter.mockReturnValue({ push: pushMock });
    vi.clearAllMocks();
  });

  it("renders input fields and button", () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText("Email")).toBeDefined();
    expect(screen.getByPlaceholderText("Password")).toBeDefined();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeDefined();
    expect(screen.getAllByText("Sign up")).toBeDefined();
  });

  it("shows validation errors when form is submitted empty", async () => {
    render(<Signup />);
    fireEvent.click(screen.getByText("Sign up"));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeDefined();
      expect(screen.getByText("Password is required")).toBeDefined();
      expect(screen.getByText("Please confirm your password")).toBeDefined();
    });
  });

  it("submits the form with valid input", async () => {
    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Sign up"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/user/signup",
        expect.objectContaining({
          method: "POST",
        })
      );
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
