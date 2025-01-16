import { CiHome } from 'react-icons/ci'
import { BsPersonVcard } from 'react-icons/bs'
import { IoLogoJavascript } from 'react-icons/io5'
import { TbBrandNextjs } from 'react-icons/tb'
import { IoIosContact } from 'react-icons/io'
import {
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiMongodb,
  SiMysql,
  SiLaravel
} from 'react-icons/si'
import {
  FaProjectDiagram,
  FaFacebookSquare,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaHtml5,
  FaCss3,
  FaGitAlt,
  FaEnvelope,
} from 'react-icons/fa'
// import { MdMiscellaneousServices } from 'react-icons/md'

export const headerData = [
  {
    title: 'home',
    id: 1,
    icon: CiHome,
    link: '/',
  },
  {
    title: 'about',
    id: 2,
    icon: BsPersonVcard,
    link: '/about',
  },
  // {
  //   title: 'service',
  //   id: 3,
  //   icon: MdMiscellaneousServices,
  //   link: '/service',
  // },
  {
    title: 'portfolio',
    id: 4,
    icon: FaProjectDiagram,
    link: '/portfolio',
  },
  {
    title: 'contact',
    id: 5,
    icon: IoIosContact,
    link: '/contact',
  },
]

export const iconData = [
  {
    title: 'Facebook',
    id: 1,
    icon: FaFacebookSquare,
    link: 'https://www.facebook.com/mandip.tamang.904/',
  },
  {
    title: 'Instagram',
    id: 2,
    icon: FaInstagram,
    link: 'https://www.instagram.com/mandiptamang125/',
  },
  {
    title: 'GitHub',
    id: 3,
    icon: FaGithub,
    link: 'https://github.com/mandiptmg',
  },
  {
    title: 'LinkedIn',
    id: 4,
    icon: FaLinkedin,
    link: 'https://www.linkedin.com/in/mandip-tamang',
  },
  {
    title: 'Gmail',
    id: 5,
    icon: FaEnvelope,
    link: 'mailto:mandiptamang159@gmail.com',
  },
]

export const portfolioItems = [
  {
    id: 1,
    title: 'React',
    icon: FaReact,
    description: 'Built a dynamic web application using React.',
  },
  {
    id: 2,
    title: 'HTML5',
    icon: FaHtml5,
    description: 'Designed and coded a responsive website using HTML5.',
  },
  {
    id: 3,
    title: 'CSS3',
    icon: FaCss3,
    description: 'Styled web pages with CSS3 for improved visual presentation.',
  },
  {
    id: 4,
    title: 'JavaScript',
    icon: IoLogoJavascript,
    description: 'Implemented interactive features using JavaScript.',
  },
  {
    id: 5,
    title: 'Next.js',
    icon: TbBrandNextjs,
    description: 'Developed a Next.js application for server-side rendering.',
  },
  {
    id: 6,
    title: 'TypeScript',
    icon: SiTypescript,
    description: 'Utilized TypeScript for type-safe JavaScript development.',
  },
  {
    id: 7,
    title: 'Tailwind CSS',
    icon: SiTailwindcss,
    description:
      'Styled components with Tailwind CSS for rapid UI development.',
  },
  {
    id: 8,
    title: 'Framer Motion',
    icon: SiFramer,
    description: 'Created animations and interactive UIs with Framer Motion.',
  },
  {
    id: 9,
    title: 'Redux Toolkit',
    icon: SiRedux,
    description: 'Managed application state with Redux Toolkit.',
  },
  {
    id: 10,
    title: 'Git',
    icon: FaGitAlt,
    description: 'Utilized version control with Git for project management.',
  },
  {
    id: 11,
    title: 'GitHub',
    icon: FaGithub,
    description: 'Collaborated on projects and hosted repositories on GitHub.',
  },
  {
    id: 12,
    title: 'Mongodb',
    icon: SiMongodb,
    description:
      'Integrated Mongodb for real-time database, auth, storage, enabling seamless dev.',
  },
  {
  id: 13,
  title: 'Laravel',
  icon: SiLaravel, 
  description:
    'Utilized Laravel for robust backend development, offering RESTful APIs and efficient routing.',
},
{
  id: 14,
  title: 'MySQL',
  icon: SiMysql,
  description:
    'Leveraged MySQL for reliable data storage and management, ensuring optimal performance and security.',
}
]

import amazon from '../assets/project/amazon.png'
import gym from '../assets/project/himalayanFit.png'
import journey from '../assets/project/journey.png'
import falcon from '../assets/project/falcon.png'
import furniVorgue from '../assets/project/furniVorgue.png'
import refract from '../assets/project/refract.png'
import moai from '../assets/project/moai.png'
import portfolio from '../assets/project/portfolio.png'
import csoft from '../assets/project/csoft.png'
import luxeNest from '../assets/project/luxeNest.png'


export const projectData = [
   {
    id: 9,
    title: 'LuxeNest',
    img: luxeNest,
    link: 'https://luxe-nest.vercel.app/',
  },
  {
    id: 0,
    title: 'Creation Soft Nepal',
    img: csoft,
    link: 'https://creationsoftnepal.com.np/',
  },
  {
    id: 1,
    title: 'amazon clone',
    img: amazon,
    link: 'https://next-amazon-beta.vercel.app',
  },
  {
    id: 2,
    title: 'himalayanFitness gym',
    img: gym,
    link: 'https://himalayan-gym.vercel.app',
  },
  {
    id: 3,
    title: 'journey',
    img: journey,
    link: 'https://journey-travel.vercel.app',
  },
  {
    id: 4,
    title: 'falcon company',
    img: falcon,
    link: 'https://falcon-car.vercel.app',
  },
  {
    id: 5,
    title: 'furniVorgue',
    img: furniVorgue,
    link: 'https://furniVogue.vercel.app',
  },
  {
    id: 6,
    title: 'Refract',
    img: refract,
    link: 'https://refract-coral.vercel.app/',
  },
  {
    id: 7,
    title: 'Moai',
    img: moai,
    link: 'https://moai-six.vercel.app/',
  },
   {
    id: 8,
    title: 'portfolio',
    img: portfolio,
    link: 'https://mandiptamang1.vercel.app/',
  },
  
]



export  const experiences = [
  {
    company: "Creation Soft Nepal",
    role: "Junior Full Stack Developer",
    period: "July 2024 – Oct 2024",
    responsibilities: [
      "Developed a dynamic, responsive website with React.js and Laravel, boosting user engagement by 35% and enhancing performance by 50%.",
      "Integrated RESTful APIs and optimized database queries with MySQL, reducing load times by 50% and enhancing scalability.",
      "Collaborated within a Senior Developer team, delivering new features and bug fixes on time, improving project delivery efficiency by 30%.",
    ],
  },
  {
    company: "Creation Soft Nepal",
    role: "Full Stack Developer Intern",
    period: "April 2024 – June 2024",
    responsibilities: [
      "Contributed to building web applications using React.js for front-end and Laravel for back-end, accelerating development speed by 25%.",
      "Assisted in optimizing database performance and reducing query execution time by 40%, ensuring seamless front-end and back-end integration.",
      "Improved sprint planning and team collaboration during daily stand-ups, achieving a 15% increase in sprint efficiency.",
    ],
  },
];