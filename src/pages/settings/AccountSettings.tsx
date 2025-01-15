import { Navigation } from "@/components/layout/Navigation";
import { AccountSettingsForm } from "@/components/settings/AccountSettingsForm";

const AccountSettings = () => {
  return (
    <div className="bg-kingdom-dark min-h-screen pt-16">
      <Navigation />
      <div className="md:ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Account Settings</h1>
          <p className="text-kingdom-text/80">Manage your personal information and preferences</p>
        </div>
        <AccountSettingsForm />
      </div>
    </div>
  );
};

export default AccountSettings;