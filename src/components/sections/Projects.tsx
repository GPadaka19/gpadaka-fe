import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Eye, X, ZoomIn } from "lucide-react";
import pothole  from "@/assets/pothole.webp";
import certifynft  from "@/assets/certify-nft.webp";
import calendo  from "@/assets/calendo.webp";
import lots  from "@/assets/lots.webp";
import shiftmaster  from "@/assets/shiftmaster.webp";
import fintrack  from "@/assets/fintrack.webp";


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
    title: "Legacy Of The Sunstone",
    description: "Immersive game showcase site with cinematic design, responsive layouts, and Firebase-powered features.",
    image: lots,
    tags: ["React","Vite", "Tailwind CSS", "Firebase Auth", "Firestore Database", "Docker"],
    demoUrl: "https://lots.gpadaka.com/",
    githubUrl: "https://github.com/GPadaka19/LOTS-Versequest",
    featured: false
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
    title: "Shiftmaster",
    description: "High-efficiency internal PWA for managing campus laboratory operations. Features real-time Google Sheets synchronization and a spatial dashboard for monitoring staff distribution across floors.",
    image: shiftmaster,
    tags: ["React", "TypeScript", "PWA", "Google Sheets API", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    title: "Fintrack",
    description: "Modern personal finance PWA designed for comprehensive expense tracking and budget management. Features a dynamic dashboard with real-time financial insights, interactive data visualization, and secure Google OAuth authentication.",
    image: fintrack,
    tags: ["React", "TypeScript", "PWA", "TanStack Query", "Tailwind CSS", "Google OAuth", "Docker"],
    demoUrl: "https://fintrack.gpadaka.com/",
    githubUrl: "#",
    featured: false
  },
  // {
  //   title: "Melali",
  //   description: "Simple travel ticketing website for Yogyakarta attractions with streamlined booking flow.",
  //   image: "",
  //   tags: ["Laravel", "My SQL", "Bootstrap", "Tailwind CSS"],
  //   demoUrl: "#",
  //   githubUrl: "https://github.com/GPadaka19/Melali_Laravel",
  //   featured: false
  // }
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
              <Card className="tech-card h-full group transition-all duration-300 overflow-hidden border-border/50 hover:shadow-lg">
                <CardHeader className="p-0">
                  <div 
                    className="relative overflow-hidden rounded-t-lg aspect-video cursor-zoom-in group/image"
                    onClick={() => project.image && setSelectedImage(project.image)}
                  >
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                          loading="lazy"
                        />
                         <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                            <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
                         </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center cursor-default">
                        <Eye className="h-12 w-12 text-primary/60" />
                      </div>
                    )}
                    
                    {/* Minimal Overlay for Badge Only */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 z-10 pointer-events-none">
                        <Badge className="bg-primary/90 backdrop-blur-sm shadow-sm border-0">
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex flex-col h-full bg-card/50 backdrop-blur-[2px]">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1" title={project.title}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3" title={project.description}>
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50 font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-border/30">
                    {project.demoUrl && project.demoUrl !== "#" ? (
                      <Button size="sm" variant="outline" className="flex-1 hover:bg-primary hover:text-primary-foreground group/btn transition-colors" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="flex-1 opacity-70 bg-muted/50" disabled>
                        <span className="text-xs">Internal Tool</span>
                      </Button>
                    )}
                    
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <Button size="sm" variant="outline" className="flex-1 hover:bg-primary hover:text-primary-foreground group/btn transition-colors" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <div className="absolute top-4 right-4 z-50">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                   <X className="w-6 h-6" />
                </Button>
              </div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-7xl w-full max-h-[90vh] overflow-hidden rounded-lg shadow-2xl cursor-zoom-out"
                onClick={() => setSelectedImage(null)} 
              >
                <img
                  src={selectedImage}
                  alt="Project Preview"
                  className="w-full h-full object-contain max-h-[90vh] bg-black/50"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}