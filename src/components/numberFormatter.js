// A function to format numbers i.e add commas

export const numberFormatter = (props) => {
    const format =Number(props).toLocaleString();
    return format;
  };
