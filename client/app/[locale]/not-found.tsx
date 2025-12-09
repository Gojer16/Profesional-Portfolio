import type { Metadata } from 'next';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import TextLink from '@/app/components/TextLink';
import { generatePageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  path: '/404',
});

export default function NotFound() {
  return (
    <Layout>
      <PageTitle title="404 - Page Not Found" />
      
      <div className="space-y-6 max-w-line">
        <p className="text-body text-text-primary">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="pt-4">
          <TextLink href="/">Return to home</TextLink>
        </div>
      </div>
    </Layout>
  );
}
