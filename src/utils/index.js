import {v5} from "uuid";

const generateUUID = () => {
  const uuid = () => {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  };

  const UUID = v5(uuid(), '146bc2c9-c5db-54cf-84f4-dfb9aec06477');
  return UUID;
}




export {
  generateUUID
}
