import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Certificates() {
  const { user, isAuthenticated, verifyCertificate, loading, error } = useAuth();
  const navigate = useNavigate();
  const [certificateName, setCertificateName] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="pt-32 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Please sign in to view your certificates.
              </p>
              <Button
                onClick={() => navigate("/signin")}
                className="w-full"
              >
                Go to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError("File size must be less than 5MB");
        return;
      }
      setCertificateFile(file);
      setFormError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!certificateName.trim()) {
      setFormError("Certificate name is required");
      return;
    }

    if (!certificateFile) {
      setFormError("Please select a certificate file");
      return;
    }

    try {
      await verifyCertificate(certificateName, {
        fileName: certificateFile.name,
        fileSize: certificateFile.size,
        mimeType: certificateFile.type,
      });

      setSuccessMessage("Certificate verified and stored successfully!");
      setCertificateName("");
      setCertificateFile(null);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to verify certificate");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* User Welcome */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Verify and manage your certificates securely.
            </p>
          </div>

          {/* Upload Certificate Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Certificate
              </CardTitle>
              <CardDescription>
                Upload a certificate to verify and store it in your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {formError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {successMessage}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificateName">Certificate Name</Label>
                  <Input
                    id="certificateName"
                    type="text"
                    placeholder="e.g., AWS Solutions Architect"
                    value={certificateName}
                    onChange={(e) => {
                      setCertificateName(e.target.value);
                      setFormError("");
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificateFile">Certificate File</Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      id="certificateFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="certificateFile"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-blue-500" />
                      <p className="font-medium text-gray-700">
                        {certificateFile
                          ? certificateFile.name
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, JPG, PNG, DOC or DOCX (max 5MB)
                      </p>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Store Certificate"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Stored Certificates */}
          {user?.certificates && user.certificates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Certificates</CardTitle>
                <CardDescription>
                  You have {user.certificates.length} verified certificate(s).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.certificates.map((cert: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg flex items-start gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          File: {cert.details?.fileName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Verified on:{" "}
                          {new Date(cert.verifiedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
