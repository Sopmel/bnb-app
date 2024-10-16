import './globals.css';
import Header from './components/Header';  // Importera Header-komponenten

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}