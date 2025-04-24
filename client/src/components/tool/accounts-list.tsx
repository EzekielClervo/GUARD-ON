import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  EyeOff,
  Loader2,
  Shield,
  ShieldAlert,
  Search,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FbAccount, getAllFbAccounts } from "@/lib/facebook-api";

export function AccountsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  
  const { data: accounts, isLoading, error } = useQuery<FbAccount[]>({
    queryKey: ["/api/fb/accounts/all"],
    queryFn: getAllFbAccounts,
  });
  
  const filteredAccounts = accounts?.filter((account) => {
    return (
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (account.fbId && account.fbId.includes(searchTerm))
    );
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500">
        <p className="font-semibold">Error loading accounts</p>
        <p className="text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-dark-900/80 border border-primary/20 backdrop-blur-md rounded-lg p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
        <h3 className="text-lg font-semibold text-white">
          Facebook Accounts <Badge variant="outline" className="ml-2 bg-primary/20">{accounts?.length || 0}</Badge>
        </h3>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search accounts..."
              className="pl-8 bg-dark-800 border-gray-700 text-white w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            className="flex items-center space-x-1 text-sm text-gray-400 hover:text-primary transition"
            onClick={() => setShowPasswords(!showPasswords)}
          >
            {showPasswords ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>Show</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-dark-800">
              <TableRow>
                <TableHead className="text-gray-400 font-medium">Email</TableHead>
                <TableHead className="text-gray-400 font-medium">Password</TableHead>
                <TableHead className="text-gray-400 font-medium">Facebook ID</TableHead>
                <TableHead className="text-gray-400 font-medium">Guard Status</TableHead>
                <TableHead className="text-gray-400 font-medium">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts && filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <TableRow key={account.id} className="border-t border-gray-800">
                    <TableCell className="text-white">{account.email}</TableCell>
                    <TableCell>
                      {showPasswords ? (
                        <span className="text-white">{account.password}</span>
                      ) : (
                        <span className="text-gray-500">••••••••</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {account.fbId ? (
                        <span className="text-white">{account.fbId}</span>
                      ) : (
                        <span className="text-gray-500">Not available</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {account.isGuardActive ? (
                        <div className="flex items-center">
                          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                            <Shield className="h-3 w-3 mr-1" /> Protected
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Badge variant="outline" className="border-gray-700 text-gray-400">
                            <ShieldAlert className="h-3 w-3 mr-1" /> Inactive
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(account.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    {searchTerm
                      ? "No accounts match your search"
                      : "No accounts have been added yet"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}