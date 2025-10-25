import "./globals.css";
import "./fanta.css";
import CustomHead from "./CustomHead";
import Link from "next/link";
import GoTo from "@/components/GoTo";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Expenny · The Subscription Tracker",
  description: "Track all your subsciption analytics!!",
};

export default function RootLayout({ children }) {
  const header = (
    <header>
      <div className="header-titles">
        <Link href={"/"}>
          <h1 className="text-gradient">Expenny</h1>
        </Link>
        <h2>The Subscription Tracker</h2>
        <p>“All your subs, all in one place.”</p>
      </div>
      <GoTo />
    </header>
  );

  const footer = (
    <footer>
      <div className="hard-line" />
      <div className="footer-content">
        <div>
          <div>
            <h4>Expenny</h4>
            <p>|</p>
            <button disabled>Install App</button>
          </div>
          <p className="copyright">
            © Copyright 2025-2026, Batuhan Başoda.
            <br />
            All rights reserved.
          </p>
        </div>
        <div>
          <p>
            Facing Issues ?{" "}
            <Link
              target="blank"
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLSes3s_JQNR9vGhovBWkrfwdi210X9ZM8mdn1CPhDceyQtwKLA/viewform"
              }
            >
              Get Help
            </Link>
          </p>
          <p>
            Suggestions for Improvement?{" "}
            <Link
              target="blank"
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLSdiDFQ7hihyFDOdxC-LdUpcwOnz3OCvSW7KX_uMpQbSQAVbhQ/viewform"
              }
            >
              Share Feedback
            </Link>
          </p>
          <div>
            <Link href={"/privacy"}>Privacy Policy</Link>
            <Link href={"/tos"}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <html lang="en">
      <CustomHead />
      <AuthProvider>
        <body>
          {header}
          <div className="full-line" />
          <main>{children}</main>
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
