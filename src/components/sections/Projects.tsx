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
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const closeModal = () => {
    setSelectedProject(null);
    setIsImageExpanded(false);
  };

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
                    onClick={() => setSelectedProject(project)}
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
                <CardContent className="p-6 flex-1 flex flex-col bg-card/50 backdrop-blur-[2px]">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1" title={project.title}>
                      {project.title}
                    </h3>
                    <div 
                      className="cursor-pointer group/desc"
                      onClick={() => setSelectedProject(project)}
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover/desc:text-foreground transition-colors" title={project.description}>
                        {project.description}
                      </p>
                      <span className="text-xs text-primary font-medium mt-1 inline-block hover:underline">
                        Read more
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50 font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 mt-auto border-t border-border/30 w-full">
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

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            >
              <div className="absolute top-4 right-4 z-[60]">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                >
                   <X className="w-6 h-6" />
                </Button>
              </div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-background dark:bg-card border border-border w-full max-w-5xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()} 
              >
                {/* Image Section */}
                <div 
                  className="w-full md:w-1/2 bg-muted/30 relative flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-full group cursor-zoom-in"
                  onClick={() => setIsImageExpanded(true)}
                >
                   {selectedProject.image ? (
                    <>
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain md:object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ZoomIn className="text-white w-12 h-12 drop-shadow-md" />
                      </div>
                    </>
                   ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Eye className="w-16 h-16 mb-4 opacity-50" />
                      <p>No Preview Available</p>
                    </div>
                   )}
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-full bg-card/50 backdrop-blur-sm">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-2 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground mb-8">
                    <p className="whitespace-pre-line leading-relaxed text-base">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-border flex flex-wrap gap-3">
                    {selectedProject.demoUrl && selectedProject.demoUrl !== "#" ? (
                      <Button className="flex-1" asChild>
                        <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live Demo
                        </a>
                      </Button>
                    ) : (
                      <Button className="flex-1" disabled variant="secondary">
                        Internal Tool
                      </Button>
                    )}
                    
                    {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                      <Button variant="outline" className="flex-1" asChild>
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Full Screen Image Zoom Modal */}
              <AnimatePresence>
                {isImageExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsImageExpanded(false);
                    }}
                  >
                    <div className="absolute top-4 right-4 z-[80]">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                        onClick={() => setIsImageExpanded(false)}
                      >
                         <X className="w-8 h-8" />
                      </Button>
                    </div>
                    
                    <motion.img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className="w-full h-full object-contain p-4 md:p-10"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}