import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Brain, Zap, Award } from "lucide-react";
import { SiSolidity } from "react-icons/si";

const interests = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building modern, responsive web applications with React, TypeScript, & cutting-edge frameworks"
  },
  {
    icon: SiSolidity,
    title: "Blockchain Development",
    description: "Building smart contracts & exploring Web3 technologies for secure & transparent solutions"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Creating fast, efficient solutions with focus on user experience & scalability"
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Exploring artificial intelligence, neural networks, & data science applications"
  },
];

export function About() {
  return (
    <section id="about" className="py-20 section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate Informatics student with a deep love for technology and innovation. 
            Currently pursuing my degree while building real-world project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                My journey in computer science started with curiosity about how systems and applications work behind the scenes. 
                As an Informatics student, I’ve built a solid foundation in software engineering and backend development, 
                especially with RESTful APIs and blockchain-based smart contracts.
              </p>
              <p className="text-lg leading-relaxed">
                While I have experience with frontend development using modern JavaScript frameworks like React and TypeScript, 
                I see myself stronger in backend logic and system design. 
                For frontend, I usually take inspiration from existing references and adapt them into working solutions.
              </p>
              <p className="text-lg leading-relaxed">
                Beyond web development, I’m also interested in artificial intelligence and machine learning. 
                Although it’s not my primary focus, I’m gradually exploring how these technologies can complement my work in web and blockchain systems.
              </p>
              <p className="text-lg leading-relaxed">
                Outside of coding, I enjoy learning from open-source projects, following the latest tech trends, and continuously improving my skills. 
                I believe technology grows best through collaboration and shared learning.
              </p>
            </div>
          </motion.div>

          {/* Interests Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr items-stretch"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="h-full"
              >
                <Card className="tech-card group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header (icon + title) */}
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                        <interest.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{interest.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mt-auto">
                      {interest.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}