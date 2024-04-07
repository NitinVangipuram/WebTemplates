import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Form from './components/Form';
import { useEffect , useRef} from 'react';
import DOMPurify from 'dompurify';
import { saveAs } from 'file-saver';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: "monospace",
    h6: {
      fontWeight: 600,
    },
  },
});
function TemplateDashboard() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  const [portfolioData, setPortfolioData] = useState(null);

  const handleFormSubmit = (data) => {
    setPortfolioData(data);
    generatePortfolioHTML(data);
  };

  const generatePortfolioHTML = (data) => {
    console.log(data);
    const colors = ["red", "green", "blue", "yellow", "purple"];
    const colorsv2 = ["purple", "yellow", "blue", "green", "red"];
    const iconMapping = {
      bachelor: "fas fa-graduation-cap",
      master: "fas fa-user-graduate",
      phd: "fas fa-book-reader",
      certificate: "fas fa-certificate",
      coding: "fas fa-laptop-code", // Example if you have coding bootcamps or courses
      // Add more types and their corresponding icons as needed
    };
    const projectIconMapping = {
      web: "fas fa-laptop-code",
      mobile: "fas fa-mobile-alt",
      database: "fas fa-database",
      machineLearning: "fas fa-brain",
      // Add more project types and their corresponding icons as needed
    };
    const projectsHtml = data.projects.map((project, index) => {
      // Select a color based on the project index
      const color = colors[index % colors.length]; // This ensures cycling through the colors array
      const iconClass = projectIconMapping[project.category] || "fas fa-laptop-code"; // Default icon
      
      return `
      <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div
        class="bg-gradient-to-br from-${color}-500 to-${color}-400 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-500"
      >
      <i class="${iconClass} fa-3x mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
        <p class="font-light text-md mb-4">
          ${project.description}
        </p>
        <a
          href=${project.githubLink}
          class="inline-block bg-white text-${color}-700 font-bold rounded-lg px-4 py-2 hover:bg-gray-100"
          >View More</a
        >
      </div>
    </div>
      `;
    }).join('');
    const skillsHtml = data.skills.map((skill, index) => {
      const color = colors[index % colors.length]; // This ensures cycling through the colors array
      return `<div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
      <div class="relative pt-1">
        <h3 class="text-xl font-semibold mb-2">${skill.language}</h3>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-${color}-200">
          <div style="width:${skill.percentage}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500"></div>
        </div>
      </div>
    </div>
      `;
    }).join('');
const educationHtml = data.education.map((education, index) => {
  const color = colorsv2[index % colors.length]; // This ensures cycling through the colors array
  const iconClass = iconMapping[education.level] || "fas fa-graduation-cap"
  return `<div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex">
  <div
    class="flex flex-col bg-${color}-500 text-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out flex-1 hover:scale-105 transform transition duration-500"
    style="min-height: 100%"
  >
    <i class="${iconClass} fa-3x mb-4"></i>
    <h3 class="text-xl font-semibold mb-2">
     ${education.degree}
    </h3>
    <p class="font-light text-md">
      ${education.institute}
    </p>
    <p class="mt-4 flex-1">
      ${education.info}
    </p>
  </div>
</div>
  `;
}).join('');
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
    
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
    
        <style>
          .feature-icon {
            font-size: 48px;
          }
          @keyframes gradientBG {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animated-gradient {
            background: linear-gradient(-45deg, #2c3e50, #4ca1af);
            background-size: 600% 600%;
            animation: gradientBG 10s ease infinite;
          }
          html {
            scroll-behavior: smooth;
          }
          section,
          header,
          footer {
            overflow-x: hidden; /* Hide horizontal overflow */
            overflow-y: auto; /* Auto manage vertical overflow */
          }
        </style>
      </head>
      <body class="font-sans">
        <header class="bg-gray-900 text-white p-5">
          <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl">${data.name}</h1> <!-- Adjusted font size to 2xl -->
            <nav>
              <ul class="flex space-x-6"> <!-- Increased space between navigation items -->
                <li><a href="#home" class="hover:text-gray-400 text-lg">Home</a></li> <!-- Adjusted font size -->
                <li><a href="#projects" class="hover:text-gray-400 text-lg">Projects</a></li>
                <li><a href="#education" class="hover:text-gray-400 text-lg">Education</a></li>
                <li><a href="#skills" class="hover:text-gray-400 text-lg">Skills</a></li>
                <li><a href="#contact" class="hover:text-gray-400 text-lg">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
    
        <!-- Home Section -->
        <section
      id="intro"
      class="bg-cover bg-center relative animated-gradient"
      style="
        height: 100vh;
        padding-top: 2rem;
        padding-bottom: 2rem;
      "
    >
      <!-- Your content here -->
 
    
      <style>
      @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    
      .animated-gradient {
        background: linear-gradient(-45deg, #ee7752, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradientAnimation 15s ease infinite;
      }
    </style>
          <div
            class="absolute top-0 left-0 right-0 bottom-0"
            style="background-color: rgba(0, 0, 0, 0.5)"
          ></div>
          <div
            class="container mx-auto px-4 flex flex-wrap items-center justify-center relative"
            style="
              height: calc(100% - 4rem);
              width: 80%;
              border-radius: 5px;
              color: white;
              z-index: 1;
            "
          >
            <div
              class="flex flex-col items-center w-full md:w-2/3 lg:w-1/2 text-center"
            >
              <h1 class="text-6xl font-bold">
                Hi <span>,</span> i'm<br />
                ${data.name}</span>
              </h1>
              <h2 class="text-4xl  mt-4 mb-4" style="text-align: justify;">${data.title}</h2>
              <p class="text-lg mx-3" style="text-align: justify;">
               ${data.description}
              </p>
              <a
                href=${data.resumeLink}
                download="YourName_Resume"
                class="mt-8 px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 ease-in-out"
              >
                Download My Resume
              </a>
            </div>
          </div>
        </section>
    
        <!-- Projects Section -->
        <section
          id="projects"
          class="py-12 "
        >
          <div class="container mx-auto">
            <h2 class="text-3xl  text-center text-gray-800 mb-8">
              Projects
            </h2>
            <div class="flex flex-wrap -mx-4 p-8">
             ${projectsHtml}
            </div>
          </div>
        </section>
    
        <!-- Education Section -->
        <section id="education" class="py-12 bg-gradient-to-r from-blue-50 to-gray-100">
          <div class="container mx-auto">
            <h2 class="text-3xl text-center text-gray-800 mb-8">
              Education
            </h2>
            <div class="flex flex-wrap -mx-4 p-8 justify-center">
              ${educationHtml}             
            </div>
          </div>
        </section>
        <!-- Skills Section -->
    <section id="skills" class="py-12">
      <div class="container mx-auto">
        <h2 class="text-3xl  text-center text-gray-800 mb-8">
          Skills
        </h2>
        <div class="flex flex-wrap justify-center text-center">
          ${skillsHtml}
        </div>
      </div>
    </section>
    
        
        <!-- Contact Section -->
        <section
          id="contact"
          class="bg-gradient-to-r from-blue-50 to-indigo-100 py-20"
        >
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-4xl mx-auto">
              <h2 class="text-4xl font-bold text-gray-800 mb-8">
                Contact Me
              </h2>
              <div class="bg-white shadow-xl rounded-lg py-8 px-6 md:px-12">
                <p class="text-lg mb-4 text-gray-700">
                  If you wish to reach out, feel free to contact me via email at:
                </p>
                <div class="text-center mb-8">
                  <span class="inline-block bg-indigo-100 text-indigo-600 font-semibold py-2 px-4 rounded-full border border-indigo-300">
                    <!-- Here the email is displayed in a way to confuse bots but readable by humans -->
                    ${data.email.split('@')[0].replace(/\./g, ' DOT ')} AT ${data.email.split('@')[1].replace(/\./g, ' DOT ')}
                  </span>
                </div>
                <p class="text-gray-600">
                  Please replace " DOT " with "." and " AT " with "@" to get the correct email address.
                </p>
              </div>
            </div>
          </div>
        </section>
        

        
        
        <footer class="bg-gray-900 text-white text-center p-4">
          <p>Copyright &copy; 2024 by MyPortfolio. All rights reserved.</p>
        </footer>
      </body>
    </html>    
    `;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'portfolio.html');
  };
  const iframeRef = useRef(null);
  const customScrollbarStyles = `
<style>
  ::-webkit-scrollbar {
    width: 8px; /* Adjust the width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Track color */
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* Handle color */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Handle color on hover */
  }
</style>
`;
  const unsafeHTML = `
  ${customScrollbarStyles}
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Portfolio</title>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
  
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
  
      <style>
        .feature-icon {
          font-size: 48px;
        }
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animated-gradient {
          background: linear-gradient(-45deg, #2c3e50, #4ca1af);
          background-size: 600% 600%;
          animation: gradientBG 10s ease infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        section,
        header,
        footer {
          overflow-x: hidden; /* Hide horizontal overflow */
          overflow-y: auto; /* Auto manage vertical overflow */
        }
      </style>
    </head>
    <body class="font-sans">
      <header class="bg-gray-900 text-white p-5">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl">Your Name</h1> <!-- Adjusted font size to 2xl -->
          <nav>
            <ul class="flex space-x-6"> <!-- Increased space between navigation items -->
              <li><a href="#home" class="hover:text-gray-400 text-lg">Home</a></li> <!-- Adjusted font size -->
              <li><a href="#projects" class="hover:text-gray-400 text-lg">Projects</a></li>
              <li><a href="#education" class="hover:text-gray-400 text-lg">Education</a></li>
              <li><a href="#skills" class="hover:text-gray-400 text-lg">Skills</a></li>
              <li><a href="#contact" class="hover:text-gray-400 text-lg">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
  
      <!-- Home Section -->
      <section
      id="intro"
      class="bg-cover bg-center relative animated-gradient"
      style="
        height: 100vh;
        padding-top: 2rem;
        padding-bottom: 2rem;
      "
    >
      <!-- Your content here -->
 
    
      <style>
      @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    
      .animated-gradient {
        background: linear-gradient(-45deg, #ee7752, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradientAnimation 15s ease infinite;
      }
    </style>
    
    
        <div
          class="absolute top-0 left-0 right-0 bottom-0"
          style="background-color: rgba(0, 0, 0, 0.5)"
        ></div>
        <div
          class="container mx-auto px-4 flex flex-wrap items-center justify-center relative"
          style="
            height: calc(100% - 4rem);
            width: 80%;
            border-radius: 5px;
            color: white;
            z-index: 1;
          "
        >
          <div
            class="flex flex-col items-center w-full md:w-2/3 lg:w-1/2 text-center"
          >
            <h1 class="text-6xl font-bold">
              Hi <span>,</span> i'm<br />
              Your Name</span>
            </h1>
            <h2 class="text-4xl  mt-4 mb-4" style="text-align: justify;">Job Title</h2>
            <p class="text-lg mx-3" style="text-align: justify;">
              Briefly describe yourself here. Mention your passions, your
              strengths, or a unique perspective you bring to your field.
            </p>
            <a
              href="URL_TO_YOUR_RESUME.pdf"
              download="YourName_Resume"
              class="mt-8 px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 ease-in-out"
            >
              Download My Resume
            </a>
          </div>
        </div>
      </section>
  
      <!-- Projects Section -->
      <section
        id="projects"
        class="py-12 "
      >
        <div class="container mx-auto">
          <h2 class="text-3xl  text-center text-gray-800 mb-8">
            Projects
          </h2>
          <div class="flex flex-wrap -mx-4 p-8">
            <!-- Project 1 -->
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div
                class="bg-gradient-to-br from-green-500 to-green-400 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-500"
              >
                <i class="fas fa-database fa-3x mb-4"></i>
                <h3 class="text-xl font-semibold mb-2">Data Analysis Project</h3>
                <p class="font-light text-md mb-4">
                  Analyzing large datasets with Python and R.
                </p>
                <a
                  href="#"
                  class="inline-block bg-white text-green-700 font-bold rounded-lg px-4 py-2 hover:bg-gray-100"
                  >View More</a
                >
              </div>
            </div>
            <!-- Project 2 -->
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div
                class="bg-gradient-to-br from-blue-500 to-blue-400 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-500"
              >
                <i class="fas fa-laptop-code fa-3x mb-4"></i>
                <h3 class="text-xl font-semibold mb-2">
                  Web Development Project
                </h3>
                <p class="font-light text-md mb-4">
                  Creating responsive and dynamic websites.
                </p>
                <a
                  href="#"
                  class="inline-block bg-white text-blue-700 font-bold rounded-lg px-4 py-2 hover:bg-gray-100"
                  >View More</a
                >
              </div>
            </div>
            <!-- Project 3 -->
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div
                class="bg-gradient-to-br from-purple-500 to-purple-400 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-500"
              >
                <i class="fas fa-mobile-alt fa-3x mb-4"></i>
                <h3 class="text-xl font-semibold mb-2">Mobile App Development</h3>
                <p class="font-light text-md mb-4">
                  Developing user-friendly mobile applications.
                </p>
                <a
                  href="#"
                  class="inline-block bg-white text-purple-700 font-bold rounded-lg px-4 py-2 hover:bg-gray-100"
                  >View More</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Education Section -->
      <section id="education" class="py-12 bg-gradient-to-r from-blue-50 to-gray-100">
        <div class="container mx-auto">
          <h2 class="text-3xl text-center text-gray-800 mb-8">
            Education
          </h2>
          <div class="flex flex-wrap -mx-4 p-8 justify-center">
            <!-- B.S. in Computer Science -->
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex">
              <div
                class="flex flex-col bg-blue-500 text-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out flex-1 hover:scale-105 transform transition duration-500"
                style="min-height: 100%"
              >
                <i class="fas fa-laptop-code fa-3x mb-4"></i>
                <h3 class="text-xl font-semibold mb-2">
                  B.S. in Computer Science
                </h3>
                <p class="font-light text-md">
                  University of Awesome, 2016 - 2020
                </p>
                <p class="mt-4 flex-1">
                  Graduated with Honors, focusing on software development and data
                  structures.
                </p>
              </div>
            </div>
            <!-- M.S. in Data Science -->
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex">
              <div
                class="flex flex-col bg-green-500 text-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out flex-1 hover:scale-105 transform transition duration-500"
                style="min-height: 100%"
              >
                <i class="fas fa-chart-line fa-3x mb-4"></i>
                <h3 class="text-xl font-semibold mb-2">M.S. in Data Science</h3>
                <p class="font-light text-md">Institute of Data, 2020 - 2022</p>
                <p class="mt-4 flex-1">
                  Specialized in machine learning and big data technologies.
                </p>
              </div>
            </div>
            <!-- Certifications -->
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex">
              <div
                class="flex flex-col bg-indigo-500 text-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out flex-1 hover:scale-105 transform transition duration-500"
                style="min-height: 100%"
              >
                <i class="fas fa-award fa-3x mb-4"></i>
                <h3 class="text-xl font-semibold mb-2">Certifications</h3>
                <p class="font-light text-md">Various, 2018 - Present</p>
                <p class="mt-4 flex-1">
                  Certified in AWS, Google Cloud, and Full-Stack Development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Skills Section -->
  <section id="skills" class="py-12">
    <div class="container mx-auto">
      <h2 class="text-3xl  text-center text-gray-800 mb-8">
        Skills
      </h2>
      <div class="flex flex-wrap justify-center text-center">
        <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div class="relative pt-1">
            <h3 class="text-xl font-semibold mb-2">HTML & CSS</h3>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
              <div style="width:90%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div class="relative pt-1">
            <h3 class="text-xl font-semibold mb-2">JavaScript</h3>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div style="width:75%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div class="relative pt-1">
            <h3 class="text-xl font-semibold mb-2">SQL</h3>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
              <div style="width:75%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div class="relative pt-1">
            <h3 class="text-xl font-semibold mb-2">C++</h3>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div style="width:75%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div class="relative pt-1">
            <h3 class="text-xl font-semibold mb-2">Python</h3>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div style="width:85%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div class="relative pt-1">
            <h3 class="text-xl font-semibold mb-2">React</h3>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <div style="width:70%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div class="relative pt-1">
            <h3 class="text-xl font-semibold mb-2">Node</h3>
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
              <div style="width:80%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
  
      <!-- Contact Section -->
      <section
          id="contact"
          class="bg-gradient-to-r from-blue-50 to-indigo-100 py-20"
        >
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-4xl mx-auto">
              <h2 class="text-4xl font-bold text-gray-800 mb-8">
                Contact Me
              </h2>
              <div class="bg-white shadow-xl rounded-lg py-8 px-6 md:px-12">
                <p class="text-lg mb-4 text-gray-700">
                  If you wish to reach out, feel free to contact me via email at:
                </p>
                <div class="text-center mb-8">
                  <span class="inline-block bg-indigo-100 text-indigo-600 font-semibold py-2 px-4 rounded-full border border-indigo-300">
                    <!-- Here the email is displayed in a way to confuse bots but readable by humans -->
                    CONTACT_EMAIL AT DOMAIN DOT COM
                  </span>
                </div>
                <p class="text-gray-600">
                  Please replace " DOT " with "." and " AT " with "@" to get the correct email address.
                </p>
              </div>
            </div>
          </div>
        </section>
      <footer class="bg-gray-900 text-white text-center p-4">
        <p>Copyright &copy; 2024 by MyPortfolio. All rights reserved.</p>
      </footer>
    </body>
  </html>  
`;


  return (
   <>
   <div style={{margin:"0px"}}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures consistent baseline styles */}
        <Container style={{marginTop: "100px", marginLeft:"3%",marginRight:"0", display: "flex", flexDirection: isMobile ? "column" : "row", gap: "20px" , maxWidth:"1400px" }}>
      <iframe
        srcDoc={unsafeHTML}
        style={{
          flex: isMobile ? "1 0 100%" : "3 1 0%", // Takes full width on mobile, 75% on desktop
          height: isMobile? "600px":'800px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: "white",
           // Disables mouse clicks and other pointer events on the iframe
        }}
        title="Preview"
      />
      <div
        style={{
          flex: isMobile ? "1 0 100%" : "1 1 0%", // Takes full width on mobile, 25% on desktop
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Form onSubmit={handleFormSubmit} />
      </div>
    </Container>


</ThemeProvider>
</div>
    </>
  );
}

export default TemplateDashboard;
