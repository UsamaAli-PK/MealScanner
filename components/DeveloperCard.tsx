import React from 'react';
import profileImage from '../images/usamaali.jpeg'; 

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const XTwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DeveloperCardComponent: React.FC = () => {
  return (
    <div className="modern-card p-6 sm:p-10 rounded-3xl shadow-xl max-w-xl mx-auto text-center transform transition-all duration-500 hover:scale-102">
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6 group">
        <img 
          src={profileImage} 
          alt="Usama Ali" 
          className="w-full h-full rounded-full object-cover border-4 border-[var(--modern-bg-secondary)] shadow-lg relative z-10 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Decorative Rings/Glow */}
        <div className="absolute inset-0 rounded-full ring-4 ring-offset-4 ring-offset-[var(--modern-bg-secondary)] ring-[var(--modern-accent-primary)]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse group-hover:animate-none" style={{animationDuration: '3s'}}></div>
        <div className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-[var(--modern-bg-secondary)] ring-[var(--modern-accent-secondary)]/20 opacity-0 group-hover:opacity-80 transition-opacity duration-500 delay-100 animate-pulse group-hover:animate-none" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
        
        <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-gradient-to-br from-[var(--modern-accent-primary)] to-[var(--modern-accent-secondary)] p-2 sm:p-2.5 rounded-full shadow-md z-20 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zM2 10a8 8 0 1116 0 8 8 0 01-16 0zm7.707-2.707a1 1 0 00-1.414 0L6 9.586V8a1 1 0 00-2 0v4a1 1 0 001 1h4a1 1 0 000-2H7.414l2.293-2.293a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
        </div>
      </div>

      <h2 className="text-4xl sm:text-5xl font-black text-super-gradient-modern mb-2">Usama Ali</h2>
      <p className="text-lg sm:text-xl text-[var(--modern-text-primary)] font-medium mb-5">Web Developer & Ai Specialist</p>
      
      <div className="w-1/4 h-0.5 bg-gradient-to-r from-transparent via-[var(--modern-accent-primary)] to-transparent mx-auto my-6 opacity-30"></div>

      <p className="text-base sm:text-lg text-[var(--modern-text-secondary)] mb-8 leading-relaxed">
      An AI enthusiast and Web developer who's passionate about building smart solutions that make a real difference. With a background in computer science and a knack for innovation, I love turning ideas into reality through AI-powered workflows and web apps
      </p>

      <div className="flex justify-center space-x-5 sm:space-x-7">
        {[
          { href: "https://github.com/UsamaAli-PK", label: "Usama Ali's GitHub", Icon: GithubIcon, rotation: "-8deg" },
          { href: "", label: "Usama Ali's LinkedIn", Icon: LinkedinIcon, rotation: "0deg" },
          { href: "#", label: "Usama Ali's X (Twitter)", Icon: XTwitterIcon, rotation: "8deg" },
        ].map(({ href, label, Icon, rotation }) => (
          <a 
            key={label}
            href={href} 
            aria-label={label}
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--modern-text-tertiary)] hover:text-[var(--modern-accent-primary)] transition-all duration-300 transform hover:scale-125"
            style={{ '--tw-rotate': rotation } as React.CSSProperties} 
          >
            <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
        ))}
      </div>
    </div>
  );
};

export const DeveloperCard = React.memo(DeveloperCardComponent);
