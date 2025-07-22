const LocationTab = (props) => {
  const handleClick = () => {
    props.handleSelectedLocation(props.name);
  };

  if (props.selectedLocation === props.name) {
    return (
      <div
        className="bg-gray-300 px-2 py-1 rounded-[5px] cursor-pointer "
        onClick={handleClick}
      >
        {props.name}
      </div>
    );
  }

  return (
    <div
      className="bg-gray-100 px-2 py-1 rounded-[5px] cursor-pointer "
      onClick={handleClick}
    >
      {props.name}
    </div>
  );
};
export { LocationTab };
