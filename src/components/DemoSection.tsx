import { CheckCircle2, AlertTriangle } from "lucide-react";

const demos = [
  {
    title: "Authentic Certificate",
    status: "authentic",
    image: "/demo-authentic.jpg",
    confidence: 98,
    highlights: [
      "Valid official seal detected",
      "Signature matches template",
      "No layout tampering found",
      "Text fonts are consistent",
    ],
  },
  {
    title: "Suspicious Certificate",
    status: "suspicious",
    image: "/demo-suspicious.jpg",
    confidence: 23,
    highlights: [
      "Seal appears digitally altered",
      "Font inconsistencies detected",
      "Layout margins irregular",
      "Text overlay tampering signs",
    ],
  },
];

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            See It In Action
          </span>
          <h2 className="font-sora font-bold text-3xl md:text-5xl mb-4">
            Demo <span className="gradient-text">Examples</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how FraudShield AI distinguishes between authentic and fraudulent certificates.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {demos.map((demo, index) => (
              <div
                key={index}
                className={`
                  glass-card p-6 rounded-2xl border-2 transition-all duration-300
                  ${demo.status === "authentic" ? "border-success/20 hover:border-success/40" : "border-destructive/20 hover:border-destructive/40"}
                `}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sora font-semibold text-lg">{demo.title}</h3>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-semibold uppercase
                    ${demo.status === "authentic" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}
                  `}>
                    {demo.status}
                  </span>
                </div>

                {/* Mock Certificate Preview */}
                <div className={`
                  aspect-[4/3] rounded-xl mb-4 flex items-center justify-center relative overflow-hidden
                  ${demo.status === "authentic" ? "bg-success/5" : "bg-destructive/5"}
                `}>
                  <div className="text-center p-8">
                    <div className={`
                      w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center
                      ${demo.status === "authentic" ? "bg-success/10" : "bg-destructive/10"}
                    `}>
                      {demo.status === "authentic" ? (
                        <CheckCircle2 className="w-12 h-12 text-success" />
                      ) : (
                        <AlertTriangle className="w-12 h-12 text-destructive" />
                      )}
                    </div>
                    <div className="font-sora font-bold text-3xl mb-1">
                      {demo.confidence}%
                    </div>
                    <div className="text-sm text-muted-foreground">Confidence Score</div>
                  </div>

                  {/* Scan Lines Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className={`
                      absolute inset-0 bg-gradient-to-b from-transparent via-current to-transparent
                      ${demo.status === "authentic" ? "text-success" : "text-destructive"}
                    `} style={{
                      backgroundSize: '100% 4px',
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)`,
                      opacity: 0.1
                    }} />
                  </div>
                </div>

                {/* Analysis Points */}
                <div className="space-y-2">
                  {demo.highlights.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {demo.status === "authentic" ? (
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                      )}
                      <span className="text-muted-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
