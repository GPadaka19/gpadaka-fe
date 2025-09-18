import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Github, Linkedin, Send, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import ReCAPTCHA from "react-google-recaptcha";

const contactInfo = [
  { icon: Mail, label: "Email", value: "gustipadaka19@gmail.com", href: "mailto:gustipadaka19@gmail.com" },
  { icon: Github, label: "GitHub", value: "github.com/GPadaka19", href: "https://github.com/GPadaka19" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/gustipadaka", href: "https://linkedin.com/in/gustipadaka" },
  { icon: MapPin, label: "Location", value: "Sleman, DIY", href: null }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { toast } = useToast();

  // Load form dari localStorage saat mount
  useEffect(() => {
    const savedForm = localStorage.getItem("contactForm");
    if (savedForm) setFormData(JSON.parse(savedForm));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newForm = { ...formData, [name]: value };
    setFormData(newForm);
    localStorage.setItem("contactForm", JSON.stringify(newForm));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!captchaToken) {
      toast({ title: "Verification failed", description: "Please complete the captcha." });
      return;
    }
  
    setIsSubmitting(true);
    try {
      // 1. Verifikasi captcha
      const res = await fetch("https://api.gpadaka.com/api0/api/captcha/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captcha: captchaToken }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        try {
          // 2. Simpan ke Firestore
          await addDoc(collection(db, "form-message"), {
            ...formData,
            createdAt: serverTimestamp(),
          });
  
          // 3. Kirim ke backend baru → trigger Telegram notif
          try {
            await fetch("https://api.gpadaka.com/api0/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
          } catch (err) {
            console.error("⚠️ Failed to send Telegram notification:", err);
            // Tidak menghentikan flow, tetap lanjut kasih success toast
          }
  
          toast({ title: "Message sent!", description: "Thank you for your message." });
          setFormData({ name: "", email: "", subject: "", message: "" });
          localStorage.removeItem("contactForm");
          setCaptchaToken(null);
        } catch (err) {
          console.error("Failed to save message:", err);
          toast({ title: "Save failed", description: "Could not store your message.", variant: "destructive" });
        }
      } else {
        toast({ title: "Captcha failed", description: "Invalid captcha, please try again.", variant: "destructive" });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to send", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <section id="contact" className="py-20 section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
            <p className="text-muted-foreground mb-8">
              Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you. Feel free to reach out through any of the channels below.
            </p>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div key={info.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                  <Card className="tech-card p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg"><info.icon className="h-5 w-5 text-primary" /></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">{info.value}</a>
                        ) : <p className="text-foreground">{info.value}</p>}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card className="tech-card">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="What's this about?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell me about your project or just say hello..." rows={5} required />
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={setCaptchaToken} />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
