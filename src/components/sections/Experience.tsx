import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { Achievements } from "./Achievements";

const experiences = [
  {
    type: "freelance",
    title: "Full Stack Web Developer",
    company: "Versequest",
    location: "Yogyakarta (Remote)",
    period: "May 2024 - Present",
    description: `I’m currently contributing to Legacy of the Sunstone, a cinematic adventure game set in 2100 and the colonial 19th century, where a time-traveling protagonist uncovers the secrets of the mythical Prasasti Parameswara. The game highlights immersive exploration across Indonesia, dynamic climbing physics, and a narrative rooted in cultural history.
                  
My role focuses on building the official website, managing VPS infrastructure with self-hosted Git (Forgejo), and implementing CI/CD for automated deployment. I also support the dev team with server logistics, asset delivery, and repository access, bridging web engineering with game development.`,
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Git"],
    achievements: [
      "Lorem Ipsum",
      "Lorem Ipsum",
      "Lorem Ipsum"
    ]
  },
  {
    type: "volunteer",
    title: "Master Trainer of AWS Laptop for Builders, Terampil di Awan & TALENTA 2024",
    company: "Yayasan Sagasitas Indonesia",
    location: "Yogyakarta (Part-Time)",
    period: "Jan 2024 - May 2024",
    description: `I am a passionate Master Trainer for the Laptops for Builders (L4B) & Skilled in the Cloud (TDA) program, led by Amazon Web Services (AWS). This initiative empowers Indonesians with skills in statistical web design and cloud basics (delivered in Indonesian). My reach extends beyond traditional classrooms, equipping individuals from various backgrounds—including students, teachers, school principals, and children with special needs.

Key Responsibilities:

• Designing Strategy and Negotiation Agendas: Involved in designing strategy agendas, negotiations, and discussions with stakeholders from more than 30 schools, 3 Government Education Offices, National and Regional Scouts, and AWS Indonesia.
• Presenting AWS Cloud Computing Technology: Introducing AWS Cloud Computing technology to more than 100,000 students and teachers from 10 provinces in Indonesia, with an average of 200 participants per event.
• Managing Trainers and Learning Materials: Managed trainers and other learning materials, created over 3 learning materials, and trained more than 15 trainers.
• Receiving and Analyzing Teaching Reports: Collect and analyze reports from fellow teachers, including student attendance data and enrollment numbers on the “Skilled Programs in the Cloud” platform.
• Monitoring and Reporting Student Progress: Monitor the learning progress of over 20,000 students until they graduate, manage data as a Learning Admin, report and provide high-quality data visualizations and strategic solutions to improve educational processes and support institutional growth.

Additional Roles:

• Adapting teaching to various learning styles and abilities.
• Playing a key leadership role in managing and supervising up to 10 sessions simultaneously.
• Handling operational data, ensuring the accuracy of attendance lists, graduate lists, KPIs, and data collection on participant certificates and competition winner websites.
• Passionate about bridging the digital skills gap in Indonesia.`,
    skills: ["Public Speaking", "Website Building", "Presentation", "Cloud Computing (AWS)", "Negotiation"],
    achievements: [
      "Lorem Ipsum",
      "Lorem Ipsum",
      "Lorem Ipsum"
    ]
  },
  {
    type: "internship",
    title: "Cloud Computing Student",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    location: "Yogyakarta (Remote)",
    period: "Sep 2024 - Jan 2025",
    description: `During the Bangkit 2024 program in Cloud Computing, I studied various topics such as cloud services, CI/CD, infrastructure management, cloud security, and cost optimization. Learning is done through platforms such as Dicoding and Google Cloud Skill Boost, as well as structured training through Instructor-Led Training (ILT),

I also interpersonal skills, such as time management, developing critical thinking, adaptability, and effective presentations in English. This program provides a balanced learning experience between theory and practice, preparing me to face the challenges of the world of work in the field of cloud technology.`,
    skills: ["Vue.js", "Express.js", "MongoDB", "AWS", "Docker"],
    achievements: [
      "Lorem Ipsum",
      "Lorem Ipsum",
      "Lorem Ipsum"
    ]
  }
];

// achievements moved to Achievements.tsx

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience & Achievements</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and notable accomplishments
          </p>
        </motion.div>

        {/* Experience Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-primary"
          >
            Professional Experience
          </motion.h3>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="tech-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{exp.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {(
                          {
                            internship: "Internship",
                            freelance: "Freelance",
                            volunteer: "Volunteer"
                          } as Record<string, string>
                        )[(exp.type || "").toLowerCase()] ?? exp.type ?? "Undefined"}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{exp.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Key Achievements:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <Achievements />
      </div>
    </section>
  );
}