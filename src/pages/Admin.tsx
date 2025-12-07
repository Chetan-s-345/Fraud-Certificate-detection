import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Activity {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string | null;
}

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin: string | null;
  certificates: Array<{ name: string; uploadedAt: string }>;
}

export default function Admin() {
  const { token, user } = useAuth() || {};
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("activities");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    fetchAdminData();
  }, [token, navigate]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [activitiesRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/auth/admin/activities", {
          headers,
        }),
        axios.get("http://localhost:5000/api/auth/admin/users", { headers }),
      ]);

      setActivities(activitiesRes.data.activities || []);
      setUsers(usersRes.data.users || []);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch admin data"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const getActionBadgeColor = (action: string) => {
    const colors: { [key: string]: string } = {
      user_login: "bg-blue-100 text-blue-800",
      user_signup: "bg-green-100 text-green-800",
      google_login: "bg-purple-100 text-purple-800",
      certificate_added: "bg-yellow-100 text-yellow-800",
      user_logout: "bg-red-100 text-red-800",
    };
    return colors[action] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600">
            Monitor user activities and manage registered users
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="activities">
              User Activities ({activities.length})
            </TabsTrigger>
            <TabsTrigger value="users">
              Registered Users ({users.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto">
                  {activities.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>IP Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activities.map((activity) => (
                          <TableRow key={activity._id}>
                            <TableCell className="font-medium">
                              {activity.userId?.name || "Unknown"}
                            </TableCell>
                            <TableCell>
                              {activity.userId?.email || "N/A"}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getActionBadgeColor(activity.action)}`}
                              >
                                {activity.action.replace(/_/g, " ")}
                              </span>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {activity.details}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {formatDate(activity.timestamp)}
                            </TableCell>
                            <TableCell>
                              {activity.ipAddress || "Not tracked"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <p>No activities recorded yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto">
                  {users.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Registration Date</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Certificates</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((userItem) => (
                          <TableRow key={userItem._id}>
                            <TableCell className="font-medium">
                              {userItem.name}
                            </TableCell>
                            <TableCell>{userItem.email}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              {formatDate(userItem.createdAt)}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {userItem.lastLogin
                                ? formatDate(userItem.lastLogin)
                                : "Never"}
                            </TableCell>
                            <TableCell>
                              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {userItem.certificates?.length || 0}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <p>No users registered yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-4">
          <Button
            onClick={fetchAdminData}
            variant="outline"
            className="gap-2"
          >
            ↻ Refresh Data
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
