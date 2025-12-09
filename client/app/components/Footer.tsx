import TextLink from "./TextLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 py-12 border-t border-border/40">
      <div className="max-w-content mx-auto px-6 space-y-6">
        <nav className="flex justify-center gap-6 text-body-sm text-text-secondary">
          <TextLink 
            href="https://github.com/gojer16" 
            className="text-text-secondary hover:text-text"
          >
            GitHub
          </TextLink>
          <TextLink
            href="https://www.linkedin.com/in/orlando-ascanio-dev/" 
            className="text-text-secondary hover:text-text"
          >
            LinkedIn
          </TextLink>
          <TextLink
            href="https://x.com/Gojer27" 
            className="text-text-secondary hover:text-text"
          >
          X
          </TextLink>
          <TextLink
            href="https://www.instagram.com/lilgojer/" 
            className="text-text-secondary hover:text-text"
          >
          Instagram
          </TextLink>
      
        </nav>

        <p className="text-body-sm text-text-secondary text-center">
          © {year} Orlando Ascanio - All rights reserved.
        </p>
      </div>
    </footer>
  );
}
