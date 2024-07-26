const NameResponse = ({ color, message }) => {
  return (
    <div
      className="h-7 w-full text-white"
      style={{
        backgroundColor: color,
      }}
    >
      {message}
    </div>
  );
};
export default NameResponse;
