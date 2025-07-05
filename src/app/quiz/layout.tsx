import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Abroad Assessment Quiz - Alpine Education',
  description: 'Take our free assessment quiz to get personalized study abroad recommendations based on your profile and preferences.',
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 