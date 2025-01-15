import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  path?: string;
  subItems?: { title: string; path: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/home'
  },
  {
    title: 'Properties',
    icon: Home,
    subItems: [
      { title: 'Manage Properties', path: '/properties' },
      { title: 'Details & Analytics', path: '/property-analytics' }
    ]
  },
  {
    title: 'Tenants',
    icon: Users,
    subItems: [
      { title: 'Tenant Management', path: '/tenants' },
      { title: 'Tenant Insights', path: '/tenant-insights' },
      { title: 'Lease Management', path: '/leases' }
    ]
  },
  {
    title: 'Maintenance',
    icon: Wrench,
    subItems: [
      { title: 'Scheduled Maintenance', path: '/maintenance/scheduled' },
      { title: 'Maintenance Insights', path: '/maintenance/insights' },
      { title: 'Requests', path: '/maintenance/requests' }
    ]
  },
  {
    title: 'Financials',
    icon: DollarSign,
    subItems: [
      { title: 'Income & Expenses', path: '/financials/income' },
      { title: 'Optimizations', path: '/financials/optimize' },
      { title: 'Payments', path: '/financials/payments' }
    ]
  },
  {
    title: 'Insights & Analytics',
    icon: LineChart,
    subItems: [
      { title: 'Market Trends', path: '/insights/market' },
      { title: 'Investment Opportunities', path: '/insights/investments' },
      { title: 'Tenant Engagement', path: '/insights/engagement' }
    ]
  },
  {
    title: 'Compliance',
    icon: Shield,
    subItems: [
      { title: 'Alerts & Updates', path: '/compliance/alerts' },
      { title: 'Documentation', path: '/compliance/docs' }
    ]
  },
  {
    title: 'Cross-Border',
    icon: Globe,
    subItems: [
      { title: 'Multi-Country Tools', path: '/global/tools' },
      { title: 'Global Portfolio', path: '/global/portfolio' }
    ]
  },
  {
    title: 'Green Property',
    icon: Leaf,
    subItems: [
      { title: 'Energy Analytics', path: '/green/energy' },
      { title: 'Sustainability Tools', path: '/green/sustainability' }
    ]
  },
  {
    title: 'Settings',
    icon: Settings,
    subItems: [
      { title: 'Account Settings', path: '/settings/account' },
      { title: 'Integrations', path: '/settings/integrations' },
      { title: 'Privacy & Security', path: '/settings/privacy' }
    ]
  },
  {
    title: 'Help & Support',
    icon: HelpCircle,
    subItems: [
      { title: 'Tutorials & Guides', path: '/help/tutorials' },
      { title: 'FAQs', path: '/help/faqs' },
      { title: 'Contact Support', path: '/help/support' },
      { title: 'Community Forum', path: '/help/community' }
    ]
  }
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item.title);
    if (item.path) {
      navigate(item.path);
    } else if (item.subItems) {
      toggleExpand(item.title);
    }
  };

  const handleSubItemClick = (path: string, parentTitle: string) => {
    setActiveItem(parentTitle);
    navigate(path);
  };

  return (
    <div className="w-64 h-full bg-kingdom-dark/95 backdrop-blur-lg border-r border-kingdom-primary/20 shadow-xl overflow-y-auto">
      <div className="p-6 border-b border-kingdom-primary/20">
        <h1 className="text-2xl font-bold gradient-text">MyKingdom</h1>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <div key={item.title} className="mb-2">
            <button
              onClick={() => handleItemClick(item)}
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

            {item.subItems && expandedItems.includes(item.title) && (
              <div className="ml-9 mt-2 space-y-1">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem.title}
                    onClick={() => handleSubItemClick(subItem.path, item.title)}
                    className="w-full text-left p-2 text-sm text-kingdom-text/80 hover:text-kingdom-primary hover:bg-kingdom-primary/5 rounded-lg transition-all duration-300"
                  >
                    {subItem.title}
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