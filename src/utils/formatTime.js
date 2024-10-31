export const formatTimestamp = (timestamp) => {
    const isMilliseconds = timestamp.toString().length > 10;
    const date = new Date(isMilliseconds ? timestamp : timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,hour12: false});
  };