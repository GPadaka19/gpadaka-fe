import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { Achievements } from "./Achievements";

type ExperienceItem = {
  type: string;
  title: string;
  company: string;
  location: string;
  start: { month: number; year: number };
  end?: { month: number; year: number } | null;
  description: string;
  skills: string[];
  achievements: string[];
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatPeriod(start: { month: number; year: number }, end?: { month: number; year: number } | null): string {
  const startLabel = `${monthNames[start.month]} ${start.year}`;
  const effectiveEnd = end ?? { month: new Date().getMonth(), year: new Date().getFullYear() };
  const endLabel = end ? `${monthNames[effectiveEnd.month]} ${effectiveEnd.year}` : "Present";

  const totalMonths = (effectiveEnd.year - start.year) * 12 + (effectiveEnd.month - start.month) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  const duration = parts.join(" ");

  return `${startLabel} - ${endLabel} · ${duration}`.trim();
}

const experiences: ExperienceItem[] = [
  {
    type: "freelance",
    title: "Full Stack Web Developer",
    company: "Versequest",
    location: "Yogyakarta (Remote)",
    start: { month: 4, year: 2025 }, // May 2025
    end: { month: 7, year: 2025 }, // Aug 2025
    description: `I'm currently contributing to Legacy of the Sunstone, a cinematic adventure game set in 2100 and the colonial 19th century, where a time-traveling protagonist uncovers the secrets of the mythical Prasasti Parameswara. The game highlights immersive exploration across Indonesia, dynamic climbing physics, and a narrative rooted in cultural history.
                  
My role focuses on building the official website, managing VPS infrastructure with self-hosted Git (Forgejo), and implementing CI/CD for automated deployment. I also support the dev team with server logistics, asset delivery, and repository access, bridging web engineering with game development.`,
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Git"],
    achievements: [
      "Designing and developing the game's official website",
      "Managing VPS infrastructure for self-hosted Git repositories (Forgejo)",
      "Implementing and maintaining CI/CD pipelines for automated web deployment",
      "Supporting the game dev team by handling server-side logistics, asset delivery routes, and repository access"
    ]
  },
  {
    type: "volunteer",
    title: "Master Trainer of AWS Laptop for Builders, Terampil di Awan & TALENTA 2024",
    company: "Yayasan Sagasitas Indonesia",
    location: "Yogyakarta (Part-Time)",
    start: { month: 4, year: 2021 }, // May 2021
    end: { month: 1, year: 2025 }, // Feb 2025
    description: "I am a passionate Master Trainer for the Laptops for Builders (L4B) & Skilled in the Cloud (TDA) program led by Amazon Web Services (AWS). This initiative empowers Indonesians with essential skills in statistical web design and cloud computing, delivered in Indonesian. I have successfully engaged diverse participants—including students, teachers, school principals, and children with special needs—through impactful training and large-scale events. With strong expertise in strategy design, stakeholder engagement, and educational data management, I play a key role in bridging Indonesia's digital skills gap.",
    skills: ["Public Speaking", "Website Building", "Presentation", "Cloud Computing (AWS)", "Negotiation"],
    achievements: [
      "Introduced AWS Cloud Computing technology to more than 100,000 students and teachers across 10 provinces, raising digital literacy and awareness nationwide.",
      "Led and trained over 15 trainers while developing 3+ innovative learning materials tailored for diverse audiences, including children with special needs.",
      "Monitored and supported the successful graduation of 20,000+ students from the Skilled in the Cloud program, delivering data-driven insights to improve learning outcomes.",
      "Established collaborations with 30+ schools, 3 Government Education Offices, and national organizations, fostering sustainable educational partnerships with AWS Indonesia."
    ]
  },
  {
    type: "internship",
    title: "Cloud Computing Student",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    location: "Yogyakarta (Remote)",
    start: { month: 8, year: 2024 }, // Sep 2024
    end: { month: 0, year: 2025 }, // Jan 2025
    description: `During the Bangkit 2024 program in Cloud Computing, I studied various topics such as cloud services, CI/CD, infrastructure management, cloud security, and cost optimization. Learning is done through platforms such as Dicoding and Google Cloud Skill Boost, as well as structured training through Instructor-Led Training (ILT),

I also interpersonal skills, such as time management, developing critical thinking, adaptability, and effective presentations in English. This program provides a balanced learning experience between theory and practice, preparing me to face the challenges of the world of work in the field of cloud technology.`,
    skills: ["Vue.js", "Express.js", "MongoDB", "AWS", "Docker"],
    achievements: [
      "Completed intensive training in Cloud Computing through Dicoding, Google Cloud Skill Boost, and Instructor-Led Training (ILT), gaining hands-on experience in cloud services, CI/CD, infrastructure management, and security.",
      "Built practical projects that applied cloud concepts into real scenarios, demonstrating the ability to optimize infrastructure and manage cloud costs effectively.",
      "Developed strong professional skills, including time management, adaptability, and critical thinking, ensuring readiness to work in fast-paced cloud technology environments.",
      "Delivered technical presentations in English, improving communication and presentation skills while engaging with peers and instructors in a professional setting."
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
                            <span>{formatPeriod(exp.start, exp.end)}</span>
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