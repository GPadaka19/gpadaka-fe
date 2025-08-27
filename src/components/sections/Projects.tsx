import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Eye } from "lucide-react";
import pothole  from "@/assets/pothole.webp";
import certifynft  from "@/assets/certify-nft.webp";
import calendo  from "@/assets/calendo.webp";
import lots  from "@/assets/lots.webp";

const projects = [
  {
    title: "Pothole Detection System",
    description: "ML-based road pothole detection from images/video, built for coursework and evolving into thesis.",
    image: pothole,
    tags: ["Python", "YOLOv8", "React", "FastAPI", "MongoDB", "Docker"],
    demoUrl: "https://pothole.gpadaka.com/",
    githubUrl: "https://github.com/GPadaka19/D20-FE",
    featured: true
  },
  {
    title: "Certify-NFT",
    description: "Event platform with NFT-based certificates, enabling verifiable, automated, and user-linked issuance.",
    image: certifynft,
    tags: ["Solidity", "Ether.js", "React", "NFT", "IPFS", "Docker"],
    demoUrl: "https://certify.nft.gpadaka.com/",
    githubUrl: "https://github.com/orgs/WLNO/repositories?q=Certify-NFT",
    featured: true
  },
  {
    title: "Calendo",
    description: "Landing page that bulk-creates Google Calendar events from CSV & chatbot input planned.",
    image: calendo,
    tags: ["Next.js", "Tailwind CSS", "Docker"],
    demoUrl: "https://calendo.gpadaka.com/",
    githubUrl: "https://github.com/GPadaka19/Calendo",
    featured: false
  },
  {
    title: "Legacy Of The Sunstone",
    description: "Immersive game showcase site with cinematic design, responsive layouts, and Firebase-powered features.",
    image: lots,
    tags: ["React","Vite", "Tailwind CSS", "Firebase Auth", "Firestore Database", "Docker"],
    demoUrl: "https://lots.gpadaka.com/",
    githubUrl: "https://github.com/GPadaka19/LOTS-Versequest",
    featured: false
  },
  {
    title: "Melali",
    description: "Simple travel ticketing website for Yogyakarta attractions with streamlined booking flow.",
    image: "",
    tags: ["Laravel", "My SQL", "Bootstrap", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/GPadaka19/Melali_Laravel",
    featured: false
  }
  // {
  //   title: "Fitness Tracking App",
  //   description: "Mobile-first fitness application with workout planning, progress tracking, and social features. Includes integration with wearable devices.",
  //   image: "/api/placeholder/500/300",
  //   tags: ["React Native", "Firebase", "Redux", "Health Kit", "Chart.js"],
  //   demoUrl: "#",
  //   githubUrl: "#",
  //   featured: false
  // }
];

export function Projects() {
  return (
    <section id="projects" className="py-20 section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={project.featured ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="tech-card h-full group project-card-hover transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Eye className="h-12 w-12 text-primary/60" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                    {project.featured && (
                      <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
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