import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaAws } from "react-icons/fa";
import { SiReact, SiTypescript, SiSolidity, SiNextdotjs, SiTailwindcss, SiLaravel, 
         SiNodedotjs, SiGo, SiPostgresql, SiMysql, SiGithub, SiDocker, SiFigma, SiUbuntu, SiHoppscotch } from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 80, icon: SiReact },
      { name: "TypeScript", level: 60, icon: SiTypescript  },
      { name: "Next.js", level: 39, icon: SiNextdotjs },
      { name: "Tailwind CSS", level: 90, icon: SiTailwindcss },
      { name: "Laravel", level: 75, icon: SiLaravel }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 75, icon: SiNodedotjs },
      { name: "Solidity", level: 69, icon: SiSolidity },
      { name: "Go", level: 85, icon: SiGo },
      { name: "PostgreSQL", level: 90, icon: SiPostgresql },
      { name: "MySQL", level: 85, icon: SiMysql }
    ]
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git & GitHub", level: 80, icon: SiGithub },
      { name: "Docker", level: 85, icon: SiDocker },
      { name: "AWS", level: 50, icon: FaAws  },
      { name: "Figma", level: 75, icon: SiFigma },
      { name: "Ubuntu", level: 80, icon: SiUbuntu },
      { name: "Hoppscotch", level: 90, icon: SiHoppscotch },
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
            >
              <Card className="tech-card h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-center text-primary">
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1, 
                          duration: 0.4 
                        }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{<skill.icon />}</span>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                              duration: 0.8 
                            }}
                            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}