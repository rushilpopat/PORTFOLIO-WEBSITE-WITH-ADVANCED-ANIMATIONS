import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AppContainer = styled.div`
  min-height: 100vh;
`;

const Section = styled.section`
  padding: 100px 20px;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0;
`;

const Hero = styled(Section)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  opacity: 0;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #888;
  opacity: 0;
`;

const About = styled(Section)`
  background: #111;
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  opacity: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const Skills = styled(Section)`
  background: #0a0a0a;
`;

const SkillCategory = styled.div`
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  opacity: 0;
`;

const SkillCard = styled.div`
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  transform: translateY(50px);
  opacity: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  h3 {
    margin-bottom: 0.5rem;
    color: #fff;
  }

  p {
    color: #888;
    font-size: 0.9rem;
  }
`;

const Projects = styled(Section)`
  background: #111;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled.div`
  background: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  opacity: 0;
  transform: translateY(50px);
`;

const Contact = styled(Section)`
  background: #0a0a0a;
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  opacity: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #1a1a1a;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #333;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #1a1a1a;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: 2px solid #333;
  }
`;

const Button = styled.button`
  background: #333;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #444;
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-100%);
  opacity: 0;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a<{ active: boolean }>`
  color: ${props => props.active ? '#fff' : '#888'};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: #fff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;
    &:after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.95);
  padding: 2rem;
  z-index: 1001;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
`;

const MobileNavLink = styled.a<{ active: boolean }>`
  color: ${props => props.active ? '#fff' : '#888'};
  text-decoration: none;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  cursor: pointer;
`;

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLFormElement>(null);
  const sectionTitles = useRef<(HTMLHeadingElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", description: "Advanced component development" },
        { name: "TypeScript", description: "Type-safe development" },
        { name: "JavaScript", description: "ES6+ & Modern JS" },
        { name: "HTML5", description: "Semantic markup" },
        { name: "CSS3", description: "Modern styling" },
        { name: "SASS/SCSS", description: "Advanced styling" }
      ]
    },
    {
      title: "Backend & Tools",
      skills: [
        { name: "Node.js", description: "Server-side development" },
        { name: "Express", description: "API development" },
        { name: "MongoDB", description: "Database management" },
        { name: "Git", description: "Version control" },
        { name: "Docker", description: "Containerization" },
        { name: "AWS", description: "Cloud services" }
      ]
    },
    {
      title: "UI/UX & Design",
      skills: [
        { name: "Figma", description: "UI/UX design" },
        { name: "Adobe XD", description: "Prototyping" },
        { name: "Responsive Design", description: "Mobile-first approach" },
        { name: "Accessibility", description: "WCAG guidelines" },
        { name: "Animation", description: "GSAP & Framer Motion" },
        { name: "UI Libraries", description: "Material-UI, Tailwind" }
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    // Navigation animation
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });

    // Scroll spy
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top center',
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });

    // Hero section animation
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });

    // Section titles animation
    sectionTitles.current.forEach((title) => {
      if (title) {
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: title,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    // About section animation
    gsap.to(aboutRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
    });

    // Skills section animation
    gsap.to(skillsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
    });

    // Project cards animation
    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.to(ref, {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ref,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.2,
        });
      }
    });

    // Contact form animation
    gsap.to(contactRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <AppContainer>
      <Nav ref={navRef}>
        <Logo>Portfolio</Logo>
        <NavLinks>
          {sections.map(section => (
            <NavLink
              key={section.id}
              active={activeSection === section.id}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </NavLink>
          ))}
        </NavLinks>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      <MobileMenu isOpen={isMobileMenuOpen}>
        {sections.map(section => (
          <MobileNavLink
            key={section.id}
            active={activeSection === section.id}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </MobileNavLink>
        ))}
      </MobileMenu>

      <Hero id="home">
        <HeroContent>
          <Title ref={titleRef}>Welcome to My Portfolio</Title>
          <Subtitle ref={subtitleRef}>Frontend Developer & UI/UX Enthusiast</Subtitle>
        </HeroContent>
      </Hero>

      <About id="about">
        <SectionTitle ref={(el) => (sectionTitles.current[0] = el)}>About Me</SectionTitle>
        <AboutContent ref={aboutRef}>
          <AboutText>
            <p>
              I'm a passionate frontend developer with a keen eye for design and a love for creating
              beautiful, interactive web experiences. With expertise in modern web technologies and
              a strong foundation in UI/UX principles, I strive to build applications that are both
              visually appealing and highly functional.
            </p>
            <p>
              My journey in web development started with a curiosity about how things work on the
              internet, which led me to dive deep into the world of coding and design. I'm
              constantly learning and exploring new technologies to stay at the forefront of web
              development.
            </p>
          </AboutText>
        </AboutContent>
      </About>

      <Skills id="skills">
        <SectionTitle ref={(el) => (sectionTitles.current[1] = el)}>Skills</SectionTitle>
        <SkillsGrid ref={skillsRef}>
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory key={category.title}>
              <CategoryTitle>{category.title}</CategoryTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    ref={(el) => {
                      if (!projectRefs.current[categoryIndex * 6 + skillIndex]) {
                        projectRefs.current[categoryIndex * 6 + skillIndex] = el;
                      }
                    }}
                  >
                    <h3>{skill.name}</h3>
                    <p>{skill.description}</p>
                  </SkillCard>
                ))}
              </div>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Skills>

      <Projects id="projects">
        <SectionTitle ref={(el) => (sectionTitles.current[2] = el)}>Projects</SectionTitle>
        <ProjectGrid>
          {[1, 2, 3].map((_, index) => (
            <ProjectCard
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
            >
              <h3>Project {index + 1}</h3>
              <p>Description of project {index + 1}</p>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Projects>

      <Contact id="contact">
        <SectionTitle ref={(el) => (sectionTitles.current[3] = el)}>Contact Me</SectionTitle>
        <ContactForm ref={contactRef}>
          <Input type="text" placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <TextArea placeholder="Your Message" />
          <Button type="submit">Send Message</Button>
        </ContactForm>
      </Contact>
    </AppContainer>
  );
};

export default App; 