const getData = key => key ? JSON.parse(localStorage.getItem(key)) : null;
const setData = (key, data = null) => key ? localStorage.setItem(key, JSON.stringify(data)) : null;

export {
	getData,
	setData
};
