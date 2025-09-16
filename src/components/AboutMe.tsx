'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export const AboutMe = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <motion.div 
            className="relative w-full rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-square relative">
              <Image 
                src="/profile.jpg" 
                alt="Tushar's profile picture" 
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
          
          {/* Right column - Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gradient">Hi, I'm Tushar 👋</h3>
            <div className="space-y-4 text-lg text-text-secondary">
              <p>
                I'm a passionate Cybersecurity & AI enthusiast currently pursuing my BTech in Cybersecurity.
              </p>
              <p>
                I love building secure, intelligent, and future-ready applications.
              </p>
              <p>
                I've also worked on projects ranging from penetration testing to AI-powered tools, and I'm constantly exploring how technology can solve real-world problems.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};