const LittleNotfication = ({ text }) => {
  return (
    <div className="bg-blue-500 text-white rounded-2xl p-[5px] w-1/3 text-center">
      {text || "text not provided"}
    </div>
  );
};
export default LittleNotfication;
