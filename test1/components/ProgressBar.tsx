interface ProgressBarProps {
  activePage: number;
  pageCount: number;
}

const ProgressBar = ({ activePage, pageCount }: ProgressBarProps) => {
  const widthPercentage =
    ((activePage / pageCount || 0.02) * 100).toFixed(2) + "%";

  return (
    <div className="flex justify-center items-center py-4 px-2">
      <div className="bg-primary-80 w-full h-2 rounded-lg">
        <div
          className="bg-primary-30 h-full rounded-lg"
          style={{ width: widthPercentage }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
