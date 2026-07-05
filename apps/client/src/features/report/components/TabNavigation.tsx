export type TabType = "all" | "completed" | "pending" | "employee";

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isAdmin: boolean;
}

export const TabNavigation = ({ activeTab, setActiveTab, isAdmin }: Props) => {
  const tabs: { value: TabType; label: string }[] = [
    { value: "all", label: "All Tasks" },
    { value: "completed", label: "Completed Tasks" },
    { value: "pending", label: "Pending Tasks" },
  ];

  if (isAdmin) {
    tabs.push({ value: "employee", label: "Employee Summary" });
  }

  return (
    <div className="border-b border-gray-200 mb-6 overflow-x-auto">
      <nav className="-mb-px flex space-x-8 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${
                activeTab === tab.value
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
