import Link from 'next/link';

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export default function TextLink({ 
  href, 
  children, 
  external = false,
  className = ''
}: TextLinkProps) {
  const baseClasses = `
    text-primary
    hover:opacity-80
    transition-opacity duration-150 ease-out
    focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded
    underline decoration-1 underline-offset-2
  `;
  
  const combinedClasses = `${baseClasses} ${className}`.trim();
  
  // External link
  if (external) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${children} (opens in new tab)`}
      >
        {children}
        <span className="ml-1 text-sm" aria-hidden="true">↗</span>
      </a>
    );
  }
  
  // Internal link
  return (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  );
}
