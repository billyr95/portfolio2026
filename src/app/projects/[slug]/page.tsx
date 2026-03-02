import { notFound } from 'next/navigation';
import ProjectContent from './ProjectContent';

// Project data - this would come from Sanity or a data file in production
const projectsData: Record<string, Project> = {
  'project-one': {
    title: 'Project One',
    description: 'Brief description of the project and your role.',
    year: '2024',
    tags: ['Next.js', 'Design System'],
    thumbnail: '/projects/placeholder-1.jpg',
    role: 'Design Engineer',
    client: 'Client Name',
    duration: '3 months',
    overview: 'A longer description of the project, the problem it solved, and the impact it had. This is where you tell the story of the work.',
    sections: [
      {
        type: 'text',
        title: 'The Challenge',
        content: 'Describe the problem or opportunity that led to this project. What were the constraints? What was the goal?',
      },
      {
        type: 'image',
        src: '/projects/placeholder-1.jpg',
        alt: 'Project screenshot',
        caption: 'Main interface design',
      },
      {
        type: 'text',
        title: 'The Approach',
        content: 'Walk through your process. How did you tackle the problem? What decisions did you make and why?',
      },
      {
        type: 'image',
        src: '/projects/placeholder-1.jpg',
        alt: 'Detail shot',
        caption: 'Component details',
      },
      {
        type: 'text',
        title: 'The Outcome',
        content: 'What was the result? Include metrics if you have them. What did you learn?',
      },
    ],
  },
  'project-two': {
    title: 'Project Two',
    description: 'Brief description of the project and your role.',
    year: '2024',
    tags: ['React', 'GSAP'],
    thumbnail: '/projects/placeholder-2.jpg',
    role: 'Frontend Developer',
    client: 'Client Name',
    duration: '2 months',
    overview: 'Project overview goes here.',
    sections: [],
  },
  'project-three': {
    title: 'Project Three',
    description: 'Brief description of the project and your role.',
    year: '2023',
    tags: ['Sanity', 'Tailwind'],
    thumbnail: '/projects/placeholder-3.jpg',
    role: 'Design Engineer',
    client: 'Client Name',
    duration: '4 months',
    overview: 'Project overview goes here.',
    sections: [],
  },
  'project-four': {
    title: 'Project Four',
    description: 'Brief description of the project and your role.',
    year: '2022',
    tags: ['TypeScript', 'Figma'],
    thumbnail: '/projects/placeholder-4.jpg',
    role: 'UI Designer',
    client: 'Client Name',
    duration: '6 weeks',
    overview: 'Project overview goes here.',
    sections: [],
  },
  'project-five': {
    title: 'Project Five',
    description: 'Brief description of the project and your role.',
    year: '2021',
    tags: ['UI/UX', 'Prototyping'],
    thumbnail: '/projects/placeholder-5.jpg',
    role: 'Product Designer',
    client: 'Client Name',
    duration: '3 months',
    overview: 'Project overview goes here.',
    sections: [],
  },
};

interface Section {
  type: 'text' | 'image';
  title?: string;
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface Project {
  title: string;
  description: string;
  year: string;
  tags: string[];
  thumbnail: string;
  role: string;
  client: string;
  duration: string;
  overview: string;
  sections: Section[];
}

// Generate static params for all projects
export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }));
}

// Server component that handles data fetching and passes to client component
export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  // Find next project for navigation
  const slugs = Object.keys(projectsData);
  const currentIndex = slugs.indexOf(slug);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];
  const nextProject = projectsData[nextSlug];

  return (
    <ProjectContent 
      project={project} 
      nextSlug={nextSlug} 
      nextProject={nextProject} 
    />
  );
}