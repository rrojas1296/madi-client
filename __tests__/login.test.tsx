// __tests__/LoginPage.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/login/page";
import es from "../messages/es.json";

// ✅ Mock de next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/features/auth/services/login/validateEmail", () => ({
  validateEmail: jest.fn(),
}));

// ✅ Mock de next-intl
jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    const translations = (es as any)[namespace];
    return (key: string) => {
      const keys = key.split(".");
      let value: any = translations;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    };
  },
}));

describe("LoginPage", () => {
  it("debe mostrar un error si el email no es válido", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("mi-correo@gmail.com");
    const submitButton = screen.getByText("Continuar");

    await userEvent.type(emailInput, "dd@gmail.com");
    await userEvent.click(submitButton);

    // El error viene del schema Zod
    expect(
      await screen.findByText("Ingresa un correo valido"),
    ).toBeInTheDocument();
  });
});
