import { AuthProvider } from "@/components/context/AuthContext";
import { TravelSearchProvider } from "@/components/context/TravelSearchContext";
import "./globals.css"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body>
        <AuthProvider>
          <TravelSearchProvider>
            {children}
          </TravelSearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}