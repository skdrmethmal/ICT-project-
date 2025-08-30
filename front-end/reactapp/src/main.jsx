import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import SignInPage from "./pages/sign-in.page";
import HomePage from "./pages/home.page";
import SignUpPage from "./pages/sign-up.page";
import HotelPage from "./pages/hotel.page";
import RootLayout from "./layouts/root.layout";
import MainLayout from "./layouts/main.layout";
import HotelsPage from "./pages/hotels.page";
import PaymentPage from "./pages/payment.page";
import { store } from "./lib/store";
import { Provider } from "react-redux";
import CreateHotelPage from "./pages/create-hotel.page";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedLayout from "./layouts/protected.layout";
import AccountPage from "./pages/account.page";
import AdminLayout from "./layouts/admin.layout";
import CompletePage from "./pages/complete.page";
import AboutPage from "./pages/about.page";
import HelpCenterPage from "./pages/help-center.page";
import ContactUsPage from "./pages/contact-us.page";
import PrivacyPolicyPage from "./pages/privacy-policy.page";
import TermsOfServicePage from "./pages/terms-service.page";
import CareerPage from "./pages/career.page";
import BlogPage from "./pages/blog.page";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/hotel/:id" element={<HotelPage />}></Route>
                <Route path="/hotels" element={<HotelsPage />}></Route>
                <Route element={<ProtectedLayout />}>
                  <Route element={<AdminLayout />}>
                    <Route
                      path="/admin-dashboard"
                      element={<CreateHotelPage />}
                    ></Route>
                  </Route>
                  <Route path="/account" element={<AccountPage />}></Route>
                  <Route
                    path="/booking/payment"
                    element={<PaymentPage />}
                  ></Route>
                </Route>
                <Route
                  path="/booking/complete"
                  element={<CompletePage />}
                ></Route>
                <Route path="all-hotels" element={<HotelsPage />}></Route>
                <Route path="about" element={<AboutPage />}></Route>
                <Route path="/help" element={<HelpCenterPage />}></Route>
                <Route path="/contact" element={<ContactUsPage />}></Route>
                <Route
                  path="/privacy-policy"
                  element={<PrivacyPolicyPage />}
                ></Route>
                <Route path="/terms" element={<TermsOfServicePage />}></Route>
                <Route path="/careers" element={<CareerPage />}></Route>
                <Route path="/blog" element={<BlogPage />}></Route>
              </Route>
              <Route path="/sign-in" element={<SignInPage />}></Route>
              <Route path="/sign-up" element={<SignUpPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
