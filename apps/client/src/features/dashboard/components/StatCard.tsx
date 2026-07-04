export interface StatCardProps {
  title: string;
  value: number;
}

export const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center hover:shadow-md transition-shadow">
      <h3 className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wider text-center">
        {title}
      </h3>
      <p className="text-4xl font-bold text-gray-800">{value}</p>
    </div>
  );
};
