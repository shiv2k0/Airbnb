const Image = ({ src, ...rest }) => {
  //   src =
  //     src && src.includes("https://") ? src : "http://localhost/uploads/" + src;
  return (
    <>
      <img {...rest} src={src} alt="" />
    </>
  );
};
export default Image;
