import { Shield, Github, Twitter, Linkedin, Mail, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
              <span className="font-sora font-bold text-xl gradient-text">
                FraudShield AI
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              AI-powered certificate fraud detection. Protect your organization from 
              fraudulent documents with instant, accurate verification.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Built for Hackathon 2024</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sora font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-foreground transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href="#upload" className="hover:text-foreground transition-colors">
                  Try Now
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sora font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@fraudshield.ai" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@fraudshield.ai
                </a>
              </li>
              <li className="flex items-center gap-4 pt-2">
                <a href="#" className="hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 FraudShield AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
