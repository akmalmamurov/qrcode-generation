import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
export function Spinner({ size, color }) {
  return (
    <div style={styles.container}>
      <ClipLoader
        color={color ? color : "#61dafb"}
        loading={true}
        size={size ? size : 50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
