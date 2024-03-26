import { useSelector } from "react-redux";
const Friend = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user.firends &&
        user.firends.map((firend) => <div key={firend.id}>{firend.name}</div>)}
    </div>
  );
};

Friend.propTypes = {};

export default Friend;
