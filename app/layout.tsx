import type { Metadata } from "next";
import "./globals.css";
import MyLayout from "./components/MyLayout";
import LoginModal from './models/LoginModal'
import SignUpModal from './models/SignUpModal'
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import EditModal from "./models/EditModal";

export const metadata: Metadata = {
  title: "X - It's What's happening / X",
  description: "Connect with friends and the world around you on X.",
  viewport: 'width=device-width, initial-scale=1.0'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext />
          <EditModal />
          <LoginModal />
          <SignUpModal />
          <MyLayout>
            {children}
          </MyLayout>
        </AuthContext>
      </body>
    </html>
  );
}
