import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Alpine Education & Visa Services',
  description: 'Get in touch with Alpine Education for study abroad counseling, visa services, and test preparation. Free consultation available.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 