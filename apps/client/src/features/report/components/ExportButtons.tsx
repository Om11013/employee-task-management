interface Props {
  onExportCSV: () => void;
  onExportExcel: () => void;
  isExportingCSV: boolean;
  isExportingExcel: boolean;
}

export const ExportButtons = ({
  onExportCSV,
  onExportExcel,
  isExportingCSV,
  isExportingExcel,
}: Props) => {
  return (
    <div className="flex space-x-3 w-full sm:w-auto">
      <button
        onClick={onExportCSV}
        disabled={isExportingCSV}
        className="flex-1 sm:flex-none flex justify-center items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        {isExportingCSV ? "Exporting..." : "Export CSV"}
      </button>
      <button
        onClick={onExportExcel}
        disabled={isExportingExcel}
        className="flex-1 sm:flex-none flex justify-center items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        {isExportingExcel ? "Exporting..." : "Export Excel"}
      </button>
    </div>
  );
};
