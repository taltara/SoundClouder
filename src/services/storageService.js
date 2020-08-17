
const saveToStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}

const loadFromStorage = (key) => {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

export default {
    loadFromStorage,
    saveToStorage
  };