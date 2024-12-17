import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  Users,
  Wrench,
  DollarSign,
  LineChart,
  Shield,
  Globe,
  Leaf,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ElementType;
  subItems?: string[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    subItems: ['Overview', 'Performance Summary', 'Key Alerts', 'Quick Actions'],
  },
  {
    title: 'Properties',
    icon: Home,
    subItems: ['Manage Properties', 'Details & Analytics'],
  },
  {
    title: 'Tenants',
    icon: Users,
    subItems: ['Tenant Management', 'Tenant Insights', 'Lease Management'],
  },
  {
    title: 'Maintenance',
    icon: Wrench,
    subItems: ['Scheduled Maintenance', 'Maintenance Insights', 'Requests'],
  },
  {
    title: 'Financials',
    icon: DollarSign,
    subItems: ['Income & Expenses', 'Optimizations', 'Payments'],
  },
  {
    title: 'Insights & Analytics',
    icon: LineChart,
    subItems: ['Market Trends', 'Investment Opportunities', 'Tenant Engagement'],
  },
  {
    title: 'Compliance',
    icon: Shield,
    subItems: ['Alerts & Updates', 'Documentation'],
  },
  {
    title: 'Cross-Border',
    icon: Globe,
    subItems: ['Multi-Country Tools', 'Global Portfolio'],
  },
  {
    title: 'Green Property',
    icon: Leaf,
    subItems: ['Energy Analytics', 'Sustainability Tools'],
  },
  {
    title: 'Settings',
    icon: Settings,
    subItems: ['Account Settings', 'Integrations', 'Privacy & Security'],
  },
  {
    title: 'Help & Support',
    icon: HelpCircle,
    subItems: ['Tutorials & Guides', 'FAQs', 'Contact Support', 'Community Forum'],
  },
];

export const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="w-64 h-full bg-kingdom-dark/95 backdrop-blur-lg border-r border-kingdom-primary/20 shadow-xl overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-kingdom-primary/20">
        <h1 className="text-2xl font-bold gradient-text">MyKingdom</h1>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <div key={item.title} className="mb-2">
            <button
              onClick={() => {
                setActiveItem(item.title);
                toggleExpand(item.title);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                activeItem === item.title
                  ? 'bg-gradient-primary text-white shadow-lg shadow-kingdom-primary/20'
                  : 'hover:bg-kingdom-primary/10 text-kingdom-text'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${
                  activeItem === item.title ? 'text-white' : 'text-kingdom-primary'
                }`} />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              {item.subItems && (
                <span className="text-current">
                  {expandedItems.includes(item.title) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </span>
              )}
            </button>

            {/* Sub Items */}
            {item.subItems && expandedItems.includes(item.title) && (
              <div className="ml-9 mt-2 space-y-1">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem}
                    className="w-full text-left p-2 text-sm text-kingdom-text/80 hover:text-kingdom-primary hover:bg-kingdom-primary/5 rounded-lg transition-all duration-300"
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};