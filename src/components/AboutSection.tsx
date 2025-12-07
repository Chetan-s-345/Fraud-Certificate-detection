import { Shield, Heart, Globe, TrendingUp } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Story */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Mission
            </span>
            <h2 className="font-sora font-bold text-3xl md:text-5xl mb-6">
              Why <span className="gradient-text">FraudShield AI</span> Matters
            </h2>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-3xl mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In a world where document fraud is rising at an alarming rate, the need for reliable 
                verification has never been more critical. Every year, millions of fake certificates 
                circulate through educational institutions, corporate HR departments, and government 
                agencies—undermining trust and enabling deception.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <span className="text-foreground font-semibold">FraudShield AI</span> was born from a 
                simple belief: everyone deserves access to powerful verification technology. Whether 
                you're an employer validating credentials, an institution protecting your reputation, 
                or an individual safeguarding your achievements—our AI stands as your first line of defense.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By combining advanced machine learning with deep document analysis, we've created a tool 
                that can detect subtle signs of tampering that escape the human eye. Because in the fight 
                against fraud, <span className="text-foreground font-semibold">technology should protect, 
                not deceive</span>.
              </p>
            </div>
          </div>

          {/* Stats / Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                stat: "99.7%",
                label: "Detection Accuracy",
              },
              {
                icon: TrendingUp,
                stat: "2.5M+",
                label: "Fake Docs Yearly",
              },
              {
                icon: Globe,
                stat: "150+",
                label: "Countries Affected",
              },
              {
                icon: Heart,
                stat: "Trust",
                label: "Our Core Value",
              },
            ].map((item, index) => (
              <div key={index} className="glass-card-hover p-6 rounded-2xl text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-sora font-bold text-2xl gradient-text mb-1">
                  {item.stat}
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
