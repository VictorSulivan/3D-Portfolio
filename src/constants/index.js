import { inow, matech, roole } from "../assets/images";
import {
    atm,
    backend,
    chess,
    contact,
    css,
    express,
    git,
    github,
    globe,
    html,
    javascript,
    linkedin,
    mongodb,
    mui,
    nextjs,
    nodejs,
    portfolio,
    react,
    sass,
    spectrum,
    summiz,
    tailwindcss,
    ticTacToe,
    typescript,
    whatsapp,
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
        iconUrl: portfolio,
        theme: 'btn-back',
        name: '3D Portfolio with Three.js',
        description: `This is the project you are currently viewing. It is developed using JavaScript and Three.js to create an interactive 3D experience.`,
        link: 'https://github.com/VictorSulivan/3D-Portfolio',
    },
    {
        iconUrl: chess,
        theme: 'btn-back-orange',
        name: 'Frontend Chess Game Web',
        description: `This project is still in development. It aims to be an online multiplayer chess game with real-time gameplay.`,
        link: 'https://github.com/VictorSulivan/ChessGameWeb',
    },
    {
        iconUrl: backend,
        theme: 'btn-back-blue',
        name: 'E-commerce Backend with Stripe & Golang',
        description: `A small backend project built with Golang, integrating the Stripe API to handle online payments efficiently.`,
        link: 'https://github.com/VictorSulivan/StripeGoBackend',
    },
    {
        iconUrl: atm,
        theme: 'btn-back-black',
        name: 'Simple ATM Simulator in C',
        description: `A basic ATM simulation program developed in C, running in a terminal environment to perform essential banking operations.`,
        link: 'https://github.com/VictorSulivan/ATM-Easy-C',
    },
    {
        iconUrl: whatsapp,
        theme: 'btn-back-green',
        name: 'Fullstack WhatsApp Clone',
        description: `A full-stack project that simulates a WhatsApp-like messaging app. It uses React for the frontend, Node.js for the backend, and MongoDB for database storage. (Still in development).`,
        link: 'https://github.com/VictorSulivan/WhatsapClone',
    },
    {
        iconUrl: spectrum,
        theme: 'btn-back-pink',
        name: 'Random Pokémon API Project',
        description: `A fun personal project that fetches a random Pokémon from a public API and displays its details dynamically.`,
        link: 'https://github.com/VictorSulivan/pokeapi',
    },
    {
        iconUrl: globe,
        theme: 'btn-back-blue',
        name: 'Simple Python Desktop Browser',
        description: `A small Python application that creates a desktop app, opening Google when clicked. Built as an experiment with Python's desktop functionalities.`,
        link: 'https://github.com/VictorSulivan/Python_Browser',
    },
    {
        iconUrl: ticTacToe,
        theme: 'btn-back-red',
        name: 'Java Tic-Tac-Toe in the Shell',
        description: `A simple command-line Tic-Tac-Toe game developed in Java, allowing two players to compete directly in the terminal.`,
        link: 'https://github.com/VictorSulivan/Morpion_java',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'Online Memory Game',
        description: `A web-based memory game developed in PHP, JavaScript, HTML, and CSS. It features multiple levels, user accounts, and game progress tracking.`,
        link: 'https://github.com/VictorSulivan/Puissance-4',
    }
];
