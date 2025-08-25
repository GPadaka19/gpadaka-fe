import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

const achievements = [
  {
    title: "Merit Winner — Information Systems Category, AMICTA 2025",
    organization: "Amikom Yogyakarta",
    date: "July 2025",
    description:
      "Awarded Merit Winner in the Information Systems category at AMICTA 2025 for the project Certify NFT (https://certify.nft.gpadaka.com/), a blockchain-backed platform for issuing, minting, and verifying secure digital certificates as NFTs. I contributed as the backend developer and tester, ensuring the reliability and security of the certificate verification system.",
    icon: Award,
  },
  {
    title: "3rd Place — AI & IoT Category, AMICTA 2024",
    organization: "Amikom Yogyakarta",
    date: "July 2024",
    description:
      "Awarded 3rd place in the AI & IoT category at AMICTA 2024 for Anastasia, an AI-powered chatbot assistant designed to support mental health and personal development. I was responsible for deploying and maintaining the application backend on AWS EC2, ensuring stable server operation and real-time responsiveness.",
    icon: Award,
  },
  {
    title: "1st Place — Environmental Documentary Film Competition, DLH Sleman 2020",
    organization: "Dinas Lingkungan Hidup Kabupaten Sleman",
    date: "Jul 2020",
    description:
      `Won 1st place for the documentary film "Menuju Sleman Bebas Sampah" in a regional competition organized by the Sleman Environmental Agency (DLH Sleman). The film explored waste management initiatives and the journey toward a zero-waste Sleman. I contributed as the cameraman and video editor, responsible for capturing visuals and crafting the final narrative through post-production.`,
    icon: Award,
  },
];

export function Achievements() {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold mb-8 text-primary"
      >
        Achievements
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Card className="tech-card h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                    <achievement.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-sm text-primary mb-1">{achievement.organization}</p>
                    <p className="text-xs text-muted-foreground mb-3">{achievement.date}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



