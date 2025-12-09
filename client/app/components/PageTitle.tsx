interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-12">
      <h1 className="text-h1 font-display text-text-primary">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-6 text-body-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
