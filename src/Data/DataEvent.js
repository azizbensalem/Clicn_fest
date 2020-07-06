
const getParticipant = () => {
    return JSON.parse(localStorage.getItem("participants"));
};

export default {
    getParticipant,
};