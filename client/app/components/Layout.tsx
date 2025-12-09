import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      
      {/* Skip to content — visible on focus only */}
      <a
        href="#main-content"
        className="
          absolute left-4 top-4 
          px-4 py-2 
          bg-primary text-white 
          rounded-md 
          transform -translate-y-20 
          focus:translate-y-0 
          focus:outline-none 
          transition-transform 
          z-[999]
        "
      >
        Skip to content
      </a>

      <Header />

      <main
        id="main-content"
        className="
          flex-1 
          scroll-mt-20
        "
      >
        <div className="max-w-content mx-auto px-6 py-12 md:py-16">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
