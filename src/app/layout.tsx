import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ID Card Generator",
  description: "Professional ID card generation for events, conferences, and organizations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, background: '#000' }}>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        background: '#000',
        minHeight: '100vh'
      }}>
        {children}
      </body>
    </html>
  );
}