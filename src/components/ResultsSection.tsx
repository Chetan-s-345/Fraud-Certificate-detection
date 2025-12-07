import { CheckCircle2, AlertTriangle, FileWarning, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AnalysisResult {
  isAuthentic: boolean;
  confidence: number;
  issues: string[];
  checks: {
    name: string;
    passed: boolean;
    detail: string;
  }[];
}

interface ResultsSectionProps {
  result: AnalysisResult | null;
  filePreview: string | null;
  fileName: string | null;
  onReset: () => void;
}

const ResultsSection = ({ result, filePreview, fileName, onReset }: ResultsSectionProps) => {
  if (!result) return null;

  const isAuthentic = result.isAuthentic;
  const confidence = result.confidence;

  return (
    <section id="results" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Result Card */}
          <div className={`
            glass-card p-8 md:p-12 rounded-3xl border-2 animate-scale-in
            ${isAuthentic ? "border-success/30" : "border-destructive/30"}
          `}>
            {/* Status Badge */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
              <div className={`
                relative w-32 h-32 rounded-3xl flex items-center justify-center
                ${isAuthentic ? "bg-success/10" : "bg-destructive/10"}
              `}>
                {isAuthentic ? (
                  <CheckCircle2 className="w-16 h-16 text-success" />
                ) : (
                  <AlertTriangle className="w-16 h-16 text-destructive" />
                )}
                <div className={`
                  absolute inset-0 rounded-3xl blur-2xl opacity-30
                  ${isAuthentic ? "bg-success" : "bg-destructive"}
                `} />
              </div>

              <div className="text-center md:text-left flex-1">
                <div className={`
                  inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3
                  ${isAuthentic ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}
                `}>
                  {isAuthentic ? "AUTHENTIC" : "SUSPICIOUS"}
                </div>
                <h2 className="font-sora font-bold text-2xl md:text-4xl mb-2">
                  {isAuthentic
                    ? "Certificate Verified Successfully"
                    : "Potential Issues Detected"}
                </h2>
                <p className="text-muted-foreground">
                  {isAuthentic
                    ? "Our AI analysis indicates this certificate appears genuine."
                    : "Our AI has detected anomalies that require attention."}
                </p>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="glass-card p-6 rounded-2xl mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Confidence Score</span>
                <span className={`font-sora font-bold text-2xl ${isAuthentic ? "text-success" : "text-destructive"}`}>
                  {confidence}%
                </span>
              </div>
              <Progress 
                value={confidence} 
                className={`h-3 ${isAuthentic ? "[&>div]:bg-success" : "[&>div]:bg-destructive"}`}
              />
            </div>

            {/* Grid with preview and checks */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Certificate Preview */}
              <div className="glass-card p-4 rounded-2xl">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-primary" />
                  Analyzed Document
                </h4>
                {filePreview ? (
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                    <img
                      src={filePreview}
                      alt="Certificate"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <FileWarning className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">{fileName || "PDF Document"}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Checks */}
              <div className="glass-card p-4 rounded-2xl">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Security Checks
                </h4>
                <div className="space-y-3">
                  {result.checks.map((check, index) => (
                    <div
                      key={index}
                      className={`
                        p-3 rounded-xl border transition-all
                        ${check.passed ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {check.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{check.name}</p>
                          <p className="text-xs text-muted-foreground">{check.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Issues List */}
            {!isAuthentic && result.issues.length > 0 && (
              <div className="mt-8 p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-destructive">
                  <Info className="w-5 h-5" />
                  Issues Detected
                </h4>
                <ul className="space-y-2">
                  {result.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-10 flex justify-center">
              <Button variant="glass" size="lg" onClick={onReset}>
                Analyze Another Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
