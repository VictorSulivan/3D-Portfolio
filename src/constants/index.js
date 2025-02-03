import { inow, matech, roole } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Javascript Stagiaire Developer",
        company_name: "Inow",
        icon: inow,
        iconBg: "#accbe1",
        date: "May 2023 - June 2023",
        points: [
            "Developing and maintaining web applications using  JavaScript Vanilla, and .NET.",
            "Worked with JavaScript Vanilla and .NET for 2 months to build and optimize web functionalities.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers."
        ],
    },
    {
        title: "React TypeScript Developer (work-study student)",
        company_name: "Roole",
        icon: roole,
        iconBg: "#fbc3bc",
        date: "September 2023 - August 2025",
        points: [
            "Development and maintenance of web applications using React.js, TypeScript and other front-end technologies.",
            "Working on the back-end to manage APIs and integrate server-side functionality.",
            "Collaborating with the tech team in an agile environment to ensure delivery of quality products.",
            "Participation in Agile rituals (daily, sprint planning, retrospective) to optimize teamwork.",
            "Responsive design and cross-browser compatibility",
            "Code review and sharing of best practices to improve code quality."   
        ],
    },
    {
        title: "Freelance Developer",
        company_name: "MaTech",
        icon: matech,
        iconBg: "#b7e4c7",
        date: "July 2024 - Today",
        points: [
            "Development and maintenance of web and software applications in fullstack, using various languages and technologies.",
            "Expertise in JavaScript, TypeScript, C, C++, C#, Golang, Node.js, SQL and NoSQL",
            "Ability to work on a variety of projects: web applications, APIs, high-performance backend systems and software solutions",
            "Collaboration with customers to define their technical needs and propose appropriate solutions",
            "Implementation of best practices in development, testing and performance optimization",
            "Working independently or as part of a team, with an agile approach and strong adaptability to project requirements."
            ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Portfolio Three.JS',
        description: `C'est le projet ou vous etes. Il est developpé en javascript Three.js`,
        link: 'https://github.com/VictorSulivan/3D-Portfolio',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-black',
        name: 'Frontend Chess Game Web',
        description: `Ce projet n'est pas finis mais il s'agit d'un jeu d'echecs online multijoueur dans ca finalité`,
        link: 'https://github.com/VictorSulivan/ChessGameWeb',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Shop Backend use Stripe and golang',
        description: `C'est un court projet en golang pour tester l'utilisation de l'api Stripe permetant de proceder a des payement en ligne.`,
        link: 'https://github.com/VictorSulivan/StripeGoBackend',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Frontend simple ATM in C',
        description: `C'est un petit projet pour tester mes compétences en language C simulant les comportements basiques d'un ATM au travers d'un terminal.`,
        link: 'https://github.com/VictorSulivan/ATM-Easy-C',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Fullstack Whatsapp clone',
        description: `Il s'agit d'un projet fullstack rassemblant back et front avec une connection MongoDB pour simuler un clone de Whatsap avec en Front React et en Back Node (toujours en cours non finis).`,
        link: 'https://github.com/VictorSulivan/WhatsapClone',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-red',
        name: 'Use pokeAPI',
        description: `C'est un petit projet perso amusant utilisant une API selectionnant un pokemon aleatoirement dans une base de donnée public en ligne. `,
        link: 'https://github.com/VictorSulivan/pokeapi',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'False Python Browser',
        description: `C'est un petit code python fait pour tester des fonctionnalitées en python permettant de faire une application de bureau qui une fois cliquer ouvre google.`,
        link: 'https://github.com/VictorSulivan/Python_Browser',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Java Morpion in the shell',
        description: `Il s'agit d'un petit jeu en Java jouable dans le shell ou il est executer et permettant de faire une partie de Morpion contre un autre joueur.`,
        link: 'https://github.com/VictorSulivan/Morpion_java',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-red',
        name: 'Memory Game Online',
        description: `C'est un projet fait en 1 mois en PHP; CSS HTML, Javascript pour faire divers niveau du jeu du memory sur un site web avec compte user etc...`,
        link: 'https://github.com/VictorSulivan/Puissance-4',
    }
];