// @ts-nocheck
const Loading = ({ className, id }) => {
  return (
    <div className={className} id={id}>
      <div
        className="d-flex justify-content-center bg-dark align-items-center"
        style={{ height: 500 }}
      >
        <span className="sr-only text-light ">Loading...&nbsp;</span>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    </div>
  );
};

export default Loading;
