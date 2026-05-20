export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export const team: TeamMember[] = [
  {
    name: 'Amara Osei',
    role: 'Founder & Principal Architect',
    bio: 'With over 15 years of practice across London and internationally, Amara founded Aureon Studio on a belief that exceptional design should be accessible, considered, and deeply personal.',
    image: '/team/amara.webp',
  },
  {
    name: 'Lena Kovač',
    role: 'Head of Interior Design',
    bio: 'Lena leads our interior architecture practice, specialising in residential refurbishments that balance beauty with the realities of everyday life.',
    image: '/team/lena.webp',
  },
  {
    name: 'James Harrington',
    role: 'Senior Architect',
    bio: 'James brings structural rigour to every project, with particular expertise in heritage buildings and complex extensions in conservation areas.',
    image: '/team/james.webp',
  },
  {
    name: 'Priya Nair',
    role: 'Project Coordinator',
    bio: 'Priya keeps our projects on time and on budget, building strong relationships with contractors, suppliers, and planning authorities across the UK.',
    image: '/team/priya.webp',
  },
]
