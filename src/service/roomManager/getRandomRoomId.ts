const randInt = () => Math.floor(Math.random() * 10);

const getRandomRoomId = () => {
  const id = `${randInt()}${randInt()}${randInt()}-${randInt()}${randInt()}${randInt()}-${randInt()}${randInt()}${randInt()}`
  return id;
};

export default getRandomRoomId;