export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 py-8 border-t border-border">
      <div className="max-w-content mx-auto px-6">
        <p className="text-body-sm text-text-secondary text-center">
          © {currentYear} Orlando Ascanio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
