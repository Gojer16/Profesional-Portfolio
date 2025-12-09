import type { Metadata } from 'next';
import Image from 'next/image';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import TextLink from '@/app/components/TextLink';
import { generatePageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Orlando Ascanio',
  description:
    'AI Engineer and Product Builder creating intelligent systems that help people learn, think, and operate with clarity.',
  path: '/',
});

export default function Home() {
  const instagramUrl = 'https://www.instagram.com/lilgojer'; 

  return (
    <Layout>
      <PageTitle
        title="Orlando Ascanio"
        subtitle="AI Engineer • Product Builder • Founder in Training"
      />
      <div className="max-w-content mx-auto"> 
        <div className="mb-8 md:mb-4 md:ml-10 md:float-right w-full md:w-[240px] flex justify-center md:justify-end">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src="/selfie.jpeg"
              alt="Photo of Orlando Ascanio"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-md"
              priority
            />
          </a>
        </div>
        {/* TEXT CONTENT */}
        <div className="text-body-lg text-text-primary leading-relaxed">
          <p>
            <strong>I’m Orlando Ascanio, an AI engineer and product builder focused on designing AI-powered tools that help people learn, think, and move with clarity.</strong>
            <br /><br />
            My work lives at the intersection of AI systems, software engineering, and personal growth. I care about building reliable systems, things that reason well, integrate cleanly, and solve real problems without unnecessary complexity or hype.
            <br /><br />
            Right now, my energy goes into deep learning (the human and technical kind), sharpening my engineering skills, studying German, reading seriously, and building real products that push me forward, everything from AI tools to my first macOS apps.
            <br /><br />
            Outside of coding, I’ve always been curious about how people think, learn, and grow. That curiosity shapes how I design: clear structure, clear interfaces, and tools that actually help someone make progress.
            <br /><br />
            Things I enjoy: deep learning, structured thinking, reading, building tools, jumping rope, and exploring ideas that make life more intentional.
            <br /><br />
            You can find me on:{' '}
            <TextLink href="https://github.com/USERNAME" >GitHub</TextLink> (building in public), 
            <TextLink href="https://www.linkedin.com/in/USERNAME"> LinkedIn</TextLink> (professional updates),
            <TextLink href={instagramUrl}> Instagram</TextLink> (my personal side).
          </p>

          <div className="flex gap-6 pt-8">
            <TextLink href="/work">View my work</TextLink>
            <TextLink href="/notes">Read my notes</TextLink>
          </div>
        </div>
                <div className="clear-both"></div>
      </div>
    </Layout>
  );
}