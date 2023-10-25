const randInt = () => Math.round(Math.random() * 10);

const getRandomRoomId = () => {
  const id = `${randInt()}${randInt()}${randInt()}-${randInt()}${randInt()}${randInt()}-${randInt()}${randInt()}${randInt()}`
  return id;
};

export default getRandomRoomId;