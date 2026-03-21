import { User, Bell, Lock, Palette, Download, HelpCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function Settings() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Profile Information</h3>
            <p className="text-sm text-gray-600">Update your personal details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="Sarah" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Chen" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="sarah.chen@example.com" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="mt-1.5" />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <p className="text-sm text-gray-600">Manage how you receive updates</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Bill Reminders</div>
              <div className="text-sm text-gray-600 mt-1">Get notified before bills are due</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Budget Alerts</div>
              <div className="text-sm text-gray-600 mt-1">Alert when approaching budget limits</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Goal Milestones</div>
              <div className="text-sm text-gray-600 mt-1">Celebrate when you reach savings goals</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Transaction Alerts</div>
              <div className="text-sm text-gray-600 mt-1">Get notified of all transactions</div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Weekly Summary</div>
              <div className="text-sm text-gray-600 mt-1">Receive weekly financial summaries</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Security</h3>
            <p className="text-sm text-gray-600">Keep your account secure</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium text-gray-900">Password</div>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
            <div className="text-sm text-gray-600">Last changed 45 days ago</div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-gray-600 mt-1">Add an extra layer of security</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium text-gray-900">Active Sessions</div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="text-sm text-gray-600">2 active sessions across your devices</div>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Palette className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Preferences</h3>
            <p className="text-sm text-gray-600">Customize your experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger id="currency" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD - US Dollar</SelectItem>
                <SelectItem value="eur">EUR - Euro</SelectItem>
                <SelectItem value="gbp">GBP - British Pound</SelectItem>
                <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="language" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="pst">
              <SelectTrigger id="timezone" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                <SelectItem value="est">Eastern Time (ET)</SelectItem>
                <SelectItem value="cst">Central Time (CT)</SelectItem>
                <SelectItem value="mst">Mountain Time (MT)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select defaultValue="mdy">
              <SelectTrigger id="dateFormat" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button>Save Preferences</Button>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Download className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Data & Privacy</h3>
            <p className="text-sm text-gray-600">Manage your data</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900">Export Data</div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="text-sm text-gray-600">Download all your financial data in CSV format</div>
          </div>

          <div className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900">Delete Account</div>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                Delete
              </Button>
            </div>
            <div className="text-sm text-gray-600">Permanently delete your account and all data</div>
          </div>
        </div>
      </Card>

      {/* Help & Support */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Help & Support</h3>
            <p className="text-sm text-gray-600">Get assistance when you need it</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="font-medium">Help Center</div>
              <div className="text-sm text-gray-600 mt-1">Browse articles and guides</div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="font-medium">Contact Support</div>
              <div className="text-sm text-gray-600 mt-1">Get in touch with our team</div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="font-medium">Privacy Policy</div>
              <div className="text-sm text-gray-600 mt-1">Read our privacy policy</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
}
